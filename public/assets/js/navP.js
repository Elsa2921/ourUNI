import {arr} from './links.js';
let htmlStr = `
    <div class="container d-flex justify-content-start flex-column align-items-start gap-5">
        <div class="pb-2 position-relative navbar  w-100  d-flex justify-content-between pt-3 gap-4 pt-md-4  align-items-center flex-wrap">
            <a href="/ourUNI/index.html">
                <h3 class="logo">our<span>UNI</span></h3>

            </a>
            <div class="d-flex justify-content-center align-items-center flex-wrap gap-5">
                <i class="fa-solid fa-bell" id="notifBell"></i>
                <i class="fa-solid fa-user" id="gear"></i>
            </div>
            <div tabindex="0" class="gear_box position-absolute d-flex justify-content-start align-items-start gap-4 flex-column">
                <h5 id="profile_name">Name Surname</h5>
                <h6 id="phone_number">num</h6>
                <button class="pink-btn" id="logout">Logout</button>
            </div>
        </div>
             
    </div>
`


document.querySelector('.profile_nav').innerHTML = htmlStr

let box = document.querySelector('.gear_box')
let gear = document.querySelector("#gear")
if(gear){
    gear.addEventListener('click',function(){
        box.style.top = "90px"
        box.focus()
        blur()
    })
}


function blur(){
    box.addEventListener('blur',function(e){
        if(box.contains(e.relatedTarget)){
            return
        }
        box.style.top = "-320px"
    })
}
