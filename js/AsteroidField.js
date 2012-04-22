$(function() {
    
    window.AsteroidField = Base.extend({
         size: 8
        ,rocks: undefined
        ,constructor: function(size) {
            this.rocks = [];
            this.size = size || this.size;

            var pizza_slice = 360 / this.size;
            var p1_world = g.p1.world.center;
            var p2_world = g.p2.world.center;

            for (var i=0; i < this.size; i++) {
                var deg_direction = pizza_slice * i;
                var start = (i < this.size / 2) ? p1_world : p2_world;

                var distance = 100;
                var rad_direction = ((deg_direction - 90) * (Math.PI / 180));
                var slope = Math.tan(rad_direction);
                var cx = Math.cos(rad_direction) * distance;
                var cy = slope * cx;

                var asteroid = new Asteroid(start.x + cx, start.y + cy, 25, 0, 30);
                this.rocks.push(asteroid);
            }
        }
        ,update: function() {
            $.each(this.rocks, function(i, rock) { //  \m\ d(-_- )b
                rock.update();
            });
        }
        ,draw: function() {
            $.each(this.rocks, function(i, rock) { //  d( -_-)b /m/
                rock.draw();
            });
        }
    });

});