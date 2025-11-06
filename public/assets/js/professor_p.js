import { arr } from "./links.js";
import { fetchAPI } from './script.js';

document.addEventListener('DOMContentLoaded',function(){
    CreateTestName()
    createTestReload()
    testsReload()
    viewTestReload();
    startExamReload();
    examProgressReload()
    viewExamReload()
    examRes_OpenFilters();
    examRes_search();
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



function examRes_OpenFilters(){
    const btns = document.querySelectorAll('.examRes_filters_btn')
    if(btns){
        btns.forEach(element=>{
            element.addEventListener('click', function(){
                let block = document.querySelector('.examFilterSearch_block')
                const status = element.getAttribute('data-status')
                if(status=="1"){
                    if(element.getAttribute('data-type') && element.getAttribute('data-type')=='search'){
                        document.querySelector('.search_box').style.display="block"
                        document.querySelector('.filter_box').style.display="none"
                    }
                    else{
                        document.querySelector('.filter_box').style.display="block"
                        document.querySelector('.search_box').style.display="none"

                    }

                    block.style.left = 0
                
                }
                else{
                    close(block,'-580px')
                }
            })
        })
    }
}

function close(element,left){
    element.style.left = left
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
        setViewSession();
        viewExamType();
        const type = sessionStorage.getItem('viewActive')
        const params = `exam/${type}`
        const res = await fetchAPI('GET',{},params)

        if(res.status===403){
            pass

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
        const data = sessionStorage.getItem('viewActive')
        let active = document.querySelector(`.view_exam_status[data-info=${data}]`)
        active.setAttribute('data-active',1)
        active.classList.add('active')
        
    }
}











// -------------------  exams in progress  -------------------------
// ----------------                                  ---------------                
//  ---------------                                  ---------------
// ----------------                                  ---------------
// ----------------                                  ---------------
// -----------------------------------------------------------------





async function examProgressReload(){
    const el = document.getElementById('examsInPorgress')
    if(el){
        const params = 'exams'
        const res = await fetchAPI('GET',{},params)
        const data = await res.json();
        if(data['exams']){
            drawExams(data['exams']);
        }
        else if(data['status'] && data['status']==403){
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
            str+= ` 
                <div class="examProgress_box d-flex justify-content-center align-items-start gap-2 flex-column">
                    <h4 class="w-100 text-center">${element.test_name}</h4>
                    <h5 class="w-100 text-center">${element.faculty}</h5>
                    <h6>Duration : <b>${element.exam_duration}</b> minutes</h6>
                    <p>Min points : <b>${element.min_points}</b></p>
                    <p>Max points : <b>${element['max_points']}</b></p>
                    <span>Participants : <b>${element['participants']}</b></span>
                    <span>started date : <b>${element['start_time']}</b></span>
                    <div class="d-flex justify-content-start align-items-start flex-wrap gap-3 pt-3">
                        <button data-id=${element['id']} class="black-btn exam_view_btn">View</button>
                        <button class="pink-btn end_exam_btn" data-name=${element.faculty} data-id=${element['id']}>End Exam</button>
                    </div>
                    

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
        str+= `
            <option value=${element.id} data-maxpoint="${element.total_points}"> ${element.test_name} (${element.subject})</option>
        `
        
    });
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
            let data =await res.json();
            if(data['error']){
                alert(data['error'])
            }
            else if(data['status']){
                if(data['status']==403){
                    window.location.href = arr.index
                }
                else if(data['status']==200){
                    console.error(data)
                    drawTestInfo(data['data']);
                }
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
            str+=`
                <div class="about_test d-flex justify-content-start gap-2 flex-column">
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
                    <span>${element['date']}</span>
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
            if(res.status==200){
                const resp = await res.json()
                const data = resp.subjects || []
                drawSubjects(data)
                console.error(data)
            }

        }catch(error){
            console.error(error)

        }
    }
}

function drawSubjects(data){
    let str = ''
    data.forEach(element => {
        str+= `
        <option value='${element['prof_subj_id']}' data-val='${element['faculty']} (${element['year_level']} year)'>
            ${element['subject']}
        </option>
        `
    })
    document.querySelector('#select_sub').innerHTML = str
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

