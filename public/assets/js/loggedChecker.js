import { arr } from "./links.js";
export async function logChecker($f){
   
    try{
        let res = await fetch(arr.server, {
            method:  "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({loggedChecker1: $f})
        })
        
        let data =await res.json();
        return data;
    }
    catch(error){
        console.error(error)
    }
    
}

