function Leer(){
	$.ajax({
		url: 'http://controlraspi.ddns.net/control_raspi/php/obtener_datos.php',
		dataType: 'json',		
		async: false,
		success: function(datos) {
			console.log(datos);
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
}