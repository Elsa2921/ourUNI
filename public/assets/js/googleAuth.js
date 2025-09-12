const arr = {
    'server':'/ourUNI/server/broker.php',
    'profile': '/ourUNI/public/html/profile/profile.html'
}
function handleCredentialResponse(res){
    console.error('dsfsd')
    const idToken = res.credential;
    try{
        fetch(arr.server,{
            method:  "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idToken:idToken,googleAuth:true})         
        })
        .then(res=>res.json())
        .then(data=>{
            if(data['status'] && data['status']==200){
                window.location.href = arr.profile
            }
            console.error(data)
        })
    }
    catch(error){
        console.error(error.message)
    };
}