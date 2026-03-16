import { html } from 'src/utils/litHtml.js';

export function createTemplate(){
    return html `
    <article>
                <h2>New Recipe</h2>
                <form>
                    <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                    <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                    <label class="ml">Ingredients: <textarea name="ingredients"
                            placeholder="Enter ingredients on separate lines"></textarea></label>
                    <label class="ml">Preparation: <textarea name="steps"
                            placeholder="Enter preparation steps on separate lines"></textarea></label>
                    <input type="submit" value="Create Recipe">
                </form>
            </article>
    `
}