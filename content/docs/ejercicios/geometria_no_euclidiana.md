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