# Compare Leaf Traversal

**Difficulty:** Medium (Yellow)

## Problem Statement

Write a function that takes in the root nodes of two Binary Trees and returns a boolean representing whether their leaf traversals are the same.

The leaf traversal of a Binary Tree is the left-to-right sequence of all the leaf nodes in the tree. A leaf node is any node that has no left or right children.

## Examples

**Example:**
```
Tree 1:
        1
      /   \
     2     3
    / \     \
   4   5     6
      / \
     7   8

Tree 2:
        1
      /   \
     2     3
    / \   /
   4   7 8
        \
         5
          \
           6

Output: true
Explanation:
Tree 1 leaf traversal: [4, 7, 8, 6]
Tree 2 leaf traversal: [4, 7, 8, 6]
Both sequences are identical.
```

## Constraints

- Both trees are standard binary trees
- Trees can have different structures but same leaf order
- An empty tree has no leaves
- A single node is itself a leaf

## Hints

<details>
<summary>Hint 1</summary>
You can collect all leaves from both trees and compare the lists, but this uses O(n) space.
</details>

<details>
<summary>Hint 2</summary>
For optimal space, use iterative traversal with a stack. Process leaves one at a time from each tree and compare them as you go.
</details>

## Approach

**Approach 1: Collect and Compare**
1. Traverse each tree, collecting leaf values
2. Compare the two lists

**Approach 2: Parallel Iteration (Optimal)**
1. Use two stacks for iterative pre-order traversal
2. For each tree, advance to the next leaf
3. Compare leaves one by one
4. If any mismatch or different lengths, return false

**Time Complexity:** O(n + m) where n, m are the number of nodes
**Space Complexity:** O(h1 + h2) for stack approach, O(l1 + l2) for list approach where l is leaves count

---

## Similar Problems (Harder)

### 1. Leaf-Similar Trees with Limited Memory
**Difficulty:** Medium

Compare leaf traversals using O(1) extra space (Morris traversal or similar).

### 2. Compare K-th Leaves
**Difficulty:** Medium

Check if the k-th leaf from both trees (left to right) has the same value.

### 3. Minimum Swaps to Make Leaf Traversals Equal
**Difficulty:** Hard

Find minimum subtree swaps needed to make two trees have the same leaf traversal.
