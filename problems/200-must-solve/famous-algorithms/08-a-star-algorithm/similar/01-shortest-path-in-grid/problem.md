<div id="viz-config" style="display:none">
{"name":"Shortest Path in Binary Grid","algorithm":"bfs-astar","complexity":{"time":"O(n^2)","space":"O(n^2)"},"examples":[{"input":{"grid":[[0,0,0],[1,1,0],[1,1,0]]},"output":4,"inputRaw":"grid = [[0,0,0],[1,1,0],[1,1,0]]","outputRaw":"4"}]}
</div>

# Shortest Path in Binary Matrix

**Difficulty:** Medium

## Problem Statement

Given an `n x n` binary matrix `grid`, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

A clear path is a path from the top-left cell (0, 0) to the bottom-right cell (n-1, n-1) such that:
- All visited cells are 0
- All adjacent cells in the path are 8-directionally connected (they share an edge or corner)

The length of a path is the number of visited cells.

## Examples

**Example 1:**
```
Input: grid = [[0,1],[1,0]]
Output: 2
Explanation: Path is (0,0) -> (1,1)
```

**Example 2:**
```
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
Explanation: Path is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2)
```

**Example 3:**
```
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
Explanation: Start cell is blocked
```

## Visual Explanation

### 8-Directional Movement

```
Grid:           8 Directions from (1,1):
+---+---+---+   +---+---+---+
| 0 | 0 | 0 |   | ↖ | ↑ | ↗ |
+---+---+---+   +---+---+---+
| 1 | 1 | 0 |   | ← | X | → |
+---+---+---+   +---+---+---+
| 1 | 1 | 0 |   | ↙ | ↓ | ↘ |
+---+---+---+   +---+---+---+

Path: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Length: 4 cells
```

## Constraints

- n == grid.length == grid[i].length
- 1 <= n <= 100
- grid[i][j] is 0 or 1

## Hints

<details>
<summary>Hint 1</summary>
BFS guarantees shortest path in unweighted graphs. Start from (0,0) and explore all 8 directions.
</details>

<details>
<summary>Hint 2</summary>
For A* optimization, use Chebyshev distance (max of row and column distances) as heuristic for 8-directional movement.
</details>

<details>
<summary>Hint 3</summary>
Mark cells as visited immediately when adding to queue to avoid duplicates.
</details>

## Approach

### BFS Approach

1. Check if start or end is blocked
2. Use BFS with 8-directional expansion
3. Track distance as path length
4. Return distance when reaching bottom-right

**Time Complexity:** O(n^2)
**Space Complexity:** O(n^2)

### A* Enhancement

Use Chebyshev distance heuristic: h(n) = max(|n.row - goal.row|, |n.col - goal.col|)
