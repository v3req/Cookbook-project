import { dataRequests } from "./utils/api.js";

const accessToken = sessionStorage.getItem('accessToken')

export async function getAllRecipes(){
    let options = {
        method: 'get',
        headers: {}
    }

    if(accessToken) {
        options.headers['X-Authorization'] = accessToken
    }

    const recipes = await dataRequests('http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg', options);
    
    
    return recipes
}

export async function getRecipeById(id){
    let options = {
        method: 'get',
        headers: {}
    }

    if(accessToken) {
        options.headers['X-Authorization'] = accessToken
    }

    const recipe = await dataRequests(`http://localhost:3030/data/recipes/${id}`, options);
    return recipe
}