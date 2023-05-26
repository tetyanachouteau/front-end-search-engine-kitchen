import * as View from './view.js';
import * as Search from './search.js';

function searchDisplay(recettes){
    const searchvalue=document.getElementById('search').value;
    // on récupère les tags sélectionnes
    const tags = View.getSelectedTags();
    // on recherche les recettes qui correspond au tags sélectionnés et au champs de saise
    const recetteSelectionne = Search.seachRecette(recettes,searchvalue.toUpperCase(), tags);
    // on les affiches
    View.displayCards(recetteSelectionne, tags);
    
}
// récupère les données et les affiches
async function getData() {
    let recettesToutes = [];
    const response = await fetch('data/plats.json');
    recettesToutes= await response.json();

    // event keyup du champs de rechercher
    const searchinput = document.querySelector("#search");
    searchinput.addEventListener("keyup", () => {
        searchDisplay(recettesToutes);
    });
    
    // au début il n'y a pas de tags sélectionnés et toutes les recettes sont à afficher
    searchDisplay(recettesToutes);
}

getData();