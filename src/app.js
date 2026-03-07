const main = document.querySelector('main');
const nav = document.querySelector('nav');

export function showView (section){
    main.replaceChildren(section);
}