//rend accessible la méthode searchRecette via l'import
export function seachRecette(recettesToutes, text2search, tags) {
    let recetteSelectionne = [];
    //debugger;

    // Vérifier si le texte de recherche est inférieur à 3 caractères et s'il n'y a pas de tags sélectionnés
    if (text2search.length < 3 && tags.length == 0) {
        // Si c'est le cas, sélectionner toutes les recettes disponibles
        recetteSelectionne = recettesToutes;
    } else {
        // Parcourir toutes les recettes disponibles
        for (let i = 0; i < recettesToutes.length; i++) {
            let recette = recettesToutes[i];
            let recetteSelectionnable;

            // Vérifier si le texte de recherche est supérieur à 2 caractères
            if (text2search.length > 2) {
                // Vérifier si le texte de recherche est présent dans le nom de la recette, la description ou les ingrédients
                if (recette.name.toUpperCase().indexOf(text2search) != -1) {
                    recetteSelectionnable = recette;
                } else if (recette.description.toUpperCase().indexOf(text2search) != -1) {
                    recetteSelectionnable = recette;
                } else if (seachInIngredients(recette, text2search)) {
                    recetteSelectionnable = recette;
                }
            } else {
                // Si le texte de recherche est inférieur ou égal à 2 caractères, la recette est sélectionnable
                recetteSelectionnable = recette;
            }

            // Vérifier s'il y a des tags sélectionnés et si la recette est sélectionnable
            if (tags.length > 0 && recetteSelectionnable) {
                // Parcourir tous les tags sélectionnés
                for (let j = 0; j < tags.length; j++) {
                    let tag = tags[j];
                    if (tag.type == "ustensiles") {
                        let isFoundUstensile = false;
                        // Vérifier si l'ustensile est présent dans la liste d'ustensiles de la recette
                        for (let k = 0; k < recetteSelectionnable.ustensils.length; k++) {
                            if (recetteSelectionnable.ustensils[k].toLowerCase() == tag.name) {
                                isFoundUstensile = true;
                                break;
                            }
                        }
                        // Si l'ustensile n'est pas trouvé, la recette n'est pas sélectionnable
                        if (!isFoundUstensile) {
                            recetteSelectionnable = null;
                            break;
                        }
                    }
                    if (tag.type == "ingredients") {
                        let isFoundIngredient = false;
                        // Vérifier si l'ingrédient est présent dans la liste d'ingrédients de la recette
                        for (let k = 0; k < recetteSelectionnable.ingredients.length; k++) {
                            if (recetteSelectionnable.ingredients[k].ingredient.toLowerCase() == tag.name) {
                                isFoundIngredient = true;
                                break;
                            }
                        }
                        // Si l'ingrédient n'est pas trouvé, la recette n'est pas sélectionnable
                        if (!isFoundIngredient) {
                            recetteSelectionnable = null;
                            break;
                        }
                    }
                    if (tag.type == "appareils") {
                        // Vérifier si l'appareil de la recette correspond au tag sélectionné
                        if (recetteSelectionnable.appliance.toLowerCase() != tag.name) {
                            recetteSelectionnable = null;
                            break;
                        }
                    }
                }
            }

            // Si la recette est sélectionnable, l'ajouter à la liste des recettes sélectionnées
            if (recetteSelectionnable) {
                recetteSelectionne.push(recetteSelectionnable);
            }
        }
    }
    console.log("Il était trouvé : ", recetteSelectionne.length);
    return recetteSelectionne;
}

// Fonction auxiliaire pour rechercher dans les ingrédients d'une recette
function seachInIngredients(recette, text2search) {
    let ingredientFiltre = [];
    // Parcourir tous les ingrédients de la recette
    for (let i = 0; i < recette.ingredients.length; i++) {
        let ingredient = recette.ingredients[i];
        // Vérifier si le texte de recherche est présent dans l'ingrédient
        if (ingredient.ingredient.toUpperCase().indexOf(text2search) != -1) {
            ingredientFiltre.push(ingredient);
        }
    }
    // Renvoyer true si au moins un ingrédient correspond, sinon false
    return ingredientFiltre.length > 0;
}

// Exporter la méthode seachRecette en tant qu'export par défaut
export default {
    seachRecette,
}
