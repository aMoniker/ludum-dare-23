$(function() {
    window.GameState = Base.extend({
         socket: undefined
        ,game_id: undefined
        ,constructor: function() {
            this.socket = io.connect('http://ld.greenleaflaboratories.com:1337');

            // game events
            this.socket.on('update_client', this.update_client);
        }
        ,update_state: function(state) {
            this.socket.emit('update_state', state, this.game_id);
        }
        ,update_client: function(state) {
            // handle client side state updates
        }
        ,new_game: function() {
            var self = this;
            this.socket.on('new_game_id', function(game_id) {
                self.game_id = game_id;
                this.socket.on('new_game_id', function(){});
            });

            this.socket.emit('new_game');
        }
    });
});