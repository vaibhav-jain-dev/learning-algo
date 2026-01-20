<div id="viz-config" style="display:none">
{"name":"Kth Ancestor of a Tree Node","algorithm":"graph-ancestor","complexity":{"time":"O(N log N) preprocessing, O(log K) query","space":"O(N log N)"},"examples":[{"input":{"n":7,"parent":[-1,0,0,1,1,2,2],"queries":[[3,1],[5,2],[6,3]]},"output":[1,0,-1],"inputRaw":"n=7, parent=[-1,0,0,1,1,2,2]","outputRaw":"[1, 0, -1]"}]}
</div>

# Kth Ancestor of a Tree Node

**Difficulty:** Hard

## Problem Statement

You are given a tree with `n` nodes numbered from `0` to `n - 1` in the form of a parent array `parent` where `parent[i]` is the parent of `i`th node. The root of the tree is node `0`. Find the `k`th ancestor of a given node.

The `k`th ancestor of a tree node is the `k`th node in the path from that node to the root node.

Implement the `TreeAncestor` class:
- `TreeAncestor(int n, int[] parent)` Initializes the object with the number of nodes in the tree and the parent array.
- `int getKthAncestor(int node, int k)` Return the `k`th ancestor of the given node. If there is no such ancestor, return `-1`.

## Examples

**Example 1:**
```
Input:
["TreeAncestor", "getKthAncestor", "getKthAncestor", "getKthAncestor"]
[[7, [-1, 0, 0, 1, 1, 2, 2]], [3, 1], [5, 2], [6, 3]]
Output: [null, 1, 0, -1]

Explanation:
TreeAncestor treeAncestor = new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2]);
treeAncestor.getKthAncestor(3, 1); // returns 1 (parent of 3)
treeAncestor.getKthAncestor(5, 2); // returns 0 (grandparent of 5)
treeAncestor.getKthAncestor(6, 3); // returns -1 (no 3rd ancestor)
```

## Constraints

- `1 <= k <= n <= 5 * 10^4`
- `parent.length == n`
- `parent[0] == -1`
- `0 <= parent[i] < n` for all `0 < i < n`
- `0 <= node < n`
- There will be at most `5 * 10^4` queries

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How can I find the kth ancestor efficiently for many queries?"

Naive approach: Walk up k times - O(k) per query, too slow for large k.

### Step 2: Identify the Pattern

**Key insight:** This is a **Binary Lifting** problem because:
- We can precompute ancestors at powers of 2
- Any k can be represented in binary
- Jump using binary representation of k

### Step 3: Define the Algorithm

```
Preprocessing:
    ancestor[node][j] = 2^j th ancestor of node
    ancestor[node][0] = parent[node]
    ancestor[node][j] = ancestor[ancestor[node][j-1]][j-1]

Query(node, k):
    For each bit j set in k:
        node = ancestor[node][j]
        If node == -1: return -1
    Return node
```

---

## Visual Diagram: How It Works

### Example Tree Structure

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Tree with parent = [-1, 0, 0, 1, 1, 2, 2]</strong>

<div style="text-align: center; margin: 20px 0;">

<div style="margin: 10px 0;">
  <span style="background: #007bff; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">0</span>
  <span style="color: #666; font-size: 12px;"> (root)</span>
</div>

<div style="display: flex; justify-content: center; margin: 5px 0;">
  <span style="color: #666;">/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \</span>
</div>

<div style="display: flex; justify-content: center; gap: 80px; margin: 10px 0;">
  <span style="background: #28a745; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">1</span>
  <span style="background: #28a745; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">2</span>
</div>

<div style="display: flex; justify-content: center; gap: 30px; margin: 5px 0;">
  <span style="color: #666;">/ &nbsp;&nbsp; \</span>
  <span style="color: #666;">/ &nbsp;&nbsp; \</span>
</div>

<div style="display: flex; justify-content: center; gap: 25px; margin: 10px 0;">
  <span style="background: #dc3545; color: white; padding: 10px 14px; border-radius: 50%; font-weight: bold;">3</span>
  <span style="background: #6c757d; color: white; padding: 10px 14px; border-radius: 50%; font-weight: bold;">4</span>
  <span style="background: #ffc107; color: black; padding: 10px 14px; border-radius: 50%; font-weight: bold;">5</span>
  <span style="background: #17a2b8; color: white; padding: 10px 14px; border-radius: 50%; font-weight: bold;">6</span>
</div>

</div>
</div>

### Binary Lifting Table

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Precomputed ancestor[node][j] = 2^j-th ancestor:</strong>

<table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
<tr style="background: #007bff; color: white;">
  <th style="padding: 10px; border: 1px solid #ddd;">Node</th>
  <th style="padding: 10px; border: 1px solid #ddd;">2^0 = 1st</th>
  <th style="padding: 10px; border: 1px solid #ddd;">2^1 = 2nd</th>
  <th style="padding: 10px; border: 1px solid #ddd;">2^2 = 4th</th>
</tr>
<tr>
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">0</td>
  <td style="padding: 10px; border: 1px solid #ddd;">-1</td>
  <td style="padding: 10px; border: 1px solid #ddd;">-1</td>
  <td style="padding: 10px; border: 1px solid #ddd;">-1</td>
</tr>
<tr style="background: #f8f9fa;">
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">1</td>
  <td style="padding: 10px; border: 1px solid #ddd;">0</td>
  <td style="padding: 10px; border: 1px solid #ddd;">-1</td>
  <td style="padding: 10px; border: 1px solid #ddd;">-1</td>
</tr>
<tr>
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">2</td>
  <td style="padding: 10px; border: 1px solid #ddd;">0</td>
  <td style="padding: 10px; border: 1px solid #ddd;">-1</td>
  <td style="padding: 10px; border: 1px solid #ddd;">-1</td>
</tr>
<tr style="background: #f8f9fa;">
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">3</td>
  <td style="padding: 10px; border: 1px solid #ddd; background: #d4edda;">1</td>
  <td style="padding: 10px; border: 1px solid #ddd; background: #cce5ff;">0</td>
  <td style="padding: 10px; border: 1px solid #ddd;">-1</td>
</tr>
<tr>
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">5</td>
  <td style="padding: 10px; border: 1px solid #ddd;">2</td>
  <td style="padding: 10px; border: 1px solid #ddd; background: #cce5ff;">0</td>
  <td style="padding: 10px; border: 1px solid #ddd;">-1</td>
</tr>
<tr style="background: #f8f9fa;">
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">6</td>
  <td style="padding: 10px; border: 1px solid #ddd;">2</td>
  <td style="padding: 10px; border: 1px solid #ddd;">0</td>
  <td style="padding: 10px; border: 1px solid #ddd;">-1</td>
</tr>
</table>
</div>

### Query Visualization

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Query: getKthAncestor(5, 2)</strong>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">
<div style="margin: 10px 0;">
  <strong>k = 2 in binary: 10</strong>
</div>
<div style="display: flex; align-items: center; gap: 20px; margin: 15px 0;">
  <span style="background: #ffc107; color: black; padding: 12px; border-radius: 50%;">5</span>
  <span style="font-size: 20px;">&#8594;</span>
  <span style="color: #666;">Jump 2^1 = 2 steps</span>
  <span style="font-size: 20px;">&#8594;</span>
  <span style="background: #007bff; color: white; padding: 12px; border-radius: 50%;">0</span>
</div>
<div style="color: #28a745; font-weight: bold;">Result: 0 (grandparent of 5)</div>
</div>

<strong>Query: getKthAncestor(6, 3)</strong>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">
<div style="margin: 10px 0;">
  <strong>k = 3 in binary: 11</strong>
</div>
<div style="display: flex; align-items: center; gap: 10px; margin: 15px 0;">
  <span style="background: #17a2b8; color: white; padding: 10px; border-radius: 50%;">6</span>
  <span>&#8594;</span>
  <span style="color: #666;">2^0</span>
  <span>&#8594;</span>
  <span style="background: #28a745; color: white; padding: 10px; border-radius: 50%;">2</span>
  <span>&#8594;</span>
  <span style="color: #666;">2^1</span>
  <span>&#8594;</span>
  <span style="background: #dc3545; color: white; padding: 10px; border-radius: 50%;">-1</span>
</div>
<div style="color: #dc3545; font-weight: bold;">Result: -1 (no 3rd ancestor exists)</div>
</div>
</div>

---

## Solution Approaches

### Approach 1: Binary Lifting (Optimal)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n log n) preprocessing, O(log k) per query |
| Space Complexity | O(n log n) |

**Why this is optimal:**
- Precompute powers of 2 ancestors
- Any k can be decomposed into sum of powers of 2
- Jump using bits of k

### Approach 2: Naive Parent Walking

| Metric | Value |
|--------|-------|
| Time Complexity | O(k) per query |
| Space Complexity | O(1) |

**Too slow for:**
- Large k values
- Many queries

---

## Complexity Comparison

| Approach | Preprocessing | Query | Space |
|----------|--------------|-------|-------|
| Binary Lifting | O(n log n) | O(log k) | O(n log n) |
| Naive | O(1) | O(k) | O(1) |

---

## Related Problems

- Youngest Common Ancestor (main problem)
- LCA with Binary Lifting
- Jump Game variants
