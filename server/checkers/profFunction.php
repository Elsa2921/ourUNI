<?php
require_once __DIR__. '/../base/base.php';


function getProfSubjects($id){
    global $class;
    $query = "SELECT  f.faculty, s.year_level, 
    CONCAT(
        '[',
        GROUP_CONCAT(
            JSON_OBJECT(
            'subject', s.subject,
            'prof_subj_id', ps.id 
            
            )
        ),
        ']'
    ) AS subjects
    FROM prof_subjects AS ps
    INNER JOIN subjects AS s
        ON s.id = ps.subject_id
    INNER JOIN faculties AS f
        ON f.id = s.faculty_id
    WHERE ps.prof_id = :prof_id
    GROUP BY f.faculty,s.year_level
    ";
    $execute = [':prof_id'=>$id];
    $stmt = $class->query($query,$execute);
    return $stmt;
}

function searchStudent($search){
    global $class;
    $query = "SELECT s.id, s.full_name, f.faculty
    FROM students AS s 
    INNER JOIN faculties AS f
        ON f.id = s.faculty_id
    WHERE full_name LIKE ? LIMIT 10";
    $execute = ["%$search%"];
    $stmt = $class->query($query,$execute);
    return $stmt;
}

function getExamName($examId,$id){
    global $class;
    $query = "SELECT f.faculty FROM exam_start AS es
    INNER JOIN test_names AS tn
        ON tn.id = es.test_id
    INNER JOIN prof_subjects AS ps
        ON ps.id = tn.prof_subject_id
    INNER JOIN subjects AS s
        ON s.id = ps.subject_id
    INNER JOIN faculties AS f
        ON f.id = s.faculty_id
    WHERE ps.prof_id=:prof_id 
        AND es.id=:id 
        AND es.status=:status";

    $execute = [':prof_id'=>$id ,':id'=>$examId, ':status'=>1];
    $stmt=  $class->query($query,$execute,'column');
    return $stmt;
}


function getViewStudents($examId,$type){
    $t = 0;
    if($type=='inProgress'){
        $t=1;
    }
    global $class;
    $query = "SELECT se.start,se.end , s.full_name
    FROM student_exam AS se
    INNER JOIN students AS s
        ON s.id = se.student_id
    WHERE exam_id=:exam_id 
    AND process=:p";
    $execute = [':exam_id'=>$examId, ':p'=>$t];
    $data = $class->query($query,$execute);
    return $data;
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
    tq.question, tq.opt_1, tq.opt_2, tq.opt_3, tq.opt_4, tq.answer, tq.points,tq.id
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


function getPointSum($u_id,$test_id){
    global $class;
    $query = "SELECT  SUM(tq.points) AS points
    FROM test_names AS tn
    INNER JOIN prof_subjects AS ps
        ON ps.id = tn.prof_subject_id
    INNER JOIN test_questions AS tq
        ON tq.test_id = tn.id
    WHERE tn.id = :test_name_id
        AND ps.prof_id = :prof_id";
    $execute = [
        ':test_name_id' => $test_id,
        ':prof_id' => $u_id
    ];
    $flag = $class->query($query,$execute,'column');
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


function getAllTestsR($id){
    global $class;
    
    $query = "SELECT 
    s.subject,s.year_level , f.faculty,
    CONCAT(
        '[',
        GROUP_CONCAT(
            JSON_OBJECT(
                'test_name', tn.test_name,
                'id', tn.id
            )
        ),
        ']'
    ) AS test_info
    FROM test_names AS tn
    INNER JOIN prof_subjects AS ps
        ON ps.id = tn.prof_subject_id
    INNER JOIN subjects AS s
        ON s.id = ps.subject_id
    INNER JOIN faculties AS f
        ON f.id = s.faculty_id
    WHERE ps.prof_id = :prof_id
    GROUP BY f.faculty, s.year_level,s.subject
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
    COALESCE(COUNT(se.id),0) AS participants ,
    es.start_time,
    tn.test_name,
    f.faculty,
    s.subject,
    s.year_level
    FROM exam_start AS es
    INNER JOIN test_names AS tn
        ON tn.id = es.test_id
    INNER JOIN prof_subjects AS ps
        ON ps.id = tn.prof_subject_id
    INNER JOIN subjects AS s 
        ON s.id = ps.subject_id
    INNER JOIN faculties AS f
        ON f.id = s.faculty_id
    LEFT JOIN student_exam AS se
        ON se.exam_id = es.id
    WHERE es.status=:status
    AND ps.prof_id=:prof_id
    GROUP BY 
    es.id, es.exam_duration, es.max_points, es.min_points, es.start_time,
    tn.test_name, f.faculty, s.subject, s.year_level    
    ORDER BY es.start_time DESC";
    $execute = [':prof_id'=>$id,':status'=>1];
    $flag = $class->query($query,$execute);
    return $flag;
}



function examResultsReloadProf($id, $sub_id){
    global $class;
    $query = "SELECT f.faculty,  es.exam_name, sub.subject,
    CONCAT(
    '[',
    GROUP_CONCAT(
        JSON_OBJECT(
            'student_name', s.full_name,
            'points' , er.points,
            'time', er.time,
            'is_qualified', er.is_qualified

        )
    ),
    ']'
    ) AS results
    FROM prof_subjects AS ps
    INNER JOIN subjects AS sub 
        ON sub.id = ps.subject_id
    INNER JOIN faculties AS f
        ON f.id = sub.faculty_id
    INNER JOIN test_names AS tn
        ON tn.prof_subject_id = ps.id
    INNER JOIN exam_start AS es
        ON es.test_id = tn.id
    INNER JOIN exam_results AS er
        ON er.exam_id = es.id
    INNER JOIN students AS s
        ON s.id = er.student_id
    WHERE ps.prof_id = :prof_id
    AND ps.id = :sub_id
    GROUP BY es.id
    ORDER BY er.time ASC
    ";
    $execute = [':prof_id' => $id, ':sub_id' => $sub_id];
    return $class->query($query,$execute);
}

?>