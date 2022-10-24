let rayMarchingShader;
let easycam;

function preload() {

    // Load shader with position2 varying
    params = {
        precision: Tree.highp, 
        matrices: Tree.NONE, 
        varyings: Tree.position2
    }
    
    rayMarchingShader = readShader('/showcase/sketches/mandelbulb/shader/rayMarching/static/raymarching.frag', params);
}

function setup() {
    let canvas = createCanvas(725, 725, WEBGL);

    parent.disableScroll(canvas.canvas);

    easycam = createEasyCam({ distance: 500 });

    shader(rayMarchingShader);
    textureMode(NORMAL);
    noStroke();
}

function draw() {
    background(0);
    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
