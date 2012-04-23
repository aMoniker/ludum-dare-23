console.log("\nrunning game server");

//var arguments = process.argv.splice(2);
//var game_id = arguments[0];

//console.log('game_id', game_id);

var system = require('system');
console.log('args?', system.args);

process.stdin.resume();
process.stdin.setEncoding('utf8'); 
process.stdin.on('data', function (chunk) { 
  process.stdout.write('data: ' + chunk);
}); 

process.stdin.on('end', function () { 
  process.stdout.write('end'); 
}); 



/*
var $ = require('jquery');
require('/var/www/ld/js/GameUtils.js');
console.log('required gameutils');

var g = {

};
*/