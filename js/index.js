import * as View from './view.js';
import * as Search from './search.js';

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
searchinput.addEventListener("keyup",Search.seachRecette);


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

    Search.initData(recettesToutes);
    
    View.displayCards(recettesToutes);
}

getData();