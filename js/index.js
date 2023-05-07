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
        for (i = 0; i < a.length; i++) {
            let txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    })
    // quand on perd le focus on cache la div
    // click sur un "option" ou click hors de la div
    el.addEventListener("blur", (e) => {
        const input = e.currentTarget;
        const div = input.parentNode;
        div.style.display = "none";
    })
})

async function getData() {
    let recettes = [];

    await fetch('data/plats.json')
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (json) {
            recettes = json;
        });
    
    displayRecette(recettes);
}

function displayRecette(recettes){
    const recettesDiv = document.querySelector("#recettes");

    // on vide la div de recettes
    recettes.innerHtml = "";

    recettes.forEach(recette => {
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
}

getData();