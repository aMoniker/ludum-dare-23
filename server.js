console.log("\nrunning game server");

process.on('message', function(m) {
  console.log('CHILD got message:', m);
});
process.send({ foo: 'bar' });



/*
var $ = require('jquery');
require('/var/www/ld/js/GameUtils.js');
console.log('required gameutils');

var g = {

};
*/