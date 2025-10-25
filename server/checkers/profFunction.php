<?php
require_once __DIR__. '/../base/base.php';


function getProfSubjects($id){
    global $class;
    $query = "SELECT ps.id as prof_subj_id, s.subject,f.faculty, s.year_level 
    
    FROM prof_subjects AS ps
    INNER JOIN subjects AS s
        ON s.id = ps.subject_id
    INNER JOIN faculties AS f
        ON f.id = s.faculty_id
    WHERE ps.prof_id = :prof_id
    ";
    $execute = [':prof_id'=>$id];
    $stmt = $class->query($query,$execute);
    return $stmt;
}

function searchStudent($search){
    global $class;
    $query = "SELECT id,full_name,faculty_id FROM students WHERE full_name LIKE ? LIMIT 10";
    $execute = ["%$search%"];
    $stmt = $class->query($query,$execute);
    return $stmt;
}

function getExamName($examId,$id){
    global $class;
    $query = "SELECT faculty FROM exam_start WHERE 
    prof_id=:prof_id AND id=:id AND status=:status";

    $execute = [':prof_id'=>$id ,':id'=>$examId, ':status'=>1];
    $stmt=  $class->query($query,$execute,'column');
    return $stmt;
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
    $query = "SELECT full_name FROM students WHERE id=:id";
    foreach($data as &$value){
        $value['full_name']  ='';
        $stmt = $class->query($query,[':id'=>$value['student_id']],'column');
        if(!empty($stmt)){
            $f_name = $stmt;
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


function getFaculties($id){
    global $class;
    $query = "SELECT faculty_id,subject,year_level FROM prof_subjects WHERE prof_id=:id";
    $execute = ['id'=>$id];
    $stmt = $class->query($query,$execute);
    return $stmt;

}



function getTestName($u_id,$tableID){
    global $class;
    $query = "SELECT tn.test_name, s.subject 
    FROM test_names AS tn
    INNER JOIN prof_subjects AS ps
        ON ps.id = tn.prof_subject_id
    INNER JOIN subjects AS s
        ON s.id = ps.subject_id
    WHERE tn.id = :tn_id
        AND ps.prof_id = :prof_id
    ";
    $execute = [':tn_id'=>$tableID, ':prof_id'=>$u_id];
    $stmt = $class->query($query,$execute,'one');
    $flag = false;
    if(!empty($stmt)){
        $flag = $stmt;
    }
    return $flag;
}

function getQuestions($u_id,$table_id){
    global $class;
    $query = "SELECT  tn.test_name, s.subject,
    tq.question, tq.1, tq.2, tq.3, tq.4, tq.answer, tq.points,tq.id
    FROM test_names AS tn
    INNER JOIN prof_subjects AS ps
        ON ps.id = tn.prof_subject_id
    INNER JOIN subjects AS s 
        ON s.id = ps.subject_id
    INNER JOIN test_questions AS tq
        ON tq.test_id = tn.id
    WHERE tn.id = :test_name_id
        AND ps.prof_id = :prof_id";
    $execute = [
        ':test_name_id' => $table_id,
        ':prof_id' => $u_id
    ];
    $flag = $class->query($query,$execute);
    return $flag;
}



function  getAllTestNames($profId){
    global $class;
    $query= "SELECT id,test_name,date,prof_subject_id FROM test_names 
     ORDER BY id DESC";
    
    $flag = $class->query($query);
    return $flag;
}



function getAllTests($id){
    global $class;
    
    $query = "SELECT tn.id, tn.test_name, tn.date,
    s.subject,s.year_level , f.faculty,
    COUNT(tq.id) AS question_count, 
    COALESCE(SUM(tq.points), 0) AS total_points
    FROM test_names AS tn
    INNER JOIN prof_subjects AS ps
        ON ps.id = tn.prof_subject_id
    INNER JOIN subjects AS s
        ON s.id = ps.subject_id
    INNER JOIN faculties AS f
        ON f.id = s.faculty_id
    LEFT JOIN test_questions AS tq
        ON tn.id = tq.test_id    
    WHERE ps.prof_id = :prof_id
    GROUP BY tn.id, tn.test_name, tn.date ,s.subject
    ORDER BY tn.date DESC";

    
    $execute = [':prof_id'=>$id];

    // return $class->query($query,$execute);
    return $class->query($query,$execute);
}


function getExams($id){
    global $class;
    $query = "SELECT 
    es.id,
    es.exam_duration, 
    es.max_points,
    es.min_points , 
    es.participants ,
    es.start_time,
    tn.test_name,
    f.faculty,
    s.subject,
    s.year_level
    FROM exam_start AS es
    INNER JOIN test_names AS tn
        ON tn.id = es.test_id
    INNER JOIN prof_subjects AS ps
        ON ps.prof_id = tn.prof_subject_id
    INNER JOIN subjects AS s 
        ON s.id = ps.subject_id
    INNER JOIN faculties AS f
        ON f.id = s.faculty_id
    WHERE ps.prof_id=:prof_id 
        AND es.status=:status";
    $execute = [':prof_id'=>$id ,':status'=>1];
    $flag = $class->query($query,$execute);
    return $flag;
}

?>