import { html } from '../utils/litHtml.js';

export function editTemplate(){
    return html`
    <article>
                <h2>Edit Recipe</h2>
                <form>
                    <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                    <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                    <label class="ml">Ingredients: <textarea name="ingredients"
                            placeholder="Enter ingredients on separate lines"></textarea></label>
                    <label class="ml">Preparation: <textarea name="steps"
                            placeholder="Enter preparation steps on separate lines"></textarea></label>
                    <input type="submit" value="Update Recipe">
                </form>
            </article>
    `
}