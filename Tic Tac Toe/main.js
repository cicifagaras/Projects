console.log("main.js loaded...");

const displayPlayer = {
   true: "X",
   false: "0",
};

const playerImage = {
   true: "x.png",
   false: "0.png",
};

const dbUrl = "https://tic-tac-toe-da965-default-rtdb.europe-west1.firebasedatabase.app";

let iAmPlayer = null;

let state = {
   player: true, //x e true; 0 e false
   game: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
   ],
   finished: false,
   btnX: false,
   btn0: false
};

async function put(path, val) {
   let response = await fetch(dbUrl + "/" + path + ".json", {
      method: "PUT",
      body: JSON.stringify(val),
   });
   return await response.json();
}


function isLooseEquals(val1, val2) {
   if (val1 === val2) {
      return true;
   }
   if ((val1 === null || val1 === undefined) && (val2 === null || val2 === undefined)) {
      return true;
   }
   return false
}


async function getDB() {
   let response = await fetch(dbUrl + "/.json");
   let dbState = await response.json();
   if (state.player !== dbState.player || state.finished !== dbState.finished) {
      state.player = dbState.player;
      state.finished = dbState.finished;
      document.querySelector("#gameMessage").innerText = dbState.message;

      if (dbState.game !== undefined) {
         let boxes = document.querySelectorAll("#game>.box");

         for (let idx = 0; idx < 9; idx++) {
            if (!isLooseEquals(state.game[idx], dbState.game[idx])) {
               console.log("celalalt player a facut o mutare pe pozitia" + idx);
               state.game[idx] = dbState.game[idx];
               let box = boxes[idx];
               box.innerHTML = `<img src = "img/${playerImage[state.game[idx]]}" />`
            }
         }
      } else {
         // showMessage(`Player "X" is going to be the first one. Player "0" is going to be the second one.`);
         let boxes = document.querySelectorAll("#game>.box");
         for (let box of boxes) {
            box.innerText = "";
         }
         state = dbState;
         state.game = [null, null, null, null, null, null, null, null, null];
      }
   }
}


async function play(pos) {
   if (state.finished) {
      await newGame();
      return;
   }
   if (state.player !== iAmPlayer) {
      return;
   }
   if (state.game[pos] !== null) {
      return;
   }

   let boxes = document.querySelectorAll("#game>.box");
   let box = boxes[pos];

   await put("game/" + pos, state.player);
   state.game[pos] = state.player;

   box.innerHTML = `<img src = "img/${playerImage[state.player]}" />`

   if (state.game[0] === state.player) {
      if (state.game[1] === state.player && state.game[2] === state.player) {
         await showMessage(`Player ${displayPlayer[state.player]} has won!`);
         await put("finished", true);
         state.finished = true;
         return;
      }
      if (state.game[3] === state.player && state.game[6] === state.player) {
         await showMessage(`Player ${displayPlayer[state.player]} has won!`);
         await put("finished", true);
         state.finished = true;
         return;
      }
      if (state.game[4] === state.player && state.game[8] === state.player) {
         await showMessage(`Player ${displayPlayer[state.player]} has won!`);
         await put("finished", true);
         state.finished = true;
         return;
      }
   }
   if (state.game[8] === state.player) {
      if (state.game[2] === state.player && state.game[5] === state.player) {
         await showMessage(`Player ${displayPlayer[state.player]} has won!`);
         await put("finished", true);
         state.finished = true;
         return;
      }
      if (state.game[6] === state.player && state.game[7] === state.player) {
         await showMessage(`Player ${displayPlayer[state.player]} has won!`);
         await put("finished", true);
         state.finished = true;
         return;
      }
   }
   if (state.game[4] === state.player) {
      if (state.game[1] === state.player && state.game[7] === state.player) {
         await showMessage(`Player ${displayPlayer[state.player]} has won!`);
         await put("finished", true);
         state.finished = true;
         return;
      }
      if (state.game[3] === state.player && state.game[5] === state.player) {
         await showMessage(`Player ${displayPlayer[state.player]} has won!`);
         await put("finished", true);
         state.finished = true;
         return;
      }
      if (state.game[2] === state.player && state.game[6] === state.player) {
         await showMessage(`Player ${displayPlayer[state.player]} has won!`);
         await put("finished", true);
         state.finished = true;
         return;
      }
   }
   await put("player", !state.player);
   state.player = !state.player;

   await showMessage(`It's players ${displayPlayer[state.player]}'s turn!`);

   let isDraw = true;
   for (let g of state.game) {
      if (g === null) {
         isDraw = false;
      }
   }
   await put("finished", isDraw);
   state.finished = isDraw;

   if (isDraw) {
      await showMessage(`It's a draw! Click anywhere for a new game.`)
   }
}

async function showMessage(msg) {
   document.querySelector("#gameMessage").innerText = msg;
   await put("message", msg);
}


async function beginData() {
   await put("", {
      player: true,
      game: [
         null,
         null,
         null,
         null,
         null,
         null,
         null,
         null,
         null
      ],
      finished: false,
      btnX: false,
      btn0: false,
      message: `Player "X" is going to be the first one. Player "0" is going to be the second one.`

   });
   state.player = true;
   state.game = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
   ];
   state.finished = false;
   state.btnX = false,
   state.btn0 = false
}
async function newGame() {
   await showMessage(`Player "X" is going to be the first one. Player "0" is going to be the second one.`);
   let images = document.querySelectorAll("#game >.box>img");
   for (let img of images) {
      img.remove();
   }

   await put("", {
      player: true,
      game: [
         null,
         null,
         null,
         null,
         null,
         null,
         null,
         null,
         null
      ],
      finished: false,
      message: `Player "X" is going to be the first one. Player "0" is going to be the second one.`

   });
   state.player = true;
   state.game = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
   ];
   state.finished = false;
}


async function choosePlayer(player) {
   document.querySelector("#choosePlayer").classList.add("hidden");
   document.querySelector("#gameContent").classList.remove("hidden");
   let buttonX = document.querySelector("#buttonX");
   let button0 = document.querySelector("#button0");
   if (player) {
      // buttonX.disabled = true;
      state.btnX = true;
      await put("btnX", true)
      await newGame();
   } else {
      // button0.disabled = true;
      state.btn0 = true;
      await put("btn0", true)
   }
   
   iAmPlayer = player;
   // if (state.btnX) {
   //    // buttonX.addEventListener('click', disableButton);
   //    buttonX.disabled = true;
   // } else {
   //    // button0.addEventListener('click', disableButton);
   //    button0.disabled = true;
   // }
   setInterval(getDB, 1000);
}

async function startGame() {
   let popup = document.querySelector("#choosePlayer");
   let startBtn = document.querySelector("#btnDiv");
   startBtn.classList.add("hidden")
   popup.classList.remove("hidden");
   popup.classList.add("buttons");

   await beginData();
}