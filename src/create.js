import { showView } from "./app.js";

const section = document.getElementById('create');
section.remove();

export function showCreate(){
    showView(section);
}