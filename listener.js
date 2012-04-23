var music = require('http').createServer()
  , io = require('socket.io').listen(music)
  , fs = require('fs')
  , rs = require('redis')
  , cp = require('child_process')
  ,  $ = require('jquery')
  , redis = rs.createClient()

io.set('log level', 1);
redis.on("error", function (err) {
    console.log("Error " + err);
});

music.listen(1337);

/* message format between parent/child processes
      { 'event': 'your_special_event'
       ,'data'   : { all: 'your shit' } }
 -------------------------------------------- */
child = cp.fork('server.js');
child.on('message', function(m) {
  console.log('PARENT got message:', m);
  switch (m.event) {
    case 'test':
      console.log('PARENT received test:', m.data)
      break;
    default: break;
  }

});
child.send({ event: 'test', data: { all: 'sorts', of: 'crap' } });

// websocketry
io.sockets.on('connection', function (socket) {
  /* New/Join Game */
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
      }

      // give client their game_id
      socket.emit('new_game_id', game_id);
    });
  });

  /* Game State */
  socket.on('update_state', function (state, game_id) {
    //update the server directly for debugging
    //var client_id = game_id +':'+ socket.id;
    var client_key = game_id + ':server';

    // store state
    if (redis.exists(client_key)) {
      redis.set(client_key, JSON.stringify(state));
    }
  });

  socket.on('request_state', function (game_id) {
    if (game_id === undefined) { 
      console.log(socket.id + ' request_state: game_id undefined');
      return;
    }

    var server_key = game_id + ':server';
    redis.get(server_key, function (err, reply) {
      if (err === null && reply !== null) {
        socket.emit('update_client', reply);
      }
    });
  });

  /* Chat */
  socket.on('send_message', function (message) {
    socket.emit('new_message', message);
  });
});