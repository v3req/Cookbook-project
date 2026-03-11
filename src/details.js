import { showEdit } from "./edit.js";
import { showCatalog } from "./catalog.js";
import { setActiveNav } from "./app.js";

export async function showDetails(ev, id){
    const article = ev.currentTarget
   try {
    const res = await fetch(`http://localhost:3030/data/recipes/${id}`);

    if(!res.ok){
        const err = await res.json();
        throw err
    } 

    const data = await res.json();
    
    console.log(data)
    
    article.innerHTML =  `
            <h2>${data.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src=${data.img}>
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        ${data.ingredients.map(i => `<li>${i}</li>`).join('\n')}
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${data.steps.map(s => `<p>${s}</p>`).join('\n')}
            </div>
        `
    const userId = sessionStorage.getItem('userId');
        if (userId != null && data._ownerId == userId) {
            const editButton = document.createElement('button');
            editButton.textContent = '\u270E Edit';
            editButton.addEventListener('click', (ev) => showEdit(ev, id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '\u2716 Delete';
            deleteButton.addEventListener('click', (ev) => onDelete(ev, id));

            const container = document.createElement('div');
            container.classList.add('controls')
            container.replaceChildren(editButton, deleteButton)

            article.appendChild(container)
        }

    const main = document.querySelector('main');
    main.replaceChildren(article)
    setActiveNav()
    
} catch (err){
    alert(err.message)
}
     
}

async function onDelete(ev, id){
    const confirmed = confirm('Are you sure you want to delte this recipe?');
    if(confirmed){
        const accessToken = sessionStorage.getItem('accessToken')
        const res = await fetch(`http://localhost:3030/data/recipes/${id}`,{
            method: 'delete',
            headers: {'X-Authorization' : accessToken}
    });

    if(!res.ok){
        const err = await res.json();
        alert(err.message);

        return
    }

    const article = ev.target.parentElement;
    const h2 = document.createElement('h2');
    h2.innerText = 'Recipe deleted.';
    article.replaceChildren(h2);

    showCatalog()
    setActiveNav('catalogLink')
    }   
}
