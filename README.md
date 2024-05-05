## Recursive Minesweeper

This Minesweeper game utilizes recursion to reveal adjacent tiles when a safe tile (one without a mine) is clicked. Below is a brief overview of the recursive algorithm used in this implementation:

### Setting Mines
The `setMines()` function randomly assigns mine locations on the board.

### Clicking a Tile
When a tile is clicked (`clickTile()` function), it checks if the flag mode is enabled. If so, it toggles the flag on the tile. Otherwise, if the clicked tile contains a mine, the game ends. If the tile is safe, it reveals the number of adjacent mines or recursively uncovers adjacent safe tiles.

### Recursive Uncovering
The `checkMine()` function recursively uncovers adjacent safe tiles by checking each adjacent tile. If a tile is safe (i.e., not containing a mine), it continues recursively uncovering its adjacent tiles until it reaches tiles adjacent to mines.

### Winning Condition
The game ends when all non-mine tiles are uncovered. If the number of tiles clicked equals the total tiles minus the number of mines, the player wins.
