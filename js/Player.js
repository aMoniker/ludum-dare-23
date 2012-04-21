$(function() {

window.Player = Base.extend({
     zone: undefined
    ,world: undefined
    ,constructor: function() {
        this.zone = {
             radius: 150
            ,center: {}
        };
        this.zone.padding = this.zone.radius / 2;

        this.world = {
             radius: 10
            ,center: {}
        };
    }
    ,draw: function() {
        this.draw_zone();
        this.draw_world();
    }
    ,draw_zone: function() {
        if ($.isEmptyObject(this.zone.center)) {
            console.error('player.zone needs a center', this.zone);
            return false;
        }

        g.board.draw_circle(this.zone.center.x, this.zone.center.y, this.zone.radius, '#34A632');
    }
    ,draw_world: function() {
        if ($.isEmptyObject(this.world.center)) {
            console.error('player.world needs a center', this.world);
            return false;
        }

        g.board.draw_circle(this.world.center.x, this.world.center.y, this.world.radius, '#243762', true);
    }
});

});
