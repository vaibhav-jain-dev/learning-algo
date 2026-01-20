# Repair BST

**Difficulty:** Hard (Red)

## Problem Statement

You are given the root of a Binary Search Tree (BST), where the values of **exactly two nodes** of the tree were swapped by mistake. Your task is to recover the tree without changing its structure.

In other words, find the two nodes that were swapped and swap their values back to restore the valid BST property.

## Examples

**Example 1:**
```
Input:      1          Output:     3
           /                      /
          3           ->         1
           \                      \
            2                      2

Explanation: 3 and 1 were swapped. After repair: inorder is [1, 2, 3]
```

**Example 2:**
```
Input:      3          Output:     2
           / \                    / \
          1   4        ->        1   4
             /                      /
            2                      3

Explanation: 2 and 3 were swapped. After repair: inorder is [1, 2, 3, 4]
```

**Example 3:**
```
Input:       6
           /   \
          2     8
         / \   / \
        1   4 7   9
           / \
          5   3

Explanation: 3 and 5 were swapped (they are adjacent in inorder traversal).
             Inorder: [1, 2, 5, 4, 3, 6, 7, 8, 9] - one violation at (5,4), another at (4,3)
             After repair: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Constraints

- The number of nodes in the tree is in range [2, 1000]
- -2^31 <= Node.val <= 2^31 - 1
- Exactly two nodes have been swapped
- The tree structure must not be changed, only node values

## Hints

<details>
<summary>Hint 1</summary>
Think about what happens during an inorder traversal of a valid BST - values should be in strictly increasing order.
</details>

<details>
<summary>Hint 2</summary>
When two nodes are swapped, there will be one or two "inversions" in the inorder sequence - places where a value is greater than its successor.
</details>

<details>
<summary>Hint 3</summary>
If the two swapped nodes are adjacent in inorder traversal, there's exactly ONE inversion. If they're not adjacent, there are TWO inversions.
</details>

<details>
<summary>Hint 4</summary>
For O(1) space, consider Morris Traversal. It allows inorder traversal without recursion or explicit stack by temporarily modifying the tree structure (creating and removing "threads").
</details>

<details>
<summary>Hint 5</summary>
In Morris Traversal: for each node with a left subtree, find its inorder predecessor (rightmost node in left subtree). Make the current node the right child of this predecessor temporarily. This creates a "thread" back to the current node.
</details>

## Approach

### Approach 1: Recursive Inorder with O(n) Space
1. Perform inorder traversal to get all nodes in order
2. Find inversions (where node[i] > node[i+1])
3. If one inversion: swap adjacent nodes
4. If two inversions: swap first node of first inversion with second node of second inversion

**Time Complexity:** O(n)
**Space Complexity:** O(n) for storing nodes or O(h) for recursion stack

### Approach 2: Iterative Inorder with O(h) Stack Space
1. Use explicit stack for inorder traversal
2. Track previous node and find inversions during traversal
3. Swap values of the two misplaced nodes

**Time Complexity:** O(n)
**Space Complexity:** O(h) where h is height of tree

### Approach 3: Morris Traversal with O(1) Space
1. Use Morris Traversal (threaded binary tree) for O(1) space inorder
2. Track previous node and identify the two swapped nodes
3. Swap their values at the end

**Morris Traversal Algorithm:**
- If current has no left child: visit current, move to right
- If current has left child:
  - Find inorder predecessor (rightmost in left subtree)
  - If predecessor's right is null: set it to current, move left
  - If predecessor's right is current: restore null, visit current, move right

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Repair BST with K Swaps
**Difficulty:** Very Hard

Extend to handle K pairs of swapped nodes. Find minimum swaps to fix the BST.

### 2. Verify If Tree Can Be Fixed
**Difficulty:** Hard

Given a binary tree, determine if it can be converted to a valid BST by swapping exactly two nodes.

### 3. Repair BST with Parent Pointers
**Difficulty:** Medium

Same problem but nodes have parent pointers. Can you use them to simplify?
