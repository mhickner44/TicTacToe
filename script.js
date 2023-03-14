let cells = document.getElementsByClassName("cell");

//making the array the size we want
const board = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];

let player = (name, symbol) => {
  let wins = 0;
  let losses = 0;
  let getName = () => name;
  let getSymbol = () => symbol;
 
  return { getName, getSymbol };
};

let boardPiece = (placementid, player) => {
  return { placementid, player };
};

// const displayController = (() => {
//   //could build the pieces for display in the event handler but I have not done that.
// })();

const gameController = (() => {
  //controller turns and wins
  let count = 0;
  let playerOne;
  let playerTwo;
  let full = () => {
    //if the board is full 9 slots taken
  };

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

    matches=0;
    
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

    if (checkDiagnol(x, y) == true||checkColumn(x, y) == true) {
      winner = true;
    }
    return winner;
  };

  return { getCurrentPlayer, full, game, checkWinner };
})();

function addEventListenerList(list, event, fn) {
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
  //do I need to add
}

function cellSelected() {
  //add it to the board array

  const div = document.createElement("div");

  //get the current player then call the current player symbol
  let currentPlayer = gameController.getCurrentPlayer();
  let playerSymbol = currentPlayer.getSymbol();
  div.innerHTML = playerSymbol;
  this.appendChild(div);

 

  board[this.dataset.placementx][this.dataset.placementy] = playerSymbol;
  console.log(
    gameController.checkWinner(this.dataset.placementx, this.dataset.placementy)
  );

  //handout a win

}

addEventListenerList(cells, "click", cellSelected);

let playerOne = player("p1", "X");
let playerTwo = player("p2", "O");
gameController.game(playerOne, playerTwo);

