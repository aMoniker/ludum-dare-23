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
  socket.on('update_state', function (state) {
    redis.set(socket.id, JSON.stringify(state));
    redis.expire(socket.id, 60);

    redis.get(socket.id, function (err, reply) {
        if (err !== null) {
          stored_value = err;
        } else {
          stored_value = reply;
        }

        socket.emit('update_client', stored_value);
    });
  });
});