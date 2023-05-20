function cleanUpTags(tags) {
    return tags.filter((el, index, array) => {
        return array.indexOf(el) == index && el
    });
}

function displayOptions(type, tab) {
    const divOptions = document.querySelector("#" + type + " .div-options");

    divOptions.innerHTML = ""

    tab.forEach(el => {
        const a = document.createElement("a");
        a.setAttribute("href", "#" + el.toLowerCase());
        a.addEventListener("click", clickTagDropDown);
        a.textContent = el.toLowerCase();
        divOptions.appendChild(a);
    })
}

function createTagButton(type, tag) {
    const tags = document.querySelector("#tags");
    const btn = document.createElement("button");
    btn.setAttribute("class", "btn " + type);
    btn.textContent = tag + " ";
    const i = document.createElement("i");
    i.setAttribute("class", "fa-regular fa-circle-xmark");
    i.addEventListener("click", (e) => {
        e.currentTarget.parentNode.remove();
    })
    btn.appendChild(i);
    tags.appendChild(btn);
}

// fonction quand on click sur les elements de la dropdown
// initialiser dans la fonction initEvent
let clickTagDropDown = (e) => {};    

export function displayCards(recettes) {
    const recettesDiv = document.querySelector("#recettes");

    // on vide la div de recettes
    recettesDiv.innerHTML = "";

    let ingredients = [];
    let appareils = [];
    let ustensiles = [];

    recettes.forEach(recette => {
        appareils.push(recette.appliance);
        ustensiles = ustensiles.concat(recette.ustensils);
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
        recette.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient);
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

    //Supprime les doublons
    ingredients = cleanUpTags(ingredients);
    ustensiles = cleanUpTags(ustensiles);
    appareils = cleanUpTags(appareils);

    displayOptions("ingredients", ingredients);
    displayOptions("ustensiles", ustensiles);
    displayOptions("appareils", appareils);
}

export function initEvent(seachRecette, recettesToutes) {

    const dropbtn = document.querySelectorAll(".dropbtn");
    dropbtn.forEach(el => {
        // quand on click sur le faux select
        el.addEventListener("click", (e) => {
            const btn = e.currentTarget;
            const div = document.querySelector("#" + btn.dataset.dropdown);
            //on affiche et on met le focus sur le champs de recherche
            div.style.display = "flex";
            const input = div.getElementsByTagName("input")[0];
            input.focus();
        })
    })

    const dropinput = document.querySelectorAll(".dropdown input");
    dropinput.forEach(el => {
        // recherche dans la liste des "options" (a)
        el.addEventListener("keyup", (e) => {
            const input = e.currentTarget;
            const filter = input.value.toUpperCase();
            const div = input.parentNode;
            const a = div.getElementsByTagName("a");
            for (let i = 0; i < a.length; i++) {
                let txtValue = a[i].textContent || a[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    a[i].style.display = "";
                } else {
                    a[i].style.display = "none";
                }
            }
        })
    })

    const searchinput = document.querySelector("#search");
    searchinput.addEventListener("keyup", (e) => {
        const recetteSelectionne = seachRecette(recettesToutes,e.currentTarget.value.toUpperCase())
        displayCards(recetteSelectionne);
    });

    clickTagDropDown = (e) => {
        // quand on perd le click sur le tag de la dropdown on cache la div
        const a = e.currentTarget;
        const div = a.parentNode.parentNode;
        div.style.display = "none";
        const tag = a.getAttribute("href").replace("#","");
        // on creer le tag
        createTagButton(div.id, tag);
        // puis on appelle la recherche
        const recetteSelectionne = seachRecette(recettesToutes,"",tag);
        displayCards(recetteSelectionne);
    }
}

export default {
    displayCards,
    initEvent
}