# Binary Tree Level Order Traversal

**Difficulty:** Medium

## Problem Statement

Given the `root` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

## Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

**Example 2:**
```
Input: root = [1]
Output: [[1]]
```

**Example 3:**
```
Input: root = []
Output: []
```

## Constraints

- The number of nodes in the tree is in the range `[0, 2000]`
- `-1000 <= Node.val <= 1000`

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I process nodes level by level and group them?"

The key insight is:
- BFS naturally processes nodes level by level
- We need to track where each level starts and ends
- Group nodes by their level in the output

### Step 2: Identify the Pattern

**Key insight:** This is a **BFS with level tracking** problem because:
- BFS explores level by level using a queue
- We can track level boundaries by processing all nodes at current level before moving on
- Use queue size at start of each level to know how many nodes belong to that level

### Step 3: Define the Algorithm

```
result = []
queue = [root]

While queue not empty:
    level_size = len(queue)  // Nodes at this level
    level = []

    For i in range(level_size):
        node = queue.dequeue()
        level.append(node.val)
        if node.left: queue.enqueue(node.left)
        if node.right: queue.enqueue(node.right)

    result.append(level)
```

---

## Visual Diagram: How It Works

### Input Tree

<div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin: 20px 0;">

<div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">

<!-- Level 0 -->
<div style="display: flex; justify-content: center;">
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #007bff, #0056b3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(0,123,255,0.4);">3</div>
</div>

<!-- Level 1 -->
<div style="display: flex; justify-content: center; gap: 80px;">
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #28a745, #1e7e34); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(40,167,69,0.4);">9</div>
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #28a745, #1e7e34); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(40,167,69,0.4);">20</div>
</div>

<!-- Level 2 -->
<div style="display: flex; justify-content: center; gap: 30px;">
<div style="width: 60px; height: 60px; background: transparent;"></div>
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ffc107, #d39e00); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(255,193,7,0.4);">15</div>
<div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ffc107, #d39e00); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(255,193,7,0.4);">7</div>
</div>

</div>

<div style="text-align: center; margin-top: 20px;">
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 4px; margin: 5px;">Level 0</span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px; margin: 5px;">Level 1</span>
<span style="background: #ffc107; color: white; padding: 5px 10px; border-radius: 4px; margin: 5px;">Level 2</span>
</div>
</div>

### BFS Level-by-Level Processing

**Step 1:** Process Level 0 (queue size = 1)

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; justify-content: center; gap: 20px; align-items: center;">
<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 5px;">Queue</div>
<div style="background: white; padding: 10px 20px; border-radius: 5px; border: 2px solid #007bff;">
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 4px;">3</span>
</div>
</div>
<div style="font-size: 24px;">-></div>
<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 5px;">Level Result</div>
<div style="background: white; padding: 10px 20px; border-radius: 5px; border: 2px solid #28a745;">
[3]
</div>
</div>
</div>
<div style="text-align: center; margin-top: 15px;">
Process 1 node, add children 9 and 20 to queue
</div>
</div>

**Step 2:** Process Level 1 (queue size = 2)

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; justify-content: center; gap: 20px; align-items: center;">
<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 5px;">Queue</div>
<div style="background: white; padding: 10px 20px; border-radius: 5px; border: 2px solid #28a745;">
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px; margin: 2px;">9</span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px; margin: 2px;">20</span>
</div>
</div>
<div style="font-size: 24px;">-></div>
<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 5px;">Level Result</div>
<div style="background: white; padding: 10px 20px; border-radius: 5px; border: 2px solid #28a745;">
[9, 20]
</div>
</div>
</div>
<div style="text-align: center; margin-top: 15px;">
Process 2 nodes, add children 15 and 7 to queue
</div>
</div>

**Step 3:** Process Level 2 (queue size = 2)

<div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: flex; justify-content: center; gap: 20px; align-items: center;">
<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 5px;">Queue</div>
<div style="background: white; padding: 10px 20px; border-radius: 5px; border: 2px solid #ffc107;">
<span style="background: #ffc107; color: white; padding: 5px 10px; border-radius: 4px; margin: 2px;">15</span>
<span style="background: #ffc107; color: white; padding: 5px 10px; border-radius: 4px; margin: 2px;">7</span>
</div>
</div>
<div style="font-size: 24px;">-></div>
<div style="text-align: center;">
<div style="font-weight: bold; margin-bottom: 5px;">Level Result</div>
<div style="background: white; padding: 10px 20px; border-radius: 5px; border: 2px solid #ffc107;">
[15, 7]
</div>
</div>
</div>
<div style="text-align: center; margin-top: 15px;">
Process 2 nodes, no children to add (leaf nodes)
</div>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Level Order Traversal:</strong><br><br>
<code>[[3], [9, 20], [15, 7]]</code>
</div>

---

## Solution Approaches

### Approach 1: BFS with Level Size Tracking

| Metric | Value |
|--------|-------|
| Time Complexity | O(N) - visit each node once |
| Space Complexity | O(W) where W is max width of tree |

**Why this is best:**
- Clean and intuitive
- Natural level grouping
- Standard BFS pattern

### Approach 2: BFS with Delimiter

| Metric | Value |
|--------|-------|
| Time Complexity | O(N) |
| Space Complexity | O(W) |

**When to use:**
- Alternative approach using null/marker to separate levels

### Approach 3: DFS with Level Parameter

| Metric | Value |
|--------|-------|
| Time Complexity | O(N) |
| Space Complexity | O(H) where H is height |

**When to use:**
- When recursion is preferred
- Want to use DFS pattern

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| BFS Level Size | O(N) | O(W) | Best overall |
| BFS Delimiter | O(N) | O(W) | Alternative |
| DFS Recursive | O(N) | O(H) | For DFS fans |
