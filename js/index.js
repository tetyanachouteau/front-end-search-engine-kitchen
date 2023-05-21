import * as View from './view.js';
import * as Search from './search.js';

// récupère les données et les affiches
async function getData() {
    let recettesToutes = [];
    await fetch('data/plats.json')
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (json) {
            recettesToutes = json;
        });

    // event keyup du champs de rechercher
    const searchinput = document.querySelector("#search");
    searchinput.addEventListener("keyup", (e) => {
        // on récupère les tags sélectionnes
        const tags = View.getSelectedTags();
        // on recherche les recettes qui correspond au tags sélectionnés et au champs de saise
        const recetteSelectionne = Search.seachRecette(recettesToutes,e.currentTarget.value.toUpperCase(), tags);
        // on les affiches
        View.displayCards(recetteSelectionne, tags);
    });

    // au début il n'y a pas de tags sélectionnés et toutes les recettes sont à afficher
    View.displayCards(recettesToutes, []);
}

getData();