import { showCatalog } from "./catalog.js";
import { showCreate } from "./create.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { showEdit } from "./edit.js";
import { showDetails } from "./details.js";

const main = document.querySelector('main');
const nav = document.querySelector('nav');
nav.addEventListener('click', onNav);

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

function onNav(ev){
        if(ev.target.tagName == 'A'){
            
            const handler = links[ev.target.id];
            if(handler){
            ev.preventDefault();
            handler()
        }
    }
}

async function logout(){
    
}
