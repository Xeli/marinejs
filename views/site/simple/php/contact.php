<?php
if($_GET){

	$to_Email   	= "developedbynb@gmail.com"; //Replace with recipient email address
	$subject        = 'This is subject ...'; //Subject line for emails

	//check $_GET vars are set, exit if any missing
	if(!isset($_GET["name"]) || !isset($_GET["email"])  || !isset($_GET["message"]))
	{
		die();
	}

	//Sanitize input data using PHP filter_var().
	$name        = filter_var($_GET["name"], FILTER_SANITIZE_STRING);
	$email       = filter_var($_GET["email"], FILTER_SANITIZE_EMAIL);
	$message     = filter_var($_GET["message"], FILTER_SANITIZE_STRING);

	//proceed with PHP email.
	$headers = 'From: ' . $email . "\r\n" .
	'Reply-To: ' . $email . "\r\n" .
	'X-Mailer: PHP/' . phpversion();

	@$sentMail = mail($to_Email, $subject, $message .' - '.$name, $email);
	if(!$sentMail)
	{
		echo 'HTTP/1.1 500 Could not send mail! Sorry..';
		exit();
	}else{
		echo 'Your message has been successful send.';
	}
}

?>