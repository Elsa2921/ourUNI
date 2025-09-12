import {logChecker} from './loggedChecker.js';
import { arr } from "./links.js";
document.addEventListener('DOMContentLoaded',() =>{
    p_log();
})


async function p_log(){
    const checker = await logChecker();
    if(!checker.profile){
        window.location.href=arr.index;
    }
    else{
        const profile= checker.profile;
        // document.getElementById('profile_name').innerHTML = profile.name
        
    }
    
}