import {logChecker} from './loggedChecker.js';
import { arr } from "./links.js";
import { fetchAPI } from './script.js';
document.addEventListener('DOMContentLoaded',() =>{
    p_log();
    logout();
})


function logout(){
    let btn = document.querySelector('#logout')
    btn.addEventListener('click',async function(){
        const data = {'logout':true}
        await fetchAPI("POST",data)
        window.location.href = arr.index
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