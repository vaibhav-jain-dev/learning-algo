<div id="viz-config" style="display:none">
{"name":"Convert Sorted Array to BST","algorithm":"bst-construction-balanced","complexity":{"time":"O(n)","space":"O(log n) recursion stack"},"examples":[{"input":{"nums":[-10,-3,0,5,9]},"output":[0,-3,9,-10,null,5],"inputRaw":"nums = [-10, -3, 0, 5, 9]","outputRaw":"Height-balanced BST with root 0"},{"input":{"nums":[1,2,3,4,5,6,7]},"output":[4,2,6,1,3,5,7],"inputRaw":"nums = [1, 2, 3, 4, 5, 6, 7]","outputRaw":"Balanced BST with root 4"}]}
</div>

# Convert Sorted Array to BST

**Difficulty:** Medium

## Problem Statement

Given an integer array `nums` where the elements are sorted in **ascending order**, convert it to a **height-balanced** binary search tree.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

## Examples

**Example 1:**
```
Input: nums = [-10, -3, 0, 5, 9]
Output:       0
             / \
           -3   9
           /   /
         -10  5

Or:           0
             / \
           -10  5
             \   \
             -3   9

Both are valid height-balanced BSTs.
```

**Example 2:**
```
Input: nums = [1, 3]
Output:    3      or      1
          /                \
         1                  3
```

**Example 3:**
```
Input: nums = [1, 2, 3, 4, 5, 6, 7]
Output:         4
              /   \
             2     6
            / \   / \
           1   3 5   7
```

## Constraints

- 1 <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4
- nums is sorted in strictly increasing order

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I ensure the tree is balanced?"

Key observations:
- Sorted array means inorder traversal
- For balance, we want equal-ish nodes in left and right subtrees
- Middle element should be root for optimal balance

### Step 2: Identify the Pattern

**Key insight:** This is a **Divide and Conquer** problem:
- Pick middle element as root
- Left half becomes left subtree
- Right half becomes right subtree
- Recursively apply to each half

### Step 3: Define the Recursion

```
function build(left, right):
    if left > right: return null

    mid = (left + right) / 2
    node = TreeNode(nums[mid])
    node.left = build(left, mid - 1)
    node.right = build(mid + 1, right)
    return node
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>nums = [-10, -3, 0, 5, 9]</code>
</div>

### Step-by-Step Construction

**Step 1:** Find middle (index 2), make it root

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<div style="display: flex; gap: 5px; justify-content: center; margin: 10px 0;">
<span style="background: #6c757d; color: white; padding: 8px 12px; border-radius: 5px;">-10</span>
<span style="background: #6c757d; color: white; padding: 8px 12px; border-radius: 5px;">-3</span>
<span style="background: #28a745; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold;">0</span>
<span style="background: #6c757d; color: white; padding: 8px 12px; border-radius: 5px;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 12px; border-radius: 5px;">9</span>
</div>
<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
<tr>
<td style="padding: 8px;"><strong>Root:</strong></td>
<td style="padding: 8px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 3px;">0</span> (middle element)</td>
</tr>
<tr>
<td style="padding: 8px;"><strong>Left subarray:</strong></td>
<td style="padding: 8px;">[-10, -3]</td>
</tr>
<tr>
<td style="padding: 8px;"><strong>Right subarray:</strong></td>
<td style="padding: 8px;">[5, 9]</td>
</tr>
</table>
</div>

**Step 2:** Build left subtree from [-10, -3]

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<div style="display: flex; gap: 5px; justify-content: center; margin: 10px 0;">
<span style="background: #6c757d; color: white; padding: 8px 12px; border-radius: 5px;">-10</span>
<span style="background: #007bff; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold;">-3</span>
</div>
<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
<tr>
<td style="padding: 8px;"><strong>Left subtree root:</strong></td>
<td style="padding: 8px;"><span style="background: #007bff; color: white; padding: 3px 10px; border-radius: 3px;">-3</span></td>
</tr>
<tr>
<td style="padding: 8px;"><strong>Its left:</strong></td>
<td style="padding: 8px;">[-10] -> node with value -10</td>
</tr>
<tr>
<td style="padding: 8px;"><strong>Its right:</strong></td>
<td style="padding: 8px;">[] -> null</td>
</tr>
</table>
</div>

**Step 3:** Build right subtree from [5, 9]

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<div style="display: flex; gap: 5px; justify-content: center; margin: 10px 0;">
<span style="background: #ffc107; color: #000; padding: 8px 12px; border-radius: 5px; font-weight: bold;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 12px; border-radius: 5px;">9</span>
</div>
<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
<tr>
<td style="padding: 8px;"><strong>Right subtree root:</strong></td>
<td style="padding: 8px;"><span style="background: #ffc107; color: #000; padding: 3px 10px; border-radius: 3px;">5</span> or 9 (depends on mid calculation)</td>
</tr>
</table>
</div>

### Final Tree

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 50px; height: 50px; border-radius: 50%; background: #28a745; color: white; line-height: 50px; font-weight: bold; font-size: 18px;">0</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #007bff; color: white; line-height: 45px; font-weight: bold;">-3</div>
</td>
<td></td>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #ffc107; color: #000; line-height: 45px; font-weight: bold;">9</div>
</td>
</tr>
<tr>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold; font-size: 12px;">-10</div>
</td>
<td colspan="2"></td>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">5</div>
</td>
<td colspan="2"></td>
</tr>
</table>
<div style="margin-top: 15px; color: #6c757d;">
Height: 3 (balanced: max depth difference is 1)
</div>
</div>

### Recursion Tree Visualization

<div style="background: #e2e3e5; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #dee2e6;">
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Call</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Range</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Mid</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Creates</th>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">build(0, 4)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">[-10,-3,0,5,9]</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">2</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Root: 0</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">build(0, 1)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">[-10, -3]</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">0</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #cce5ff;">Left of 0: -10</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">build(1, 1)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">[-3]</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">1</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #cce5ff;">Right of -10: -3</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">build(3, 4)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">[5, 9]</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">3</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #fff3cd;">Right of 0: 5</td>
</tr>
<tr>
<td style="padding: 10px;">build(4, 4)</td>
<td style="padding: 10px;">[9]</td>
<td style="padding: 10px;">4</td>
<td style="padding: 10px; background: #fff3cd;">Right of 5: 9</td>
</tr>
</table>
</div>

---

## Solution Approaches

### Approach 1: Recursive Divide and Conquer

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(log n) recursion stack |

**Why this is optimal:**
- Each element visited exactly once
- Natural recursive structure
- Guarantees balanced tree

### Approach 2: Iterative with Queue

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) for queue |

**When to use:**
- Avoid recursion limits
- Explicit control over traversal

### Approach 3: Sorted Linked List to BST (Related)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(log n) |

**When to use:**
- Input is a linked list instead of array
- Cannot access elements by index

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Recursive | O(n) | O(log n) | Standard use |
| Iterative | O(n) | O(n) | Deep trees |
| From Linked List | O(n) | O(log n) | Linked input |
