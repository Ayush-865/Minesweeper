var board = [];
var rows = 16;
var cols = 16;
var minesCount = 30;
var minesLocation = [];
var tilesClicked = 0;
var flagEnabled = false;
var gameOver = false;
window.onload = function () {
    startGame();
};
function setMines() {
    for (var i = 0; i < minesCount; i++) {
        var row = Math.floor(Math.random() * rows);
        var col = Math.floor(Math.random() * cols);
        var location_1 = "".concat(row, "-").concat(col);
        if (minesLocation.includes(location_1)) {
            i--;
        }
        else {
            minesLocation.push(location_1);
        }
    }
    console.log(minesLocation);
}
function startGame() {
    document.getElementById("mines-count").innerHTML =
        minesCount.toString();
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            var tile = document.createElement("div");
            tile.id = "".concat(i, "-").concat(j);
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
        document.getElementById("flag-button").style.backgroundColor = "lightgreen";
    }
    else {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgreen";
    }
}
function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }
    var tile = this;
    if (flagEnabled) {
        if (tile.innerText === "") {
            tile.innerText = "🚩";
        }
        else if (tile.innerText === "🚩") {
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
    var cords = tile.id.split("-");
    var row = parseInt(cords[0]);
    var col = parseInt(cords[1]);
    checkMine(row, col);
}
function revealMines() {
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            var location_2 = "".concat(r, "-").concat(c);
            if (minesLocation.includes(location_2)) {
                var tile = document.getElementById(location_2);
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
    var minesFound = 0;
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
    }
    else {
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
function checkTile(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
        return 0;
    }
    var tile = document.getElementById("".concat(row, "-").concat(col));
    if (minesLocation.includes(tile.id)) {
        return 1;
    }
    return 0;
}
