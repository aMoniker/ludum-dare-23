$(function() {

window.GameBoard = Base.extend({
     width: undefined
    ,height: undefined
    ,context: undefined
    ,constructor: function() {
        var $canvas = $('#the_canvas');

        // init properties
        this.width = $canvas.width();
        this.height = $canvas.height();
        this.context = $canvas[0].getContext('2d');
    }
    ,set_color: function(color) {
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
    }
    ,draw_circle: function(x, y, r, color, fill) {
        this.set_color(color);
        this.context.beginPath();
        this.context.arc(x, y, r, 0, Math.PI*2, true);
        this.context.closePath();
        if (fill) {
            this.context.fill();
        } else {
            this.context.stroke();
        }
    }
});

window.gb = new GameBoard();
console.log('running', gb);

});
