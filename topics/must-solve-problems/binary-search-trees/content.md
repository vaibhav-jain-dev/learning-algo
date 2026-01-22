# Binary Search Trees - Interview Mastery Guide

## Overview

A Binary Search Tree (BST) is a binary tree where each node follows the ordering property: all values in the left subtree are less than the node's value, and all values in the right subtree are greater. This property enables efficient searching, insertion, and deletion operations.

Key characteristics:
- **Ordered Structure**: Left < Node < Right for every node
- **In-order traversal** yields elements in sorted order
- **Average O(log n)** operations when balanced
- **Foundation** for self-balancing trees (AVL, Red-Black)

## Why This Matters for Interviews

**Frequency**: BST problems appear in **15-20%** of tree-related interview questions

**Companies that heavily test BSTs**:
- Google (BST validation, construction)
- Amazon (range queries, k-th element)
- Microsoft (tree traversals, LCA problems)
- Meta (serialization, reconstruction)
- Bloomberg (BST operations)

**Why interviewers love BST problems**:
1. Tests understanding of recursive data structures
2. Combines tree traversal with binary search concepts
3. Reveals ability to handle edge cases
4. Can be solved iteratively or recursively

## Core Patterns

### Pattern 1: BST Property Exploitation
**When to use**: Finding elements, validating BST, finding min/max
**Key insight**: Compare with current node to decide left or right
**Example problems**: Search in BST, Find Closest Value, Validate BST

### Pattern 2: In-Order Traversal
**When to use**: Problems requiring sorted order, k-th element, range queries
**Key insight**: In-order traversal of BST gives sorted sequence
**Example problems**: Kth Smallest/Largest, Convert BST to Sorted List

### Pattern 3: Range Validation
**When to use**: Validating BST, checking constraints
**Key insight**: Each node must be within valid (min, max) range
**Example problems**: Validate BST, Recover BST

### Pattern 4: Construction/Reconstruction
**When to use**: Building BST from arrays, reconstructing from traversals
**Key insight**: Use divide and conquer with BST property
**Example problems**: Sorted Array to BST, Reconstruct from Preorder

## Visual Explanation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">BST Property Visualization</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Valid BST:
              10
            /    \
           5      15
          / \    /  \
         2   7  12   20
        /     \
       1       8

For node 10: All left (1,2,5,7,8) < 10 < All right (12,15,20)
For node 5:  All left (1,2) < 5 < All right (7,8)
For node 15: All left (12) < 15 < All right (20)

In-order traversal: 1, 2, 5, 7, 8, 10, 12, 15, 20 (SORTED!)
</pre>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">BST Search Path</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Finding value 12 in BST:

              10        <- 12 > 10, go RIGHT
            /    \
           5      15    <- 12 < 15, go LEFT
          / \    /  \
         2   7  12   20  <- 12 == 12, FOUND!
        /     \
       1       8

Steps: 10 -> 15 -> 12 (only 3 comparisons!)

Finding value 7:
10 -> 5 -> 7 (3 comparisons)

This is why BST search is O(log n) on average!
</pre>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">BST Validation with Range</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Validate BST by passing valid range:

              10
            /    \
           5      15

Node 10: range (-inf, +inf) -> 10 is valid
Node 5:  range (-inf, 10)   -> 5 is valid
Node 15: range (10, +inf)   -> 15 is valid

Invalid example:
              10
            /    \
           5      15
          / \    /
         2   12 ...    <- 12 > 10, but it's in LEFT subtree!

Node 12: range (-inf, 5) -> 12 NOT in range, INVALID!
</pre>
</div>

## Must-Know Problems

### Problem 1: Find Closest Value in BST

**Problem**: Given a BST and a target value, find the value closest to target.

**Approach**: Iteratively navigate using BST property, track closest
- Time: O(log n) average, O(n) worst
- Space: O(1)

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def find_closest_value_in_bst(tree, target):
    """
    Time: O(log n) average, O(n) worst | Space: O(1)
    """
    closest = tree.value
    current = tree

    while current is not None:
        # Update closest if current is closer
        if abs(target - current.value) < abs(target - closest):
            closest = current.value

        # Navigate based on BST property
        if target < current.value:
            current = current.left
        elif target > current.value:
            current = current.right
        else:
            return current.value  # Exact match

    return closest

# Example: Target = 12 in BST with root 10
# Path: 10 -> 15 -> 13, closest = 13
```

---

### Problem 2: Validate BST

**Problem**: Determine if a binary tree is a valid BST.

**Approach**: Pass valid range (min, max) to each node
- Time: O(n)
- Space: O(h) for recursion stack

```python
def validate_bst(tree):
    """
    Time: O(n) | Space: O(h)
    """
    return validate_helper(tree, float('-inf'), float('inf'))

def validate_helper(node, min_val, max_val):
    if node is None:
        return True

    # Check if current node violates BST property
    if node.value < min_val or node.value >= max_val:
        return False

    # Left subtree: all values must be < node.value
    # Right subtree: all values must be >= node.value
    left_valid = validate_helper(node.left, min_val, node.value)
    right_valid = validate_helper(node.right, node.value, max_val)

    return left_valid and right_valid

# Common mistake: Only checking immediate children
# Wrong: node.left.value < node.value < node.right.value
# This misses cases where deeper nodes violate the property
```

---

### Problem 3: BST Construction from Sorted Array

**Problem**: Given a sorted array, construct a height-balanced BST.

**Approach**: Use middle element as root, recursively build subtrees
- Time: O(n)
- Space: O(n)

```python
def min_height_bst(array):
    """
    Time: O(n) | Space: O(n)
    """
    return build_min_height_bst(array, 0, len(array) - 1)

def build_min_height_bst(array, start, end):
    if start > end:
        return None

    mid = (start + end) // 2
    node = BST(array[mid])

    node.left = build_min_height_bst(array, start, mid - 1)
    node.right = build_min_height_bst(array, mid + 1, end)

    return node

# Example: [1, 2, 5, 7, 10, 13, 14, 15, 22]
#              10
#            /    \
#           2      14
#          / \    /  \
#         1   5  13   15
#              \       \
#               7      22
```

---

### Problem 4: Find Kth Largest Value

**Problem**: Find the kth largest value in a BST.

**Approach**: Reverse in-order traversal (Right -> Node -> Left)
- Time: O(h + k)
- Space: O(h)

```python
def find_kth_largest_value_in_bst(tree, k):
    """
    Time: O(h + k) | Space: O(h)
    Reverse in-order: Right -> Node -> Left gives descending order
    """
    result = {'count': 0, 'value': None}
    reverse_in_order(tree, k, result)
    return result['value']

def reverse_in_order(node, k, result):
    if node is None or result['count'] >= k:
        return

    # Visit right first (larger values)
    reverse_in_order(node.right, k, result)

    # Process current node
    if result['count'] < k:
        result['count'] += 1
        if result['count'] == k:
            result['value'] = node.value
            return

    # Visit left
    reverse_in_order(node.left, k, result)

# For kth smallest, use regular in-order (Left -> Node -> Right)
```

---

### Problem 5: BST Reconstruction from Preorder

**Problem**: Reconstruct a BST from its preorder traversal.

**Approach**: Use range validation while building
- Time: O(n)
- Space: O(n)

```python
def reconstruct_bst(preorder):
    """
    Time: O(n) | Space: O(n)
    Key insight: First element is root, then left subtree, then right subtree
    """
    if not preorder:
        return None

    idx = {'current': 0}
    return build_bst(preorder, idx, float('-inf'), float('inf'))

def build_bst(preorder, idx, min_val, max_val):
    if idx['current'] >= len(preorder):
        return None

    value = preorder[idx['current']]
    if value < min_val or value >= max_val:
        return None

    idx['current'] += 1
    node = BST(value)

    # Left subtree: values must be < current value
    node.left = build_bst(preorder, idx, min_val, value)
    # Right subtree: values must be >= current value
    node.right = build_bst(preorder, idx, value, max_val)

    return node

# Example: [10, 4, 2, 1, 5, 17, 19, 18]
# Builds:    10
#           /  \
#          4    17
#         / \     \
#        2   5    19
#       /        /
#      1        18
```

---

### Problem 6: Recover BST (Two Swapped Nodes)

**Problem**: Two nodes in a BST were swapped by mistake. Recover the BST.

**Approach**: In-order traversal to find violations
- Time: O(n)
- Space: O(h)

```python
def repair_bst(tree):
    """
    Time: O(n) | Space: O(h)
    In-order traversal should be sorted.
    Find two nodes that violate this property.
    """
    state = {
        'first': None,   # First node out of place
        'second': None,  # Second node out of place
        'prev': None     # Previous node in in-order
    }

    find_swapped_nodes(tree, state)

    # Swap values to fix the tree
    if state['first'] and state['second']:
        state['first'].value, state['second'].value = \
            state['second'].value, state['first'].value

    return tree

def find_swapped_nodes(node, state):
    if node is None:
        return

    find_swapped_nodes(node.left, state)

    # Check if current violates BST property with previous
    if state['prev'] and state['prev'].value > node.value:
        if state['first'] is None:
            state['first'] = state['prev']  # First violation: prev is wrong
        state['second'] = node  # Current node is the second wrong node

    state['prev'] = node

    find_swapped_nodes(node.right, state)
```

## Common Mistakes

1. **Forgetting range validation**: Only checking immediate children misses deeper violations
2. **Wrong inequality**: Using `<` vs `<=` (handle duplicates correctly)
3. **Not handling null nodes**: Always check if node is None first
4. **Assuming balanced tree**: Worst case is O(n) for skewed trees
5. **Modifying tree during traversal**: Can cause infinite loops
6. **Confusing preorder/inorder/postorder**: Each has different reconstruction logic

## Interview Tips

### How to approach BST problems:

1. **Identify if BST property helps**: Can you eliminate half the tree at each step?
2. **Consider in-order traversal**: Many problems need sorted order
3. **Think about range constraints**: Validation and construction use ranges
4. **Recursive vs Iterative**: Both should be comfortable

### Time management:
- **0-3 min**: Understand problem, draw example BST
- **3-8 min**: Identify pattern (search, traversal, validation)
- **8-25 min**: Implement solution
- **25-30 min**: Test with edge cases

### Communication tips:
- "Since this is a BST, I can use the ordering property..."
- "In-order traversal will give me sorted elements..."
- "I need to track the valid range for each node..."
- "Let me trace through this example to verify..."

### Edge cases to consider:
- Empty tree (null root)
- Single node tree
- Skewed tree (worst case)
- Duplicate values (clarify handling)

## Practice Problems (Easy to Hard)

### Easy
1. Find Closest Value in BST
2. BST Traversal (In/Pre/Post order)
3. Validate BST

### Medium
4. Min Height BST
5. Find Kth Largest Value
6. Reconstruct BST from Preorder
7. BST Insertion
8. BST Deletion
9. Contains Sequence

### Hard
10. Same BSTs (without building trees)
11. Validate Three Nodes
12. Repair BST

### Very Hard
13. Right Smaller Than (using BST augmentation)
14. Sum BSTs

## Quick Reference Card

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">BST Cheat Sheet</h3>
<table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Operation</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Average</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Worst</th>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Search</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(log n)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n)</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Insert</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(log n)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n)</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Delete</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(log n)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n)</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Find Min/Max</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(log n)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n)</td>
</tr>
<tr>
<td style="padding: 12px;">In-order Traversal</td>
<td style="padding: 12px;">O(n)</td>
<td style="padding: 12px;">O(n)</td>
</tr>
</table>

<h4 style="color: #1e293b; margin-top: 20px;">Traversal Orders</h4>
<ul style="color: #334155;">
<li><strong>In-order</strong>: Left -> Node -> Right (gives SORTED order)</li>
<li><strong>Pre-order</strong>: Node -> Left -> Right (useful for copying/reconstruction)</li>
<li><strong>Post-order</strong>: Left -> Right -> Node (useful for deletion)</li>
<li><strong>Reverse In-order</strong>: Right -> Node -> Left (gives DESCENDING order)</li>
</ul>

<h4 style="color: #1e293b; margin-top: 20px;">Key Insights</h4>
<ul style="color: #334155;">
<li>BST successor: leftmost node in right subtree (or first right ancestor)</li>
<li>BST predecessor: rightmost node in left subtree (or first left ancestor)</li>
<li>Min value: follow left pointers to leaf</li>
<li>Max value: follow right pointers to leaf</li>
</ul>
</div>
