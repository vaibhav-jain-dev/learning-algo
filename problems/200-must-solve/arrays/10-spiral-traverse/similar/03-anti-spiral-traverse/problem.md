# Anti-Spiral Traverse

**Difficulty:** Hard

## Problem Statement

Given an m x n matrix, traverse it in anti-spiral order (counterclockwise from center outward or counterclockwise from outside inward, depending on interpretation).

For this problem, we define anti-spiral as: Start from the center and move counterclockwise outward (left first, then down, right, up).

## Examples

**Example 1:**
```
Input: matrix = [
    [1,  2,  3],
    [4,  5,  6],
    [7,  8,  9]
]
Output: [5, 4, 7, 8, 9, 6, 3, 2, 1]
(Center out, counterclockwise: 5->left->down->right->up)
```

**Example 2:**
```
Input: matrix = [
    [1,  2,  3,  4],
    [5,  6,  7,  8],
    [9,  10, 11, 12]
]
Output: [6, 5, 9, 10, 11, 7, 3, 2, 1, 4, 8, 12]
```

## Constraints

- 1 <= m, n <= 100
- Matrix is not empty

---

## Visual Diagram: How It Works

### Input: 3x3 Matrix

<table style="border-collapse: collapse; margin: 20px 0;">
<tr>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center; width: 50px;">1</td>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center; width: 50px;">2</td>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center; width: 50px;">3</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center;">4</td>
<td style="border: 2px solid #007bff; padding: 20px; text-align: center; background: #e7f3ff;"><strong>5 (start)</strong></td>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center;">6</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center;">7</td>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center;">8</td>
<td style="border: 1px solid #dee2e6; padding: 20px; text-align: center;">9</td>
</tr>
</table>

### Anti-Spiral Pattern (Counterclockwise from Center)

<div style="display: flex; gap: 5px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 5px;">5</span>
<span>-L-></span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px;">4</span>
<span>-D-></span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px;">7</span>
<span>-R-></span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px;">8</span>
<span>-R-></span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px;">9</span>
</div>

<div style="display: flex; gap: 5px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span>-U-></span>
<span style="background: #ffc107; color: black; padding: 5px 10px; border-radius: 5px;">6</span>
<span>-U-></span>
<span style="background: #ffc107; color: black; padding: 5px 10px; border-radius: 5px;">3</span>
<span>-L-></span>
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 5px;">2</span>
<span>-L-></span>
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 5px;">1</span>
</div>

### Direction Order (Counterclockwise)

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Directions:</strong> Left -> Down -> Right -> Up (repeat)<br>
<strong>Step pattern:</strong> 1, 1, 2, 2, 3, 3, ... (same as clockwise spiral)
</div>

---

## Solution Approaches

### Approach 1: Center-Out Counterclockwise

| Metric | Value |
|--------|-------|
| Time Complexity | O(m * n) |
| Space Complexity | O(m * n) |

**Steps:**
1. Find center of matrix
2. Spiral outward counterclockwise
3. Skip out-of-bounds positions
