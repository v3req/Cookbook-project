start()
document.getElementById('logoutBtn').addEventListener('click', onLogOut)


async function start(){
    const accessToken = sessionStorage.getItem('accessToken');
    updateLinks(accessToken);

    let options = {
        method: 'get',
        headers: {}
    }
    
    if(accessToken){
        options.headers['X-Authorization'] = accessToken
    }

    const response = await fetch(`http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg`, options);

    if(!response.ok && response.status == 403){
        sessionStorage.removeItem(accessToken);
        window.location = '/register.html'
    }


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
            const accessToken = sessionStorage.getItem('accessToken');
    let options = {
        method: 'get',
        headers: {}
    }
    
    if(accessToken){
        options.headers['X-Authorization'] = accessToken
    }

        const response = await fetch(`http://localhost:3030/data/recipes/${recipe._id}`, options);
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

function updateLinks(hasUser){
    if(hasUser){
        document.getElementById('user').style.display = 'inline-block'
    }else {
        document.getElementById('guest').style.display = 'inline-block'
    }
}

function onLogOut(){
     
        fetch('http://localhost:3030/users/logout',{
            method: 'get',
            headers: {'X-Authorization': sessionStorage.getItem('accessToken')}
        })
    

    window.location = '/login.html'
}