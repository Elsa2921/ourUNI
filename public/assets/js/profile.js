import {logChecker} from './loggedChecker.js';
import { arr } from "./links.js";
import { fetchAPI } from './script.js';
document.addEventListener('DOMContentLoaded',() =>{
    p_log();
    s_log()
    logout();
})


function logout(){
    let btn = document.querySelector('#logout')
    btn.addEventListener('click',async function(){
        const data = {'logout':true}
        await fetchAPI("POST",data,'logout')
        window.location.href = arr.index
    })
}

async function s_log(){
    const prof = document.querySelector('.student_profile_cont') ?? null
    if(prof){
        const checker = await logChecker(1);
        if(!checker.profile || checker.profile.role !==1){
            window.location.href=arr.index;
        }
        else{
            const profile= checker.profile;
            document.getElementById('profile_name').innerHTML = profile.name
            document.getElementById('phone_number').innerHTML = 'phone :'+profile.phone
        }

    }
    
}

async function p_log(){
    const prof = document.querySelector('.prof_profile_cont') ?? null
    if(prof){
        const checker = await logChecker(1);
        if(!checker.profile || checker.profile.role !==2){
            window.location.href=arr.index;
        }
        else{
            const profile= checker.profile;
            document.getElementById('profile_name').innerHTML = profile.name
            document.getElementById('phone_number').innerHTML = 'phone :'+profile.phone
        }

    }
    
}