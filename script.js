let cells = document.getElementsByClassName("cell");

const board = [];

let player = (name, symbol) => {
  let wins = 0;
  let losses = 0;
  let getName = () => name;
  let getSymbol = () => symbol;
  /*returns methods and needed attribtues of teh player*/
  return { getName, getSymbol };
};

let boardPiece = (placementid, player) => {

  return { placementid, player};
};

const displayController = (() => {
  //add a selection to the board
})();

const gameController = (() => {
  //controller turns and wins
  let count = 0;
  let playerOne;
  let playerTwo;
  let full = () => {
    //if the board is full 9 slots taken
  };

  let getCurrentPlayer = () => {
    //if the count is even p1 odd p2
    console.log(playerOne.getSymbol());
    console.log(playerTwo.getSymbol());

    if (count % 2 == 0) {
      currentPlayer = playerOne;
    } else {
      currentPlayer = playerTwo;
    }
    count++;
    return currentPlayer;
  };

  // let getScore = () => {
  //   //what do I need to return in order for the event listener to know to continue player
  //   //score of both players
  // };

  let game = (player1, player2) => {
    //might need to get the score here
    playerOne = player1;
    playerTwo = player2;
  };

  let checkWinner=(/*take in the board probably*/)=>{
      //check the board for an absured amount of possibilities
      //how can I cut down on the possiblities

  }

  return { getCurrentPlayer, full, game ,checkWinner};
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

  //creating a new object to put into board
  //boardPeice ?
  let newPiece = boardPiece(this.dataset.placementid,currentPlayer.getName());
  board.push(newPiece);


  //check score for winner?
}

addEventListenerList(cells, "click", cellSelected);

let playerOne = player("p1", "X");
let playerTwo = player("p2", "O");
gameController.game(playerOne, playerTwo);
//while something somone has not won/gamboard not fuill  keep moving
