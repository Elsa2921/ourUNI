if(document.querySelector('form')){
    form_()
}

function form_(){
    let form = document.querySelector('form')
    let inps  = form.querySelectorAll('input')
    inps.forEach(element => {
        element.addEventListener('input',function(){
            let v = element.value
            if(v.trim()!==''){
                element.classList.add('not_empty')
            }else{
                element.classList.remove('not_empty')
            }
        })
        
    });
}