import { arr } from "./links.js";
let str = '';
fetch(arr.galleryJson)
.then(res=>res.json())
.then(data=>{
    
    for(let i in data){
        
        str+=  `<p data-cat="${i}" class='categories'>${i}</p>`
    }
    document.getElementById('img_categories').innerHTML = str
    selectCategory()
    drawGallery(data)
})



function selectCategory(){
    

    let cats = document.querySelectorAll('.categories')
    cats.forEach(element=>{
        element.addEventListener('click', function(){
            let categorie = element.getAttribute('data-cat')
            sessionStorage.setItem('gallery-cat',categorie)
            location.reload()
        })
    })


    if(sessionStorage.getItem('gallery-cat')){
        document.querySelector(`p[data-cat="${sessionStorage.getItem('gallery-cat')}"]`).classList.add('categorie_active')
        
    }
    else{
        document.querySelector("p[data-cat='campus']").classList.add('categorie_active')
        sessionStorage.setItem('gallery-cat','campus')
    }
}



function drawGallery(data){
    let str = ''
    let category = ''
    if(sessionStorage.getItem('gallery-cat')){
        category = sessionStorage.getItem('gallery-cat');
        for(let i in data){
            if(category==i){
                data[i].forEach(element => {
                    str+= `
                        <img data-aos="zoom-in" class='gallery-img' data-id=${element['id']} alt='img' src=${element['path']}>
                    `
                })
            }
        }
    }
    else{
        str+=`
         <p>No images available</p>
        `
    }
    

    document.getElementById('gallery_imgCont').innerHTML = str
    zoomImg()
}


function zoomImg(){
    let imgs = document.querySelectorAll('.gallery-img')
    imgs.forEach(element => {
        element.addEventListener('click', function(){
            document.querySelector('.img_bg_layer').style.display='flex'
            document.getElementById('zoom_img').innerHTML = `<img class='zoomed_img' alt='img' src=${element.src}></img>`
        })
    })

    close()
}

function close(){
    document.getElementById('close').addEventListener('click',function(){
        document.querySelector('.img_bg_layer').style.display='none'
    })
}