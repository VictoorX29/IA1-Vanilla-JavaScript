// Importar array de preguntas
import { preguntas } from './data/preguntas.js';
import { tablero } from './data/tablero.js';

const partida = {
	turno: 'A',
	jugadores: {
		A: { nombre: 'Victor', posicion: 10 },
		B: { nombre: 'Alba', posicion: 10 },
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

// Función para cambiar de turno
const cambiarTurno = (jugador) => {
	console.log(partida.turno);
	if (jugador == 'A') partida.turno = 'B';
	if (jugador == 'B') partida.turno = 'A';
};

// Listener para posiciones del tablero
divTablero.addEventListener('click', (e) => {
	const rect = divTablero.getBoundingClientRect();
	const offsetX =
		Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10;
	const offsetY =
		Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10;
	alert('X : ' + offsetX + '\nY: ' + offsetY);
});

// Listener para empezar la partida con su función
buttonStartGame.addEventListener('click', colocarFichasInicio);
function colocarFichasInicio() {
	fichaA.style.display = 'block';
	fichaB.style.display = 'block';

	// Movemos las fichas a su posición inicial
	fichaA.style.left = tablero[partida.jugadores.A.posicion].fichas.a.x + '%';
	fichaA.style.top = tablero[partida.jugadores.A.posicion].fichas.a.y + '%';

	fichaB.style.left = tablero[partida.jugadores.B.posicion].fichas.b.x + '%';
	fichaB.style.top = tablero[partida.jugadores.B.posicion].fichas.b.y + '%';
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
	cont = 1;
	console.log('Dado generado : ' + dado);
	moverFicha(fichaA, partida.jugadores.A, dado);
});
buttonFichaB.addEventListener('click', () => {
	const dado = generarDado();
	cont = 1;
	console.log('Dado generado : ' + dado);
	moverFicha(fichaB, partida.jugadores.B, dado);
});

// Función rescursiva para mover las fichas
let cont = 1;
function moverFicha(ficha, jugador, dado) {
	if (jugador.posicion >= 36 && dado > 0) {
		cont *= -1;
	}
	const inter = setInterval(() => {
		if (dado > 0) {
			jugador.posicion += cont;
			ficha.style.left =
				tablero[jugador.posicion].fichas[partida.turno.toLowerCase()].x + '%';
			ficha.style.top =
				tablero[jugador.posicion].fichas[partida.turno.toLowerCase()].y + '%';
			moverFicha(ficha, jugador, dado - 1);
		}
		clearInterval(inter);
	}, 500);
}

// }
// const hola = await moverFicha(fichaA, partida.jugadores.A, 2);
// console.log(hola);
