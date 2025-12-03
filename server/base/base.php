<?php
session_start();
require_once __DIR__ .'/../require/use.php';
class Base{
    private $password;
    protected $username;
    private $db;
    public $host;
    private $pdo;
    public function __construct($username,$password,$db,$host){
        $this->password = $password;
        $this->username = $username;
        $this->db = $db;
        $this->host = $host;
    }




    public function connect(){
        try{
            if($this->pdo === NULL){
                 $this->pdo =  new PDO("mysql:host=$this->host; dbname=$this->db; charset=utf8mb4"
                 ,$this->username, $this->password,[
                     PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                     PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                     PDO::ATTR_EMULATE_PREPARES => false
                 ]);
            }
            return $this->pdo;
             
         }catch(PDOException $e){
             throw new Exception("Connection failed: " . $e->getMessage());
         }
    }


    public function commit(){
        if($this->pdo && $this->pdo->inTransaction()){
            $this->pdo->commit();
        }
    }


    public function beginTransaction(){
        return $this->connect()->beginTransaction();
    }


    public function rollBack(){
        if($this->pdo && $this->pdo->inTransaction()){
            $this->pdo->rollBack();
        }
    }

    public function query($prepare, $execute=[],$fetchMode = 'all'){
        try{
            $pdo = $this->connect();
            $stmt = $pdo->prepare($prepare);
            $stmt->execute($execute);
            
            return match($fetchMode) {
                'all' => $stmt->fetchAll(),
                'one' => $stmt->fetch(),
                'id' => $pdo->lastInsertId(),
                'column' => $stmt->fetchColumn(),
                default => null
            };
        }
        catch(Exception $e){
            return ['error'=>$e->getMessage()];
            // throw new Exception($e->getMessage());
        }
    }


}

$class = new Base($_ENV['APP_MYSQL_USERNAME'],$_ENV['APP_MYSQL_PASS'],$_ENV['APP_MYSQL_DB'],$_ENV['APP_MYSQL_HOST']);
?>