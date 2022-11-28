precision highp float;

varying vec2 position2;
varying vec2 texcoords2;

uniform sampler2D tex;
uniform sampler2D acceleration;

void main() {
    vec2 coords = (vec2(position2.x, -position2.y) + 1.) / 2.;

    vec4 s = texture2D(tex, coords);
    vec2 a = texture2D(acceleration, coords).xy * 2. - 1.;
    if(s.z != 0.){
        gl_FragColor = vec4(s.xy + a, 1., 1.);
    }
    else gl_FragColor = vec4(vec3(0.), 1.);

    //  gl_FragColor = s;
}
