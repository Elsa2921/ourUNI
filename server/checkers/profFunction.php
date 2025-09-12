<?php
require_once __DIR__. '/../base/base.php';


function searchStudent($search){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT id,full_name,student_faculty FROM users WHERE full_name LIKE ? LIMIT 10");
    $stmt->execute(["%$search%"]);
    return $stmt->fetchAll();
}

function getExamName($examId,$id){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT faculty FROM exam_start WHERE 
    prof_id=:prof_id AND id=:id AND status=:status");
    $stmt->execute([':prof_id'=>$id ,':id'=>$examId, ':status'=>1]);
    return $stmt->fetchColumn();
}


function getViewStudents($examId,$type){
    $t = '0';
    if($type=='inProgress'){
        $t='1';
    }
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT student_id,start,end 
    FROM student_exam WHERE exam_id=:exam_id AND process=:p");
    $stmt->execute([':exam_id'=>$examId, ':p'=>$t]);
    $data = $stmt->fetchAll();
    // return $data;
    return getStudentNames($data);
}



# ???
function getStudentNames($data){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT full_name FROM users WHERE id=:id");
    foreach($data as &$value){
        $value['full_name']  ='';
        $stmt->execute([':id'=>$value['student_id']]);
        if($stmt->rowCount()>0){
            $f_name = $stmt->fetchColumn();
            $value['full_name']  = $f_name;
        }
    }

    return $data;
}

// function testNameCheck($name){
//     global $class;
//     $pdo = $class->connect();
//     $stmt = $pdo->prepare("SELECT test_name FROM test_names WHERE test_name = ?");
//     $stmt->execute([$name]);
//     $flag = false;
//     if($stmt->rowCount()>0){
//         $flag = true;
//     }
//     return $flag;
// }


function getTestName($tableID){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT subject,test_name FROM test_names WHERE id = ?");
    $stmt->execute([$tableID]);
    $flag = false;
    if($stmt->rowCount()>0){
        $flag = $stmt->fetch(PDO::FETCH_ASSOC);
    }
    return $flag;
}

function getQuestions($table_id){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT * FROM test_questions WHERE test_id = ?");
    $stmt->execute([$table_id]);
    $flag = [];
    if($stmt->rowCount()>0){
        $flag = $stmt->fetchAll();
    }
    return $flag;
}



function  getAllTestNames($profId){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT id,test_name,date,subject FROM test_names WHERE prof_id = ?  ORDER BY id DESC");
    $stmt->execute([$profId]);
    $flag = false;
    if($stmt->rowCount()>0){
        $flag = $stmt->fetchAll();
    }
    return $flag;
}



function getAllTests($names){
    global $class;
    $pdo = $class->connect();
    $stmt1 = $pdo->prepare("SELECT SUM(points) 
    FROM test_questions WHERE test_id=:test_id");
    
    $stmt = $pdo->prepare("SELECT COUNT(*) as question_count FROM test_questions WHERE test_id = ?");
    foreach($names as &$value){
        $value['total_points'] = 0;
        $stmt->execute([$value['id']]);
        $stmt1->execute([':test_id'=>$value['id']]);
        $value['question_count'] = $stmt->fetchColumn();
        $value['total_points'] = $stmt1->fetchColumn();
        is_null($value['total_points']) ? $value['total_points']=0 : '';
    }

    // foreach($data as $value){
    //     $names['question_count'] = ;
    // }
    return $names;
}


function getExams($id){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT id,exam_duration, faculty, max_points, min_points , participants ,start_time, test_id FROM exam_start 
    WHERE prof_id=:prof_id AND status=:status");
    $stmt->execute([':prof_id'=>$id ,':status'=>1]);
    $flag = [];
    if($stmt->rowCount()>0){
        $flag = $stmt->fetchAll();
    }
    return $flag;
}


function getExamTestNames($exams){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT test_name FROM test_names WHERE id=:id");
    
    foreach($exams as &$exam){
        $stmt->execute([':id'=>$exam['test_id']]);
        if($stmt->rowCount()>0){
            $f = $stmt->fetchColumn();
            $exam['test_name'] = $f;
        }
    }

    return $exams;

}
?>