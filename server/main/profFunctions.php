<?php
require_once __DIR__.'/../checkers/profFunction.php';
require_once __DIR__.'/same.php';
require_once __DIR__.'/loggedChecker.php';


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
    $status = 403;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            $status = 204;
            $data = getProfSubjects($u_id);
            if(!empty($data)){
                $status = 200;
            }
            echo json_encode(['subjects'=>$data]);
            
        }
    }
    
    http_response_code($status);
}


function viewExamReload($type){
    $status = 403;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        $examId = $_SESSION['ourUNI_prof_examView_id'] ?? '';
        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id) and !empty($examId)){
            $status = 200;
            $examName = getExamName($examId,$u_id);
            $data['examName'] = $examName;
            $students = getViewStudents($examId,$type);
            $data['students'] = $students;
            echo json_encode($data);
        }
    }


    http_response_code($status);

}




function end_exam($exam_id){
    $res = ['status'=>403];
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            global $class;
            $end_date = currentDate();
            $query = "UPDATE exam_start SET status=:s,end_time=:e_time WHERE id=:id";
            $execute = [':s'=>0,':e_time'=>$end_date, ':id'=>$exam_id];
            $class->query($query,$execute);
            
        }
    }

    echo json_encode($res); 
}

function examsProgressReload(){
    $status = 403;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            
            $exams = getExams($u_id);
            $res = ['exams'=>$exams];
            $status = 200;
            echo json_encode($res); 
        }
    }
    http_response_code($status);


}



function startExam($name,$test_id,$duration,$minPoints,$maxPoints){
    $res = ['status'=>403];
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            
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
            $res = ['message'=>'ok'];
        }
    }

    echo json_encode($res); 

}




function startExam_reload(){

    $res = ['status'=>403];
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            $f = getAllTestsR($u_id);
            $res = ['tests'=>$f];
            
        }
    }

    echo json_encode($res); 

}

function createTestName($name,$subject){
    $res = ['status'=>403];
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
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
                ':prof_id' => $u_id
            ];
            $l_id = $class->query($query,$execute,'id');
            $_SESSION['ourUNI_test_id'] = $l_id;
            $res = ['status'=>200];
            
        }
    }

    echo json_encode($res); 

}

function testViewReload(){
    $res = ['status'=>403];
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){            
            $tableID = $_SESSION['ourUNI_test_id'] ?? '';
            if(!empty($tableID)){
                $name = getTestName($u_id,$tableID);
                $selector = getQuestions($u_id,$tableID);
                $res = ['status'=>200,'name'=>$name['test_name'], 'table'=>$selector];
                $data = getTestName($u_id,$tableID);
                $data['questions'] = getQuestions($u_id,$tableID);
                
                $res = ['status'=>200,'data'=>$data];
                
            }
        }
    }
    echo json_encode($res);
}


function testsPageReload(){
    $status = 403;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            $status = 200;
            $tests = getAllTests($u_id);
            $res = ['data'=>$tests];
            echo json_encode($res); 
            
        }
    }
    http_response_code($status);

}

function createTestReload(){
    $res = ['status'=>403];
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){            
            $tableID = $_SESSION['ourUNI_test_id'] ?? '';
            if(!empty($tableID)){
                $name = getTestName($u_id,$tableID);
                $selector = getQuestions($u_id,$tableID);
                $res = ['status'=>200,'name'=>$name['test_name'], 'table'=>$selector];
                
            }
        }
    }
    echo json_encode($res);

}





function addTableLine(){
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            $tableID = $_SESSION['ourUNI_test_id'] ?? '';
            if(!empty($tableID)){
                global $class;
                $class->query("INSERT INTO test_questions (test_id) 
                VALUES (:test_id)",
                [':test_id'=>$tableID]);
            }
        }
    }

}





function tableUpdate($id,$col,$value){
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            $tableID = $_SESSION['ourUNI_test_id'] ?? '';
            if(!empty($tableID)){
                global $class;
                $class->query("UPDATE test_questions 
                SET `$col`=:col 
                WHERE id=:id 
                    AND test_id = :t_id",
            [':col'=>$value, ':id'=>$id, ':t_id'=>$tableID],'id');
            }

        }
    }

}



function deleteQuestionRow($id){
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            $tableID = $_SESSION['ourUNI_test_id'] ?? '';
            if(!empty($tableID)){
                global $class;
                $class->query("DELETE FROM test_questions WHERE id=:id AND test_id = :t_id",
            [':id'=>$id, ':t_id' => $tableID]);
            }
        }
    }

}



function deleteTest($id){
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
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

}


function examView($id){
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            $_SESSION['ourUNI_prof_examView_id']  = $id;
        }
    }
}



function examsResultsReload($sub){
    $status = 403;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $u_id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==2 and !empty($u_id)){
            $data = [];
            if((int) $sub){
                $sub = (int) $sub;
                $data['examRes'] = examResultsReloadProf($u_id, $sub);
            }
            $data['subjects'] = getProfSubjects($u_id);
            $status = 200;
            echo json_encode($data);

        }
    }
    http_response_code($status);
}
?>