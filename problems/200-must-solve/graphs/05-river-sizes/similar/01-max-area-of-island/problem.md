<div id="viz-config" style="display:none">
{"name":"Max Area of Island","algorithm":"graph-flood-fill","complexity":{"time":"O(M * N)","space":"O(M * N)"},"examples":[{"input":{"grid":[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]},"output":6,"inputRaw":"8x13 grid","outputRaw":"6"},{"input":{"grid":[[0,0,0,0,0,0,0,0]]},"output":0,"inputRaw":"1x8 grid all zeros","outputRaw":"0"}]}
</div>

# Max Area of Island

**Difficulty:** Medium

## Problem Statement

You are given an `m x n` binary matrix `grid`. An island is a group of `1`'s (representing land) connected 4-directionally (horizontal or vertical). You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value `1` in the island.

Return the maximum area of an island in `grid`. If there is no island, return `0`.

## Examples

**Example 1:**
```
Input: grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
Output: 6
Explanation: The largest island has area 6 (bottom-right region).
```

**Example 2:**
```
Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
```

## Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `grid[i][j]` is either `0` or `1`

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I find the size of each island and track the maximum?"

This extends "Number of Islands" - we don't just count islands, we measure each one.

### Step 2: Identify the Pattern

**Key insight:** This is a **DFS/BFS with Size Tracking** problem:
- Explore each island completely
- Count cells during exploration
- Track maximum size seen

### Step 3: Define the Algorithm

```
max_area = 0
For each cell (r, c) in grid:
    If cell is land (1):
        area = DFS(r, c)  # Returns size of this island
        max_area = max(max_area, area)
Return max_area
```

---

## Visual Diagram: How It Works

### Example Grid

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Finding the Largest Island:</strong>

<div style="display: grid; grid-template-columns: repeat(8, 40px); gap: 3px; justify-content: center; margin: 20px 0;">
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #28a745; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">1</div>
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #ffc107; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 12px;">1</div>
<div style="width: 40px; height: 40px; background: #ffc107; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 12px;">1</div>
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #dc3545; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">1</div>

<div style="width: 40px; height: 40px; background: #28a745; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">1</div>
<div style="width: 40px; height: 40px; background: #28a745; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">1</div>
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #ffc107; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 12px;">1</div>
<div style="width: 40px; height: 40px; background: #ffc107; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 12px;">1</div>
<div style="width: 40px; height: 40px; background: #ffc107; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 12px;">1</div>
<div style="width: 40px; height: 40px; background: #dc3545; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">1</div>

<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">0</div>
<div style="width: 40px; height: 40px; background: #dc3545; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">1</div>
<div style="width: 40px; height: 40px; background: #dc3545; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">1</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
  <span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px;">Island A: Area = 4</span>
  <span style="background: #ffc107; color: black; padding: 5px 10px; border-radius: 4px;">Island B: Area = 6</span>
  <span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 4px;">Island C: Area = 5</span>
  <span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 4px;">Water</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 4px; margin-top: 15px; text-align: center;">
<strong>Maximum Area = 6</strong> (Yellow Island B)
</div>
</div>

### DFS Size Calculation

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>DFS from cell (0,4) counting area:</strong>

<div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
<div style="background: white; padding: 10px; border-radius: 4px; text-align: center;">
  <div style="font-size: 12px; color: #666;">Step 1</div>
  <div style="background: #dc3545; color: white; padding: 8px; border-radius: 50%; margin: 5px auto; width: 30px;">1</div>
  <div>Visit (0,4)</div>
  <div>Area = 1</div>
</div>
<div style="background: white; padding: 10px; border-radius: 4px; text-align: center;">
  <div style="font-size: 12px; color: #666;">Step 2</div>
  <div style="background: #dc3545; color: white; padding: 8px; border-radius: 50%; margin: 5px auto; width: 30px;">2</div>
  <div>Visit (0,5)</div>
  <div>Area = 2</div>
</div>
<div style="background: white; padding: 10px; border-radius: 4px; text-align: center;">
  <div style="font-size: 12px; color: #666;">Step 3</div>
  <div style="background: #dc3545; color: white; padding: 8px; border-radius: 50%; margin: 5px auto; width: 30px;">3</div>
  <div>Visit (1,4)</div>
  <div>Area = 3</div>
</div>
<div style="background: white; padding: 10px; border-radius: 4px; text-align: center;">
  <div style="font-size: 12px; color: #666;">...</div>
  <div style="background: #28a745; color: white; padding: 8px; border-radius: 50%; margin: 5px auto; width: 30px;">6</div>
  <div>Complete</div>
  <div>Area = 6</div>
</div>
</div>
</div>

---

## Solution Approaches

### Approach 1: DFS Recursive

| Metric | Value |
|--------|-------|
| Time Complexity | O(m * n) |
| Space Complexity | O(m * n) for recursion stack |

### Approach 2: BFS Iterative

| Metric | Value |
|--------|-------|
| Time Complexity | O(m * n) |
| Space Complexity | O(min(m, n)) |

---

## Related Problems

- River Sizes (main problem - returns all sizes)
- Number of Islands
- Island Perimeter
