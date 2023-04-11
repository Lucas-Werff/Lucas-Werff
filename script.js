// Constants for the game
const numRows = 6;
const numCols = 7;
const player1 = "red";
const player2 = "yellow";

// Variable to keep track of the current player
let currentPlayer = player1;

// Create the game board
const board = document.getElementById("board");
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.addEventListener("click", () => makeMove(col));
    board.appendChild(cell);
  }
}

// Function to handle making a move
function makeMove(col) {
  const cells = document.getElementsByClassName("cell");
  for (let row = numRows - 1; row >= 0; row--) {
    const cellIndex = row * numCols + col;
    const cell = cells[cellIndex];
    if (!cell.classList.contains("filled")) {
      cell.style.backgroundColor = currentPlayer;
      cell.classList.add("filled");
      checkWin(row, col);
      switchPlayer();
      break;
    }
  }
}

// Function to switch the current player
function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

// Function to check for a win
function checkWin(row, col) {
  const cells = document.getElementsByClassName("cell");
  const cellIndex = row * numCols + col;
  const color = cells[cellIndex].style.backgroundColor;

  // Check horizontally
  let count = 0;
  for (let c = col - 3; c <= col + 3; c++) {
    if (c >= 0 && c < numCols) {
      const index = row * numCols + c;
      if (cells[index].style.backgroundColor === color) {
        count++;
        if (count === 4) {
          endGame(color);
          return;
        }
      } else {
        count = 0;
      }
    }
  }

  // Check vertically
  count = 0;
  for (let r = row - 3; r <= row + 3; r++) {
    if (r >= 0 && r < numRows) {
      const index = r * numCols + col;
      if (cells[index].style.backgroundColor === color) {
        count++;
        if (count === 4) {
          endGame(color);
          return;
        }
      } else {
        count = 0;
      }
    }
  }

