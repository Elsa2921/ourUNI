import {logChecker} from './loggedChecker.js';
import { arr } from "./links.js";
document.addEventListener('DOMContentLoaded',() =>{
    p_log();
    logout();
})


function logout(){
    let btn = document.querySelector('#logout')
    btn.addEventListener('click',async function(){
        try{
            await fetch(arr.server, {
                method: "POST",
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify({'logout':true})
            })
            window.location.href = arr.index
        }
        catch(error){
            console.error(error)
        }
    })
}



async function p_log(){
    const checker = await logChecker(1);
    if(!checker.profile){
        window.location.href=arr.index;
    }
    else{
        const profile= checker.profile;
        document.getElementById('profile_name').innerHTML = profile.name
        document.getElementById('phone_number').innerHTML = 'phone :'+profile.phone
    }
    
}