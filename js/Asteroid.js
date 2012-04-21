$(function() {
    window.Asteroid = Base.extend({
         radius: undefined
        ,center: undefined
        ,speed: undefined
        ,direction: undefined
        ,min_speed: 1
        ,max_speed: 10
        ,constructor: function(x, y, r, s, d) {
            this.radius = r;
            this.center = {x: x, y: x}
            this.speed = s;
            this.direction = d;
        }
        ,update: function() {
            if (this.speed > this.max_speed) {
                this.speed = this.max_speed;
            }
            if (this.speed < this.min_speed) {
                this.speed = this.min_speed;
            }

            var distance = this.speed; // flat speed per tick
            var rad_direction = ((this.direction - 90) * (Math.PI / 180));
            var slope = Math.tan(rad_direction);
            var cx = Math.cos(rad_direction) * distance;
            var cy = slope * cx;

            this.center.x = this.center.x + cx;
            this.center.y = this.center.y + cy;

            if (this.center.x < 0) {
                this.center.x = g.board.width;
            }
            if (this.center.x > g.board.width) {
                this.center.x = 0;
            }
            if (this.center.y < 0) {
                this.center.y = g.board.height;
            }
            if (this.center.y > g.board.height) {
                this.center.y = 0;
            }
        }
        ,draw: function() {
            g.board.draw_circle(this.center.x, this.center.y, this.radius, '#34A632', true);
        }
    });
});