console.log("main.js loaded...");

let dataBaseForecast = {};
let dataBaseDaily = {};
let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
let urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
let urlIcon = "http://openweathermap.org/img/w/";
let place;
let clickedBtn = false;


async function getData() {
    if (place) {
        place = place.split(",")[0];
    }
    const firstResponse = await fetch(urlForecast + place);
    dataBaseForecast = await firstResponse.json();
    const secondResponse = await fetch(urlCurrentWeather + place);
    dataBaseDaily = await secondResponse.json();
    draw();
}

function draw() {
    let city;
    let icon;
    let temp;
    let description;
    let str = "";
    if (clickedBtn) {
        let table = document.querySelector("tbody");
        city = document.querySelector("#forecastCity");
        city.innerHTML = place + "," + dataBaseForecast["city"]["country"];
        let days = "";
        let dayArray = [];
        let hourArray = [];
        let arr = [];
        let dayNr = 0;
        for (let i = 0; i < dataBaseForecast.list.length; i++) {
            let elem = dataBaseForecast.list[i];
            if (elem === null) {
                continue;
            }
            let receivedDate = dataBaseForecast[`list`][`${i}`][`dt_txt`];

            let divided = receivedDate.split(" ");
            let hour = divided[1];
            hourArray.push(hour.substring(0, 5));

            let date = divided[0];
            arr.push(date);
            let aux1 = arr[i];
            let aux2 = arr[i - 1];
            if (arr.length > 2 && aux1[9] === aux2[9]) {
                continue;
            } else {
                let auxArray = aux1.split("-");
                let reverse = auxArray[0];
                auxArray[0] = auxArray[2];
                auxArray[2] = reverse;
                aux1 = auxArray.join();
                aux1 = aux1.replace(",", ".");
                aux1 = aux1.replace(",", ".");
                dayArray.push(aux1);
            }
        }
        for (let k = 0; k < dayArray.length; k++) {
            days += `
                        <tr class="day${k}">
                            <td>${dayArray[k]}</td>
                        </tr>
            `
        }
        table.innerHTML = days;

        for (let i = 0; i < dataBaseForecast.list.length; i++) {
            let elem = dataBaseForecast.list[i];
            if (elem === null) {
                continue;
            }

            icon = dataBaseForecast[`list`][`${i}`][`weather`][`0`][`icon`];
            temp = dataBaseForecast[`list`][`${i}`][`main`][`temp`];
            description = dataBaseForecast[`list`][`${i}`][`weather`][`0`][`description`];

            let aux = arr[i];
            let auxPlus = arr[i - 1];
            if (i > 0 && aux[9] != auxPlus[9]) {
                dayNr++;
                let tr = document.querySelector(`.day${dayNr}`)
                let td = document.createElement("td");
                str = "";
                str = `
                        <td>
                            <img src="${urlIcon + icon + ".png"}"/><br>
                            ${hourArray[i]}<br>
                            ${temp}&#8451;<br>
                            ${description}
                        </td>
                `

                td.innerHTML = str;
                tr.appendChild(td);
            } else {
                let row = document.querySelector(`.day${dayNr}`)
                let cell = document.createElement("td");
                str = `
                        <td>
                            <img src="${urlIcon + icon + ".png"}"/><br>
                            ${hourArray[i]}<br>
                            ${temp}&#8451;<br>
                            ${description}
                        </td>
                `
                cell.innerHTML = str;
                row.appendChild(cell);
            }
        }
        clickedBtn = false;
    } else {
        let firstDescription = document.querySelector("#firstDescription");
        let iconDiv = document.querySelector("#iconDiv");
        let tempDiv = document.querySelector("#tempDiv");
        let receivedData = document.querySelector("#receivedData");

        let country = dataBaseDaily[`sys`][`country`];
        description = dataBaseDaily[`weather`][`0`][`description`];
        let feelsLike = dataBaseDaily[`main`][`feels_like`];

        icon = dataBaseDaily[`weather`][`0`][`icon`];
        temp = dataBaseDaily[`main`][`temp`];

        let minTemp = dataBaseDaily[`main`][`temp_min`];
        let maxTemp = dataBaseDaily[`main`][`temp_max`];
        let pressure = dataBaseDaily[`main`][`pressure`];
        let humidity = dataBaseDaily[`main`][`humidity`];

        str = `
                <p>
                    ${place},${country}</br>
                    ${description}</br>
                    ${feelsLike}&#8451;
                </p>    
        `;
        let str2 = `
                    <img src="${urlIcon + icon + ".png"}"/>
        `;

        let str3 = `
                    <p>${temp}&#8451;
        `

        let str4 = `
                    <p>${minTemp}&#8451</p>
                    <p>${maxTemp}&#8451</p>
                    <p>${pressure}</p>
                    <p>${humidity}</p>
        `;

        firstDescription.innerHTML = str;
        iconDiv.innerHTML = str2;
        tempDiv.innerHTML = str3;
        receivedData.innerHTML = str4;
    }
}

function fiveDayForecast(event) {
    event.preventDefault();
    place = document.querySelector("#geocoder > div > input").value.trim();
    clickedBtn = true;
    getData();
}

function todayForecast(event) {
    event.preventDefault();
    place = document.querySelector("#geocoder > div > input").value.trim();
    let hidden = document.querySelector("#details");
    hidden.classList.remove("hidden")
    getData();
}