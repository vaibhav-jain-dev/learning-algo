<div id="viz-config" style="display:none">
{"name":"Course Schedule","algorithm":"graph-cycle","complexity":{"time":"O(V + E)","space":"O(V + E)"},"examples":[{"input":{"numCourses":2,"prerequisites":[[1,0]]},"output":true,"inputRaw":"numCourses=2, prerequisites=[[1,0]]","outputRaw":"true"},{"input":{"numCourses":2,"prerequisites":[[1,0],[0,1]]},"output":false,"inputRaw":"numCourses=2, prerequisites=[[1,0],[0,1]]","outputRaw":"false"}]}
</div>

# Course Schedule

**Difficulty:** Medium

## Problem Statement

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.

Return `true` if you can finish all courses. Otherwise, return `false`.

## Examples

**Example 1:**
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: Take course 0 first, then course 1.
```

**Example 2:**
```
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: To take course 1 you need course 0, and to take course 0 you need course 1. Impossible!
```

**Example 3:**
```
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: true
Explanation: Take 0 first, then 1 and 2, then 3.
```

## Constraints

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- All prerequisite pairs are unique

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "When is it impossible to complete all courses?"

The key insight is that course completion becomes impossible when there's a **circular dependency** - a cycle in the prerequisite graph.

### Step 2: Identify the Pattern

**Key insight:** This is a classic **Cycle Detection in Directed Graph** problem because:
- Courses are nodes, prerequisites are directed edges
- A cycle means circular dependency = impossible to complete
- No cycle means we can find a valid ordering (topological sort)

### Step 3: Define the Algorithm

```
Build adjacency list from prerequisites
Use DFS with 3-state coloring:
  - WHITE (0): Not visited
  - GRAY (1): Currently being processed (in current DFS path)
  - BLACK (2): Completely processed
If we visit a GRAY node, we found a cycle!
```

---

## Visual Diagram: How It Works

### Example 1: Valid Course Schedule (No Cycle)

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Prerequisites: [[1,0], [2,0], [3,1], [3,2]]</strong>
<div style="display: flex; flex-direction: column; align-items: center; margin: 20px 0;">
  <div style="display: flex; gap: 60px; margin-bottom: 30px;">
    <span style="background: #007bff; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">0</span>
  </div>
  <div style="color: #666; font-size: 20px;">&#8595; &#8595;</div>
  <div style="display: flex; gap: 60px; margin: 10px 0;">
    <span style="background: #28a745; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">1</span>
    <span style="background: #28a745; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">2</span>
  </div>
  <div style="color: #666; font-size: 20px;">&#8595; &#8595;</div>
  <div style="display: flex; gap: 60px; margin-top: 10px;">
    <span style="background: #6c757d; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">3</span>
  </div>
</div>
<div style="text-align: center; color: #28a745; font-weight: bold;">
Valid Order: 0 -> 1 -> 2 -> 3 (No Cycle Detected)
</div>
</div>

### Example 2: Invalid Course Schedule (Cycle Detected)

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Prerequisites: [[1,0], [0,1]]</strong>
<div style="display: flex; justify-content: center; align-items: center; margin: 20px 0; gap: 30px;">
  <span style="background: #dc3545; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">0</span>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <span style="color: #dc3545;">&#8594;</span>
    <span style="color: #dc3545;">&#8592;</span>
  </div>
  <span style="background: #dc3545; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">1</span>
</div>
<div style="text-align: center; color: #dc3545; font-weight: bold;">
CYCLE: 0 -> 1 -> 0 (Cannot complete courses!)
</div>
</div>

### DFS Cycle Detection Process

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>3-State DFS Coloring:</strong>
<div style="display: flex; justify-content: center; gap: 20px; margin: 15px 0;">
  <span style="background: white; border: 2px solid #333; color: black; padding: 8px 15px; border-radius: 4px;">WHITE: Unvisited</span>
  <span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 4px;">GRAY: In Progress</span>
  <span style="background: #333; color: white; padding: 8px 15px; border-radius: 4px;">BLACK: Complete</span>
</div>

<strong>Step-by-step for [[1,0],[0,1]]:</strong>
<div style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px;">
  <div style="margin: 5px 0;"><strong>Step 1:</strong> Start DFS from node 0, mark GRAY</div>
  <div style="display: flex; gap: 20px; margin: 10px 0;">
    <span style="background: #ffc107; color: black; padding: 10px; border-radius: 50%;">0</span>
    <span style="background: white; border: 2px solid #333; color: black; padding: 10px; border-radius: 50%;">1</span>
  </div>
  <div style="margin: 5px 0;"><strong>Step 2:</strong> Visit neighbor 1 (0->1), mark GRAY</div>
  <div style="display: flex; gap: 20px; margin: 10px 0;">
    <span style="background: #ffc107; color: black; padding: 10px; border-radius: 50%;">0</span>
    <span style="background: #ffc107; color: black; padding: 10px; border-radius: 50%;">1</span>
  </div>
  <div style="margin: 5px 0;"><strong>Step 3:</strong> Visit neighbor 0 (1->0), but 0 is GRAY!</div>
  <div style="display: flex; gap: 20px; margin: 10px 0;">
    <span style="background: #dc3545; color: white; padding: 10px; border-radius: 50%;">0</span>
    <span style="background: #dc3545; color: white; padding: 10px; border-radius: 50%;">1</span>
  </div>
  <div style="color: #dc3545; font-weight: bold;">CYCLE DETECTED! Return false</div>
</div>
</div>

---

## Solution Approaches

### Approach 1: DFS with Three-State Coloring

| Metric | Value |
|--------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |

**Why this works:**
- WHITE nodes are unexplored
- GRAY nodes are in the current DFS path
- BLACK nodes are fully explored and safe
- Finding a GRAY node while exploring means we've found a back edge (cycle)

### Approach 2: Kahn's Algorithm (BFS Topological Sort)

| Metric | Value |
|--------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |

**How it works:**
- Count in-degrees for each node
- Start BFS from nodes with in-degree 0
- Remove edges and add new zero in-degree nodes
- If processed nodes < total nodes, there's a cycle

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| DFS 3-State | O(V+E) | O(V+E) | Detecting cycles |
| BFS Kahn's | O(V+E) | O(V+E) | Finding valid ordering |

---

## Related Problems

- Cycle in Graph (main problem)
- Course Schedule II (find the actual order)
- Alien Dictionary
