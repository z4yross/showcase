precision highp float;

varying vec2 position2;
varying vec2 texcoords2;

uniform sampler2D tex;
uniform vec2 u_resolution;

// uniform sampler2D positions;
uniform sampler2D positionsHash;

void main() {
    vec2 coords = (vec2(position2.x, -position2.y) + 1.) / 2.;

    vec4 co = texture2D(tex, coords);

    if(co.z != 0.){
        gl_FragColor = co;
    } 
    else gl_FragColor = vec4(vec3(0.), 1.);

    // gl_FragColor = vec4(coords, 0., 1.);
    // gl_FragColor = vec4(co);
}
