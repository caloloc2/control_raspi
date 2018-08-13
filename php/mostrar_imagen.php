<?php

require 'meta.php';

$consulta = Meta::Consulta_Unico("SELECT * FROM control WHERE id_control=1");
echo $consulta['mime'];
if ($consulta['imagen']!=''){
	header("Content-Type: ".$consulta['mime']); 
	echo $consulta['imagen'];
}