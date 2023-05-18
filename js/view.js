export function displayCards(recettes){
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
        divCard.setAttribute("class","card recipe");
        const divCardImg = document.createElement("div");
        divCardImg.setAttribute("class","card-img-top gray");
        divCard.appendChild(divCardImg);
        const divCardBody = document.createElement("div");
        divCardBody.setAttribute("class","card-body");
        const divCardHeader = document.createElement("div")
        divCardHeader.setAttribute("class","cardHeader");
        const spanTitle = document.createElement("span");
        spanTitle.setAttribute("class","title");
        spanTitle.textContent = recette.name;
        const spanTime = document.createElement("span");
        spanTime.setAttribute("class","time");
        const icon = document.createElement("i");
        icon.setAttribute("class","fa-regular fa-clock");
        spanTime.textContent = " " + recette.time + " min";
        // pour mettre l'icone avant le texte
        spanTime.prepend(icon);
        divCardHeader.appendChild(spanTitle);
        divCardHeader.appendChild(spanTime);
        divCardBody.appendChild(divCardHeader);
        const divCardContent = document.createElement("div");
        divCardContent.setAttribute("class","cardContent");
        const ul = document.createElement("ul");
        ul.setAttribute("class","cardIngredients");
        recette.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient);
            const li = document.createElement("li");
            li.textContent = ingredient.ingredient + (ingredient.quantity ? ": " + ingredient.quantity : "") + (ingredient.unit ? " " + ingredient.unit : "");
            ul.appendChild(li);
        })
        divCardContent.appendChild(ul);
        const cardDescription = document.createElement("p");
        cardDescription.setAttribute("class","cardDescription");
        cardDescription.textContent = recette.description;
        divCardContent.appendChild(cardDescription);
        divCardBody.appendChild(divCardContent);
        divCard.appendChild(divCardBody);

        recettesDiv.appendChild(divCard);
    })

    displayOptions("ingredients",ingredients);
    displayOptions("ustensiles",ustensiles);
    displayOptions("appareils",appareils);
}

function displayOptions(type, tab){
    const divOptions = document.querySelector("#"+type+" .div-options");

    divOptions.innerHTML = ""

    tab.forEach(el => {
        const a = document.createElement("a");
        a.setAttribute("href","#" + el.toLowerCase());
        a.textContent = el.toLowerCase();
        divOptions.appendChild(a);
    })
}

export default {
    displayCards,    
}