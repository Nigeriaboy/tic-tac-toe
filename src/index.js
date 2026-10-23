import {
  showTie,
  isTie,
  clearBoard,
  showWinner,
  isWinner,
  newPlayer,
  getCurrentPlayer,
  isOccupied,
  updateGameBoard,
  showCurrentPlayer,
} from "./func.js";

import "./func.js";
import "./style.css";
import "./template.html";

let restartBtn = document.querySelector("#restart-btn");
let notification = document.querySelector("#notification");
let formContainer = document.querySelector("#form-container");
let submitBtn = document.querySelector("#submit-btn");
let player1Name = document.querySelector("#player1");
let player2Name = document.querySelector("#player2");
let player1;
let player2;

const boxes = document.querySelectorAll(".box");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (player1Name.value.trim() !== "" && player2Name.value.trim() !== "") {
    player1 = newPlayer(player1Name.value, "X");
    player2 = newPlayer(player2Name.value, "O");
    formContainer.style.display = "none";

    showCurrentPlayer(getCurrentPlayer(player1, player2)); // Shows the first player
  } else {
    notification.textContent = "Input valid name.";
    notification.style.display = "block";
    notification.style.opacity = 1;

    // Fading effect
    setTimeout(() => {
      notification.style.opacity = 0;

      setTimeout(() => {
        notification.style.display = "none";
      }, 500);
    }, 3000);
  }
});

let thereIsWinner = false;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!thereIsWinner) {
      const input = Number(box.dataset.index);
      const currentPlayer = getCurrentPlayer(player1, player2);
      if (!isOccupied(input)) {
        currentPlayer.addToInputs(input);
        updateGameBoard(input);
        box.innerHTML = `<span>${currentPlayer.getSign()}</span>`;
        currentPlayer.increasePlayCount();

        // Determines if current player wins
        if (isWinner(currentPlayer.getInputArray())) {
          showWinner(currentPlayer.getName());
          thereIsWinner = true;
        } else if (isTie()) {
          showTie();
        } else {
          showCurrentPlayer(getCurrentPlayer(player1, player2));
        }
      }
    }
  });
});

restartBtn.addEventListener("click", () => {
  player1.reset();
  player2.reset();

  clearBoard();
  showCurrentPlayer(getCurrentPlayer(player1, player2));
  thereIsWinner = false;
});

// add the restart button, show when game is a tie, and stop player from playing when someone has already won
