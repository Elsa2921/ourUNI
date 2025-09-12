import { arr } from "./links.js";
let str = '';
try{
    fetch(arr.blogJson)
    .then(res=>res.json())
    .then(data=>{
        
        for(let i in data){
            
            str+=  `<p data-cat="${i}" class='categories'>${i}</p>`
        }
        document.getElementById('blog_categories').innerHTML = str
        selectCategory()
        drawBlog(data)
    })
}

catch(error){
    console.error(error.message)
}

function selectCategory(){
    

    let cats = document.querySelectorAll('.categories')
    cats.forEach(element=>{
        element.addEventListener('click', function(){
            let categorie = element.getAttribute('data-cat')
            sessionStorage.setItem('blog-cat',categorie)
            location.reload()
        })
    })


    if(sessionStorage.getItem('blog-cat')){
        document.querySelector(`p[data-cat="${sessionStorage.getItem('blog-cat')}"]`).classList.add('categorie_active')
        
    }
    else{
        document.querySelector("p[data-cat='Student Life']").classList.add('categorie_active')
        sessionStorage.setItem('blog-cat','Student Life')
    }
}


function drawBlog(data){
    let str = ''
    let category = ''
    if(sessionStorage.getItem('blog-cat')){
        category = sessionStorage.getItem('blog-cat');
        for(let i in data){
            if(category==i){
                data[i].forEach(element => {
                    str+= `
                        <div class='d-flex justify-content-center align-items-start gap-4 py-4  flex-column blog-post-area'>
                            <h1 data-aos='fade-right'>${element['title']}</h1>
                            <h6 data-aos='fade-right'>Author: <b>${element['author']}</b></h6>
                            <div class='d-flex justify-content-between align-items-start  gap-3 flex-wrap blog-post-text-area'>
                                <img data-aos="zoom-in" class='blog-img' alt='img' src=${element['image']}>
                                <p data-aos="fade-up">${element['excerpt']}</p>
                            </div>
                            <span data-aos="fade-up">
                            ${element['date']}
                            </span>

                        </div>
                    `
                })
            }
        }
    }
    else{
        str+=`
         <p>No posts available</p>
        `
    }
    

    document.getElementById('blogCont').innerHTML = str
}
