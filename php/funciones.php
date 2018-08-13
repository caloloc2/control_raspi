<?php 

function Imagen($imagen, $max_ancho=500, $max_alto=500){	
	$foto='';
	// Mime types permitidos
	$mimetypes = array("image/jpeg", "image/pjpeg", "image/gif", "image/png");
	// Variables de la foto
	$name = $imagen['imagen_envio']["name"];
	$type = $imagen['imagen_envio']["type"];
	$tmp_name = $imagen['imagen_envio']["tmp_name"];
	$size = $imagen['imagen_envio']["size"];
	
	if(in_array($type, $mimetypes)){
		$rtOriginal=$tmp_name;		
		$original = @imagecreatefromjpeg($rtOriginal);
					
		list($ancho,$alto)=getimagesize($rtOriginal);		

		$lienzo=imagecreatetruecolor($max_ancho, $max_alto); 
		$ooooo = imagecopyresampled($lienzo, $original, 0, 0, 0, 0, $max_ancho, $max_alto, $ancho, $alto);
		imagedestroy($original);
		
		imagejpeg($lienzo,"tmp/foto.jpg", 75);
		
		//$foto = file_get_contents("tmp/foto");

		//@unlink($tmp_name);
		//@unlink("tmp/".$name);
	}
	//return $foto;
}