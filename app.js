let canvasGL;
let vertexShaderText = [].join('\n');
let fragmentShaderText = [].join('\n');


function start() {
    let canvas = document.getElementById("canvasGL");

    canvasGL = startWebGL(canvas);

    if (canvasGL) {
        canvasGL.clearColor(0.0, 0.0, 0.0, 1.0);
        canvasGL.enable(canvasGL.DEPTH_TEST);
        canvasGL.depthFunc(canvasGL.LEQUAL);
        canvasGL.clear(canvasGL.COLOR_BUFFER_BIT|canvasGL.DEPTH_BUFFER_BIT);
    }
}

function startWebGL(canvas) {
    canvasGL = null

    try {
        canvasGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch (e) {}

    if (!canvasGL) {
        alert("No se puede inicializar WebGL. El navegador no lo soporta.");
        canvasGL = null;
    }

    return canvasGL;
}