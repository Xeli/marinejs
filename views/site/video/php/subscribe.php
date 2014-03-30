<?php
/* 
	subscribe email 
*/

if( isset($_GET['email']) && !empty($_GET['email']) ){
	
	$email = trim($_GET['email'])."\r\n";
	$filename = 'email_list.txt';

	if(file_exists($filename)){
		file_put_contents($filename,$email,FILE_APPEND);
	} else {
		file_put_contents($filename,$email);
		chmod($filename, 0777);
	}
	
	echo 'Your email has been successful sent.';
	exit;

} else {
	echo 'Error.';
	exit;
}

?>