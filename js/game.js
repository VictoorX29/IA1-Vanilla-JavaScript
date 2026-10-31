// Importar array de preguntas
import { preguntas } from './data/preguntas.js';
import { tablero } from './data/tablero.js';
import { especiales } from './data/casillasEspeciales.js';

// Arrow function para números aleatorios (Dado y Preguntas)
// Recibe el número como límite y devuelve un número entre 1 y num
// En el caso del dado - se enviará el 6 (1-6)
// En el caso de las preguntas - se enviará preguntas.length (1-?)
const generarNum = (num) => Math.floor(Math.random() * num) + 1;

// QS Botones
const btnStartGame = document.querySelector('#btnStartGame');
const btnTirarDado = document.querySelector('#btnDado');
const btnReiniciar = document.querySelector('#btnReiniciar');
const btnResp1 = document.querySelector('#btnResp1');
const btnResp2 = document.querySelector('#btnResp2');
const btnResp3 = document.querySelector('#btnResp3');

// QS Divs
const fichaA = document.querySelector('.fichaA');
const fichaB = document.querySelector('.fichaB');
// const divTablero = document.querySelector('.tablero img');
const divPregRand = document.querySelector('#popUpPregunta');

// QS Texto
const msgTurnoJug = document.querySelector('#msgTurnoJugador');
const preEstadoPartida = document.querySelector('#preEstadoPartida');
const titPregunta = document.querySelector('#titPregunta');

// Mensaje para sacar por pantalla
const msgJugDado = (jugador, turno) =>
	`Es el turno del jugador ${turno} (${jugador.nombre}) - Posición ${jugador.posicion}`;

// Función para cambiar de turno
const alternarTurno = () => {
	btnTirarDado.disabled = false;
	if (partida.turno == 'A') {
		partida.turno = 'B';
	} else if (partida.turno == 'B') {
		partida.turno = 'A';
	} else {
		console.error('Error');
	}
	if (
		partida.jugadores.A.posicion == 36 &&
		partida.jugadores.B.posicion == 36
	) {
		console.log('La partida ha acabado.');
		btnTirarDado.disabled = true;
		return;
	}
	if (partida.jugadores[partida.turno].posicion == 36) {
		alternarTurno();
	}
	actualizarLS();
};
// // Listener para posiciones del tablero
// divTablero.addEventListener('click', (e) => {
// 	const rect = divTablero.getBoundingClientRect();
// 	const offsetX =
// 		Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10;
// 	const offsetY =
// 		Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10;
// 	alert('X : ' + offsetX + '\nY: ' + offsetY);
// });

// Listener para empezar la partida con su función
btnStartGame.addEventListener('click', colocarFichasInicio);
function colocarFichasInicio() {
	fichaA.style.display = 'block';
	fichaB.style.display = 'block';

	// Movemos las fichas a su posición inicial
	fichaA.style.left = tablero[partida.jugadores.A.posicion].fichas.a.x + '%';
	fichaA.style.top = tablero[partida.jugadores.A.posicion].fichas.a.y + '%';

	fichaB.style.left = tablero[partida.jugadores.B.posicion].fichas.b.x + '%';
	fichaB.style.top = tablero[partida.jugadores.B.posicion].fichas.b.y + '%';
	btnStartGame.removeEventListener('click', colocarFichasInicio);
	btnStartGame.classList.add('hidden');
	btnTirarDado.classList.remove('hidden');
	btnReiniciar.classList.remove('hidden');
	actualizarLS();
}

// Función para comprobar casilla especial
function comprobarCasillaEsp(jugador) {
	for (const casEsp of especiales) {
		if (jugador.posicion === casEsp.casilla) {
			return casEsp;
		}
	}
	return false;
}

// Función para mostrar pregunta aleatoria
function mostrarPregunta(ficha, jugador) {
	const num = generarNum(preguntas.length);
	const pregRand = preguntas[num];
	titPregunta.textContent = pregRand.pregunta;
	btnResp1.textContent = pregRand.respuestas[0];
	btnResp2.textContent = pregRand.respuestas[1];
	btnResp3.textContent = pregRand.respuestas[2];
	divPregRand.classList.remove('hidden');
	if (divPregRand.checkVisibility()) {
		document.addEventListener('keydown', verificarRespuesta);
		btnResp1.addEventListener('click', verificarRespuesta);
		btnResp2.addEventListener('click', verificarRespuesta);
		btnResp3.addEventListener('click', verificarRespuesta);
	} else {
		console.log('Error');
	}
	function verificarCorrecta(respuesta, correcta) {
		return respuesta === correcta;
	}
	function verificarRespuesta(e) {
		const tecla = e.key;
		const button = e.target;
		const buttonId = button.id.slice(7, 8);
		let resp = '';
		if (tecla === '1' || tecla === '2' || tecla === '3') {
			divPregRand.classList.add('hidden');
			resp = verificarCorrecta(tecla - 1, pregRand.correcta);
			if (resp) {
				document.removeEventListener('keydown', verificarRespuesta);
				btnResp1.removeEventListener('click', verificarRespuesta);
				btnResp2.removeEventListener('click', verificarRespuesta);
				btnResp3.removeEventListener('click', verificarRespuesta);
				alert('Respuesta correcta');
				alternarTurno();
				return;
			} else {
				document.removeEventListener('keydown', verificarRespuesta);
				btnResp1.removeEventListener('click', verificarRespuesta);
				btnResp2.removeEventListener('click', verificarRespuesta);
				btnResp3.removeEventListener('click', verificarRespuesta);
				alert('Respuesta incorrecta');
				moverFicha(ficha, jugador, -1, false, 0);
				return;
			}
		} else if (buttonId === '1' || buttonId === '2' || buttonId === '3') {
			divPregRand.classList.add('hidden');
			resp = verificarCorrecta(buttonId - 1, pregRand.correcta);
			if (resp) {
				document.removeEventListener('keydown', verificarRespuesta);
				btnResp1.removeEventListener('click', verificarRespuesta);
				btnResp2.removeEventListener('click', verificarRespuesta);
				btnResp3.removeEventListener('click', verificarRespuesta);
				alert('Respuesta correcta');
				alternarTurno();
				return;
			} else {
				document.removeEventListener('keydown', verificarRespuesta);
				btnResp1.removeEventListener('click', verificarRespuesta);
				btnResp2.removeEventListener('click', verificarRespuesta);
				btnResp3.removeEventListener('click', verificarRespuesta);
				alert('Respuesta incorrecta');
				moverFicha(ficha, jugador, -1, false, 0);
				return;
			}
		}
	}
}

// Botón para generar dado aleatorio y mover la ficha del turno
btnDado.addEventListener('click', () => {
	// const dado = generarNum(6);
	const dado = 3;
	if (partida.turno === 'A') {
		moverFicha(fichaA, partida.jugadores.A, dado, true);
	} else if (partida.turno === 'B') {
		moverFicha(fichaB, partida.jugadores.B, dado, true);
	} else {
		alert('Error');
	}
});

// Función rescursiva para mover las fichas
function moverFicha(ficha, jugador, dado, adelante = true, cont = 0) {
	btnTirarDado.disabled = true;
	if (adelante) {
		// Cuando la ficha vaya hacia delante
		if (jugador.posicion > 35 && dado > 0) {
			moverFicha(ficha, jugador, (dado *= -1), false);
			return;
		} else if (jugador.posicion == 36 && dado == 0) {
			console.log('¡' + jugador.nombre + ' has ganado!');
		}
		const timer = setInterval(() => {
			if (cont < dado) {
				jugador.posicion += 1;
				ficha.style.left =
					tablero[jugador.posicion].fichas[partida.turno.toLowerCase()].x + '%';
				ficha.style.top =
					tablero[jugador.posicion].fichas[partida.turno.toLowerCase()].y + '%';
				clearInterval(timer);
				moverFicha(ficha, jugador, dado, true, (cont += 1));
			} else {
				clearInterval(timer);
				const casillaEsp = comprobarCasillaEsp(jugador);
				if (casillaEsp) {
					alert(casillaEsp.mensaje);
					if (casillaEsp.salida || casillaEsp.salida == 0) {
						if (casillaEsp.salida > jugador.posicion) {
							moverFicha(
								ficha,
								jugador,
								casillaEsp.salida - jugador.posicion,
								true,
								(cont = 0),
							);
							return;
						} else {
							moverFicha(
								ficha,
								jugador,
								casillaEsp.salida - jugador.posicion,
								false,
								(cont = 0),
							);
							return;
						}
					} else if (casillaEsp.turno == 0 || casillaEsp.turno == 1) {
						if (casillaEsp.turno == 0) {
							moverFicha(ficha, jugador, (dado *= -1), false, (cont = 0));
							return;
						} else {
							alternarTurno();
						}
					}
				} else {
					mostrarPregunta(ficha, jugador);
					return;
				}
				clearInterval(timer);
				alternarTurno();
			}
		}, 500);
	} else {
		// Cuando la ficha se mueva hacia atrás
		const timer = setInterval(() => {
			if (dado < cont) {
				jugador.posicion -= 1;
				ficha.style.left =
					tablero[jugador.posicion].fichas[partida.turno.toLowerCase()].x + '%';
				ficha.style.top =
					tablero[jugador.posicion].fichas[partida.turno.toLowerCase()].y + '%';
				clearInterval(timer);
				moverFicha(ficha, jugador, dado, false, (cont -= 1));
			} else {
				clearInterval(timer);
				alternarTurno();
			}
		}, 500);
	}
	actualizarLS();
}

// const hola = await moverFicha(fichaA, partida.jugadores.A, 2);
// console.log(hola);

// Obtener partida localStorage
let partida = '';
partida = JSON.parse(localStorage.getItem('partida'));
if (partida) {
	colocarFichasInicio();
} else {
	partida = {
		turno: 'A',
		jugadores: {
			A: { nombre: 'Alba', posicion: 0 },
			B: { nombre: 'Victor', posicion: 0 },
		},
	};
}

function actualizarLS() {
	preEstadoPartida.textContent = JSON.stringify(partida, null, 2);
	localStorage.setItem('partida', JSON.stringify(partida));
}

btnReiniciar.addEventListener('click', reiniciarPartida);
function reiniciarPartida() {
	localStorage.clear();
	location.reload();
}
