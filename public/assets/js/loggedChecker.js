import { fetchAPI } from './script.js';
export async function logChecker($f){
    let d = {loggedChecker1: $f} 
    let res = await fetchAPI('POST',d)
    return await res.json();

    
}

