console.log("\nrunning game server");

var arguments = process.argv.splice(2);
var game_id = arguments[0];

console.log('game_id', game_id);

require('/var/www/ld/js/GameUtils.js');

console.log('required gameutils');

console.log('window', window);
console.log('window.GameUtils', window.GameUtils);

var g = {

};