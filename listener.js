var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
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


app.listen(1337);

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
  socket.emit('news', { hello: 'world' });
  socket.on('update_state', function (state) {
    redis.set(socket.id, JSON.stringify(state));

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