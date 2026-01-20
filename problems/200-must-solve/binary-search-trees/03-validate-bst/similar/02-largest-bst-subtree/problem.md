<div id="viz-config" style="display:none">
{"name":"Largest BST Subtree","algorithm":"bst-validation","complexity":{"time":"O(n)","space":"O(h)"},"examples":[{"input":{"tree":[10,5,15,1,8,null,7]},"output":3,"inputRaw":"tree = [10,5,15,1,8,null,7]","outputRaw":"3 (subtree [5,1,8] is largest BST)"},{"input":{"tree":[2,1,3]},"output":3,"inputRaw":"tree = [2,1,3]","outputRaw":"3 (entire tree is a BST)"}]}
</div>

# Largest BST Subtree

**Difficulty:** Medium

## Problem Statement

Given the root of a binary tree, find the largest subtree which is a Binary Search Tree (BST), where the largest means subtree has the largest number of nodes.

A **Binary Search Tree (BST)** is a tree in which all the nodes follow the below properties:
- The left subtree values are less than the value of their parent node
- The right subtree values are greater than the value of their parent node

Return the size of the largest BST subtree.

## Examples

**Example 1:**
```
Input: root = [10, 5, 15, 1, 8, null, 7]
       10
      /  \
     5    15
    / \     \
   1   8     7

Output: 3

Explanation: The largest BST subtree is:
     5
    / \
   1   8
This subtree has 3 nodes.
```

**Example 2:**
```
Input: root = [4, 2, 7, 2, 3, 5, null, 2, null, null, null, null, null, 1]
         4
        / \
       2   7
      / \ /
     2  3 5
    /
   2
    \
     1

Output: 2

Explanation: Multiple BST subtrees of size 2 exist.
```

**Example 3:**
```
Input: root = [2, 1, 3]
     2
    / \
   1   3

Output: 3

Explanation: The entire tree is a valid BST.
```

## Constraints

- The number of nodes in the tree is in the range `[0, 10^4]`
- `-10^4 <= Node.val <= 10^4`

---

## Visual Diagram: How It Works

### Input Tree (Not entirely a BST)

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<p style="color: #666; margin-bottom: 15px;">Tree with mixed BST and non-BST subtrees:</p>
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #ffc107; color: black; line-height: 45px; font-weight: bold;">10</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: right; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">5</div>
</td>
<td style="width: 40px;"></td>
<td colspan="3" style="text-align: left; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #dc3545; color: white; line-height: 45px; font-weight: bold;">15</div>
</td>
</tr>
<tr>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #28a745; color: white; line-height: 40px; font-weight: bold;">1</div>
</td>
<td style="width: 20px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #28a745; color: white; line-height: 40px; font-weight: bold;">8</div>
</td>
<td style="width: 40px;"></td>
<td colspan="2"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #dc3545; color: white; line-height: 40px; font-weight: bold;">7</div>
</td>
</tr>
</table>
<div style="margin-top: 15px;">
<span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px; margin: 5px;">Valid BST</span>
<span style="background: #dc3545; color: white; padding: 3px 10px; border-radius: 5px; margin: 5px;">Invalid (7 < 15)</span>
<span style="background: #ffc107; color: black; padding: 3px 10px; border-radius: 5px; margin: 5px;">Root</span>
</div>
</div>

### Step-by-Step: Bottom-Up Validation

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<p><strong>Post-order traversal: Process children before parent</strong></p>
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #e9ecef;">
<th style="padding: 10px;">Node</th>
<th style="padding: 10px;">Left Result</th>
<th style="padding: 10px;">Right Result</th>
<th style="padding: 10px;">Is BST?</th>
<th style="padding: 10px;">Size</th>
</tr>
<tr>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">1</span></td>
<td style="padding: 10px;">null</td>
<td style="padding: 10px;">null</td>
<td style="padding: 10px; color: #28a745;">Yes</td>
<td style="padding: 10px;">1</td>
</tr>
<tr>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">8</span></td>
<td style="padding: 10px;">null</td>
<td style="padding: 10px;">null</td>
<td style="padding: 10px; color: #28a745;">Yes</td>
<td style="padding: 10px;">1</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">5</span></td>
<td style="padding: 10px;">1 (max=1)</td>
<td style="padding: 10px;">8 (min=8)</td>
<td style="padding: 10px; color: #28a745;">Yes (1<5<8)</td>
<td style="padding: 10px; font-weight: bold;">3</td>
</tr>
<tr>
<td style="padding: 10px;"><span style="background: #dc3545; color: white; padding: 3px 10px; border-radius: 5px;">7</span></td>
<td style="padding: 10px;">null</td>
<td style="padding: 10px;">null</td>
<td style="padding: 10px; color: #28a745;">Yes</td>
<td style="padding: 10px;">1</td>
</tr>
<tr style="background: #f8d7da;">
<td style="padding: 10px;"><span style="background: #dc3545; color: white; padding: 3px 10px; border-radius: 5px;">15</span></td>
<td style="padding: 10px;">null</td>
<td style="padding: 10px;">7 (min=7)</td>
<td style="padding: 10px; color: #dc3545;">No (7<15)</td>
<td style="padding: 10px;">1</td>
</tr>
<tr style="background: #fff3cd;">
<td style="padding: 10px;"><span style="background: #ffc107; color: black; padding: 3px 10px; border-radius: 5px;">10</span></td>
<td style="padding: 10px;">5 (max=8)</td>
<td style="padding: 10px;">Not BST</td>
<td style="padding: 10px; color: #dc3545;">No</td>
<td style="padding: 10px;">-</td>
</tr>
</table>
</div>

### Largest BST Found

<div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<p style="color: #155724; font-weight: bold; margin-bottom: 15px;">Largest BST Subtree (Size = 3):</p>
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 50px; height: 50px; border-radius: 50%; background: #28a745; color: white; line-height: 50px; font-weight: bold; font-size: 18px;">5</div>
</td>
</tr>
<tr>
<td style="text-align: right; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">1</div>
</td>
<td style="width: 30px;"></td>
<td style="text-align: left; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">8</div>
</td>
</tr>
</table>
</div>

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I check if a subtree is a BST while counting nodes?"

Key observations:
- A subtree is a BST if both children are BSTs AND the current node satisfies BST property
- Need to track: min value, max value, size for each subtree
- Use post-order (bottom-up) to build information from leaves

### Step 2: Identify the Pattern

**Pattern:** This is a "Tree DP with BST Validation" problem.

For each node, we need:
1. Is this subtree a valid BST?
2. What is the minimum value in this subtree?
3. What is the maximum value in this subtree?
4. How many nodes in this subtree?

### Step 3: Choose Your Strategy

**Return structure from each recursive call:**
- `(is_bst, min_val, max_val, size)`

**Validation at each node:**
- Left subtree is BST AND left.max < node.val
- Right subtree is BST AND right.min > node.val
- Then current subtree is BST with size = 1 + left.size + right.size

---

## Solution Approaches

### Approach 1: Post-order DFS with Tuple Return

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) - visit each node once |
| Space Complexity | O(h) - recursion stack |

**Why use post-order:**
- Need children's information before processing parent
- Natural bottom-up computation

### Approach 2: Global Max with Helper

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(h) |

**Why track global max:**
- Simplifies the return value
- Max can be updated at any valid BST subtree
