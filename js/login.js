/**
Funciones correspondientes a el login del usuario
*/

// variable global que contiene el usuario objeto a maniputar

var usuarioIngresado;


//oculto menús que no interesan

function ocultarMenus(){
	$(".menuInfo").hide();
	$(".menuCliente").hide();
	$(".menuDoctor").hide();
	$(".botonera").hide();
	$(".infos").hide();

}


// agregar boton de login

function agregarBotonLogin(){
	var contenedor = $('#navbar ul');
	contenedor.append(''
		+ '<li class="text-center">'
		+ '<button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target=".login-form" id="login-ingresar">'
		+ 	'Ingresar'
		+ '</button></li>');
}

// agrego botón de logout

function agregarBotonSalida(){
	var contenedor = $('#navbar ul');
	contenedor.append('<li><a href="#" style="display:none" id="logout">Salir</a></li>');
}

// generar form login

function agregarFormLogin(){
	var form = '<div id="login-form" class="modal fade login-form" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'
		+ '<div class="modal-dialog modal-sm" role="document">'
		+ 	'<div class="modal-content">'
		+ 		'<div class="modal-header">'
		+ 			'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		+			'<h4 class="modal-title">Bienvenido</h4>'
		+		'</div>'
		+		'<div class="modal-body">'
		+			'<form id="my-login">'
		+				'<div class="form-group">'
		+					'<label for="txt-usuario">Usuario:</label>'
		+					'<input type="text" class="form-control" id="txt-usuario" name="txt-usuario">'
		+				'</div>'
		+				'<div class="form-group">'
		+					'<label for="txt-clave">Clave:</label>'
		+					'<input type="password" class="form-control" id="txt-clave" name="txt-clave">'
		+				'</div>'
		+				'<span id="error-login"></span>'
		+			'</form>'
		+		'</div>'
		+		'<div class="modal-footer">'
		+			'<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'
		+			'<button type="button" id="btn-ingresar" class="btn btn-primary">Ingresar</button>'
		+		'</div>'
		+ 	'</div>'
		+ '</div>';

	$("nav").after(form);
}



// ocultar boton de login/mostrar boton salida

function mostrarOcultarBotonLoginLogout(){
	var login = $("#login-ingresar");
	var logout = $("#logout");
	if(login.is(':hidden')){
		login.show();
		logout.hide();
	}else{
		login.hide();
		logout.show();
	}
	
}

// salir de sesión

function salirSesion(){
	// hacer un reload de la página
	//window.location.reload(false); 
	// o limpiar los datos
	ocultarMenus();
	mostrarOcultarBotonLoginLogout();
	borradoBienvenida();
	if(usuarioIngresado.hasOwnProperty('especialidad')){
		salirMedico();
	}
	usuarioIngresado = null;

	//salirPaciente();
}

//test

$().ready(function(){
	ocultarMenus();
	agregarBotonLogin(),
	agregarBotonSalida();
	agregarFormLogin();
	generarConsultas(25);
	dibujoTablaConsultasFinalizadas();
	//testing
	/*usuarioIngresado = doctores[0];
	inicializarInterfazMedico();*/
	//testing
	$("#btn-ingresar").on('click', function(){
		//Validamos que exista usuario y relizamos el login
		ingresarUsuario();
		//Limpiamos los inputs del login
		$("#my-login")[0].reset();
		if(usuarioIngresado.especialidad !== undefined){
			inicializarInterfazMedico();
		}else{
			inicializarInterfazPaciente();
		}
	});
	$("#logout").on('click', salirSesion);
})