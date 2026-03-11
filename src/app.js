import { showCatalog } from "./catalog.js";
import { showCreate } from "./create.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { showEdit } from "./edit.js";
import { showDetails } from "./details.js";

const main = document.querySelector('main');
const nav = document.querySelector('nav');
nav.addEventListener('click', onNav);
setNavigationBar()

export function showView (section){
    main.replaceChildren(section);
    
    
}

const links = {
        'catalogLink': showCatalog,
        'createLink': showCreate,
        'loginLink': showLogin,
        'registerLink': showRegister,
        'logoutBtn': logout,
}

    showCatalog();
    setActiveNav('catalogLink');

function onNav(ev){
        if(ev.target.tagName == 'A'){
            setActiveNav(ev.target.id);
            const handler = links[ev.target.id];
            if(handler){
            ev.preventDefault();
            handler()
        }
    }
}

 function logout() {
        const response =  fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {
                'X-Authorization': sessionStorage.getItem('accessToken')
            },
        });
        
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('userId')
            setNavigationBar();
            setActiveNav('catalogLink');
            showCatalog();
            
        
        
    }

export function setNavigationBar(){
    
        if (sessionStorage.getItem('accessToken') != null) {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
        } else {
            
            document.getElementById('guest').style.display = 'inline-block';
            document.getElementById('user').style.display = 'none'
        
    }
}

export function setActiveNav(targetId) {
        [...nav.querySelectorAll('a')].forEach(a => a.id == targetId ? a.classList.add('active') : a.classList.remove('active'));
    }