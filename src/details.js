
import { e } from "./dom.js";

export async function showDetails(ev, id){
    const article = ev.currentTarget
   try {
    const res = await fetch(`http://localhost:3030/data/recipes/${id}`);

    if(!res.ok){
        const err = await res.json();
        throw err
    } 

    const data = await res.json();
    
            
    
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
    
    
} catch (err){
    alert(err.message)
}
     
}
