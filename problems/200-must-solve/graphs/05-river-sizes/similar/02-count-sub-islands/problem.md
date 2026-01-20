<div id="viz-config" style="display:none">
{"name":"Count Sub Islands","algorithm":"graph-flood-fill","complexity":{"time":"O(M * N)","space":"O(M * N)"},"examples":[{"input":{"grid1":[[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]],"grid2":[[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]},"output":3,"inputRaw":"Two 5x5 grids","outputRaw":"3"}]}
</div>

# Count Sub Islands

**Difficulty:** Medium

## Problem Statement

You are given two `m x n` binary matrices `grid1` and `grid2` containing only `0`'s (representing water) and `1`'s (representing land). An island is a group of `1`'s connected 4-directionally.

An island in `grid2` is considered a **sub-island** if there is an island in `grid1` that contains all the cells that make up this island in `grid2`.

Return the number of islands in `grid2` that are considered sub-islands.

## Examples

**Example 1:**
```
Input:
grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]]
grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
Output: 3
Explanation: Grid2 has 4 islands, 3 of which are sub-islands of grid1.
```

## Constraints

- `m == grid1.length == grid2.length`
- `n == grid1[i].length == grid2[i].length`
- `1 <= m, n <= 500`
- `grid1[i][j]` and `grid2[i][j]` are either `0` or `1`

---

## Visual Diagram: How It Works

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Comparing Two Grids:</strong>

<div style="display: flex; gap: 40px; margin: 20px 0; flex-wrap: wrap;">
<div>
<strong>Grid 1 (Reference):</strong>
<div style="display: grid; grid-template-columns: repeat(5, 35px); gap: 2px; margin: 10px 0;">
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
</div>
</div>

<div>
<strong>Grid 2 (Check Sub-islands):</strong>
<div style="display: grid; grid-template-columns: repeat(5, 35px); gap: 2px; margin: 10px 0;">
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
<div style="width: 35px; height: 35px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">0</div>
</div>
</div>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 4px; margin: 10px 0;">
<strong>Sub-island check:</strong> Island in grid2 is sub-island if ALL its cells are 1 in grid1
</div>
<div style="background: #f8d7da; padding: 10px; border-radius: 4px;">
<strong style="color: #dc3545;">Red cell (2,1):</strong> This is 1 in grid2 but 0 in grid1 - NOT a sub-island
</div>
</div>

---

## Solution Approach

| Metric | Value |
|--------|-------|
| Time Complexity | O(m * n) |
| Space Complexity | O(m * n) |

**Algorithm:**
1. For each island in grid2, check if ALL cells are also 1 in grid1
2. Use DFS to explore island, track if any cell is 0 in grid1
3. Count islands that are fully contained in grid1

---

## Related Problems

- River Sizes (main problem)
- Number of Islands
- Max Area of Island
