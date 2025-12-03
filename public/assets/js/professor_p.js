import { arr } from "./links.js";
import { fetchAPI,changeFormat } from './script.js';

document.addEventListener('DOMContentLoaded',function(){
    CreateTestName()
    createTestReload()
    testsReload()
    viewTestReload();
    startExamReload();
    examProgressReload()
    viewExamReload()
    examResReload()
    testNameReload();
})

// -----------------------  SAME  --------------------------------
// ----------------                                ---------------                
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------


function permission(name){
    let parent = document.querySelector('.permission-cont')

    parent.style.transform = "scale(1)"
    if(name){
        parent.querySelector('b').innerHTML = name   
    }
    return permission_btns(parent);
    
}


function permission_btns(parent){
    return new Promise((resolve)=>{
        let btns = parent.querySelectorAll('button')
        btns.forEach(btn=>{
            btn.addEventListener('click', function (){
                parent.style.transform = "scale(0)"

                resolve(parseInt(btn.getAttribute('data-status')));
            })
        })
    })
    
}


// ---------------------  exam result  ---------------------------
// ----------------                                ---------------                
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------



const examResReload = async() => {
    const div = document.querySelector('.exam_results_area') ?? 0
    if(div){
        // examRes_OpenFilters();
        // examRes_search();
        const params = 'prof/examsResults'
        let dataSelected = {'selectedSub' : null}
        if(sessionStorage.getItem('filterSubject')){
            dataSelected['selectedSub'] = parseInt(sessionStorage.getItem('filterSubject')) ?? null;
        }
        
        const res = await fetchAPI('GET', dataSelected ,params)
        if(res.status == 200){
            const data = await res.json()
            if(data.examRes){
                showCanvas()
                setInfo(data.examRes)
                drawResults(data.examRes)
            }
            if(data.subjects){
                drawSubjects(data.subjects,1)
            }

        }
        else{
            window.location.href = arr.index
        }

    }
    
    
}

const showCanvas = () =>{
    let inp = document.querySelector('#res_type')
    inp.addEventListener('input',function(){
        const canva = document.getElementById('myCanva')
        const cont = document.querySelector('.exam_results_area')
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


const filterResultBySubject = () =>{
    const select = document.querySelector('#select_sub')
    if(sessionStorage.getItem('filterSubject')){
        select.value = sessionStorage.getItem('filterSubject')
    }
    select.addEventListener('change', function(){
        sessionStorage.setItem('filterSubject',select.value)
        window.location.reload()
    })
}


const drawResults = (data) => {
    let str = ''
    if(data.length==0){
        str = `<h4>404 not found</h4>`
    }
    else{
        data.forEach(element=> {
            const date = changeFormat(element.time,0)

            str+= `
                <div class="main_card bg-white rounded-2xl shadow p-5 border">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-2">
                        <h4 class="text-lg font-600 letter-s text-color1">${element.exam_name}</h4>
                        <span class='letter-s text-gray'>${date}</span>
                    </div>
                    <p class="text-sm text-slate-600">${element.subject}</p>

                    <div class="mt-3 d-flex justify-content-between flex-wrap gap-4 align-items-center  ${element.is_qualified ? 'text-color3' : 'text-color1'}">
                        <span class="font-400 ">${element.is_qualified ? 'Qualified' : 'Not Qualified'}</span>
                        <span class="font-600 letter-s">Points : ${element.points}</span>
                    </div>
                    <div class="mt-3 border-top pt-3 letter-s">
                        <span>${element.faculty}</span>
   
                    </div>
                    <div class="mt-3 border-top pt-3 text-end letter-s">
                        <span>${element.student_name}</span>   
                    </div>
                </div>
            `
        })
    }

    document.querySelector('.exam_results_area').innerHTML = str
}


function examRes_search(){
    const form = document.querySelector('#examRes_search_form')
    if(form){
        form.addEventListener('submit',async function(ev){
            ev.preventDefault();
            const inp = form.querySelector('input').value
            if(inp.length > 0 && inp.trim()!==''){
                const params = 'student'
                const data = {
                    'search': inp
                }
                const res = await fetchAPI('GET',data,params)
                if(res.status===200){
                    const data =await res.json();
                    drawStudentSerch(data['searchRes'])
                }
                else if(res.status===204){
                    drawStudentSerch(false)

                }
                else{
                    window.location.href = arr.index
                }
            }
            

        })
    }
    // 
}


function drawStudentSerch(data){
    console.error(data)
    let str = ''
    if(data){
        data.forEach(element => {
            str+=`
                <div class="search-user-box w-100 d-flex justify-content-start align-items-start p-3 flex-column gap-4">
                    <div class="d-flex justify-content-start align-items-start gap-3">
                        <i class="fa-solid fa-user"></i>
                        <p>${element.full_name}</p>
                    </div>
                    <h6 class="text-color2">${element.faculty}</h6>
                    <div class="w-100 text-end">
                        <button class="pink-btn" data-id="${element.id}">Show</button>
                    </div>
                </div>
            `
        })
    }
    else{
        str+=`<h3>Not found</h3>`
    }

    document.querySelector('.search_res_block').innerHTML = str
}


// const o = new IntersectionObserver




// ---------------------  view exam   ----------------------------
// ----------------                                ---------------                
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------



async function viewExamReload(){
    const cont = document.getElementById('viewExam_c')
    
    if(cont){
        viewExamType();
        setViewSession();
        const type = sessionStorage.getItem('viewActive') ?? 'inProgress'
        const params = `exam/${type}`
        const res = await fetchAPI('GET',{},params)

        if(res.status===403){
            window.location.href = arr.index

        }
        else{
            const data = await res.json();

            if(data.examName){
                document.getElementById('exam_faculty').innerHTML = data.examName
            }
            if(data.students){
                drawStudents(data.students);
            }
        }
    }
}


function  drawStudents(data){
    let str = ''
    if(data.length!==0){
        data.forEach(element => {
            str+=
            `<div class='viewStudent_exam_block'>
                <h5 class="font-600 text-black">${element['full_name']}</h5>
                <span class="text-color2">started : ${element['start']}</span>
            `
            if(sessionStorage.getItem('viewActive') && sessionStorage.getItem('viewActive')=='finished'){
                str+=`
                    <p>ended : ${element['end']}</p>
                `
            }
            str+=`</div>`
        });
        

        document.getElementById('exams_block').innerHTML = str
    }
}

function viewExamType(){
    const els = document.querySelectorAll('.view_exam_status')
    els.forEach(el=>{
        el.setAttribute('data-active',0)
        el.classList.remove('active')
        el.addEventListener('click',async function() {
            const type = el.getAttribute('data-info')
            console.error(type)
            el.classList.add('active')
            sessionStorage.setItem('viewActive',type)
            window.location.reload()
        })
    })
}


function setViewSession(){
    if(!sessionStorage.getItem('viewActive')){
        console.error('s')
        sessionStorage.setItem('viewActive','inProgress')
        window.location.reload();
    }
    else{
        const arr = ['inProgress', 'finished']
        const data = sessionStorage.getItem('viewActive')
        if(arr.includes(data)){
            let active = document.querySelector(`.view_exam_status[data-info='${data}']`)
            active.setAttribute('data-active',1)
            active.classList.add('active')
        }else{
            sessionStorage.removeItem('viewActive')
            window.location.reload()
        }
        
        
    }
}











// -------------------  exams in progress  -------------------------
// ----------------                                  ---------------                
//  ---------------                                  ---------------
// ----------------                                  ---------------
// ----------------                                  ---------------
// -----------------------------------------------------------------





async function examProgressReload(){
    const el = document.getElementById('examsInPorgress') ?? null
    if(el){
        const params = 'exams'
        const res = await fetchAPI('GET',{},params)
        console.log(res.status)
        if(res.status && res.status==200){
            const data = await res.json();
            drawExams(data['exams']);

        }
        else{
            window.location.href = arr.index;
        }
       

    }
   
}




function drawExams(data){
    console.error(data)
    let str= '';
    if(data.length!==0){
        data.forEach((element)=>{
            console.error(element)
            let date = changeFormat(element['start_time'])
            console.error(date)
            str+= ` 
                <div class="main_card p-5 border shadow d-flex justify-content-center align-items-start gap-3 flex-column">
                    <h3 class="w-100 text-center text-color1">${element.test_name}</h3>

                    <div class='mt-4 w-100 d-flex justify-content-start gap-5 flex-wrap pb-3 border-bottom'>
                        <h6><i class="fa-regular fa-clock"></i>  <b class='text-color3'>${element.exam_duration}</b> minutes</h6>
                        <p><i class="fa-solid fa-user-group"></i>  <b class='text-color3'>${element['participants']}</b></p>
                    </div>
                    <div class='w-100 d-flex justify-content-start gap-5 flex-wrap'>
                        <p>Min : <b class='text-color2'>${element.min_points}</b></p>
                        <p>Max : <b class='text-color2'>${element['max_points']}</b></p>
                    </div>
                    <span>Started  <b class='text-color3'>${date}</b></span>
                    <div class="d-flex justify-content-start align-items-start flex-wrap gap-3 pt-3">
                        <button data-id=${element['id']} class="black-btn exam_view_btn">View</button>
                        <button class="pink-btn end_exam_btn" data-name=${element.faculty} data-id=${element['id']}>End Exam</button>
                    </div>
                    <h6 class="w-100 text-end mt-3 pt-3 border-top text-color2">
                        <i class="fa-solid fa-school-flag"></i> ${element.faculty}
                    </h6>
                    
                    
                </div>
            `
        })

        document.getElementById('examsInPorgress').innerHTML = str
        endExam();
        viewExam();
    }
    else{
        str+=`<h4>There is no exam that you started</h4>`;
    }
}


function  endExam(){
    let btns = document.querySelectorAll('.end_exam_btn')
    btns.forEach((element)=>{
        element.addEventListener('click',async function(){
            const id= element.getAttribute('data-id')
            const name = element.getAttribute('data-name')
            let s = await permission(name);
            if(s){
                const params = `exam/${id}`
                await fetchAPI('PUT',{},params)
                location.reload()
            }   
        })
    })
}







function viewExam(){
    let btns = document.querySelectorAll('.exam_view_btn')
    btns.forEach(element => {
        element.addEventListener('click',async function(){
            try{
                const id = element.getAttribute('data-id')
                const params = `exam/${id}`
                await fetchAPI('GET',{},params)
                window.location.href = arr.examView;
            }
            catch(error){
                console.error(error)
            }
        })
    });
}








// ----------------------  start Exam  -------------------------
// ----------------                              ---------------                
//  ---------------                              ---------------
// ----------------                              ---------------
// ----------------                              ---------------
// -------------------------------------------------------------





async function startExamReload(){
    let form = document.getElementById('startExam_form')
    if(form){
        try{
            const params= 'startExam'
            const res  = await fetchAPI('GET',{},params)
            const data =await res.json();
            if(data['tests']){
                drawTests(data['tests']);
            }
            else if(data['status'] && data['status']==403){
                window.location.href = arr.index;
            }
        }
        catch(error){
            console.error(error)
        }
        
    }
}


function drawTests(data){
    // 
    let str = ''
    str+= `
        <option value="0"  selected disabled hidden>Select the test</option>
    `
    data.forEach(element => {
        str += `<optgroup label='${element.faculty}'>`
            const test_info = JSON.parse(element['test_info'])
            test_info.forEach(test =>{
                str+= `
                    <option value=${test.id} data-maxpoint=""> ${test.test_name} (${element.subject})</option>
                `
            })
        str+= `</optgroup>`       
    });
    //
    document.getElementById('select_faculty').innerHTML = str
    startExam_form();
}



function startExam_form(){
    let form = document.getElementById('startExam_form')
    form.addEventListener('submit',async function(e){
        e.preventDefault();
        try{
            let name = form.querySelector('#exam_name').value
            let faculty  = form.querySelector('#select_faculty').value
            let duration = form.querySelector('#exam_duration').value
            let minPoints = form.querySelector('#min_points').value
            let maxPoints = form.querySelector(`option[value="${faculty}"]`);
            if(name.trim!=='' && faculty!=="0"){
                const params = 'exam'
                let data = {
                    'test':faculty,
                    'duration' :duration,
                    'minPoints':minPoints,
                    'name' : name,
                    'maxPoints' : maxPoints.getAttribute('data-maxpoint')
                    
                }
                const res = await fetchAPI('POST',data,params)
                let data_r = await res.json();
                if(data_r['message'] && data_r['message']=='ok'){
                    window.location.href = arr.examProgress;
                }
                else if(data_r['status'] && data_r['status']==403){
                    window.location.href = arr.index;
                }
            }
            
            }
            catch(error){
                console.error(error)
            }
        
    })
}












// ------------------------  view test  --------------------------
// ----------------                                ---------------                
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------



async function  viewTestReload(){
    let area = document.getElementById('questions_area')
    if(area){
        try{
            const params = 'test'
            const res = await fetchAPI('GET',{},params)
            let data =await res.json();
            if(data['error']){
                alert(data['error'])
            }
            else if(data['status']){
                if(data['status']==403){
                    window.location.href = arr.index
                }
                else if(data['status']==200){
                    drawTest(data['data']);
                }
            }
        }
        catch(error){
            console.error(error)
        }
        
    }
}




function drawTest(data){
    document.getElementById('subject').innerHTML = data['subject']
    document.getElementById('testName').innerHTML = data['test_name']
    console.error(data)
    let questions = data['questions']
    let str = ''
    let count = 0;
    questions.forEach(element => {
        count++
        str+=`
            <div class="question_box d-flex justify-content-start align-items-start gap-4 flex-column">
                <h4 class='text-color3 font-600'> ${count}. ${element.question} (${element.points})</h4>
                <p>1.${element['opt_1']}</p>
                <p>2.${element['opt_2']}</p>
                <p>3.${element['opt_3']}</p>
                <p>4.${element['opt_4']}</p>
            </div>
        `
    });

    document.getElementById('questions_area').innerHTML = str
}











// -----------------------  all tests  ---------------------------
// ----------------                                ---------------                
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------





async function  testsReload(){
    let area = document.getElementById('tests_area')
    if(area){
        try{
            const params = 'tests'
            const res = await fetchAPI('GET',{},params)
            if(res.status == 200){
                let data =await res.json();
                drawTestInfo(data['data']);

            }
            else{
                window.location.href = arr.index
            }
        }
        catch(error){
            console.error(error)
        }
        
    }
}





function drawTestInfo(data){
    let str = '';
    if(data.length > 0){
        data.forEach(element => {
            let date = changeFormat(element.date)
            str+=`
                <div class="about_test shadow border d-flex justify-content-start gap-2 flex-column">
                    <h4>${element['test_name']}</h4>
                    <h6>subject: ${element['subject']}</h6>
                    <h5 style='font-size:13px;'>${element['faculty']} (${element['year_level']})</h5>
                    <div class="d-flex justify-content-between align-items-center flex-wrap">
                        <p>Question : ${element['question_count']} </p>
                        <p>Total Points :${element['total_points']}</p>
                    </div>
                    <div class="d-flex justify-content-start align-items-center gap-3 flex-wrap">
                        <button data-href='/ourUNI/public/html/prof_pages/createTest.html' 
                        class="black-btn set_test_id" data-id=${element['id']}>
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button data-href='/ourUNI/public/html/prof_pages/allQuestions.html'
                        class="black-btn set_test_id" data-id=${element['id']}>
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="pink-btn delete_test" data-tName=${element['test_name']}  data-id=${element['id']}>
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        
                    </div>
                    <span class='pt-3 mt-3 border-top'>${date}</span>
                </div>
            `
            
        });
    }
    else{
        str += `
            <div class='w-100 d-flex justify-content-center align-items-center flex-column gap-4'>
                <h3>Not Found</h3>
                <a href="../../html/prof_pages/testName.html">
                    <button class="black-btn">Create Test</button>
                </a>
            </div>
        `
    }
    document.getElementById('tests_area').innerHTML= str
    DeleteTest();
    set_test_id()
}





function DeleteTest(){
    let btns = document.querySelectorAll('.delete_test')
    btns.forEach(element=>{
        element.addEventListener('click',async function(){
           

            try{
                let id = element.getAttribute('data-id')
                let tName = element.getAttribute('data-tName')
                let s =await  permission(tName)
                
                if(s){
                    const part = `test/${id}`
                    await fetchAPI('DELETE',{},part)
                    location.reload()
                }
                
            }
            catch(error){
                console.error(error)
            }
            
        })
    })
}





function set_test_id(){
    let btns = document.querySelectorAll('.set_test_id')
    btns.forEach(element=>{
        element.addEventListener('click',async function(){
            try{
                let id = element.getAttribute('data-id')
                const params = `test/${id}`
                await fetchAPI('PUT',{},params)
                window.location.href = element.getAttribute('data-href')
            }
            catch(error){
                console.error(error)
            }
            
        })
    })
}















// ---------------------  table functions  -----------------------
// ----------------                                ---------------
//  ---------------                                ---------------
// ----------------                                ---------------
// ----------------                                ---------------
// ---------------------------------------------------------------





async function  createTestReload(){
    let table = document.getElementById('test_table')
    if(table){
        try{

            const params = 'createTest'
            const res = await fetchAPI('GET',{},params)
            let data =await res.json();
            if(data['error']){
                alert(data['error'])
            }
            else if(data['status']){
                if(data['status']==403){
                    window.location.href = arr.index
                }
                else if(data['status']==200){
                    addLine();
                    console.error(data)
                    document.getElementById('test_name_h').innerHTML = data['name']
                    drawTable(data['table']);
                }
            }
        }
        catch(error){
            console.error(error)
        }
        
    }
}


function drawTable(data){
    let str = ''
    
    data.forEach(element => {
            str+= `
            <tr>
                <td class='tableCol' data-id=${element['id']} data-col='question' contentEditable>${element['question']}</td>
                <td class='tableCol' data-id=${element['id']} data-col='opt_1' contentEditable>${element['opt_1']}</td>
                <td class='tableCol' data-id=${element['id']} data-col='opt_2' contentEditable>${element['opt_2']}</td>
                <td class='tableCol' data-id=${element['id']} data-col='opt_3' contentEditable>${element['opt_3']}</td>
                <td class='tableCol' data-id=${element['id']} data-col='opt_4' contentEditable>${element['opt_4']}</td>
                <td class='tableCol' data-id=${element['id']} data-col='answer' contentEditable>${element['answer']}</td>
                <td class='tableCol' data-id=${element['id']} data-col='points' contentEditable>${element['points']}</td>
                <td class='tableCol' data-id=${element['id']}>
                    <button class='black-btn delteTableRow' data-id=${element['id']}>
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
            `  
    });


    let htmT = ``
    let table = document.getElementById('test_table').innerHTML
    htmT+= table+str
    document.getElementById('test_table').innerHTML = htmT
    editTable();
    deleteLine();
}



function addLine(){
    let btn=  document.getElementById('addLine')
    btn.addEventListener('click',async function(){
        try{
            const params = 'table/line'
            await fetchAPI('POST',{},params)
            location.reload()
        }
        catch(error){
            console.error(error)
        }
       
    })
}

function  editTable(){
    let tds = document.querySelectorAll('.tableCol')
    tds.forEach((element)=>{
        element.addEventListener('blur',async function(){
            try{
                let id = element.getAttribute('data-id');
                let col = element.getAttribute('data-col')
                const params = `table/${id}`
                const data = {
                    'column':col,
                    'value':element.innerHTML

                }
                await fetchAPI('PUT',data,params)
            }
            catch(error){
                console.error(error)
            }
            
        })
    })
}


function deleteLine(){
    let btns = document.querySelectorAll('.delteTableRow')
    btns.forEach((element)=>{
        element.addEventListener('click',async function(){
            try{
                let id = element.getAttribute('data-id');
                // const params = new URLSearchParams(data).toString();
                const part = `table/${id}`
                await fetchAPI('DELETE',{},part)
                location.reload()    
            }
            catch(error){
                console.error(error.message)
            }
            
        })
    })
    
}












// ----------------------  test name  --------------------------
// ----------------                              ---------------                
//  ---------------                              ---------------
// ----------------                              ---------------
// ----------------                              ---------------
// -------------------------------------------------------------
    




async function testNameReload(){
    let form = document.querySelector("#testName_form")
    if(form){
        try{
            const params = 'testName'
            let res = await fetchAPI('GET',{},params)
            console.log(res.status)
            if(res.status==200){
                const resp = await res.json()
                const data = resp.subjects || []
                drawSubjects(data)
            }
            else if(res.status == 403){
                window.location.href = arr.index
            }

        }catch(error){
            console.error(error)

        }
    }
}

function drawSubjects(data, status= null){
    let str = ''
    str+=`
        <option selected disabled value=0>Select a subject</option>
    `
    data.forEach(element => {
        str += `
        <optgroup label='${element['faculty']} (${element['year_level']})'>
        `
        const subjects = JSON.parse(element.subjects)
        subjects.forEach(subj => {
            str+= `
                <option value='${subj['prof_subj_id']}' data-val='${subj['faculty']} (${subj['year_level']} year)'>
                    ${subj['subject']}
                </option>
            `
        })
        str += `</optgroup>`
        
    })
    document.querySelector('#select_sub').innerHTML = str
    if(status){
        filterResultBySubject()     
    }
}


function CreateTestName(){
    let form = document.getElementById('testName_form')
    form?.addEventListener('submit',async function(e){
        e.preventDefault()
        try{
            let name = document.getElementById('test_name').value;
            let subject = document.getElementById('select_sub').value
            const params = 'test'
            let data = {
                'name' : name,
                'subject' : subject
            }
            const res = await fetchAPI('POST',data,params)
    
            let anw = await res.json();
            if(anw['error']){
                alert(anw['error'])
            }
            else if(anw['status']){
                if(anw['status']==403){
                    window.location.href = arr.index
                }
                else if(anw['status']==200){
                    window.location.href =arr.createTest;
                }
            }
            console.error(anw)
        }
        catch(error){
            console.error(error)
        }
       
    })
}

