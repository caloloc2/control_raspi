<?php 

function Imagen($imagen, $max_ancho=500, $max_alto=500){
	print_r($imagen);
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
		switch ($type) {
			case 'image/jpeg':			
				$original = @imagecreatefromjpeg($rtOriginal);
				break;
			case 'image/pjpeg':
				$original = @imagecreatefromjpeg($rtOriginal);					
				break;
			case 'image/gif':
				$original = @imagecreatefromgif($rtOriginal);
				break;
			case 'image/png':
				$original = @imagecreatefrompng($rtOriginal);
				break;
		}	
					
		list($ancho,$alto)=getimagesize($rtOriginal);
		$src_y = ($alto / 2) - ($max_alto / 2);

		$lienzo=imagecreatetruecolor($max_ancho, $max_alto); 
		$ooooo = imagecopyresampled($lienzo, $original, 0, 0, 0, $src_y, $max_ancho, $max_alto, $ancho, $max_alto);
		imagedestroy($original);
		
		switch ($type) {
			case 'image/jpeg':
				imagejpeg($lienzo,"tmp/".$name, 75);
				break;
			case 'image/pjpeg':
				imagejpeg($lienzo,"tmp/".$name, 75);				
				break;
			case 'image/gif':
				imagegif($lienzo,"tmp/".$name);
				break;
			case 'image/png':
				imagepng($lienzo,"tmp/".$name, 9);
				break;
		}

		$foto = file_get_contents("tmp/".$name);

		@unlink($tmp_name);
		@unlink("tmp/".$name);
	}
	return $foto;
}