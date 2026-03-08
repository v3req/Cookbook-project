import { showView } from "./app.js";

const section = document.getElementById('register');
section.remove();

export function showRegister(){
    showView(section);
}