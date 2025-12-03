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
 



function finshExam($status = 1){
    $logChecker = logchecker(true,false);
    if($logChecker){
        $id = $_SESSION['ourUNI_id_'] ?? '';

        if(isset($logChecker['role']) and $logChecker['role']==1 and !empty($id)){
            $student_exam_id = $_SESSION['student_exam_id'] ?? null;
            $exam_id = $_SESSION['exam_id'] ?? null;
            if($student_exam_id and $exam_id){
                try{
                    global $class;
                    $now = (new Datetime())->format('Y-m-d H:i:s');

                    $class->beginTransaction();
                    if ($status){
                        $query = "UPDATE student_exam 
                        SET process = :process,
                        end = :end
                        WHERE exam_id = :exam_id
                            AND id = :id 
                            AND student_id = :student_id";
                        $execute = [':process'=>0, ':id'=>$student_exam_id, ':exam_id'=>$exam_id, ':student_id'=>$id, ':end'=>$now];
    
    
                        $class->query($query,$execute);
                    }

                    $query = "INSERT INTO exam_results (exam_id, student_id, points, time, is_qualified)
                        SELECT 
                        es.id AS exam_id,
                        se.student_id,
                        COALESCE(SUM(CASE WHEN sa.answer = tq.answer THEN tq.points ELSE 0 END),0) AS points,
                        :end AS time,
                        CASE WHEN (COALESCE(SUM(tq.points),0) >= es.min_points) AND se.process = 0
                        THEN 1 ELSE 0
                        END AS is_qualified
                        FROM student_exam  AS se
                        LEFT JOIN student_answers AS sa
                            ON se.id = sa.student_exam_id
                        LEFT JOIN test_questions AS tq
                            ON tq.id = sa.question_id
                            AND tq.answer = sa.answer
                        LEFT JOIN exam_start AS es
                            ON es.id = :exam_id
                        WHERE sa.student_exam_id = :s_exam_id
                        AND se.student_id = :s_id
                        GROUP BY se.student_id, es.id";


                    $execute = [
                        ':s_exam_id'=>$student_exam_id, 
                        ':exam_id'=>$exam_id, 
                        ':end'=>$now,
                        ':s_id' =>$id
                    ];


                    $class->query($query,$execute);
                    $class->commit();
                    unset($_SESSION['student_exam_id']);
                    unset($_SESSION['exam_id']);
                }
                catch (Exception $e){
                    $class->rollBack();
                    echo json_encode(['error' => 'Something went wrong, try later', $e->getMessage()]);
    
                }
            }
            
        }
    
    }

}




function examResultsReloadStudent(){
    $status = 403;
    $logChecker = logchecker(true,false);
    if($logChecker){
        $id = $_SESSION['ourUNI_id_'] ?? '';
        if(isset($logChecker['role']) and $logChecker['role']==1 and !empty($id)){
            $res = [];
            $res = getStudentExamResults($id);
            $res2 = getSubjects($id);
            $status = 200;
            echo json_encode(['results' => $res, 'subjects'=>$res2]);
        }
    }
    http_response_code($status);
}
?>