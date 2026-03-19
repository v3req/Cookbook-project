

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

