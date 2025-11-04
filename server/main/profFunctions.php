<?php
require_once __DIR__.'/../checkers/profFunction.php';
require_once __DIR__.'/same.php';
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


function testNameReload(){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    $status = 404;
    if(!empty($id)){
        $status = 204;
        $data = getProfSubjects($id);
        if(!empty($data)){
            $status = 200;
        }
        echo json_encode(['subjects'=>$data]);
    }
    
    http_response_code($status);
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
        $end_date = currentDate();
        $query = "UPDATE exam_start SET status=:s,end_time=:e_time WHERE id=:id";
        $execute = [':s'=>0,':e_time'=>$end_date, ':id'=>$exam_id];
        $class->query($query,$execute);
    }
}

function examsProgressReload(){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    if(!empty($id)){
        $exams = getExams($id);
        echo json_encode(['exams'=>$exams]);
    }
    else{
        echo json_encode(['status'=>403]);
    }
}



function startExam($name,$test_id,$duration,$minPoints,$maxPoints){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    if(!empty($id)){
        global $class;
        $start_date = currentDate();
        $query = "INSERT INTO exam_start (test_id, exam_duration, min_points, max_points, exam_name, start_time) 
        VALUES ( :test_id, :duration, :min_p, :max_p,:exam_name, :start_time)";
        $execute = [
            ':test_id'=>$test_id,
            ':duration'=>$duration, 
            ':min_p'=>$minPoints ,
            ':max_p'=>$maxPoints,
            ':exam_name' => $name,
            ':start_time'=> $start_date
        ];
        $class->query($query,$execute,'id');
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
        $f = getAllTests($id);
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
        global $class;
        $query = "INSERT INTO test_names (prof_subject_id, test_name)
        SELECT ps.id, :test_name
        FROM prof_subjects AS ps 
        WHERE ps.id = :prof_subj_id
            AND ps.prof_id = :prof_id
        ";
        $execute = [
            ':prof_subj_id'=>$subject, 
            ':test_name'=>$name,
            ':prof_id' => $id
        ];
        $l_id = $class->query($query,$execute,'id');
        $_SESSION['ourUNI_test_id'] = $l_id;
        echo json_encode(['status'=>200]);
    }
    else{
        echo json_encode(['status'=>403]);
    }
}

function testViewReload(){
    $tableID = $_SESSION['ourUNI_test_id'] ?? '';
    $u_id = $_SESSION['ourUNI_id_'] ?? '';
    $data=  [];
    if(!empty($tableID) and !empty($u_id)){
        $data = getTestName($u_id,$tableID);
        $data['questions'] = getQuestions($u_id,$tableID);
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
        $tests = getAllTests($id);
        // $names = getAllTestNames($id);
        // if($names){
        //     $data = getAllTests($names);
        // }

        echo json_encode(['status'=>200,'data'=>$tests]);
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
            $name = getTestName($id,$tableID);
            $selector = getQuestions($id,$tableID);
            echo json_encode(['status'=>200,'name'=>$name['test_name'], 'table'=>$selector]);
            
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
    [':col'=>$value, ':id'=>$id],'id');
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
        
        $class->query("DELETE ts FROM test_names AS ts
        INNER JOIN prof_subjects AS ps 
            ON ps.id = ts.prof_subject_id
        WHERE ts.id= :test_id
        AND ps.prof_id = :prof_id
        ",
        [':test_id'=>$id,':prof_id'=>$u_id],'id');
    }
    

}


function examView($id){
    $u_id = $_SESSION['ourUNI_id_'] ?? '';
    if(!empty($u_id)){
        $_SESSION['ourUNI_prof_examView_id']  = $id;
    }
}
?>