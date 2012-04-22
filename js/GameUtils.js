/*
console.log('GameUtils $', $);
if (!$) { $ = require('jquery'); }
console.log('assigned $?', $);

$(function() {
    */

if (window === undefined) { var window = {}; }

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
    ,mouse_bump: function(x1, y1, x2, y2) {
        var slope = (y2 - y1) / (x2 - x1);
        var rad_direction = Math.atan(slope);
        var deg_direction = (rad_direction * (180 / Math.PI)) + 90;

        if (x2 < x1) {
            //deg_direction += 180 % 360; //hax
            deg_direction = this.opposite_direction(deg_direction);
        }

        return (deg_direction + 180) % 360;
     }
     ,vector_bump: function(d1, d2) {
        console.warn('vector_bump', d1, d2);

        var avg = (d1 + d2) / 2;
        var bump = Math.abs(avg - d1);

        console.log('avg', avg);
        console.log('bump', bump);

        //return [d1 - bump, d2 + bump];
        if (d1 < d2) {
            d1 -= bump;
            d2 += bump;
        } else {
            d1 += bump;
            d2 -= bump;
        }

        if (d1 < 0) {
            d1 = 360 - Math.abs(d1);
        }
        if (d2 < 0) {
            d2 = 360 - Math.abs(d2);
        }

        console.info('return', [d1 % 360, d2 % 360]);

        return [d1 % 360, d2 % 360];
     }
     ,opposite_direction: function(direction) {
        return direction + 180;
     }
});

//});