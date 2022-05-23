let state = [];

function draw() {
    let table = document.querySelector("#list tbody");
    let string = "";

    for (let i = 0; i < state.length; i++) {

        if (state[`${i}`]["checked"]) {
            string += `
                            <tr>
                                <td class="items marked">${state[`${i}`]["item"]}</td>
                                <td><button class="markButtons" onclick="markAsBought(${i})">Mark as bought</td>
                            </tr>
                    `;
        } else {
            string += `
                    <tr>
                        <td class="items">${state[`${i}`]["item"]}</td>
                        <td><button class="markButtons" onclick="markAsBought(${i})">Mark as bought</td>
                    </tr>
                `;
        }

    }
    table.innerHTML = string;
}


function addItem(event) {
    event.preventDefault();
    let itemName = document.querySelector(`[name = "item"]`).value;

    if (itemName !== "") {
        state.push({
            item: itemName,
            checked: false
        })
        document.querySelector(`[name = "item"]`).value = "";
    }
    draw();
}


function markAsBought(index) {
    let items = document.querySelectorAll(".items");
    items[index].classList.add("marked");
    state[`${index}`]["checked"] = true;
}

function sortAsc() {
    state.sort(function (a, b) {
        return (a.item.toLowerCase() > b.item.toLowerCase()) ? 1 : ((b.item.toLowerCase() > a.item.toLowerCase()) ? -1 : 0)
    })
    draw();
}


function sortDesc() {
    state.sort(function (a, b) {
        return (a.item.toLowerCase() < b.item.toLowerCase()) ? 1 : ((b.item.toLowerCase() < a.item.toLowerCase()) ? -1 : 0)
    })
    draw();
}