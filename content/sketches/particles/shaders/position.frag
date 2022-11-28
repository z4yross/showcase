precision highp float;

varying vec2 position2;
varying vec2 texcoords2;

uniform sampler2D tex;
uniform vec2 u_resolution;

uniform sampler2D speed;

void main() {
    vec2 coords = (vec2(position2.x, -position2.y) + 1.) / 2.;

    vec4 p = texture2D(tex, coords);
    vec4 s = texture2D(speed, coords);

    if(p.z == 1.){
        gl_FragColor = vec4(p + (s * 2.));
    }
    else gl_FragColor = vec4(vec3(0.), 1.);
}
