console.log("main.js loaded...");

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, onChildAdded} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZNUIZD9iwQJC2V4BhU1NDcDt-TkYFmDQ",
    authDomain: "chat-e2492.firebaseapp.com",
    databaseURL: "https://chat-e2492-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-e2492",
    storageBucket: "chat-e2492.appspot.com",
    messagingSenderId: "931731085951",
    appId: "1:931731085951:web:a218b6f16dd87ad392fd4a"
};

// Initialize Firebase
function initializeFireBase() {
    const app = initializeApp(firebaseConfig);
    
    const db = getDatabase(app);
    const messagesRef = ref(db, "messages");
    onChildAdded(messagesRef, function (snapshot) {
        const data = snapshot.val();
        let key = snapshot.key;
        displayMessage(data);
    });
}

let userName = null;

function displayMessage(data) {
    console.log("new message", data);
    let time = dayjs(data.date).format("HH:mm");

    let template = `
    <div class="chatBubble ${data.userName === userName ? "self" : "other"}">
        <div class="userName">${data.userName}</div>
        <div class="message">${data.message}</div>
        <div class="time">${time}</div>
    </div>
     `;
    document.querySelector("#chat").insertAdjacentHTML("beforeend", template);
    document.querySelector("#chat .chatBubble:last-child").scrollIntoView();
}


function startChat() {
    let name = document.querySelector(`[name="name"]`).value;
    name = name.trim();
    if (name.length < 3) {
        document.querySelector(`[name="name"]`).classList.add("error");
    } else {
        document.querySelector(`[name="name"]`).classList.remove("error");
        userName = name;
        document.querySelector("#signUpForm").classList.add("hidden");
        document.querySelector("#chatContainer").classList.remove("hidden");
        initializeFireBase();
    }
}


async function addMessage() {
    let message = document.querySelector(`[name="chatMessage"]`).value;
    message = message.trim();

    await fetch(firebaseConfig.databaseURL + "/messages/" + ".json", {
        method: "POST",
        body: JSON.stringify({
            userName: userName,
            message: message,
            date: new Date()
        })
    })
    document.querySelector('[name="chatMessage"]').value = "";
}

window.addMessage = addMessage;
window.startChat = startChat;