precision highp float;

varying vec2 position2;
varying vec2 texcoords2;

uniform sampler2D tex;
uniform vec2 u_resolution;

uniform sampler2D speeds;

float map(float value, float istart, float istop, float ostart, float ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

void main() {
    vec2 coords = (vec2(position2.x, -position2.y) + 1.) / 2.;

    // vec4 p = texture2D(tex, coords);
    // vec4 indexed_position = texture2D(position, coords);

    for(int i = -2; i <= 2; i++) {
        for(int j = -2; j <= 2; j++) {
            vec2 r_pos = coords * u_resolution;
            vec2 ri_pos = r_pos + vec2(i, j);
            vec2 ip_pos = ri_pos / u_resolution;

            if(ip_pos.x > 0. && ip_pos.y > 0.) {
                if(ip_pos.x < 1. && ip_pos.y < 1.) {
                    vec4 ip = texture2D(tex, ip_pos);

                    // if(ip == vec4(vec3(0.), 1.))
                    //     continue;

                    vec4 ip_cod = ip * 255.;
                    float index = ip_cod.z + (ip_cod.y + (ip_cod.x * 255.) * 255.) * 255.;
                    // float index = 1. + (0. + (0. * 255.) * 255.) * 255.;

                    int x = int(mod(index, u_resolution.x));
                    int y = int(floor(index / u_resolution.x));

                    vec4 indexed_speed_i = texture2D(speeds, vec2(x, y) / u_resolution);

                    // vec4 indexed_speed_i = texture2D(speeds, vec2(0.002, 0.002));

                    if(indexed_speed_i.z != 0.) {
                        vec2 r_speed_i = (indexed_speed_i.xy * 2. - 1.) * 2.;

                        if(r_speed_i == vec2(0)) r_speed_i = vec2(0.1, 0.1);

                        vec2 f_pos = ri_pos + r_speed_i;

                        if(abs(f_pos - r_pos).x < .5 && abs(f_pos - r_pos).y < .5) {
                            gl_FragColor = ip;
                            return;
                        }
                    }
                }
            }            
        }
    }

    gl_FragColor = vec4(vec3(0.), 1.);
}
