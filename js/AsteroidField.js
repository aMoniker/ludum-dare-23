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
                //check if asteroid and paddle intersect
                if (g.utils.circles_intersect(rock.vector[0] , rock.vector[1] , rock.radius,
                                                 g.board.mouse.x_real, g.board.mouse.y_real, g.board.mouse.radius)
                 && rock.can_touch()
                ) {
                    // asteroid change direction!
                    var slope = (rock.vector[1] - g.board.mouse.y_real) / (rock.vector[0] - g.board.mouse.x_real);
                    var rad_direction = Math.atan(slope);
                    var deg_direction = (rad_direction * (180 / Math.PI)) + 90;

                    if (g.board.mouse.x_real < rock.vector[0]) {
                        deg_direction += 180; //hax
                    }
                    rock.vector[2] = (deg_direction + 180) % 360;
                    rock.touch();
                }

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