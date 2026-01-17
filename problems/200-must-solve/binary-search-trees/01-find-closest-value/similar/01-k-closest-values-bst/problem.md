# K Closest Values in BST

**Difficulty:** Medium

## Problem Statement

Given the root of a binary search tree, a target value, and an integer `k`, return the `k` values in the BST that are closest to the target. You may return the answer in any order.

You are guaranteed to have only one unique set of `k` closest values in the BST.

## Examples

**Example 1:**
```
Input: root = [4,2,5,1,3], target = 3.7, k = 2
        4
       / \
      2   5
     / \
    1   3

Output: [4, 3]
Explanation: The 2 closest values to 3.7 are 3 and 4.
```

**Example 2:**
```
Input: root = [1], target = 0.0, k = 1
Output: [1]
```

**Example 3:**
```
Input: root = [8,4,12,2,6,10,14,1,3,5,7], target = 6.5, k = 4
           8
         /   \
        4     12
       / \   /  \
      2   6 10  14
     /\  /\
    1 3 5  7

Output: [6, 7, 5, 8] (any order)
```

## Constraints

- The number of nodes in the tree is `n`
- 1 <= k <= n <= 10^4
- 0 <= Node.val <= 10^9
- -10^9 <= target <= 10^9

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How can I leverage the BST property to find closest values efficiently?"

Key observations:
- BST's inorder traversal gives sorted values
- Once values are sorted, finding k closest becomes a classic "sliding window" or "two pointer" problem
- Alternative: Use a max-heap to track k closest values during traversal

### Step 2: Identify the Pattern

**Key insight:** This problem combines two patterns:
1. **BST Inorder Traversal** - to get sorted values
2. **K Closest Elements** - using heap or two pointers on sorted array

### Step 3: Choose Your Strategy

**Strategy A (Heap):**
- Traverse BST, maintain max-heap of size k
- If current value is closer than heap root, pop and push

**Strategy B (Inorder + Two Pointers):**
- Get sorted array via inorder traversal
- Use binary search to find closest position
- Expand outward from that position

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>BST: [4, 2, 5, 1, 3]</code><br>
<code>target = 3.7</code><br>
<code>k = 2</code>
</div>

### BST Structure

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #007bff; color: white; line-height: 40px; font-weight: bold;">4</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: right; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #28a745; color: white; line-height: 40px; font-weight: bold;">2</div>
</td>
<td style="width: 40px;"></td>
<td colspan="3" style="text-align: left; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #28a745; color: white; line-height: 40px; font-weight: bold;">5</div>
</td>
</tr>
<tr>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">1</div>
</td>
<td style="width: 20px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">3</div>
</td>
<td colspan="4"></td>
</tr>
</table>
</div>

### Step-by-Step: Heap Approach

**Step 1:** Inorder traverse, encountering value 1

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px;"><strong>Current Value:</strong></td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 5px 15px; border-radius: 5px;">1</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Distance from 3.7:</strong></td>
<td style="padding: 10px;">|1 - 3.7| = 2.7</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Max Heap:</strong></td>
<td style="padding: 10px;"><span style="background: #d4edda; color: #155724; padding: 5px 15px; border-radius: 5px;">[(2.7, 1)]</span> (size < k, add)</td>
</tr>
</table>
</div>

**Step 2:** Visit value 2

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px;"><strong>Current Value:</strong></td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 5px 15px; border-radius: 5px;">2</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Distance from 3.7:</strong></td>
<td style="padding: 10px;">|2 - 3.7| = 1.7</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Max Heap:</strong></td>
<td style="padding: 10px;"><span style="background: #d4edda; color: #155724; padding: 5px 15px; border-radius: 5px;">[(2.7, 1), (1.7, 2)]</span> (size = k now)</td>
</tr>
</table>
</div>

**Step 3:** Visit value 3

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px;"><strong>Current Value:</strong></td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 5px 15px; border-radius: 5px;">3</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Distance from 3.7:</strong></td>
<td style="padding: 10px;">|3 - 3.7| = 0.7</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Heap root (max dist):</strong></td>
<td style="padding: 10px;">2.7 > 0.7 - replace!</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Max Heap:</strong></td>
<td style="padding: 10px;"><span style="background: #d4edda; color: #155724; padding: 5px 15px; border-radius: 5px;">[(1.7, 2), (0.7, 3)]</span></td>
</tr>
</table>
</div>

**Step 4:** Visit value 4

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px;"><strong>Current Value:</strong></td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 5px 15px; border-radius: 5px;">4</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Distance from 3.7:</strong></td>
<td style="padding: 10px;">|4 - 3.7| = 0.3</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Heap root (max dist):</strong></td>
<td style="padding: 10px;">1.7 > 0.3 - replace!</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Max Heap:</strong></td>
<td style="padding: 10px;"><span style="background: #d4edda; color: #155724; padding: 5px 15px; border-radius: 5px;">[(0.7, 3), (0.3, 4)]</span></td>
</tr>
</table>
</div>

**Step 5:** Visit value 5

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px;"><strong>Current Value:</strong></td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 5px 15px; border-radius: 5px;">5</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Distance from 3.7:</strong></td>
<td style="padding: 10px;">|5 - 3.7| = 1.3</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Heap root (max dist):</strong></td>
<td style="padding: 10px;">0.7 < 1.3 - keep current heap</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Max Heap:</strong></td>
<td style="padding: 10px;"><span style="background: #d4edda; color: #155724; padding: 5px 15px; border-radius: 5px;">[(0.7, 3), (0.3, 4)]</span> unchanged</td>
</tr>
</table>
</div>

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>K Closest Values: [3, 4]</strong><br>
<strong>Distances: [0.7, 0.3]</strong>
</div>

---

## Solution Approaches

### Approach 1: Inorder + Max Heap

| Metric | Value |
|--------|-------|
| Time Complexity | O(n log k) |
| Space Complexity | O(k + h) where h is height |

**Why use this:**
- Efficient when k << n
- Natural traversal of BST
- Can early terminate in optimized version

### Approach 2: Inorder + Two Pointers

| Metric | Value |
|--------|-------|
| Time Complexity | O(n + k) |
| Space Complexity | O(n) |

**When to use:**
- When you need all sorted values anyway
- Simpler to implement

### Approach 3: Binary Search + Two Pointers (Optimal)

| Metric | Value |
|--------|-------|
| Time Complexity | O(log n + k) |
| Space Complexity | O(h) |

**When to use:**
- When n is large and k is small
- Uses inorder predecessor/successor

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Inorder + Heap | O(n log k) | O(k + h) | k << n |
| Inorder + Two Pointers | O(n) | O(n) | Simple cases |
| Binary Search + Iterators | O(log n + k) | O(h) | Large n, small k |
