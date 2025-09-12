<?php
require_once __DIR__.'/../checkers/profFunction.php';

function studentSearch($search){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    if(!empty($id)){
        $status = 204;
        $data = searchStudent($search);
        if(!empty($data)){
            $status = 200;
        }
        http_response_code($status);
        echo json_encode(['searchRes'=>$data]);
    }
    else{
        http_response_code(403);
    }
}

function viewExamReload($type){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    $examId = $_SESSION['ourUNI_prof_examView_id'] ?? '';
    if(!empty($id) && !empty($examId)){
        $examName = getExamName($examId,$id);
        $data['examName'] = $examName;
        $students = getViewStudents($examId,$type);
        $data['students'] = $students;
        http_response_code(200);
        echo json_encode($data);
    }
    else{
        http_response_code(403);
    }
}




function end_exam($exam_id){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    if(!empty($id)){
        global $class;
        $class->query("UPDATE exam_start SET status=:s WHERE id=:id",
    [':s'=>0, ':id'=>$exam_id]);
    }
}

function examsProgressReload(){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    if(!empty($id)){
        $exams = getExams($id);
        $data = getExamTestNames($exams);
        echo json_encode(['exams'=>$data]);
    }
    else{
        echo json_encode(['status'=>403]);
    }
}



function startExam($test_id,$faculty,$duration,$minPoints,$maxPoints){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    if(!empty($id)){
        global $class;
        $class->query("INSERT INTO exam_start (prof_id, faculty, test_id, exam_duration, min_points,max_points) 
        VALUES (:prof_id, :faculty, :test_id, :duration, :min_p, :max_p)",
        [':prof_id'=>$id, ':faculty'=>$faculty, ':test_id'=>$test_id,':duration'=>$duration, ':min_p'=>$minPoints ,':max_p'=>$maxPoints]);
        echo json_encode(['message'=>'ok']);
    }
    else{
        echo json_encode(['status'=>403]);
    }
}




function startExam_reload(){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    $info = $_SESSION['ourUNI_info'] ?? '';
    if(!empty($id) and !empty($info)){
        $names =  getAllTestNames($id);
        $f = getAllTests($names);
        echo json_encode(['tests'=>$f]);
    }
    else{
        echo json_encode(['status'=>403]);
    }
}

function createTestName($name,$subject){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    $info = $_SESSION['ourUNI_info'] ?? '';
    if(!empty($id) and !empty($info)){
        // $checker = testNameCheck($name);
        // if($checker){
        //     echo json_encode(['error'=>'This name already exists']);
        // }
        // else{
            global $class;
            $pdo = $class->connect();
            $stmt = $pdo->prepare("INSERT INTO test_names
            (prof_id,subject,test_name) VALUES (:prof_id, :subject, :test_name)");
            $stmt->execute([':prof_id'=>$id, ':subject'=>$subject, ':test_name'=>$name]);
            $_SESSION['ourUNI_test_id'] = $pdo->lastInsertId();
            echo json_encode(['status'=>200]);
        // }
    }
    else{
        echo json_encode(['status'=>403]);
    }
}

function testViewReload(){
    $tableID = $_SESSION['ourUNI_test_id'] ?? '';
    $data=  [];
    if(!empty($tableID)){
        $data = getTestName($tableID);
        $data['questions'] = getQuestions($tableID);
        echo json_encode(['status'=>200,'data'=>$data]);
    }else{
        echo json_encode(['status'=>403]); 
    }
}


function testsPageReload(){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    $info = $_SESSION['ourUNI_info'] ?? '';
    if(!empty($id) and !empty($info)){
        $data = [];
        $names = getAllTestNames($id);
        if($names){
            $data = getAllTests($names);
        }

        echo json_encode(['status'=>200,'data'=>$data]);
    }
    else{
        echo json_encode(['status'=>403]); 
    }
}

function createTestReload(){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    $info = $_SESSION['ourUNI_info'] ?? '';
    if(!empty($id) and !empty($info)){
        $tableID = $_SESSION['ourUNI_test_id'] ?? '';
        if(!empty($tableID)){
            $name = getTestName($tableID);
            if($name){
                $selector = getQuestions($tableID);
                echo json_encode(['status'=>200,'name'=>$name['test_name'], 'table'=>$selector]);
            }
            else{

                echo json_encode(['status'=>403]);
            }
            
        }
        else{
            echo json_encode(['status'=>403]); 
        }
    }
}





function addTableLine(){
    $tableID = $_SESSION['ourUNI_test_id'] ?? '';
    if(!empty($tableID)){
        global $class;
        // $class->query("INSERT INTO test_questions (test_id,question,1,2,3,4,answer,points) 
        // VALUES (:test_id,:question, :1,:2,:3,:4,:answer, :points)",
        $class->query("INSERT INTO test_questions (test_id) 
        VALUES (:test_id)",
        [':test_id'=>$tableID]);
    }
}





function tableUpdate($id,$col,$value){
    $tableID = $_SESSION['ourUNI_test_id'] ?? '';
    if(!empty($tableID)){
        global $class;
        $class->query("UPDATE test_questions SET `$col`=:col WHERE id=:id",
    [':col'=>$value, ':id'=>$id]);
    }
}



function deleteQuestionRow($id){
    $tableID = $_SESSION['ourUNI_test_id'] ?? '';
    if(!empty($tableID)){
        global $class;
        $class->query("DELETE FROM test_questions WHERE id=:id",
    [':id'=>$id]);
    }
}



function deleteTest($id){
    $u_id = $_SESSION['ourUNI_id_'] ?? '';
    if(!empty($u_id)){
        global $class;
        $class->query("DELETE FROM test_names WHERE id=?",
        [$id]);
        $class->query("DELETE FROM test_questions WHERE test_id=?",
    [$id]);
    }
    

}


function examView($id){
    $u_id = $_SESSION['ourUNI_id_'] ?? '';
    if(!empty($u_id)){
        $_SESSION['ourUNI_prof_examView_id']  = $id;
    }
}
?>