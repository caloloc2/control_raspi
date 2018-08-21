<?php

$respuesta['estado'] = false;

try{
	require 'meta.php';

	$nombre = $_FILES['audio_envio']['name'];
	$tipo = $_FILES['audio_envio']['type'];
	$tamanio = $_FILES['audio_envio']['size'];
	$ruta = $_FILES['audio_envio']['tmp_name'];
	$destino = "tmp/".$nombre;

	$actualiza = Meta::Actualizar_Campo("control", "nombre_audio", $nombre, "id_control", 1);

	move_uploaded_file($_FILES['audio_envio']['tmp_name'], $destino);

	$respuesta['estado'] = true;
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);

