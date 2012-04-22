$(function() {
    window.GameState = Base.extend({
         socket: undefined
        ,constructor: function() {
            this.socket = io.connect('http://ld.greenleaflaboratories.com:1337');
            
            this.socket.on('update_client', function (state) {
                console.log('update_client', state);
            });
        }
        ,update_state: function(state) {
            this.socket.emit('update_state', state);
        }
    });
});