<?php
require_once __DIR__. '/../checkers/auth.php';
require_once __DIR__. '/../require/vendor.php';

// class  Authentication{
//     protected $base

// }
function googleAuth_($idToken){
    $client = new Google_Client(['client_id'=>'218309719864-8eb96rciovm8lfnn083anilecba1og5f.apps.googleusercontent.com']);
    $payload = $client->verifyIdToken($idToken);   
    if($payload){
        $email=  $payload['email'];
        $full =$payload['name'];
        $parts=  explode(' ',$full);
        // $name = $parts[1];
        $checker = checkEmailExists($email);
        if($checker){
            if($checker==1){
                $id = getUserId($email);
                $_SESSION['ourUNI_info'] = [
                    'id'=>$id,
                    'email'=>$email,
                    'name'=>$full
                ];
                $_SESSION['ourUNI_id_'] = $id;
                echo json_encode(['status'=>200, 'email'=>$email, 'name'=>$parts[0], 'surname'=>$parts[1]]);
            }
            else{
                echo json_encode(["error" => "your account is'nt a google account!!"]);
            }
            
        }
        else{
            global $class;
            $pdo = $class->connect();
            $stmt = $pdo->prepare("INSERT INTO users (full_name,email,type) VALUES 
            (:full_name, :email, :type)");
            $stmt->execute([':full_name'=>$full, ':email'=>$email, ':type'=>1]);
            $id = $pdo->lastInsertId();
            $_SESSION['ourUNI_info'] = [
                'id'=>$id,
                'email'=>$email,
                'name'=>$full
            ];
            $_SESSION['ourUNI_id_'] = $id;
            echo json_encode(['status'=>200, 'email'=>$email, 'name'=>$full]);
        }

        
    } 
    else{
        http_response_code(401);
        echo json_encode(["error" => "Invalid token"]);
    }
    
}


function signup1($name,$surname){
    global $class;
    $full_name=$name." ".$surname;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("INSERT INTO users
     (full_name,type) VALUES 
    (:full_name, :type)");
    
    $stmt->execute([":full_name"=>$full_name, ':type'=>3]);
    $_SESSION['ourUNI_id_n'] = $pdo->lastInsertId();
    echo json_encode(['status'=>"200"]);
}



function signup_email($email){
    $checker = checkEmailExists($email);
    if($checker){
        echo json_encode(["error" => "Account With this email already exists"]);
        exit();
    }
    else{
        $id = $_SESSION['ourUNI_id_n'] ?? '';
        if(!empty($id)){
            global $class;
            $code = code();
            $class->query("UPDATE users SET email=:email, code=:code WHERE id=:id",
        [':email'=>$email,':code'=>$code,':id'=>$id]);
            $_SESSION['ourUNI_id'] = $id;
            $_SESSION['after_email'] = 1;
            unset($_SESSION['ourUNI_id_n']);
            echo json_encode(['status'=>200]);
            exit();
        }
    }
}


function newCode(){
    $id = $_SESSION['ourUNI_id'] ?? '';
    $p = $_SESSION['after_email'] ?? '';
    if(!empty($id) and !empty($p)){
        global $class;
        unset($_SESSION['after_email']);
        $code = code();
        $class->query("UPDATE users SET  code=:code WHERE id=:id",
        [':code'=>$code,':id'=>$id]);
        echo json_encode(['status'=>200]);
        header('Location: ../public/html/register/auth.html');
         exit();
    }
    else{
        echo json_encode(["error" => "Inavalid Filed!"]);
        header('Location: ../public/html/register/auth.html');
        exit();
    }
}


function authChecker($code){
    $id = $_SESSION['ourUNI_id'] ?? '';
    if(!empty($id)){
        $checker = codeChecker($code, $id);
        if($checker){
            $_SESSION['code_ourUNI'] = 'o'; 
            echo json_encode(['status'=>200]);
            exit();
        }
        else{
            echo json_encode(["error" => "Inavalid Filed!"]);
        }
    }
    else{
        echo json_encode(["error" => "Inavalid Filed!!"]);
    }
}

function code(){
    return rand(100000,999999);
}



function passwordAdder($password){
    $id = $_SESSION['ourUNI_id'] ?? '';
    $code = $_SESSION['code_ourUNI'] ?? '';
    if(!empty($id) and !empty($code)){
        global $class;
        $hash = password_hash($password,PASSWORD_BCRYPT);
        $class->query("UPDATE users SET password=:password, code=:code WHERE id=:id",
        [':password'=>$hash,':code'=>0,':id'=>$id]);
        echo json_encode(['status'=>200]);
        unset($_SESSION['code_ourUNI']);
    }
    else{
        echo json_encode(["error" => "Inavalid Filed!!"]);
    }
}


function forgotPassEmail($email){
    $checker = checkEmailExists($email);
    if($checker){
        if($checker==3){
            global $class;
            $code = code();
            $_SESSION['ourUNI_id'] = getUserId($email);
            $_SESSION['after_email'] = 1;
            $class->query("UPDATE users SET  code=:code WHERE email=:email",
        [':email'=>$email,':code'=>$code]);
            echo json_encode(['status'=>200]);
            exit();
            
        }
        else{
            echo json_encode(["error" => "Your account is not created with email!"]);
            exit();
        }

    }
    else{
        echo json_encode(["error" => "Sign up first please!!"]);
    }
}

function login($email,$password){
    $data = checkloginInfo($email);
    if($data){
        if($data['type']==3){
            if(password_verify($password,$data['password'])){
                $_SESSION['ourUNI_info'] = [
                    'id'=>$data['id'],
                    'email'=>$email,
                    'name'=>$data['full_name']
                ];
                $_SESSION['ourUNI_id_'] = $data['id'];
                echo json_encode(['status'=>200]);
                exit();
            }
            else{
                echo json_encode(["error" => "Wrong password!!!!"]);

            }
        }
        else{
            echo json_encode(["error" => "Your account is not created with email!"]);
            exit();
        }
    }
    else{
        echo json_encode(["error" => "Sign up first please!!!!"]);
    }
}


?>