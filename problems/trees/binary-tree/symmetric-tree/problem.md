# Symmetric Tree

## Problem Description

Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

A tree is symmetric if the left subtree is a mirror reflection of the right subtree.

## Examples

### Example 1:
```
Input: root = [1, 2, 2, 3, 4, 4, 3]
        1
       / \
      2   2
     / \ / \
    3  4 4  3

Output: true
```

### Example 2:
```
Input: root = [1, 2, 2, null, 3, null, 3]
        1
       / \
      2   2
       \   \
        3   3

Output: false
```

### Example 3:
```
Input: root = [1]
Output: true
```

### Example 4:
```
Input: root = [1, 2, 2, 2, null, 2]
        1
       / \
      2   2
     /   /
    2   2

Output: false
Explanation: Although values match, the structure is not mirrored.
```

## Constraints

- The number of nodes in the tree is in the range [1, 1000]
- -100 <= Node.val <= 100

## Hints

<details>
<summary>Hint 1 - Mirror Property</summary>

Two trees are mirrors of each other if:
1. Their roots have the same value
2. The left subtree of one is a mirror of the right subtree of the other

</details>

<details>
<summary>Hint 2 - Recursive Approach</summary>

Create a helper function `isMirror(left, right)` that checks if two subtrees are mirrors.
The original tree is symmetric if `isMirror(root.left, root.right)` returns true.

</details>

<details>
<summary>Hint 3 - Iterative Approach</summary>

Use a queue to compare nodes level by level.
For each pair of nodes, their children should be added in mirror order.

</details>

## Approach

### Recursive Approach
- **Time Complexity**: O(n) where n is the number of nodes
- **Space Complexity**: O(h) where h is the height (recursion stack)

```
isMirror(t1, t2):
    if both null: return true
    if one null: return false
    return t1.val == t2.val AND
           isMirror(t1.left, t2.right) AND
           isMirror(t1.right, t2.left)
```

### Iterative Approach
- **Time Complexity**: O(n)
- **Space Complexity**: O(n)

1. Use a queue, initially containing (root.left, root.right)
2. For each pair (n1, n2):
   - Check if both null (continue) or one null (false) or values differ (false)
   - Add (n1.left, n2.right) and (n1.right, n2.left) to queue
3. Return true if queue is exhausted without finding mismatch
