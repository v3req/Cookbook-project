import { showView } from "./app.js";

const section = document.getElementById('login');
section.remove();

export function showLogin(){
    showView(section);
}

