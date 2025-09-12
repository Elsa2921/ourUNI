import { arr } from "./links.js";
let str = '';
try{
    fetch(arr.professorJson)
.then(res=>res.json())
.then(data=>{
    drawProfs(data)
    
    // document.getElementById('blog_categories').innerHTML = str
    // selectCategory()
    // drawBlog(data)
})
}

catch(error){
    console.error(r=>err=>1);
}

function drawProfs(data){
    data.forEach(element => {
       str+=`
        <div class='d-flex justify-content-start align-items-center px-4 py-3 gap-4 flex-column prof_eachBox' data-aos="fade-up">
            <img class='prof-img' alt='img' src=${element['img']}>
            <h3>${element['name']}</h3>
            <p>${element['text']}</p>
        </div>
       `
    });

    document.getElementById('profCont').innerHTML = str
}