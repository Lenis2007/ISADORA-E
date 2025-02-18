/* // 2 jugadores: Indice 0, 3 jugadores: Indice 1, 4 jugadores: Indice 2*/
let indexNumber = 0; // Índice de las, es decir, la posición actual de la diapositiva o div

/*  Variables para almacenar las coordenadas de inicio y fin del deslizamiento o toque, de tal manera 
que se determine que diapositiva o div tiene que aparecer a continuación.*/
let startX = 0; // Coordenada inicial del deslizamiento o toque
let endX = 0; // Coordenada final del deslizamiento o toque
let jugadores = []; // Número de jugadores

/* Selecciona o almacena los divs creados con la clase slide. */
const sliderElement = document.querySelector('.slider');
const playButton = document.getElementById('btn-play');

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

function seleccionarJugadores(num) {
    jugadores = [];
    for (let i = 1; i <= num; i++) {
        jugadores.push(`Jugador ${i}`);
    }
}

function startGame() {
    const playSection = document.getElementById('players')
    const gameSection = document.getElementById('game')


    if (playSection && gameSection) {
        playSection.classList.add('oculto');
        gameSection.classList.remove('oculto');
        resultadoSection.classList.add('oculto');
        turnoActual = 0;
        palabrasIngresadas = {};
        jugadores.forEach(j => palabrasIngresadas[j] = []);
        letter();
        iniciarTurno();
    } else {
    }
}

function letter() {
    /* Se selecciona el div o elemento con la clase llamda .random-letter, así dar un evento de clic */
    document.querySelector('.random-letter').addEventListener('click', function () {
        /* Se crea una variable en donde se guardan las letras del abecedario */
        const abc = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

        /* (): Dependiendo de la cantidad de letras de la variable abc se genera un número con math.random (generando numeros entre 0 y 1, decimales)
        []: Se utiliza para redondear el resultado de math.random a un numero entero, dado para utilizar como indice. */
        const randomLetter = abc[Math.floor(Math.random() * abc.length)];
        /* Se actualiza o se presenta la letra seleccionada en la variable randomLetter, en el div o elemento con clase llamada letter */
        document.querySelector('.letter').textContent = randomLetter;
    });
}

function iniciarTurno() {
    if (turnoActual >= jugadores.length) {
        mostrarResultados();
        return;
    }

    let jugador = jugadores[turnoActual];
    document.getElementById('nombre-jugador').textContent = jugador;
    document.getElementById('lista-palabras').innerHTML = '';
    document.getElementById('entrada-palabra').value = '';

    tiempoRestante = 60;
    document.getElementById('tiempo').textContent = tiempoRestante;

    interval = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempo').textContent = tiempoRestante;

        if (tiempoRestante <= 0) {
            clearInterval(interval);
            turnoActual++;
            iniciarTurno();
        }
    }, 1000);
}

/* Agregar palabras de manera que hay validadores utilizando condicionales
 para que no hayan palabras repetidas o que las palabras comiencen por 
 la letra dada de manera aleatoria */
function agregarPalabra() {
    let palabra = document.getElementById('entrada-palabra').value.trim().toUpperCase();
    const letraActual = document.querySelector('.letter').textContent;

    if (palabra === '' || palabra[0] !== letraActual) {
        alert('La palabra debe comenzar con la letra asignada.');
        return;
    }
    if (palabrasIngresadas[jugadores[turnoActual]].includes(palabra)) {
        alert('La palabra ya fue ingresada.');
        return;
    }

    palabrasIngresadas[jugadores[turnoActual]].push(palabra);
    document.getElementById('lista-palabras').innerHTML += `<li>${palabra}</li>`;
    document.getElementById('entrada-palabra').value = '';
}

const resultadoSection = document.getElementById('resultados');


function mostrarResultados() {
    document.getElementById('game').classList.add('oculto');
    resultadoSection.classList.remove('oculto');

    let resultadosHTML = '';
    let ranking = Object.keys(palabrasIngresadas)
    /* Se crea un nuevo array con la información dada, actualizando */
        .map(jugador => ({ nombre: jugador, total: palabrasIngresadas[jugador].length }))
        /* .sort: Arregla u organiza el arreglo dependiendo de la canitdad de palabras */
        .sort((a, b) => b.total - a.total);

    ranking.forEach((j, index) => {
        resultadosHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${j.nombre}</td>
                    <td>${j.total}</td>
                </tr>
            `;
    });

    document.getElementById('tabla-resultados').innerHTML = resultadosHTML;
}

/* Evento para el botón PLAY, dependiendo de las coordenas resultantes
guardadas en indexNumber, se sabe cuantos jugadores van a jugar. */
playButton.addEventListener('click', () => {
    let players;
    if (indexNumber === 0) {
        players = 2;
    } else if (indexNumber === 1) {
        players = 3;
    } else if (indexNumber === 2) {
        players = 4;
    }

    seleccionarJugadores(players);
    startGame();
});