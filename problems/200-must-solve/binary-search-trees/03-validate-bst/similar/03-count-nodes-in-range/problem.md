<div id="viz-config" style="display:none">
{"name":"Count Nodes in Range","algorithm":"bst-range","complexity":{"time":"O(n) worst, O(log n + k) average","space":"O(h)"},"examples":[{"input":{"tree":[10,5,15,3,7,null,18],"low":7,"high":15},"output":{"count":3,"sum":32},"inputRaw":"tree = [10,5,15,3,7,null,18], low = 7, high = 15","outputRaw":"Count = 3, Sum = 32 (nodes 7, 10, 15)"},{"input":{"tree":[10,5,15,3,7,13,18,1,null,6],"low":6,"high":10},"output":{"count":3,"sum":23},"inputRaw":"tree = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10","outputRaw":"Count = 3, Sum = 23 (nodes 6, 7, 10)"}]}
</div>

# Count Nodes in Range (Range Sum BST Variant)

**Difficulty:** Easy-Medium

## Problem Statement

Given the root node of a binary search tree and two integers `low` and `high`, return the **count of nodes** whose values are in the inclusive range `[low, high]`.

**Variant:** Also implement a version that returns the **sum of values** of nodes in the range.

## Examples

**Example 1:**
```
Input: root = [10, 5, 15, 3, 7, null, 18], low = 7, high = 15
         10
        /  \
       5    15
      / \     \
     3   7    18

Output: Count = 3, Sum = 32
Explanation: Nodes in range [7, 15] are: 7, 10, 15. Count = 3, Sum = 7 + 10 + 15 = 32
```

**Example 2:**
```
Input: root = [10, 5, 15, 3, 7, 13, 18, 1, null, 6], low = 6, high = 10
           10
          /  \
         5    15
        / \   / \
       3   7 13  18
      /   /
     1   6

Output: Count = 3, Sum = 23
Explanation: Nodes in range [6, 10] are: 6, 7, 10. Count = 3, Sum = 6 + 7 + 10 = 23
```

## Constraints

- The number of nodes in the tree is in the range `[1, 2 * 10^4]`
- `1 <= Node.val <= 10^5`
- `1 <= low <= high <= 10^5`
- All Node.val are unique

---

## Visual Diagram: How It Works

### Input BST with Range [7, 15]

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<p style="color: #666; margin-bottom: 15px;">Range: <strong>[7, 15]</strong></p>
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold; border: 3px solid #28a745;">10</div>
<div style="font-size: 11px; color: #28a745;">In range</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: right; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #ffc107; color: black; line-height: 45px; font-weight: bold;">5</div>
<div style="font-size: 11px; color: #666;">< low</div>
</td>
<td style="width: 40px;"></td>
<td colspan="3" style="text-align: left; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold; border: 3px solid #28a745;">15</div>
<div style="font-size: 11px; color: #28a745;">In range</div>
</td>
</tr>
<tr>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #dc3545; color: white; line-height: 40px; font-weight: bold;">3</div>
<div style="font-size: 10px; color: #dc3545;">Skip</div>
</td>
<td style="width: 20px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #28a745; color: white; line-height: 40px; font-weight: bold; border: 3px solid #28a745;">7</div>
<div style="font-size: 10px; color: #28a745;">In range</div>
</td>
<td style="width: 40px;"></td>
<td colspan="2"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #dc3545; color: white; line-height: 40px; font-weight: bold;">18</div>
<div style="font-size: 10px; color: #dc3545;">Skip</div>
</td>
</tr>
</table>
</div>

### Step-by-Step: BST Pruning Strategy

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<p><strong>Key Insight:</strong> Use BST property to prune search space!</p>
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #e9ecef;">
<th style="padding: 10px;">Node</th>
<th style="padding: 10px;">Comparison</th>
<th style="padding: 10px;">Action</th>
<th style="padding: 10px;">Count</th>
</tr>
<tr>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">10</span></td>
<td style="padding: 10px;">7 <= 10 <= 15</td>
<td style="padding: 10px; color: #28a745;">Count it! Go both ways</td>
<td style="padding: 10px;">1</td>
</tr>
<tr>
<td style="padding: 10px;"><span style="background: #ffc107; color: black; padding: 3px 10px; border-radius: 5px;">5</span></td>
<td style="padding: 10px;">5 < 7 (low)</td>
<td style="padding: 10px; color: #ffc107;">Skip left, go right only</td>
<td style="padding: 10px;">1</td>
</tr>
<tr>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">7</span></td>
<td style="padding: 10px;">7 <= 7 <= 15</td>
<td style="padding: 10px; color: #28a745;">Count it!</td>
<td style="padding: 10px;">2</td>
</tr>
<tr>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">15</span></td>
<td style="padding: 10px;">7 <= 15 <= 15</td>
<td style="padding: 10px; color: #28a745;">Count it! Go left only</td>
<td style="padding: 10px;">3</td>
</tr>
<tr>
<td style="padding: 10px;"><span style="background: #dc3545; color: white; padding: 3px 10px; border-radius: 5px;">3</span></td>
<td style="padding: 10px;">Not visited</td>
<td style="padding: 10px; color: #dc3545;">Pruned!</td>
<td style="padding: 10px;">3</td>
</tr>
<tr>
<td style="padding: 10px;"><span style="background: #dc3545; color: white; padding: 3px 10px; border-radius: 5px;">18</span></td>
<td style="padding: 10px;">Not visited</td>
<td style="padding: 10px; color: #dc3545;">Pruned!</td>
<td style="padding: 10px;">3</td>
</tr>
</table>
</div>

### BST Pruning Rules

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%;">
<tr>
<td style="padding: 10px;"><strong>If node.val < low:</strong></td>
<td style="padding: 10px;">All left subtree values < low, so skip left. Only go right.</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>If node.val > high:</strong></td>
<td style="padding: 10px;">All right subtree values > high, so skip right. Only go left.</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>If low <= node.val <= high:</strong></td>
<td style="padding: 10px;">Count this node! Explore both subtrees.</td>
</tr>
</table>
</div>

### Final Result

<div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 10px 0; text-align: center;">
<div style="font-size: 18px; font-weight: bold; color: #155724;">
Nodes in range [7, 15]: <span style="background: #28a745; color: white; padding: 5px 15px; border-radius: 20px; margin: 0 5px;">7</span>
<span style="background: #28a745; color: white; padding: 5px 15px; border-radius: 20px; margin: 0 5px;">10</span>
<span style="background: #28a745; color: white; padding: 5px 15px; border-radius: 20px; margin: 0 5px;">15</span>
</div>
<p style="margin-top: 15px;"><strong>Count = 3</strong> | <strong>Sum = 32</strong></p>
</div>

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How can I use the BST property to avoid visiting unnecessary nodes?"

Key observations:
- BST property: left subtree < root < right subtree
- If current node < low, no need to visit left subtree
- If current node > high, no need to visit right subtree
- This pruning significantly reduces nodes visited

### Step 2: Identify the Pattern

**Pattern:** This is a "BST Range Query with Pruning" problem.

The key optimization:
- Don't blindly traverse all nodes
- Use range bounds to prune entire subtrees
- Average case better than O(n) when range is small

### Step 3: Choose Your Strategy

**DFS with Conditional Branching:**
```
if node.val >= low:
    explore left subtree
if node.val <= high:
    explore right subtree
if low <= node.val <= high:
    count this node
```

---

## Solution Approaches

### Approach 1: Recursive DFS with Pruning

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) worst case, O(log n + k) average |
| Space Complexity | O(h) recursion stack |

**Why this is efficient:**
- Prunes subtrees outside the range
- When range is narrow relative to tree, visits few nodes

### Approach 2: Iterative with Stack

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) worst case, O(log n + k) average |
| Space Complexity | O(h) explicit stack |

**Why choose iterative:**
- Avoids recursion limit issues
- More control over traversal order
