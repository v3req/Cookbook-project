start()


async function start(){
   const response = await fetch(`http://localhost:3030/jsonstore/cookbook/recipes`)
   const data = await response.json()
    showRecipes(data)
}

function showRecipes(data){
    const main = document.querySelector('main');
    const recipes = Object.values(data);

    main.replaceChildren(...recipes.map(createPreview));

    
    
}

function createPreview(recipe){
    const result = document.createElement('article');
    result.className = 'preview';

    result.innerHTML = `
            <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <img src="${recipe.img}">
            </div>
    ` ;  
    result.addEventListener('click', async () => {
        const response = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${recipe._id}`);
        const data = await response.json();
        console.log(data);
        
        result.innerHTML = `<h2>${recipe.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src="${recipe.img}">
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
            </div>`
    });

    return result;
}

