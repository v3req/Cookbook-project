import { showView, setActiveNav } from "./app.js";
import { showCatalog } from "./catalog.js";

const section = document.getElementById('edit');
section.remove()

export function showEdit(ev, id){
    showView(section);
    ev.stopPropagation();

    setActiveNav()

    const form = section.querySelector('form');

form.addEventListener('submit', (ev) => onEdit(ev, id));
}



async function onEdit(ev, id){
    ev.preventDefault()

    const formData = new FormData(ev.target);
    const data = Object.fromEntries(formData.entries());

    const { name, img, ingredients, steps } = data;

    if(!name || !img || !ingredients || !steps){
        alert('All fields are required!');

        return
    }

    const newRecipe = {
        name,
        img,
        ingredients: ingredients.split('\n'),
        steps: steps.split('\n')
    }

    const accessToken = sessionStorage.getItem('accessToken');

    if(!accessToken){
        showCatalog()
    }

    try{
    const res = await fetch(`http://localhost:3030/data/recipes/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json',
            'X-Authorization': accessToken
        },
        body: JSON.stringify(newRecipe)

    })

    if(!res.ok){
        const err = await res.json()
        throw err
    }
    showCatalog()
    } catch(err){
        alert(err.message)
    }
      
}