import * as View from './view.js';

let recettesToutes = [];

export function initData(recettes) {
    recettesToutes = recettes;
}

export function seachRecette() {
    const searchinput = document.querySelector("#search");
    const text2search = searchinput.value.toUpperCase();

    if (text2search.length <= 3) {
        // TODO a revoir
        //View.displayCards(recettesToutes);
    } else {
        let recetteSelectionne = []
        recettesToutes.forEach(recette => {
            if (recette.name.toUpperCase().indexOf(text2search) != -1) {
                recetteSelectionne.push(recette);
            }else if(recette.description.toUpperCase().indexOf(text2search) != -1) {
                recetteSelectionne.push(recette);
            }else if(seachInIngredients(recette,text2search)) {
                recetteSelectionne.push(recette);
            }
        })
        View.displayCards(recetteSelectionne);
    }
}

function seachInIngredients(recette, text2search){
    return recette.ingredients.filter(ingredient => ingredient.ingredient.toUpperCase().indexOf(text2search) != -1).length > 0;
}

export default {
    seachRecette,
    initData
}