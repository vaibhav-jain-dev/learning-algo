# Binary Tree Maximum Path Sum

**Difficulty:** Hard

## Problem Statement

Given a binary tree, find the maximum path sum. A path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.

## Examples

**Example 1:**
```
Input:
    1
   / \
  2   3

Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with sum = 6
```

**Example 2:**
```
Input:
       -10
       /  \
      9    20
          /  \
         15   7

Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with sum = 42
```

**Example 3:**
```
Input:
    -3

Output: -3
Explanation: Single node, must include at least one node
```

## Constraints

- The number of nodes in the tree is in the range [1, 30000]
- -1000 <= Node.value <= 1000

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "What makes this different from Branch Sums?"

Key differences:
- Path can start and end at ANY node (not just root-to-leaf)
- Path can go through a node connecting left and right subtrees
- Must track both "extendable path" and "complete path"

### Step 2: Identify the Pattern

**Key insight:** Use **Post-order DFS with Global Max Tracking**:

At each node, we compute TWO things:
1. **Max gain to parent**: Maximum sum path that can extend upward
2. **Max path through node**: Path using both children (cannot extend further)

### Step 3: Define the Recurrence

```
At each node:
    left_gain = max(0, dfs(left))    # Ignore negative paths
    right_gain = max(0, dfs(right))

    # Path through this node (potential answer)
    path_through = node.value + left_gain + right_gain
    global_max = max(global_max, path_through)

    # Return max gain to parent (can only extend one way)
    return node.value + max(left_gain, right_gain)
```

---

## Visual Diagram: How It Works

### Input Tree

<div style="display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif; padding: 20px;">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <!-- Root Level -->
    <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">-10</div>

    <!-- Connectors Level 1 -->
    <div style="display: flex; width: 200px; justify-content: center; margin: 5px 0;">
      <div style="width: 2px; height: 35px; background: #667eea; transform: rotate(-35deg); margin-right: 50px;"></div>
      <div style="width: 2px; height: 35px; background: #667eea; transform: rotate(35deg); margin-left: 50px;"></div>
    </div>

    <!-- Level 1 -->
    <div style="display: flex; gap: 100px; margin-top: 10px;">
      <div style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">9</div>
      <div style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 4px solid #ffd700;">20</div>
    </div>

    <!-- Connectors Level 2 (only for 20) -->
    <div style="display: flex; margin-left: 120px; margin-top: 5px;">
      <div style="width: 2px; height: 35px; background: #38ef7d; transform: rotate(-30deg); margin-right: 30px;"></div>
      <div style="width: 2px; height: 35px; background: #38ef7d; transform: rotate(30deg); margin-left: 30px;"></div>
    </div>

    <!-- Level 2 -->
    <div style="display: flex; gap: 40px; margin-left: 120px; margin-top: 10px;">
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 4px solid #ffd700;">15</div>
      <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 4px solid #ffd700;">7</div>
    </div>
  </div>
</div>

<div style="background: #fff9c4; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #ffd700;">
<strong>Maximum Path:</strong> Nodes with <span style="border: 4px solid #ffd700; padding: 2px 8px; border-radius: 4px;">gold border</span> form the optimal path.<br>
<strong>15 + 20 + 7 = 42</strong>
</div>

### Understanding Path Types

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
<strong style="color: #1565c0;">Extendable Path</strong><br><br>
Can go UP to parent:
<div style="display: flex; flex-direction: column; align-items: center; margin-top: 10px;">
  <div style="width: 40px; height: 40px; border-radius: 50%; background: #2196f3; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">P</div>
  <div style="width: 2px; height: 20px; background: #2196f3;"></div>
  <div style="display: flex; gap: 20px;">
    <div style="width: 35px; height: 35px; border-radius: 50%; background: #64b5f6; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">L</div>
    <div style="width: 35px; height: 35px; border-radius: 50%; background: #90caf9; color: #333; display: flex; align-items: center; justify-content: center;">R</div>
  </div>
</div>
<div style="margin-top: 10px; font-size: 14px;">Return: node + max(left, right)</div>
</div>

<div style="background: #fce4ec; padding: 15px; border-radius: 8px;">
<strong style="color: #c2185b;">Complete Path</strong><br><br>
Uses both children (can't extend):
<div style="display: flex; flex-direction: column; align-items: center; margin-top: 10px;">
  <div style="width: 40px; height: 40px; border-radius: 50%; background: #e91e63; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">N</div>
  <div style="display: flex; gap: 5px; margin-top: -5px;">
    <div style="width: 2px; height: 25px; background: #e91e63; transform: rotate(-30deg);"></div>
    <div style="width: 2px; height: 25px; background: #e91e63; transform: rotate(30deg);"></div>
  </div>
  <div style="display: flex; gap: 20px; margin-top: -5px;">
    <div style="width: 35px; height: 35px; border-radius: 50%; background: #f48fb1; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">L</div>
    <div style="width: 35px; height: 35px; border-radius: 50%; background: #f48fb1; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">R</div>
  </div>
</div>
<div style="margin-top: 10px; font-size: 14px;">Track: node + left + right</div>
</div>

</div>

### Step-by-Step Calculation

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
<tr style="background: #e8eaf6;">
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">Node</th>
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">Left Gain</th>
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">Right Gain</th>
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">Path Through</th>
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">Return to Parent</th>
  <th style="padding: 12px; border: 1px solid #c5cae9; text-align: left;">Global Max</th>
</tr>
<tr>
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>15</strong> (leaf)</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">0</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">0</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">15</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">15</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">15</td>
</tr>
<tr style="background: #f5f5f5;">
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>7</strong> (leaf)</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">0</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">0</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">7</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">7</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">15</td>
</tr>
<tr style="background: #c8e6c9;">
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>20</strong></td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">15</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">7</td>
  <td style="padding: 12px; border: 1px solid #c5cae9; background: #a5d6a7;"><strong>42</strong></td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">35</td>
  <td style="padding: 12px; border: 1px solid #c5cae9; background: #81c784;"><strong>42</strong></td>
</tr>
<tr>
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>9</strong> (leaf)</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">0</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">0</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">9</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">9</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">42</td>
</tr>
<tr style="background: #f5f5f5;">
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>-10</strong></td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">9</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">35</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">34</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;">25</td>
  <td style="padding: 12px; border: 1px solid #c5cae9;"><strong>42</strong></td>
</tr>
</table>

<div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Final Answer:</strong> 42 (path: 15 -> 20 -> 7)
</div>

---

## Solution Approaches

### Approach 1: Post-Order DFS with Global Max (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) - visit each node once |
| Space Complexity | O(h) - recursion depth |

**Why this is best:**
- Single pass through the tree
- Clean separation of concerns
- Handles negative values elegantly

### Approach 2: DFS Returning Tuple

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(h) |

**When to use:** When you want to avoid global state.

---

## Key Insights

1. **Ignore Negative Gains:** If a subtree sum is negative, don't include it (max with 0)
2. **Two Types of Paths:** Track both extendable and complete paths
3. **Post-Order Matters:** Need children's results before processing parent
4. **Single Node Case:** A path must contain at least one node
