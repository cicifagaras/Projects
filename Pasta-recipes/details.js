let recipe = {};

let url = "https://preparation-details-default-rtdb.europe-west1.firebasedatabase.app/"

let index = window.location.search.substring(4);
if (index.length < 1) {
    window.location = "index.html";
}

async function getData() {
    const response = await fetch(url + index + ".json");
    recipe = await response.json();
    draw();
}


function draw() {
    document.querySelector("#title").innerHTML = recipe.title;

    let image;
    if (recipe.image === undefined) {
        image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkSkrPvh4qinHIBymIlTWZmqNASg5AfZrldQ&usqp=CAU";
    } else {
        image = recipe.image;
    }
    document.querySelector("#image").src = recipe.image;

    for (let i = 0; i < recipe.ingredients.length; i++) {
        let ingredients = recipe.ingredients[i];
        let ul = document.querySelector("#ingredients");
        let li = document.createElement("li");   
        li.appendChild(document.createTextNode(ingredients));
        ul.appendChild(li);
    }

    document.querySelector("#preparation").innerText = recipe.preparation;
}