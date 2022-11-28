# Sistemas de particulas
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


![Sistema de particulas](https://upload.wikimedia.org/wikipedia/commons/2/21/Particles.jpg)

## Sistema parametrico

* La posición de cada partícula es calculada en función del tiempo.
* No necesita almacenar su estado.
* La partícula no puede cambiar su comportamiento.

## Sistema no parametrico

En cada frame se calcula la aceleración, velocidad y posición de la partícula en función al estado actual del sistema.

### Implementacion

* Texturas como buffers de aceleración, velocidad y posición.
* Shaders encargados de procesar cada buffer.
* Codificación de cada componente de aceleración y velocidad en un byte.
* Indexación de partículas por medio del color.

{{< p5-iframe sketch="/showcase/sketches/particles/particles.js" width="725" height="725" stylesheet="/showcase/css/styles.css" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no" lib1="/showcase/sketches/libraries/p5.easycam.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js">}}

### Trabajo a futuro

* Aumentar capacidad de codificación a 4 bytes por componente.
* Revisar alternativas de indexación.
* Expandir a 3 dimensiones.
* Implementar modelo de iluminación.

## Conclusiones

* El uso de varios shaders en una sola aplicación puede dar lugar a la creación de sistemas complejos.
* Las texturas pueden ser utilizadas como herramienta para la comunicación entre shaders.
* Los sistemas de partículas tienen amplias aplicaciones, desde simulación hasta entretenimiento.