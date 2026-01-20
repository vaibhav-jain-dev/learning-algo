<div id="viz-config" style="display:none">
{"name":"Square of Zeroes","algorithm":"dp-square-zeroes","complexity":{"time":"O(n^3)","space":"O(n^2)"},"examples":[{"input":{"matrix":[[1,1,1,0,1,0],[0,0,0,0,0,1],[0,1,1,1,0,1],[0,0,0,1,0,1],[0,1,1,1,0,1],[0,0,0,0,0,1]]},"output":true,"inputRaw":"matrix = [[1,1,1,0,1,0],[0,0,0,0,0,1],[0,1,1,1,0,1],[0,0,0,1,0,1],[0,1,1,1,0,1],[0,0,0,0,0,1]]","outputRaw":"true"},{"input":{"matrix":[[1,1,1],[1,0,1],[1,1,1]]},"output":true,"inputRaw":"matrix = [[1,1,1],[1,0,1],[1,1,1]]","outputRaw":"true"},{"input":{"matrix":[[1,1,1],[1,1,1],[1,1,1]]},"output":false,"inputRaw":"matrix = [[1,1,1],[1,1,1],[1,1,1]]","outputRaw":"false"}]}
</div>

# Square of Zeroes

**Difficulty:** Very Hard (Black)

## Problem Statement

Write a function that takes in a square matrix of only 0s and 1s and returns a boolean representing whether the matrix contains a square whose borders are made up of only 0s.

Note that a square can be of size 1x1 (single 0 counts as a valid square of zeroes).

## Examples

**Example 1:**
```
Input: matrix = [
  [1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 1],
  [0, 0, 0, 1, 0, 1],
  [0, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 1]
]
Output: true
Explanation: The 4x4 square from (1,0) to (5,3) has borders of all 0s
```

**Example 2:**
```
Input: matrix = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
]
Output: true
Explanation: The 1x1 square containing just 0 at position (1,1)
```

**Example 3:**
```
Input: matrix = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
]
Output: false
Explanation: No 0s in the matrix
```

## Constraints

- Matrix is square (n x n)
- Matrix contains only 0s and 1s
- 1x1 squares (single 0) are valid
- Only borders need to be 0s (interior can be anything)

## Hints

<details>
<summary>Hint 1</summary>
Precompute for each cell how many consecutive 0s are below it and to its right.
</details>

<details>
<summary>Hint 2</summary>
For each cell, check all possible square sizes and verify if the borders contain only 0s.
</details>

<details>
<summary>Hint 3</summary>
To check if borders are 0s: verify top row, bottom row, left column, and right column using precomputed values.
</details>

## Approach

### Precomputation + Iteration
1. Build two auxiliary matrices:
   - below[i][j] = count of consecutive 0s below (including cell)
   - right[i][j] = count of consecutive 0s to the right (including cell)

2. For each cell (r, c) that is 0:
   - For each possible square size s:
     - Check if top-left corner has s zeroes going right and down
     - Check if top-right corner has s zeroes going down
     - Check if bottom-left corner has s zeroes going right
   - If all conditions met, return true

3. Return false if no valid square found

**Time Complexity:** O(n^3) where n is matrix dimension
**Space Complexity:** O(n^2) for auxiliary matrices

---

## Similar Problems (Harder)

### 1. Largest Square of Zeroes
**Difficulty:** Very Hard

Return the size of the largest square whose borders are all 0s.

### 2. Maximal Square
**Difficulty:** Medium-Hard

Find the largest square containing only 1s (filled, not just borders).

### 3. Rectangle of Zeroes
**Difficulty:** Very Hard

Find if there exists a rectangle whose borders are all 0s.
