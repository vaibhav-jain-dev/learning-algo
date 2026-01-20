# Spiral Matrix III (Starting Point)

**Difficulty:** Medium

## Problem Statement

You start at cell `(rStart, cStart)` in a `rows x cols` grid. You walk in a clockwise spiral pattern starting with moving right, visiting all cells in the grid. Return the coordinates of all cells in the order you visit them.

## Examples

**Example 1:**
```
Input: rows = 1, cols = 4, rStart = 0, cStart = 0
Output: [[0,0], [0,1], [0,2], [0,3]]
```

**Example 2:**
```
Input: rows = 5, cols = 6, rStart = 1, cStart = 4
Output: [[1,4], [1,5], [2,5], [2,4], [2,3], [1,3], [0,3], [0,4], [0,5], [3,5], [3,4], [3,3], [3,2], [2,2], [1,2], [0,2], [4,5], [4,4], [4,3], [4,2], [4,1], [3,1], [2,1], [1,1], [0,1], [4,0], [3,0], [2,0], [1,0], [0,0]]
```

## Constraints

- 1 <= rows, cols <= 100
- 0 <= rStart < rows
- 0 <= cStart < cols

---

## Visual Diagram: How It Works

### Input: rows = 3, cols = 3, rStart = 1, cStart = 1

Starting from center, spiral outward:

<table style="border-collapse: collapse; margin: 20px 0;">
<tr>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center; width: 60px;">(0,0)<br>7</td>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center; width: 60px;">(0,1)<br>6</td>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center; width: 60px;">(0,2)<br>5</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center;">(1,0)<br>8</td>
<td style="border: 2px solid #007bff; padding: 20px; text-align: center; background: #e7f3ff;">(1,1)<br><strong>1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center;">(1,2)<br>2</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center;">(2,0)<br>9</td>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center;">(2,1)<br>4</td>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center;">(2,2)<br>3</td>
</tr>
</table>

### Spiral Pattern from Starting Point

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Walk pattern:</strong><br>
1. Walk 1 step right<br>
2. Walk 1 step down<br>
3. Walk 2 steps left<br>
4. Walk 2 steps up<br>
5. Walk 3 steps right<br>
6. Walk 3 steps down<br>
... (increase distance after every 2 direction changes)
</div>

### Step-by-Step

<div style="display: flex; gap: 5px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 5px;">Start (1,1)</span>
<span>-></span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px;">R (1,2)</span>
<span>-></span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px;">D (2,2)</span>
<span>-></span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px;">L (2,1)</span>
<span>-></span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px;">L (2,0)</span>
</div>

<div style="display: flex; gap: 5px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span>-></span>
<span style="background: #ffc107; color: black; padding: 5px 10px; border-radius: 5px;">U (1,0)</span>
<span>-></span>
<span style="background: #ffc107; color: black; padding: 5px 10px; border-radius: 5px;">U (0,0)</span>
<span>-></span>
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 5px;">R (0,1)</span>
<span>-></span>
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 5px;">R (0,2)</span>
<span>-></span>
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 5px;">R (skip-out)</span>
</div>

---

## Algorithm

```
steps_in_direction = 1
directions = [(0,1), (1,0), (0,-1), (-1,0)]  # R, D, L, U

while visited < rows * cols:
    for 2 directions:
        for steps_in_direction times:
            if cell is within bounds:
                add to result
            move in current direction
        turn clockwise
    steps_in_direction += 1
```

---

## Solution Approaches

### Approach 1: Simulation (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(max(rows, cols)^2) |
| Space Complexity | O(rows * cols) for result |

**Why this is best:**
- Direct simulation of the problem
- Easy to understand
- Handles out-of-bounds naturally
