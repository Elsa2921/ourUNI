import { fetchAPI } from "./script.js"
import { arr } from "./links.js"
window.onload = () => {
    subject_reload()
    activeExams_reload()
    take_exam_reload()
}





// ---------------------  subject functions  -----------------------
// ----------------                                ---------------
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------

async function subject_reload(){
    let clas = document.querySelector('.student_subjects') ?? null
    if(clas){
        // alert('dsf')
        const params = 'student/subjects'
        const res = await fetchAPI('GET',{},params);
        if(res.status == 200){
            const data = await res.json()
            if(data.subjects){
                drawSubjects(data.subjects)
            }
            else{
                window.location.href = arr.index
            }
        }
    }
}


function drawSubjects(data){
    let str = ''
    if(data.length !==0){
        data.forEach(element => {
            str+= `
                <div class="subject_cards d-flex justify-content-start align-items-center flex-column p-4 gap-3">
                    <h4 class='font-600 text-dark'>${element['subject']}</h4>
                    <p class='text-color2'> ${element['prof_name']}</p>
                </div>
            `
        });
    }
    else{
        str = `<h4>404 not found</h4>`

    }

    document.querySelector('.student_subjects').innerHTML = str
}










// ---------------------  active exam functions  -----------------
// ----------------                                ---------------
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------




async function activeExams_reload(){
    let clas = document.querySelector('.activeExams_cont') ?? null
    if(clas){
        const params = 'student/activeExams'
        const res = await fetchAPI('GET',{},params);
        if(res.status == 200){
            const data = await res.json()
            if(data.activeExams){
                drawActiveExams(data.activeExams)
            }
            else{
                window.location.href = arr.index
            }
        }
    }
}




function drawActiveExams(data){
    let str = ''
    if(data.length !==0){
        data.forEach(element => {
            str+= `
                <div class="activeExam_card d-flex justify-content-start align-items-center gap-3 flex-column flex-sm-row">
                    <div class="p-4 activeExam_info bg-color2  d-flex justify-content-center align-items-start flex-column gap-4">
                        <h6 class="text-white">Subject</h6>
                        <h4 class="font-600 letter-m text-white">${element.subject}</h4>
                    </div>
                    <div class="p-4 activeExam_more d-flex justify-content-start align-items-start flex-column gap-3">
                        <span class="text-gray">${element.start_time}</span>
                        <h4 class="text-dark font-400 letter-s">${element.prof_name}</h4>
                        <h5 class="text-color1">${element.exam_name}</h5>
                        <div class="w-100 d-flex justify-content-end">
                            <button class="black-btn take_exam_btn" data-id="${element.id}">Take Exam</button>
                        </div>
                    </div>
                
                </div>
            `
        });
    }
    else{
        str = `<h4>404 not found</h4>`

    }

    document.querySelector('.activeExams_cont').innerHTML = str
    takeExam()
}





const takeExam = ()=>{
    const btns = document.querySelectorAll('.take_exam_btn')
    btns.forEach((element)=>{
        element.addEventListener('click',async function(){
            const id = element.getAttribute('data-id')
            const params = 'student/startExam'
            const data = {'exam_id':id}
            const res = await fetchAPI('POST',data,params);
            if(res.status == 200){
                const resp = await res.json()  || '';
                if(resp.start){
                    window.location.href = arr.takeExam
                }
            }
        })
    })
}







// ---------------------  take exam functions  -------------------
// ----------------                                ---------------
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------


const  take_exam_reload =async () =>{
    const clas = document.querySelector('.take_exam') ?? null
    if (clas){
        const params = 'student/takeExam'
        const res = await fetchAPI('GET',{},params);
        if(res.status == 200){
            const data = await res.json()
            if(data.exam && data.exam.length!==0){
                drawExamQuestions(data.exam[0])
            }
            else{
                window.location.href = arr.studentProfile
            }
        }
    }

}






                
const drawExamQuestions = (data) => {
    let str = ''
    if(data.length !== 0){
        let count = 0
        str+= `<h3 class='w-100 font-600 text-color2'>${data.exam_name}</h3>`
        const qst  = JSON.parse(data.questions)
        if(qst.length!==0){
            qst.forEach(element=>{
                count++
                str+=`
                <div class="question_box d-flex justify-content-start align-items-start gap-4 flex-column">
                    <h4 class='font-600 text-color3'> ${count}. ${element.question} (${element.points})</h4>
                    <div>
                        <input type="radio" data-id='${element.question_id}' data-opt = 'opt_1' class='question_radios'
                         name="q${element.question_id}" id="opt1${element.question_id}">
                        <label class='cursor-pointer' for="opt1${element.question_id}">${element.opt_1}</label>
                    </div>
                    <div>
                        <input type="radio" data-id='${element.question_id}' data-opt = 'opt_2' class='question_radios'
                         name="q${element.question_id}" id="opt2${element.question_id}">
                        <label class='cursor-pointer' for="opt2${element.question_id}">${element.opt_2}</label>
                    </div>
                    <div>
                        <input type="radio" data-id='${element.question_id}' data-opt = 'opt_3' class='question_radios'
                         name="q${element.question_id}" id="opt3${element.question_id}">
                        <label class='cursor-pointer' for="opt3${element.question_id}">${element.opt_3}</label>
                    </div>
                    <div>
                        <input type="radio" data-id='${element.question_id}' data-opt = 'opt_4' class='question_radios'
                         name="q${element.question_id}" id="opt4${element.question_id}">
                        <label class='cursor-pointer' for="opt4${element.question_id}">${element.opt_4}</label>
                    </div>
                </div>
                `
            })
        }
    }
    else{
        str+='404 not found'
    }

    document.querySelector('.take_exam').innerHTML = str
    answerQuestion()
   
}




const answerQuestion = () =>{
    const radios = document.querySelectorAll('.question_radios')
    radios.forEach(element=>{
        element.addEventListener('click',async function(){
            const id = element.getAttribute('data-id')
            const opt = element.getAttribute('data-opt')
            const params = 'student/answerQuestion'
            const data = {
                'id':id,
                'opt':opt
            }
            const res = await fetchAPI('POST',data,params);
            console.error(element.getAttribute('data-id'))
        })
    })
}






// ---------------------  exam results functions  ----------------
// ----------------                                ---------------
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------