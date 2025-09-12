import {arr} from './links.js';
let path = window.location.pathname
let htmlStr =  `
    <h3 class="logo">our<span>UNI</span></h3>
                    
    <ul class="nav-ul d-flex justify-content-between align-items-start gap-4 mt-4 gap-lg-5 flex-lg-row flex-column">
        <li><a href=${arr.index} data-nav-a='nav_a'>Home</a></li>
        <li><a href=${arr.aboutUs} data-nav-a='nav_a'>About Us</a></li>
        <li><a href=${arr.faculties} data-nav-a='nav_a'>Faculties</a></li>
        <li class="dropdown-li">
            <p class="p-dropdown pe-5 pe-lg-0">
                More
                <i class="fa-solid fa-chevron-down"></i>
            </p>
            <ul class="nav-more-dorpdown d-flex justify-content-between align-items-start flex-column gap-3 p-3">
                <li>
                    <a href=${arr.blog} data-nav-a='nav_a'>Blog</a>
                </li>

                <li>
                    <a href=${arr.gallery} data-nav-a='nav_a'>Gallery</a>
                </li>

                <li>
                    <a href=${arr.professors} data-nav-a='nav_a'>Our Professors</a>
                </li>
            </ul>
        </li>
        <li><a href="#contactUs">Contanct Us</a></li>
    </ul>
    <a href=${arr.signup} id="toSignup">
        <button class="pink-btn">Sign Up</button>
    </a>
    <i class="fa-solid fa-bars d-block d-lg-none" id="menu_bar"></i>
                    
    <a id="toProfile" href=${arr.profile}>
        <i  class="fa-solid fa-user d-flex justify-content-center align-items-center"></i>
    </a>
`

document.querySelector('.navbar').innerHTML = htmlStr;
let page = path.split('?',1);
let a_tags = document.querySelectorAll('a[data-nav-a="nav_a"]')

a_tags.forEach(element => {
    element.classList.remove('active_nav');
    let href = element.getAttribute('href')
    if(href == page){
        element.classList.add('active_nav');
    }
    else if(page=='' && href==''){
        element.classList.add('active_nav');
    }
});

window.onscroll = (()=>{
    let nav = document.getElementById('navbar')
    if(scrollY>600){
        nav.classList.add('navbar_contF')
        nav.classList.remove('position-absolute')
    }
    else{
        nav.classList.remove('navbar_contF')
        nav.classList.add('position-absolute')

    }

})
// document.addEventListener('scroll',function(e){
//     console.error(e.scrollY)
// })