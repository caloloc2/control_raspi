<?php 

$respuesta['estado'] = false;

try{
	session_start();

	if ((isset($_SESSION['usuario']))&&($_SESSION['usuario']=='admin')){
		$respuesta['estado'] = true;	
	}
	
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);