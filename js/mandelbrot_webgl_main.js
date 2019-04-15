
var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 1;

// create canvas
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
renderer.domElement.id = 'main-canvas';

// create mandelbrot mesh
var geometry = new THREE.PlaneGeometry(2, 2, 0);
// var material = new THREE.ShaderMaterial({
//     uniforms: {
//         time: {type: 'f', value: 0.0},
//         len: {value: 2},
//         kzoom: {value: [2.0, 0.0]},
//         ktranslate: {value: [new THREE.Vector2(0.0, 0.0), new THREE.Vector2(0.0, 0.0)]}
//     },
//     vertexShader: document.getElementById('mandelbrot-vertex').innerHTML,
//     fragmentShader: document.getElementById('mandelbrot-fragment').innerHTML
// });
// var mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

var zoomSpeed = 0.0,
    zoomAcceleration = 0.0,
    zoomAccelerationInc = 2.0 * 0.35,
    k_frict = 0.4,
    k_delta = 0.01;
var pan_speed = 2.0;

function sign(v) {
    return v > 0 ? 1 : (v < 0 ? -1 : 0);
}

var tests_time = Date.now();
new BigMathTests().execute();
tests_time = Date.now() - tests_time;
console.log('%c' + 'Total time: ' + tests_time + ' ms', 'color: navy');

var isMouseDown = false,
    dragPosition = null,
    _translate = null;
function onDocumentMouseDown(e) {
    isMouseDown = true;
    dragPosition = [
        e.pageX / window.innerWidth * pan_speed * material.uniforms.kzoom.value,
        e.pageY / window.innerHeight * pan_speed * material.uniforms.kzoom.value
    ];
    _translate = material.uniforms.ktranslate.value;
}
function onDocumentMouseMove(e) {
    if (isMouseDown) {
        var _position = [
            e.pageX / window.innerWidth * pan_speed * material.uniforms.kzoom.value,
            e.pageY / window.innerHeight * pan_speed * material.uniforms.kzoom.value
        ];
        var _delta = new THREE.Vector2(-(_position[0] - dragPosition[0]), _position[1] - dragPosition[1]);
        var translateNew = _translate.clone();

        material.uniforms.ktranslate.value = translateNew.add(_delta);
    }
}
function onDocumentMouseUp(e) {
    isMouseDown = false;
    dragPosition = null;
    _translate = null;
}
function onDocumentMouseWheel(e) {
    zoomAccelerationInc = material.uniforms.kzoom.value * 0.35;
    zoomAcceleration = -sign(e.wheelDeltaY) * zoomAccelerationInc;
}

document.addEventListener('mousewheel', onDocumentMouseWheel, false);
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);

var prevTime = 0.0;
function render (time) {
    requestAnimationFrame(render);

    // if (time) {
    //     material.uniforms.time.value = time;
    //     var delta = (time - prevTime) * k_delta;
    //
    //     var _zoomSpeed = zoomSpeed;
    //     zoomSpeed += delta * (
    //         // total acceleration
    //         zoomAcceleration +
    //         (-k_frict * zoomSpeed)
    //     );
    //     if (sign(_zoomSpeed * zoomSpeed) < 0/* || Math.abs(zoomSpeed) < 10e-4*/) {
    //         zoomSpeed = 0.0;
    //     }
    //     zoomAcceleration = 0.0;
    //
    //     var _zoom = material.uniforms.kzoom.value;
    //     var newZoom = _zoom + zoomSpeed * delta;
    //     //console.log('%c' + _zoom + ' ' + newZoom, 'color: #ff0000');
    //
    //     if (sign(newZoom) < 0) {
    //         newZoom = _zoom;
    //     }
    //     material.uniforms.kzoom.value = newZoom;
    //
    //     document.getElementsByClassName('zoom-label')[0].innerHTML = material.uniforms.kzoom.value;
    //     document.getElementsByClassName('pos-x-label')[0].innerHTML = material.uniforms.ktranslate.value.x;
    //     document.getElementsByClassName('pos-y-label')[0].innerHTML = material.uniforms.ktranslate.value.y;
    //     document.getElementsByClassName('speed-label')[0].innerHTML = zoomSpeed;
    //     document.getElementsByClassName('acc-label')[0].innerHTML = zoomAcceleration + (-k_frict * zoomSpeed);
    //     prevTime = time;
    // }
    renderer.render(scene, camera);
}

render();