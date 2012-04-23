console.log("\nrunning game server");

process.on('message', function(m) {
  console.log('CHILD got message:', m);
  switch (m.event) {
    case 'test':
        console.log('CHILD received test:', m.data);
        break;
    default: break;
  }
});
process.send({ event: 'test', data: { i: 'hope', this: 'works' } });



/*
var $ = require('jquery');
require('/var/www/ld/js/GameUtils.js');
console.log('required gameutils');

var g = {

};
*/