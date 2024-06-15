type Tile = HTMLDivElement;

let board: Tile[][] = [];
const rows: number = 16;
const cols: number = 16;

const minesCount: number = 30;
let minesLocation: string[] = [];

let tilesClicked: number = 0;
let flagEnabled: boolean = false;

let gameOver: boolean = false;

window.onload = function (): void {
  startGame();
};

function setMines(): void {
  for (let i = 0; i < minesCount; i++) {
    const row: number = Math.floor(Math.random() * rows);
    const col: number = Math.floor(Math.random() * cols);
    const location: string = `${row}-${col}`;
    if (minesLocation.includes(location)) {
      i--;
    } else {
      minesLocation.push(location);
    }
  }
  console.log(minesLocation);
}

function startGame(): void {
  (document.getElementById("mines-count") as HTMLElement).innerHTML =
    minesCount.toString();
  (document.getElementById("flag-button") as HTMLElement).addEventListener(
    "click",
    setFlag
  );
  setMines();

  for (let i = 0; i < rows; i++) {
    const row: Tile[] = [];
    for (let j = 0; j < cols; j++) {
      const tile: Tile = document.createElement("div");
      tile.id = `${i}-${j}`;
      tile.addEventListener("click", clickTile);
      (document.getElementById("board") as HTMLElement).appendChild(tile);
      row.push(tile);
    }
    board.push(row);
  }
}

function setFlag(): void {
  if (flagEnabled) {
    flagEnabled = false;
    (
      document.getElementById("flag-button") as HTMLElement
    ).style.backgroundColor = "lightgreen";
  } else {
    flagEnabled = true;
    (
      document.getElementById("flag-button") as HTMLElement
    ).style.backgroundColor = "darkgreen";
  }
}

function clickTile(this: HTMLElement): void {
  if (gameOver || this.classList.contains("tile-clicked")) {
    return;
  }

  const tile: Tile = this as Tile;
  if (flagEnabled) {
    if (tile.innerText === "") {
      tile.innerText = "🚩";
    } else if (tile.innerText === "🚩") {
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

  const cords: string[] = tile.id.split("-");
  const row: number = parseInt(cords[0]);
  const col: number = parseInt(cords[1]);
  checkMine(row, col);
}

function revealMines(): void {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const location: string = `${r}-${c}`;
      if (minesLocation.includes(location)) {
        const tile: Tile = document.getElementById(location) as Tile;
        tile.innerText = "💣";
        tile.style.backgroundColor = "red";
      }
    }
  }
}

function checkMine(row: number, col: number): void {
  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return;
  }

  if (board[row][col].classList.contains("tile-clicked")) {
    return;
  }

  board[row][col].classList.add("tile-clicked");
  tilesClicked++;

  let minesFound: number = 0;

  minesFound += checkTile(row - 1, col - 1);
  minesFound += checkTile(row - 1, col);
  minesFound += checkTile(row - 1, col + 1);
  minesFound += checkTile(row, col - 1);
  minesFound += checkTile(row, col + 1);
  minesFound += checkTile(row + 1, col - 1);
  minesFound += checkTile(row + 1, col);
  minesFound += checkTile(row + 1, col + 1);

  if (minesFound > 0) {
    board[row][col].innerText = minesFound.toString();
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

  if (tilesClicked === rows * cols - minesCount) {
    alert("You Win!");
    gameOver = true;
    revealMines();
  }
}

function checkTile(row: number, col: number): number {
  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return 0;
  }

  const tile: Tile = document.getElementById(`${row}-${col}`) as Tile;
  if (minesLocation.includes(tile.id)) {
    return 1;
  }
  return 0;
}
