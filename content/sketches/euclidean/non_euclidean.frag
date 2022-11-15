precision highp float;

uniform sampler2D texture;
uniform vec2 u_resolution;

void main() {
  vec2 uv = vec2(gl_FragCoord.x, gl_FragCoord.y) / u_resolution;
  gl_FragColor = texture2D(texture, vec2(uv.x, 1. - uv.y));
}