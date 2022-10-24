let testShader;
let slider;

function preload() {

    // Load shader with position2 varying
    const params = {
        precision: Tree.highp,
        matrices: Tree.NONE,
        varyings: Tree.position2
    }

    testShader = readShader('/showcase/sketches/mandelbulb/shader/setupTreegl/setup.frag', params);
}

function setup() {
    let canvas = createCanvas(725, 725, WEBGL);

    // Disable page scrolling when mouse over canvas
    parent.disableScroll(canvas.canvas);

    shader(testShader);

    slider = createSlider(0, 255, 100);
    slider.position(10, 10);
}

function draw() {
    background(0);
    testShader.setUniform('b', slider.value() / 255);
    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
