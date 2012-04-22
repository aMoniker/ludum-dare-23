var music = require('http').createServer(handler)
  , io = require('socket.io').listen(music)
  , fs = require('fs')
  , rs = require('redis')
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
      if (reply) {
        // take the first game
        game_id = reply[0];
        redis.zadd('game_list', 2, game_id);
        redis.set(game_id +':'+ socket.id, true);
        socket.emit('new_game_id', game_id);
      }
    });
    if (game_id) {
      // found a game, get out of here
      return;
    }

    // otherwise... start a NEW GAME

    // get a unique id
    game_id = +new Date();
    while (redis.exists(game_id)) {
      game_id = +new Date();
    }

    // set game state
    console.info(game_id + ' started a new game');
    redis.zadd('game_list', 1, game_id);
    redis.set(game_id, 'waiting');
    redis.set(game_id +':'+ socket.id, true);
    redis.set(game_id +':'+ 'server', true);

    // clear new game listener
    socket.on('new_game', function(){});

    // return new game_id
    socket.emit('new_game_id', game_id);
  }); 

  socket.on('update_state', function (state, game_id) {
    //var client_id = game_id +':'+ socket.id;

    //update the server directly for debugging
    var client_id = game_id;

    // store state
    if (redis.exists(client_id)) {
      redis.set(client_id, JSON.stringify(state));
      redis.expire(client_id, 60);
    }
  });

  socket.on('request_state', function (game_id) {
    if (game_id === undefined) { return; }

    var server_id = game_id;
    redis.get(server_id, function (err, reply) {
      if (err !== null) {
        stored_value = err;
      } else {
        stored_value = reply;
      }

      socket.emit('update_client', stored_value);
    });
  });

  socket.on('send_message', function (message) {
    socket.emit('new_message', message);
  });
});