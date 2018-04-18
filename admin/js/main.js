function Leer(){
	$.ajax({
		url: 'http://192.168.0.105/control_raspi/php/obtener_datos.php',
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