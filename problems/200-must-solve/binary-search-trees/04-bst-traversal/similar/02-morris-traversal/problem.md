# Morris Traversal

**Difficulty:** Hard

## Problem Statement

Implement **Morris Traversal** to perform inorder and preorder tree traversals with **O(1) space complexity** (no stack, no recursion).

Morris Traversal achieves constant space by temporarily modifying the tree structure - creating threads from the rightmost node of left subtrees back to their ancestors.

## Examples

**Example 1:**
```
Input: root = [1, 2, 3, 4, 5, null, 6]
        1
       / \
      2   3
     / \   \
    4   5   6

Morris Inorder:   [4, 2, 5, 1, 3, 6]
Morris Preorder:  [1, 2, 4, 5, 3, 6]
```

**Example 2:**
```
Input: root = [4, 2, 6, 1, 3, 5, 7]
         4
        / \
       2   6
      / \ / \
     1  3 5  7

Morris Inorder:  [1, 2, 3, 4, 5, 6, 7]
```

## Constraints

- The number of nodes in the tree is in the range `[0, 10^4]`
- `-10^5 <= Node.val <= 10^5`
- Tree structure must be restored after traversal

---

## Visual Diagram: How Morris Inorder Works

### Initial Tree

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #007bff; color: white; line-height: 45px; font-weight: bold;">4</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: right; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">2</div>
</td>
<td style="width: 40px;"></td>
<td colspan="3" style="text-align: left; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">6</div>
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
<td style="width: 40px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">5</div>
</td>
<td style="width: 20px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">7</div>
</td>
</tr>
</table>
</div>

### Key Concept: Threading

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 10px 0;">
<p><strong>Morris Traversal creates temporary "threads":</strong></p>
<ul>
<li>Find the <strong>inorder predecessor</strong> of current node (rightmost node in left subtree)</li>
<li>Make predecessor's right pointer point back to current node (create thread)</li>
<li>Use this thread to return after processing left subtree</li>
<li>Remove the thread when done (restore tree)</li>
</ul>
</div>

### Step-by-Step Morris Inorder

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #e9ecef;">
<th style="padding: 10px;">Step</th>
<th style="padding: 10px;">Current</th>
<th style="padding: 10px;">Action</th>
<th style="padding: 10px;">Thread Created/Removed</th>
<th style="padding: 10px;">Output</th>
</tr>
<tr>
<td style="padding: 10px;">1</td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 3px 10px; border-radius: 5px;">4</span></td>
<td style="padding: 10px;">Find predecessor (3), create thread</td>
<td style="padding: 10px;"><span style="color: #28a745;">3 -> 4 (created)</span></td>
<td style="padding: 10px;">[]</td>
</tr>
<tr>
<td style="padding: 10px;">2</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">2</span></td>
<td style="padding: 10px;">Find predecessor (1), create thread</td>
<td style="padding: 10px;"><span style="color: #28a745;">1 -> 2 (created)</span></td>
<td style="padding: 10px;">[]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">3</td>
<td style="padding: 10px;"><span style="background: #6c757d; color: white; padding: 3px 10px; border-radius: 5px;">1</span></td>
<td style="padding: 10px;">No left child, <strong>output</strong>, follow thread</td>
<td style="padding: 10px;">-</td>
<td style="padding: 10px;">[<strong>1</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">4</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">2</span></td>
<td style="padding: 10px;">Thread found, <strong>output</strong>, remove thread</td>
<td style="padding: 10px;"><span style="color: #dc3545;">1 -> 2 (removed)</span></td>
<td style="padding: 10px;">[1, <strong>2</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">5</td>
<td style="padding: 10px;"><span style="background: #6c757d; color: white; padding: 3px 10px; border-radius: 5px;">3</span></td>
<td style="padding: 10px;">No left child, <strong>output</strong>, follow thread</td>
<td style="padding: 10px;">-</td>
<td style="padding: 10px;">[1, 2, <strong>3</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">6</td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 3px 10px; border-radius: 5px;">4</span></td>
<td style="padding: 10px;">Thread found, <strong>output</strong>, remove thread</td>
<td style="padding: 10px;"><span style="color: #dc3545;">3 -> 4 (removed)</span></td>
<td style="padding: 10px;">[1, 2, 3, <strong>4</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">7</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">6</span></td>
<td style="padding: 10px;">Find predecessor (5), create thread</td>
<td style="padding: 10px;"><span style="color: #28a745;">5 -> 6 (created)</span></td>
<td style="padding: 10px;">[1, 2, 3, 4]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">8</td>
<td style="padding: 10px;"><span style="background: #6c757d; color: white; padding: 3px 10px; border-radius: 5px;">5</span></td>
<td style="padding: 10px;">No left child, <strong>output</strong>, follow thread</td>
<td style="padding: 10px;">-</td>
<td style="padding: 10px;">[1, 2, 3, 4, <strong>5</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">9</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">6</span></td>
<td style="padding: 10px;">Thread found, <strong>output</strong>, remove thread</td>
<td style="padding: 10px;"><span style="color: #dc3545;">5 -> 6 (removed)</span></td>
<td style="padding: 10px;">[1, 2, 3, 4, 5, <strong>6</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">10</td>
<td style="padding: 10px;"><span style="background: #6c757d; color: white; padding: 3px 10px; border-radius: 5px;">7</span></td>
<td style="padding: 10px;">No left child, <strong>output</strong>, done</td>
<td style="padding: 10px;">-</td>
<td style="padding: 10px;">[1, 2, 3, 4, 5, 6, <strong>7</strong>]</td>
</tr>
</table>
</div>

### Threading Visualization

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<p style="color: #666;">Threads (dotted) during traversal:</p>
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #007bff; color: white; line-height: 45px; font-weight: bold;">4</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: right; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">2</div>
</td>
<td style="width: 40px;"></td>
<td colspan="3" style="text-align: left; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">6</div>
</td>
</tr>
<tr>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">1</div>
<div style="font-size: 10px; color: #28a745;">thread to 2</div>
</td>
<td style="width: 20px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">3</div>
<div style="font-size: 10px; color: #28a745;">thread to 4</div>
</td>
<td style="width: 40px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">5</div>
<div style="font-size: 10px; color: #28a745;">thread to 6</div>
</td>
<td style="width: 20px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">7</div>
</td>
</tr>
</table>
</div>

---

## Algorithm Details

### Morris Inorder Algorithm

```
while current is not null:
    if current.left is null:
        OUTPUT current
        current = current.right
    else:
        predecessor = find rightmost in current.left
        if predecessor.right is null:
            predecessor.right = current  (create thread)
            current = current.left
        else:
            predecessor.right = null  (remove thread)
            OUTPUT current
            current = current.right
```

### Morris Preorder Algorithm

Same structure, but OUTPUT at different points:
- Output when creating thread (before going left)
- Output when no left child exists

---

## Solution Approaches

### Complexity Analysis

| Traversal | Time | Space |
|-----------|------|-------|
| Morris Inorder | O(n) | O(1) |
| Morris Preorder | O(n) | O(1) |

**Why O(n) time despite nested loops?**
- Each edge is traversed at most twice (once to create thread, once to remove)
- Total edges = n - 1
- So total operations <= 2(n-1) = O(n)

### Trade-offs

| Aspect | Morris | Stack-based | Recursive |
|--------|--------|-------------|-----------|
| Space | O(1) | O(h) | O(h) |
| Modifies Tree | Yes (temporarily) | No | No |
| Thread Safety | No | Yes | Yes |
| Simplicity | Complex | Medium | Simple |

**Use Morris when:**
- Memory is very constrained
- Tree modification is acceptable
- Single-threaded execution
