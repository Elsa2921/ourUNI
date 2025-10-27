<?php
require_once __DIR__ . '/registration/authentication.php';
require_once __DIR__ . '/main/loggedChecker.php';
require_once __DIR__ . '/main/profFunctions.php';
date_default_timezone_set("UTC");

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
// echo json_encode([$origin]);

if (empty($origin) || $origin==$_ENV['APP_ALLOWED_ORIGIN']) {
    if (!empty($origin)) {
        // Send CORS headers only if origin is present
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
    }

    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        $post = json_decode(file_get_contents("php://input"),true);
        if(
            isset($post['form'])
            and !empty($post['form'])
        ){

            if($post['form']=='forgotPass_form'){
                if(isset($post['email']) and !empty($post['email'])){
                    forgotPassEmail($post['email']);
                }
            }
            elseif($post['form']=='login_form'){
                if(isset($post['email']) and isset($post['password']) and isset($post['type'])){
                    if(!empty($post['email']) and !empty($post['password']) and !empty($post['type'])){
                        if ($post['type'] == 1 or $post['type'] == 2){
                            $type = $post['type'] ==1 ? 'students' : 'professors';
                            login($post['email'],$post['password'],$type,$post['type']);
                        }
                        
                    }
                }
                
            }
        
            

            
        }
        elseif(isset($post['loggedChecker1'])){
            logchecker($post['loggedChecker1']);
        }
        elseif(
            isset($post['createTestName'])
            and isset($post['name'])
            and isset($post['subject'])
        ){
            if(!empty($post['name']) and !empty($post['subject'])){
                createTestName($post['name'],$post['subject']);
            }
        }
        elseif(isset($post['addTableLine'])){
            addTableLine();
        }
        elseif(
            isset($post['startExam'])
            and isset($post['test'])
            and isset($post['duration'])
            and isset($post['minPoints'])
            and isset($post['maxPoints'])
            and isset($post['name'])
        ){
            if(
                !empty($post['test'])
                and !empty($post['duration'])
                and !empty($post['minPoints'])
                and !empty($post['name'])
                
            ){
                startExam($post['name'],$post['test'],$post['duration'],$post['minPoints'],$post['maxPoints']);
            }
        }

        elseif(isset($post['id']) and isset($post['examView'])){
            $_SESSION['ourUNI_ViewExam'] = $post['id'];
        }
        elseif(isset($post['logout'])){
            session_destroy();

        }
    }

    elseif($_SERVER["REQUEST_METHOD"]=="GET"){
        if(isset($_GET['createTestReload'])){
            createTestReload();
        }
        elseif(isset($_GET['testsPageReload'])){
            testsPageReload();
        }
        elseif(isset($_GET['viewTestReload'])){
            testViewReload();
        }
        elseif(isset($_GET['startExam_reload'])){
            startExam_reload();
        }
        elseif(isset($_GET['examsProgressReload'])){
            examsProgressReload();
        }
        elseif(isset($_GET['viewExamReload']) and isset($_GET['type'])){
            viewExamReload($_GET['type']);
        }
        elseif(
            isset($_GET['id'])
            and isset($_GET['examView'])
        ){
            examView($_GET['id']);
        }
        elseif(
            isset($_GET['studentSearch'])
            and isset($_GET['search'])
        ){
            studentSearch($_GET['search']);
        }
        elseif(
            isset($_GET['testNameReload'])
        ){
            testNameReload();
        }
    }


    elseif($_SERVER["REQUEST_METHOD"]=="PUT"){
        $put = json_decode(file_get_contents('php://input'),true);
        if(
            isset($put['tableUpdate'])
            and isset($put['id'])
            and isset($put['column'])
            and isset($put['value'])
        ){
            tableUpdate($put['id'],$put['column'],$put['value']);
        }
        elseif(isset($put['set_test_id']) and !empty($put['set_test_id'])){
            $_SESSION['ourUNI_test_id'] = $put['set_test_id'];
        }   
        elseif(isset($put['end_exam']) and isset($put['id'])){
            end_exam($put['id']);
        }
    }

    elseif($_SERVER["REQUEST_METHOD"]=="DELETE"){
        $uri = $_SERVER["REQUEST_URI"];
        // $delete = $_GET;
        $request = explode('/', $uri);
        $part1 = $request[count($request)-2];
        $id = $request[count($request)-1];

        echo json_encode([$part1,$id]);
        if($part1 == 'tableLine'){
            
            deleteQuestionRow($id);
            
        }
        elseif($part1 == 'deleteTest'){
            deleteTest($id);
        }
    }
}
else{
    http_response_code(403);
    echo json_encode(['huh gatcha !!'=>$origin]);
    exit();
}

?>