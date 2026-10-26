// Importar array de preguntas
import { preguntas } from './data/preguntas.js';

const tablero = [
	{
		fichas: {
			a: {
				x: 120,
				y: 860,
			},
			b: {
				x: 175,
				y: 860,
			},
		},
	},
	{
		fichas: {
			a: {
				x: 120,
				y: 0,
			},
			b: {
				x: 175,
				y: 0,
			},
		},
	},
];
const partida = {
	turno: 'A',
	jugadores: [
		{ nombre: '', posicion: 0 },
		{ nombre: '', posicion: 0 },
	],
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
const msgJugDado = ()

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
	msgTurnoJug.querySelector('span').textContent = partida.turno;
}

// Listeners buttons avanzar fichas

buttonFichaA.addEventListener('click', () => {});
buttonFichaB.addEventListener('click', () => {});
