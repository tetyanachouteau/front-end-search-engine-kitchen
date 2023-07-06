// rend accessible la methode searchRecette via l'import 
// cette fonction permet de sélectionner (filtrer) les recettes par le texte recherché (text2seach) et les tags
// séléctionnés par l'utilisateur (ceux en ligne sous le texte)
export function seachRecette(recettesToutes, text2search, tags) {
    // variable qui va contenir les recettes sélectionnées
    let recetteSelectionne = [];
    //debugger;
    if (text2search.length < 3 && tags.length == 0) {
        // si pas assez de lettre dans le texte et qu'il n'y a pas de tag sélectionner alors
        // la section c'est toutes les recettes
        recetteSelectionne = recettesToutes;
    } else {
        // sinon pour parcours toutes les recettes pour récupérer celles qui correspondant à la recherche :
        // text2seach et tags
        recettesToutes.forEach(recette => {
            // variable qui contient la recette qui est potentiellement sélecitonnable
            // C'est à dire qui a le texte recheché et les tag associé
            // Comme on fait d'abord la recherche du texte puis celles des tags
            // la recette contient peut-être le texte mais pas les tags
            let recetteSelectionnable;

            // recherche sur le texte
            if (text2search.length > 2) {
                // recherche dans le titre
                // Donc on transforme le texte du titre en mahjuscule (UpperCase) puis
                // on cherche la position (indexof) dans ce texte de la saisie utilisateur (qui a été mise en maj 
                // avant de rentrer dans la fonction). Si -1 => pas trouvé donc la recette n'est pas selectionnable
                if (recette.name.toUpperCase().indexOf(text2search) != -1) {
                    // le texte est trouvé (!=-1) donc la recette est selectionnable 
                    recetteSelectionnable = recette;
                // idem pour decription
                } else if (recette.description.toUpperCase().indexOf(text2search) != -1) {
                    recetteSelectionnable = recette;
                // appel de la fonction de rechercher dans les ingredients (qui est un tableau) du texte
                } else if (seachInIngredients(recette, text2search)) {
                    // si on a trouvé le texte dans les ingredients, la recette est séléectionnable
                    recetteSelectionnable = recette;
                }
            } else {
                // si pas assez de texte à chercher (<2 caractères) alors par 
                // défaut la recette est séléectionnable
                recetteSelectionnable = recette;
            }

            // maintenant on vérifie les tags 
            if (tags.length > 0 && recetteSelectionnable) {
                // on a des tags selectionnés par l'utilisateur et on a trouvé une recette qui contient le texte
                // on parcours tous les tags séléctionné par l'utilisateur.
                // on utilise every pour pouvoir s'arrête dès qu'un tag n'est pas trouvé 
                // si on utilisait foreach on ne peut pas s'arrêté avant d'avoir tout parcourus
                tags.every((tag) => {
                    // on vérifie que le tag qu'on regarde est de type ustensile
                    if (tag.type == "ustensiles") {
                        // on filter les ustensiles de la recette pour savoir si on 
                        // trouve celui du tag selectionné c'est à dire que le tableau
                        // d'ustensile filtré à une taille > 0
                        if (recetteSelectionnable.ustensils.filter((ustensile) => {
                                return ustensile.toLowerCase() == tag.name
                            }).length == 0) {
                            // si pas trouvé la recette n'est pas selectionnalbe donc 
                            // on remets rectteSelectionnalbe à pas de valeur (null)
                            recetteSelectionnable = null;
                            // et on arrête de parcourir les tags car
                            // peut importe les autres tags la recette ne corresponde pas
                            // à la rechercher
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

            // on vérifie si après tous nos filtre il y a bien une recette
            // selectionnable c'est à dire non null
            if (recetteSelectionnable) {
                // si c'est le cas, on met la recette dans le tableau 
                // des recettes séléectionnées
                recetteSelectionne.push(recetteSelectionnable);
            }
        })
    }
    // la fonction affiché la taille (chiffre) du tableau de recette sélectionnées
    console.log("voilà", recetteSelectionne.length);
    // la fonction retour le tableau des recttes selectionnées
    return recetteSelectionne;

}

function seachInIngredients(recette, text2search) {
    // 1. on récupère le tableau d'ingredient de la recette (recette.ingredients)
    // 2. on filtre ce tableau (filter)
    // 2a. chaque ingredient est réprésenter pas la variable ingredient 
    // 2b. pour chaque ingredient on recupère son nom (ingredient.ingredient)
    //     json:  "ingredients": [
    //          {
    //              "ingredient" : "Lait de coco",
    // 2c. on met en majucule et on cherche la position (indexof) dans le texte de la saisie utilisateur 
    // 2d. si != -1, c'est à dire trouvé car on a une position, le test renvoie vrai et donc l'ingredient 
    // est conservé par le filter
    // 3. On teste si on a trouvé des ingredient, c'est à dire que le tableau d'ingredients filtré à une taille (lenght) plus 
    // grande que 0.
    // 4. On retourne vrai si le texte à été trouvé dans les ingredients de la recette sinon faux
    return recette.ingredients.filter(ingredient => ingredient.ingredient.toUpperCase().indexOf(text2search) != -1).length > 0;
}

// javascript module, on donc accès la methode searchRecette à toutes les modules
// qui ferons l'import search (pour nous index)
export default {
    seachRecette,
}