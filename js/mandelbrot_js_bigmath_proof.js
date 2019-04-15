
var canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
document.body.appendChild(canvas);

var divinfo = document.createElement('div');
document.body.appendChild(divinfo);

var ctx = canvas.getContext("2d");

var LEN = 2;
var MAX_ITER = 100;
var DIVERGE_DIAM = BigMath.lng_create_2_1(4, LEN);

var _05 = BigMath.lng_create_2_1(1, LEN);
_05[1] = 0;
_05[2] = 0.5 * BigMath.BASE;

var view_coeff = BigMath.lng_create_2_1(1, LEN);
view_coeff[1] = 0;
view_coeff[2] = 0.0066666666 * BigMath.BASE;

var zoom = BigMath.lng_create_2_1(1, LEN);

var translate_x = BigMath.lng_create_2_1(0, LEN);
var translate_y = BigMath.lng_create_2_1(0, LEN);

var draw_fractal = function () {
    var draw_time = Date.now();

    for (var i = 0; i < 300; i++) {

        console.log('%c' + Math.floor(100 * i / 300) + '%', 'color: navy');
        // [-1, 1]
        var y0 = BigMath.lng_mul_2_2(BigMath.lng_create_2_1(i - 150, LEN), view_coeff, LEN);
        // [-zoom; zoom]
        y0 = BigMath.lng_mul_2_2(y0, zoom, LEN);
        y0 = BigMath.lng_add_2_2(translate_y, y0, LEN);

        for (var j = 0; j < 300; j++) {

            // console.log('%c' + Math.floor(100 * j / 300) + '%', 'color: lime');

            var x0 = BigMath.lng_mul_2_2(BigMath.lng_create_2_1(j - 150, LEN), view_coeff, LEN);
            x0 = BigMath.lng_mul_2_2(x0, zoom, LEN);
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
    divinfo.innerHTML = 'Draw time: ' + draw_time + ' ms' +
        '<br/>' + 'Zoom: ' + BigMath.toString(zoom, LEN) +
        '<br/>' + 'Tx: ' + BigMath.toString(translate_x, LEN) +
        '<br/>' + 'Ty: ' + BigMath.toString(translate_y, LEN) +
        '<br/>' + 'MAX_ITER: ' + MAX_ITER;

// crosshair
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0, 150, 300,   1);
    ctx.fillRect(150, 0,   1, 300);
};

var onMouseUp = function (e) {

    /**
     * new_zoom = zoom / 2;
     * pos = pos + new_zoom * delta(sector);
     */

    var sector_x = Math.floor(e.pageX / 150),
        sector_y = Math.floor(e.pageY / 150);
    sector_x = sector_x === 0 ? -1 : 1;
    sector_y = sector_y === 0 ? -1 : 1;

    zoom = BigMath.lng_mul_2_2(zoom, _05, LEN); // 1 -> 0.5

    var dx = BigMath.lng_mul_2_2(BigMath.lng_create_2_1(sector_x, LEN), zoom, LEN);
    var dy = BigMath.lng_mul_2_2(BigMath.lng_create_2_1(sector_y, LEN), zoom, LEN);

    translate_x = BigMath.lng_add_2_2(translate_x, dx, LEN);
    translate_y = BigMath.lng_add_2_2(translate_y, dy, LEN);

    // upd MAX_ITER
    if (LEN === 2 && zoom[2] < 100) {
        MAX_ITER = 500;
        LEN = 3;
        zoom.push(0);
        translate_x.push(0);
        translate_y.push(0);
    }
    if (LEN === 3 && zoom[3] < 100) {
        MAX_ITER = 1000;
        LEN = 4;
        zoom.push(0);
        translate_x.push(0);
        translate_y.push(0);
    }
    if (LEN === 4 && zoom[4] < 100) {
        MAX_ITER = 5000;
        LEN = 5;
        zoom.push(0);
        translate_x.push(0);
        translate_y.push(0);
    }

    draw_fractal();
};

draw_fractal();

canvas.addEventListener('mouseup', onMouseUp, false);

// LEN = 10
// Draw time: 30465 ms

// LEN = 2 (minimal fractional part)
// Draw time: 3738 ms