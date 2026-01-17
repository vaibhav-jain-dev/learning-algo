# Two Sum Closest in BST

**Difficulty:** Medium-Hard

## Problem Statement

Given the root of a binary search tree and a target value, find two nodes in the BST such that their **sum is closest to the target**. Return the two values.

If there are multiple pairs with the same closest sum, return any one of them.

## Examples

**Example 1:**
```
Input: root = [10,5,15,2,7,12,20], target = 22
          10
         /  \
        5    15
       / \   / \
      2   7 12  20

Output: [7, 15] or [10, 12]
Explanation:
- 7 + 15 = 22 (diff = 0)
- 10 + 12 = 22 (diff = 0)
Both sums equal target exactly.
```

**Example 2:**
```
Input: root = [5,3,7,1,4,6,8], target = 10
        5
       / \
      3   7
     /|   |\
    1 4   6 8

Output: [3, 7] or [4, 6]
Explanation:
- 3 + 7 = 10 (diff = 0)
- 4 + 6 = 10 (diff = 0)
```

**Example 3:**
```
Input: root = [1,null,3], target = 5
    1
     \
      3

Output: [1, 3]
Explanation: Only pair available, sum = 4, diff = 1
```

## Constraints

- The number of nodes in the tree is in range [2, 10^4]
- 0 <= Node.val <= 10^9
- All values in BST are unique
- There are at least 2 nodes in the tree

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How can I efficiently find two numbers that sum closest to target?"

Key observations:
- This is similar to "Two Sum Closest" in a sorted array
- BST inorder gives sorted values
- Two pointer technique works on sorted arrays

### Step 2: Identify the Pattern

**Key insight:** This problem combines:
1. **BST to Sorted Array** - via inorder traversal
2. **Two Pointer Technique** - for finding closest pair sum

Alternative approach:
- Use BST iterators to avoid creating full array
- One iterator goes forward (increasing), one goes backward (decreasing)

### Step 3: Choose Strategy

**Strategy A (Inorder + Two Pointers):**
- O(n) space for array, O(n) time

**Strategy B (BST Iterators):**
- O(h) space for stacks, O(n) time
- More space efficient for large trees

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>BST: [10, 5, 15, 2, 7, 12, 20]</code><br>
<code>target = 22</code>
</div>

### BST Structure

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #6c757d; color: white; line-height: 45px; font-weight: bold;">10</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #6c757d; color: white; line-height: 45px; font-weight: bold;">5</div>
</td>
<td></td>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">15</div>
</td>
</tr>
<tr>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">2</div>
</td>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #007bff; color: white; line-height: 40px; font-weight: bold;">7</div>
</td>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">12</div>
</td>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">20</div>
</td>
</tr>
</table>
<div style="margin-top: 15px;">
<span style="background: #007bff; color: white; padding: 3px 10px; border-radius: 3px; margin: 0 5px;">Left pointer (7)</span>
<span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 3px; margin: 0 5px;">Right pointer (15)</span>
</div>
</div>

### Inorder (Sorted): [2, 5, 7, 10, 12, 15, 20]

### Step-by-Step: Two Pointer Approach

**Initial Setup:**

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<div style="display: flex; gap: 8px; justify-content: center; margin: 15px 0;">
<span style="background: #007bff; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold;">2</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">5</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">7</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">10</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">12</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">15</span>
<span style="background: #28a745; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold;">20</span>
</div>
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 8px;"><strong>Left (L):</strong></td>
<td style="padding: 8px;">index 0, value = 2</td>
</tr>
<tr>
<td style="padding: 8px;"><strong>Right (R):</strong></td>
<td style="padding: 8px;">index 6, value = 20</td>
</tr>
<tr>
<td style="padding: 8px;"><strong>Sum:</strong></td>
<td style="padding: 8px;">2 + 20 = 22 = target</td>
</tr>
<tr>
<td style="padding: 8px;"><strong>Best pair:</strong></td>
<td style="padding: 8px;"><span style="background: #d4edda; color: #155724; padding: 3px 10px; border-radius: 3px;">[2, 20]</span> diff = 0</td>
</tr>
</table>
</div>

**Step 1:** Sum = 22 = target (found one answer!)

<div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 10px 0; color: #155724;">
Found exact match! But let's continue to see the algorithm...
</div>

**Step 2:** Sum equals target, try both directions

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<div style="display: flex; gap: 8px; justify-content: center; margin: 15px 0;">
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">2</span>
<span style="background: #007bff; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold;">5</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">7</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">10</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">12</span>
<span style="background: #28a745; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold;">15</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">20</span>
</div>
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 8px;"><strong>Move L right, R left</strong></td>
<td style="padding: 8px;">L = 1 (5), R = 5 (15)</td>
</tr>
<tr>
<td style="padding: 8px;"><strong>Sum:</strong></td>
<td style="padding: 8px;">5 + 15 = 20 < 22</td>
</tr>
<tr>
<td style="padding: 8px;"><strong>Action:</strong></td>
<td style="padding: 8px;">Sum too small, move L right</td>
</tr>
</table>
</div>

**Step 3:** Continue until L >= R

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<div style="display: flex; gap: 8px; justify-content: center; margin: 15px 0;">
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">2</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">5</span>
<span style="background: #007bff; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold;">7</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">10</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">12</span>
<span style="background: #28a745; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold;">15</span>
<span style="background: #e9ecef; color: #495057; padding: 8px 12px; border-radius: 5px;">20</span>
</div>
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 8px;"><strong>L = 2 (7), R = 5 (15)</strong></td>
<td style="padding: 8px;">Sum = 22 = target</td>
</tr>
<tr>
<td style="padding: 8px;"><strong>Found another match!</strong></td>
<td style="padding: 8px;"><span style="background: #d4edda; color: #155724; padding: 3px 10px; border-radius: 3px;">[7, 15]</span></td>
</tr>
</table>
</div>

### Key Decision Logic

<div style="background: #e2e3e5; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #dee2e6;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #adb5bd;">Condition</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #adb5bd;">Action</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #adb5bd;">Reason</th>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6;">sum < target</td>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Move left pointer right (L++)</td>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Need larger sum</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6;">sum > target</td>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6; background: #f8d7da;">Move right pointer left (R--)</td>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Need smaller sum</td>
</tr>
<tr>
<td style="padding: 12px;">sum == target</td>
<td style="padding: 12px; background: #d1ecf1;">Found exact match, return</td>
<td style="padding: 12px;">Optimal solution</td>
</tr>
</table>
</div>

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Closest Pair: [7, 15]</strong><br>
<strong>Sum: 22</strong><br>
<strong>Difference from target: 0</strong>
</div>

---

## Solution Approaches

### Approach 1: Inorder + Two Pointers

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) for sorted array |

**Why this is simple and effective:**
- Easy to understand
- Standard two-pointer pattern
- Works well for moderate tree sizes

### Approach 2: BST Iterators (Space Optimized)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(h) where h is height |

**When to use:**
- Large trees where O(n) space is prohibitive
- Only need one pair (can stop early)

### Approach 3: Hash Set

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:**
- Need exact target sum (not closest)
- Single pass requirement

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Inorder + Two Pointers | O(n) | O(n) | Simple implementation |
| BST Iterators | O(n) | O(h) | Memory constrained |
| Hash Set (exact sum only) | O(n) | O(n) | Finding exact match |
