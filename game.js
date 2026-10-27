// Importar array de preguntas
import { preguntas } from './data/preguntas.js';

const tablero = [
	// Columna 1 (sube)
	{ fichas: { a: { x: 120, y: 860 }, b: { x: 175, y: 860 } } },
	{ fichas: { a: { x: 120, y: 810 }, b: { x: 175, y: 810 } } },
	{ fichas: { a: { x: 120, y: 750 }, b: { x: 175, y: 750 } } },
	{ fichas: { a: { x: 120, y: 690 }, b: { x: 175, y: 690 } } },
	{ fichas: { a: { x: 125, y: 635 }, b: { x: 180, y: 635 } } },
	{ fichas: { a: { x: 130, y: 580 }, b: { x: 185, y: 580 } } },
	{ fichas: { a: { x: 125, y: 520 }, b: { x: 180, y: 520 } } },
	{ fichas: { a: { x: 135, y: 465 }, b: { x: 190, y: 465 } } },
	{ fichas: { a: { x: 130, y: 410 }, b: { x: 185, y: 410 } } },
	{ fichas: { a: { x: 125, y: 350 }, b: { x: 180, y: 350 } } },
	{ fichas: { a: { x: 120, y: 295 }, b: { x: 175, y: 295 } } },
	{ fichas: { a: { x: 125, y: 240 }, b: { x: 180, y: 240 } } },
	{ fichas: { a: { x: 120, y: 180 }, b: { x: 175, y: 180 } } },

	// Columna 2 (baja)
	{ fichas: { a: { x: 260, y: 180 }, b: { x: 315, y: 180 } } },
	{ fichas: { a: { x: 265, y: 235 }, b: { x: 320, y: 235 } } },
	{ fichas: { a: { x: 270, y: 290 }, b: { x: 325, y: 290 } } },
	{ fichas: { a: { x: 265, y: 350 }, b: { x: 320, y: 350 } } },
	{ fichas: { a: { x: 275, y: 405 }, b: { x: 330, y: 405 } } },
	{ fichas: { a: { x: 270, y: 460 }, b: { x: 325, y: 460 } } },
	{ fichas: { a: { x: 265, y: 520 }, b: { x: 320, y: 520 } } },
	{ fichas: { a: { x: 260, y: 575 }, b: { x: 315, y: 575 } } },
	{ fichas: { a: { x: 265, y: 630 }, b: { x: 320, y: 630 } } },
	{ fichas: { a: { x: 270, y: 690 }, b: { x: 325, y: 690 } } },
	{ fichas: { a: { x: 265, y: 745 }, b: { x: 320, y: 745 } } },
	{ fichas: { a: { x: 260, y: 805 }, b: { x: 315, y: 805 } } },
	{ fichas: { a: { x: 265, y: 860 }, b: { x: 320, y: 860 } } },

	// Columna 3 (sube)
	{ fichas: { a: { x: 400, y: 860 }, b: { x: 455, y: 860 } } },
	{ fichas: { a: { x: 405, y: 805 }, b: { x: 460, y: 805 } } },
	{ fichas: { a: { x: 410, y: 750 }, b: { x: 465, y: 750 } } },
	{ fichas: { a: { x: 405, y: 690 }, b: { x: 460, y: 690 } } },
	{ fichas: { a: { x: 415, y: 635 }, b: { x: 470, y: 635 } } },
	{ fichas: { a: { x: 410, y: 575 }, b: { x: 465, y: 575 } } },
	{ fichas: { a: { x: 405, y: 520 }, b: { x: 460, y: 520 } } },
	{ fichas: { a: { x: 400, y: 465 }, b: { x: 455, y: 465 } } },
	{ fichas: { a: { x: 405, y: 405 }, b: { x: 460, y: 405 } } },
	{ fichas: { a: { x: 410, y: 350 }, b: { x: 465, y: 350 } } },
	{ fichas: { a: { x: 405, y: 295 }, b: { x: 460, y: 295 } } },
	{ fichas: { a: { x: 400, y: 235 }, b: { x: 455, y: 235 } } },
	{ fichas: { a: { x: 405, y: 180 }, b: { x: 460, y: 180 } } },

	// Columna 4 (baja)
	{ fichas: { a: { x: 540, y: 180 }, b: { x: 595, y: 180 } } },
	{ fichas: { a: { x: 545, y: 235 }, b: { x: 600, y: 235 } } },
	{ fichas: { a: { x: 550, y: 295 }, b: { x: 605, y: 295 } } },
	{ fichas: { a: { x: 545, y: 350 }, b: { x: 600, y: 350 } } },
	{ fichas: { a: { x: 555, y: 405 }, b: { x: 610, y: 405 } } },
	{ fichas: { a: { x: 550, y: 460 }, b: { x: 605, y: 460 } } },
	{ fichas: { a: { x: 545, y: 520 }, b: { x: 600, y: 520 } } },
	{ fichas: { a: { x: 540, y: 575 }, b: { x: 595, y: 575 } } },
	{ fichas: { a: { x: 545, y: 630 }, b: { x: 600, y: 630 } } },
	{ fichas: { a: { x: 550, y: 685 }, b: { x: 605, y: 685 } } },
	{ fichas: { a: { x: 545, y: 745 }, b: { x: 600, y: 745 } } },
];
const partida = {
	turno: 'A',
	jugadores: {
		A: { nombre: 'Victor', posicion: 0 },
		B: { nombre: 'Alba', posicion: 0 },
	},
};
const generarDado = () => Math.floor(Math.random() * 6) + 1;

// Botones
const buttonStartGame = document.querySelector('#btnStartGame');
const buttonFichaA = document.querySelector('#buttonA');
const buttonFichaB = document.querySelector('#buttonB');

//
const fichaA = document.querySelector('.fichaA');
const fichaB = document.querySelector('.fichaB');
const divTablero = document.querySelector('.tablero img');

const msgTurnoJug = document.querySelector('#msgTurnoJugador');

// Mensaje para sacar por pantalla
const msgJugDado = (jugador, turno) =>
	`Es el turno del jugador ${turno} (${jugador.nombre}) - Posición ${jugador.posicion}`;

// Listener para posiciones del tablero
divTablero.addEventListener('click', (e) => {
	const rect = divTablero.getBoundingClientRect();
	const offsetX = e.clientX - rect.left;
	const offsetY = e.clientY - rect.top;
	alert('X : ' + offsetX + ' - Y: ' + offsetY);
});

// Listener para empezar la partida con su función
buttonStartGame.addEventListener('click', colocarFichasInicio);
function colocarFichasInicio() {
	fichaA.style.display = 'block';
	fichaB.style.display = 'block';

	// Movemos las fichas a su posición inicial
	fichaA.style.left = tablero[0].fichas.a.x + 'px';
	fichaA.style.top = tablero[0].fichas.a.y + 'px';

	fichaB.style.left = tablero[0].fichas.b.x + 'px';
	fichaB.style.top = tablero[0].fichas.b.y + 'px';
	buttonStartGame.removeEventListener('click', colocarFichasInicio);
	buttonStartGame.classList.add('hidden');
	msgTurnoJug.classList.remove('hidden');
	buttonFichaA.classList.remove('hidden');
	msgTurnoJug.textContent = msgJugDado(
		partida.jugadores[partida.turno],
		partida.turno,
	);
}

// Listeners buttons avanzar fichas
buttonFichaA.addEventListener('click', () => {
	const dado = generarDado();
	moverFicha(fichaA, partida.jugadores.A, dado);
});
buttonFichaB.addEventListener('click', () => {});

// Función rescursiva para mover las fichas
function moverFicha(ficha, jugador, dado = -1) {
	if (dado > 0) {
		// console.log(tablero[jugador.posicion].fichas[partida.turno.toLowerCase()]);
		jugador.posicion += 1;
		ficha.style.left =
			tablero[jugador.posicion].fichas[partida.turno.toLowerCase()].x + 'px';
		ficha.style.top =
			tablero[jugador.posicion].fichas[partida.turno.toLowerCase()].y + 'px';

		setInterval((dado) => {
			moverFicha(ficha, jugador, dado - 1);
		}, 1);
	}
}
