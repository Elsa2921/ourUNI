<?php
require_once __DIR__.'/../base/base.php';

function getSubjects($id){
    global $class;
    $query = "SELECT sb.subject, p.full_name AS prof_name
    FROM students AS s 
    INNER JOIN subjects AS sb
        ON sb.faculty_id = s.faculty_id
    INNER JOIN prof_subjects AS ps
        ON ps.subject_id = sb.id
    INNER JOIN professors AS p
        ON p.id = ps.prof_id
    WHERE s.id = :id";
    $execute = [':id'=>$id];
    $flag = $class->query($query,$execute);
    return $flag;
    // return [];
}



function getActiveExams($id){
    global $class;
    $query = "SELECT 
    es.id,
    es.exam_name,
    es.start_time,
    sb.subject,
    p.full_name as prof_name
    
    FROM students AS s 
    INNER JOIN subjects AS sb
        ON sb.faculty_id = s.faculty_id
        AND sb.year_level = s.year_level
    INNER JOIN prof_subjects AS ps
        ON ps.subject_id = sb.id
    INNER JOIN test_names AS tn
        ON tn.prof_subject_id = ps.id
    INNER JOIN professors AS p
        ON p.id = ps.prof_id
    INNER JOIN exam_start AS es
        ON es.test_id = tn.id
        AND es.status = :status
    LEFT JOIN student_exam AS se
        ON se.exam_id = es.id
        AND se.student_id = s.id
    WHERE s.id = :id
    AND se.student_id IS NULL
    ";
    $execute = [':status'=>1, ':id'=>$id];
    $flag = $class->query($query,$execute);
    return $flag;
}


function examChecker($exam_id,$s_id){
    global $class;
    $query = "SELECT 
    es.exam_duration
    FROM students AS s 
    INNER JOIN subjects AS sb
        ON sb.faculty_id = s.faculty_id
    INNER JOIN prof_subjects AS ps
        ON ps.subject_id = sb.id
    INNER JOIN test_names AS tn
        ON tn.prof_subject_id = ps.id
    INNER JOIN professors AS p
        ON p.id = ps.prof_id
    INNER JOIN exam_start AS es
        ON es.test_id = tn.id
        AND es.status = :status
    LEFT JOIN student_exam AS se
        ON se.exam_id = es.id
        AND se.student_id = s.id
    WHERE s.id = :id
    AND se.student_id IS NULL
    AND es.id = :exam_id
    ";
    $execute = [':status'=>1, ':id'=>$s_id, ':exam_id' =>$exam_id];
    $res = $class->query($query,$execute,'column');
    return $res ?? null;

}






function getMyExam($s_id,$student_exam_id,$exam_id){
    global $class;
    $query = "SELECT se.start, es.exam_name,DATE_ADD(se.start, INTERVAL es.exam_duration MINUTE) as end_time,
    CONCAT(
        '[',
            GROUP_CONCAT(
                JSON_OBJECT(
                'question_id' , tq.id,
                'question' , tq.question,
                'opt_1' , tq.opt_1,
                'opt_2' , tq.opt_2,
                'opt_3' , tq.opt_3,
                'opt_4' , tq.opt_4,
                'points', tq.points,
                'answer', sa.answer
                ) 
            ),
        ']'
    )
    AS questions
    
    FROM student_exam AS se
    INNER JOIN exam_start AS es
        ON es.id = se.exam_id
        AND DATE_ADD(se.start, INTERVAL es.exam_duration MINUTE) > :time
    INNER JOIN test_names AS tn
        ON tn.id = es.test_id
    INNER JOIN test_questions AS tq
        ON tq.test_id = tn.id
    LEFT JOIN student_answers AS sa
        ON sa.student_exam_id = se.id
        AND sa.question_id = tq.id
    WHERE se.id=:id
        AND se.student_id = :s_id 
        AND se.exam_id = :e_id
        AND se.process = :status
    GROUP BY se.start, es.exam_name
    ";
    $time = (new DateTime())->format('Y-m-d H:i:s');
    $execute = [':id'=>$student_exam_id, ':s_id'=>$s_id, ':e_id' => $exam_id, ':status' => 1,':time'=>$time];
    $res = $class->query($query,$execute);
    return $res;

}



function getStudentExamResults($id){
    global $class;
    $query = "SELECT  er.points, er.time, er.is_qualified,
    es.exam_name, p.full_name as prof_name, s.subject
    FROM exam_results AS er
    INNER JOIN exam_start AS es 
        ON es.id = er.exam_id
        AND es.status = :status
    INNER JOIN test_names AS ts
        ON ts.id = es.test_id
    INNER JOIN prof_subjects AS ps
        ON ps.id = ts.prof_subject_id
    INNER JOIN subjects AS s
        ON s.id =  ps.subject_id
    INNER JOIN professors AS p
        ON p.id = ps.prof_id
    WHERE er.student_id = :s_id
    ORDER BY er.time ASC
    ";
    $execute = [
        ':status' => 0,
        ':s_id' => $id
    ];
    return $class->query($query,$execute);
    
}
?>