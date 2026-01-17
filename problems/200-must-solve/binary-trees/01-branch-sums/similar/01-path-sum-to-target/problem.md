# Path Sum to Target

**Difficulty:** Medium

## Problem Statement

Given a binary tree and a target sum, find all root-to-leaf paths where the sum of node values equals the target.

A leaf is a node with no children. Return all paths as lists of node values from root to leaf.

## Examples

**Example 1:**
```
Input:
        5
       / \
      4   8
     /   / \
    11  13  4
   /  \    / \
  7    2  5   1

Target = 22

Output: [[5, 4, 11, 2], [5, 8, 4, 5]]

Explanation:
- Path 5 -> 4 -> 11 -> 2 sums to 22
- Path 5 -> 8 -> 4 -> 5 sums to 22
```

**Example 2:**
```
Input:
    1
   / \
  2   3

Target = 5

Output: []

Explanation: No path sums to 5
```

**Example 3:**
```
Input:
    1
   / \
  2   3

Target = 4

Output: [[1, 3]]
```

## Constraints

- The number of nodes in the tree is in the range [0, 5000]
- -1000 <= Node.value <= 1000
- -1000 <= targetSum <= 1000

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How does this differ from Branch Sums?"

In Branch Sums, we:
- Collect ALL branch sums
- No filtering needed

In Path Sum to Target, we:
- Only want paths matching a specific target
- Need to return the actual paths, not just sums

### Step 2: Identify the Pattern

**Key insight:** This uses **DFS with Backtracking**:
- Maintain current path as we traverse
- When reaching a leaf, check if sum equals target
- Backtrack by removing current node when returning

### Step 3: Define the Approach

```
DFS(node, currentPath, currentSum):
    if node is null: return

    Add node to currentPath
    currentSum += node.value

    if node is LEAF and currentSum == target:
        Add copy of currentPath to results

    DFS(node.left, currentPath, currentSum)
    DFS(node.right, currentPath, currentSum)

    Remove node from currentPath  // BACKTRACK
```

---

## Visual Diagram: How It Works

### Input Tree

<div style="display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif; padding: 20px;">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <!-- Root Level -->
    <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">5</div>

    <!-- Connectors Level 1 -->
    <div style="display: flex; width: 200px; justify-content: center; margin: 5px 0;">
      <div style="width: 2px; height: 30px; background: #667eea; transform: rotate(-30deg); margin-right: 40px;"></div>
      <div style="width: 2px; height: 30px; background: #667eea; transform: rotate(30deg); margin-left: 40px;"></div>
    </div>

    <!-- Level 1 -->
    <div style="display: flex; gap: 80px; margin-top: 10px;">
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">4</div>
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">8</div>
    </div>

    <!-- Connectors Level 2 -->
    <div style="display: flex; width: 300px; justify-content: space-between; margin: 5px 0;">
      <div style="width: 2px; height: 30px; background: #f5576c; transform: rotate(-20deg); margin-left: 30px;"></div>
      <div style="display: flex; gap: 30px;">
        <div style="width: 2px; height: 30px; background: #00f2fe; transform: rotate(-20deg);"></div>
        <div style="width: 2px; height: 30px; background: #00f2fe; transform: rotate(20deg);"></div>
      </div>
    </div>

    <!-- Level 2 -->
    <div style="display: flex; gap: 40px; margin-top: 10px;">
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">11</div>
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); display: flex; align-items: center; justify-content: center; color: #333; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">13</div>
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%); display: flex; align-items: center; justify-content: center; color: #333; font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">4</div>
    </div>

    <!-- Level 3 -->
    <div style="display: flex; gap: 20px; margin-top: 30px;">
      <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">7</div>
      <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 3px solid #ff6b6b;">2</div>
      <div style="width: 30px;"></div>
      <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 3px solid #ff6b6b;">5</div>
      <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">1</div>
    </div>
  </div>
</div>

<div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #4caf50;">
<strong>Target = 22</strong><br>
Nodes with <span style="border: 3px solid #ff6b6b; padding: 2px 6px; border-radius: 4px;">red border</span> are endpoints of valid paths.
</div>

### Path Tracing

**Valid Path 1:** 5 -> 4 -> 11 -> 2

<div style="display: flex; gap: 10px; align-items: center; margin: 15px 0; flex-wrap: wrap;">
  <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 20px; border-radius: 25px; font-weight: bold;">5</span>
  <span style="font-size: 24px; color: #667eea;">&#8594;</span>
  <span style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 12px 20px; border-radius: 25px; font-weight: bold;">4</span>
  <span style="font-size: 24px; color: #f5576c;">&#8594;</span>
  <span style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 12px 20px; border-radius: 25px; font-weight: bold;">11</span>
  <span style="font-size: 24px; color: #fee140;">&#8594;</span>
  <span style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 12px 20px; border-radius: 25px; font-weight: bold;">2</span>
  <span style="margin-left: 15px; background: #4caf50; color: white; padding: 8px 15px; border-radius: 5px;">= 22</span>
</div>

**Valid Path 2:** 5 -> 8 -> 4 -> 5

<div style="display: flex; gap: 10px; align-items: center; margin: 15px 0; flex-wrap: wrap;">
  <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 20px; border-radius: 25px; font-weight: bold;">5</span>
  <span style="font-size: 24px; color: #667eea;">&#8594;</span>
  <span style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 12px 20px; border-radius: 25px; font-weight: bold;">8</span>
  <span style="font-size: 24px; color: #00f2fe;">&#8594;</span>
  <span style="background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%); color: #333; padding: 12px 20px; border-radius: 25px; font-weight: bold;">4</span>
  <span style="font-size: 24px; color: #d299c2;">&#8594;</span>
  <span style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 12px 20px; border-radius: 25px; font-weight: bold;">5</span>
  <span style="margin-left: 15px; background: #4caf50; color: white; padding: 8px 15px; border-radius: 5px;">= 22</span>
</div>

### Backtracking Visualization

<div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Step-by-step path building:</strong>

<table style="width: 100%; margin-top: 10px;">
<tr style="background: #ffe0b2;">
  <th style="padding: 8px; text-align: left;">Step</th>
  <th style="padding: 8px; text-align: left;">Current Path</th>
  <th style="padding: 8px; text-align: left;">Sum</th>
  <th style="padding: 8px; text-align: left;">Action</th>
</tr>
<tr><td style="padding: 8px;">1</td><td>[5]</td><td>5</td><td>Visit root</td></tr>
<tr style="background: #f5f5f5;"><td style="padding: 8px;">2</td><td>[5, 4]</td><td>9</td><td>Go left</td></tr>
<tr><td style="padding: 8px;">3</td><td>[5, 4, 11]</td><td>20</td><td>Go left</td></tr>
<tr style="background: #f5f5f5;"><td style="padding: 8px;">4</td><td>[5, 4, 11, 7]</td><td>27</td><td>Leaf - sum != 22</td></tr>
<tr><td style="padding: 8px;">5</td><td style="color: #e65100;">[5, 4, 11]</td><td>20</td><td style="color: #e65100;"><strong>BACKTRACK</strong></td></tr>
<tr style="background: #c8e6c9;"><td style="padding: 8px;">6</td><td>[5, 4, 11, 2]</td><td>22</td><td style="color: #2e7d32;"><strong>MATCH! Save path</strong></td></tr>
<tr><td style="padding: 8px;">7</td><td style="color: #e65100;">[5, 4, 11]</td><td>20</td><td style="color: #e65100;"><strong>BACKTRACK</strong></td></tr>
</table>
</div>

---

## Solution Approaches

### Approach 1: DFS with Backtracking (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) - visit each node once |
| Space Complexity | O(h) for recursion + O(n) for paths |

**Why this is best:**
- Clean recursive structure
- Natural fit for path problems
- Easy to understand backtracking

### Approach 2: Iterative with Stack

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:** When recursion depth might cause stack overflow.

### Approach 3: BFS with Path Tracking

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) - stores full paths |

**When to use:** When you need level-order processing.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| DFS Backtracking | O(n) | O(h) | Best - cleaner code |
| Iterative Stack | O(n) | O(n) | Good - no recursion |
| BFS | O(n) | O(n) | Okay - higher memory |
