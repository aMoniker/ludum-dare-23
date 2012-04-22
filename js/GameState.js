$(function() {
    window.GameState = Base.extend({
         socket: undefined
        ,game_id: undefined
        ,polling: undefined
        ,constructor: function() {
            var self = this;

            this.socket = io.connect('http://ld.greenleaflaboratories.com:1337');

            // game events
            this.socket.on('update_client', this.update_client);
            this.socket.on('new_message', this.new_message);

            // update from server (blurgh)
            this.polling = setInterval(function() {
                self.socket.emit('request_state', self.game_id);
            }, 100);
        }

        // emitters
        ,update_state: function(state) {
            this.socket.emit('update_state', state, this.game_id);
        }
        ,send_message: function(message) {
            this.socket.emit('send_message', message);
        }
        ,new_game: function() {
            var self = this;
            this.socket.on('new_game_id', function(game_id) {
                self.game_id = game_id;
                this.socket.on('new_game_id', function(){});
            });

            this.socket.emit('new_game');
        }

        // receivers
        ,update_client: function(state) {
            // handle client side state updates
            console.log('state', state);
            if (state === null || state === undefined) { return; }

            var the_state = $.parseJSON(state);
            g.af.force_field(the_state.rocks);
        }
        ,new_message: function(message) {
            $('#messages').html($('#messages').html() + '<br>' + message);
        }
    });
});