var music = require('http').createServer(handler)
  , io = require('socket.io').listen(music)
  , fs = require('fs')
  , rs = require('redis')
  , cp = require('child_process')
  ,  $ = require('jquery')
  , redis = rs.createClient()


redis.on("error", function (err) {
    console.log("Error " + err);
});

music.listen(1337);

io.set('log level', 1);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {

  socket.on('new_game', function() {
    // see if there are any games available
    var game_id = null;
    redis.zrangebyscore('game_list', 1, 1, function(err, reply) {
      if (!$.isEmptyObject(reply)) {
        // take the first game if one is available
        game_id = reply[0];
        redis.zadd('game_list', 2, game_id);
        redis.set(game_id +':'+ socket.id, true);

        console.log(socket.id + ' joined a game       (' +game_id+ ')');
      } else {
        // make a new game if none are available

        game_id = +new Date();
        while (redis.exists(game_id)) {
          // ensure unique game_id
          game_id = +new Date();
        }

        // set game state
        redis.zadd('game_list', 1, game_id);
        redis.set(game_id +':'+ socket.id, null);
        redis.set(game_id +':'+ 'server', null);
        console.info(socket.id + ' started a new game (' +game_id+ ')');

        // clear new game listener (does this work?)
        socket.on('new_game', function(){});
      }

      // give client their game_id
      socket.emit('new_game_id', game_id);

      // make a child process running the game in server mode
      /*
      var child = cp.spawn('node server.js ' + game_id);
      child.stdin.write('echo chamber?');
      child.stdout.on('data', function (data) {
        console.log('child data', data);
      });
      */

      child = cp.fork('server.js', [game_id]);
      child.on('message', function(m) {
        console.log('PARENT got message:', m);
      });
      child.send({ hello: 'world' });


    });

    // test child process creation/destruction
    /*
    var cmd = 'ls -alh';

    var exec = require('child_process').exec,
        ls = exec(cmd);

    console.log('Child process started: %d', ls.pid);

    ls.on('exit', function(code, signal) {
        console.log('exit with code %s and signal %s', code, signal);
    });

    ls.kill();
    */

  });

  socket.on('update_state', function (state, game_id) {
    //var client_id = game_id +':'+ socket.id;

    //update the server directly for debugging
    var client_id = game_id + ':server';

    // store state
    if (redis.exists(client_id)) {
      redis.set(client_id, JSON.stringify(state));
      //redis.expire(client_id, 60);
    }
  });

  socket.on('request_state', function (game_id) {
    if (game_id === undefined) { 
      console.log(socket.id + ' request_state: game_id undefined');
      return;
    }

    var server_id = game_id + ':server';
    redis.get(server_id, function (err, reply) {
      if (err === null && reply !== null) {
        socket.emit('update_client', reply);
      }
    });
  });

  socket.on('send_message', function (message) {
    socket.emit('new_message', message);
  });
});