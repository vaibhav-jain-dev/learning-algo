<div id="viz-config" style="display:none">
{"name":"Solve Sudoku","algorithm":"recursion-sudoku","complexity":{"time":"O(9^m)","space":"O(m)"},"examples":[{"input":{"board":[[7,8,0,4,0,0,1,2,0],[6,0,0,0,7,5,0,0,9],[0,0,0,6,0,1,0,7,8],[0,0,7,0,4,0,2,6,0],[0,0,1,0,5,0,9,3,0],[9,0,4,0,6,0,0,0,5],[0,7,0,3,0,0,0,1,2],[1,2,0,0,0,7,4,0,0],[0,4,9,2,0,6,0,0,7]]},"output":[[7,8,5,4,3,9,1,2,6],[6,1,2,8,7,5,3,4,9],[4,9,3,6,2,1,5,7,8],[8,5,7,9,4,3,2,6,1],[2,6,1,7,5,8,9,3,4],[9,3,4,1,6,2,7,8,5],[5,7,8,3,9,4,6,1,2],[1,2,6,5,8,7,4,9,3],[3,4,9,2,1,6,8,5,7]],"inputRaw":"9x9 board with 0s for empty cells","outputRaw":"Solved 9x9 Sudoku board"}]}
</div>

# Solve Sudoku

**Difficulty:** Hard

## Problem Statement

Write a function that takes in a 9x9 two-dimensional array representing a partially filled Sudoku board and returns the solved Sudoku board.

Sudoku is a puzzle where you need to fill a 9x9 grid with digits 1-9 such that each column, each row, and each of the nine 3x3 sub-boxes contains all digits from 1 to 9.

The input board will always have exactly one solution.

## Examples

**Example 1:**
```
Input:
[
  [7, 8, 0, 4, 0, 0, 1, 2, 0],
  [6, 0, 0, 0, 7, 5, 0, 0, 9],
  [0, 0, 0, 6, 0, 1, 0, 7, 8],
  [0, 0, 7, 0, 4, 0, 2, 6, 0],
  [0, 0, 1, 0, 5, 0, 9, 3, 0],
  [9, 0, 4, 0, 6, 0, 0, 0, 5],
  [0, 7, 0, 3, 0, 0, 0, 1, 2],
  [1, 2, 0, 0, 0, 7, 4, 0, 0],
  [0, 4, 9, 2, 0, 6, 0, 0, 7]
]

Output:
[
  [7, 8, 5, 4, 3, 9, 1, 2, 6],
  [6, 1, 2, 8, 7, 5, 3, 4, 9],
  [4, 9, 3, 6, 2, 1, 5, 7, 8],
  [8, 5, 7, 9, 4, 3, 2, 6, 1],
  [2, 6, 1, 7, 5, 8, 9, 3, 4],
  [9, 3, 4, 1, 6, 2, 7, 8, 5],
  [5, 7, 8, 3, 9, 4, 6, 1, 2],
  [1, 2, 6, 5, 8, 7, 4, 9, 3],
  [3, 4, 9, 2, 1, 6, 8, 5, 7]
]
```

## Constraints

- Board is always 9x9
- Empty cells are represented by 0
- Each puzzle has exactly one solution
- Initial board is always valid

## Hints

<details>
<summary>Hint 1</summary>
Use backtracking: try digits 1-9 in each empty cell, validate, and recurse.
</details>

<details>
<summary>Hint 2</summary>
For validation, check row, column, and 3x3 box. Use sets for O(1) lookup.
</details>

<details>
<summary>Hint 3</summary>
Optimization: start with the cell that has fewest valid options (MRV heuristic).
</details>

## Approach

### Backtracking Algorithm

1. Find an empty cell (value = 0)
2. Try digits 1-9 in that cell
3. For each digit, check if it's valid (not in same row, column, or 3x3 box)
4. If valid, place the digit and recursively solve the rest
5. If recursion fails, backtrack (reset cell to 0) and try next digit
6. If all digits fail, return false (triggers backtracking in caller)

### Validation
For cell (row, col):
- Row check: no duplicate in board[row][0..8]
- Column check: no duplicate in board[0..8][col]
- Box check: no duplicate in 3x3 box starting at (row//3*3, col//3*3)

### Optimizations
1. **Precompute constraints:** Use sets for each row, column, and box
2. **MRV (Minimum Remaining Values):** Choose cell with fewest valid options
3. **Constraint propagation:** Reduce possibilities as digits are placed

**Time Complexity:** O(9^m) where m is number of empty cells (worst case)
**Space Complexity:** O(m) for recursion stack, O(1) if modifying in place

---

## Similar Problems (Harder)

### 1. Valid Sudoku Variants (Diagonal, Killer)
Solve Sudoku variants with additional constraints like diagonal uniqueness or cage sums.
- **Key difference:** Additional constraint checking for diagonals or sum regions.

### 2. Sudoku Generator
Generate a valid Sudoku puzzle with unique solution and specified difficulty.
- **Key difference:** Must generate, remove numbers, and verify unique solution.

### 3. N-Queens Problem
Place N queens on NxN board such that no two queens attack each other.
- **Key difference:** Different constraint structure (rows, columns, diagonals).
