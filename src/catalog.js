import { showView } from "./app.js";
import { e } from './dom.js';
import { showDetails } from "./details.js";
async function getRecipes(){
    try {
        const res = await fetch('http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg');
        
        if(!res.ok){
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
    const result = e('article', { className: 'preview', onClick: () => showDetails(recipe, recipe._id)  },
            e('div', { className: 'title' }, e('h2', {}, recipe.name)),
            e('div', { className: 'small' }, e('img', { src: recipe.img })),
        );
    
    fragment.appendChild(result);
}

export async function showCatalog(){
    await getRecipes()
    section.replaceChildren(fragment)
    showView(section)

}