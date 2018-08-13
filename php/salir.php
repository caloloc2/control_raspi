<?php 

$respuesta['estado']= false;

try{
	session_start();
	session_unset();
	session_destroy();
	
	$respuesta['estado'] = true;
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);