

export async function userRequest(user, location){
    try{
        const res = await fetch(`http://localhost:3030/users/${location}`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
    
        })
    
        if(!res.ok){
            const err = await res.json()
            throw err
        }
    
        const data = await res.json();
        console.log(data);
        
        const accessToken = data.accessToken;
    
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('userId', data._id);
        
        
        } catch(err){
            alert(err.message)
        }
}

//TODO: make an abstract request wich should combine all of the remaining requests