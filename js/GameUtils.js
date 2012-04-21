$(function() {

window.GameUtils = Base.extend({
     circles_intersect: function(x1, y1, r1, x2, y2, r2) {
        var distance = Math.sqrt( Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2) );
        var radii = r1 + r2;

        if (radii >= distance) {
            return true;
        } else {
            return false;
        }
     }
});

});