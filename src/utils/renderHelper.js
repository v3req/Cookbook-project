import { render } from './litHtml.js';

let mainElement = null;

function getMainElement (){
    if(!mainElement) {
        mainElement = document.querySelector('main')
    }

    return mainElement;
}

export function renderToMain (template){
    render(template, getMainElement());
}

export function attachEventListener(selector, event, handler) {
    setTimeout(() => {
        const element = document.getElementById(selector) || document.querySelector(selector);
        if (element) {
            element.addEventListener(event, handler);
        }
    }, 0);
}