<div id="viz-config" style="display:none">
{"name":"Reveal Minesweeper","algorithm":"recursion-minesweeper","complexity":{"time":"O(m * n)","space":"O(m * n)"},"examples":[{"input":{"board":[["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]],"click":[3,0]},"output":[["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]],"inputRaw":"board with mine at [1,2], click = [3, 0]","outputRaw":"Revealed board with flood fill"}]}
</div>

# Reveal Minesweeper

**Difficulty:** Hard

## Problem Statement

You are given a 2D grid representing a Minesweeper board. Implement the "click" functionality that reveals cells when a player clicks on them.

The board is represented as follows:
- `'M'` - An unrevealed mine
- `'E'` - An unrevealed empty cell
- `'B'` - A revealed blank cell with no adjacent mines
- `'1'` to `'8'` - A revealed cell with 1-8 adjacent mines
- `'X'` - A revealed mine (game over)

When a cell is clicked:
1. If a mine (`'M'`) is clicked, change it to `'X'` (game over)
2. If an empty cell (`'E'`) with **no adjacent mines** is clicked:
   - Change it to `'B'`
   - Recursively reveal all adjacent unrevealed cells (flood fill)
3. If an empty cell (`'E'`) with **adjacent mines** is clicked:
   - Change it to a digit (`'1'`-`'8'`) showing the count of adjacent mines

Write a function that takes the board and click position, and returns the updated board.

## Examples

**Example 1:**
```
Input:
board = [
  ['E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'M', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E']
]
click = [3, 0]

Output:
[
  ['B', '1', 'E', '1', 'B'],
  ['B', '1', 'M', '1', 'B'],
  ['B', '1', '1', '1', 'B'],
  ['B', 'B', 'B', 'B', 'B']
]

Explanation: Clicking bottom-left triggers flood fill, stopping at cells adjacent to the mine.
```

**Example 2:**
```
Input:
board = [
  ['B', '1', 'E', '1', 'B'],
  ['B', '1', 'M', '1', 'B'],
  ['B', '1', '1', '1', 'B'],
  ['B', 'B', 'B', 'B', 'B']
]
click = [1, 2]

Output:
[
  ['B', '1', 'E', '1', 'B'],
  ['B', '1', 'X', '1', 'B'],
  ['B', '1', '1', '1', 'B'],
  ['B', 'B', 'B', 'B', 'B']
]

Explanation: Clicking on the mine reveals it as 'X' (game over).
```

**Example 3:**
```
Input:
board = [
  ['E', 'E', 'E'],
  ['E', 'E', 'E'],
  ['E', 'E', 'E']
]
click = [1, 1]

Output:
[
  ['B', 'B', 'B'],
  ['B', 'B', 'B'],
  ['B', 'B', 'B']
]

Explanation: No mines, so entire board becomes 'B'.
```

## Constraints

- m == board.length
- n == board[i].length
- 1 <= m, n <= 50
- board[i][j] is one of 'M', 'E', 'B', '1'-'8', 'X'
- click.length == 2
- 0 <= click[0] < m
- 0 <= click[1] < n
- board[click[0]][click[1]] is either 'M' or 'E'

## Hints

<details>
<summary>Hint 1</summary>
Handle the mine case first - if clicked cell is 'M', just change to 'X' and return.
</details>

<details>
<summary>Hint 2</summary>
For empty cells, first count adjacent mines using 8-directional neighbors.
</details>

<details>
<summary>Hint 3</summary>
If adjacent mine count > 0, just update the cell to the digit. If count is 0, recursively reveal neighbors.
</details>

<details>
<summary>Hint 4</summary>
The flood fill only continues from cells with zero adjacent mines. Cells with adjacent mines act as "walls" stopping the propagation.
</details>

## Approach

### DFS Flood Fill Algorithm

1. **Base Cases:**
   - If clicked cell is `'M'`: change to `'X'` and return (game over)
   - If clicked cell is not `'E'`: return (already revealed)

2. **Count Adjacent Mines:**
   - Check all 8 neighbors (horizontally, vertically, diagonally)
   - Count cells containing `'M'`

3. **Reveal Cell:**
   - If mine count > 0: set cell to digit character (`'1'`-`'8'`)
   - If mine count == 0:
     - Set cell to `'B'` (blank)
     - Recursively call reveal on all 8 neighbors

### 8-Directional Neighbors

```
(-1,-1) (-1,0) (-1,1)
(0,-1)  [cell] (0,1)
(1,-1)  (1,0)  (1,1)
```

Use direction arrays: `dr = [-1,-1,-1,0,0,1,1,1]`, `dc = [-1,0,1,-1,1,-1,0,1]`

Or iterate: `for dr in [-1,0,1]: for dc in [-1,0,1]: if dr or dc: ...`

### Why Recursion Stops

The recursion naturally terminates because:
1. Cells with adjacent mines don't trigger recursive calls
2. Already revealed cells ('B', '1'-'8') are skipped
3. The board is finite

**Time Complexity:** O(m * n) - each cell visited at most once
**Space Complexity:** O(m * n) - recursion stack in worst case (all empty, no mines)

---

## Similar Problems

### 1. Flood Fill (LeetCode 733)
Fill connected region with a new color starting from a pixel.
- **Key difference:** Simpler 4-directional fill with single color, no counting.

### 2. Number of Islands (LeetCode 200)
Count connected components of '1's in a grid.
- **Key difference:** Just marking visited, not computing neighbor values.

### 3. Surrounded Regions (LeetCode 130)
Capture 'O's not connected to border.
- **Key difference:** Start flood fill from borders, then flip remaining.
