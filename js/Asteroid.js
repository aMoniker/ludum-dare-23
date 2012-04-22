$(function() {
    window.Asteroid = Base.extend({
         radius: undefined
        ,speed: undefined
        ,vector: undefined
        ,min_speed: 0
        ,max_speed: 10
        ,last_touched: undefined
        ,touch_timer: undefined
        ,constructor: function(x, y, r, s, d) {
            this.radius = r;
            this.speed = s;
            this.vector = [x, y, d];
            this.touch_timer = 100;
            this.last_touched = +new Date() - this.touch_timer;
        }
        ,update: function() {
            if (this.speed > this.max_speed) {
                this.speed = this.max_speed;
            }
            if (this.speed < this.min_speed) {
                this.speed = this.min_speed;
            }

            var distance = this.speed; // flat speed per tick
            var rad_direction = ((this.vector[2] - 90) * (Math.PI / 180));
            var slope = Math.tan(rad_direction);
            var cx = Math.cos(rad_direction) * distance;
            var cy = slope * cx;

            this.vector[0] = this.vector[0] + cx;
            this.vector[1] = this.vector[1] + cy;

            if (this.vector[0] < 0) {
                this.vector[0] = g.board.width;
            }
            if (this.vector[0] > g.board.width) {
                this.vector[0] = 0;
            }
            if (this.vector[1] < 0) {
                this.vector[1] = g.board.height;
            }
            if (this.vector[1] > g.board.height) {
                this.vector[1] = 0;
            }
        }
        ,can_touch: function() {
            return (+new Date() - this.last_touched > this.touch_timer);
        }
        ,touch: function() {
            this.last_touched = +new Date();
            this.min_speed = 1; //set on first touch so we can start with stationary asteroids
        }
        ,draw: function() {
            g.board.draw_circle(this.vector[0], this.vector[1], this.radius, '#34A632', true);
        }
    });
});