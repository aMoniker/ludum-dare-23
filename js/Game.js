$(function() {

window.Game = Base.extend({
     board: undefined
    ,p1: undefined
    ,p2: undefined
    ,ticker: undefined
    ,constructor: function() {
        console.warn('g init', this);
        var self = this;

        // create board
        this.board = new GameBoard;

        // create players
        this.p1 = new Player;
        this.p1.zone.center.x = this.p1.world.center.x = this.p1.zone.radius + this.p1.zone.padding;
        this.p1.zone.center.y = this.p1.world.center.y = this.board.height - (this.p1.zone.radius + this.p1.zone.padding);

        this.p2 = new Player;
        this.p2.zone.center.x = this.p2.world.center.x = this.board.width - (this.p2.zone.radius + this.p2.zone.padding);
        this.p2.zone.center.y = this.p2.world.center.y = this.p2.zone.radius + this.p2.zone.padding;
        
        // set main loop
        this.ticker = setInterval(function() {
            self.tick.call(self);
        }, 25);
    }
    ,update: function() {

    }
    ,draw: function() {
        this.board.clear();

        this.board.draw();
        this.p1.draw();
        this.p2.draw();
    }
    ,tick: function() {
        this.update();
        this.draw();
    }
});
window.g = new Game;

});