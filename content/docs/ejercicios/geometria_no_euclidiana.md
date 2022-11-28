# Geometria no euclidiana
<script>
    function disableScroll(canvas){
        canvas.onwheel = function(event){
            event.preventDefault();
        };

        canvas.onmousewheel = function(event){
            event.preventDefault();
        };
    }
</script>


{{< p5-iframe sketch="/showcase/sketches/euclidean/noneuclidean.js" width="725" height="725" stylesheet="/showcase/css/styles.css" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no" lib1="/showcase/sketches/libraries/p5.easycam.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js">}}

{{< details "Fragment shader noneuclidean.frag">}}
{{< highlight glsl>}}
precision highp float;

uniform sampler2D texture;
uniform vec2 u_resolution;

void main() {
  vec2 uv = vec2(gl_FragCoord.x, gl_FragCoord.y) / u_resolution;
  gl_FragColor = texture2D(texture, vec2(uv.x, 1. - uv.y));
}
{{< / highlight >}}
{{< /details >}}