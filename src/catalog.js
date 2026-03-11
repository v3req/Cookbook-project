import { showView, } from "./app.js";

import { showDetails } from "./details.js";

async function getRecipes(){
    const accessToken = sessionStorage.getItem('accessToken');

    let options = {
        method: 'get',
        headers: {}
    }

    if(accessToken) {
        options.headers['X-Authorization'] = accessToken
    }

    try {
        const res = await fetch('http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg', options);
        
        if(!res.ok && res.status == 403){
            sessionStorage.removeItem('accessToken')
            showCatalog()
        } else if(!res.ok){
            const err = await res.json();
            throw err
        }

        const data = await res.json();
        data.forEach(createPreview)
    } catch (err){
        alert(err.message)
    }
}



 const section = document.getElementById('catalog');
section.remove();
 const fragment = document.createDocumentFragment();

function createPreview(recipe){
    const result = document.createElement('article');
    result.className = 'preview';
    result.innerHTML = `
            <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <img src=${recipe.img}>
            </div>
        `
    result.addEventListener('click', (ev) => showDetails(ev, recipe._id));
    fragment.appendChild(result);
}

export async function showCatalog(){
    await getRecipes()
    section.replaceChildren(fragment)
    showView(section)
    
}