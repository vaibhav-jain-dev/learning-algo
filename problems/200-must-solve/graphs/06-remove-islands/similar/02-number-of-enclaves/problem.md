# Number of Enclaves

**Difficulty:** Medium

## Problem Statement

You are given an `m x n` binary matrix `grid`, where `0` represents water and `1` represents land.

An island is a maximal 4-directionally connected group of `1`s.

An **enclave** is a land cell that cannot reach any boundary cell of the grid by walking through land cells.

Return the number of land cells in `grid` that are enclaves.

## Examples

**Example 1:**
```
Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
Output: 3
Explanation: There are 3 land cells (1s) that cannot reach the boundary.
```

---

## Visual Diagram

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<div style="display: grid; grid-template-columns: repeat(4, 40px); gap: 3px; margin: 10px 0;">
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white;">1</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">1</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">1</div>
<div style="width: 40px; height: 40px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">1</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white;">0</div>
</div>

<div style="display: flex; gap: 10px; margin-top: 10px;">
  <span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px;">Can reach border</span>
  <span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 4px;">Enclaves (count = 3)</span>
</div>
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(m * n) |
| Space Complexity | O(m * n) |
