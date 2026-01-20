# Rotting Oranges

**Difficulty:** Medium

## Problem Statement

You are given an `m x n` grid where each cell can have one of three values:
- `0` representing an empty cell
- `1` representing a fresh orange
- `2` representing a rotten orange

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return `-1`.

## Examples

**Example 1:**
```
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
```

---

## Visual Diagram: BFS Level-by-Level

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Multi-source BFS - spread from all rotten oranges simultaneously:</strong>

<div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 5px;">t=0</div>
<div style="display: grid; grid-template-columns: repeat(3, 35px); gap: 2px;">
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
<div style="width: 35px; height: 35px; background: #ffc107; display: flex; align-items: center; justify-content: center; color: black;">1</div>
<div style="width: 35px; height: 35px; background: #ffc107; display: flex; align-items: center; justify-content: center; color: black;">1</div>
<div style="width: 35px; height: 35px; background: #ffc107; display: flex; align-items: center; justify-content: center; color: black;">1</div>
<div style="width: 35px; height: 35px; background: #ffc107; display: flex; align-items: center; justify-content: center; color: black;">1</div>
<div style="width: 35px; height: 35px; background: #6c757d; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 35px; height: 35px; background: #6c757d; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 35px; height: 35px; background: #ffc107; display: flex; align-items: center; justify-content: center; color: black;">1</div>
<div style="width: 35px; height: 35px; background: #ffc107; display: flex; align-items: center; justify-content: center; color: black;">1</div>
</div>
</div>

<div style="font-size: 24px; margin-top: 20px;">&#8594;</div>

<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 5px;">t=1</div>
<div style="display: grid; grid-template-columns: repeat(3, 35px); gap: 2px;">
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
<div style="width: 35px; height: 35px; background: #ffc107; display: flex; align-items: center; justify-content: center; color: black;">1</div>
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
<div style="width: 35px; height: 35px; background: #ffc107; display: flex; align-items: center; justify-content: center; color: black;">1</div>
<div style="width: 35px; height: 35px; background: #6c757d; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 35px; height: 35px; background: #6c757d; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 35px; height: 35px; background: #ffc107; display: flex; align-items: center; justify-content: center; color: black;">1</div>
<div style="width: 35px; height: 35px; background: #ffc107; display: flex; align-items: center; justify-content: center; color: black;">1</div>
</div>
</div>

<div style="font-size: 24px; margin-top: 20px;">&#8594; ... &#8594;</div>

<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 5px;">t=4</div>
<div style="display: grid; grid-template-columns: repeat(3, 35px); gap: 2px;">
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
<div style="width: 35px; height: 35px; background: #6c757d; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 35px; height: 35px; background: #6c757d; display: flex; align-items: center; justify-content: center; color: white;">0</div>
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
<div style="width: 35px; height: 35px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">2</div>
</div>
</div>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 4px; margin-top: 15px;">
<strong>Result: 4 minutes</strong>
</div>
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(m * n) |
| Space Complexity | O(m * n) |

**Algorithm:**
1. Add all rotten oranges to queue
2. BFS level by level
3. Each level = 1 minute
4. Return levels if all fresh rotted, else -1
