
var canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");

var LEN = 2;
var MAX_ITER = 100;
var DIVERGE_DIAM = BigMath.lng_create_2_1(4, LEN);

var _05 = BigMath.lng_create_2_1(1, LEN);
_05[1] = 0;
_05[2] = 0.5 * BigMath.BASE;

var zoom = BigMath.lng_create_2_1(1, LEN);
zoom[1] = 0;
zoom[2] = 0.01 * BigMath.BASE;

var translate_x = BigMath.lng_create_2_1(0, LEN);
var translate_y = BigMath.lng_create_2_1(0, LEN);

// Zoom / translation tuning for super-scaling.
zoom = BigMath.lng_mul_2_2(zoom, _05, LEN);
translate_x = BigMath.lng_add_2_2(translate_x, zoom, LEN);
translate_x = BigMath.lng_add_2_2(translate_x, zoom, LEN);
translate_x = BigMath.lng_add_2_2(translate_x, zoom, LEN);
translate_x = BigMath.lng_add_2_2(translate_x, zoom, LEN);
//

var draw_time = Date.now();

for (var i = 0; i < 300; i++) {

    var y0 = BigMath.lng_mul_2_2(BigMath.lng_create_2_1(i - 150, LEN), zoom, LEN);
    y0 = BigMath.lng_add_2_2(translate_y, y0, LEN);

    for (var j = 0; j < 300; j++) {

        var x0 = BigMath.lng_mul_2_2(BigMath.lng_create_2_1(j - 150, LEN), zoom, LEN);
        x0 = BigMath.lng_add_2_2(translate_x, x0, LEN);

        var diverged = false;
        var x = Array.from(x0);
        var y = Array.from(y0);
        var color = 0;
        for (var k = 0; k < MAX_ITER; k++) {

            var sq_x = BigMath.lng_mul_2_2(x, x, LEN);
            var sq_y = BigMath.lng_mul_2_2(y, y, LEN);

            var _tmp_x = BigMath.lng_sub_2_2(sq_x, sq_y, LEN);
            var new_x = BigMath.lng_add_2_2(x0, _tmp_x, LEN);

            var _tmp_y = BigMath.lng_mul_2_1(BigMath.lng_mul_2_2(x, y, LEN), 2, LEN);
            var new_y = BigMath.lng_add_2_2(y0, _tmp_y, LEN);

            color = k / MAX_ITER;

            var sum_sq = BigMath.lng_add_2_2(sq_x, sq_y, LEN);
            if (BigMath.lng_cmp_2_2(sum_sq, DIVERGE_DIAM, LEN) > 0) {
                diverged = true;
                break;
            }

            x = new_x;
            y = new_y;
        }

        var _color = diverged ? Math.floor(256 * color) : 0;
        ctx.fillStyle = 'rgb(' + _color + ',' + _color + ',' + 0 + ')';
        ctx.fillRect(j, i, 1, 1);
    }
}

draw_time = Date.now() - draw_time;
console.log('%c' + 'Draw time: ' + draw_time + ' ms', 'color: navy');

// LEN = 10
// Draw time: 30465 ms

// LEN = 2 (minimal fractional part)
// Draw time: 3738 ms