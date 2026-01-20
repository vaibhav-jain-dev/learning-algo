# Clone Graph (Using Linked Node Traversal)

**Difficulty:** Medium

## Problem Statement

Given a reference to a node in a connected undirected graph, return a **deep copy** (clone) of the graph.

Each node in the graph contains:
- A value (`val`)
- A list of its neighbors (`neighbors`)

The graph is represented using an adjacency list where each node's neighbors list describes connections between nodes.

## Examples

**Example 1:**
```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]

Graph visualization:
    1 ---- 2
    |      |
    |      |
    4 ---- 3

Node 1: neighbors = [2, 4]
Node 2: neighbors = [1, 3]
Node 3: neighbors = [2, 4]
Node 4: neighbors = [1, 3]
```

**Example 2:**
```
Input: adjList = [[]]
Output: [[]]
Explanation: Single node with no neighbors.
```

**Example 3:**
```
Input: adjList = []
Output: []
Explanation: Empty graph (null node).
```

## Constraints

- Number of nodes: [0, 100]
- Node values: [1, 100]
- Node values are unique
- No repeated edges or self-loops
- Graph is connected

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Challenge

**Question to ask yourself:** "Why is this similar to linked list construction?"

Like copying a linked list with random pointers:
- We need to create new nodes
- We need to recreate the connections (edges)
- We must handle cycles without infinite loops

### Step 2: Identify the Pattern

**Key insight:** This is a **Graph Traversal with Hash Map** problem because:
- We need to track which nodes are already cloned (avoid re-cloning)
- O(1) lookup to get the clone of any original node
- Can use either BFS or DFS traversal

### Step 3: Connection to Linked Lists

This problem extends linked list concepts:
- Like `Copy List with Random Pointer` - clone nodes while handling arbitrary connections
- Uses same hash map pattern: `original_node -> cloned_node`

---

## Visual Diagram: How It Works

### Original Graph

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; justify-content: center; align-items: center; gap: 30px;">
  <div style="text-align: center;">
    <div style="display: flex; gap: 60px; margin-bottom: 30px;">
      <div style="background: #007bff; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">1</div>
      <div style="background: #28a745; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">2</div>
    </div>
    <div style="display: flex; gap: 60px;">
      <div style="background: #ffc107; color: black; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">4</div>
      <div style="background: #dc3545; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">3</div>
    </div>
  </div>
</div>
<div style="text-align: center; margin-top: 10px; color: #666;">
Edges: 1-2, 1-4, 2-3, 3-4
</div>
</div>

### Step-by-Step Cloning with DFS

**Step 1:** Start at node 1, create clone

<div style="display: flex; gap: 40px; align-items: flex-start; margin: 20px 0;">
  <div style="flex: 1;">
    <div style="background: #e7f3ff; padding: 15px; border-radius: 8px;">
      <strong>Original</strong><br>
      <div style="background: #007bff; color: white; width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid #0056b3;">1</div>
      <span style="margin-left: 10px;">Current node</span>
    </div>
  </div>
  <div style="font-size: 24px; padding-top: 20px;">&#8594;</div>
  <div style="flex: 1;">
    <div style="background: #d4edda; padding: 15px; border-radius: 8px;">
      <strong>Cloned</strong><br>
      <div style="background: #007bff; color: white; width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; opacity: 0.7;">1'</div>
      <span style="margin-left: 10px;">New clone</span>
    </div>
  </div>
</div>

<div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>HashMap:</strong> {1 &#8594; 1'}
</div>

**Step 2:** DFS to neighbor 2, create clone

<div style="display: flex; gap: 40px; align-items: flex-start; margin: 20px 0;">
  <div style="flex: 1;">
    <div style="background: #e7f3ff; padding: 15px; border-radius: 8px;">
      <strong>Visiting neighbor of 1</strong><br>
      <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
        <div style="background: #007bff; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
        <span>&#8594;</span>
        <div style="background: #28a745; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid #1e7e34;">2</div>
      </div>
    </div>
  </div>
  <div style="font-size: 24px; padding-top: 30px;">&#8594;</div>
  <div style="flex: 1;">
    <div style="background: #d4edda; padding: 15px; border-radius: 8px;">
      <strong>Cloned graph</strong><br>
      <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
        <div style="background: #007bff; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; opacity: 0.7;">1'</div>
        <span>&#8594;</span>
        <div style="background: #28a745; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; opacity: 0.7;">2'</div>
      </div>
    </div>
  </div>
</div>

<div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>HashMap:</strong> {1 &#8594; 1', 2 &#8594; 2'}
</div>

**Step 3:** Continue DFS, handle already-visited nodes

<div style="display: flex; align-items: center; gap: 10px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 20px;">1'</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 20px;">2'</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 20px;">3'</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 20px;">4'</span>
<span style="color: #6c757d; font-size: 20px;">&#8596;</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 20px;">1'</span>
<span style="color: #dc3545; font-size: 14px;">(already cloned!)</span>
</div>

<div style="background: #f8d7da; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Key Insight:</strong> When we encounter node 1 again as a neighbor of 4, we find it in our HashMap and reuse the existing clone instead of creating a new one!
</div>

### Final Cloned Graph

<div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="text-align: center; margin-bottom: 10px;"><strong>Deep Copy (Completely Independent)</strong></div>
<div style="display: flex; justify-content: center; align-items: center; gap: 30px;">
  <div style="text-align: center;">
    <div style="display: flex; gap: 60px; margin-bottom: 30px;">
      <div style="background: #007bff; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; opacity: 0.8;">1'</div>
      <div style="background: #28a745; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; opacity: 0.8;">2'</div>
    </div>
    <div style="display: flex; gap: 60px;">
      <div style="background: #ffc107; color: black; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; opacity: 0.8;">4'</div>
      <div style="background: #dc3545; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; opacity: 0.8;">3'</div>
    </div>
  </div>
</div>
<div style="text-align: center; margin-top: 10px; color: #155724;">
All new Node objects with same structure
</div>
</div>

---

## Solution Approaches

### Approach 1: DFS with HashMap - RECOMMENDED

| Metric | Value |
|--------|-------|
| Time Complexity | O(N + E) |
| Space Complexity | O(N) |

**Why this is best:**
- Natural recursive structure matches graph traversal
- HashMap ensures each node is cloned exactly once
- Easy to understand and implement

### Approach 2: BFS with HashMap

| Metric | Value |
|--------|-------|
| Time Complexity | O(N + E) |
| Space Complexity | O(N) |

**When to use:** When you prefer iterative over recursive, or for very deep graphs.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| DFS + HashMap | O(N+E) | O(N) | BEST for most cases |
| BFS + HashMap | O(N+E) | O(N) | Alternative iterative |

