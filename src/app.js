import { catalogTemplate } from "./views/catalogView.js";
import { createTemplate } from "./views/createView.js";
import { loginTemplate } from "./views/loginView.js";
import { registerTemplate } from "./views/registerView.js";
import { editTemplate } from "./views/editView.js";
import { detailsTemplate } from "./views/detailsView.js";

import { attachEventListener, renderToMain } from "./utils/renderHelper.js";
import { dataRequests } from "./utils/api.js";


import { getAllRecipes, getRecipeById } from "./recipes.js";

import { setNavigationBar } from "./utils/nav.js";
import { handleSubmit } from "./utils/formHelper.js";

setNavigationBar()

function getAccessToken() {
    return sessionStorage.getItem('accessToken');
}

function getUserId() {
    return sessionStorage.getItem('userId');
}

async function showCatalog(){
    const recipes = await getAllRecipes();
    console.log(recipes);
    
    setNavigationBar();

    renderToMain(catalogTemplate(recipes));
    
}

function showCreate(){
    renderToMain(createTemplate());
    attachEventListener('form', 'submit', (e) => handleSubmit(e, 'data/recipes', {'Content-Type': 'application/json', 'X-Authorization': getAccessToken()}, 'post'));
    
}

function showLogin(){
    renderToMain(loginTemplate())
    attachEventListener('form', 'submit', (e) => handleSubmit(e, 'users/login', {'Content-Type': 'application/json'}, 'post'));
    
}

function showRegister(){
    renderToMain(registerTemplate());
    attachEventListener('form', 'submit', (e) => handleSubmit(e, 'users/register', {'Content-Type': 'application/json'}, 'post'));
    
}

function showEdit(ctx){
    renderToMain(editTemplate());
     attachEventListener('form', 'submit', (e) => handleSubmit(e, `data/recipes/${ctx.params.id}`, {'Content-Type': 'application/json', 'X-Authorization': getAccessToken()}, 'put'));
}

async function showDetails(ctx){
    const recipe = await getRecipeById(ctx.params.id);
    renderToMain(detailsTemplate(recipe, getUserId()))
}

function showDelete(ctx){
    const confirmed = confirm('Are you sure you want to delte this recipe?');
    if(!confirmed){
        page.redirect(`/${ctx.params.id}`)
    };

    dataRequests(`http://localhost:3030/data/recipes/${ctx.params.id}`, {
        method: 'delete',
        headers:{'Content-Type': 'application/json', 'X-Authorization': getAccessToken()}
    });

    document.querySelector('article').replaceChildren(`<h2>Recipe deleted.</h2>`);
    setTimeout(() => page.redirect('/'), 2000);
}
async function logout(){
        await fetch('http://localhost:3030/users/logout', {
                method: 'get',
                headers: {
                    'X-Authorization': getAccessToken()
                },
            });
            
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('userId')
                setNavigationBar();
                
                showCatalog();
                
            
            
        
}




page('/', showCatalog);
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);
page('/:id/edit', showEdit);
page('/:id/delete', showDelete);
page('/:id', showDetails)

page()