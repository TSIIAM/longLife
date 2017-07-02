	/*    Libreria de funciones del programa   */


/**
 retorna indice donde esta el objeto en array indexado

 array array
 prop string
 valor any

 return int
*/
function busquedaEnArrayObjetos(array, prop, valor){
	for(var i = 0; i < array.length; i++){
		if(array[i][prop] == valor){
			return i;
		}
	}
	return -1;
}
//Permite buscar al paciente en el array.
function buscarPacienteEnArray(){
//El paciente ingresado es un objeto
	var paciente = usuarioIngresado;
	//buscamos el index del paciente dentro del array comparando la propiedad nombre completo 
	var pacienteIndex = busquedaEnArrayObjetos(pacientes,"nombreCompleto",paciente.nombreCompleto);

	//retorna el index del paciente
	return pacienteIndex;	

};


/**
 Objeto contador de consultas
*/

var Counter = {
	value: 0,
	increment: function(){
		this.value++;
	},
	// Esta es la función que se llama en el constructor de las consultas, de manera que el objeto consulta tenga un par propiedad:valor, donde valor es un entero
	conteo: function(){
		this.increment();
		return this.value;
	},
	reset: function(){
		this.value = 0;
	}
}

/**
 Esta función despliega una bienvenida al usuario
 de la página
*/

function bienvenida(_usuario){
	var nombre = _usuario.nombre;
	//si agregamos genero
	// var terminacion = "";
	// if(_usuario.genero === 'm') { terminacion = "o" }
	// else{ terminacion = "a" }
	var contenedor = $('#contenedor-lateral');
	var elementoBienvenida = '<h3 id="bienvenida" class="text-primary">Bienvenida/o '
		+ nombre
		+ '</h3>';
	contenedor.prepend(elementoBienvenida);
}

function borradoBienvenida(){
	var contenedor = $('#bienvenida');
	contenedor.html("");
}



// VALIDACIONES

function validarVacio(inputA,inputB,inputC,inputD){
	var inputC = inputC || 1;
	var inputD = inputD || 1;
	if(inputA.length === 0 ||  inputB.length ===  0 || inputC.length === 0 || inputD.length === 0 ){
		return false;
	}else{
		return true;
	}
};

function validarInt(inputA,inputB){
	if(isNaN(inputA) || isNaN(inputB)){
		return false;
	}else{
		return true;
	}
}

function validacionTotal(a, b){
	if(a.length < 1 || b.length < 1){
		return true;
	}
	if(isNaN(a) || isNaN(b)){
		return true
	}
	return false;
}

// logica principal de login : accion de form login

function ingresarUsuario(){
	var usuario = $("#txt-usuario");
	var clave = $("#txt-clave");
	var contenedorError = $("#error-login");
	var loginExito = false;
	var medico = false;
	var userLog;

	for(var i = 0; i < doctores.length; i++){
		if(doctores[i].numeroProfesional === Number(usuario.val())){
			if(doctores[i].clave === Number(clave.val())){
				loginExito = true;
				medico = true;
				userLog = doctores[i];
			}
		}
	}
	for(var i = 0; i < pacientes.length; i++){
		if(pacientes[i].numeroPaciente === Number(usuario.val())){
			if(pacientes[i].clave === Number(clave.val())){
				loginExito = true;
				medico = false;
				userLog = pacientes[i];
			}
		}	
	}
	if(!loginExito || !validarVacio(usuario.val(), clave.val())){
		contenedorError.html("Usuario y/o contraseña incorrectos");
	}

	if(loginExito && medico){
		$(".menuDoctor").show();
	}else if(loginExito && !medico){
		$(".menuCliente").show();
		$(".botonera").show();
	}

	if(loginExito){
		usuarioIngresado = userLog;
		$("#login-form").modal('hide');
		mostrarOcultarBotonLoginLogout();
		bienvenida(usuarioIngresado);
	}
}



/**
 Genera un número random entre 1 y el argumento
 _ceroIncluido = bool
 _número = int
*/

function random(_numero, _ceroIncluido){
	var result;
	_ceroIncluido = _ceroIncluido || false;
	if(!_ceroIncluido){
		result = Math.floor(Math.random() * _numero) + 1;
	}else{
		result = Math.floor(Math.random() * _numero);
	}
	return result
}

/**
 Genera un número random entre el argumento +-10

 _media = int
*/

function randomMedia(_media){
	return Math.floor(Math.random() * ((_media + 10) - (_media - 10))) + (_media-10);
}

/**
 Genera una cedula random
*/

function randomCedula(){
	var cedula = "";
	for(var i = 0; i < 8; i++){
		if(i < 2){
			cedula += random(5);
		}else{
			cedula += random(9);
		}
	}
	return cedula;
}



/*
Da una descripcion al azar a las consultas creadas automaticamente.
*/
function randomDescription(){
	var descripciones = [
		"Tengo una Emergencia!.",
		"Tengo algo raro me pasa.",
		"Me duele la cabeza.",
		"No se lo que me pasa.",
		"Atiendame rapido!.",
		"No quiero ir a trabajar!.",
		"Quiero tomar pastillas gratis.",
		"Vengo a ver cuanto peso.",
		"Me puede certificar?.",
		"Vengo a ver cuanto mido.",
		"Me siento mal.",
		"Quiero ver a un medico.",
		"No se.",
		"Que es esto?."

	];

	var index = Math.floor(Math.random() * descripciones.length);
	return descripciones[index];
}



/**
 random entre 11 y 22 para fotos de perfil
*/

function selectorRandomFotoPerfil(){
	var arr = [];
	// Array con número de foto
	for(var i = 0; i < 12; i++){
		arr.push(i + 12);
	}
	var fotoSeleccionada = arr[random(11, true)]
	return fotoSeleccionada + ".png";
}

/**
 busca el int más grande en un array

 _arr = array
*/

function maximoEnArray(_array) {
  return Math.max.apply(null, _array);
}

/**
 busca el int más pequeño en un array

 _arr = array
*/

function minimoEnArray(_array) {
  return Math.min.apply(null, _array);
}

/**
 Dibujamos tabla de consultas realizadas por cada médico en el sistema
*/

function dibujoTablaConsultasFinalizadas(){
	var filas = generarListaOrdenadaPorConsultas();
	var contenedor = $("#consultasGeneradas");
	contenedor.html("");
	var contenido = '<div class="table-responsive"><table class="table table-bordered">'
		+ '<thead>'
		+	'<tr>'
		+		'<th>Especialidad</th>'
		+		'<th>Nombre</th>'
		+		'<th>Cantidad de consultas</th>'
		+	'</tr>'
		+ '</thead>';
	//filas.reverse();
	filas.forEach(function(fila){
		contenido += fila;
	})
	contenedor.html(contenido + '</div>');
}

/**
 generarListaOrdenadaPorConsultas devuelve una lista de cadenas tipo fila

 _array = array
*/

function generarListaOrdenadaPorConsultas(){
	var lista = [];
	var fila;
	var filas = doctores.sort(ordenarArrayPorEspecialidad);
	for(var i = 0; i < filas.length; i++){
		fila = '<tr>'
			+ '<td>' + filas[i].especialidad + '</td>'
			+ '<td>' + filas[i].nombreCompleto + '</td>'
			+ '<td>' + filas[i].consultasFinalizadas + '</td></tr>';
		lista.push(fila)
	}
	return lista;
}


/**
 Retorna un array ordenado por especialidad
*/

function ordenarArrayPorEspecialidad(a, b){
	if(a.especialidad < b.especialidad){
		return -1;
	}else if(a.especialidad > b.especialidad){
		return 1;
	}else{
		return b.consultasFinalizadas - a.consultasFinalizadas;
	}
}