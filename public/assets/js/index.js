import {logChecker} from './loggedChecker.js';
document.addEventListener('DOMContentLoaded',() =>{
    p_log();
    observer
})


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.error(entry)
      if (entry.isIntersecting) {
        console.error(entry.target)
        // entry.target.classList.add('show');
        // optional: stop observing once it's visible
        // observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  


async function p_log(){
    const checker = await logChecker();
    let p = document.getElementById('toProfile')
    let s = document.getElementById('toSignup')
    if(!checker.profile){
       s.style.display = 'flex'
    }
    else{
         p.style.display='flex'
        // const profile= checker.profile;
        
    }
    
}

if(document.querySelector('#menu_bar')){
    let count = 0;
    document.querySelector('#menu_bar').addEventListener('click',function(){
        count++
        let nav = document.querySelector('.nav-ul')
        if(count%2==1){
            nav.style.left = '0'
        }
        else{
            nav.style.left = '-450px'

        }
    })
}