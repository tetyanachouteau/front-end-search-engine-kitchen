function cleanUpTags(tags, selectedTags) {
    return tags.filter((tag, index, array) => {
        // on supprimer les doublons ( = l'index de l'element n'est pas le premier index trouvé dans le tableau)
        // on supprimer les éventuels element vides
        // on supprimer le tag si il a été trouvé dans la liste des tags séléectionnés pour la recherche
        return array.indexOf(tag) == index && tag && selectedTags.filter((selectedTag) => {
            return selectedTag.name == tag
        }).length == 0;
    }).sort(new Intl.Collator('fr').compare);
}

function simuleKeyUp() {
    // on recherche l'input d'id seach et on lance l'event appuie sur la touche enter
    document.querySelector("#search").dispatchEvent(new KeyboardEvent('keyup', {
        'key': 'Enter'
    }));
}

// utiliser pour rafraichir la recherche des dropbox après une nouvelle recherche
function simuleKeyUpDropBox() {
    // on recherche l'input des dropbox et on lance l'event appuie sur la touche enter
    document.querySelectorAll(".dropdown-content input").forEach((dropdox) => dropdox.dispatchEvent(new KeyboardEvent('keyup', {
        'key': 'Enter'
    })));
}

function displayOptions(type, tab) {
    // on cherche la div qui contient les "options"
    const divOptions = document.querySelector("#" + type + " .div-options");

    // on la vide
    divOptions.innerHTML = ""

    // pour tous les tag du type en court on créer la balise a 
    tab.forEach(el => {
        const a = document.createElement("a");
        a.setAttribute("href", "#" + el);
        a.addEventListener("click", (e) => {
            // quand on click sur le tag de la dropdown on cache la div
            const a = e.currentTarget;
            const div = a.parentNode.parentNode;
            div.style.display = "none";
            // on creer le tag
            createTagButton(div.id, a.textContent);
            // simule la saisie sur le champs de recherche pour lancer la recherche
            simuleKeyUp();
        });
        // première lettre en Majuscule et reste ne change pas
        a.textContent = el.charAt(0).toUpperCase() + el.slice(1);
        divOptions.appendChild(a);
    })
}

// fonction qui crée le bouton de tag 
function createTagButton(type, tag) {
    const tags = document.querySelector("#tags");
    const btn = document.createElement("button");
    btn.setAttribute("class", "btn " + type);
    btn.textContent = tag + " ";
    const i = document.createElement("i");
    i.setAttribute("class", "fa-regular fa-circle-xmark");
    // si on click sur le i (= croix) alors on suppimer le a du i 
    // et on relance la recherche sans le tag
    i.addEventListener("click", (e) => {
        e.currentTarget.parentNode.remove();
        // simule la saisie sur le champs de recherche pour lancer la recherche
        simuleKeyUp();
    })
    btn.appendChild(i);
    tags.appendChild(btn);
}

// fonction qui récupères tous les tags btn html créée
// et retourne leurs types et leur valeur
export function getSelectedTags() {
    // on récupère tous les tags créés
    const tags = document.querySelectorAll("#tags button");
    const tagsInfo = [];
    tags.forEach((tag) => {
        tagsInfo.push({
            name: tag.textContent.toLowerCase().trim(),
            type: tag.className.replace("btn", "").trim()
        });
    })

    return tagsInfo;
}

// affiche toutes les cartes de recettres
// Récupère les élements de tags correspondant à la recette
// les nettoye et les affichent
export function displayCards(recettes, tags) {
    const recettesDiv = document.querySelector("#recettes");

    // on vide la div de recettes
    recettesDiv.innerHTML = "";

    let ingredients = [];
    let appareils = [];
    let ustensiles = [];

    recettes.forEach(recette => {
        // ajout les appareils de la recettes dans la liste des tags appareils
        appareils.push(recette.appliance.toLowerCase());
        // ajout les ustensiles de la recttes dans la liste des tags ustensiles
        ustensiles = ustensiles.concat(recette.ustensils.map((ustensile) => {
            return ustensile.toLowerCase();
        }));
        // crée le html de la carte recette
        const divCard = document.createElement("div");
        divCard.setAttribute("class", "card recipe");
        const divCardImg = document.createElement("div");
        divCardImg.setAttribute("class", "card-img-top gray");
        divCard.appendChild(divCardImg);
        const divCardBody = document.createElement("div");
        divCardBody.setAttribute("class", "card-body");
        const divCardHeader = document.createElement("div")
        divCardHeader.setAttribute("class", "cardHeader");
        const spanTitle = document.createElement("span");
        spanTitle.setAttribute("class", "title");
        spanTitle.textContent = recette.name;
        const spanTime = document.createElement("span");
        spanTime.setAttribute("class", "time");
        const icon = document.createElement("i");
        icon.setAttribute("class", "fa-regular fa-clock");
        spanTime.textContent = " " + recette.time + " min";
        // pour mettre l'icone avant le texte
        spanTime.prepend(icon);
        divCardHeader.appendChild(spanTitle);
        divCardHeader.appendChild(spanTime);
        divCardBody.appendChild(divCardHeader);
        const divCardContent = document.createElement("div");
        divCardContent.setAttribute("class", "cardContent");
        const ul = document.createElement("ul");
        ul.setAttribute("class", "cardIngredients");
        // parcours des ingredients pour les afficher
        // et recupérer les ingredients de la recette pour les tags
        recette.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient.toLowerCase());
            const li = document.createElement("li");
            li.textContent = ingredient.ingredient + (ingredient.quantity ? ": " + ingredient.quantity : "") + (ingredient.unit ? " " + ingredient.unit : "");
            ul.appendChild(li);
        })
        divCardContent.appendChild(ul);
        const cardDescription = document.createElement("p");
        cardDescription.setAttribute("class", "cardDescription");
        cardDescription.textContent = recette.description;
        divCardContent.appendChild(cardDescription);
        divCardBody.appendChild(divCardContent);
        divCard.appendChild(divCardBody);

        recettesDiv.appendChild(divCard);
    })

    // si aucune recette trouvée la div est vide
    if (recettesDiv.innerHTML == "") {
        // on ajouter un titre qui indique qu'il n'y a pas de résultat
        recettesDiv.innerHTML = "<h3>Aucun résultat trouvé. Modifiez vos critères de recherche...</h3>"
    }

    //Supprime les doublons des tags (car pluiseurs recettes peuvent avoir les mêmes élements)
    ingredients = cleanUpTags(ingredients, tags.filter((tag) => {
        return tag.type == "ingredients"
    }));
    ustensiles = cleanUpTags(ustensiles, tags.filter((tag) => {
        return tag.type == "ustensiles"
    }));
    appareils = cleanUpTags(appareils, tags.filter((tag) => {
        return tag.type == "appareils"
    }));

    //remplit les options de tags (donc filtrés par rapport au recettes sélectionné et au tags déjà sélectionnées)
    displayOptions("ingredients", ingredients);
    displayOptions("ustensiles", ustensiles);
    displayOptions("appareils", appareils);

    // rafaichi la recherche dans la dropbox après une nouvelle recherche
    simuleKeyUpDropBox();
}

// event qui affiche la dropbox 
const dropbtn = document.querySelectorAll(".dropbtn");
dropbtn.forEach(el => {
    // quand on click sur le faux select
    el.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        // ferme toutes les dropdowns
        const divs = document.querySelectorAll(".dropdown-content");
        divs.forEach(div => {
            div.style.display = "none";
        })
        // cherche la dropdown correspondante au bouton
        const div = document.querySelector("#" + btn.dataset.dropdown);
        //on affiche et on met le focus sur le champs de recherche
        div.style.display = "flex";
        const input = div.getElementsByTagName("input")[0];
        input.focus();
    })
})

// event de saisie de filtrage des tags 
const dropinput = document.querySelectorAll(".dropdown input");
dropinput.forEach(el => {
    // recherche dans la liste des "options" (a)
    el.addEventListener("keyup", (e) => {
        // récupère le texte recherché dans la dropbox
        const input = e.currentTarget;
        const filter = input.value.trim().toUpperCase();

        // récupère les a dans la dopbox (option)
        const div = input.parentNode;
        const as = div.querySelectorAll("a");
        as.forEach((a) => {
            let txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "") {
                a.style.display = "";
            } else {
                a.style.display = "none";
            }
        })
    })
})

// event qui ferme la dropbox
const iUp = document.querySelectorAll(".dropdown-content i");
iUp.forEach(el => {
    // quand on click sur le faux select
    el.addEventListener("click", (e) => {
        const div = e.currentTarget.parentNode;
        //on masque la div
        div.style.display = "none";
    })
})

export default {
    displayCards
}