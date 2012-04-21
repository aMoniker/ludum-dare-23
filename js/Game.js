$(function() {

window.Game = Base.extend({
     board: undefined
    ,p1: undefined
    ,p2: undefined
    ,ticker: undefined
    ,degree_direction: 0
    ,constructor: function() {
        console.warn('g init', this);
        var self = this;

        // utils access
        this.utils = new GameUtils;

        // create board
        this.board = new GameBoard;

        // create players
        this.p1 = new Player;
        this.p1.zone.center.x = this.p1.world.center.x = this.p1.zone.radius + this.p1.zone.padding;
        this.p1.zone.center.y = this.p1.world.center.y = this.board.height - (this.p1.zone.radius + this.p1.zone.padding);

        this.p2 = new Player;
        this.p2.zone.center.x = this.p2.world.center.x = this.board.width - (this.p2.zone.radius + this.p2.zone.padding);
        this.p2.zone.center.y = this.p2.world.center.y = this.p2.zone.radius + this.p2.zone.padding;

        // make one asteroid
        this.asteroid = new Asteroid(this.board.width / 2, this.board.height / 2, 25, 0, 30);
        
        // set main loop
        this.ticker = setInterval(function() {
            self.tick.call(self);
        }, 10);
    }
    ,update: function() {
        this.board.update();
        this.asteroid.update();

        //check if asteroid and paddle intersect
        if (this.utils.circles_intersect(this.asteroid.vector[0] , this.asteroid.vector[1] , this.asteroid.radius,
                                         this.board.mouse.x_real, this.board.mouse.y_real, this.board.mouse.radius)
         && this.asteroid.can_touch()
        ) {
            // asteroid change direction!
            var slope = (this.asteroid.vector[1] - this.board.mouse.y_real) / (this.asteroid.vector[0] - this.board.mouse.x_real);
            var rad_direction = Math.atan(slope);
            var deg_direction = (rad_direction * (180 / Math.PI)) + 90;

            if (this.board.mouse.x_real < this.asteroid.vector[0]) {
                deg_direction += 180; //hax
            }
            this.asteroid.vector[2] = (deg_direction + 180) % 360;
            this.asteroid.touch();
        }
    }
    ,draw: function() {
        this.board.clear();

        this.board.draw();
        this.p1.draw();
        this.p2.draw();

        // A SINGLE ROCK, FLOATING THROUGH SPACE
        this.asteroid.draw();
    }
    ,tick: function() {
        this.update();
        this.draw();
    }
});
window.g = new Game;

});