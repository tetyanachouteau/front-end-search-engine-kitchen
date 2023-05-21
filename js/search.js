export function seachRecette(recettesToutes, text2search, tags) {
    let recetteSelectionne = [];

    if (text2search.length <= 3 && tags.length == 0) {
        recetteSelectionne = recettesToutes;
    } else {
        recettesToutes.forEach(recette => {
            let recetteSelectionnable;

            if (text2search.length > 3) {
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
                tags.every((tag) => {
                    if (tag.type == "ustensiles") {
                        if (recetteSelectionnable.ustensils.filter((ustensile) => { return ustensile.toLowerCase() == tag.name }).length == 0) {
                            recetteSelectionnable = null;
                            return false;
                        }
                    }
                    if (tag.type == "ingredients") {
                        if (recetteSelectionnable.ingredients.filter((ingredient) => { 
                            return ingredient.ingredient.toLowerCase() == tag.name 
                        }).length == 0) {
                            recetteSelectionnable = null;
                            return false;
                        }
                    }
                    if (tag.type == "appareils") {
                        if (recetteSelectionnable.appliance.toLowerCase() != tag.name) {
                            recetteSelectionnable = null;
                            return false;
                        }
                    }
                    return true;
                })
            }

            if (recetteSelectionnable) {
                recetteSelectionne.push(recetteSelectionnable);
            }
        })
    }

    return recetteSelectionne;
}

function seachInIngredients(recette, text2search) {
    return recette.ingredients.filter(ingredient => ingredient.ingredient.toUpperCase().indexOf(text2search) != -1).length > 0;
}

export default {
    seachRecette,
}