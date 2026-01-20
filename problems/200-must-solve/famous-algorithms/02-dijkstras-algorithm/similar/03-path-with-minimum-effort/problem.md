# Path With Minimum Effort

**Difficulty:** Medium

## Problem Statement

You are given a 2D array of `heights` representing a map. You need to travel from the top-left cell `(0, 0)` to the bottom-right cell `(rows-1, cols-1)`. The **effort** of a path is the maximum absolute difference in heights between two consecutive cells.

Return the minimum effort required to travel from the top-left to the bottom-right.

## Examples

**Example 1:**
```
Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: Path 1->2->2->2->5 has maximum difference = 2
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr>
<td style="border: 1px solid #ddd; padding: 15px; text-align: center; background: #d4edda;">1</td>
<td style="border: 1px solid #ddd; padding: 15px; text-align: center; background: #d4edda;">2</td>
<td style="border: 1px solid #ddd; padding: 15px; text-align: center; background: #d4edda;">2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 15px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 15px; text-align: center;">8</td>
<td style="border: 1px solid #ddd; padding: 15px; text-align: center; background: #d4edda;">2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 15px; text-align: center;">5</td>
<td style="border: 1px solid #ddd; padding: 15px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 15px; text-align: center; background: #d4edda;">5</td>
</tr>
</table>

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Path differences:</strong> |1-2|=1, |2-2|=0, |2-2|=0, |2-5|=3... But going right then down gives max=2
</div>

## Approach

Use modified Dijkstra's where the "distance" is the maximum effort (not sum). Always process the cell with minimum effort first.

**Time Complexity:** O(M * N * log(M * N))
**Space Complexity:** O(M * N)
