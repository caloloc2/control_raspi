<?php 

$respuesta['estado'] = false;

try{
	require 'meta.php';

	$aux = Meta::Consulta_Unico("SELECT * FROM control ORDER BY id_control DESC LIMIT 1");

	if ($aux['id_control']==''){
		// no existe ningun registro, entonces crea uno
		$nuevo = Meta::Nuevo_Control(0, 0, 0, 0, '', '', 0);

		$aux = Meta::Consulta_Unico("SELECT * FROM control ORDER BY id_control DESC LIMIT 1");
		$respuesta['datos'] = $aux;

	}else{
		$respuesta['datos'] = $aux;
	}
	
	$respuesta['estado'] = true;
	
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);