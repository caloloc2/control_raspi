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
			//console.log(datos);
			if (datos['estado']){				
				// estado de los leds
				for(x=1; x<5; x++){
					if (datos['datos']['led'+x]=="0"){
						$('#led'+x).removeClass('encendido');
					}else{
						$('#led'+x).addClass('encendido');
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
						audios.play();
						estado_audio = true;
						Secuencia();
					}					
				}else{
					audios.pause();
					clearInterval(secuencia);
					estado_audio = false;
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
		console.log('secuencia...');
	},1000)
}

//timer.clearInterval();