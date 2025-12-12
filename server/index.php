<?php
require_once __DIR__ . '/registration/authentication.php';
require_once __DIR__ . '/main/loggedChecker.php';
require_once __DIR__ . '/main/profFunctions.php';
require_once __DIR__. '/main/studentFunctions.php';
date_default_timezone_set("UTC");

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$url = $_SERVER['REQUEST_URI'];
$script = $_SERVER['SCRIPT_NAME'];
$path = str_replace($script,'',$url);
$path = parse_url($path,PHP_URL_PATH);
$segments = explode('/',trim($path,'/'));
$part1 = $segments[0] ?? null;
$part2 = $segments[1] ?? null;

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
        switch($part1){
            case 'test':

            if(
                isset($post['name'])
                and isset($post['subject'])
            ){
                if(!empty($post['name']) and !empty($post['subject'])){
                    createTestName($post['name'],$post['subject']);
                }
            }
            
            case 'exam' :
                if(
                    isset($post['test'])
                    and isset($post['duration'])
                    and isset($post['name'])
                ){
                    if(
                        !empty($post['test'])
                        and !empty($post['duration'])
                        and !empty($post['name'])
                        
                    ){
                        startExam($post['name'],$post['test'],$post['duration']);
                    }
                }
                break;
            case 'table':
                if($part2 =='line'){
                    addTableLine();

                }
            case 'auth':
                if(
                    isset($post['form'])
                    and !empty($post['form'])
                ){
                    $form = $post['form'];
                    switch($form){
                        case 'login_form':
                            if(isset($post['email']) and isset($post['password']) and isset($post['type'])){
                                if(!empty($post['email']) and !empty($post['password']) and !empty($post['type'])){
                                    if ($post['type'] == 1 or $post['type'] == 2){
                                        $type = $post['type'] ==1 ? 'students' : 'professors';
                                        login($post['email'],$post['password'],$type,$post['type']);
                                    }
                                    
                                }
                            }

                        case 'forgotPass_form':
                            if(isset($post['email']) and !empty($post['email']) and isset($post['type'])){
                                forgotPassEmail($post['email'],$post['type']);
                            }
                            
                        case 'newPass_form':
                            if(isset($post['password']) and !empty($post['password'])){
                                newPass($post['password']);
                            }
                        case 'pinCode_form':
                            if(isset($post['pin_code']) and  strlen($post['pin_code'])==6){
                                pinCode($post['pin_code']);
                            }
                    }
                }
            case 'student':
                if($part2){
                    switch($part2){
                        case 'startExam' :
                            if(isset($post['exam_id']) and !empty($post['exam_id'])){
                                startExam_student($post['exam_id']);
                            }
                            break;
                        case 'answerQuestion':
                            if(isset($post['id']) and isset($post['opt'])){
                                $opts = [1,2,3,4];
                                if(!empty($post['id']) and in_array($post['opt'],$opts)){
                                    answerQuestion($post['id'],$post['opt']);
                                }
                            }
                            break;
                        case 'examFinish' :
                            finshExam();
                            break;
                        case 'examEndTime' :
                            finshExam(0);
                            break;
                        default:
                            break;
                    }
                }
            default:
                break;
        }
        if(isset($post['loggedChecker1'])){
            logchecker($post['loggedChecker1']);
        }

        
        elseif(isset($post['logout'])){
            session_destroy();

        }
    }

    elseif($_SERVER["REQUEST_METHOD"]=="GET"){
        switch($part1){
            case 'createTest':
                if(!$part2){
                    createTestReload();
                }
                break;
            case 'tests':
                if(!$part2){
                    testsPageReload();

                }
                break;
            case 'test':
                if(!$part2){
                    testViewReload();

                }
                break;
            case 'startExam':
                if(!$part2){
                    startExam_reload();

                }
                break;
            case 'exams':
                if(!$part2){
                    examsProgressReload();

                }
                break;

            case 'exam':
                if(ctype_digit($part2)){
                    examView($part2);

                }
                else{
                    viewExamReload($part2);
                }
                break;
            
            case 'prof':
                if($part2){
                    if($part2 == 'examsResults'){
                        $selected = $_GET['selectedSub'] ?? null;
                        examsResultsReload($selected);
                    }
                }
                break;
            case 'student':
                if($part2){
                    switch($part2){
                        case 'subjects':
                            subjectReload();
                            break;
                        
                        case 'activeExams' :
                            activeExamsReload();
                            break;
                        case 'takeExam' :
                            takeExamReload();
                            break;
                        case 'examResults' :
                            examResultsReloadStudent();
                            break;
                            
                        default:
                            echo json_encode(['dsf']);
                            break;
                    }
                }
                if(isset($_GET['search'])){

                    studentSearch($_GET['search']);
                }
                break;
            case 'testName':
                if(!$part2){
                    testNameReload();

                }
                break;    

            default:
                break;


        }
    }


    elseif($_SERVER["REQUEST_METHOD"]=="PUT"){
        $put = json_decode(file_get_contents('php://input'),true);
        switch($part1){
            case 'table':
                if(isset($put['column'])
                and isset($put['value']) and !empty($part2)){
                    tableUpdate($part2,$put['column'],$put['value']);
                    
                }
                break;
            case 'test':
                if(!empty($part2)){
                    $_SESSION['ourUNI_test_id'] = $part2;

                }
                break;
            case 'exam':
                if(!empty($part2)){
                    end_exam($part2);

                }
                break;

            default:
                break;
        }
    }

    elseif($_SERVER["REQUEST_METHOD"]=="DELETE"){
        switch($part1){
            case 'table':
                deleteQuestionRow($part2);
                break;
            case 'test':
                deleteTest($part2);
                break;

            default:
                break;

        }
        
        // if($part1 == 'tableLine'){
            
            
        // }
        // elseif($part1 == 'deleteTest'){
        //     deleteTest($part2);
        // }
    }
}
else{
    http_response_code(403);
    echo json_encode(['huh gatcha !!'=>$origin]);
    exit();
}

?>