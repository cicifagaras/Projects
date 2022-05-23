console.log("main.js loaded...");

let state = {
    list: [],
    indexEdit: null,
}

window.onload = function drawPage() {};

function drawPage() {
    let table = document.querySelector("tbody");
    let string = "";
    for (let i = 0; i < state.list.length; i++) {
        let element = state.list[i];
        string += `
            <tr>
                <td class="tableContent">${element.nickname}</td>
                <td class="tableContent">${element.number}</td>
                <td>
                    <a href="#" onclick="editElement(${i})">Modify</a>
                </td>
                <td>
                    <a href="#" onclick="deleteElement(${i})">Delete</a>
                </td>
            </tr>
        `;
    }
    table.innerHTML = string;
}


function editElement(index) {
    let element = state.list[index];
    document.querySelector(`[name="nickname"]`).value = element.nickname;
    document.querySelector(`[name="number"]`).value = element.number;
    state.indexEdit = index;
}


function deleteElement(index) {
    if (confirm("Are you sure you want to delete this number")) {
        state.list.splice(index, 1);  
        drawPage();
    }
}


function addElement(event) {
    event.preventDefault();
    let nickname = document.querySelector(`[name="nickname"]`).value.trim();
    let number = document.querySelector(`[name="number"]`).value.trim();

    if (
        number === "" ||
        number.length < 10 ||
        number.length > 10 ||
        isNaN(number) === true
    ) {
        alert ("The number is not valid!")
        return
    }

    if (state.indexEdit === null) {
        state.list.push({
            nickname: nickname,
            number: number,
        });
    } else {
        state.list[state.indexEdit] = {
                nickname: nickname,
                number: number
            },
            state.indexEdit = null;
    }
    document.querySelector("form").reset();
    drawPage();
}