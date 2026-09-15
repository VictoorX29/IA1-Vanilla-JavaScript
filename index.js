let nombreJugador = 'Alba';
const maxTiradas = 1;
let tiradasJugador = 0;
let multiplicadorJugador = 0;
const divMain = document.querySelector('#main');
divMain.innerHTML += `Jugadora: ${nombreJugador}`;
const divSuma = document.querySelector('#suma');
document.querySelector('#sumar').addEventListener('click', () => {
	divSuma.innerHTML = ``;
	tiradasJugador = sumar(tiradasJugador, maxTiradas);
	divSuma.innerHTML += `<p>Suma: ${tiradasJugador}</p>`;
});
const divMult = document.querySelector('#mult');
document.querySelector('#multi').addEventListener('click', () => {
	divMult.innerHTML = ``;
	multiplicadorJugador = multiplicar(tiradasJugador, 3);
	divMult.innerHTML += `<p>Multiplicación: ${multiplicadorJugador}</p>`;
});
function sumar(a, b) {
	return a + b;
}
function multiplicar(a, b) {
	return a * b;
}
document.querySelector('#numero').addEventListener('submit', function (e) {
	e.preventDefault();
	document.querySelector('#errorNum').textContent =
		document.querySelector('#num').value < 0
			? 'El número tiene que ser mayor a 0'
			: document.querySelector('#num').value > 11
				? 'El número tiene que ser menor a 11'
				: 'El número es correcto';
});
const mensajeEstado = document.querySelector('#msgEstat');
document.querySelector('#selectEstat').addEventListener('change', () => {
	switch (document.querySelector('#selectEstat').value) {
		case 'inicio':
			definirMsgEstat('Inicio del juego');
			break;
		case 'turnoA':
			definirMsgEstat('Es el turno del Jugador A');
			break;
		case 'turnoB':
			definirMsgEstat('Es el turno del Jugador B');
			break;
		case 'final':
			definirMsgEstat('Fin del juego');
			break;
	}
});
function definirMsgEstat(mensaje) {
	mensajeEstado.textContent = mensaje;
}

document.querySelector('#buttonColor').addEventListener('click', () => {
	switch (mensajeEstado.classList.value) {
		case '':
			mensajeEstado.classList.value = 'verde';
			break;
		case 'verde':
			mensajeEstado.classList.value = 'rojo';
			break;
		case 'rojo':
			mensajeEstado.classList.value = 'azul';
			break;
		case 'azul':
			mensajeEstado.classList.value = 'verde';
			break;
	}
});
