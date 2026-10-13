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
let turno = 'A';
let casillaA = 0;
let casillaB = 0;
const buttonDado = document.querySelector('#lanzarDado');
const msgDado = document.querySelector('#msgDado');
const msgCasi = document.querySelector('#msgCasilla');
buttonDado.addEventListener('click', dadoLanzado);
function dadoLanzado(e) {
	e.preventDefault();
	let dado = Math.floor(Math.random() * 6 + 1);
	if (turno === 'A') {
		msgDado.textContent = `El jugador A ha sacado un ${dado} .`;
		casillaA += dado;
	} else {
		msgDado.textContent = `El jugador B ha sacado un ${dado} .`;
		casillaB += dado;
	}
	document.querySelector('#msgTurno span').textContent =
		`${turno} ( ${turno === 'A' ? `${casillaA}` : `${casillaB}`} )`;

	document.querySelector(`#infoJug${turno} #casillaNum`).innerHTML =
		turno === 'A' ? casillaA : casillaB;
	document.querySelector(`#infoJug${turno} #casillaText`).innerHTML =
		turno === 'A' ? casillas[casillaA] : casillas[casillaB];
	if (turno === 'A') {
		turno = 'B';
	} else {
		turno = 'A';
	}
}
document.querySelector('#formNom').addEventListener('submit', function (e) {
	e.preventDefault();
	document.querySelector('#msgJugA span').textContent =
		document.querySelector('#inputFormNom').value;
});
const casillas = [
	'Salida',
	'Poble',
	'Puente',
	'Posada',
	'Bosque',
	'Pozo',
	'Oca',
	'Dados',
	'Laberinto',
	'Cárcel',
	'Calavera',
	'Molino',
	'Río',
	'Playa',
	'Castillo',
	'Puerta',
	'Fuente',
	'Montaña',
	'Faro',
	'Final',
];
const preguntas = [
	// --- Tus preguntas originales ---
	{
		pregunta:
			'¿Qué material necesitas para construir un portal al Nether en Minecraft?',
		respuestas: ['Diamante', 'Bedrock', 'Obsidiana'],
		correcta: 2,
	},
	{
		pregunta: '¿Qué mob de Minecraft explota cuando se acerca al jugador?',
		respuestas: ['Creeper', 'Zombi', 'Esqueleto'],
		correcta: 0,
	},
	{
		pregunta: '¿Qué deporte se juega con coches en Rocket League?',
		respuestas: ['Baloncesto', 'Fútbol', 'Tenis'],
		correcta: 1,
	},
	{
		pregunta: '¿Cuál de estos agentes de VALORANT es un Centinela?',
		respuestas: ['Jett', 'Sage', 'Omen'],
		correcta: 1,
	},
	{
		pregunta:
			'¿Cómo se llama la bomba que se planta en el modo competitivo de VALORANT?',
		respuestas: ['C4', 'Orbe', 'Spike'],
		correcta: 2,
	},

	// --- Videojuegos ---
	{
		pregunta: '¿Qué item necesitas para domar a un lobo en Minecraft?',
		respuestas: ['Hueso', 'Carne podrida', 'Manzana'],
		correcta: 0,
	},
	{
		pregunta: '¿Cómo se llama el jefe final del End en Minecraft?',
		respuestas: ['Wither', 'Ender Dragon', 'Warden'],
		correcta: 1,
	},
	{
		pregunta:
			'¿Cuántos bloques de obsidiana necesitas como mínimo para un portal al Nether (sin contar las esquinas)?',
		respuestas: ['14', '12', '10'],
		correcta: 2,
	},
	{
		pregunta: '¿Quién es el protagonista de la saga The Legend of Zelda?',
		respuestas: ['Zelda', 'Link', 'Ganon'],
		correcta: 1,
	},
	{
		pregunta: '¿Cómo se llama el hermano de Mario?',
		respuestas: ['Wario', 'Luigi', 'Toad'],
		correcta: 1,
	},
	{
		pregunta: '¿Qué empresa desarrolló Fortnite?',
		respuestas: ['Epic Games', 'Valve', 'Riot Games'],
		correcta: 0,
	},
	{
		pregunta: '¿Qué empresa desarrolló League of Legends?',
		respuestas: ['Blizzard', 'Riot Games', 'Ubisoft'],
		correcta: 1,
	},
	{
		pregunta: '¿En qué ciudad ficticia transcurre GTA V?',
		respuestas: ['Vice City', 'Liberty City', 'Los Santos'],
		correcta: 2,
	},
	{
		pregunta:
			'¿Qué Pokémon inicial de tipo fuego eliges en la primera generación?',
		respuestas: ['Squirtle', 'Charmander', 'Bulbasaur'],
		correcta: 1,
	},
	{
		pregunta: '¿En qué juego se consigue una "Victory Royale"?',
		respuestas: ['Apex Legends', 'PUBG', 'Fortnite'],
		correcta: 2,
	},
	{
		pregunta: '¿Cuál de estos agentes de VALORANT es un Duelista?',
		respuestas: ['Sage', 'Jett', 'Sova'],
		correcta: 1,
	},
	{
		pregunta: '¿Qué agente de VALORANT puede resucitar a un aliado?',
		respuestas: ['Brimstone', 'Sage', 'Cypher'],
		correcta: 1,
	},
	{
		pregunta:
			'¿Cómo se llama el impulso de velocidad que usan los coches en Rocket League?',
		respuestas: ['Turbo', 'Boost', 'Nitro'],
		correcta: 1,
	},
	{
		pregunta: '¿Cómo se llama el mapa principal de League of Legends?',
		respuestas: [
			'Abismo de los Lamentos',
			'Bosque Retorcido',
			'La Grieta del Invocador',
		],
		correcta: 2,
	},

	// --- HTML / CSS ---
	{
		pregunta: '¿Qué significa HTML?',
		respuestas: [
			'HyperText Markup Language',
			'Hyper Tool Multi Language',
			'High Text Machine Language',
		],
		correcta: 0,
	},
	{
		pregunta: '¿Qué significa CSS?',
		respuestas: [
			'Creative Style System',
			'Cascading Style Sheets',
			'Computer Style Syntax',
		],
		correcta: 1,
	},
	{
		pregunta: '¿Qué etiqueta HTML se usa para crear un enlace?',
		respuestas: ['<link>', '<a>', '<href>'],
		correcta: 1,
	},
	{
		pregunta: '¿Qué atributo HTML da un texto alternativo a una imagen?',
		respuestas: ['title', 'alt', 'src'],
		correcta: 1,
	},
	{
		pregunta: '¿Qué etiqueta HTML crea una lista sin orden (con viñetas)?',
		respuestas: ['<ol>', '<ul>', '<li>'],
		correcta: 1,
	},
	{
		pregunta: '¿Qué propiedad CSS cambia el color del texto?',
		respuestas: ['font-color', 'text-color', 'color'],
		correcta: 2,
	},
	{
		pregunta: '¿Cómo se activa Flexbox en un contenedor con CSS?',
		respuestas: ['position: flex', 'flex: display', 'display: flex'],
		correcta: 2,
	},
	{
		pregunta:
			'¿Qué propiedad CSS añade espacio por fuera del borde de un elemento?',
		respuestas: ['padding', 'border', 'margin'],
		correcta: 2,
	},
	{
		pregunta:
			'¿Qué unidad CSS es relativa al tamaño de fuente del elemento raíz?',
		respuestas: ['rem', 'em', 'vh'],
		correcta: 0,
	},

	// --- JavaScript ---
	{
		pregunta: '¿Qué palabra clave declara una constante en JavaScript?',
		respuestas: ['var', 'const', 'let'],
		correcta: 1,
	},
	{
		pregunta: '¿Qué método de array añade un elemento al final?',
		respuestas: ['push()', 'pop()', 'shift()'],
		correcta: 0,
	},
	{
		pregunta:
			'¿Qué método de array transforma cada elemento y devuelve un array nuevo?',
		respuestas: ['filter()', 'forEach()', 'map()'],
		correcta: 2,
	},
	{
		pregunta:
			'¿Qué método de array devuelve solo los elementos que cumplen una condición?',
		respuestas: ['filter()', 'find()', 'reduce()'],
		correcta: 0,
	},
	{
		pregunta: '¿Qué devuelve `typeof null` en JavaScript?',
		respuestas: ['"null"', '"object"', '"undefined"'],
		correcta: 1,
	},
	{
		pregunta: '¿Qué operador compara valor y tipo en JavaScript?',
		respuestas: ['===', '==', '='],
		correcta: 0,
	},
	{
		pregunta: '¿Qué método selecciona un elemento del DOM por su id?',
		respuestas: [
			'querySelectorAll()',
			'getElementById()',
			'getElementsByTagName()',
		],
		correcta: 1,
	},
	{
		pregunta: '¿Para qué sirve `addEventListener`?',
		respuestas: [
			'Crear un nuevo elemento HTML',
			'Asociar una función a un evento',
			'Eliminar un elemento del DOM',
		],
		correcta: 1,
	},
	{
		pregunta:
			'¿Qué método convierte un string JSON en un objeto de JavaScript?',
		respuestas: ['JSON.stringify()', 'JSON.parse()', 'JSON.object()'],
		correcta: 1,
	},

	// --- Extras de programación ---
	{
		pregunta:
			'¿Qué hook de React sirve para guardar un estado en un componente?',
		respuestas: ['useState', 'useEffect', 'useMemo'],
		correcta: 0,
	},
	{
		pregunta:
			'¿Qué lenguaje se usa para consultar bases de datos relacionales?',
		respuestas: ['XML', 'SQL', 'CSS'],
		correcta: 1,
	},
	{
		pregunta: '¿Qué comando de Git sube tus commits al repositorio remoto?',
		respuestas: ['git pull', 'git commit', 'git push'],
		correcta: 2,
	},
];
let preguntaRand = Math.floor(Math.random() * preguntas.length);
function generarPregunta() {
	preguntaRand = Math.floor(Math.random() * preguntas.length);
	document.querySelector('#divPregunta h2').textContent =
		preguntas[preguntaRand].pregunta;
	let htmlPregs = '<ul>';
	for (let i = 0; i < preguntas[preguntaRand].respuestas.length; i++) {
		const element = preguntas[preguntaRand].respuestas[i];
		htmlPregs += `<li id="respuesta${i}" class="respuestas">${element}</li><br>`;
	}
	htmlPregs += '</ul>';
	document.querySelector('#divPreguntas').innerHTML = htmlPregs;
	const respuestas = document.querySelectorAll('#divPregunta .respuestas');
	let acertada = false;
	respuestas.forEach((respuesta) => {
		respuesta.addEventListener('click', () => {
			const numero = respuesta.id.slice(9, 10);
			const txtRespuesta = document.querySelector('#tipoRespuesta');
			if (!acertada) {
				if (numero == preguntas[preguntaRand].correcta) {
					txtRespuesta.textContent = '¡Has acertado!';
					acertada = true;
				} else {
					if (txtRespuesta.textContent.includes('Has')) {
						if (txtRespuesta.textContent.includes('vuelto a fallar')) {
							txtRespuesta.textContent = txtRespuesta.textContent.replace(
								'vuelto',
								'vuelto y vuelto',
							);
						} else {
							txtRespuesta.textContent = txtRespuesta.textContent.replace(
								'fallado',
								'vuelto a fallar',
							);
						}
					} else {
						txtRespuesta.textContent = 'Has fallado';
					}
				}
			}
		});
	});
}
generarPregunta();
const casillasN = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
function generarTablero() {
	html = '';
	for (const n of casillasN) {
		html += `<div>${n}</div>`;
	}
	document.querySelector('#tablero').innerHTML = html;
}
generarTablero();
