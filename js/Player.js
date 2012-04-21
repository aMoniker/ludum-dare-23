$(function() {

window.Player = Base.extend({
     zone: {
         radius: 150
        ,padding: 0
        ,center: {}
    }
    ,world: {
         radius: 10
        ,center: {}
    }
    ,constructor: function() {
        this.zone.padding = this.zone.radius / 2;
    }
    ,draw: function() {
        this.draw_zone();
        this.draw_world();
    }
    ,draw_zone: function() {
        if ($.isEmptyObject(this.zone.center)) {
            console.warn('player.zone needs a center');
            return false;
        }

        gb.draw_circle(this.zone.center.x, this.zone.center.y, this.zone.radius, '#34A632');
    }
    ,draw_world: function() {
        if ($.isEmptyObject(this.world.center)) {
            console.warn('player.world needs a center');
            return false;
        }

        gb.draw_circle(this.world.center.x, this.world.center.y, this.world.radius, '#243762', true);
    }
});

window.p1 = new Player();
console.log('player1', p1);

window.p2 = new Player();
console.log('player2', p2);

p1.zone.center.x = p1.world.center.x = p1.zone.radius + p1.zone.padding;
p1.zone.center.y = p1.world.center.y = gb.height - (p1.zone.radius + p1.zone.padding);
p1.draw();

p2.zone.center.x = p2.world.center.x = gb.width - (p2.zone.radius + p2.zone.padding);
p2.zone.center.y = p2.world.center.y = p2.zone.radius + p2.zone.padding;
p2.draw();

});
