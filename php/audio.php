<?php

$respuesta['estado'] = false;

try{
	$nombre = $_FILES['audio_envio']['name'];
	$tipo = $_FILES['audio_envio']['type'];
	$tamanio = $_FILES['audio_envio']['size'];
	$ruta = $_FILES['audio_envio']['tmp_name'];
	$destino = "tmp/audio.mp3";

	move_uploaded_file($_FILES['audio_envio']['tmp_name'], $destino);

	$respuesta['estado'] = true;
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);

