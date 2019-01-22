function checkOS() {
	if(navigator.userAgent.indexOf('IRIX') != -1)
	{ var OpSys = "Irix"; }
	else if((navigator.userAgent.indexOf('Win') != -1) &&
	(navigator.userAgent.indexOf('4.90') != -1))
	{ var OpSys = "Windows Millennium"; }
	else if((navigator.userAgent.indexOf('Win') != -1) &&
	(navigator.userAgent.indexOf('98') != -1))
	{ var OpSys = "Windows 98"; }
	else if((navigator.userAgent.indexOf('Win') != -1) &&
	(navigator.userAgent.indexOf('95') != -1))
	{ var OpSys = "Windows 95"; }
	else if(navigator.appVersion.indexOf("16") !=-1)
	{ var OpSys = "Windows 3.1"; }
	else if (navigator.appVersion.indexOf("NT") !=-1)
	{ var OpSys= "Windows NT"; }
	else if(navigator.appVersion.indexOf("SunOS") !=-1)
	{ var OpSys = "SunOS"; }
	else if(navigator.appVersion.indexOf("Linux") !=-1)
	{ var OpSys = "Linux"; }
	else if(navigator.userAgent.indexOf('Mac') != -1)
	{ var OpSys = "Macintosh"; }
	else if(navigator.appName=="WebTV Internet Terminal")
	{ var OpSys="WebTV"; }
	else if(navigator.appVersion.indexOf("HP") !=-1)
	{ var OpSys="HP-UX"; }
	else { var OpSys = "other"; }
	return OpSys;
}

$('#inicio').submit(function(){
	Login();
	return false;
})

function Login(){
	var usuario = document.getElementById('usuario').value;
	var pass = document.getElementById('pass').value;

	if ((usuario!='')&&(pass!='')){
		if ((usuario=='admin')&&(pass=='1234')){
			Crear_Inicio();
		}else{
			alert("El usuario o contrasena son incorrectos.");
		}
	}else{
		alert("Debe especificar los dos campos obligatoriamente.");
	}
}


function Crear_Inicio(){
	$.ajax({
		url: 'php/login.php',
		dataType: 'json',
		async: false,
		success: function(datos) {
			console.log(datos);
			if (!datos['estado']){
				alert("Error al crear el inicio de sesion.");
				console.log(datos['error']);
			}else{
				window.location.href = 'index.html';
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});
}

function Salir(){
	$.ajax({
		url: 'php/salir.php',
		dataType: 'json',
		async: false,
		success: function(datos) {
			console.log(datos);
			if (!datos['estado']){
				alert("Error al salir del sistema.");
				console.log(datos['error']);
			}else{
				window.location.href = 'login.html';
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});
}

function Verifica_Inicio(){
	$.ajax({
		url: 'php/logueado.php',
		dataType: 'json',
		async: false,
		success: function(datos) {
			//console.log(datos);
			if (!datos['estado']){
				window.location.href = 'login.html';
			}else{
				Obtener_Leds();
				setInterval(function(){
					Obtener_Flujos();
				}, 1000)
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
}

function Obtener_Flujos(){	
	$.ajax({
		url: 'php/obtener_datos.php',
		dataType: 'json',
		async: false,
		success: function(datos) {	
			//console.log(datos);
			if (datos['estado']){
				if (datos['datos']['nivel_agua']=='0'){
					document.getElementById('nivel_agua').value = "NIVEL BAJO";
					$('#led_nivel_agua').removeClass('activado');
				}else{
					document.getElementById('nivel_agua').value = "NIVEL ALTO";
					$('#led_nivel_agua').addClass('activado');
				}

				document.getElementById('nivel_flujo').value = datos['datos']['nivel_flujo']+" L/m";
				if (datos['datos']['nivel_flujo']>0){
					$('#led_nivel_flujo').addClass('activado');
				}else{					
					$('#led_nivel_flujo').removeClass('activado');
				}
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
}

function Obtener_Leds(){	
	$.ajax({
		url: 'php/obtener_datos.php',
		dataType: 'json',
		async: false,
		success: function(datos) {			
			if (datos['estado']){
				for (x=1; x<=4; x++){
					if (datos['datos']['led'+x]==0){
						if (x==1){
							$('#led'+x).removeClass('encendido');
							$('#btn_led1').html('HABILITAR');							
						}else if (x==2) {
							$('#led'+x).removeClass('rojo');
						}else if (x==3) {
							$('#led'+x).removeClass('verde');
						}else if (x==4) {
							$('#led'+x).removeClass('azul');
						}
						$('#btn_led'+x).removeClass('btn-warning');
						$('#btn_led'+x).addClass('btn-outline-secondary');
						document.getElementById('val_led'+x).value = 0;
					}else{						
						if (x==1){
							$('#led'+x).addClass('encendido');
							$('#btn_led1').html('DESHABILITAR');
						}else if (x==2) {
							$('#led'+x).addClass('rojo');
						}else if (x==3) {
							$('#led'+x).addClass('verde');
						}else if (x==4) {
							$('#led'+x).addClass('azul');
						}
						$('#btn_led'+x).addClass('btn-warning');
						$('#btn_led'+x).removeClass('btn-outline-secondary');
						document.getElementById('val_led'+x).value = 1;
					}	
				}
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
}

// $('.leds li').click(function(e){
// 	var led = e.target.id;
// 	var valor = document.getElementById('val_'+led).value;

// 	$.ajax({
// 		url: 'php/actualiza.php',
// 		dataType: 'json',
// 		data: {
// 			led : led,
// 			valor: valor
// 		},
// 		type: "POST",
// 		async: false,
// 		success: function(datos) {
// 			Obtener_Leds();
// 		},
// 		error:function(e){
// 			console.log(e.responseText);
// 		}
// 	});	
// })

function Acciona_Led(led){
	var valor = document.getElementById('val_'+led).value;

	$.ajax({
		url: 'php/actualiza.php',
		dataType: 'json',
		data: {
			led : led,
			valor: valor
		},
		type: "POST",
		async: false,
		success: function(datos) {
			Obtener_Leds();
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
}

var rsec = 0;
var seleccion_de_secuencia = 0;
function Reproducir_Secuencia(numero){
	seleccion_de_secuencia = numero;
	rsec = Math.abs((rsec -1)) ;
	if (rsec==0){
		numero = 0;
	}
	$.ajax({
		url: 'php/actualiza.php',
		dataType: 'json',
		data: {
			control_secuencia : rsec,
			secuencia: numero
		},
		type: "POST",
		async: false,
		success: function(datos) {
			console.log(datos);
			if (datos['estado']){				
				if (datos['datos']['control_secuencia']=="0"){
					$('#btn_sec_1').removeClass('btn-warning');
					$('#btn_sec_1').addClass('btn-outline-secondary');
					$('#btn_sec_2').removeClass('btn-warning');
					$('#btn_sec_2').addClass('btn-outline-secondary');
					$('#btn_sec_3').removeClass('btn-warning');
					$('#btn_sec_3').addClass('btn-outline-secondary');
				}else{					
					$('#btn_sec_'+datos['datos']['secuencia']).addClass('btn-warning');
					$('#btn_sec_'+datos['datos']['secuencia']).removeClass('btn-outline-secondary');
				}
			}else{
				console.log(datos['error']);
			}
		},
		error:function(e){
			console.log(e.responseText);			
		}
	});	
	return false;
}

$('#texto').submit(function(){
	var texto = document.getElementById('texto_envio').value;
	$.ajax({
		url: 'php/actualiza.php',
		dataType: 'json',
		data: {
			texto : texto
		},
		type: "POST",
		async: false,
		success: function(datos) {
			console.log(datos);
			if (datos['estado']){
				document.getElementById('texto_envio').value = "";
				$('#texto .mensaje').html("Texto enviado!");
			}else{
				console.log(datos['error']);
				$('#texto .mensaje').html("Texto no enviado!");
			}
			setTimeout(function(){				
				$('#texto .mensaje').html("");
			}, 2500)
		},
		error:function(e){
			console.log(e.responseText);
			$('#texto .mensaje').html("Texto no enviado!");
		}
	});	
	return false;
})

$('#audio_play').click(function(){	
	Audio(1);
})

$('#audio_stop').click(function(){	
	Audio(0);
})

function Audio(valor){
	$('#reproductor li').removeClass('activo');
	$.ajax({
		url: 'php/actualiza.php',
		dataType: 'json',
		data: {
			audio : valor,
			secuencia: seleccion_de_secuencia //document.getElementById('seleccion_secuencia').value
		},
		type: "POST",
		async: false,
		success: function(datos) {
			console.log(datos);
			if (datos['estado']){
				if (valor==0){
					$('#reproductor .mensaje').html("Audio detenido.");
					$('#reproductor li:nth-child(2)').addClass('activo');
				}else{
					$('#reproductor .mensaje').html("Reproduciendo audio..."+datos['nombre_audio']);
					$('#reproductor li:nth-child(1)').addClass('activo');
				}
			}else{
				console.log(datos['error']);
				$('#reproductor .mensaje').html("Error en el audio!");
			}
		},
		error:function(e){
			console.log(e.responseText);			
		}
	});	
	return false;
}

$('#imagen').submit(function(){
	var form = $('#imagen');
    var formdata = false;
    if (window.FormData){
        formdata = new FormData(form[0]);
    }

    var formAction = form.attr('action');
    $.ajax({
        url : 'php/actualiza.php',
        data : formdata ? formdata : form.serialize(),
        cache : false,
        contentType : false,
        processData : false,
        type : 'POST',
        dataType: 'json',
        success     : function(data, textStatus, jqXHR){            
            console.log(data); 
            if (data['estado']){				
				$('#imagen .mensaje_imagen').html("Imagen guardada!");
			}else{
				console.log(datos['error']);
				$('#imagen .mensaje_imagen').html("Imagen no guardada!");
			}
			setTimeout(function(){				
				$('#imagen .mensaje_imagen').html("");
			}, 2500)
        },
        error: function(e){
        	console.log(e.responseText);        	
        }
    });
    return false;
})

$('#audio').submit(function(){
	var form = $('#audio');
    var formdata = false;
    if (window.FormData){
        formdata = new FormData(form[0]);
    }

    var formAction = form.attr('action');
    $.ajax({
        url : 'php/audio.php',
        data : formdata ? formdata : form.serialize(),
        cache : false,
        contentType : false,
        processData : false,
        type : 'POST',
        dataType: 'json',
        success : function(data, textStatus, jqXHR){            
            console.log(data); 
            if (data['estado']){				
				$('#audio .mensaje_audio').html("Audio guardado!");
			}else{
				console.log(data['error']);
				$('#audio .mensaje_audio').html("Audio no guardado!");
			}
			setTimeout(function(){				
				$('#audio .mensaje_audio').html("");
			}, 2500)
        },
        error: function(e){
        	console.log(e.responseText);        	
        }
    });
    return false;
})	