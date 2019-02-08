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
		$nombre_audio = Meta::Consulta_Unico("SELECT nombre_audio FROM control LIMIT 1");
		$respuesta['nombre_audio'] = $nombre_audio['nombre_audio'];
		
		if (isset($_POST['secuencia'])){
			switch ($_POST['secuencia']) {
				case 0:
					# sin secuencia
					$actualiza = Meta::Actualizar_Campo('control', 'mime', '0-0-0-0', 'id_control', 1);
					break;
				case 1:
					# secuencia 1
					$actualiza = Meta::Actualizar_Campo('control', 'mime', '1-1-0-0*1-0-1-0*1-0-0-1*0-1-0-0*0-0-1-0*0-0-0-1', 'id_control', 1);
					break;
				case 2:
					# secuencia 2
					$actualiza = Meta::Actualizar_Campo('control', 'mime', '1-1-0-0*1-1-1-0*1-0-1-0*1-0-1-1*1-0-0-1*1-1-0-1*0-1-0-0*0-1-1-0*0-0-1-0*0-0-1-1*0-0-0-1*0-1-0-1', 'id_control', 1);
					break;
				case 3:
					# secuencia 3
					$actualiza = Meta::Actualizar_Campo('control', 'mime', '1-1-0-0*1-1-1-1*1-0-0-1*1-1-1-1*1-0-1-0*1-1-1-1*0-1-0-0*0-1-1-1*0-0-0-1*0-1-1-1*0-0-1-0*0-1-1-1', 'id_control', 1);
					break;
			}
		}
	}elseif (isset($_POST['control_secuencia'])) {
		$actualiza = Meta::Actualizar_Campo('control', 'secuencia', $_POST['control_secuencia'], 'id_control', 1);
		
		if (isset($_POST['secuencia'])){
			switch ($_POST['secuencia']) {
				case 0:
					# sin secuencia
					$actualiza = Meta::Actualizar_Campo('control', 'mime', '0-0-0-0', 'id_control', 1);
					break;
				case 1:
					# secuencia 1
					$actualiza = Meta::Actualizar_Campo('control', 'mime', '1-1-0-0*1-0-1-0*1-0-0-1*0-1-0-0*0-0-1-0*0-0-0-1', 'id_control', 1);
					break;
				case 2:
					# secuencia 2
					$actualiza = Meta::Actualizar_Campo('control', 'mime', '1-1-0-0*1-1-1-0*1-0-1-0*1-0-1-1*1-0-0-1*1-1-0-1*0-1-0-0*0-1-1-0*0-0-1-0*0-0-1-1*0-0-0-1*0-1-0-1', 'id_control', 1);
					break;
				case 3:
					# secuencia 3
					$actualiza = Meta::Actualizar_Campo('control', 'mime', '1-1-0-0*1-1-1-1*1-0-0-1*1-1-1-1*1-0-1-0*1-1-1-1*0-1-0-0*0-1-1-1*0-0-0-1*0-1-1-1*0-0-1-0*0-1-1-1', 'id_control', 1);
					break;
			}
		}
	}elseif (isset($_POST['led'])){
		$led = $_POST['led'];
		$valor = $_POST['valor'];
		$valor = abs($valor-1);

		$actualiza = Meta::Actualizar_Campo('control', $led, $valor, 'id_control', 1);
	}elseif (isset($_FILES['imagen_envio']['name'])) {		
		Imagen($_FILES, 500, 500);
		$actualiza = Meta::Actualizar_Campo('control', 'imagen', $_FILES['imagen_envio']['name'], 'id_control', 1);
	}elseif (isset($_POST['luz'])) {
		$valor_luz = Meta::Consulta_Unico("SELECT luz FROM control LIMIT 1");
		if ($valor_luz['luz']!=''){
			$aux = abs(intval($valor_luz['luz']) -1);
			$actualiza = Meta::Actualizar_Campo('control', 'luz', $aux, 'id_control', 1);
		}
	}

	$respuesta['estado'] = true;
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);