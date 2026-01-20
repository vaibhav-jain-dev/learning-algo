<div id="viz-config" style="display:none">
{"name":"Redundant Connection","algorithm":"graph-cycle","complexity":{"time":"O(N * alpha(N))","space":"O(N)"},"examples":[{"input":{"edges":[[1,2],[1,3],[2,3]]},"output":[2,3],"inputRaw":"edges = [[1,2],[1,3],[2,3]]","outputRaw":"[2,3]"},{"input":{"edges":[[1,2],[2,3],[3,4],[1,4],[1,5]]},"output":[1,4],"inputRaw":"edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]","outputRaw":"[1,4]"}]}
</div>

# Redundant Connection

**Difficulty:** Medium

## Problem Statement

In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with `n` nodes labeled from `1` to `n`, with one additional edge added. The added edge has two different vertices chosen from `1` to `n`, and was not an edge that already existed.

The graph is given as an array `edges` of length `n` where `edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and `bi` in the graph.

Return an edge that can be removed so that the resulting graph is a tree of `n` nodes. If there are multiple answers, return the answer that occurs last in the input.

## Examples

**Example 1:**
```
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

**Example 2:**
```
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
```

## Constraints

- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`
- `1 <= ai < bi <= edges.length`
- `ai != bi`
- There are no repeated edges
- The given graph is connected

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "Which edge creates a cycle in the graph?"

The key insight is that a tree with n nodes has exactly n-1 edges. Since we have n edges, exactly one edge creates a cycle. We need to find that edge.

### Step 2: Identify the Pattern

**Key insight:** This is a **Union-Find (Cycle Detection)** problem because:
- We need to detect when adding an edge creates a cycle
- Two nodes already in the same component + new edge = cycle
- Union-Find efficiently tracks connected components

### Step 3: Define the Algorithm

```
Initialize Union-Find with n nodes
For each edge [u, v]:
    If find(u) == find(v):
        This edge creates cycle - return it!
    Else:
        Union(u, v)
```

---

## Visual Diagram: How It Works

### Example 1: Finding the Redundant Edge

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Input: edges = [[1,2], [1,3], [2,3]]</strong>

<div style="margin: 20px 0;">
<strong>Step 1: Process edge [1,2]</strong>
<div style="display: flex; align-items: center; gap: 30px; margin: 10px 0;">
  <div style="display: flex; gap: 10px;">
    <span style="background: #28a745; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">1</span>
    <span style="font-size: 24px;">---</span>
    <span style="background: #28a745; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">2</span>
  </div>
  <span style="background: white; border: 2px solid #333; color: black; padding: 15px; border-radius: 50%; font-weight: bold;">3</span>
</div>
<div style="color: #28a745;">Union(1,2): Components = {1,2}, {3}</div>
</div>

<div style="margin: 20px 0;">
<strong>Step 2: Process edge [1,3]</strong>
<div style="display: flex; align-items: center; gap: 30px; margin: 10px 0;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
    <span style="background: #007bff; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">1</span>
    <span style="font-size: 20px;">|</span>
    <span style="background: #007bff; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">3</span>
  </div>
  <span style="background: #007bff; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">2</span>
</div>
<div style="color: #007bff;">Union(1,3): Components = {1,2,3}</div>
</div>

<div style="margin: 20px 0;">
<strong>Step 3: Process edge [2,3]</strong>
<div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin: 10px 0;">
  <span style="background: #dc3545; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">1</span>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <span style="font-size: 18px;">\&nbsp;&nbsp;&nbsp;&nbsp;/</span>
  </div>
</div>
<div style="display: flex; justify-content: center; gap: 50px; margin: 10px 0;">
  <span style="background: #dc3545; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">2</span>
  <span style="background: #dc3545; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">3</span>
</div>
<div style="color: #dc3545; font-weight: bold;">find(2) == find(3) == 1 -> CYCLE! Return [2,3]</div>
</div>
</div>

### Union-Find State Visualization

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Union-Find Parent Array Evolution:</strong>

<div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
  <div style="font-weight: bold; margin-bottom: 10px;">Initial</div>
  <table style="border-collapse: collapse;">
    <tr><td style="padding: 5px; border: 1px solid #ddd;">Node</td><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">3</td></tr>
    <tr><td style="padding: 5px; border: 1px solid #ddd;">Parent</td><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">3</td></tr>
  </table>
</div>

<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
  <div style="font-weight: bold; margin-bottom: 10px;">After [1,2]</div>
  <table style="border-collapse: collapse;">
    <tr><td style="padding: 5px; border: 1px solid #ddd;">Node</td><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">3</td></tr>
    <tr><td style="padding: 5px; border: 1px solid #ddd;">Parent</td><td style="padding: 5px; border: 1px solid #ddd; background: #d4edda;">1</td><td style="padding: 5px; border: 1px solid #ddd; background: #d4edda;">1</td><td style="padding: 5px; border: 1px solid #ddd;">3</td></tr>
  </table>
</div>

<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
  <div style="font-weight: bold; margin-bottom: 10px;">After [1,3]</div>
  <table style="border-collapse: collapse;">
    <tr><td style="padding: 5px; border: 1px solid #ddd;">Node</td><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">3</td></tr>
    <tr><td style="padding: 5px; border: 1px solid #ddd;">Parent</td><td style="padding: 5px; border: 1px solid #ddd; background: #cce5ff;">1</td><td style="padding: 5px; border: 1px solid #ddd; background: #cce5ff;">1</td><td style="padding: 5px; border: 1px solid #ddd; background: #cce5ff;">1</td></tr>
  </table>
</div>
</div>

<div style="background: #f8d7da; padding: 10px; border-radius: 4px; margin-top: 15px;">
<strong>Edge [2,3]:</strong> find(2)=1, find(3)=1 -> Same component -> <strong>CYCLE DETECTED!</strong>
</div>
</div>

---

## Solution Approaches

### Approach 1: Union-Find with Path Compression

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * alpha(n)) ~ O(n) |
| Space Complexity | O(n) |

**Why this is optimal:**
- Union-Find with path compression and union by rank is nearly O(1) per operation
- We process each edge exactly once
- Immediately detect when a cycle forms

### Approach 2: DFS Cycle Detection

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(n) |

**Alternative approach:**
- For each edge, check if path exists between endpoints
- Less efficient but doesn't require Union-Find knowledge

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Union-Find | O(n * alpha(n)) | O(n) | Optimal solution |
| DFS per edge | O(n^2) | O(n) | Understanding basics |

---

## Related Problems

- Cycle in Graph (main problem)
- Redundant Connection II (directed graph version)
- Graph Valid Tree
