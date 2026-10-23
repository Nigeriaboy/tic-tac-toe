let gameBoard = [];
let currentPlayer = document.querySelector("#current-player");
let POSSIBLE_OUTCOMES = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];


export function newPlayer(name, sign) {
  const inputs = [];
  let playCount = 0;

  return {
    getName: () => name,
    getSign: () => sign,
    getInputArray: () => inputs,
    addToInputs: (input) => inputs.push(input),
    getPlayCount: () => playCount,
    increasePlayCount: () => playCount++,
    reset: () => {
      inputs.length = 0;
      playCount = 0;
    }
  };
}

export function getCurrentPlayer(player1, player2) {
  let player1Count = player1.getPlayCount();
  let player2Count = player2.getPlayCount();

  return player1Count <= player2Count ? player1: player2;
}

export function isTie() {
   return gameBoard.length === 9;
}

export function showTie(){
    currentPlayer.textContent = "The Game Is A Tie";
}

export function isWinner(playerInput) {
  return POSSIBLE_OUTCOMES.some((combination) =>
  combination.every((position) => playerInput.includes(position))
  );
}

export function isOccupied(position) {
  return gameBoard.includes(position);  
}

export function updateGameBoard(input) {
  gameBoard.push(input);
}


// show current player

export function showCurrentPlayer(playerObject) {
  currentPlayer.textContent = `${playerObject.getName()}'s Turn (${playerObject.getSign()}).`;
}

// Show winner

export function showWinner(playerName) {
  currentPlayer.textContent = `${playerName} Wins.`;
}

// Clear gameboard when Restart btn is clicked

const boxes = document.querySelectorAll(".box");
export function clearBoard(){
  gameBoard = [];

  for (let box of boxes){
    box.textContent = "";
  }
}
