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


export function changeFormat(date,type=1){
    let time = new Date(date)
    let year = time.toDateString().slice(4,)
    let data  = year
    if(type){
        time = time.toTimeString().slice(0,5)
        data  = year + ' ' + time
    }
    return data ?? 404
}