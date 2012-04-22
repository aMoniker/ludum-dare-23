$(function() {
    window.GameState = Base.extend({
         socket: undefined
        ,game_id: undefined
        ,constructor: function() {
            this.socket = io.connect('http://ld.greenleaflaboratories.com:1337');
            this.socket.on('update_client', this.update_client);
        }
        ,update_state: function(state) {
            this.socket.emit('update_state', state, this.game_id);
        }
        ,update_client: function(state) {
            // handle client side state updates
        }
        ,new_game: function() {
            this.socket.on('new_game_id', function(game_id) {
                this.game_id = game_id;
            });
            this.socket.emit('new_game');
        }
    });
});