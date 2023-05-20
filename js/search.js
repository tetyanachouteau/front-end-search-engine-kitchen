export function seachRecette(recettesToutes,text2search,tags) {
    let recetteSelectionne = [];

    if (text2search.length <= 3) {
        // TODO a revoir
        recetteSelectionne = recettesToutes;
    } else {
        recettesToutes.forEach(recette => {
            if (recette.name.toUpperCase().indexOf(text2search) != -1) {
                recetteSelectionne.push(recette);
            }else if(recette.description.toUpperCase().indexOf(text2search) != -1) {
                recetteSelectionne.push(recette);
            }else if(seachInIngredients(recette,text2search)) {
                recetteSelectionne.push(recette);
            }
        })
    }

    return recetteSelectionne;
}

function seachInIngredients(recette, text2search){
    return recette.ingredients.filter(ingredient => ingredient.ingredient.toUpperCase().indexOf(text2search) != -1).length > 0;
}

export default {
    seachRecette,
}