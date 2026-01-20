<div id="viz-config" style="display:none">
{"name":"Remove Islands","algorithm":"graph-flood-fill","complexity":{"time":"O(N * M)","space":"O(N * M)"},"examples":[{"input":{"matrix":[[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0],[1,1,0,0,1,0],[1,0,1,1,0,0],[1,0,0,0,0,1]]},"output":[[1,0,0,0,0,0],[0,0,0,1,1,1],[0,0,0,0,1,0],[1,1,0,0,1,0],[1,0,0,0,0,0],[1,0,0,0,0,1]],"inputRaw":"6x6 matrix with islands","outputRaw":"Matrix with islands removed"},{"input":{"matrix":[[1,1,1],[1,0,1],[1,1,1]]},"output":[[1,1,1],[1,0,1],[1,1,1]],"inputRaw":"3x3 matrix all border-connected","outputRaw":"Same matrix (no islands)"}]}
</div>

# Remove Islands

**Difficulty:** Medium (Yellow)

## Problem Statement

You're given a two-dimensional matrix of potentially unequal height and width containing only 0s and 1s. The matrix represents a two-toned image, where each 1 represents black and each 0 represents white.

An island is defined as any number of 1s that are horizontally or vertically adjacent (but not diagonally adjacent) and that don't touch the border of the image. In other words, a group of horizontally or vertically adjacent 1s isn't an island if any of those 1s are in the first row, first column, last row, or last column of the input matrix.

Write a function that removes all islands from the input matrix. The function should modify the matrix in-place and return it.

## Examples

**Example 1:**
```
Input: matrix = [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1]
]

Output: [
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1]
]

Explanation: Islands at (1,1), (2,2), and (4,2)-(4,3) are removed (set to 0).
The 1s connected to the border remain unchanged.
```

**Example 2:**
```
Input: matrix = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]

Output: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]

Explanation: No islands exist since all 1s touch the border.
```

## Constraints

- Matrix will contain only 0s and 1s
- Matrix dimensions are at least 1x1
- Adjacency is only horizontal and vertical (not diagonal)
- Modify the matrix in-place

## Hints

<details>
<summary>Hint 1</summary>
Instead of finding and removing islands, think about finding all 1s connected to the border and preserving them.
</details>

<details>
<summary>Hint 2</summary>
Start by marking all 1s connected to the border using DFS/BFS from border cells.
</details>

<details>
<summary>Hint 3</summary>
After marking border-connected 1s, any remaining unmarked 1s are islands and should be set to 0.
</details>

## Approach

### Reverse Thinking Approach
1. Find all 1s on the border of the matrix
2. For each border 1, use DFS/BFS to mark all connected 1s as "safe" (connected to border)
3. Iterate through the entire matrix:
   - If a cell is 1 and not marked safe, it's an island - set to 0
   - If a cell is marked safe, reset it to 1
4. Return the modified matrix

### Implementation Detail
- Use a temporary value (like 2) to mark safe cells, then convert back to 1

**Time Complexity:** O(n * m) where n is rows and m is columns
**Space Complexity:** O(n * m) for the recursion stack in worst case

---

## Similar Problems (Harder)

### 1. Count Islands After Removal
**Difficulty:** Hard

After removing all islands, count how many separate border-connected regions remain.

### 2. Largest Island After Removal
**Difficulty:** Hard

Return the size of the largest remaining group of 1s after removing all islands.

### 3. Minimum Cells to Make All 1s Border-Connected
**Difficulty:** Very Hard

Find the minimum number of 0s to change to 1s so that all 1s become connected to the border.
