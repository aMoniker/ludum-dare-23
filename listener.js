var music = require('http').createServer(handler)
  , io = require('socket.io').listen(music)
  , fs = require('fs')
  , rs = require('redis')
  , redis = rs.createClient()


redis.on("error", function (err) {
    console.log("Error " + err);
});

/*
client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});
*/


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

    // list all games with 1 player
    var games_available = redis.zrangebyscore('game_list', 1, 1);

    console.log('games_available', games_available);

    //HMSET user:1000 username antirez password P1pp0 age 34




    // start a NEW GAME
    // get a unique id
    var game_id = +new Date();
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
    var client_id = game_id +':'+ socket.id;

    // store state
    if (redis.exists(client_id)) {
      redis.set(client_id, JSON.stringify(state));
      redis.expire(client_id, 60);
    }

    redis.get(client_id, function (err, reply) {
        if (err !== null) {
          stored_value = err;
        } else {
          stored_value = reply;
        }

        socket.emit('update_client', stored_value);
    });
  });
});