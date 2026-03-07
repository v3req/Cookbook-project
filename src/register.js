document.querySelector('form').addEventListener('submit', onRegister);

async function onRegister(ev){
    ev.preventDefault()

    const form = ev.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries())

    const { email, password, rePass } = data;
    const user = {
        email,
        password
    };

    if(!email || !password){
        alert('All fields are required!');
        return;
    }

    if(password != rePass){
        alert("Passwords don't match!");
        return;
    }

    try{
        const res = await fetch(`http://localhost:3030/users/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });

        if(!res.ok){
            const err = await res.json();
            throw err;
        }

        const data = await res.json();
        console.log(data);
        
        const accessToken = data.accessToken;

        sessionStorage.setItem('accessToken', accessToken);
        
    } catch(err){
        alert(err.message)
    }
}