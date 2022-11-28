precision mediump float;

uniform float brightness;
uniform int selector;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  if (selector == 1){
    gl_FragColor = brightness * ( uMaterial1 * uMaterial2 );
  }else if (selector == 2){
    gl_FragColor = brightness * ( uMaterial1 + uMaterial2 );
  }
  else if (selector == 3){
    gl_FragColor = min(uMaterial1*brightness, uMaterial2);
  }
  else if (selector == 4){
    gl_FragColor = max(uMaterial1*brightness, uMaterial2);
  }
  
}