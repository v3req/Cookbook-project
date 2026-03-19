
// export function getAccessToken(){
//     return sessionStorage.getItem('accessToken')
// } 

// export async function userRequest(user, location){
//     try{
//         const res = await fetch(`http://localhost:3030/users/${location}`, {
//             method: 'post',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(user)
    
//         })
    
//         if(!res.ok){
//             const err = await res.json()
//             throw err
//         }
    
//         const data = await res.json();
//         console.log(data);
        
//         const accessToken = data.accessToken;

//         sessionStorage.setItem('accessToken', accessToken);
//         sessionStorage.setItem('userId', data._id);
    
        
//         } catch(err){
//             alert(err.message)
//         }
// }

export async function dataRequests (location, options){
    try {
        const res = await fetch(`${location}`, options)

        if(!res.ok && res.status == 403){
            sessionStorage.removeItem('accessToken')
            page.redirect('/')
        } else if(!res.ok){
            const err = await res.json();
            throw err
        }

        return await res.json()
    }catch(err){
        alert (err.message)
    }
}

