import { arr } from "./links.js";
let str  = ''
let str1 = ''
fetch(arr.facultiesJson)
.then(res=>res.json())
.then(data=>{
    data.forEach(element => {
        if(element['id']%2==1){
            str+= `<div class='facutie_area d-flex flex-column gap-3' data-aos="fade-up">`
                str+= `
                    <h3>${element['name']}</h3>
                    <h6>${element['details']}</h6>
                `
                const subjects  = element.subjects
                str+= `<details>
                <summary>Subjects</summary>
                `
                subjects.forEach(subject => {
                    str+=`<p>${subject}</p>`
                })

                str+= `</details>`
            str+=`</div>`
        }
        else{
            str1+= `<div class='facutie_area d-flex flex-column gap-3' data-aos="fade-up">`
                str1+= `
                    <h3>${element['name']}</h3>
                    <h6>${element['details']}</h6>
                `
                const subjects  = element.subjects
                str1+= `<details>
                <summary>Subjects</summary>
                `
                subjects.forEach(subject => {
                    str1+=`<p>${subject}</p>`
                })

                str1+= `</details>`
            str1+=`</div>`
        }
        
    });
    document.getElementById('faculties_cont1').innerHTML = str   
    document.getElementById('faculties_cont2').innerHTML = str1
})