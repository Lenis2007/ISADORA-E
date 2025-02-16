/* // 2 jugadores: Indice 0, 3 jugadores: Indice 1, 4 jugadores: Indice 2*/
let indexNumber = 0; // Índice de las, es decir, la posición actual de la diapositiva o div

/*  Variables para almacenar las coordenadas de inicio y fin del deslizamiento o toque, de tal manera 
que se determine que diapositiva o div tiene que aparecer a continuación.*/
let startX = 0; // Coordenada inicial del deslizamiento o toque
let endX = 0; // Coordenada final del deslizamiento o toque

/* Index: Este puede llegar a detectar el manejo de coordenadas, es decir, se da cuenta del deslizamiento que se hace según las diapositivas o divs que existen.*/
/* Maneja la actualizacistartXón de diapositivas según el index (deslizamiento) */
function positionSlide(index) {
    /* Selecciona o almacena los divs creados con la clase slide. */
    const slides = document.querySelectorAll('.slide');

    /* Condición: Si el indice es menor que 0, es decir que no existen más diapositivas, va a la primera (Deslizar de derecha a izquierda)) */
    if (index >= slides.length) {
        indexNumber = 0;

        /* 2 Condición: Si el indice es mayor o igual, es decir que no exiten más, vuelve a la última (Deslizar de izquierda a derecha) */
    } else if (index < 0) {
        indexNumber = slides.length - 1;

        /* Si no se cumplen ninguna de las condiciones anteriores, se estaciona en la diapositiva existente. */
    } else {
        indexNumber = index;
    }

    /* Transform: Permite traslaciones o rotaciones... 
    TranslateX: Representa el desplazamiento de manera horizontal o del eje x, permitiendo que aparezca la diapositiva correcta según la actualización de esté.*/
    document.querySelector('.slider').style.transform = `translateX(-${indexNumber * 100}%)`;
}

/* Selecciona o almacena los divs creados con la clase slide. */
const sliderElement = document.querySelector('.slider');


/* event.touches[0].clientX:
touches: Posee una lista de los puntos de contacto de la pantalla (propiedad de event).
touches[0]: Selecciona o se concentra en el punto de toque.
clientX: Propiedad individual dentro del evento touches, la cual obtiene la coordenada horizontal del toque de la pantalla.*/

/* Evento touchstart: Se activa cuando un punto tactil se activa, de esta forma se maneja el control deslizante, guardando la coordenada en startX a traves del evento. */
sliderElement.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

/* Evento touchmove: Se actualiza la coordenada según el movimiento táctil que se realice guardando la información en endX a través del evento. */
sliderElement.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX;
});

/* (startX - endX > 50):
#: Si es menor a 50, es más sensible a los movimientos o toques que se hagan en la pantalla, sean pequeños movimientos o toques accidentales.
#: Si es mayor a 50, es más deliberado ante los movimientos o toques, aunque se puede llegar a requerir movimientos largos para lograr el deslizamiento. */

/* Evento touchend: Compara las coordenadas, determinando el movimiento final, es decir, si se realiza el deslizamiento hacia la izquierda o derecha. */
sliderElement.addEventListener('touchend', () => {
    if (startX - endX > 50) {
        positionSlide(indexNumber + 1); // Deslizamiento hacia la izquierda
    } else if (endX - startX > 50) {
        positionSlide(indexNumber - 1); // Deslizamiento hacia la derecha
    }
});

