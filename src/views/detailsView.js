import { html } from 'src/utils/litHtml.js';



export function detailsView (recipe, userId){
    return html `
    <h2>${recipe.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src=${recipe.img}>
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        ${recipe.ingredients.map(i => `<li>${i}</li>`).join('\n')}
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${recipe.steps.map(s => `<p>${s}</p>`).join('\n')}
            </div>
            ${userId === recipe._ownerId ? html `
                <div class="controls">
                    <button @click=${page.redirect('/:id/edit')}>'\u270E Edit'</button>
                    <button @click=${page.redirect('/:id/delete')}>'\u2716 Delete'</button>
                </div>
                ` : ''}
        `
    
}
