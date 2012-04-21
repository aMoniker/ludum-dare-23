$(function() {

window.GameBoard = Base.extend({
    // properties
     width: undefined
    ,height: undefined
    ,$canvas: undefined
    ,context: undefined
    ,mouse: undefined

    // handlers
    ,handlers: {
        mouse_move: function(e) {
            this.mouse.x = e.pageX;
            this.mouse.y = e.pageY;
        }
    }

    // init
    ,constructor: function() {
        var self = this;

        // init properties
        this.$canvas = $('#the_canvas');
        this.width = this.$canvas.width();
        this.height = this.$canvas.height();
        this.context = this.$canvas[0].getContext('2d');
        this.mouse = {
            radius: 20
        };

        // mouse movement
        $(document).bind('mousemove', function(e) {
            self.handlers.mouse_move.call(self, e);
        });
    }

    // update
    ,update: function() {
        // draw mouse paddle
        var left = this.$canvas.offset().left;
        var top = this.$canvas.offset().top;

        this.mouse.x_real = this.mouse.x - left;
        this.mouse.y_real = this.mouse.y - top;

        if (this.mouse.x >= left
         && this.mouse.x <= (left + this.width)
         && this.mouse.y >= top
         && this.mouse.y <= (top + this.height)
        ) {
            this.mouse.draw = true;
        } else {
            this.mouse.draw = false;
        }
    }

    // drawing
    ,clear: function() {
        // Store the current transformation matrix
        this.context.save();

        // Use the identity matrix while clearing the canvas
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.width, this.height);

        // Restore the transform
        this.context.restore();
    }
    ,draw: function() {
        // draw mouse paddle
        if (this.mouse.draw) {
            this.draw_circle(this.mouse.x_real, this.mouse.y_real, this.mouse.radius, '#D6471B', true);
        }
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
});
