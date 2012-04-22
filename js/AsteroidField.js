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
            var self = this;
            $.each(this.rocks, function(i, rock) { //  \m\ d(-_- )b
                //check if asteroid and paddle intersect
                if (g.utils.circles_intersect(rock.vector[0] , rock.vector[1] , rock.radius,
                                                 g.board.mouse.x_real, g.board.mouse.y_real, g.board.mouse.radius)
                 && rock.can_touch()
                ) {
                    rock.vector[2] = g.utils.mouse_bump(rock.vector[0], rock.vector[1], g.board.mouse.x_real, g.board.mouse.y_real);
                    rock.speed *= 2;
                    rock.touch();
                }

                //check if asteroid and any other asteroid intersect
                $.each(self.rocks, function(j, rawk) {
                    if (rock === rawk) { return; }

                    if (g.utils.circles_intersect(rock.vector[0], rock.vector[1], rock.radius,
                                                  rawk.vector[0], rawk.vector[1], rawk.radius)
                        && rock.can_bump() && rawk.can_bump()
                    ) {
                        // Vector-swapping
                        var rock_vector = rock.vector[2];
                        var rawk_vector = rawk.vector[2];
                        rock.vector[2] = rawk_vector;
                        rawk.vector[2] = rock_vector;

                        var rock_speed = rock.speed;
                        var rawk_speed = rawk.speed;
                        rock.speed = rawk_speed * 0.9;
                        rawk.speed = rock_speed * 0.9;

                        rock.bump();
                        rock.bump();
                    }
                });

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