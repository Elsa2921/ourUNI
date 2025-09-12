<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Dotenv\Dotenv;
if(file_get_contents(__DIR__. '/.env')){
    $dotenv = Dotenv::createImmutable(__DIR__);
}
else{
    throw new Exception('file not foud');
}

$dotenv->load();
$dotenv->safeLoad();
?>