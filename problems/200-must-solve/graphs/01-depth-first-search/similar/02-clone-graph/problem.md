# Clone Graph

**Difficulty:** Medium

## Problem Statement

Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph.

Each node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.

```
class Node {
    public int val;
    public List<Node> neighbors;
}
```

## Examples

**Example 1:**
```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: The graph has 4 nodes.
Node 1's neighbors are 2 and 4.
Node 2's neighbors are 1 and 3.
Node 3's neighbors are 2 and 4.
Node 4's neighbors are 1 and 3.
```

**Example 2:**
```
Input: adjList = [[]]
Output: [[]]
Explanation: The graph has 1 node with no neighbors.
```

**Example 3:**
```
Input: adjList = []
Output: []
Explanation: Empty graph.
```

## Constraints

- The number of nodes in the graph is in the range `[0, 100]`
- `1 <= Node.val <= 100`
- `Node.val` is unique for each node
- There are no repeated edges and no self-loops
- The graph is connected and all nodes can be visited starting from the given node

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I create new nodes while preserving the graph structure?"

The challenge is:
- Creating new nodes (not just copying references)
- Maintaining the same neighbor relationships
- Avoiding infinite loops when nodes reference each other

### Step 2: Identify the Pattern

**Key insight:** This is a **DFS/BFS with mapping** problem because:
- We need to traverse all nodes
- We need a mapping from original to cloned nodes
- The mapping prevents creating duplicate clones

### Step 3: Define the Algorithm

```
HashMap: original_node -> cloned_node

DFS(node):
    If node in HashMap:
        Return HashMap[node]  // Already cloned

    Create clone of node
    HashMap[node] = clone

    For each neighbor:
        clone.neighbors.add(DFS(neighbor))

    Return clone
```

---

## Visual Diagram: How It Works

### Input Graph

<div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin: 20px 0;">
<div style="display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap;">

<!-- Node 1 -->
<div style="position: relative;">
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #007bff, #0056b3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(0,123,255,0.4);">1</div>
</div>

<!-- Connection lines represented as styled divs -->
<div style="width: 80px; height: 4px; background: #6c757d;"></div>

<!-- Node 2 -->
<div style="position: relative;">
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #28a745, #1e7e34); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(40,167,69,0.4);">2</div>
</div>

<div style="width: 80px; height: 4px; background: #6c757d;"></div>

<!-- Node 3 -->
<div style="position: relative;">
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ffc107, #d39e00); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(255,193,7,0.4);">3</div>
</div>

<div style="width: 80px; height: 4px; background: #6c757d;"></div>

<!-- Node 4 -->
<div style="position: relative;">
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #dc3545, #bd2130); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(220,53,69,0.4);">4</div>
</div>

</div>

<div style="text-align: center; margin-top: 20px; color: #6c757d;">
<strong>Original Graph:</strong> 1 -- 2 -- 3 -- 4 -- 1 (cycle)
</div>
</div>

### DFS Cloning Process

**Step 1:** Visit Node 1, create clone

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; justify-content: center; gap: 40px; align-items: center;">

<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 10px; color: #1565c0;">Original</div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin: 0 auto;">1</div>
</div>

<div style="font-size: 30px; color: #4caf50;">---></div>

<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 10px; color: #2e7d32;">Clone</div>
<div style="width: 50px; height: 50px; background: #81c784; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin: 0 auto; border: 3px dashed #2e7d32;">1'</div>
</div>

</div>
<div style="text-align: center; margin-top: 15px;">
<code>HashMap: {1 -> 1'}</code>
</div>
</div>

**Step 2:** DFS to Node 2, create clone, link to Node 1's clone

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; justify-content: center; gap: 20px; align-items: center;">

<div style="text-align: center;">
<div style="width: 50px; height: 50px; background: #81c784; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px dashed #2e7d32;">1'</div>
</div>

<div style="width: 40px; height: 3px; background: #4caf50;"></div>

<div style="text-align: center;">
<div style="width: 50px; height: 50px; background: #81c784; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px dashed #2e7d32;">2'</div>
</div>

</div>
<div style="text-align: center; margin-top: 15px;">
<code>HashMap: {1 -> 1', 2 -> 2'}</code><br>
<code>1'.neighbors = [2']</code>
</div>
</div>

**Step 3:** Continue DFS, building clone graph

<div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; justify-content: center; gap: 15px; align-items: center; flex-wrap: wrap;">

<div style="width: 50px; height: 50px; background: #81c784; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px dashed #2e7d32;">1'</div>
<div style="width: 30px; height: 3px; background: #4caf50;"></div>
<div style="width: 50px; height: 50px; background: #81c784; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px dashed #2e7d32;">2'</div>
<div style="width: 30px; height: 3px; background: #4caf50;"></div>
<div style="width: 50px; height: 50px; background: #81c784; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px dashed #2e7d32;">3'</div>
<div style="width: 30px; height: 3px; background: #4caf50;"></div>
<div style="width: 50px; height: 50px; background: #81c784; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px dashed #2e7d32;">4'</div>

</div>
<div style="text-align: center; margin-top: 15px;">
<code>HashMap: {1 -> 1', 2 -> 2', 3 -> 3', 4 -> 4'}</code>
</div>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 20px; border-radius: 8px; margin: 20px 0;">
<div style="display: flex; justify-content: space-around; align-items: center;">

<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 15px;">Original Graph</div>
<div style="display: flex; gap: 10px;">
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">1</div>
<div style="width: 40px; height: 40px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">2</div>
<div style="width: 40px; height: 40px; background: #ffc107; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">3</div>
<div style="width: 40px; height: 40px; background: #dc3545; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">4</div>
</div>
</div>

<div style="font-size: 24px;">===</div>

<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 15px;">Cloned Graph (Deep Copy)</div>
<div style="display: flex; gap: 10px;">
<div style="width: 40px; height: 40px; background: #007bff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; opacity: 0.7;">1'</div>
<div style="width: 40px; height: 40px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; opacity: 0.7;">2'</div>
<div style="width: 40px; height: 40px; background: #ffc107; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; opacity: 0.7;">3'</div>
<div style="width: 40px; height: 40px; background: #dc3545; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; opacity: 0.7;">4'</div>
</div>
</div>

</div>
<div style="text-align: center; margin-top: 15px;">
<strong>Same structure, completely new node objects!</strong>
</div>
</div>

---

## Solution Approaches

### Approach 1: DFS with HashMap

| Metric | Value |
|--------|-------|
| Time Complexity | O(N + E) where N is nodes, E is edges |
| Space Complexity | O(N) for the HashMap and recursion stack |

**Why this is good:**
- Natural recursive structure
- HashMap prevents infinite loops
- Easy to understand and implement

### Approach 2: BFS with HashMap

| Metric | Value |
|--------|-------|
| Time Complexity | O(N + E) |
| Space Complexity | O(N) for HashMap and queue |

**When to use:**
- Prefer iterative solutions
- Avoid deep recursion

### Approach 3: DFS without HashMap (Node Value as Index)

| Metric | Value |
|--------|-------|
| Time Complexity | O(N + E) |
| Space Complexity | O(N) for the clone array |

**When to use:**
- Node values are 1 to N (1-indexed)
- Slightly more memory efficient

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| DFS + HashMap | O(N + E) | O(N) | Best for general case |
| BFS + HashMap | O(N + E) | O(N) | Best for iterative |
| Array-based | O(N + E) | O(N) | Best when values are 1..N |
