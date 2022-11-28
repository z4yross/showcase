precision highp float;

varying vec2 position2;
varying vec2 texcoords2;

uniform sampler2D tex;
uniform vec2 u_resolution;

void main() {
    vec2 coords = (vec2(position2.x, -position2.y) + 1.) / 2.;

    vec4 co = texture2D(tex, coords);

    if(co != vec4(0., 0., 0., 1.))
        gl_FragColor = vec4(1.);
    else gl_FragColor = vec4(0.);
}
