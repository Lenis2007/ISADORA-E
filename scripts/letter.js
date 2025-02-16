/* Se selecciona el div o elemento con la clase llamda .random-letter, así dar un evento de clic */
document.querySelector('.random-letter').addEventListener('click', function() {
    /* Se crea una variable en donde se guardan las letras del abecedario */
    const abc = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

    /* (): Dependiendo de la cantidad de letras de la variable abc se genera un número con math.random (generando numeros entre 0 y 1, decimales)
    []: Se utiliza para redondear el resultado de math.random a un numero entero, dado para utilizar como indice. */
    const randomLetter = abc[Math.floor(Math.random() * abc.length)];
    /* Se actualiza o se presenta la letra seleccionada en la variable randomLetter, en el div o elemento con clase llamada letter */
    document.querySelector('.letter').textContent = randomLetter;
});