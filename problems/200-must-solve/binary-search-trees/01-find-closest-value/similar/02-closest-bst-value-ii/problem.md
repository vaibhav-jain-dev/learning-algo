<div id="viz-config" style="display:none">
{"name":"Inorder Predecessor and Successor","algorithm":"bst-search","complexity":{"time":"O(h)","space":"O(1) iterative, O(h) recursive"},"examples":[{"input":{"tree":[5,3,7,2,4,6,8],"target":4},"output":{"predecessor":3,"successor":5},"inputRaw":"tree = [5,3,7,2,4,6,8], target = 4","outputRaw":"predecessor = 3, successor = 5"},{"input":{"tree":[5,3,7,2,4,6,8],"target":1},"output":{"predecessor":-1,"successor":2},"inputRaw":"tree = [5,3,7,2,4,6,8], target = 1","outputRaw":"predecessor = -1, successor = 2"}]}
</div>

# Closest BST Value II (Inorder Predecessor & Successor)

**Difficulty:** Medium

## Problem Statement

Given the root of a binary search tree and a target value, find the **inorder predecessor** and **inorder successor** of the target value.

- **Inorder predecessor**: The largest value in the BST that is smaller than target
- **Inorder successor**: The smallest value in the BST that is greater than target

If the predecessor or successor does not exist, return -1 for that value.

## Examples

**Example 1:**
```
Input: root = [5,3,7,2,4,6,8], target = 4
        5
       / \
      3   7
     / \ / \
    2  4 6  8

Output: predecessor = 3, successor = 5
Explanation:
- Values less than 4: [2, 3] -> predecessor is 3 (largest)
- Values greater than 4: [5, 6, 7, 8] -> successor is 5 (smallest)
```

**Example 2:**
```
Input: root = [5,3,7,2,4,6,8], target = 4.5
Output: predecessor = 4, successor = 5
```

**Example 3:**
```
Input: root = [5,3,7,2,4,6,8], target = 1
Output: predecessor = -1, successor = 2
Explanation: No value is smaller than 1 in the BST
```

**Example 4:**
```
Input: root = [5,3,7,2,4,6,8], target = 9
Output: predecessor = 8, successor = -1
```

## Constraints

- The number of nodes in the tree is in the range [1, 10^4]
- 0 <= Node.val <= 10^5
- All node values are unique
- Target can be any float value

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How can I use BST properties to find predecessor and successor efficiently?"

Key observations:
- Inorder traversal of BST gives sorted values
- For any target, predecessor is the rightmost in left subtree (or parent from right)
- Successor is the leftmost in right subtree (or parent from left)

### Step 2: Identify the Pattern

**Key insight:** This is a **BST Navigation** problem:
- When going left, current node could be successor (it's greater than target)
- When going right, current node could be predecessor (it's less than target)

### Step 3: Define the Strategy

**Strategy A (Single Pass):**
- Traverse from root, tracking potential predecessor and successor
- Update based on comparisons with target
- No need for full traversal - O(h) time

**Strategy B (Find Node + Navigate):**
- Find the target position (or where it would be inserted)
- Navigate to predecessor (go left then all right)
- Navigate to successor (go right then all left)

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>BST: [5, 3, 7, 2, 4, 6, 8]</code><br>
<code>target = 4</code>
</div>

### BST Structure

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="15" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #6c757d; color: white; line-height: 45px; font-weight: bold;">5</div>
</td>
</tr>
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">3</div>
</td>
<td></td>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #6c757d; color: white; line-height: 45px; font-weight: bold;">7</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #6c757d; color: white; line-height: 45px; font-weight: bold;">2</div>
</td>
<td></td>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #007bff; color: white; line-height: 45px; font-weight: bold;">4</div>
</td>
<td></td>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #6c757d; color: white; line-height: 45px; font-weight: bold;">6</div>
</td>
<td></td>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #6c757d; color: white; line-height: 45px; font-weight: bold;">8</div>
</td>
</tr>
</table>
<div style="margin-top: 10px;">
<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px; margin: 0 5px;">Target</span>
<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 3px; margin: 0 5px;">Predecessor</span>
</div>
</div>

### Step-by-Step: Finding Predecessor & Successor

**Step 1:** Start at root (5), compare with target (4)

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px; width: 30%;"><strong>Current Node:</strong></td>
<td style="padding: 10px;"><span style="background: #6c757d; color: white; padding: 5px 15px; border-radius: 5px;">5</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Comparison:</strong></td>
<td style="padding: 10px;">5 > 4, so 5 could be <span style="background: #ffc107; color: #000; padding: 2px 8px; border-radius: 3px;">successor</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Action:</strong></td>
<td style="padding: 10px;">Go LEFT to find smaller values</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Current State:</strong></td>
<td style="padding: 10px;">predecessor = null, successor = <span style="background: #d4edda; color: #155724; padding: 2px 8px; border-radius: 3px;">5</span></td>
</tr>
</table>
</div>

**Step 2:** At node 3, compare with target (4)

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px; width: 30%;"><strong>Current Node:</strong></td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 5px 15px; border-radius: 5px;">3</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Comparison:</strong></td>
<td style="padding: 10px;">3 < 4, so 3 could be <span style="background: #17a2b8; color: white; padding: 2px 8px; border-radius: 3px;">predecessor</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Action:</strong></td>
<td style="padding: 10px;">Go RIGHT to find larger values (still < 4)</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Current State:</strong></td>
<td style="padding: 10px;">predecessor = <span style="background: #d4edda; color: #155724; padding: 2px 8px; border-radius: 3px;">3</span>, successor = 5</td>
</tr>
</table>
</div>

**Step 3:** At node 4 (the target)

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px; width: 30%;"><strong>Current Node:</strong></td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 5px 15px; border-radius: 5px;">4</span> (TARGET FOUND!)</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Special Case:</strong></td>
<td style="padding: 10px;">Target exists in tree</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>For Predecessor:</strong></td>
<td style="padding: 10px;">Go left subtree, then rightmost (but 4 has no left child)</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>For Successor:</strong></td>
<td style="padding: 10px;">Go right subtree, then leftmost (but 4 has no right child)</td>
</tr>
</table>
</div>

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Predecessor: 3</strong> (largest value < 4)<br>
<strong>Successor: 5</strong> (smallest value > 4)
</div>

### Key Insight Visualization

<div style="background: #e2e3e5; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #dee2e6;">
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Scenario</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Predecessor Update</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Successor Update</th>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">node.val < target</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Update predecessor = node</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">No change</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">node.val > target</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">No change</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Update successor = node</td>
</tr>
<tr>
<td style="padding: 10px;">node.val == target</td>
<td style="padding: 10px;">Check left subtree's rightmost</td>
<td style="padding: 10px;">Check right subtree's leftmost</td>
</tr>
</table>
</div>

---

## Solution Approaches

### Approach 1: Single Pass Traversal

| Metric | Value |
|--------|-------|
| Time Complexity | O(h) where h is height |
| Space Complexity | O(1) iterative, O(h) recursive |

**Why this is best:**
- Most efficient - no need for full traversal
- Uses BST property optimally
- Single pass finds both values

### Approach 2: Inorder Traversal

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) for storing values |

**When to use:**
- Simpler to understand
- When you need full sorted array anyway

### Approach 3: Morris Traversal

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**When to use:**
- Space is extremely limited
- Need O(1) space with inorder traversal

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Single Pass | O(h) | O(1) | General use |
| Inorder + Search | O(n) | O(n) | Need full sorted order |
| Morris Traversal | O(n) | O(1) | Memory constrained |
