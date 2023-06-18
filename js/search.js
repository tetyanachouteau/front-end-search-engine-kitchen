// rend accessible la methode searchRecette via l'import 
export function seachRecette(recettesToutes, text2search, tags) {
    let recetteSelectionne = [];
    //debugger;
    if (text2search.length <3 && tags.length == 0) {
        recetteSelectionne = recettesToutes;
    } else {
        for(let i = 0 ; i < recettesToutes.length ; i++){
            let recette = recettesToutes[i];
            let recetteSelectionnable;

            if (text2search.length >2) {
                if (recette.name.toUpperCase().indexOf(text2search) != -1) {
                    recetteSelectionnable = recette;
                } else if (recette.description.toUpperCase().indexOf(text2search) != -1) {
                    recetteSelectionnable = recette;
                } else if (seachInIngredients(recette, text2search)) {
                    recetteSelectionnable = recette;
                }
            } else {
                recetteSelectionnable = recette;
            }

            if (tags.length > 0 && recetteSelectionnable) {
                for(let j = 0 ; j < tags.length ; j++){
                    let tag = tags[j];
                    if (tag.type == "ustensiles") {
                        let isFoundUstensile = false
                        for(let k = 0; k < recetteSelectionnable.ustensils.length ; k ++){
                            if(recetteSelectionnable.ustensils[k].toLowerCase() == tag.name){
                                isFoundUstensile = true;
                                break;
                            }
                        }
                        if (!isFoundUstensile) {
                            recetteSelectionnable = null;
                            break;
                        }
                    }
                    if (tag.type == "ingredients") {
                        let isFoundIngredient = false
                        for(let k = 0; k < recetteSelectionnable.ingredients.length ; k ++){
                            if(recetteSelectionnable.ingredients[k].ingredient.toLowerCase() == tag.name){
                                isFoundIngredient = true;
                                break;
                            }
                        }
                        if (!isFoundIngredient) {
                            recetteSelectionnable = null;
                            break;
                        }
                    }
                    if (tag.type == "appareils") {
                        if (recetteSelectionnable.appliance.toLowerCase() != tag.name) {
                            recetteSelectionnable = null;
                            break;
                        }
                    }
                }
            }

            if (recetteSelectionnable) {
                recetteSelectionne.push(recetteSelectionnable);
            }
        }
    }
    console.log("Il était trouvé : ", recetteSelectionne.length);
    return recetteSelectionne;

}

function seachInIngredients(recette, text2search) {
    let ingredientFiltre = [];
    for(let i = 0 ; i < recette.ingredients.length ; i++){
        let ingredient = recette.ingredients[i];
        if(ingredient.ingredient.toUpperCase().indexOf(text2search) != -1){
            ingredientFiltre.push(ingredient);
        }
    }
    return ingredientFiltre.length > 0;
}

export default {
    seachRecette,
}