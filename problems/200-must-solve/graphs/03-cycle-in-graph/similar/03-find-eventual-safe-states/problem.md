# Find Eventual Safe States

**Difficulty:** Medium

## Problem Statement

There is a directed graph of `n` nodes with each node labeled from `0` to `n - 1`. The graph is represented by a 0-indexed 2D integer array `graph` where `graph[i]` is an integer array of nodes adjacent to node `i`, meaning there is an edge from node `i` to each node in `graph[i]`.

A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

## Examples

**Example 1:**
```
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: Nodes 5 and 6 are terminal nodes (no outgoing edges).
Node 2 leads to node 5. Node 4 leads to node 5.
Nodes 0, 1, 3 are part of a cycle or lead to a cycle.
```

**Example 2:**
```
Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
Explanation: Only node 4 is terminal and safe.
Nodes 0, 1, 2, 3 are all part of cycles.
```

## Constraints

- `n == graph.length`
- `1 <= n <= 10^4`
- `0 <= graph[i].length <= n`
- `0 <= graph[i][j] <= n - 1`
- `graph[i]` is sorted in strictly increasing order
- The graph may contain self-loops
- The number of edges in the graph is in range `[1, 4 * 10^4]`

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "What makes a node unsafe?"

A node is unsafe if:
1. It's part of a cycle, OR
2. It can reach a node that's part of a cycle

Therefore, a node is safe if all paths from it avoid cycles and reach terminal nodes.

### Step 2: Identify the Pattern

**Key insight:** This is a **Cycle Detection with Classification** problem because:
- Nodes in cycles are unsafe
- Nodes that can reach cycles are unsafe
- Terminal nodes and nodes only reaching safe nodes are safe
- Same 3-state DFS coloring works here!

### Step 3: Define the Algorithm

```
For each node:
    If WHITE: Start DFS
    If GRAY during DFS: Part of cycle - unsafe
    If BLACK: Already classified as safe
Mark nodes that complete DFS without hitting GRAY as safe
```

---

## Visual Diagram: How It Works

### Example Graph Visualization

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]</strong>

<div style="margin: 20px 0; text-align: center;">
<div style="display: inline-block; text-align: left;">

<div style="display: flex; align-items: center; gap: 15px; margin: 10px 0;">
  <span style="background: #dc3545; color: white; padding: 12px 15px; border-radius: 50%; font-weight: bold;">0</span>
  <span>&#8594;</span>
  <span style="background: #dc3545; color: white; padding: 12px 15px; border-radius: 50%; font-weight: bold;">1</span>
  <span>&#8594;</span>
  <span style="background: #28a745; color: white; padding: 12px 15px; border-radius: 50%; font-weight: bold;">2</span>
  <span>&#8594;</span>
  <span style="background: #28a745; color: white; padding: 12px 15px; border-radius: 50%; font-weight: bold;">5</span>
  <span style="color: #28a745;">(terminal)</span>
</div>

<div style="display: flex; align-items: center; gap: 15px; margin: 10px 0;">
  <span style="width: 39px;"></span>
  <span>&#8595;</span>
</div>

<div style="display: flex; align-items: center; gap: 15px; margin: 10px 0;">
  <span style="width: 0px;"></span>
  <span style="background: #dc3545; color: white; padding: 12px 15px; border-radius: 50%; font-weight: bold;">3</span>
  <span>&#8592;&#8592;&#8592;</span>
  <span style="color: #dc3545;">(back to 0 - CYCLE!)</span>
</div>

<div style="display: flex; align-items: center; gap: 15px; margin: 20px 0;">
  <span style="background: #28a745; color: white; padding: 12px 15px; border-radius: 50%; font-weight: bold;">4</span>
  <span>&#8594;</span>
  <span style="background: #28a745; color: white; padding: 12px 15px; border-radius: 50%; font-weight: bold;">5</span>
</div>

<div style="display: flex; align-items: center; gap: 15px; margin: 10px 0;">
  <span style="background: #28a745; color: white; padding: 12px 15px; border-radius: 50%; font-weight: bold;">6</span>
  <span style="color: #28a745;">(terminal)</span>
</div>

</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
  <span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 4px;">Safe Nodes: 2, 4, 5, 6</span>
  <span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 4px;">Unsafe Nodes: 0, 1, 3</span>
</div>
</div>

### DFS State Transitions

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Three-State DFS Classification:</strong>

<div style="display: flex; justify-content: center; gap: 15px; margin: 15px 0; flex-wrap: wrap;">
  <span style="background: white; border: 2px solid #333; color: black; padding: 8px 15px; border-radius: 4px;">WHITE: Unvisited</span>
  <span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 4px;">GRAY: In current path</span>
  <span style="background: #333; color: white; padding: 8px 15px; border-radius: 4px;">BLACK: Safe (verified)</span>
</div>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 15px 0;">
<strong>Processing node 5 (terminal):</strong>
<div style="display: flex; gap: 10px; align-items: center; margin: 10px 0;">
  <span style="background: white; border: 2px solid #333; padding: 8px; border-radius: 50%;">5</span>
  <span>&#8594;</span>
  <span style="background: #ffc107; padding: 8px; border-radius: 50%;">5</span>
  <span>&#8594;</span>
  <span style="background: #333; color: white; padding: 8px; border-radius: 50%;">5</span>
  <span style="color: #28a745;">No neighbors, mark BLACK (SAFE)</span>
</div>
</div>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 15px 0;">
<strong>Processing node 2:</strong>
<div style="display: flex; gap: 10px; align-items: center; margin: 10px 0;">
  <span style="background: #ffc107; padding: 8px; border-radius: 50%;">2</span>
  <span>visits</span>
  <span style="background: #333; color: white; padding: 8px; border-radius: 50%;">5</span>
  <span>(already BLACK)</span>
  <span>&#8594;</span>
  <span style="background: #333; color: white; padding: 8px; border-radius: 50%;">2</span>
  <span style="color: #28a745;">All neighbors safe, mark BLACK (SAFE)</span>
</div>
</div>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 15px 0;">
<strong>Processing node 0 -> 1 -> 3 -> 0:</strong>
<div style="display: flex; gap: 10px; align-items: center; margin: 10px 0;">
  <span style="background: #ffc107; padding: 8px; border-radius: 50%;">0</span>
  <span>&#8594;</span>
  <span style="background: #ffc107; padding: 8px; border-radius: 50%;">1</span>
  <span>&#8594;</span>
  <span style="background: #ffc107; padding: 8px; border-radius: 50%;">3</span>
  <span>&#8594;</span>
  <span style="background: #ffc107; padding: 8px; border-radius: 50%;">0</span>
</div>
<div style="color: #dc3545; font-weight: bold;">Node 0 is GRAY - CYCLE DETECTED! Nodes 0, 1, 3 are UNSAFE</div>
</div>
</div>

---

## Solution Approaches

### Approach 1: DFS with Three-State Coloring

| Metric | Value |
|--------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |

**Why this works:**
- WHITE nodes haven't been explored
- GRAY nodes are in current DFS path
- BLACK nodes are verified safe
- If DFS from a node encounters GRAY, that node is unsafe

### Approach 2: Reverse Graph + Topological Sort

| Metric | Value |
|--------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |

**Alternative approach:**
- Build reverse graph
- Start from terminal nodes (out-degree 0)
- BFS backwards to find all safe nodes

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| DFS 3-State | O(V+E) | O(V) | Direct classification |
| Reverse BFS | O(V+E) | O(V+E) | Building from terminals |

---

## Related Problems

- Cycle in Graph (main problem)
- Course Schedule (cycle detection)
- Parallel Courses
