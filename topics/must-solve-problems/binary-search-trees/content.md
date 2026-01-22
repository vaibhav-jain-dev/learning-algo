# Binary Search Trees - Interview Mastery Guide

## Category Overview

A Binary Search Tree (BST) is a hierarchical data structure that combines the efficiency of binary search with the flexibility of linked structures. The defining property is that for every node, all values in its left subtree are strictly less than the node's value, and all values in the right subtree are greater (or equal, depending on implementation).

BSTs are fundamental because they provide an elegant way to maintain sorted data while supporting efficient insertions, deletions, and lookups. They form the conceptual foundation for more advanced self-balancing trees like AVL trees, Red-Black trees, and B-trees used in databases.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">BST Core Properties</h3>
<div style="color: #334155;">
<ul>
<li><strong>Ordering Invariant</strong>: Left subtree < Node < Right subtree (for all nodes)</li>
<li><strong>In-order Traversal</strong>: Yields elements in sorted ascending order</li>
<li><strong>Average Case</strong>: O(log n) for search, insert, delete when balanced</li>
<li><strong>Worst Case</strong>: O(n) when tree degenerates to a linked list</li>
<li><strong>Space</strong>: O(n) to store n elements</li>
</ul>
</div>
</div>

**Interview Frequency**: BST problems appear in **15-20%** of tree-related interview questions. Companies like Google, Amazon, Microsoft, Meta, and Bloomberg regularly test BST operations, validation, and construction.

**Why Interviewers Love BSTs**:
- Tests understanding of recursive data structures
- Combines tree traversal with binary search concepts
- Reveals ability to handle edge cases and boundary conditions
- Can be solved iteratively or recursively, showing versatility

## Key Patterns

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">BST Pattern Recognition Guide</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155; overflow-x: auto;">
+------------------------+---------------------------+-------------------------+
|       Pattern          |       When to Use         |    Example Problems     |
+------------------------+---------------------------+-------------------------+
| BST Property           | Finding elements, closest | Search in BST, Find     |
| Exploitation           | value, min/max finding    | Closest, Validate BST   |
+------------------------+---------------------------+-------------------------+
| In-Order Traversal     | Sorted order needed,      | Kth Smallest/Largest,   |
|                        | range queries, k-th elem  | Convert to Sorted List  |
+------------------------+---------------------------+-------------------------+
| Range Validation       | Validating BST, checking  | Validate BST,           |
|                        | constraints at each node  | Recover BST             |
+------------------------+---------------------------+-------------------------+
| Construction           | Building BST from arrays, | Sorted Array to BST,    |
|                        | reconstruction            | Reconstruct Preorder    |
+------------------------+---------------------------+-------------------------+
| Successor/Predecessor  | Finding next/prev in      | BST Iterator, In-order  |
|                        | sorted order              | Successor               |
+------------------------+---------------------------+-------------------------+
</pre>
</div>

### Pattern 1: BST Property Exploitation

The BST property enables binary search in a tree structure. At each node, you can eliminate half the remaining nodes by comparing with the target.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">BST Search Visualization</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Finding value 12 in BST:

              10        <- 12 > 10, go RIGHT
            /    \
           5      15    <- 12 < 15, go LEFT
          / \    /  \
         2   7  12   20 <- 12 == 12, FOUND!
        /     \
       1       8

Path: 10 -> 15 -> 12 (only 3 comparisons for 9 nodes!)

Why it works:
- Going RIGHT eliminates all nodes in left subtree
- Going LEFT eliminates all nodes in right subtree
- Each step reduces search space by approximately half
</pre>
</div>

### Pattern 2: In-Order Traversal

In-order traversal (Left -> Node -> Right) of a BST produces elements in sorted ascending order. This property is crucial for problems involving sorted sequences.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">In-Order Traversal Visualization</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
BST Structure:
              10
            /    \
           5      15
          / \    /  \
         2   7  12   20
        /     \
       1       8

In-Order Traversal Process:
1. Go left to 5, then to 2, then to 1
2. Visit 1 (no left child)
3. Back to 2, visit 2
4. 2 has no right, back to 5, visit 5
5. Go right to 7, visit 7
6. Go right to 8, visit 8
7. Back to 10, visit 10
8. Go right to 15, left to 12, visit 12
9. Back to 15, visit 15
10. Go right to 20, visit 20

Result: 1, 2, 5, 7, 8, 10, 12, 15, 20 (SORTED!)

Key Insight: For kth smallest, do in-order and count
            For kth largest, do reverse in-order (Right -> Node -> Left)
</pre>
</div>

### Pattern 3: Range Validation

When validating a BST, each node must fall within a valid range. This range narrows as you descend the tree.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Range Validation Visualization</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Valid BST Validation:

              10           Range: (-inf, +inf) -> 10 is valid
            /    \
           5      15       Left: (-inf, 10), Right: (10, +inf)
          / \    /  \
         2   7  12   20    Ranges continue narrowing...

For node 7: Range is (-inf, 10) from parent 10
            Then narrowed to (5, 10) from parent 5
            7 is in (5, 10) -> VALID

Invalid BST Example:
              10
            /    \
           5      15
          / \    /
         2   12 ...        <- 12 is in LEFT subtree of 10!

For node 12: Range should be (-inf, 5) from parent 5
             12 is NOT in (-inf, 5) -> INVALID!

Common Mistake: Only checking immediate parent-child relationship
               misses this type of violation.
</pre>
</div>

## Must-Know Problems with Solutions

### Problem 1: Find Closest Value in BST

**Problem**: Given a BST and a target value, find the value in the tree closest to the target.

**Approach**: Navigate using BST property, tracking the closest value seen.

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def find_closest_value_in_bst(tree, target):
    """
    Time: O(log n) average, O(n) worst | Space: O(1)

    Navigate through BST while tracking closest value.
    BST property guides us toward the target.
    """
    closest = tree.value
    current = tree

    while current is not None:
        # Update closest if current is closer to target
        if abs(target - current.value) < abs(target - closest):
            closest = current.value

        # Navigate based on BST property
        if target < current.value:
            current = current.left
        elif target > current.value:
            current = current.right
        else:
            # Exact match found
            return current.value

    return closest

# Example
# BST: 10 -> 5, 15 -> 2, 5, 13, 22 -> 1, 14
# Target: 12
# Path: 10 -> 15 -> 13 -> 14
# Closest: 13 (distance 1) beats 14 (distance 2)
```

---

### Problem 2: Validate BST

**Problem**: Determine if a binary tree is a valid BST.

**Approach**: Pass valid range (min, max) to each node recursively.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Validation Logic</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Key Insight: A node is valid if:
1. Its value is within the allowed range (min_val, max_val)
2. All nodes in its left subtree are valid with range (min_val, node.value)
3. All nodes in its right subtree are valid with range (node.value, max_val)

Initial call: validate(root, -infinity, +infinity)

Common Mistake:
  WRONG: Only check node.left.value < node.value < node.right.value
  This misses cases where a node deep in the tree violates
  the constraint of an ancestor.
</pre>
</div>

```python
def validate_bst(tree):
    """
    Time: O(n) | Space: O(h) where h is height

    Every node must be within a valid range.
    Range narrows as we descend.
    """
    return validate_helper(tree, float('-inf'), float('inf'))

def validate_helper(node, min_val, max_val):
    if node is None:
        return True

    # Check if current node violates BST property
    if node.value < min_val or node.value >= max_val:
        return False

    # Recursively validate subtrees with narrowed ranges
    # Left subtree: all values must be < node.value
    left_valid = validate_helper(node.left, min_val, node.value)
    # Right subtree: all values must be >= node.value
    right_valid = validate_helper(node.right, node.value, max_val)

    return left_valid and right_valid

# Alternative: In-order traversal should produce sorted sequence
def validate_bst_inorder(tree):
    """Validate using in-order traversal property"""
    prev = {'value': float('-inf')}

    def inorder(node):
        if node is None:
            return True

        if not inorder(node.left):
            return False

        if node.value <= prev['value']:
            return False
        prev['value'] = node.value

        return inorder(node.right)

    return inorder(tree)
```

---

### Problem 3: BST Construction from Sorted Array

**Problem**: Given a sorted array, construct a height-balanced BST.

**Approach**: Use the middle element as root, recursively build subtrees.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Construction Visualization</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Sorted Array: [1, 2, 5, 7, 10, 13, 14, 15, 22]
              Indices: 0  1  2  3   4   5   6   7   8

Step 1: Middle index = 4, value = 10 -> ROOT
        Left subarray: [1, 2, 5, 7]
        Right subarray: [13, 14, 15, 22]

Step 2: Left middle = 1, value = 2
        Right middle = 6, value = 14

Result:
                 10
               /    \
              2      14
             / \    /  \
            1   5  13   15
                 \       \
                  7      22

Height: 3 (minimum possible for 9 elements)
Height of perfectly balanced tree: ceil(log2(n+1))
</pre>
</div>

```python
def min_height_bst(array):
    """
    Time: O(n) | Space: O(n)

    Build balanced BST by always choosing middle as root.
    This ensures left and right subtrees have equal (or nearly equal) sizes.
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

# Example
array = [1, 2, 5, 7, 10, 13, 14, 15, 22]
root = min_height_bst(array)
# Creates balanced BST with height 3
```

---

### Problem 4: Find Kth Largest Value

**Problem**: Find the kth largest value in a BST.

**Approach**: Use reverse in-order traversal (Right -> Node -> Left) which visits nodes in descending order.

```python
def find_kth_largest_value_in_bst(tree, k):
    """
    Time: O(h + k) | Space: O(h)

    Reverse in-order traversal visits nodes in descending order.
    Stop when we've visited k nodes.
    """
    result = {'count': 0, 'value': None}
    reverse_inorder(tree, k, result)
    return result['value']

def reverse_inorder(node, k, result):
    if node is None or result['count'] >= k:
        return

    # Visit right subtree first (larger values)
    reverse_inorder(node.right, k, result)

    # Process current node
    if result['count'] < k:
        result['count'] += 1
        if result['count'] == k:
            result['value'] = node.value
            return

    # Visit left subtree
    reverse_inorder(node.left, k, result)

# For kth SMALLEST, use regular in-order (Left -> Node -> Right)
def find_kth_smallest(tree, k):
    result = {'count': 0, 'value': None}

    def inorder(node):
        if node is None or result['count'] >= k:
            return

        inorder(node.left)

        result['count'] += 1
        if result['count'] == k:
            result['value'] = node.value
            return

        inorder(node.right)

    inorder(tree)
    return result['value']
```

---

### Problem 5: BST Reconstruction from Preorder

**Problem**: Reconstruct a BST from its preorder traversal.

**Approach**: Use range validation while building - first element is root, subsequent elements must respect BST property.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Preorder Reconstruction Logic</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Preorder: [10, 4, 2, 1, 5, 17, 19, 18]

Key Insight: In preorder (Root -> Left -> Right):
- First element is always the root
- Elements < root come next (left subtree)
- Elements > root come after (right subtree)

Process:
1. Take 10 as root, range (-inf, +inf)
2. 4 < 10, goes left, range (-inf, 10)
3. 2 < 4, goes left, range (-inf, 4)
4. 1 < 2, goes left, range (-inf, 2)
5. 5 > 2, can't go left of 2, backtrack
6. 5 < 4, can't go left of 4 (already have 2), backtrack
7. 5 > 4 and 5 < 10, goes right of 4, range (4, 10)
8. Continue...

Result:
         10
        /  \
       4    17
      / \     \
     2   5    19
    /        /
   1        18
</pre>
</div>

```python
def reconstruct_bst(preorder):
    """
    Time: O(n) | Space: O(n)

    Build BST from preorder using range validation.
    Each element must fit within valid range for current position.
    """
    if not preorder:
        return None

    idx = {'current': 0}
    return build_bst(preorder, idx, float('-inf'), float('inf'))

def build_bst(preorder, idx, min_val, max_val):
    if idx['current'] >= len(preorder):
        return None

    value = preorder[idx['current']]

    # If value doesn't fit in valid range, it belongs elsewhere
    if value < min_val or value >= max_val:
        return None

    idx['current'] += 1
    node = BST(value)

    # Left subtree: values must be in (min_val, value)
    node.left = build_bst(preorder, idx, min_val, value)
    # Right subtree: values must be in (value, max_val)
    node.right = build_bst(preorder, idx, value, max_val)

    return node
```

---

### Problem 6: BST Insertion and Deletion

**Problem**: Implement standard BST insert and delete operations.

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def insert(self, value):
        """
        Time: O(log n) average, O(n) worst | Space: O(1) iterative
        """
        current = self
        while True:
            if value < current.value:
                if current.left is None:
                    current.left = BST(value)
                    break
                current = current.left
            else:
                if current.right is None:
                    current.right = BST(value)
                    break
                current = current.right
        return self

    def delete(self, value, parent=None):
        """
        Time: O(log n) average, O(n) worst | Space: O(1)

        Three cases:
        1. Node is leaf: simply remove
        2. Node has one child: replace with child
        3. Node has two children: replace with in-order successor
        """
        current = self
        while current is not None:
            if value < current.value:
                parent = current
                current = current.left
            elif value > current.value:
                parent = current
                current = current.right
            else:
                # Found node to delete
                if current.left is not None and current.right is not None:
                    # Case 3: Two children
                    # Replace with smallest value in right subtree
                    current.value = current.right.get_min_value()
                    current.right.delete(current.value, current)
                elif parent is None:
                    # Deleting root with one or zero children
                    if current.left is not None:
                        current.value = current.left.value
                        current.right = current.left.right
                        current.left = current.left.left
                    elif current.right is not None:
                        current.value = current.right.value
                        current.left = current.right.left
                        current.right = current.right.right
                    else:
                        # Single node tree
                        pass
                elif parent.left == current:
                    parent.left = current.left if current.left else current.right
                elif parent.right == current:
                    parent.right = current.left if current.left else current.right
                break
        return self

    def get_min_value(self):
        current = self
        while current.left is not None:
            current = current.left
        return current.value
```

## Complexity Analysis Summary

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">BST Operations Complexity</h3>
<table style="width: 100%; border-collapse: collapse; color: #334155;">
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Operation</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Average</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Worst</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Space</th>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Search</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(log n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(1)</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Insert</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(log n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(1)</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Delete</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(log n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(1)</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Find Min/Max</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(log n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(1)</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">In-order Traversal</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(h)</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Validate BST</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(h)</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Build from Sorted</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
</tr>
</table>
<p style="color: #64748b; margin-top: 12px;"><em>Note: Worst case occurs when BST degenerates to a linked list (all nodes on one side)</em></p>
</div>

## Common Mistakes

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Pitfalls to Avoid</h3>
<div style="color: #334155;">

1. **Incorrect Validation**: Only checking immediate parent-child relationship instead of propagating range constraints from ancestors

2. **Wrong Inequality**: Using `<` vs `<=` inconsistently - clarify whether duplicates go left or right

3. **Forgetting Null Checks**: Always check if node is None before accessing its value or children

4. **Assuming Balance**: Worst case is O(n) for skewed trees - don't assume O(log n) without self-balancing

5. **Modifying During Traversal**: Can cause infinite loops or missed nodes

6. **Confusing Traversals**:
   - Pre-order: Root -> Left -> Right (copying trees)
   - In-order: Left -> Root -> Right (sorted order)
   - Post-order: Left -> Right -> Root (deletion)

7. **Deletion Edge Cases**:
   - Deleting root
   - Node with two children requires finding successor
   - Maintaining parent references correctly

8. **Reconstruction Errors**: Different traversal combinations uniquely determine a tree (pre+in, post+in, but NOT pre+post for general trees)

</div>
</div>

## Interview Tips

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Problem-Solving Framework for BST</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Step 1: Identify if BST property helps
  - Can you eliminate half the tree at each step?
  - Is sorted order useful for the problem?

Step 2: Consider traversal type
  - Need sorted order? -> In-order
  - Building/copying? -> Pre-order
  - Deleting subtrees? -> Post-order

Step 3: Think about range constraints
  - Validation problems use (min, max) ranges
  - Ranges narrow as you descend

Step 4: Choose recursion vs iteration
  - Recursion: cleaner, uses call stack
  - Iteration: better space, explicit stack
  - Know both approaches!

Time Allocation (30-minute problem):
0-3 min:  Understand, draw example BST
3-8 min:  Identify pattern, plan approach
8-25 min: Implement solution
25-30 min: Test edge cases
</pre>
</div>

### Key Communication Phrases

- "Since this is a BST, I can use the ordering property to guide my search..."
- "In-order traversal will give me elements in sorted order, which helps because..."
- "I need to track the valid range for each node to ensure BST property holds..."
- "Let me trace through this example tree to verify my logic..."
- "The edge cases I need to handle are: empty tree, single node, skewed tree, duplicates..."

### Edge Cases to Always Consider

1. Empty tree (null root)
2. Single node tree
3. Skewed tree (all left or all right children)
4. Duplicate values (clarify handling with interviewer)
5. Negative values
6. Target not in tree (for search problems)

## Practice Problems

### Easy
1. Find Closest Value in BST
2. BST Traversal (In/Pre/Post order)
3. Validate BST

### Medium
4. Min Height BST
5. Find Kth Largest Value in BST
6. Reconstruct BST from Preorder
7. BST Insertion
8. BST Deletion
9. Contains Sequence

### Hard
10. Same BSTs (without building trees)
11. Validate Three Nodes
12. Repair BST (two swapped nodes)

### Very Hard
13. Right Smaller Than (BST augmentation)
14. Sum BSTs

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Quick Reference</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Traversal Orders:
  In-order:    Left -> Node -> Right  (gives SORTED order)
  Pre-order:   Node -> Left -> Right  (useful for copying)
  Post-order:  Left -> Right -> Node  (useful for deletion)
  Reverse In:  Right -> Node -> Left  (gives DESCENDING order)

Key Relationships:
  Successor:   Leftmost node in right subtree
               (or first right ancestor)
  Predecessor: Rightmost node in left subtree
               (or first left ancestor)

  Min value:   Follow left pointers to leaf
  Max value:   Follow right pointers to leaf

Validation Formula:
  validate(node, min, max):
    return min < node.value < max
           AND validate(node.left, min, node.value)
           AND validate(node.right, node.value, max)
</pre>
</div>
