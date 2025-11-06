<?php
require_once __DIR__.'/loggedChecker.php';
require_once __DIR__.'/../checkers/studentFs.php';
function subjectReload(){
    $res = false;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==1 and !empty($id)){
            $res = [];
            $res = getSubjects($id);
        }
    
    }

    echo json_encode(['subjects' => $res]);
}



function activeExamsReload(){
    $res = false;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==1 and !empty($id)){
            $res = [];
            $res = getActiveExams($id);
        }
    
    }

    echo json_encode(['activeExams' => $res]);
}



function startExam_student($exam_id){
    $res = false;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==1 and !empty($id)){
            $exam_checker = examChecker($exam_id,$id);
            if(!is_null($exam_checker)){
                global $class;
                $now = (new Datetime())->format('Y-m-d H:i:s');
                $query = "INSERT INTO student_exam (exam_id,student_id, start) VALUES
                (:exam_id, :student_id, :start)";
                $execute = [':exam_id' => $exam_id, ':student_id' =>$id, ':start'=>$now];
                $insert = $class->query($query,$execute,'id');
                $end = (new Datetime())->modify("+ $exam_checker minutes")->format('Y-m-d H:i:s');
                if($insert){
                    $_SESSION['student_exam_id'] = $insert;
                    $_SESSION['exam_id'] = $exam_id;
                    $_SESSION['exam_end'] = $end;
                    
                    $res = true;
                }
                // $res = [];
                // $res = getActiveExams($id);
            }
            }
    
    }

    echo json_encode(['start' => $res]);
}




function takeExamReload(){
    $res = false;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==1 and !empty($id)){
            $student_exam_id = $_SESSION['student_exam_id'] ?? null;
            $exam_id = $_SESSION['exam_id'] ?? null;
            if($student_exam_id and $exam_id){
                $res = [];
                $res = getMyExam($id,$student_exam_id,$exam_id);
            }
        }
    
    }

    echo json_encode(['exam' => $res]);
}



function answerQuestion($question_id, $option){
    $res = false;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==1 and !empty($id)){
            $student_exam_id = $_SESSION['student_exam_id'] ?? null;
            $exam_id = $_SESSION['exam_id'] ?? null;
            $now = (new Datetime())->format('Y-m-d H:i:s');
            $end = $_SESSION['exam_end'] ?? $now;
            if($student_exam_id and $exam_id and $end>$now){
                global $class;
                $query = "INSERT INTO student_answers (student_exam_id,question_id,answer) 
                VALUES (:s_exam_id, :question_id, :answer)
                ON DUPLICATE KEY UPDATE answer = VALUES(answer)";
                $execute = [
                    ':s_exam_id' => $student_exam_id,
                    ':question_id'=>$question_id,
                    ':answer' => $option
                ];
                $class->query($query,$execute);

            }
        }
    
    }

}
 
?>