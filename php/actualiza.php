<?php 

$respuesta['estado'] = false;

try{
	include 'funciones.php';
	require 'meta.php';

	$respuesta['datos'] = $_POST;
	$respuesta['imagen'] = $_FILES;

	if (isset($_POST['texto'])){
		$actualiza = Meta::Actualizar_Campo('control', 'texto', $_POST['texto'], 'id_control', 1);
	}elseif (isset($_POST['audio'])) {
		$actualiza = Meta::Actualizar_Campo('control', 'audio', $_POST['audio'], 'id_control', 1);
	}elseif (isset($_POST['led'])){
		$led = $_POST['led'];
		$valor = $_POST['valor'];
		$valor = abs($valor-1);

		$actualiza = Meta::Actualizar_Campo('control', $led, $valor, 'id_control', 1);
	}elseif (isset($_FILES['imagen_envio']['name'])) {		
		Imagen($_FILES, 500, 500);
		$actualiza = Meta::Actualizar_Campo('control', 'imagen', $_FILES['imagen_envio']['name'], 'id_control', 1);
	}

	$respuesta['estado'] = true;
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);