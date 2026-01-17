# BST Iterator

**Difficulty:** Medium

## Problem Statement

Implement the `BSTIterator` class that represents an iterator over the **in-order traversal** of a binary search tree (BST):

- `BSTIterator(TreeNode root)` Initializes an object with the root of the BST.
- `int next()` Returns the next smallest number in the BST. You may assume `next()` calls will always be valid.
- `boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.

The pointer should be initialized to a non-existent number smaller than any element in the BST.

## Examples

**Example 1:**
```
Input:
          7
         / \
        3   15
           /  \
          9    20

Operations:
BSTIterator iterator = new BSTIterator(root);
iterator.next();    // return 3
iterator.next();    // return 7
iterator.hasNext(); // return true
iterator.next();    // return 9
iterator.hasNext(); // return true
iterator.next();    // return 15
iterator.hasNext(); // return true
iterator.next();    // return 20
iterator.hasNext(); // return false
```

**Example 2:**
```
Input: Single node tree [5]
Operations:
iterator.hasNext(); // return true
iterator.next();    // return 5
iterator.hasNext(); // return false
```

## Constraints

- The number of nodes is in the range [1, 10^5]
- 0 <= Node.val <= 10^6
- At most 10^5 calls will be made to `hasNext` and `next`

## Follow-up

Could you implement `next()` and `hasNext()` to run in average O(1) time and use O(h) memory, where h is the height of the tree?

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How can I iterate through a BST in sorted order without storing all elements?"

Key observations:
- Inorder traversal gives sorted order: Left -> Root -> Right
- We need to pause and resume traversal on demand
- Full inorder stores O(n), but we can do better

### Step 2: Identify the Pattern

**Key insight:** This is a **Controlled Traversal** problem:
- Use a stack to simulate the recursion
- "Pause" at each node to return value
- "Resume" by processing right subtree

### Step 3: Choose Strategy

**Strategy A (Full Inorder):**
- O(n) space, O(1) per operation
- Simple but space inefficient

**Strategy B (Stack-based - Controlled Recursion):**
- O(h) space
- O(1) amortized per operation
- Optimal solution

---

## Visual Diagram: How It Works

### Input BST

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #6c757d; color: white; line-height: 45px; font-weight: bold;">7</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #6c757d; color: white; line-height: 45px; font-weight: bold;">3</div>
</td>
<td></td>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #6c757d; color: white; line-height: 45px; font-weight: bold;">15</div>
</td>
</tr>
<tr>
<td colspan="3"></td>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">9</div>
</td>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">20</div>
</td>
</tr>
</table>
<div style="margin-top: 10px; color: #6c757d;">
Inorder: [3, 7, 9, 15, 20]
</div>
</div>

### Stack-Based Iterator Simulation

**Initialization:** Push all left nodes starting from root

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px; width: 40%;"><strong>Action:</strong></td>
<td style="padding: 10px;">Initialize - push leftmost path</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Stack:</strong></td>
<td style="padding: 10px;">
<div style="display: flex; gap: 5px;">
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 3px;">7</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 3px;">3</span>
<span style="color: #6c757d;">(top)</span>
</div>
</td>
</tr>
</table>
</div>

**Call next() - First time:**

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px; width: 40%;"><strong>Pop from stack:</strong></td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 3px;">3</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Has right child?</strong></td>
<td style="padding: 10px;">No - nothing to push</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Return:</strong></td>
<td style="padding: 10px;"><span style="background: #d4edda; color: #155724; padding: 5px 10px; border-radius: 3px; font-weight: bold;">3</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Stack after:</strong></td>
<td style="padding: 10px;">
<div style="display: flex; gap: 5px;">
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 3px;">7</span>
</div>
</td>
</tr>
</table>
</div>

**Call next() - Second time:**

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px; width: 40%;"><strong>Pop from stack:</strong></td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 3px;">7</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Has right child?</strong></td>
<td style="padding: 10px;">Yes (15) - push leftmost path from 15</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Return:</strong></td>
<td style="padding: 10px;"><span style="background: #d4edda; color: #155724; padding: 5px 10px; border-radius: 3px; font-weight: bold;">7</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Stack after:</strong></td>
<td style="padding: 10px;">
<div style="display: flex; gap: 5px;">
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 3px;">15</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 3px;">9</span>
<span style="color: #6c757d;">(top)</span>
</div>
</td>
</tr>
</table>
</div>

**Call next() - Third time:**

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="padding: 10px; width: 40%;"><strong>Pop from stack:</strong></td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 3px;">9</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Has right child?</strong></td>
<td style="padding: 10px;">No - nothing to push</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Return:</strong></td>
<td style="padding: 10px;"><span style="background: #d4edda; color: #155724; padding: 5px 10px; border-radius: 3px; font-weight: bold;">9</span></td>
</tr>
<tr>
<td style="padding: 10px;"><strong>Stack after:</strong></td>
<td style="padding: 10px;">
<div style="display: flex; gap: 5px;">
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 3px;">15</span>
</div>
</td>
</tr>
</table>
</div>

### Key Algorithm Insight

<div style="background: #e2e3e5; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #dee2e6;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #adb5bd;">Operation</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #adb5bd;">Stack Action</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #adb5bd;">Why It Works</th>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Initialize</td>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Push all left nodes</td>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Smallest is at top</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6;">next()</td>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6; background: #fff3cd;">Pop top, push left path of right child</td>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Maintains sorted order</td>
</tr>
<tr>
<td style="padding: 12px;">hasNext()</td>
<td style="padding: 12px; background: #d1ecf1;">Check if stack non-empty</td>
<td style="padding: 12px;">More elements exist</td>
</tr>
</table>
</div>

---

## Solution Approaches

### Approach 1: Stack-Based (Controlled Recursion)

| Metric | Value |
|--------|-------|
| Time Complexity | O(1) amortized for next(), O(1) for hasNext() |
| Space Complexity | O(h) where h is height |

**Why this is optimal:**
- Each node pushed/popped exactly once
- Space proportional to height, not size
- Meets follow-up requirements

### Approach 2: Full Inorder Precomputation

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) init, O(1) per operation |
| Space Complexity | O(n) |

**When to use:**
- Simple implementation needed
- Memory not constrained

### Approach 3: Morris Traversal (Advanced)

| Metric | Value |
|--------|-------|
| Time Complexity | O(1) amortized |
| Space Complexity | O(1) |

**When to use:**
- Strict O(1) space required
- Tree modification is allowed

---

## Complexity Comparison

| Approach | next() Time | hasNext() Time | Space |
|----------|-------------|----------------|-------|
| Stack-Based | O(1) amortized | O(1) | O(h) |
| Precomputed | O(1) | O(1) | O(n) |
| Morris | O(1) amortized | O(1) | O(1) |
