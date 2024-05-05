let board = [];
let rows = 8;
let cols = 8;

let minesCount = 5;
let minesLocation = [];

let tilesClicked = 0;
let flagEnabled = false;

let gameOver = false;

window.onload = function () {
  startGame();
};

function setMines() {
  for (let i = 0; i < minesCount; i++) {
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);
    if (minesLocation.includes(row.toString() + "-" + col.toString())) {
      i--;
    } else {
      minesLocation.push(row.toString() + "-" + col.toString());
    }
  }
  console.log(minesLocation);
}

function startGame() {
  document.getElementById("mines-count").innerHTML = minesCount;
  document.getElementById("flag-button").addEventListener("click", setFlag);
  setMines();

  for (let i = 0; i < rows; i++) {
    row = [];
    for (let j = 0; j < cols; j++) {
      let tile = document.createElement("div");
      tile.id = i.toString() + "-" + j.toString();
      tile.addEventListener("click", clickTile);
      document.getElementById("board").appendChild(tile);
      row.push(tile);
    }
    board.push(row);
  }
}

function setFlag() {
  if (flagEnabled) {
    flagEnabled = false;
    document.getElementById("flag-button").style.backgroundColor = "lightgray";
  } else {
    flagEnabled = true;
    document.getElementById("flag-button").style.backgroundColor = "darkgray";
  }
}

function clickTile() {
  if (gameOver || this.classList.contains("tile-clicked")) {
    return;
  }

  let tile = this;
  if (flagEnabled) {
    if (tile.innerText == "") {
      tile.innerText = "🚩";
    } else if (tile.innerText == "🚩") {
      tile.innerText = "";
    }
    return;
  }

  if (minesLocation.includes(tile.id)) {
    alert("GAME OVER");
    gameOver = true;
    revealMines();
    return;
  }

  let cords = tile.id.split("-");
  let row = parseInt(cords[0]);
  let col = parseInt(cords[1]);
  checkMine(row, col);
}

function revealMines() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        tile = document.getElementById(r.toString() + "-" + c.toString());
        tile.innerText = "💣";
        tile.style.backgroundColor = "red";
      }
    }
  }
}

function checkMine(row, col) {
  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return;
  }

  if (board[row][col].classList.contains("tile-clicked")) {
    return;
  }

  board[row][col].classList.add("tile-clicked");
  tilesClicked++;

  let minesFound = 0;

  minesFound += checkTile(row - 1, col - 1);
  minesFound += checkTile(row - 1, col);
  minesFound += checkTile(row - 1, col + 1);
  minesFound += checkTile(row, col - 1);
  minesFound += checkTile(row, col + 1);
  minesFound += checkTile(row + 1, col - 1);
  minesFound += checkTile(row + 1, col);
  minesFound += checkTile(row + 1, col + 1);

  if (minesFound > 0) {
    board[row][col].innerText = minesFound;
    board[row][col].classList.add("x" + minesFound.toString());
  } else {
    checkMine(row - 1, col - 1);
    checkMine(row - 1, col);
    checkMine(row - 1, col + 1);
    checkMine(row, col - 1);
    checkMine(row, col + 1);
    checkMine(row + 1, col - 1);
    checkMine(row + 1, col);
    checkMine(row + 1, col + 1);
  }

  if (tilesClicked == rows * cols - minesCount) {
    alert("You Win!");
    gameOver = true;
    revealMines();
  }
}

function checkTile(row, col) {
  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return 0;
  }

  let tile = document.getElementById(row.toString() + "-" + col.toString());
  if (minesLocation.includes(row.toString() + "-" + col.toString())) {
    return 1;
  }
  return 0;
}
