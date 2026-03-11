import { showView,setNavigationBar } from "./app.js";
import { showCatalog } from "./catalog.js";

const section = document.getElementById('register');
section.remove();

export function showRegister(){
    showView(section);
}


const form = section.querySelector('form');

form.addEventListener('submit', onRegister);

async function onRegister(ev){
    ev.preventDefault()

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const { email, password, rePass } = data;

    if(!email || !password || !rePass){
        alert('All fields are required!');

        return
    }

    if(password != rePass){
        alert("Passwords dont't match!");

        return
    }

    

    try{
    const res = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })

    })

    if(!res.ok){
        const err = await res.json()
        throw err
    }

    const data = await res.json();
    const accessToken = data.accessToken;

    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('userId', data._id);

    setNavigationBar()
    showCatalog()
    
    } catch(err){
        alert(err.message)
    }
      
}