<div id="viz-config" style="display:none">
{"name":"Surrounded Regions","algorithm":"graph-flood-fill","complexity":{"time":"O(M * N)","space":"O(M * N)"},"examples":[{"input":{"board":[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]},"output":[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]],"inputRaw":"4x4 board with O's","outputRaw":"Board with surrounded O's captured"}]}
</div>

# Surrounded Regions

**Difficulty:** Medium

## Problem Statement

Given an `m x n` matrix `board` containing `'X'` and `'O'`, capture all regions that are 4-directionally surrounded by `'X'`.

A region is captured by flipping all `'O'`s into `'X'`s in that surrounded region.

## Examples

**Example 1:**
```
Input: board = [
  ["X","X","X","X"],
  ["X","O","O","X"],
  ["X","X","O","X"],
  ["X","O","X","X"]
]
Output: [
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","O","X","X"]
]
Explanation: The bottom 'O' is on the border, so it's not surrounded.
The middle region is surrounded and captured.
```

---

## Visual Diagram: How It Works

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Key Insight: Start from borders, mark 'O's that can't be captured</strong>

<div style="display: flex; gap: 40px; margin: 20px 0; flex-wrap: wrap;">
<div>
<strong>Before:</strong>
<div style="display: grid; grid-template-columns: repeat(4, 40px); gap: 2px; margin: 10px 0;">
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">O</div>
<div style="width: 40px; height: 40px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">O</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white;">O</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white;">O</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
</div>
</div>

<div>
<strong>After:</strong>
<div style="display: grid; grid-template-columns: repeat(4, 40px); gap: 2px; margin: 10px 0;">
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white;">O</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
<div style="width: 40px; height: 40px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">X</div>
</div>
</div>
</div>

<div style="display: flex; gap: 10px; margin-top: 15px;">
  <span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 4px;">Surrounded - Captured</span>
  <span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px;">On Border - Safe</span>
</div>
</div>

---

## Algorithm

1. DFS from all border 'O's, mark them as safe (e.g., '#')
2. Flip all remaining 'O's to 'X' (they're surrounded)
3. Restore '#' back to 'O'

| Metric | Value |
|--------|-------|
| Time Complexity | O(m * n) |
| Space Complexity | O(m * n) |

---

## Related Problems

- Remove Islands (main problem)
- Number of Enclaves
- Flood Fill
