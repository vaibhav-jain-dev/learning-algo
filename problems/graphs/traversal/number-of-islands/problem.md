# Number of Islands

## Problem Description

Given an `m x n` 2D binary grid which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.

## Examples

### Example 1

```
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]

Output: 1

Explanation: There is one island formed by the connected 1s in the upper-left region.
```

### Example 2

```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]

Output: 3

Explanation: There are three separate islands:
- Top-left (2x2 block)
- Middle (single cell)
- Bottom-right (two cells)
```

### Example 3

```
Input: grid = [
  ["1","0","1","0","1"],
  ["0","1","0","1","0"],
  ["1","0","1","0","1"]
]

Output: 8

Explanation: Each 1 is isolated, forming 8 separate islands.
```

## Constraints

- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 300
- grid[i][j] is '0' or '1'

## Hints

<details>
<summary>Hint 1</summary>
This is a connected components problem. Each island is a connected component of 1s.
</details>

<details>
<summary>Hint 2</summary>
Use DFS or BFS to explore and mark all cells belonging to an island when you find a '1'.
</details>

<details>
<summary>Hint 3</summary>
You can modify the grid in-place by changing visited '1's to '0's (or use a separate visited array).
</details>

<details>
<summary>Hint 4</summary>
Count the number of times you initiate a new DFS/BFS - that's the number of islands.
</details>

## Approach

### DFS Solution

1. Iterate through each cell in the grid
2. When you find a '1' that hasn't been visited:
   - Increment island count
   - Use DFS to mark all connected land cells as visited
3. DFS explores in 4 directions (up, down, left, right)

### BFS Solution

Similar to DFS but uses a queue to explore cells level by level.

### Union-Find Solution

1. Create a union-find data structure
2. Union adjacent land cells
3. Count the number of distinct components

### Complexity Analysis

- **Time**: O(m * n) - visit each cell once
- **Space**:
  - O(m * n) for DFS recursion stack in worst case
  - O(min(m, n)) for BFS queue
  - O(m * n) for Union-Find

### Key Points

- Mark cells as visited to avoid revisiting
- Four-directional connectivity (not eight)
- Can modify input grid to save space (set visited cells to '0')
