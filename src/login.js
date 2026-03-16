import { setNavigationBar, showView } from "./app-demo.js";
import { showCatalog } from "./catalog.js";

const section = document.getElementById('login');
section.remove();

export function showLogin(){
    showView(section);
}

const form = section.querySelector('form');

form.addEventListener('submit', onLogin);

async function onLogin(ev){
    ev.preventDefault()

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const { email, password } = data;

   

    try{
    const res = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })

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
    
    setNavigationBar()
    showCatalog()
    
    } catch(err){
        alert(err.message)
    }
      
}