import { arr } from "./links.js";
import { fetchAPI } from "./script.js";
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
        let radio = form.querySelector('input[type="radio"]:checked')
        let inps = form.querySelectorAll('input[data-val]')
        let form_attr=  form.getAttribute('data-val')
        let rest = 'auth'
        let data = {
            form: form_attr
        }
        inps.forEach(element => {
            
            let v = element.value
            let parent = element.parentElement
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
            //     // if(attr==)
                data[attr] = element.value
                if(radio){
                    data['type'] = radio.value
                }
                // 
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
                    send(data,form_attr,rest)
                }
                else{
                    document.querySelector('.error_m').classList.remove('d-none');
                }
            }
            else{
                send(data,form_attr,rest)
            }
            
        }
        

    })
}


function next(type){
    let data = {
        'forgotPass_form':arr.pinCode,
        'pinCode_form': arr.newPass,
        'newPass_form':arr.login
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


async function send(arr1,n,rest){
    
    try{
        const res = await fetchAPI('POST',arr1,rest)        
        if(res.status === 200){
            if(arr1['type'] && n == 'login_form'){
                let loc = ''; 
                loc = arr1['type'] == "1" ? arr.studentProfile : arr.profile
                window.location.href = loc
            }
            else{
                next(n)
            }
            
        }
        else{
            document.querySelector('.error_m').classList.remove('d-none');
        }
            
    }
    catch(error){
        console.error(error)
    }
}


function regex(arr){
    let patterns= {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&*(),.?":{}<>]).{8,}$/,
        pin_code: /^[0-9]{6}$/
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



