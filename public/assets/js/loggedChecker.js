import { arr } from "./links.js";
export async function logChecker(){
    try{
       try{
        let res = await fetch(arr.server, {
            method:  "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({loggedChecker1: true})
        })
        
        let data =await res.json();
        return data;
       }
       catch(error){
        console.error(error)
       }
    }
    catch(error){
        console.error(error)
    }
    
}

