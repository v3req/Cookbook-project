import { catalogTemplate } from "src/views/catalogView.js";
import { createTemplate } from "src/views/createView.js";
import { loginTemplate } from "src/views/loginView.js";
import { registerTemplate } from "src/views/registerView.js";
import { editTemplate } from "src/views/editView.js";
import { detailsTemplate } from "src/views/detailsView.js";

import { renderToMain } from "./utils/renderHelper";


function showCatalog(){
    renderToMain(catalogTemplate())
}

function showCreate(){
    renderToMain(createTemplate())
}

function showLogin(){
    renderToMain(loginTemplate())
}

function showRegister(){
    renderToMain(registerTemplate())
}

function showEdit(ctx){
    renderToMain(editTemplate())
}

function showDetails(ctx){
    renderToMain(detailsTemplate())
}




page('/', showCatalog);
page('/create', showCreate);
page('/login', showLogin);
page('/reguster', showRegister);
page('/:id/edit', showEdit);
page('/:id', showCatalog)

page()