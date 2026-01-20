<div id="viz-config" style="display:none">
{"name":"All Ancestors of a Node in a DAG","algorithm":"graph-ancestor","complexity":{"time":"O(N^2 + N * E)","space":"O(N^2)"},"examples":[{"input":{"n":8,"edges":[[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]},"output":[[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]],"inputRaw":"n=8, 9 edges","outputRaw":"[[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]"},{"input":{"n":5,"edges":[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]},"output":[[],[0],[0,1],[0,1,2],[0,1,2,3]],"inputRaw":"n=5, 10 edges","outputRaw":"[[],[0],[0,1],[0,1,2],[0,1,2,3]]"}]}
</div>

# All Ancestors of a Node in a Directed Acyclic Graph

**Difficulty:** Medium

## Problem Statement

You are given a positive integer `n` representing the number of nodes of a Directed Acyclic Graph (DAG). The nodes are numbered from `0` to `n - 1` (inclusive).

You are also given a 2D integer array `edges`, where `edges[i] = [fromi, toi]` denotes that there is a unidirectional edge from `fromi` to `toi` in the graph.

Return a list `answer`, where `answer[i]` is the list of ancestors of the `i`th node, sorted in ascending order.

A node `u` is an ancestor of another node `v` if `u` can reach `v` via a set of edges.

## Examples

**Example 1:**
```
Input: n = 8, edges = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]
Output: [[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]
```

**Example 2:**
```
Input: n = 5, edges = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Output: [[],[0],[0,1],[0,1,2],[0,1,2,3]]
```

## Constraints

- `1 <= n <= 1000`
- `0 <= edges.length <= min(2000, n * (n - 1) / 2)`
- `edges[i].length == 2`
- `0 <= fromi, toi <= n - 1`
- `fromi != toi`
- There are no duplicate edges
- The graph is a DAG

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I find ALL nodes that can reach a given node?"

This is the reverse of "find all nodes reachable from X" - instead we need "find all nodes that can reach X".

### Step 2: Identify the Pattern

**Key insight:** This is a **Reverse Graph + DFS/BFS** problem because:
- Build reverse graph (flip edge directions)
- For each node, find all reachable nodes in reverse graph
- Those are the ancestors

Alternative: Use topological sort and propagate ancestor sets.

### Step 3: Define the Algorithm

```
Option 1 - Reverse DFS:
    Build reverse graph
    For each node v:
        DFS from v in reverse graph
        All visited nodes are ancestors of v

Option 2 - Topological Order:
    Process nodes in topological order
    For each edge u -> v:
        ancestors[v] = ancestors[v] union ancestors[u] union {u}
```

---

## Visual Diagram: How It Works

### Example DAG Visualization

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Input: n=8, edges=[[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]</strong>

<div style="text-align: center; margin: 20px 0;">

<div style="display: flex; justify-content: center; gap: 40px; margin: 10px 0;">
  <span style="background: #007bff; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">0</span>
  <span style="background: #28a745; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">1</span>
  <span style="background: #dc3545; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">2</span>
</div>

<div style="color: #666; margin: 5px 0;">&#8595; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#8595; &nbsp;&nbsp;&nbsp;&nbsp; &#8595; &nbsp; &#8600;</div>

<div style="display: flex; justify-content: center; gap: 60px; margin: 10px 0;">
  <span style="background: #ffc107; color: black; padding: 12px 16px; border-radius: 50%; font-weight: bold;">3</span>
  <span style="background: #17a2b8; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">4</span>
</div>

<div style="color: #666; margin: 5px 0;">&#8595; &#8600; &#8601; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#8595;</div>

<div style="display: flex; justify-content: center; gap: 30px; margin: 10px 0;">
  <span style="background: #6c757d; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">5</span>
  <span style="background: #6c757d; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">6</span>
  <span style="background: #6c757d; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">7</span>
</div>

</div>
</div>

### Ancestor Sets

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Computed Ancestors for Each Node:</strong>

<table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
<tr style="background: #007bff; color: white;">
  <th style="padding: 10px; border: 1px solid #ddd;">Node</th>
  <th style="padding: 10px; border: 1px solid #ddd;">Ancestors</th>
  <th style="padding: 10px; border: 1px solid #ddd;">Explanation</th>
</tr>
<tr>
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">0</td>
  <td style="padding: 10px; border: 1px solid #ddd;">[]</td>
  <td style="padding: 10px; border: 1px solid #ddd;">Source node, no ancestors</td>
</tr>
<tr style="background: #f8f9fa;">
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">1</td>
  <td style="padding: 10px; border: 1px solid #ddd;">[]</td>
  <td style="padding: 10px; border: 1px solid #ddd;">Source node, no ancestors</td>
</tr>
<tr>
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">2</td>
  <td style="padding: 10px; border: 1px solid #ddd;">[]</td>
  <td style="padding: 10px; border: 1px solid #ddd;">Source node, no ancestors</td>
</tr>
<tr style="background: #d4edda;">
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">3</td>
  <td style="padding: 10px; border: 1px solid #ddd;">[0, 1]</td>
  <td style="padding: 10px; border: 1px solid #ddd;">Reachable from 0 and 1</td>
</tr>
<tr style="background: #cce5ff;">
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">4</td>
  <td style="padding: 10px; border: 1px solid #ddd;">[0, 2]</td>
  <td style="padding: 10px; border: 1px solid #ddd;">Reachable from 0 and 2</td>
</tr>
<tr style="background: #d4edda;">
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">5</td>
  <td style="padding: 10px; border: 1px solid #ddd;">[0, 1, 3]</td>
  <td style="padding: 10px; border: 1px solid #ddd;">Via 3: gets 0, 1, plus 3 itself</td>
</tr>
<tr style="background: #cce5ff;">
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">6</td>
  <td style="padding: 10px; border: 1px solid #ddd;">[0, 1, 2, 3, 4]</td>
  <td style="padding: 10px; border: 1px solid #ddd;">Via 3 and 4: combines all</td>
</tr>
<tr style="background: #d4edda;">
  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">7</td>
  <td style="padding: 10px; border: 1px solid #ddd;">[0, 1, 2, 3]</td>
  <td style="padding: 10px; border: 1px solid #ddd;">Via 2 and 3</td>
</tr>
</table>
</div>

### Processing with Topological Order

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Propagating Ancestors:</strong>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">
<strong>Topological Order: 0, 1, 2, 3, 4, 5, 6, 7</strong>
</div>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">
<strong>Process node 3:</strong>
<div style="margin: 10px 0;">
  Edges into 3: from 0, from 1
</div>
<div style="display: flex; align-items: center; gap: 10px; margin: 10px 0;">
  <span>ancestors[3] = {}</span>
  <span>&#8746;</span>
  <span style="color: #007bff;">{0}</span>
  <span>&#8746;</span>
  <span style="color: #28a745;">{1}</span>
  <span>=</span>
  <span style="background: #d4edda; padding: 5px 10px; border-radius: 4px;">{0, 1}</span>
</div>
</div>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">
<strong>Process node 6:</strong>
<div style="margin: 10px 0;">
  Edges into 6: from 3, from 4
</div>
<div style="display: flex; align-items: center; gap: 10px; margin: 10px 0; flex-wrap: wrap;">
  <span>ancestors[6] = ancestors[3]</span>
  <span>&#8746;</span>
  <span>{3}</span>
  <span>&#8746;</span>
  <span>ancestors[4]</span>
  <span>&#8746;</span>
  <span>{4}</span>
</div>
<div style="display: flex; align-items: center; gap: 10px; margin: 10px 0;">
  <span>= {0,1} &#8746; {3} &#8746; {0,2} &#8746; {4}</span>
  <span>=</span>
  <span style="background: #cce5ff; padding: 5px 10px; border-radius: 4px;">{0, 1, 2, 3, 4}</span>
</div>
</div>
</div>

---

## Solution Approaches

### Approach 1: Topological Sort + Set Propagation

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2 + n*E) |
| Space Complexity | O(n^2) for ancestor sets |

**Why this works:**
- Process nodes in topological order
- Each node inherits ancestors from all predecessors
- Union of ancestor sets plus immediate parents

### Approach 2: Reverse Graph DFS

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * (V + E)) |
| Space Complexity | O(V + E) |

**Alternative:**
- For each node, DFS in reverse graph
- All reachable nodes are ancestors

---

## Related Problems

- Youngest Common Ancestor (main problem)
- All Paths From Source to Target
- Course Schedule II (topological sort)
