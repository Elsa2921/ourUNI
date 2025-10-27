<?php
date_default_timezone_set("UTC");
$dt = new DateTime();
print_r($dt->format('Y-m-d H:i:s'));
session_start();
print_r($_SESSION);
// session_destroy();
// print(password_hash('Elsa1234$',PASSWORD_BCRYPT));
?>