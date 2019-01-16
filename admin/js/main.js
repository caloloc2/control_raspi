var secuencia;
var estado_audio = false;

function Leer(){
	setInterval(function(){
		Leds();
	}, 1000);
}

function Leds(){
	$.ajax({
		url: 'php/obtener_datos.php',
		dataType: 'json',		
		async: false,
		success: function(datos) {
			console.log(datos);
			if (datos['estado']){				
				// estado de los leds
				for(x=1; x<5; x++){
					if (datos['datos']['led'+x]=="0"){
						$('#led'+x).removeClass('encendido');
						$('#led'+x).removeClass('rojo');
						$('#led'+x).removeClass('verde');
						$('#led'+x).removeClass('azul');
					}else{						
						if (x==1){
							$('#led'+x).addClass('encendido');
						}else if (x==2) {
							$('#led'+x).addClass('rojo');
						}else if (x==3) {
							$('#led'+x).addClass('verde');
						}else if (x==4) {
							$('#led'+x).addClass('azul');
						}
					}	

				}

				// texto enviado
				$('#texto_enviado').html(datos['datos']['texto']);

				// imagen
				$("#fotografia").removeAttr('src');
				$("#fotografia").attr("src","../php/tmp/foto.jpg");

				// reproduce o detiene audio
				
				var audios = document.getElementById('player');
				if (datos['datos']['audio']=="1"){
					if (estado_audio==false){
						$("#player").attr("src", "../php/tmp/"+datos['datos']['nombre_audio']);
						$('#reproductor .mensaje').html("Reproduciendo "+datos['datos']['nombre_audio']);

						if (datos['datos']['mime']!='0-0-0-0'){
							if (datos['datos']['mime']=='1-1-0-0*1-0-1-0*1-0-0-1*0-1-0-0*0-0-1-0*0-0-0-1'){
								$('#secuencia').html('Secuencia 1');
							}else if (datos['datos']['mime']=='1-1-0-0*1-1-1-0*1-0-1-0*1-0-1-1*1-0-0-1*1-1-0-1*0-1-0-0*0-1-1-0*0-0-1-0*0-0-1-1*0-0-0-1*0-1-0-1') {
								$('#secuencia').html('Secuencia 2');
							}else if (datos['datos']['mime']=='1-1-0-0*1-1-1-1*1-0-0-1*1-1-1-1*1-0-1-0*1-1-1-1*0-1-0-0*0-1-1-1*0-0-0-1*0-1-1-1*0-0-1-0*0-1-1-1') {
								$('#secuencia').html('Secuencia 3');
							}							
						}else{
							$('#secuencia').html('Secuencia Manual');
						}

						// if (datos['datos']['secuencia']!='0'){
						// 	if (datos['datos']['secuencia']=='1'){
						// 		$('#secuencia').html('Secuencia 1');
						// 	}else if (datos['datos']['secuencia']=='2') {
						// 		$('#secuencia').html('Secuencia 2');
						// 	}else if (datos['datos']['secuencia']=='3') {
						// 		$('#secuencia').html('Secuencia 3');
						// 	}else{
						// 		$('#secuencia').html('Secuencia Manual');
						// 	}							
						// }else{
						// 	$('#secuencia').html('Secuencia Manual');
						// }
						audios.play();
						estado_audio = true;
						Secuencia();
					}					
				}else{
					audios.pause();
					clearInterval(secuencia);
					estado_audio = false;
					$('#reproductor .mensaje').html("Audio Detenido");
					$('#secuencia').html('Secuencia Manual');
				}

				if (datos['datos']['secuencia']=="1"){	
					if (datos['datos']['mime']!='0-0-0-0'){
						if (datos['datos']['mime']=='1-1-0-0*1-0-1-0*1-0-0-1*0-1-0-0*0-0-1-0*0-0-0-1'){
							$('#texto_secuencia').html('Secuencia 1');
						}else if (datos['datos']['mime']=='1-1-0-0*1-1-1-0*1-0-1-0*1-0-1-1*1-0-0-1*1-1-0-1*0-1-0-0*0-1-1-0*0-0-1-0*0-0-1-1*0-0-0-1*0-1-0-1') {							
							$('#texto_secuencia').html('Secuencia 2');
						}else if (datos['datos']['mime']=='1-1-0-0*1-1-1-1*1-0-0-1*1-1-1-1*1-0-1-0*1-1-1-1*0-1-0-0*0-1-1-1*0-0-0-1*0-1-1-1*0-0-1-0*0-1-1-1') {
							$('#texto_secuencia').html('Secuencia 3');
						}							
					}else{
						clearInterval(secuencia);
						$('#texto_secuencia').html('Secuencia Manual');
					}
					Secuencia();
				}else{
					clearInterval(secuencia);
					$('#secuencia').html('Secuencia Manual');
				}
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});
}

function Secuencia(){
	secuencia = setInterval(function(){
		//console.log('secuencia...');
	},1000)
}

//timer.clearInterval();