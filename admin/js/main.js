function Leer(){
	$.ajax({
		url: 'http://34.223.215.43/control_raspi/php/obtener_datos.php',
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