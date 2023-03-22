let cells = document.querySelectorAll(".cell");
let p1Score = document.getElementById("p1Score");
let p2Score = document.getElementById("p2Score");
let winnerDisplay = document.querySelector(".winningBlock");
let restart = document.querySelector(".restart");

let endGame = false;

//making the array the size we want
let board = [
  ["X","X","O"],
  ["O","O","X"],
  ["X","O","-"]
];

let player = (name, symbol) => {
  let wins = 0;

  let getName = () => name;
  let getSymbol = () => symbol;
  let giveWin = () => {
    wins++;
  };
  let getWins = () => wins;

  return {
    getName,
    getSymbol,
    giveWin,
    getWins,
  };
};

let boardPiece = (placementid, player) => {
  return { placementid, player };
};

const displayController = (() => {
  
  let addPoint = (player) => {
    //determine which player should have a point here
    if (player.getName() == "p1") {
      p1Score.innerHTML = `P1:${player.getWins()}`;
    } else {
      p2Score.innerHTML = `P2:${player.getWins()}`;
    }
  };

  let WWCD = (player) => {
    winnerDisplay.style.display = "flex";
    winnerDisplay.innerHTML = `Winner ${player.getName()}!`;
    winnerDisplay.appendChild(restart);
  };

  let catGame = () => {
    winnerDisplay.style.display = "flex";
    winnerDisplay.innerHTML = `Cats game!`;
    winnerDisplay.appendChild(restart);
  };

  //board reset
  let boardReset = () => {
    console.log("I ran first");
    cells.forEach(function (cell) {
      cell.innerHTML = "";
    });
    winnerDisplay.style.display = "none";

    board = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
  };

  return { addPoint, WWCD, boardReset, catGame };
})();

const gameController = (() => {
  //controller turns and wins
  let count = 0;
  let addCount = () => {
    count++;
  };
  let playerOne;
  let playerTwo;

  let getCurrentPlayer = () => {
    if (count % 2 == 0) {
      currentPlayer = playerOne;
    } else {
      currentPlayer = playerTwo;
    }
    count++;
    return currentPlayer;
  };

  let game = (player1, player2) => {
    //might need to get the score here
    playerOne = player1;
    playerTwo = player2;
  };

  let checkCat = () => {
    result = true;
    if (exists(board, "-") == true) {
      result = false;
    }
    return result;
  };

  let checkDiagnol = (x, y) => {
    let currentSymbol = board[x][y];
    let matches = 0;

    for (let i = 0; i < 3; i++) {
      for (let ii = 0; ii < 3; ii++) {
        //main
        if (i == ii) {
          if (board[i][ii] == currentSymbol) {
            matches++;
          }
        }
      }
      if (matches == 3) {
        return (winner = true);
      }
    }

    matches = 0;

    //anti diagnol
    for (let i = 0; i < 3; i++) {
      for (let ii = 0; ii < 3; ii++) {
        if (i + ii == 2 && board[i][ii] == currentSymbol) {
          matches++;
        }
      }
      if (matches == 3) {
        winner = true;
      }
    }

    return winner;
  };

  let checkColumn = (x, y) => {
    let matches = 0;
    let winner = false;

    let currentSymbol = board[x][y];
    //x
    for (let i = 0; i < 3; i++) {
      if (board[x][i] == currentSymbol) {
        matches++;
      } else {
        matches = 0;
        i = 3;
      }
    }

    if (matches == 3) {
      return (winner = true);
    }
    //y
    for (let i = 0; i < 3; i++) {
      if (board[i][y] == currentSymbol) {
        matches++;
      } else {
        i = 3;
        matches = 0;
      }
    }
    if (matches == 3) {
      return (winner = true);
    }
  };
  let checkWinner = (x, y) => {
    winner = false;

    if (checkDiagnol(x, y) == true || checkColumn(x, y) == true) {
      winner = true;
      currentPlayer.giveWin();
      displayController.WWCD(currentPlayer);
      displayController.addPoint(currentPlayer);
      endGame = true;
    }else if(gameController.checkCat()==true){
      endGame = true;
      displayController.catGame();
    }
    return winner;
  };

  let move = (currentPlayer, obj) => {
    const div = document.createElement("div");
    div.innerHTML = currentPlayer.getSymbol();
    obj.appendChild(div);

    board[obj.dataset.placementx][obj.dataset.placementy] =
      currentPlayer.getSymbol();

    gameController.checkWinner(obj.dataset.placementx, obj.dataset.placementy);

 
  };

  let botMove = () => {
    //random untaken cell on board
    let x = getRandomInt(3);
    let y = getRandomInt(3);
    //check for a full board

    // check the board for these numbers being in use
    while (board[x][y] != "-") {
      x = getRandomInt(3);
      y = getRandomInt(3);
    }

    let currentPlayer = gameController.getCurrentPlayer();

    board[x][y] = currentPlayer.getSymbol();
    
    const div = document.createElement("div");
    cells.forEach((element) => {
      //get the div cell atttribute
      if (
        element.getAttribute("data-placementX") == x &&
        element.getAttribute("data-placementY") == y
      ) {
        currentDiv = element;
      }
    });

    div.innerHTML = currentPlayer.getSymbol();
    currentDiv.appendChild(div);
    gameController.checkWinner(x, y);
  };

  return {
    getCurrentPlayer,
    game,
    checkWinner,
    move,
    botMove,
    checkCat,
    addCount,
  };
})();

function addEventListenerList(list, event, fn) {
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
  
}

function cellSelected() {


  let currentPlayer = gameController.getCurrentPlayer();

  gameController.move(currentPlayer, this);
  if (endGame == false) {
    gameController.botMove();
  } else {
    gameController.addCount();
  }
 
}

function newGame() {
  displayController.boardReset();
  endGame = false;
  console.log("I have been clicked:");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function exists(arr, search) {
  return arr.some((row) => row.includes(search));
}

addEventListenerList(cells, "click", cellSelected);
restart.addEventListener("click", newGame);

let playerOne = player("p1", "X");
let playerTwo = player("p2", "O");
gameController.game(playerOne, playerTwo);
