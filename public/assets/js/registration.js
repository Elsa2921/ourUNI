import { arr } from "./links.js";
document.addEventListener("DOMContentLoaded", ()=>{
    handleReg(document.querySelector('form'))
    handleEye();
})




function handleEye(){
    document.querySelectorAll('.eye-icon')?.forEach(element=>{
        let count = 0;
        element.addEventListener('click', function(){
            count++
            let eye = element.getAttribute('data-eye')
            if(count%2==1){
                document.querySelector(`input[data-eye=${eye}]`).type = 'text'
                element.classList.remove('fa-eye')
                element.classList.add('fa-eye-slash')
            }
            else{
                document.querySelector(`input[data-eye=${eye}]`).type = 'password'
                element.classList.add('fa-eye')
                element.classList.remove('fa-eye-slash')
            }
        })
    })   
}

function handleReg(form) {
    form?.addEventListener('submit',async function(ev){
        ev.preventDefault();
        let inps = form.querySelectorAll('input')
        let form_attr=  form.getAttribute('data-val')
        let data = {
            form: form_attr
        }
        inps.forEach(element => {
            
            
            let v = element.value
            let parent = element.parentNode
            if(v.trim()=='' || v.length==0){
                
                parent.style.borderColor = '#332622'
                parent.querySelector('i').style.color = '#332622'
                parent.querySelector('label').style.color = '#332622'
               
            }
            else{
                parent.style.borderColor = '#F8F5F4'
                parent.querySelector('i').style.color = '#F8F5F4'
                parent.querySelector('label').style.color = '#F8F5F4'
                
                let attr = element.getAttribute('data-val')
                // if(attr==)
                data[attr] = element.value
                
            }
            
        });
        const reg = regex(data)
        if(Object.keys(reg).length !== 0){
            for(let i in reg){
                let parent = document.getElementById(i).parentElement
                parent.style.borderColor = '#332622'
                parent.querySelector('i').style.color = '#332622'
                parent.querySelector('label').style.color = '#332622'
                
            }
        }
        else{
            if(form.querySelector("#password") && form.querySelector("#confirm_password")){
                if(form.querySelector("#password").value == form.querySelector("#confirm_password").value){
                    send(data,form_attr)
                }
                else{
                    alert('password and confirm password are not the same!!');
                }
            }
            else{
                send(data,form_attr)
            }
            
        }
        

    })
}





function send(arr1,n){
    
    try{
        fetch(arr.server,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arr1)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data['status'] && data['status']==200){
                next(n)
            }
            else{
                alert(data['error']);
            }
        })
    }
    catch(error){
        console.error(mesageError)
    }
}


function regex(arr){
    let patterns= {
        name:/^[A-Z]{1}[a-z]{2,40}$/,
        surname:/^[A-Z]{1}[a-z]{2,40}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&*(),.?":{}<>]).{8,}$/,
        code: /^[0-9]{6}$/
    }


    let result = {};
    for(let i in arr){
        if(patterns[i]){
            if(!patterns[i].test(arr[i])){
                result[i] = patterns[i].test(arr[i])
            }
            
        }
    } 

    return result;
    
      
    
}

function next(type){
    let data = {
        'signup_n':'email.html',
        'email_form': 'auth.html',
        'auth_form': 'password.html',
        'password_form':'message.html',
        'forgotPass_form':'auth.html',
        'login_form' : '../profile/profile.html'
    }
    let flag = false;
    for(let i in data){
        
        if(i==type){
            flag = data[i];
            break;
            
        }
    }
    if(flag){
        window.location.href=flag
    }
}






