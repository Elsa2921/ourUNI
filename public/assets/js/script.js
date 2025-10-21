import { arr } from "./links.js";


async function fetchAPI(data={},part='',method="GET"){
    const url = arr.server
    let options = { method, headers: {} };
    let finalURL = url+=`/${part}`;
    
    try{
        if(['GET','DELETE'].includes(method)){
            const params = new URLSearchParams(data).toString()
            if(params) finalURL += `?${params}`
        }else{
            options.headers['Content-Type'] = "application/json"
            options.body = JSON.stringify(data)
        }

        const res = await fetch(finalURL, options);
        return await res.json();
    }
    catch (error){
        console.error(error)
        return null
    }
}

export const fetchPOST = (data,part='') => fetchAPI(data,part,'POST')
export const fetchPUT = (data,part='') => fetchAPI(data,part,'PUT')
export const fetchGET = (data={},part='') => fetchAPI(data,part,'GET')
export const fetchDELETE = (data={},part='') => fetchAPI(data,part,'DELETE')
