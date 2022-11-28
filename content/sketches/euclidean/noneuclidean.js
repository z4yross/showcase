let easycam;
let edge = 80;
let teapot;
let teapotTex;
let bunny;
let bunnyTex;
let leaf;
let leafTex;
let duck;
let duckTex;
let cactus;
let cactusTex;

let cams = [];
let graphics = [];
let texShaders = [];

function preload() {
    // no varyings need to be emitted from the vertex shader

    texShaders[0] = readShader('/showcase/sketches/euclidean/non_euclidean.frag', { varyings: Tree.NONE });
    texShaders[1] = readShader('/showcase/sketches/euclidean/non_euclidean.frag', { varyings: Tree.NONE });

    teapot = loadModel('/showcase/sketches/euclidean/teapot.obj', true);
    bunny = loadModel('/showcase/sketches/euclidean/bunny.obj', true);
    leaf = loadModel('/showcase/sketches/euclidean/leaf.obj', true);
    duck = loadModel('/showcase/sketches/euclidean/duck.obj', true);
    cactus = loadModel('/showcase/sketches/euclidean/cactus.obj', true);
}

function setup() {
    createCanvas(400, 400, WEBGL);
    const gSize = createVector(width / 2, height)

    teapotTex = createGraphics(gSize.x, gSize.y, WEBGL);
    bunnyTex = createGraphics(gSize.x, gSize.y, WEBGL);
    leafTex = createGraphics(gSize.x, gSize.y, WEBGL);
    duckTex = createGraphics(gSize.x, gSize.y, WEBGL);
    cactusTex = createGraphics(gSize.x, gSize.y, WEBGL);

    graphics[0] = createGraphics(gSize.x, gSize.y, WEBGL);
    graphics[1] = createGraphics(gSize.x, gSize.y, WEBGL);

    cams[0] = createEasyCam(graphics[0]._renderer, { distance: 500 });
    cams[1] = createEasyCam(graphics[1]._renderer, { distance: 500 });

    cams[0].setViewport([0, 0, width / 2, height]);
    cams[1].setViewport([width / 2, 0, width / 2, height]);

    cams[0].attachMouseListeners(this._renderer);
    cams[1].attachMouseListeners(this._renderer);

    graphics[0].shader(texShaders[0]);
    graphics[1].shader(texShaders[1]);

    graphics[0].emitResolution(texShaders[0]);
    graphics[1].emitResolution(texShaders[1]);
}

function cameraParams(graphics) {
    let position = graphics.treeLocation();
    let center = p5.Vector.add(position, graphics.treeDisplacement());
    let up = graphics.treeDisplacement(Tree.j);

    return { position, center, up };
}

function offcanvasRender({ position, center, up }) {
    bunnyTex.background(200);
    bunnyTex.reset();
    bunnyTex.camera(
        position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z
    );

    bunnyTex.push();
    bunnyTex.noStroke();
    bunnyTex.fill('red');
    bunnyTex.scale(1, -1);
    bunnyTex.scale(0.8);
    bunnyTex.model(bunny);
    bunnyTex.pop();

    teapotTex.background(200);
    teapotTex.reset();
    teapotTex.camera(
        position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z
    );

    teapotTex.push();
    teapotTex.noStroke();
    teapotTex.fill('blue');
    teapotTex.scale(1, -1);
    teapotTex.model(teapot);
    teapotTex.pop();

    leafTex.background(200);
    leafTex.reset();
    leafTex.camera(
        position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z
    );

    leafTex.push();
    leafTex.noStroke();
    leafTex.fill('black');
    leafTex.scale(0.8);
    leafTex.scale(1, -1);
    leafTex.model(leaf);
    leafTex.pop();

    duckTex.background(200);
    duckTex.reset();
    duckTex.camera(
        position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z
    );

    duckTex.push();
    duckTex.noStroke();
    duckTex.fill('yellow');
    duckTex.scale(0.6);
    duckTex.rotateX(PI/2);
    duckTex.model(duck);
    duckTex.pop();


    cactusTex.background(200);
    cactusTex.reset();
    cactusTex.camera(
        position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z
    );

    cactusTex.push();
    cactusTex.noStroke();
    cactusTex.fill('green');
    cactusTex.scale(0.6);
    cactusTex.rotateX(PI/2);
    cactusTex.scale(1, -1);
    cactusTex.model(cactus);
    cactusTex.pop();
}

function draw() {
    offcanvasRender(cameraParams(graphics[0]));
    tetrahedron(graphics[0], texShaders[0]);

    offcanvasRender(cameraParams(graphics[1]));
    octahedron(graphics[1], texShaders[1]);

    image(graphics[0], -width / 2, -height / 2);
    image(graphics[1], 0, -height / 2);
}

function cube(f, texShader) {
    f.background(0);
    f.reset();

    f.push();

    f.stroke('purple');
    f.strokeWeight(5);

    texShader.setUniform('texture', bunnyTex);
    f.beginShape();
    f.vertex(-edge, -edge, +edge);
    f.vertex(+edge, -edge, +edge);
    f.vertex(+edge, +edge, +edge);
    f.vertex(-edge, +edge, +edge);
    f.endShape(CLOSE);
    // right (+x)
    texShader.setUniform('texture', teapotTex);
    f.beginShape();
    f.vertex(+edge, -edge, +edge);
    f.vertex(+edge, -edge, -edge);
    f.vertex(+edge, +edge, -edge);
    f.vertex(+edge, +edge, +edge);
    f.endShape(CLOSE);
    // left (-x)
    texShader.setUniform('texture', duckTex);
    f.beginShape();
    f.vertex(-edge, -edge, +edge);
    f.vertex(-edge, -edge, -edge);
    f.vertex(-edge, +edge, -edge);
    f.vertex(-edge, +edge, +edge);
    f.endShape(CLOSE);
    // top (-y)
    texShader.setUniform('texture', leafTex);
    f.beginShape();
    f.vertex(-edge, -edge, +edge);
    f.vertex(-edge, -edge, -edge);
    f.vertex(+edge, -edge, -edge);
    f.vertex(+edge, -edge, +edge);
    f.endShape(CLOSE);
    // left (+y)
    texShader.setUniform('texture', cactusTex);
    f.beginShape();
    f.vertex(-edge, +edge, +edge);
    f.vertex(-edge, +edge, -edge);
    f.vertex(+edge, +edge, -edge);
    f.vertex(+edge, +edge, +edge);
    f.endShape(CLOSE);
    // back (-z)
    texShader.setUniform('texture', bunnyTex);
    f.beginShape();
    f.vertex(-edge, -edge, -edge);
    f.vertex(+edge, -edge, -edge);
    f.vertex(+edge, +edge, -edge);
    f.vertex(-edge, +edge, -edge);
    f.endShape(CLOSE);

    f.pop();
}

function tetrahedron(f, texShader) {
    f.background(0);
    f.reset();

    f.push();

    f.stroke('purple');
    f.strokeWeight(5);

    texShader.setUniform('texture', bunnyTex);
    f.beginShape();
    f.vertex(0, -edge, 0);
    f.vertex(+edge, +edge, +edge);
    f.vertex(-edge, +edge, +edge);
    f.endShape(CLOSE);

    texShader.setUniform('texture', teapotTex);
    f.beginShape();
    f.vertex(0, -edge, 0);
    f.vertex(+edge, +edge, +edge);
    f.vertex(+edge, +edge, -edge);
    f.endShape(CLOSE);

    texShader.setUniform('texture', duckTex);
    f.beginShape();
    f.vertex(0, -edge, 0);
    f.vertex(-edge, +edge, +edge);
    f.vertex(-edge, +edge, -edge);
    f.endShape(CLOSE);

    texShader.setUniform('texture', cactusTex);
    f.beginShape();
    f.vertex(0, -edge, 0);
    f.vertex(-edge, +edge, -edge);
    f.vertex(+edge, +edge, -edge);
    f.endShape(CLOSE);

    texShader.setUniform('texture', leafTex);
    f.beginShape();
    f.vertex(-edge, +edge, +edge);
    f.vertex(-edge, +edge, -edge);
    f.vertex(+edge, +edge, -edge);
    f.vertex(+edge, +edge, +edge);
    f.endShape(CLOSE);

    f.pop();
}

function octahedron(f, texShader) {
    f.background(0);
    f.reset();

    f.push();

    f.stroke('purple');
    f.strokeWeight(5);

    // TOP
    texShader.setUniform('texture', bunnyTex);
    f.beginShape();
    f.vertex(0, -edge, 0);
    f.vertex(+edge, 0, +edge);
    f.vertex(-edge, 0, +edge);
    f.endShape(CLOSE);

    texShader.setUniform('texture', teapotTex);
    f.beginShape();
    f.vertex(0, -edge, 0);
    f.vertex(+edge, 0, +edge);
    f.vertex(+edge, 0, -edge);
    f.endShape(CLOSE);

    texShader.setUniform('texture', leafTex);
    f.beginShape();
    f.vertex(0, -edge, 0);
    f.vertex(-edge, 0, +edge);
    f.vertex(-edge, 0, -edge);
    f.endShape(CLOSE);

    texShader.setUniform('texture', cactusTex);
    f.beginShape();
    f.vertex(0, -edge, 0);
    f.vertex(-edge, 0, -edge);
    f.vertex(+edge, 0, -edge);
    f.endShape(CLOSE);

    // bottom
    texShader.setUniform('texture', leafTex);
    f.beginShape();
    f.vertex(0, +edge, 0);
    f.vertex(+edge, 0, +edge);
    f.vertex(-edge, 0, +edge);
    f.endShape(CLOSE);

    texShader.setUniform('texture', bunnyTex);
    f.beginShape();
    f.vertex(0, +edge, 0);
    f.vertex(+edge, 0, +edge);
    f.vertex(+edge, 0, -edge);
    f.endShape(CLOSE);

    texShader.setUniform('texture', cactusTex);
    f.beginShape();
    f.vertex(0, +edge, 0);
    f.vertex(-edge, 0, +edge);
    f.vertex(-edge, 0, -edge);
    f.endShape(CLOSE);

    texShader.setUniform('texture', duckTex);
    f.beginShape();
    f.vertex(0, +edge, 0);
    f.vertex(-edge, 0, -edge);
    f.vertex(+edge, 0, -edge);
    f.endShape(CLOSE);

    f.pop();
}

function mouseWheel() {
    return false;
}