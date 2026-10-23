import readline from "node:readline/promises";

export let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export function newPlayer(name, sign) {
  let inputs = [];
  let playCount = 0;

  function getName() {
    return name;
  }

  function getSign() {
    return sign;
  }

  function getInputArray() {
    return inputs;
  }

  function addToInputs(input) {
    return inputs.push(input);
  }

  function getPlayCount() {
    return playCount;
  }

  function increasePlaycount() {
    return playCount++;
  }

  return {
    getName,
    getSign,
    getInputArray,
    addToInputs,
    getPlayCount,
    increasePlaycount,
  };
}

export function getCurrentPlayer(player1, player2) {
  let player1Count = player1.getPlayCount();
  let player2Count = player2.getPlayCount();

  if (player1Count === 0 && player2Count === 0) {
    // if true then it means they are just starting the game.
    return player1;
  } else if (player1Count > player2Count) {
    return player2;
  } else {
    return player1;
  }
}

export function isLength3(playerArray) {
  if (playerArray.length === 3) {
    return true;
  } else {
    return false;
  }
}

export function sort(playerArray) {
  let sorted = playerArray.sort((a, b) => a - b);
  return sorted;
}

export function isTie(player1Array, player2Array) {
  // if the sum of the two players is 9, then all the boxes has been occupied
  if ((player1Array.length + player2Array.length) === 9) {
    return true;
  } else {
    return false;
  }
}

export function isWinner(playerArray) {

  if (playerArray.length >= 3){
    let sortedArray = sort(playerArray);
    let neededOutcome = sortedArray.slice(0,3);
    
    let possibleOutcomes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let outcome of possibleOutcomes) {
      if (
        outcome.includes(neededOutcome[0]) &&
        outcome.includes(neededOutcome[1]) &&
        outcome.includes(neededOutcome[2])
      ) {
        return true;
      }
    }
  }

  return false;
}

export function isOccupied(playerinput) {
  for (let element of gameBoard) {
    if (element === playerinput) {
      // means if player input is still in the gameboard, that means it has not been occupied
      return false;
    }
  }

  return true; // Occupied.
}

export function displayGameBoard() {
  console.log("_______");
  console.log(`|${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}|`);
  console.log("-------");
  console.log(`|${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}|`);
  console.log("-------");
  console.log(`|${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}|`);
  console.log("-------");
}

export function updateGameBoard(playerSign, playerInput) {
  gameBoard.splice(playerInput, 1, playerSign);
}

export async function getInput(currentPlayer) {
  // Collect player's input
  while (true) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const input = await rl.question(
      `${currentPlayer.getName()}'s Turn (${currentPlayer.getSign()}):`,
    );

    if (input.trim() === "") {
      console.log("Please enter a position.");
      rl.close();
      continue;
    }

    const convertedInput = Number(input);

    if (
      !Number.isInteger(convertedInput) ||
      convertedInput < 0 ||
      convertedInput > 8
    ) {
      console.log("Not a valid input.");
      rl.close();
      continue;
    }

    if (isOccupied(convertedInput)) {
      console.log("Position Occupied.");
      rl.close();
      continue;
    }

    rl.close();
    return convertedInput;
  }
}

export async function startGame(player1, player2) {
  while (true){
    displayGameBoard();

    let playerInput;
    let currentPlayer = getCurrentPlayer(player1, player2);

    playerInput = await getInput(currentPlayer);

    currentPlayer.addToInputs(playerInput);
    updateGameBoard(currentPlayer.getSign(), playerInput);

    // Determine if current player wins
      if (isWinner(currentPlayer.getInputArray())) {
        console.log(`${currentPlayer.getName()} wins the game.`);
        break;
      }

    // Checks if the game is a tie
    if (isTie(player1.getInputArray(), player2.getInputArray())) {
      console.log("The game is a Tie.");
      break;
    }

    currentPlayer.increasePlaycount();
  }
}
