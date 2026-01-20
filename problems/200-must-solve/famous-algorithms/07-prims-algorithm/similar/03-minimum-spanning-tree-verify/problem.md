<div id="viz-config" style="display:none">
{"name":"Minimum Spanning Tree Verification","algorithm":"prims-algorithm","complexity":{"time":"O(E log V)","space":"O(V + E)"},"examples":[{"input":{"n":4,"graphEdges":[[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]],"proposed":[[0,1,1],[0,2,2],[1,3,4]]},"output":true,"inputRaw":"n = 4, graph edges: [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]], proposed: [[0,1,1],[0,2,2],[1,3,4]]","outputRaw":"true"}]}
</div>

# Minimum Spanning Tree Verification

**Difficulty:** Medium

## Problem Statement

Given a graph and a proposed spanning tree, verify if the proposed tree is indeed a minimum spanning tree.

## Examples

**Example 1:**
```
Input: n = 4
  graph edges: [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]]
  proposed: [[0,1,1],[0,2,2],[1,3,4]]

Output: true (total weight 7 matches MST weight)
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Check</th>
<th style="border: 1px solid #ddd; padding: 10px;">Result</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Is connected tree?</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Yes</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Has n-1 edges?</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Yes</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Weight equals MST?</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Yes</td>
</tr>
</table>

## Approach

1. Verify tree has n-1 edges and is connected
2. Compute actual MST weight
3. Compare proposed weight with MST weight

**Time Complexity:** O(E log V)
**Space Complexity:** O(V + E)
