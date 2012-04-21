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
        this.asteroid = new Asteroid(this.board.width / 2, this.board.height / 2, 25, 1, 30);
        
        // set main loop
        this.ticker = setInterval(function() {
            self.tick.call(self);
        }, 10);
    }
    ,update: function() {
        this.board.update();

        this.asteroid.update();

        //check if asteroid and paddle intersect
        if (this.utils.circles_intersect(this.asteroid.center.x , this.asteroid.center.y , this.asteroid.radius,
                                         this.board.mouse.x_real, this.board.mouse.y_real, this.board.mouse.radius)
        ) {
            console.warn('collision!');
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