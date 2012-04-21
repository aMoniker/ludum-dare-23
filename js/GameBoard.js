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

        // draw player zones
        var radius = 150;
        var padding = 50;
        this.context.strokeStyle = '#34A632';

        this.context.beginPath();
        this.context.arc(radius+padding, this.height - (radius+padding), radius, 0, Math.PI*2, true);
        this.context.closePath();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(this.width - (radius+padding), radius+padding, radius, 0, Math.PI*2, true);
        this.context.closePath();
        this.context.stroke();
    }
});

window.gb = new GameBoard();
console.log('running', gb);

});
