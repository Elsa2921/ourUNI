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


export const showCanvas = (cont) =>{
    
    let inp = document.querySelector('#res_type') ?? null
    if(inp){
        const canva = document.getElementById('myCanva')
        if(sessionStorage.getItem('showCanva')){
            inp.checked = true
            canva.classList.add('d-block')
            canva.classList.remove('d-none')
            
            cont.classList.remove('d-block')
            cont.classList.add('d-none')
        }
        inp.addEventListener('input',function(){
            
            if(inp.checked){
                sessionStorage.setItem('showCanva',1)
                canva.classList.add('d-block')
                canva.classList.remove('d-none')
                
                cont.classList.remove('d-block')
                cont.classList.add('d-none')
            }
            else{
                sessionStorage.removeItem('showCanva')
    
                cont.classList.add('d-block')
                cont.classList.remove('d-none')
                
                canva.classList.remove('d-block')
                canva.classList.add('d-none')
            }
        })
    }
    
}


export const drawCanva = (data,labels) => {
    const id = document.getElementById('myCanva') ?? null
    if(id){

        const dataset = []
        for(let subject in data){
            const pointsArr = labels.map(labelDate => {
                const pointObj = data[subject].date.find(p => p == labelDate);
                return pointObj ? data[subject]['pointsArr'][data[subject].date.indexOf(pointObj)] : 0; 
            });
            dataset.push({
                label: subject,
                data: pointsArr
            })
        
        }
    
        new Chart(id, {
            type: 'line',
            data: {
                labels: labels,
                datasets: dataset
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales:{
                    y: {
                        min: 0,
                        max: 100
                    }
                }
            }
        })
    }
}

