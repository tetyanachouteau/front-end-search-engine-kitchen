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
        View.displayCards(recettesToutes);
    } else {
        let recetteSelectionne = []
        recettesToutes.forEach(recette => {
            if (text2search.length > 3) {
                if (recette.name.toUpperCase().indexOf(text2search) != -1) {
                    recetteSelectionne.push(recette);
                }
            }
        })
        View.displayCards(recetteSelectionne);
    }


}

export default {
    seachRecette,
    initData
}