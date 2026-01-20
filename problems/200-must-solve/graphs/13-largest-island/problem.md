<div id="viz-config" style="display:none">
{"name":"Largest Island","algorithm":"graph-largest-island","complexity":{"time":"O(N^2)","space":"O(N^2)"},"examples":[{"input":{"grid":[[1,0],[0,1]]},"output":3,"inputRaw":"[[1,0],[0,1]]","outputRaw":"3"},{"input":{"grid":[[1,1],[1,0]]},"output":4,"inputRaw":"[[1,1],[1,0]]","outputRaw":"4"},{"input":{"grid":[[1,1],[1,1]]},"output":4,"inputRaw":"[[1,1],[1,1]]","outputRaw":"4"}]}
</div>

# Largest Island (Making A Large Island)

**Difficulty:** Hard (Red)

## Problem Statement

You are given an `n x n` binary matrix `grid`. You are allowed to change at most one `0` to be `1`.

Return the size of the largest island in grid after applying this operation.

An island is a 4-directionally connected group of `1`s.

## Examples

**Example 1:**
```
Input: grid = [
  [1, 0],
  [0, 1]
]
Output: 3

Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
```

**Example 2:**
```
Input: grid = [
  [1, 1],
  [1, 0]
]
Output: 4

Explanation: Change the 0 to 1 and make the island bigger. The entire grid becomes one island with area = 4.
```

**Example 3:**
```
Input: grid = [
  [1, 1],
  [1, 1]
]
Output: 4

Explanation: There is no 0 to change, so the answer is the size of the existing island = 4.
```

**Example 4:**
```
Input: grid = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0]
]
Output: 9

Explanation: Change the center 0 to 1, connecting all surrounding 1s into one island of size 9.
```

## Constraints

- n == grid.length
- n == grid[i].length
- 1 <= n <= 500
- grid[i][j] is either 0 or 1

## Hints

<details>
<summary>Hint 1</summary>
A brute force approach would be: for each 0, temporarily change it to 1, run DFS/BFS to find the island size, then revert. This is O(n^4) and too slow.
</details>

<details>
<summary>Hint 2</summary>
Think about preprocessing: first identify all existing islands and compute their sizes. Label each cell with its island ID.
</details>

<details>
<summary>Hint 3</summary>
After labeling, for each 0 cell, check its 4 neighbors. If they belong to different islands, the new island size = sum of those island sizes + 1 (for the flipped cell).
</details>

<details>
<summary>Hint 4</summary>
Use Union-Find (Disjoint Set Union) for efficient island identification. Each island gets a unique ID, and you maintain a size map.
</details>

<details>
<summary>Hint 5</summary>
Be careful not to count the same island twice! If two adjacent cells of a 0 belong to the same island, count that island only once.
</details>

## Approach

### Approach 1: DFS with Island Labeling

1. **First Pass - Label Islands:**
   - Use DFS to find all islands
   - Assign each island a unique ID (starting from 2 to distinguish from 0 and 1)
   - Store island sizes in a hash map: `{island_id: size}`

2. **Second Pass - Check Each 0:**
   - For each 0 cell, look at its 4 neighbors
   - Collect unique island IDs from neighbors
   - Calculate potential size: sum of connected island sizes + 1
   - Track the maximum

3. **Edge Case:**
   - If there are no 0s, return total grid size (all 1s)
   - If there are no 1s, return 1 (flipping one 0)

### Approach 2: Union-Find

1. **Initialize Union-Find:**
   - Create a parent array and size array
   - Each cell is initially its own parent

2. **Union Adjacent 1s:**
   - For each cell with value 1, union it with adjacent 1s
   - Track component sizes during union

3. **Check Each 0:**
   - For each 0, find unique roots of adjacent 1s
   - Sum up sizes of those components + 1

**Time Complexity:** O(n^2)
- First pass: O(n^2) for DFS or Union-Find
- Second pass: O(n^2) to check each 0

**Space Complexity:** O(n^2)
- For island labels or Union-Find data structures

---

## Similar Problems (Harder)

### 1. Number of Islands
**Difficulty:** Medium

Count the number of islands in a binary grid (LeetCode 200).

### 2. Max Area of Island
**Difficulty:** Medium

Find the maximum area of an island in the grid (LeetCode 695).

### 3. Number of Distinct Islands
**Difficulty:** Medium

Count islands with distinct shapes.
