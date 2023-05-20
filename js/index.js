import * as View from './view.js';
import * as Search from './search.js';




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

    View.initEvent(Search.seachRecette, recettesToutes);
    
    View.displayCards(recettesToutes);
}

getData();