import { fetchAPI, changeFormat } from "./script.js"
import { arr } from "./links.js"
window.onload = () => {
    subject_reload()
    activeExams_reload()
    take_exam_reload()
    examResults()
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
                
                
                setInterval(() => {
                    const format = new Date().toISOString().slice(0, 19).replace('T', ' ')
                    const now = new Date(format)
                    const end =new Date(data.exam[0].end_time)
                    const diffMs = end - now;
                    const minutes = Math.trunc(diffMs / 1000 / 60)
                    const m2 = diffMs / 1000 / 60
                    const s = Math.round((m2-minutes) * 60)
                    document.querySelector('#remaining_time').innerHTML = `${minutes} : ${s}`
                    if(s<=0 && minutes<=0){
                        examEndTime()
                        window.location.reload()
                    }
                }, 1000);
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
        str+= `
        <div class='w-100 d-flex justify-content-between gap-4 flex-wrap px-5 py-3 takeExam_top left-0 top-0'>
            <h3 class='font-600 text-color2 mr-5'>${data.exam_name}</h3>
            <h4 id='remaining_time'>0:0</h4>
            <button class='pink-btn' id='exam_finish'>Finish</button>
        </div>
        <div class="container py-5 py-sm-4"></div>

        `
        const qst  = JSON.parse(data.questions)
        if(qst.length!==0){
            str+= `<div class="container py-5  d-flex justify-content-start align-items-start flex-wrap gap-4 ">`
            qst.forEach(element=>{
                console.error(element)
                count++
                str+=`
                <div class="question_box d-flex justify-content-start align-items-start gap-4 flex-column">
                    <h4 class='font-600 text-color3'> ${count}. ${element.question} (${element.points})</h4>
                
                    <div>
                        <input type="radio" data-id='${element.question_id}' data-opt = '1' class='question_radios'
                         name="q${element.question_id}" ${element.answer=='1' ? 'checked' : ''} id="opt1${element.question_id}">
                        <label class='cursor-pointer' for="opt1${element.question_id}">${element.opt_1}</label>
                    </div>
                    <div>
                        <input type="radio" data-id='${element.question_id}' data-opt = '2' class='question_radios'
                         name="q${element.question_id}" ${element.answer=='2' ? 'checked' : ''} id="opt2${element.question_id}">
                        <label class='cursor-pointer' for="opt2${element.question_id}">${element.opt_2}</label>
                    </div>
                    <div>
                        <input type="radio" ${element.answer=='3' ? 'checked' : ''} data-id='${element.question_id}' data-opt = '3' 
                        class='question_radios' name="q${element.question_id}" id="opt3${element.question_id}">
                        <label class='cursor-pointer' for="opt3${element.question_id}">${element.opt_3}</label>
                    </div>
                    <div>
                        <input type="radio" ${element.answer=='4' ? 'checked' : ''} data-id='${element.question_id}' data-opt = '4' 
                        class='question_radios' name="q${element.question_id}" id="opt4${element.question_id}">
                        <label class='cursor-pointer' for="opt4${element.question_id}">${element.opt_4}</label>
                    </div>
                </div>
                `
            })
            str+= `</div>`

        }
    }
    else{
        str+='404 not found'
    }

    document.querySelector('.take_exam').innerHTML = str
    answerQuestion()
    examFinish();
   
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
                'opt':parseInt(opt)
            }
            await fetchAPI('POST',data,params);
            console.error(element.getAttribute('data-id'))
        })
    })
}

const examEndTime = async () =>{
    const params = 'student/examEndTime'
    await fetchAPI('POST',{},params)
    window.location.reload()

    
}




const examFinish = () =>{
    const btn=  document.getElementById('exam_finish')
    btn.addEventListener('click', async function(){
        const params = 'student/examFinish'
        await fetchAPI('POST',{},params)
        window.location.reload()

    })
}


// ---------------------  exam results functions  ----------------
// ----------------                                ---------------
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------


const examResults = async () => {
    const page = document.querySelector('.exam_results') ?? null
    if(page){
        const params = 'student/examResults'
        const res = await fetchAPI('GET',{},params);
        if(res.status==200){
            const data = await res.json()
            if(data.results){
                showCanvas()
                drawResults(data.results)
                setInfo(data.results)
            }
            if(data.subjects){
                drawSubjectsSelect(data.subjects)
            }
        }
        else{
            window.location.href = arr.index
        }
    }
}




const drawSubjectsSelect = (data) =>{
    let str = ''
    str += `
        <option value="all" selected disabled>Select a subject</option>
        <option value="all">All</option>
    `

    data.forEach(element=>{
        str+=`
            <option value="${element['subject']}">${element['subject']}</option>
        `
    })
    
    document.getElementById('select_subject').innerHTML = str
    filterInfo()

}


const filterInfo = () =>{
    const select = document.querySelector('#select_subject')
    if(sessionStorage.getItem('filterSubject')){
        select.value = sessionStorage.getItem('filterSubject')
    }
    select.addEventListener('change', function(){
        sessionStorage.setItem('filterSubject',select.value)
        window.location.reload()
    })
}

const showCanvas = () =>{
    let inp = document.querySelector('#res_type')
    inp.addEventListener('input',function(){
        const canva = document.getElementById('myCanva')
        const cont = document.querySelector('.exam_results')
        if(inp.checked){
            canva.classList.add('d-block')
            canva.classList.remove('d-none')
            
            cont.classList.remove('d-block')
            cont.classList.add('d-none')
        }
        else{
            cont.classList.add('d-block')
            cont.classList.remove('d-none')
            
            canva.classList.remove('d-block')
            canva.classList.add('d-none')
        }
    })
}

const setInfo = (data) =>{
    const newArr = {}
    const datesSet = new Set()
    data.forEach(element => {
        datesSet.add(element.time)
        if(element.subject in newArr){
            newArr[element.subject]['pointsArr'].push(element.points)
            newArr[element.subject]['namesArr'].push(element.exam_name)
            newArr[element.subject]['date'].push(element.time)

        }
        else{
            newArr[element.subject]= {
                'namesArr' : [element.exam_name],
                'pointsArr' : [element.points],
                'date' : [element.time]
            }

        }
    })

    const dates = [...datesSet]

    drawCanva(newArr,dates)


}


const drawCanva = (data,labels) => {
    const id = document.getElementById('myCanva')
    const dataset = []
    for(let subject in data){
        const pointsArr = labels.map(labelDate => {
            const pointObj = data[subject].date.find(p => p == labelDate);
            return pointObj ? data[subject]['pointsArr'][data[subject].date.indexOf(pointObj)] : 0; 
        });
        dataset.push({
            label: subject,
            data: pointsArr
        })
        
    }

    new Chart(id, {
        type: 'line',
        data: {
            labels: labels,
            datasets: dataset
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                y: {
                    min: 0,
                    max: 100
                }
            }
        }
    })
}

const drawResults = (data) => {
    let str = ''
    let status = null
    const subj = sessionStorage.getItem('filterSubject') ?? null
    if(subj && subj !=='all'){
        status = subj
    }

    if(data.length!== 0){
        data.forEach(element => {
            if(status && element.subject !== status){
                return
            }
            const date = changeFormat(element.time,0)
            str+= `
            <div class="main_card bg-white rounded-2xl shadow p-5 border">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 gap-sm-5 mb-2">
                    <h4 class="text-lg font-600 letter-s text-color1">${element.exam_name}</h4>
                    <span class='letter-s text-gray'>${date}</span>
                </div>
                <p class="text-sm text-slate-600">${element.subject}</p>

                <div class="mt-3 d-flex justify-content-between  flex-wrap gap-3 gap-sm-5 align-items-center  ${element.is_qualified ? 'text-color3' : 'text-color1'}">
                    <span class="font-400 ">${element.is_qualified ? 'Qualified' : 'Not Qualified'}</span>
                    <span class="font-600 letter-s">Points : ${element.points}</span>
                </div>

                <div class="mt-3 border-top pt-3 text-end letter-s">
                    <span>${element.prof_name}</span>   
                </div>
            </div>
            `
        });
    }
    else{
        str = `<h3>404 not found</h3>`
    }

    document.querySelector('.exam_results').innerHTML = str
}