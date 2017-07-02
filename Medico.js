/*


Funciones correspondientes  a la interface del medico.

*/



/**
 interfaz de médico
 */

function inicializarInterfazMedico(){
	$(".page-header").after('<div class="contenedor-consultas-medico"></div></form><div id="form-consultas"></div>');	
	$("#menu-consultas").on('click', dibujarSelectConsultasMedico);
	$("#menu-inhabilitar").on('click', dibujarSelectInhabilitar);
	$("#menu-abonado").on('click', dibujarSelectAbonar);
	/*dibujarSelectConsultasMedico();*/

}

/**
 Salir interfaz de médico
 elimina contenedor de elementos del médico
*/

function salirMedico(){
	$(".page-header").next().remove();
	$("#form-consultas").remove();
}

/**
 Se dibuja select para abonar
*/

function dibujarSelectAbonar(){
	var contenedor = eliminarElementosMedico();
	var nuevoContenido = '<h3>Abonado de consultas de pacientes</h3><p><select id="sel-abonar-medico" class="form-control">';
	nuevoContenido += '<option value="seleccionar">Seleccionar</option>';
	for(var i = 0; i < pacientes.length; i++){
		nuevoContenido += '<option value="' + i	+ '">'
			+ pacientes[consultas[i].paciente].nombre
			+ '</option>';
	}
	nuevoContenido += '</select></p><div class="lista-consultas-no-abonadas"></div></div>';
	contenedor.append(nuevoContenido);
	$("#sel-abonar-medico").on('change', function(){
		dibujarConsultasNoAbonadas(Number(this.value));
	})
}

/**
 Se lista consultas no abonadas seleccionadas por el select de pacientes
*/

function dibujarConsultasNoAbonadas(pacienteIndex){
	var contenedor = $(".lista-consultas-no-abonadas")
	var contenedorTabla = '<table class="table">'
		+ '<thead>'
		+	'<tr>'
		+		'<th>#</th>'
		+		'<th>Nombre</th>'
		+		'<th>Especialidad</th>'
		+		'<th>Descripcion</th>'
		+		'<th>Abonar</th>'
		+	'</tr>'
		+ '</thead>'
		+ '<tbody>';
	for(var i = 0; i < consultas.length; i++){
		if(consultas[i].paciente === pacienteIndex && !consultas[i].consultaPaga){
			contenedorTabla += '<tr>'
				+ '<td>' + i + '</td>'
				+ '<td>' + pacientes[pacienteIndex].nombreCompleto + '</td>'
				+ '<td>' + consultas[i].especialidad + '</td>'
				+ '<td>' + consultas[i].descripcion + '</td>'
				+ '<td>' + '<input type="button" class="btn btn-info boton-abonado" data-consulta="' + i + '" value="Pagar">' + '</td>'
				+ '</tr>';
		}
	}
	contenedorTabla += '</tbody></table>'
	
	contenedor.html(contenedorTabla);
	$(".boton-abonado").on('click', abonarConsulta);
}

/**
 Accion de abonar consulta y borrado de linea en tabla
*/

function abonarConsulta(){
	var consulta = $(this).attr('data-consulta');
	consultas[consulta].consultaPaga = true;
	var tr = $(this).parent().parent();
	tr.fadeOut(400, function(){
        tr.remove();
    });
}

/**
 Se dibuja select para inhabilitar pacientes
*/

function dibujarSelectInhabilitar(){
	var contenedor = eliminarElementosMedico();
	var nuevoContenido = '<h3>Inhabilitar pacientes</h3><p><select id="sel-habilitar-medico" class="form-control">';
	nuevoContenido += '<option value="seleccionar">Seleccionar</option>';
	for(var i = 0; i < pacientes.length; i++){
		if(pacientes[i].habilitado){
			nuevoContenido += '<option class="bg-success" value="'
				+ pacientes[i].cedula
				+ '-habilitado">'
				+ pacientes[consultas[i].paciente].nombre
				+ '</option>';
		}else{
			nuevoContenido += '<option class="bg-danger" value="'
				+ pacientes[i].cedula
				+ '-inhabilitado">'
				+ 'INHABILITADO ' + pacientes[consultas[i].paciente].nombre
				+ '</option>';
		}
	}
	nuevoContenido += '</select></p><div class="botones"></div></div>';
	contenedor.append(nuevoContenido);
	$("#sel-habilitar-medico").on('change', function(){
		dibujarBotonesHabilitar(estaHabilitado(this.value), this.value);
		var cedula = this.value.split("-")[0];
		$(".habilitar-paciente").on('click', function(){
			inhabilitarPaciente(cedula);
			dibujarSelectInhabilitar();
		})
	})
}

/**
 logica de selección de habilitados e inhabiltiados
*/

function estaHabilitado(_optionValue){
	var arrOpt = _optionValue.split("-");
	if(arrOpt[1] === "habilitado"){
		return true;
	}else if(arrOpt[1] === "inhabilitado"){
		return false;
	}else{
		return;
	}
}

/**
 dibujamos botones para inhabilitar o habilitar paciente
*/

function dibujarBotonesHabilitar(bool, seleccionar){
	if(seleccionar === "seleccionar"){
		bool = "seleccionar";
	}
	var contenedor = $(".botones");
	contenedor.html("");
	var contenido = "";
	if(bool === "seleccionar"){
		contenido = "";
	}else if(bool){
		contenido += '<input type="button" class="btn btn-danger habilitar-paciente" value="Inhabilitar">'
	}else if(!bool){
		contenido += '<input type="button" class="btn btn-success habilitar-paciente" value="Habilitar">'
	}
	contenedor.html(contenido);
}

/**
 Se dibuja el select en el caso de ver consultas a tratar
*/

function dibujarSelectConsultasMedico(){
	var contenedor = eliminarElementosMedico();
	var nuevoContenido = '<h3>Consultas pendientes</h3><p><select id="sel-consultas-medico" class="form-control">';
	nuevoContenido += '<option value="">Seleccionar</option>';
	for(var i = 0; i < consultas.length; i++){
		if(doctores[consultas[i].medico].nombre === usuarioIngresado.nombre && consultas[i].finalizada !== true){
			nuevoContenido += '<option value="'	+ i	+ '">'
				+ pacientes[consultas[i].paciente].nombre + '</option>';
		}
	}
	nuevoContenido += '</select></p></div>';
	contenedor.append(nuevoContenido);
	$("#sel-consultas-medico").on('change', function(){
		var indiceConsulta = this.value;
		dibujarTablaDeConsulta(this.value);
	});
}

/**
 dibujar tabla de la consulta
 _consulta = objeto
*/

function dibujarTablaDeConsulta(_consultaIndex){
	// limpiamos el contenedor de la consulta cada vez que hay una selección
	$("#form-consulta").html("");
	// si se selecciona "seleccionar" se termina la función
	if(_consultaIndex === ""){
		return
	}
	var contenedor = $("#form-consultas");
	var consultaActual = consultas[_consultaIndex];
	var pacienteSeleccionado = pacientes[consultaActual.paciente];
	var divPadre = '<div class="form-consulta">';
	var tablaConsulta = '<form class="form-horizontal">'
		+   '<div class="">'
		+ 		'<img src="./images/' + pacienteSeleccionado.foto + '" width="200px" class="img-responsive center-block">'
		+	'</div>'
		+ 	'<div class="form-group">'
		+ 		'<label for="" class="col-sm-2 control-label">Nombre completo</label>'
		+		'<div class="col-sm-8">'
		+ 			'<input id="" class="form-control" type="text" value="' + pacienteSeleccionado.nombreCompleto + '" disabled>'
		+		'</div>'
		+	'</div>'
		+ 	'<div class="form-group">'
		+ 		'<label for="" class="col-sm-2 control-label">Identificador</label>'
		+		'<div class="col-sm-8">'
		+ 			'<input id="" class="form-control" type="text" value="' + pacienteSeleccionado.numeroPaciente + '" disabled>'
		+		'</div>'
		+	'</div>'
		+ 	'<div class="form-group">'
		+ 		'<label for="" class="col-sm-2 control-label">Contacto</label>'
		+		'<div class="col-sm-8">'
		+ 			'<input id="" class="form-control" type="text" value="' + pacienteSeleccionado.telefono + '" disabled>'
		+		'</div>'
		+	'</div>'
		+ 	'<div class="form-group">'
		+ 		'<label for="viejo-peso" class="col-sm-2 control-label">Peso registrado</label>'
		+		'<div class="col-sm-8">'
		+ 			'<input id="viejo-peso" class="form-control" type="text" value="' + pacienteSeleccionado.peso[0] + ' kg" disabled>'
		+		'</div>'
		+	'</div>'
		+ 	'<div class="form-group">'
		+ 		'<label for="viejo-altura" class="col-sm-2 control-label">Altura registrada</label>'
		+		'<div class="col-sm-8">'
		+ 			'<input id="viejo-altura" class="form-control" type="text" value="' + pacienteSeleccionado.altura[0] + ' cm" disabled>'
		+		'</div>'
		+	'</div>'
		+ 	'<div class="form-group">'
		+ 		'<label for="" class="col-sm-2 control-label">Alergias</label>'
		+		'<div class="col-sm-8">'
		+ 			'<input id="" class="form-control" type="text" value="' + pacienteSeleccionado.alergias.join(", ") + '" disabled>'
		+		'</div>'
		+	'</div>'
		+ 	'<div class="form-group">'
		+ 		'<label for="imc" class="col-sm-2 control-label">IMC</label>'
		+		'<div class="col-sm-8">'
		+ 			'<input id="imc" class="form-control" type="text" value="' + pacienteSeleccionado.imc() + '" disabled>'
		+		'</div>'
		+	'</div>'
		+	'<fieldset>'
		+		'<legend>Nuevo peso y altura</legend>'
		+ 		'<div class="form-group">'
		+ 			'<label for="nuevo-peso" class="col-sm-2 control-label">Nuevo peso</label>'
		+			'<div class="col-sm-8">'
		+ 				'<input id="nuevo-peso" class="form-control" type="text" placeholder="peso">'
		+			'</div>'
		+		'</div>'
		+ 		'<div class="form-group">'
		+ 			'<label for="nuevo-altura" class="col-sm-2 control-label">Nueva altura</label>'
		+			'<div class="col-sm-8">'
		+ 				'<input id="nuevo-altura" class="form-control" type="text" placeholder="altura">'
		+			'</div>'
		+		'</div>'
		+ 		'<div class="form-group text-center">'
		+			'<input id="modificar-peso-altura" class="btn btn-success" type="button" value="Actualizar" data-paciente="' + consultaActual.paciente + '">'
		+		'</div>'
		+	'</fieldset>'
		+	'<fieldset>'
		+		'<legend>Descripción</legend>'
		+		'<div class="form-group text-center">'
		+			'<textarea id="desc" class="form-control" rows="3"></textarea>'
		+			'<input id="finalizar-consulta" class="btn-lg btn-success" type="button" value="FINALIZAR CONSULTA" style="width:80%">'
		+		'</div>'
		+	'</fieldset>'
		+ '</form>';
	contenedor.html(divPadre + tablaConsulta + '</div>');

	$("#modificar-peso-altura").on('click', function(){
		var peso = $("#nuevo-peso");
		var altura = $("#nuevo-altura");
		if(validacionTotal(peso.val(), altura.val())){
			peso.val("");
			altura.val("");
			peso.attr('placeholder', 'Ingrese solo números');
			altura.attr('placeholder', 'Ingrese solo números');
			return;
		}
		var indicePaciente = $(this).attr('data-paciente');
		modificarPesoAltura(peso.val(), altura.val(), indicePaciente);
		actualizarPesoAlturaIMC(indicePaciente);
		//mostrar alerta de variación de IMC y nuevos historicos
		alertaVariacionIMC(indicePaciente);
		alertaNuevoMaximoMinimoPeso(indicePaciente);
	});
	$("#finalizar-consulta").on('click', function(){
		consultas[_consultaIndex].modificarEstado();
		consultas[_consultaIndex].modificarDescripcion($("textarea#desc").val());
		usuarioIngresado.consultasFinalizadas++;
		$("#form-consultas").html("");
		$(".contenedor-consultas-medico").html("");
		dibujarSelectConsultasMedico();
		dibujoTablaConsultasFinalizadas();
	})
}

/**
 alertaNuevoMaximoPeso
 
 indicePaciente = int
*/

function alertaNuevoMaximoMinimoPeso(_indicePaciente){
	var paciente = pacientes[_indicePaciente];
	var pesoPacienteActual = paciente.peso.splice(paciente.peso.length - 1, 1);
	if(maximoEnArray(paciente.peso) < pesoPacienteActual){
		if($("input#viejo-peso").next().is($("#alerta-peso"))){
			$("#alerta-peso").html('<strong>Nuevo peso máximo historico</strong>');
		}else{
			$("#viejo-peso").after('<span id="alerta-peso" class="bg-danger text-uppercase"><strong>Nuevo peso máximo historico</strong></span>');
		}
	}else if(minimoEnArray(paciente.peso) > pesoPacienteActual){
		if($("input#viejo-peso").next().is($("#alerta-peso"))){
			$("#alerta-peso").html('<strong>Nuevo peso mínimo historico</strong>');
		}else{
			$("#viejo-peso").after('<span id="alerta-peso" class="bg-danger text-uppercase"><strong>Nuevo peso mínimo historico</strong></span>');
		}
	}else{
		$("#alerta-peso").html("");
	}
	paciente.peso.push(pesoPacienteActual);
}


/**
 @modificarPesoAltura
 peso = int
 altura = float
 pacienteIndex = int

 return undefined
*/

function modificarPesoAltura(peso, altura, pacienteIndex){
	pacientes[pacienteIndex].peso.push(peso);
	pacientes[pacienteIndex].altura.push(altura);
}

/**
 pacienteIndex = int
 
 returns bool
*/

function variacionMayorADiezIMC(pacienteIndex){
	var paciente = pacientes[pacienteIndex];
	var pesoAnterior = paciente.peso[paciente.peso.length - 2];
	var alturaAnterior = paciente.altura[paciente.altura.length - 2] / 100;
	var pesoNuevo = paciente.peso[paciente.peso.length - 1];
	var alturaNuevo = paciente.altura[paciente.altura.length - 2] / 100;
	var imcViejo = calcularIMC(pesoAnterior, alturaAnterior) / 100;
	var imcNuevo = calcularIMC(pesoNuevo, alturaNuevo) / 100;
	if(imcNuevo - imcViejo > 0.10 || imcNuevo - imcViejo < -0.10){
		return true;
	}
	return false;
}

/**
 calculo agnostico de IMC
*/

function calcularIMC(peso, altura){
	return peso / Math.pow(altura, 2);
}

/**
 Alertar de variación
*/

function alertaVariacionIMC(pacienteIndex){
	if(variacionMayorADiezIMC(pacienteIndex)){
		$("#imc").after('<span id="alerta-imc" class="bg-danger text-uppercase"><strong>Variación mayor al 10% en el IMC!</strong></span>')
	}else{
		$("#alerta-imc").html("");
	}
}

/**
 habilita o deshabilita paciente
 cedula int

 return undefined
*/
function inhabilitarPaciente(cedula){
	var indexPaciente = busquedaEnArrayObjetos(pacientes, "cedula", cedula);
	if(pacientes[indexPaciente].habilitado){
		pacientes[indexPaciente].habilitado = false;
	}else{
		pacientes[indexPaciente].habilitado = true;
	}
}

/**
 Actualizar valor en tabla
 de peso y altura
 */
 function actualizarPesoAlturaIMC(_indicePaciente){
 	var paciente = pacientes[_indicePaciente];
 	$("#viejo-peso").val(paciente.peso[paciente.peso.length - 1] + " kg");
 	$("#viejo-altura").val(paciente.altura[paciente.altura.length - 1] + " cm");
 	$("#imc").val(paciente.imc());
 }

 /**
  Función accesoria que elimina elementos del médico cuando es necesario.
 */

 function eliminarElementosMedico(){
 	var contenedor = $(".contenedor-consultas-medico");
 	contenedor.html("");
 	$("#form-consultas").html("");
 	return contenedor;
 }