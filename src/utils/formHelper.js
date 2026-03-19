import { dataRequests } from "./api.js";
import { passAndRepass, allFieldsCheck } from "./conditions.js";
 import { setNavigationBar } from "./nav.js";

function getFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    return data;
};

export async function handleSubmit(e, location, headers, method){
    e.preventDefault();
    const data = getFormData(e.target);
    
    
    if(!allFieldsCheck(data)){
        alert('All fields are required!');
        return;
    }

    if(window.location.pathName === '/register'){
        if(!passAndRepass(data)){
            alert("Passwords dont't match!");
            return;
        }
    }

    const response = await dataRequests(`http://localhost:3030/${location}`, {
        method,
        headers,
        body: JSON.stringify(data)
})   
    if(window.location.pathname === '/login' || window.location.pathname === '/register'){
        sessionStorage.setItem('accessToken', response.accessToken);
         sessionStorage.setItem('userId', response._id);
    };
    
    
    const links = Array.from(document.querySelectorAll('a'));
    links.forEach(a => a.classList.remove('active'));
    document.getElementById('catalogLink').classList.add('active');
    setNavigationBar()
    page.redirect('/')
}