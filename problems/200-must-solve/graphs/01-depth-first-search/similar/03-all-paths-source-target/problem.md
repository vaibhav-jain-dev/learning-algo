# All Paths From Source to Target

**Difficulty:** Medium

## Problem Statement

Given a directed acyclic graph (**DAG**) of `n` nodes labeled from `0` to `n - 1`, find all possible paths from node `0` to node `n - 1` and return them in **any order**.

The graph is given as follows: `graph[i]` is a list of all nodes you can visit from node `i` (i.e., there is a directed edge from node `i` to node `graph[i][j]`).

## Examples

**Example 1:**
```
Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.
```

**Example 2:**
```
Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
```

## Constraints

- `n == graph.length`
- `2 <= n <= 15`
- `0 <= graph[i][j] < n`
- `graph[i][j] != i` (no self-loops)
- All elements of `graph[i]` are unique
- The input graph is guaranteed to be a DAG

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I explore all possible paths in a graph?"

The key insight is:
- This is a **path enumeration** problem, not just finding one path
- We need to track the current path and explore all branches
- Since it's a DAG, we don't need to worry about cycles

### Step 2: Identify the Pattern

**Key insight:** This is a **DFS with backtracking** problem because:
- We need to explore each path completely
- We backtrack when we reach the target or dead end
- We collect all valid paths that reach the destination

### Step 3: Define the Algorithm

```
paths = []
current_path = [0]  // Start at node 0

DFS(node):
    If node == target:
        paths.add(copy of current_path)
        return

    For each neighbor in graph[node]:
        current_path.add(neighbor)
        DFS(neighbor)
        current_path.remove_last()  // Backtrack
```

---

## Visual Diagram: How It Works

### Input Graph

<div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin: 20px 0;">

<div style="text-align: center; margin-bottom: 20px; font-weight: bold; color: #495057;">
graph = [[1,2],[3],[3],[]]
</div>

<div style="display: flex; justify-content: center; align-items: center; gap: 30px;">

<!-- Node 0 -->
<div style="text-align: center;">
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #28a745, #1e7e34); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(40,167,69,0.4);">0</div>
<div style="margin-top: 5px; font-size: 12px; color: #28a745;">START</div>
</div>

<div style="display: flex; flex-direction: column; gap: 20px;">
<!-- Arrow to 1 -->
<div style="display: flex; align-items: center;">
<div style="width: 60px; height: 3px; background: linear-gradient(90deg, #6c757d, #007bff);"></div>
<div style="width: 0; height: 0; border-left: 10px solid #007bff; border-top: 6px solid transparent; border-bottom: 6px solid transparent;"></div>
</div>
<!-- Arrow to 2 -->
<div style="display: flex; align-items: center;">
<div style="width: 60px; height: 3px; background: linear-gradient(90deg, #6c757d, #ffc107);"></div>
<div style="width: 0; height: 0; border-left: 10px solid #ffc107; border-top: 6px solid transparent; border-bottom: 6px solid transparent;"></div>
</div>
</div>

<div style="display: flex; flex-direction: column; gap: 20px;">
<!-- Node 1 -->
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #007bff, #0056b3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(0,123,255,0.4);">1</div>
<!-- Node 2 -->
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ffc107, #d39e00); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(255,193,7,0.4);">2</div>
</div>

<div style="display: flex; flex-direction: column; gap: 20px; align-items: center; justify-content: center;">
<!-- Arrows converging to 3 -->
<div style="display: flex; align-items: center;">
<div style="width: 60px; height: 3px; background: linear-gradient(90deg, #007bff, #dc3545);"></div>
<div style="width: 0; height: 0; border-left: 10px solid #dc3545; border-top: 6px solid transparent; border-bottom: 6px solid transparent;"></div>
</div>
<div style="display: flex; align-items: center;">
<div style="width: 60px; height: 3px; background: linear-gradient(90deg, #ffc107, #dc3545);"></div>
<div style="width: 0; height: 0; border-left: 10px solid #dc3545; border-top: 6px solid transparent; border-bottom: 6px solid transparent;"></div>
</div>
</div>

<!-- Node 3 -->
<div style="text-align: center;">
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #dc3545, #bd2130); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(220,53,69,0.4);">3</div>
<div style="margin-top: 5px; font-size: 12px; color: #dc3545;">TARGET</div>
</div>

</div>
</div>

### DFS Exploration with Backtracking

**Path 1:** 0 -> 1 -> 3

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; justify-content: center; gap: 15px; align-items: center;">

<div style="width: 50px; height: 50px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 30px; height: 3px; background: #28a745;"></div>
<div style="width: 50px; height: 50px; background: #007bff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 30px; height: 3px; background: #007bff;"></div>
<div style="width: 50px; height: 50px; background: #dc3545; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>

</div>
<div style="text-align: center; margin-top: 15px;">
<code>path = [0, 1, 3]</code> -> <span style="color: #28a745; font-weight: bold;">FOUND! Save to results</span>
</div>
</div>

**Backtrack:** Remove 3, then remove 1, try next neighbor of 0

<div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0;">
<div style="text-align: center;">
<code>[0, 1, 3]</code> -> <code>[0, 1]</code> -> <code>[0]</code> -> try neighbor 2
</div>
</div>

**Path 2:** 0 -> 2 -> 3

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; justify-content: center; gap: 15px; align-items: center;">

<div style="width: 50px; height: 50px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 30px; height: 3px; background: #28a745;"></div>
<div style="width: 50px; height: 50px; background: #ffc107; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="width: 30px; height: 3px; background: #ffc107;"></div>
<div style="width: 50px; height: 50px; background: #dc3545; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>

</div>
<div style="text-align: center; margin-top: 15px;">
<code>path = [0, 2, 3]</code> -> <span style="color: #28a745; font-weight: bold;">FOUND! Save to results</span>
</div>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>All Paths Found:</strong><br><br>
<div style="display: flex; justify-content: center; gap: 30px;">
<div style="background: white; padding: 15px 25px; border-radius: 8px;">
<strong>Path 1:</strong> [0, 1, 3]
</div>
<div style="background: white; padding: 15px 25px; border-radius: 8px;">
<strong>Path 2:</strong> [0, 2, 3]
</div>
</div>
</div>

---

## Solution Approaches

### Approach 1: DFS with Backtracking

| Metric | Value |
|--------|-------|
| Time Complexity | O(2^N x N) worst case |
| Space Complexity | O(N) for recursion stack |

**Why this is best:**
- Natural fit for path enumeration
- Efficient memory usage with backtracking
- Easy to understand and implement

### Approach 2: BFS with Path Tracking

| Metric | Value |
|--------|-------|
| Time Complexity | O(2^N x N) |
| Space Complexity | O(2^N x N) for storing all paths |

**When to use:**
- Need level-by-level exploration
- Prefer iterative solutions

### Approach 3: Dynamic Programming (Memoization)

| Metric | Value |
|--------|-------|
| Time Complexity | O(2^N x N) |
| Space Complexity | O(2^N x N) for cache |

**When to use:**
- Graph has many overlapping subpaths
- Want to cache partial results

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| DFS Backtracking | O(2^N x N) | O(N) | Best for simplicity |
| BFS Path Tracking | O(2^N x N) | O(2^N x N) | Iterative approach |
| DP Memoization | O(2^N x N) | O(2^N x N) | Overlapping subproblems |
