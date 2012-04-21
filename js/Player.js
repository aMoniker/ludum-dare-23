$(function() {

window.Player = Base.extend({
     zone: {
         radius: 150
        ,padding: 0
        ,center: {}
     }
    ,constructor: function() {
        this.zone.padding = this.zone.radius / 2;
    }
    ,draw_zone: function(x, y) {
        if ($.isEmptyObject(this.zone.center)) {
            console.warn('player.zone needs a center');
            return false;
        }

        gb.strokeStyle = '#34A632';
        gb.context.beginPath();
        gb.context.arc(this.zone.center.x, this.zone.center.y, this.zone.radius, 0, Math.PI*2, true);
        gb.context.closePath();
        gb.context.stroke();
    }
});

window.p1 = new Player();
console.log('player1', p1);

window.p2 = new Player();
console.log('player2', p2);

p1.zone.center.x = p1.zone.radius + p1.zone.padding;
p1.zone.center.y = gb.height - (p1.zone.radius + p1.zone.padding);
p1.draw_zone();

p2.zone.center.x = gb.width - (p2.zone.radius + p2.zone.padding);
p2.zone.center.y = p2.zone.radius + p2.zone.padding;
p2.draw_zone();

});
