import {
  newPlayer,
  startGame
} from "./func.js";

let player1 = newPlayer("Abdullah", "X");
let player2 = newPlayer("Usman", "O");


startGame(player1, player2);