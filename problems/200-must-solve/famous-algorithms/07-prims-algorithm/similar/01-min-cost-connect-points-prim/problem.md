<div id="viz-config" style="display:none">
{"name":"Min Cost to Connect Points (Prim's)","algorithm":"prims-algorithm","complexity":{"time":"O(n^2 log n)","space":"O(n)"},"examples":[{"input":{"points":[[0,0],[2,2],[3,10],[5,2],[7,0]]},"output":20,"inputRaw":"points = [[0,0],[2,2],[3,10],[5,2],[7,0]]","outputRaw":"20"}]}
</div>

# Min Cost to Connect Points (Prim's Approach)

**Difficulty:** Medium

## Problem Statement

Connect all points with minimum cost using Manhattan distance. Use Prim's algorithm instead of Kruskal's.

## Examples

**Example 1:**
```
Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Step</th>
<th style="border: 1px solid #ddd; padding: 10px;">MST Vertices</th>
<th style="border: 1px solid #ddd; padding: 10px;">Min Edge Added</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">{0, 1}</td>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">{0, 1, 3}</td>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
</tr>
</table>

## Approach

Use Prim's with priority queue. O(n^2) edges but only O(n) vertices.

**Time Complexity:** O(n^2 log n) with heap, O(n^2) with dense approach
**Space Complexity:** O(n)
