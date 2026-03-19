import { html } from '../utils/litHtml.js';



export function detailsTemplate (recipe, userId){
    
    
    return html `
    <article>
    <h2>${recipe.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src=${recipe.img}>
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        ${typeof recipe.ingredients === 'string' ? recipe.ingredients.split('\n').map(i => html `<li>${i}</li>`) : recipe.ingredients.map(i => html `<li>${i}</li>`)}
                    </ul>
                </div>
            </div>
             <div class="description">
                <h3>Preparation:</h3>
                ${typeof recipe.steps === 'string' ? recipe.steps.split('\n').map(s => html `<p>${s}</p>`) : recipe.steps.map(s => html `<p>${s}</p>`)}
            </div>
            ${userId === recipe._ownerId ? html `
                <div class="controls">
                    <button @click=${page.redirect(`/${recipe._id}/edit`)}>\u270E Edit</button>
                    <button @click=${page.redirect(`/${recipe._id}/delete`)}>\u2716 Delete</button>
                </div>
                ` : ''}
    </article>
        `
    
}
