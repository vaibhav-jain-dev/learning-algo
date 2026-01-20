<div id="viz-config" style="display:none">
{"name":"Number of Islands","algorithm":"graph-dfs","complexity":{"time":"O(M * N)","space":"O(M * N)"},"examples":[{"input":{"grid":[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]},"output":1,"inputRaw":"4x5 grid","outputRaw":"1"},{"input":{"grid":[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]},"output":3,"inputRaw":"4x5 grid with 3 islands","outputRaw":"3"}]}
</div>

# Number of Islands

**Difficulty:** Medium

## Problem Statement

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.

## Examples

**Example 1:**
```
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

**Example 2:**
```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

## Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I identify connected components in a 2D grid?"

The key insight is that each island is a **connected component** of land cells. We need to:
- Count how many distinct groups of connected `'1'`s exist
- Two cells are connected if they share an edge (up, down, left, right)

### Step 2: Identify the Pattern

**Key insight:** This is a classic **DFS/BFS flood fill** problem because:
- We need to explore all connected cells from a starting point
- We need to mark visited cells to avoid counting them twice
- Each DFS/BFS from an unvisited land cell discovers one island

### Step 3: Define the Algorithm

```
count = 0
For each cell in grid:
    If cell is '1' (unvisited land):
        count += 1
        DFS/BFS to mark all connected land as visited
Return count
```

---

## Visual Diagram: How It Works

### Input Grid

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<div style="display: grid; grid-template-columns: repeat(5, 50px); gap: 5px; justify-content: center;">
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
</div>
<div style="text-align: center; margin-top: 10px;">
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px; margin-right: 10px;">Land (1)</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 4px;">Water (0)</span>
</div>
</div>

### DFS Exploration Process

**Step 1:** Start DFS from cell (0,0)

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<div style="display: grid; grid-template-columns: repeat(5, 50px); gap: 5px; justify-content: center;">
<div style="width: 50px; height: 50px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 0 10px #dc3545;">S</div>
<div style="width: 50px; height: 50px; background: #ffc107; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold;">?</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #ffc107; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold;">?</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
</div>
<div style="text-align: center; margin-top: 10px;">
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 4px; margin-right: 10px;">Current (S)</span>
<span style="background: #ffc107; color: black; padding: 5px 10px; border-radius: 4px;">Next to explore (?)</span>
</div>
</div>

**Step 2:** After DFS completes - all connected land marked as visited

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<div style="display: grid; grid-template-columns: repeat(5, 50px); gap: 5px; justify-content: center;">
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">V</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">V</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">V</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">V</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">V</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">V</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">V</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">V</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">V</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
</div>
<div style="text-align: center; margin-top: 10px;">
<span style="background: #6c757d; color: white; padding: 5px 10px; border-radius: 4px;">Visited (V)</span>
</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Result: 1 Island Found</strong><br>
All land cells are connected - forms a single island
</div>

---

## Solution Approaches

### Approach 1: DFS (Recursive)

| Metric | Value |
|--------|-------|
| Time Complexity | O(m x n) |
| Space Complexity | O(m x n) worst case for recursion stack |

**Why this is good:**
- Simple and intuitive implementation
- Natural way to explore connected components
- Easy to understand the flood-fill pattern

### Approach 2: BFS (Iterative)

| Metric | Value |
|--------|-------|
| Time Complexity | O(m x n) |
| Space Complexity | O(min(m, n)) for the queue |

**When to use:**
- When recursion depth might cause stack overflow
- Prefer iterative solutions

### Approach 3: Union-Find

| Metric | Value |
|--------|-------|
| Time Complexity | O(m x n x alpha(m x n)) |
| Space Complexity | O(m x n) |

**When to use:**
- Need to support dynamic queries
- Want to track component sizes

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| DFS Recursive | O(m x n) | O(m x n) | Best for simplicity |
| BFS Iterative | O(m x n) | O(min(m,n)) | Best for large grids |
| Union-Find | O(m x n x alpha) | O(m x n) | Best for dynamic queries |
