# Number of Closed Islands

**Difficulty:** Medium

## Problem Statement

Given a 2D grid consisting of `0`s (land) and `1`s (water), count the number of closed islands.

A closed island is an island totally surrounded by water (0s surrounded by 1s that don't touch the boundary).

## Examples

**Example 1:**
```
Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
Output: 2
```

---

## Visual Diagram

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Closed islands are land (0) completely surrounded by water (1)</strong>

<div style="background: #d4edda; padding: 10px; border-radius: 4px; margin: 10px 0;">
<strong>Algorithm:</strong> Mark border-connected 0s, then count remaining 0-islands
</div>
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(m * n) |
| Space Complexity | O(m * n) |
