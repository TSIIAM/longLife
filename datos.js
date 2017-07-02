/*
Este Archivo contiene los datos de los objetos Pacientes, Medicos y Consultas.

Constructor Medico 
Array Medico

Constructor Paciente
Array Paciente

Constructor Consulta
Array Consultas

funcion generarConsultas automaticas es llamada desde login.js


*/



/*
Constructor del objeto Medico con sus parametros, nombre, apellido y especialidad lo identifica,  numero profesional y clave son necesarias para loguearse y consultas finalizadas son
consultas automaticas que llenan los reportes.

*/

function Medico(nombre, apellido, especialidad, numeroProfesional,clave, consultasFinalizadas){
	this.nombre = nombre;
	this.apellido = apellido;
	this.nombreCompleto = nombre + " " + apellido;
	this.especialidad = especialidad;
	this.numeroProfesional = numeroProfesional;
	this.clave = clave;
	this.consultasFinalizadas = consultasFinalizadas;
}
//Array que contiene los datos de los medicos precargados manualmente, nombre, apellido, especialidad,  usuario , clave y una cantidad de consultas al azar ya finalizadas.
var doctores = [
	new Medico("Gerardo", "Torres", "Cardiologo", 123,123456, random(40)),
	new Medico("Gabino", "Baldomero", "Geriatra",124 ,123456, random(40)),
	new Medico("Blanca", "Nieves", "Neumología",   125, 123456, random(40)),
	new Medico("Ignacio", "Cogoyo", "Neumología", 126,123456, random(40)),
	new Medico("Silvio", "Bautista", "Pediatría", 127,123456, random(40)),
	new Medico("Yola", "Prieto", "Pediatría", 128,123456, random(40)),
	new Medico("Adalberto", "Glauco", "Psiquiatría", 129,123456, random(40)),
	new Medico(	"Amado", "Cipriano", "Toxicología", 130,123456, random(40)),
	new Medico("Adolfo", "Wilfredo", "Oftalmología", 131,123456, random(40)),
	new Medico("Rosario", "Reyes", "Cardiologo", 132,123456, random(40)),
	new Medico("Eduardo", "Faustino", "Cardiologo", 133,123456, random(40)),
	new Medico("Gabriela", "Lopez", "Cardiologo", 134,123456, random(40))			
];





/**
 * Representa un paciente.
 * @constructor
 * @param {string} nombre - Nombre del paciente
 * @param {string} apellido - Apellido del paciente.
 * @param {int} numeroPaciente - Número creciente
 * @param {int} clave - Clave de ingreso.
 * @param {int} peso - Peso
 * @param {float} altura - altura.
 * @param {int} cedula - Nombre del paciente
 * @param {string} alergias - Alergias del paciente. ej: 16.png
 * @param {string} foto - Foto de perfil del paciente.
 */

function Paciente(nombre, apellido,numeroPaciente,clave, peso, altura,cedula, alergias , foto){
	this.nombre = nombre;
	this.apellido = apellido;
	this.nombreCompleto = nombre + " " + apellido;
	this.numeroPaciente	= numeroPaciente;
	this.clave = clave;
	this.cedula = cedula;
	//se le puede dar una foto, pero por defecto toma una foto al azar al comienzo del programa.
	this.foto = foto  || selectorRandomFotoPerfil();
	this.peso = [peso],
	this.altura = [altura],
	this.alergias = ["ninguna"],
	this.telefono = 911,
	this.habilitado = true,
	//metodos del paciente.
	this.modificarClave = function(nuevaClave){
		this.clave = nuevaClave;
	};
	this.modificarFoto = function(nuevaFoto){
		this.foto = nuevaFoto;
	};
	this.modificarAlergias = function(nuevaAlergia){
		this.alergias = nuevaAlergia;
	};
	this.modificarTelefono = function(nuevoTelefono){
		this.telefono = nuevoTelefono;
	};
	this.imc = function(){
		return (this.peso[this.peso.length - 1] / (this.altura[this.altura.length - 1]/100) ** 2).toFixed(2);
	};
};

//Array que contiene los datos de los pacientes precargados manualmente, nombre, apellido, usuario , clave, un peso al azar, una altura al azar y una cedula al azar.
var pacientes = [
	new Paciente("Luis", "Damiano", 11 ,123456, randomMedia(80), randomMedia(160), randomCedula()),
	new Paciente("Horacio", "Mercer",  12,123456, randomMedia(80), randomMedia(160), randomCedula()),
	new Paciente("Jorge", "Maximino",13,123456, randomMedia(80), randomMedia(160), randomCedula()),
	new Paciente("Hernando", "Salvador",14,123456, randomMedia(80), randomMedia(160), randomCedula()),
	new Paciente("Esteban", "Eustaquio",15,123456, randomMedia(80), randomMedia(160), randomCedula()),
	new Paciente("Rosa", "Ximenes",16,123456, randomMedia(80), randomMedia(160), randomCedula()),
	new Paciente("Carlos", "Vasco",17,123456, randomMedia(80), randomMedia(160), randomCedula()),
	new Paciente("Marcelino", "Sosa",18,123456, randomMedia(80), randomMedia(160), randomCedula()),
	new Paciente("Armando", "Casas",19,123456, randomMedia(80), randomMedia(160), randomCedula()),
	new Paciente("Debora  ", "Melo",20,123456, randomMedia(80), randomMedia(160), randomCedula()),
	new Paciente("Alvaro", "Mesa",21,123456, randomMedia(80), randomMedia(160), randomCedula())


];

/**
 * Representa una consulta registrada.
 * @constructor
 * @param {int} pacienteIndex - Indice del paciente que pidio la consulta
 * @param {int} medicoIndex - Indice del médico con el cual se dara la consulta.
 * @param {string} descripcion - Descripción del pedido de consulta
 */

function Consulta(pacienteIndex, medicoIndex,descripcion){
	var numeroIncremental = Counter.conteo();
	
	var letraNombreIdentificador =  doctores[medicoIndex].nombre.slice(0,1);
	var letrasApellidoIdentificador = doctores[medicoIndex].apellido.slice(0,3);
	
	this.identificador = letraNombreIdentificador 
		+ letrasApellidoIdentificador 
		+ numeroIncremental;
	this.consultaPaga = false;
	this.descripcion =  descripcion  || randomDescription();
	this.finalizada = false;
	this.paciente = pacienteIndex;
	this.medico = medicoIndex;
	this.especialidad = doctores[medicoIndex].especialidad;
	//metodos de cada consulta
	this.modificarDescripcion = function(nuevaDescripcion){
		this.descripcion = nuevaDescripcion;
	};
	this.modificarEstado = function(){
		this.finalizada = true;
	};		
	this.modificarPago = function(nuevoPago){
		this.consultaPaga = nuevoPago;
	};
};
//Array que contiene las consultas pre cargadas manualmente, contiene el indice pacientes que realizo la consulta , el indice de medicos que la toma  y una descripcion pre cargada.
var consultas = [
// indice de paciente, indice de medico, descripcion
	new Consulta(0,0,"Me duele el pecho y me cuesta respirar."),
	new Consulta(0,10, "Me siento mal."),
	new Consulta(3,0, "Algo me pasa."),
	new Consulta(1,1, "Necesito pastillas para dormir."),
	new Consulta(0,11, "Me duele el corazon."),
	new Consulta(2,2,"Tengo mucha tos."),
	new Consulta(3,4, "Mi niño tiene problemas para comer."),
	new Consulta(4,8, "Me cuesta leer."),
	new Consulta(5,5, "Mi hijo mucha tos."),
	new Consulta(6,7,"Tome un frasco de pastillas y no puedo parar de ir al baño."),
	new Consulta(7,7,"Fuerte dolor de estomago y vomitos."),
	new Consulta(8,5, "Mi hijo esta con vomitos."),
	new Consulta(9,6,"Escucho voces en mi cabeza."),
	new Consulta(1,2, "Aveces tengo mucha tos."),
	new Consulta(2,4, " Mi hijo tiene problemas para ir al baño."),
	new Consulta(0,7 , "Tome unas pastillas y no puedo parar de ir al baño."),
	new Consulta(4,3, "Me cuesta respirar aveces."),
	new Consulta(3,6,"Veo gente muerta."),
	new Consulta(1,2, "Tengo mucha tos de mañana"),
	new Consulta(2,4, " Mi hijo no para de ir al baño ahora."),
	new Consulta(10,9, "Me duele el corazon luego de comer mucho asado."),
	new Consulta(6,3, " Me cuesta respirar cuando fuman cerca."),
	new Consulta(5,2, "Me duele el pecho."),
	new Consulta(4,1, "Me duele la espalda."),
	new Consulta(4,9,	"Me duele el corazon!."),
	new Consulta(8,7,	"Me cuesta leer  en la noche."),
	new Consulta(1,6,"Me cuesta respirar."),
	new Consulta(10,8, " Me duele la vista de tanto escribir."),
	new Consulta(3,5, "Mi hijo tiene mucha fiebre."),
	new Consulta(7,4, "Mi hijo no quiere comer."),
	new Consulta(0,4, "Mi hijo tiene problemas de atención."),
	new Consulta(10,3, "Aveces me cuesta respirar."),
	new Consulta(0,8 , "Creo que necesito lentes."),
	new Consulta(3,1, "Me puede dar pastillas para dormir?."),
	new Consulta(4,2, "Que tos que tengo por dios."),
	new Consulta(0,3, "No puedo respirar bien."),
	new Consulta(6,4, "Mi hija no quiere volver a la escuela."),
	new Consulta(5,5, " Mi hija tiene problemas para dormir."),
	new Consulta(9,6, "Me persiguen la CIA y el FBI."),
	new Consulta(10,7, "Me tome la pastilla azul equivocada."),
	new Consulta(1,8, " No veo nada con estos lentes.")
];

//genera consultas aleatorias automaticamente en el inicio del programa.
function generarConsultas(_n){
	for(var i = 0; i < _n; i++){
		consultas.push(new Consulta(random(10, true), random(9, true)))
	}
}
