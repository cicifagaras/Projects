console.log("main.js loaded...");

let list = {};

let url = "https://restaurant-menu-fde28-default-rtdb.europe-west1.firebasedatabase.app/"


window.onload = function() {getData()};
async function getData() {
    document.querySelector("#loading").classList.remove("hidden");

    const response = await fetch(url + ".json");
    list = await response.json();

    document.querySelector("#loading").classList.add("hidden");
    draw();
}


function draw() {
    let searchedWord = document.querySelector(`[name="search"]`).value;

    var str = "";
    for (let [i, prep] of Object.entries(list)) {
        if (prep === null) {
            continue;
        }
        let picture;
        if (prep.image === undefined) {
            picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkSkrPvh4qinHIBymIlTWZmqNASg5AfZrldQ&usqp=CAU";
        } else {
            picture = prep.image;
        }
        if (prep.ingredients.includes(searchedWord)) {
            str += ` 
                        <div id="rec_${i}" class="recipe">
                            <img class="image" src="${picture}">
                            <div class="description">
                                <h3 class="title">${prep.title}</h3>
                                <h4>Ingredients:</h4>
                                <p class="ingredients">${prep.ingredients}</p>
                            </div>
                            <a href="details.html?id=${i}"><button class="details">Details</button></a>
                        </div>
            `
        }
    }
    document.querySelector("#recipes").innerHTML = str;
}