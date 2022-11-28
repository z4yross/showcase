const PARTICLE_COUNT = 100000;

let easycam;

let particleShader;
let positionShader;
let speedShader;
let accelerationShader;
let hashShader;

let positionBuffer;
let speedBuffer;
let accelerationBuffer;
let hashBuffer;

let positionGraphics;
let speedGraphics;
let accelerationGraphics;
let hashGraphics;
let particleGraphics;

let showOptions = [];
let currentImage = 0;

function preload() {
    particleShader = readShader('/showcase/sketches/particles/shaders/particles.frag', { precision: Tree.highp, matrices: Tree.NONE, varyings: [Tree.position2 | Tree.texcoords2] });
    hashShader = readShader('/showcase/sketches/particles/shaders/poshash.frag', { precision: Tree.highp, matrices: Tree.NONE, varyings: [Tree.position2 | Tree.texcoords2] });
    positionShader = readShader('/showcase/sketches/particles/shaders/position.frag', { precision: Tree.highp, matrices: Tree.NONE, varyings: [Tree.position2 | Tree.texcoords2] });
    speedShader = readShader('/showcase/sketches/particles/shaders/speed.frag', { precision: Tree.highp, matrices: Tree.NONE, varyings: [Tree.position2 | Tree.texcoords2] });
    accelerationShader = readShader('/showcase/sketches/particles/shaders/acceleration.frag', { precision: Tree.highp, matrices: Tree.NONE, varyings: [Tree.position2 | Tree.texcoords2] });
}

function setup() {
    createCanvas(725, 725, WEBGL);
    // easycam = createEasyCam({ distance: 500 });

    pixelDensity(1);
    

    positionBuffer = createImage(width, height);
    speedBuffer = createImage(width, height);
    accelerationBuffer = createImage(width, height);
    hashBuffer = createImage(width, height);

    positionGraphics = createGraphics(width, height, WEBGL);
    speedGraphics = createGraphics(width, height, WEBGL);
    accelerationGraphics = createGraphics(width, height, WEBGL);
    hashGraphics = createGraphics(width, height, WEBGL);
    particleGraphics = createGraphics(width, height, WEBGL);

    accelerationGraphics.pixelDensity(1);
    speedGraphics.pixelDensity(1);
    positionGraphics.pixelDensity(1);
    hashGraphics.pixelDensity(1);

    accelerationGraphics.textureMode(NORMAL);
    speedGraphics.textureMode(NORMAL);
    positionGraphics.textureMode(NORMAL);
    hashGraphics.textureMode(NORMAL);
    textureMode(NORMAL);

    initializeBuffers();
    initializeGraphics();

    accelerationGraphics.shader(accelerationShader);
    speedGraphics.shader(speedShader);
    positionGraphics.shader(positionShader);
    hashGraphics.shader(hashShader);

    particleGraphics.shader(particleShader);

    showOptions = [particleGraphics, accelerationGraphics, speedGraphics, hashGraphics];
}

function initializeBuffers() {
    positionBuffer.loadPixels();
    speedBuffer.loadPixels();
    accelerationBuffer.loadPixels();
    hashBuffer.loadPixels();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        x = int(random(width));
        y = int(random(height));

        let index = (x + y * width) * 4;

        if (hashBuffer.pixels[index] === 255) {
            i--;
            continue;
        }

        writeColor(
            hashBuffer,
            x,
            y,
            floor(i / (255 * 255)),
            floor((i % (255 * 255)) / (255)),
            (i % (255 * 255)) % 255,
            255
        );

        positionBuffer.pixels[i * 4] = map(x, 0, width, 0, 255);
        positionBuffer.pixels[i * 4 + 1] = map(y, 0, height, 0, 255);
        positionBuffer.pixels[i * 4 + 2] = 255;
        positionBuffer.pixels[i * 4 + 3] = 255;

        speedBuffer.pixels[i * 4] = 0;
        speedBuffer.pixels[i * 4 + 1] = 255;
        speedBuffer.pixels[i * 4 + 2] = 255;
        speedBuffer.pixels[i * 4 + 3] = 255;

        let ax = random(0.40,0.52);
        let ay = random(0.45,0.55);

        ax = ax == 0.5 ? ax - 0.01 : ax;
        ay = ay == 0.5 ? ay + 0.01 : ay;

        accelerationBuffer.pixels[i * 4] = map(ax, 0, 1, 0, 255);
        accelerationBuffer.pixels[i * 4 + 1] = map(ay, 0, 1, 0, 255);
        accelerationBuffer.pixels[i * 4 + 2] = 255;
        accelerationBuffer.pixels[i * 4 + 3] = 255;
    }

    positionBuffer.updatePixels();
    speedBuffer.updatePixels();
    accelerationBuffer.updatePixels();
    hashBuffer.updatePixels();
}

function initializeGraphics() {
    accelerationGraphics.image(accelerationBuffer, -width / 2, -height / 2);
    speedGraphics.image(speedBuffer, -width / 2, -height / 2);
    positionGraphics.image(positionBuffer, -width / 2, -height / 2);
    hashGraphics.image(hashBuffer, -width / 2, -height / 2);
}

function draw() {
    background(0);
    // updateGraphics();
    drawShader();
    // updateBuffers();
}

function drawShader() {    
    accelerationShader.setUniform('tex', accelerationGraphics);
    // accelerationShader.setUniform('positions', positionGraphics);
    accelerationShader.setUniform('positionsHash', hashGraphics);
    accelerationGraphics.quad(-1, -1, 1, -1, 1, 1, -1, 1);

    // image(accelerationGraphics, -width / 2, -height / 2);
    
    speedShader.setUniform('tex', speedGraphics);
    speedShader.setUniform('acceleration', accelerationGraphics);
    speedGraphics.quad(-1, -1, 1, -1, 1, 1, -1, 1);

    // image(speedGraphics, -width / 2, -height / 2);
    

    // // positionGraphics.background(0);
    // // positionGraphics.reset();
    // // positionGraphics.image(positionBuffer, -width / 2, -height / 2);
    // positionGraphics.shader(positionShader);
    // positionShader.setUniform('tex', positionBuffer);
    // positionShader.setUniform('positions', speedBuffer);
    // positionGraphics.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    // copyImage(positionGraphics, positionBuffer);

    // // image(positionGraphics, -width / 2, -height / 2);

    // // hashGraphics.background(0);
    // // hashGraphics.reset();
    // // hashGraphics.image(hashBuffer, -width / 2, -height / 2);
    // hashGraphics.shader(hashShader);
    hashShader.setUniform('tex', hashGraphics);
    hashShader.setUniform('speeds', speedGraphics);
    emitResolution(hashShader, [uniform = 'u_resolution']);
    hashGraphics.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    // copyImage(hashGraphics, hashBuffer);

    // image(hashGraphics, -width / 2, -height / 2);

    particleGraphics.background(0);
    particleGraphics.reset();

    particleShader.setUniform('tex', hashGraphics);
    particleGraphics.quad(-1, -1, 1, -1, 1, 1, -1, 1);

    image(showOptions[currentImage], -width / 2, -height / 2);
}

function writeColor(image, x, y, red, green, blue, alpha) {
    let index = (x + y * width) * 4;
    image.pixels[index] = red;
    image.pixels[index + 1] = green;
    image.pixels[index + 2] = blue;
    image.pixels[index + 3] = alpha;
}

function copyImage(from, to) {
    to.copy(from, -width / 2, -height / 2, from.width, from.height, 0, 0, to.width, to.height);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        currentImage = currentImage == 0 ? showOptions.length - 1 : --currentImage;
    } if(keyCode === RIGHT_ARROW){
        currentImage = currentImage == showOptions.length -1 ? 0 : ++currentImage;
    }
}
