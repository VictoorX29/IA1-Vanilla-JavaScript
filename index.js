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
	divSuma.innerHTML += `Suma: ${tiradasJugador}`;
});
const divMult = document.querySelector('#mult');
document.querySelector('#multi').addEventListener('click', () => {
	divMult.innerHTML = ``;
	multiplicadorJugador = multiplicar(tiradasJugador, 3);
	divMult.innerHTML += `Multiplicación: ${multiplicadorJugador}`;
});
function sumar(a, b) {
	return a + b;
}
function multiplicar(a, b) {
	return a * b;
}
