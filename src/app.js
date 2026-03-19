import { catalogTemplate } from "./views/catalogView.js";
import { createTemplate } from "./views/createView.js";
import { loginTemplate } from "./views/loginView.js";
import { registerTemplate } from "./views/registerView.js";
import { editTemplate } from "./views/editView.js";
import { detailsTemplate } from "./views/detailsView.js";

import { attachEventListener, renderToMain } from "./utils/renderHelper.js";



import { getAllRecipes, getRecipeById } from "./recipes.js";

import { setNavigationBar } from "./utils/nav.js";
import { handleSubmit } from "./utils/formHelper.js";

setNavigationBar()

const accessToken = sessionStorage.getItem('accessToken')
const userId = sessionStorage.getItem('userId')

async function showCatalog(){
    const recipes = await getAllRecipes();
    
    renderToMain(catalogTemplate(recipes));
    
}

function showCreate(){
    renderToMain(createTemplate());
    attachEventListener('form', 'submit', (e) => handleSubmit(e, 'data/recipes', {'Content-Type': 'application/json', 'X-Authorization': accessToken}));
    
}

function showLogin(){
    renderToMain(loginTemplate())
    attachEventListener('form', 'submit', (e) => handleSubmit(e, 'users/login', {'Content-Type': 'application/json'}));
    
}

function showRegister(){
    renderToMain(registerTemplate());
    attachEventListener('form', 'submit', (e) => handleSubmit(e, 'users/register', {'Content-Type': 'application/json'}));
    
}

function showEdit(ctx){
    renderToMain(editTemplate())
}

async function showDetails(ctx){
    const recipe = await getRecipeById(ctx.params.id);
    renderToMain(detailsTemplate(recipe, userId))
}




page('/', showCatalog);
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);
page('/:id/edit', showEdit);
page('/:id', showDetails)

page()