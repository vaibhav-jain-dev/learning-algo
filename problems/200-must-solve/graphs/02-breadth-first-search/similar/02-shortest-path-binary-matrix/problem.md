# Shortest Path in Binary Matrix

**Difficulty:** Medium

## Problem Statement

Given an `n x n` binary matrix `grid`, return the length of the shortest **clear path** in the matrix. If there is no clear path, return `-1`.

A **clear path** in a binary matrix is a path from the **top-left** cell (i.e., `(0, 0)`) to the **bottom-right** cell (i.e., `(n - 1, n - 1)`) such that:

- All the visited cells of the path are `0`
- All the adjacent cells of the path are **8-directionally** connected (i.e., they are different and they share an edge or a corner)

The **length** of a clear path is the number of visited cells of this path.

## Examples

**Example 1:**
```
Input: grid = [[0,1],[1,0]]
Output: 2
```

**Example 2:**
```
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
```

**Example 3:**
```
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
Explanation: Starting cell (0,0) is blocked.
```

## Constraints

- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 100`
- `grid[i][j]` is `0` or `1`

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "Why is BFS the right approach for shortest path?"

Key insight:
- BFS explores nodes level by level (by distance from source)
- First time we reach destination is guaranteed to be the shortest path
- Each step we can move in 8 directions

### Step 2: Identify the Pattern

**Key insight:** This is a **BFS shortest path in unweighted graph** problem because:
- All edges have the same weight (1 step)
- BFS guarantees shortest path in unweighted graphs
- Grid cells are nodes, adjacent cells are edges

### Step 3: Define the Algorithm

```
If grid[0][0] or grid[n-1][n-1] is blocked:
    return -1

queue = [(0, 0)]
mark (0, 0) as visited
path_length = 1

While queue not empty:
    For each cell at current level:
        If cell is destination:
            return path_length
        For each of 8 neighbors:
            If valid and not visited:
                mark visited
                add to queue
    path_length++

return -1  // No path found
```

---

## Visual Diagram: How It Works

### Input Grid

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">

<div style="text-align: center; margin-bottom: 15px; font-weight: bold;">
grid = [[0,0,0],[1,1,0],[1,1,0]]
</div>

<div style="display: grid; grid-template-columns: repeat(3, 60px); gap: 5px; justify-content: center;">
<div style="width: 60px; height: 60px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 0 10px #28a745;">S</div>
<div style="width: 60px; height: 60px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 60px; height: 60px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 60px; height: 60px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 60px; height: 60px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 0 10px #007bff;">E</div>
</div>

<div style="text-align: center; margin-top: 15px;">
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px; margin: 5px;">Open (0)</span>
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 4px; margin: 5px;">Blocked (1)</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 4px; margin: 5px;">Target</span>
</div>
</div>

### BFS Exploration (8 Directions)

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="text-align: center; margin-bottom: 15px; font-weight: bold;">
8 Possible Directions from Any Cell
</div>
<div style="display: grid; grid-template-columns: repeat(3, 50px); gap: 5px; justify-content: center;">
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">NW</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">N</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">NE</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">W</div>
<div style="width: 50px; height: 50px; background: #ffc107; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">Cell</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">E</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">SW</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">S</div>
<div style="width: 50px; height: 50px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">SE</div>
</div>
</div>

### Step-by-Step BFS

**Step 1:** Distance = 1, explore from (0,0)

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: grid; grid-template-columns: repeat(3, 60px); gap: 5px; justify-content: center;">
<div style="width: 60px; height: 60px; background: #ffc107; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 60px; height: 60px; background: #17a2b8; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">?</div>
<div style="width: 60px; height: 60px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">E</div>
</div>
<div style="text-align: center; margin-top: 10px;">
Queue: [(0,1)] | Path length so far: 1
</div>
</div>

**Step 2:** Distance = 2, explore from (0,1)

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: grid; grid-template-columns: repeat(3, 60px); gap: 5px; justify-content: center;">
<div style="width: 60px; height: 60px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 60px; height: 60px; background: #ffc107; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="width: 60px; height: 60px; background: #17a2b8; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">?</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #17a2b8; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">?</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #007bff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">E</div>
</div>
<div style="text-align: center; margin-top: 10px;">
Queue: [(0,2), (1,2)] | Path length so far: 2
</div>
</div>

**Step 3:** Distance = 3, explore from (0,2) and (1,2)

<div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: grid; grid-template-columns: repeat(3, 60px); gap: 5px; justify-content: center;">
<div style="width: 60px; height: 60px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 60px; height: 60px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="width: 60px; height: 60px; background: #ffc107; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #ffc107; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #17a2b8; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">?</div>
</div>
<div style="text-align: center; margin-top: 10px;">
Queue: [(2,2)] | Path length so far: 3
</div>
</div>

**Step 4:** Distance = 4, reach destination!

<div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: grid; grid-template-columns: repeat(3, 60px); gap: 5px; justify-content: center;">
<div style="width: 60px; height: 60px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 60px; height: 60px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="width: 60px; height: 60px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #6c757d; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #dc3545; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">X</div>
<div style="width: 60px; height: 60px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 0 15px #28a745;">4</div>
</div>
<div style="text-align: center; margin-top: 15px; font-weight: bold; color: #155724;">
FOUND! Shortest path length = 4
</div>
</div>

---

## Solution Approaches

### Approach 1: BFS (Standard)

| Metric | Value |
|--------|-------|
| Time Complexity | O(N^2) |
| Space Complexity | O(N^2) for visited set |

**Why this is best:**
- BFS guarantees shortest path in unweighted graph
- Simple and intuitive
- Standard grid traversal pattern

### Approach 2: A* Search

| Metric | Value |
|--------|-------|
| Time Complexity | O(N^2 log N) |
| Space Complexity | O(N^2) |

**When to use:**
- Want to optimize with heuristic
- Large grids where BFS is slow

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| BFS | O(N^2) | O(N^2) | Best for simplicity |
| A* | O(N^2 log N) | O(N^2) | Best for large grids |
