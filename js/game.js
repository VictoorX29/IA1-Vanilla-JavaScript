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
const btnPopUpMensaje = document.querySelector('#btnPopUpMensaje');

// QS Divs
const fichaA = document.querySelector('.fichaA');
const fichaB = document.querySelector('.fichaB');
// const divTablero = document.querySelector('.tablero img');
const divPregRand = document.querySelector('#popUpPregunta');
const divPregResp = document.querySelector('#popUpResp');
const divInfoPartida = document.querySelector('.menuInfoPartida');
const divPopUpMensaje = document.querySelector('#popUpMensaje');
const divPopUpNombres = document.querySelector('#popUpNombres');

// QS Texto
const msgTurnoJug = document.querySelector('#msgTurnoJug');
const preEstadoPartida = document.querySelector('#preEstadoPartida');
const titPregunta = document.querySelector('#titPregunta');
const msgPopUpMensaje = document.querySelector('#msgPopUpMensaje');
const pErrorNombreA = document.querySelector('#pErrorNombreA');
const pErrorNombreB = document.querySelector('#pErrorNombreB');

// QS Formulario
const formPopUpNombres = document.querySelector('#formPopUpNombres');
// Async arrow function para mostrar mensaje y
// esperar a que se clique en Aceptar para continuar el juego
const mostrarPopUpMensaje = (jugador, mensaje) => {
	return new Promise((promesa) => {
		divPopUpMensaje.classList.remove('hidden');
		if (jugador) {
			msgPopUpMensaje.textContent =
				`Jugador ${partida.turno} - ${jugador.nombre} : ` + mensaje;
		} else {
			msgPopUpMensaje.textContent = mensaje;
		}

		btnPopUpMensaje.addEventListener(
			'click',
			() => {
				divPopUpMensaje.classList.add('hidden');
				promesa();
			},
			{ once: true },
		);
	});
};
// Mensaje para sacar por pantalla
const msgJugDado = (jugador, turno) =>
	`Es el turno del Jugador ${turno} (${jugador.nombre}) - Casilla ${jugador.posicion}`;

// Función para cambiar de turno
const alternarTurno = () => {
	btnTirarDado.disabled = false;
	if (msgTurnoJug.classList.contains('hidden'))
		msgTurnoJug.classList.remove('hidden');
	if (partida.turno == 'A') {
		partida.turno = 'B';
		msgTurnoJug.textContent = msgJugDado(partida.jugadores.B, partida.turno);
	} else if (partida.turno == 'B') {
		partida.turno = 'A';
		msgTurnoJug.textContent = msgJugDado(partida.jugadores.A, partida.turno);
	} else {
		console.error('Error');
	}

	if (
		partida.jugadores.A.posicion == 36 &&
		partida.jugadores.B.posicion == 36
	) {
		msgTurnoJug.classList.add('hidden');
		btnTirarDado.textContent = 'Reiniciar partida';
		btnTirarDado.id = 'btnReiniciar';
		mostrarPopUpMensaje('', 'La partida ha acabado');
		return;
	}
	if (partida.jugadores[partida.turno].posicion == 36) {
		alternarTurno();
	}
	actualizarLS();
};

// Listener para obtener posiciones del tablero
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
async function colocarFichasInicio() {
	if (!partida) {
		await inicioPartida();
	}
	fichaA.style.display = 'block';
	fichaB.style.display = 'block';

	// Movemos las fichas a su posición inicial
	fichaA.style.left = tablero[partida.jugadores.A.posicion].fichas.a.x + '%';
	fichaA.style.top = tablero[partida.jugadores.A.posicion].fichas.a.y + '%';

	fichaB.style.left = tablero[partida.jugadores.B.posicion].fichas.b.x + '%';
	fichaB.style.top = tablero[partida.jugadores.B.posicion].fichas.b.y + '%';
	btnStartGame.removeEventListener('click', colocarFichasInicio);
	btnStartGame.classList.add('hidden');
	divInfoPartida.classList.remove('hidden');
	btnTirarDado.classList.remove('hidden');
	btnReiniciar.classList.remove('hidden');
	let jugador = '';
	if (
		partida.jugadores.A.posicion == 36 &&
		partida.jugadores.B.posicion == 36
	) {
		msgTurnoJug.classList.add('hidden');
		btnTirarDado.textContent = 'Reiniciar partida';
		btnTirarDado.id = 'btnReiniciar';
		return;
	} else {
		msgTurnoJug.classList.remove('hidden');
		if (partida.turno == 'A') jugador = 'A';
		if (partida.turno == 'B') jugador = 'B';
		msgTurnoJug.textContent = msgJugDado(
			partida.jugadores[jugador],
			partida.turno,
		);
	}

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
	divPregRand.classList.remove('hidden');
	divPregRand.querySelector('#divPregunta').classList.remove('hidden');
	divPregResp.classList.add('hidden');
	const num = generarNum(preguntas.length);
	const pregRand = preguntas[num];
	titPregunta.textContent = pregRand.pregunta;
	btnResp1.textContent = pregRand.respuestas[0];
	btnResp2.textContent = pregRand.respuestas[1];
	btnResp3.textContent = pregRand.respuestas[2];
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
			divPregRand.querySelector('#divPregunta').classList.add('hidden');
			divPregResp.classList.remove('hidden');
			resp = verificarCorrecta(tecla - 1, pregRand.correcta);
			if (resp) {
				divPregResp.querySelector('p').textContent = 'Respuesta correcta';
			} else {
				divPregResp.querySelector('p').textContent = 'Respuesta incorrecta';
			}
			divPregResp.querySelector('button').addEventListener(
				'click',
				() => {
					divPregRand.classList.add('hidden');
					divPregResp.classList.add('hidden');
					if (resp) {
						document.removeEventListener('keydown', verificarRespuesta);
						btnResp1.removeEventListener('click', verificarRespuesta);
						btnResp2.removeEventListener('click', verificarRespuesta);
						btnResp3.removeEventListener('click', verificarRespuesta);
						alternarTurno();
						return;
					} else {
						document.removeEventListener('keydown', verificarRespuesta);
						btnResp1.removeEventListener('click', verificarRespuesta);
						btnResp2.removeEventListener('click', verificarRespuesta);
						btnResp3.removeEventListener('click', verificarRespuesta);
						moverFicha(ficha, jugador, -1, false, 0);
						return;
					}
				},
				{ once: true },
			);
		} else if (buttonId === '1' || buttonId === '2' || buttonId === '3') {
			divPregRand.querySelector('#divPregunta').classList.add('hidden');
			divPregResp.classList.remove('hidden');
			resp = verificarCorrecta(buttonId - 1, pregRand.correcta);
			if (resp) {
				divPregResp.querySelector('p').textContent = 'Respuesta correcta';
			} else {
				divPregResp.querySelector('p').textContent = 'Respuesta incorrecta';
			}
			divPregResp.querySelector('button').addEventListener(
				'click',
				() => {
					divPregRand.classList.add('hidden');
					divPregResp.classList.add('hidden');
					if (resp) {
						document.removeEventListener('keydown', verificarRespuesta);
						btnResp1.removeEventListener('click', verificarRespuesta);
						btnResp2.removeEventListener('click', verificarRespuesta);
						btnResp3.removeEventListener('click', verificarRespuesta);
						alternarTurno();
						return;
					} else {
						document.removeEventListener('keydown', verificarRespuesta);
						btnResp1.removeEventListener('click', verificarRespuesta);
						btnResp2.removeEventListener('click', verificarRespuesta);
						btnResp3.removeEventListener('click', verificarRespuesta);
						moverFicha(ficha, jugador, -1, false, 0);
						return;
					}
				},
				{ once: true },
			);
		}
	}
}

// Botón para generar dado aleatorio y mover la ficha del turno
btnTirarDado.addEventListener('click', async () => {
	if (
		partida.jugadores.A.posicion == 36 &&
		partida.jugadores.B.posicion == 36
	) {
		reiniciarPartida();
	} else {
		const dado = generarNum(6);
		// const dado = 2;
		if (partida.turno === 'A') {
			await mostrarPopUpMensaje(partida.jugadores.A, `Ha sacado un ${dado}`);
			moverFicha(fichaA, partida.jugadores.A, dado, true);
		} else if (partida.turno === 'B') {
			await mostrarPopUpMensaje(partida.jugadores.B, `Ha sacado un ${dado}`);
			moverFicha(fichaB, partida.jugadores.B, dado, true);
		} else {
			alert('Error');
		}
	}
});

// Función rescursiva para mover las fichas
async function moverFicha(ficha, jugador, dado, adelante = true, cont = 0) {
	btnTirarDado.disabled = true;
	if (adelante) {
		// Cuando la ficha vaya hacia delante
		if (jugador.posicion > 35 && cont < dado) {
			moverFicha(ficha, jugador, (dado *= -1), false, cont * -1);
			return;
		} else if (jugador.posicion == 36 && cont == dado) {
			if (
				(partida.turno == 'B' && partida.jugadores.A.posicion == 36) ||
				(partida.turno == 'A' && partida.jugadores.B.posicion == 36)
			) {
				await mostrarPopUpMensaje(jugador, 'Has quedado segundo');
			} else {
				await mostrarPopUpMensaje(jugador, '¡Has ganado!');
			}
		}
		const timer = setInterval(async () => {
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
					await mostrarPopUpMensaje(jugador, casillaEsp.mensaje);
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
				} else if (jugador.posicion != 36) {
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

// Obtener partida localStorage
let partida = '';
partida = JSON.parse(localStorage.getItem('partida'));
if (partida) {
	colocarFichasInicio();
}
// Function para empezar la partida y cambiar los nombres de los jugadores
function inicioPartida() {
	return new Promise((promesa) => {
		divPopUpNombres.classList.remove('hidden');
		formPopUpNombres.addEventListener('submit', (e) => {
			e.preventDefault();
			const inputJugA = document.querySelector('input#nombreA');
			const inputJugB = document.querySelector('input#nombreB');
			if (!inputJugA.value.trim() || !inputJugB.value.trim()) {
				if (!inputJugA.value.trim()) {
					pErrorNombreA.classList.remove('hidden');
					pErrorNombreA.textContent = 'Error: no puede estar en blanco';
				} else {
					pErrorNombreA.classList.add('hidden');
				}
				if (!inputJugB.value.trim()) {
					pErrorNombreB.classList.remove('hidden');
					pErrorNombreB.textContent = 'Error: no puede estar en blanco';
				} else {
					pErrorNombreB.classList.add('hidden');
				}
			} else if (inputJugA.value.trim() === inputJugB.value.trim()) {
				pErrorNombreB.classList.remove('hidden');
				pErrorNombreB.textContent = 'Error: los nombres no deben coincidir';
			} else {
				partida = {
					turno: 'A',
					jugadores: {
						A: { nombre: inputJugA.value, posicion: 0 },
						B: { nombre: inputJugB.value, posicion: 0 },
					},
				};
				divPopUpNombres.classList.add('hidden');
				actualizarLS();
				promesa();
			}
		});
	});
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
