# Maximum Depth of Binary Tree

**Difficulty:** Easy

## Problem Statement

Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Examples

**Example 1:**
```
Input:
    3
   / \
  9  20
    /  \
   15   7

Output: 3
Explanation: Longest path is 3 -> 20 -> 15 (or 3 -> 20 -> 7), which has 3 nodes.
```

**Example 2:**
```
Input:
  1
   \
    2

Output: 2
```

**Example 3:**
```
Input: null
Output: 0
```

## Constraints

- The number of nodes in the tree is in the range [0, 10000]
- -100 <= Node.value <= 100

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How does depth relate to subtree depths?"

Key insight: The depth of a tree is:
- 0 if the tree is empty
- 1 + max(leftDepth, rightDepth) otherwise

### Step 2: Identify the Pattern

**Key insight:** This uses **Post-Order DFS** (or BFS level counting):
- Get depths of children first
- Combine to get current depth
- Classic recursive tree pattern

### Step 3: Define the Recurrence

```
maxDepth(node):
    if node is null: return 0
    return 1 + max(maxDepth(left), maxDepth(right))
```

---

## Visual Diagram: How It Works

### Input Tree

<div style="display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif; padding: 20px;">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <!-- Level indicator -->
    <div style="display: flex; width: 100%; justify-content: flex-end; margin-bottom: 10px;">
      <span style="background: #e3f2fd; padding: 5px 15px; border-radius: 15px; font-size: 14px; color: #1565c0;">Level 1</span>
    </div>

    <!-- Root Level -->
    <div style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">3</div>

    <!-- Connectors Level 1 -->
    <div style="display: flex; width: 180px; justify-content: center; margin: 5px 0;">
      <div style="width: 2px; height: 35px; background: #667eea; transform: rotate(-35deg); margin-right: 40px;"></div>
      <div style="width: 2px; height: 35px; background: #667eea; transform: rotate(35deg); margin-left: 40px;"></div>
    </div>

    <!-- Level indicator -->
    <div style="display: flex; width: 100%; justify-content: flex-end; margin-bottom: 5px;">
      <span style="background: #e8f5e9; padding: 5px 15px; border-radius: 15px; font-size: 14px; color: #2e7d32;">Level 2</span>
    </div>

    <!-- Level 1 -->
    <div style="display: flex; gap: 80px; margin-top: 5px;">
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">9</div>
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">20</div>
    </div>

    <!-- Connectors Level 2 -->
    <div style="display: flex; margin-left: 90px; margin-top: 5px;">
      <div style="width: 2px; height: 35px; background: #38ef7d; transform: rotate(-30deg); margin-right: 20px;"></div>
      <div style="width: 2px; height: 35px; background: #38ef7d; transform: rotate(30deg); margin-left: 20px;"></div>
    </div>

    <!-- Level indicator -->
    <div style="display: flex; width: 100%; justify-content: flex-end; margin-bottom: 5px;">
      <span style="background: #fff3e0; padding: 5px 15px; border-radius: 15px; font-size: 14px; color: #e65100;">Level 3</span>
    </div>

    <!-- Level 2 -->
    <div style="display: flex; gap: 25px; margin-left: 90px; margin-top: 5px;">
      <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 3px solid #ffd700;">15</div>
      <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 3px solid #ffd700;">7</div>
    </div>
  </div>
</div>

<div style="background: #fff9c4; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #ffd700;">
<strong>Maximum Depth = 3</strong><br>
Deepest nodes (15 and 7) have <span style="border: 3px solid #ffd700; padding: 2px 8px; border-radius: 4px;">gold border</span>.
</div>

### Recursive Calculation

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: #e3f2fd; padding: 20px; border-radius: 12px;">
<div style="font-size: 16px; font-weight: bold; color: #1565c0; margin-bottom: 15px;">Bottom-Up Calculation</div>

<table style="width: 100%; font-size: 14px;">
<tr style="background: #bbdefb;">
  <th style="padding: 8px; text-align: left;">Node</th>
  <th style="padding: 8px; text-align: left;">Left</th>
  <th style="padding: 8px; text-align: left;">Right</th>
  <th style="padding: 8px; text-align: left;">Depth</th>
</tr>
<tr><td style="padding: 8px;">15</td><td>0</td><td>0</td><td>1</td></tr>
<tr style="background: #e3f2fd;"><td style="padding: 8px;">7</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td style="padding: 8px;">9</td><td>0</td><td>0</td><td>1</td></tr>
<tr style="background: #e3f2fd;"><td style="padding: 8px;">20</td><td>1</td><td>1</td><td>2</td></tr>
<tr style="background: #c8e6c9;"><td style="padding: 8px;"><strong>3</strong></td><td>1</td><td>2</td><td><strong>3</strong></td></tr>
</table>
</div>

<div style="background: #fce4ec; padding: 20px; border-radius: 12px;">
<div style="font-size: 16px; font-weight: bold; color: #c2185b; margin-bottom: 15px;">Formula</div>
<div style="font-family: monospace; font-size: 14px; line-height: 2;">
depth(null) = 0<br><br>
depth(15) = 1 + max(0, 0) = 1<br>
depth(7) = 1 + max(0, 0) = 1<br>
depth(9) = 1 + max(0, 0) = 1<br>
depth(20) = 1 + max(1, 1) = 2<br>
<span style="background: #f8bbd9; padding: 2px 8px; border-radius: 4px;">depth(3) = 1 + max(1, 2) = 3</span>
</div>
</div>

</div>

### BFS Level Counting Visualization

<div style="background: #f5f5f5; padding: 20px; border-radius: 12px; margin: 20px 0;">

<div style="display: flex; flex-direction: column; gap: 15px;">

<div style="display: flex; align-items: center; gap: 15px;">
  <span style="background: #1565c0; color: white; padding: 8px 15px; border-radius: 8px; min-width: 80px; text-align: center;">Level 1</span>
  <div style="display: flex; gap: 10px;">
    <span style="background: #667eea; color: white; padding: 10px 18px; border-radius: 50%; font-weight: bold;">3</span>
  </div>
  <span style="color: #666;">depth = 1</span>
</div>

<div style="display: flex; align-items: center; gap: 15px;">
  <span style="background: #2e7d32; color: white; padding: 8px 15px; border-radius: 8px; min-width: 80px; text-align: center;">Level 2</span>
  <div style="display: flex; gap: 10px;">
    <span style="background: #4facfe; color: white; padding: 10px 18px; border-radius: 50%; font-weight: bold;">9</span>
    <span style="background: #38ef7d; color: white; padding: 10px 15px; border-radius: 50%; font-weight: bold;">20</span>
  </div>
  <span style="color: #666;">depth = 2</span>
</div>

<div style="display: flex; align-items: center; gap: 15px;">
  <span style="background: #e65100; color: white; padding: 8px 15px; border-radius: 8px; min-width: 80px; text-align: center;">Level 3</span>
  <div style="display: flex; gap: 10px;">
    <span style="background: #f5576c; color: white; padding: 10px 15px; border-radius: 50%; font-weight: bold;">15</span>
    <span style="background: #fee140; color: #333; padding: 10px 18px; border-radius: 50%; font-weight: bold;">7</span>
  </div>
  <span style="color: #666;">depth = 3 (final)</span>
</div>

</div>
</div>

---

## Solution Approaches

### Approach 1: Recursive DFS (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) - visit each node once |
| Space Complexity | O(h) - recursion depth |

**Why this is best:**
- Simplest and most elegant
- Natural recursive structure
- Easy to understand

### Approach 2: BFS Level Counting

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(w) where w is max width |

**When to use:** When you want to avoid recursion.

### Approach 3: Iterative DFS with Stack

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(h) |

**When to use:** Deep trees where recursion might overflow.

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Recursive DFS | O(n) | O(h) | Best - cleanest |
| BFS | O(n) | O(w) | Good - level based |
| Iterative DFS | O(n) | O(h) | Good - no recursion |
