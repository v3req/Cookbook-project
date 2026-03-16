import { html } from 'src/utils/litHtml.js';

export function catalogTemplate(recipes){
    return recipes.map((recipe) => html ` 
    <article class="preview" @click=${() => page.redirect('/:id')}>
    
            <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <img src=${recipe.img}>
            </div>
        
    </article>
    `


    )
}