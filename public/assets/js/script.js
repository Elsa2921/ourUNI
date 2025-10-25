import { arr } from "./links.js";



export async function fetchAPI(method="GET",data={},part=''){
    const url = arr.server
    let options = { method, headers: {} };
    
    let finalURL = url;
    if(part!==''){
        finalURL = `${url}/${part}`;

    }
    // let finalURL = url;

    
    try{
        if(['GET','DELETE'].includes(method)){
            const params = new URLSearchParams(data).toString()
            if(params) finalURL += `?${params}`
        }else{
            options.headers['Content-Type'] = "application/json"
            options.body = JSON.stringify(data)
        }

        const res = await fetch(finalURL, options);
        return res;
    }
    catch (error){
        console.error(error)
        return null
    }
}

