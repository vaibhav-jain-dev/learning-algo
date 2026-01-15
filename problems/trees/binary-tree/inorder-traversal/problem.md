# Inorder Traversal of Binary Tree

## Problem Description

Given the root of a binary tree, return the inorder traversal of its nodes' values.

In an inorder traversal, we visit nodes in the following order:
1. Visit the left subtree
2. Visit the root node
3. Visit the right subtree

Implement both **iterative** and **recursive** solutions.

## Examples

### Example 1:
```
Input: root = [1, null, 2, 3]
        1
         \
          2
         /
        3

Output: [1, 3, 2]
```

### Example 2:
```
Input: root = []
Output: []
```

### Example 3:
```
Input: root = [1]
Output: [1]
```

### Example 4:
```
Input: root = [1, 2, 3, 4, 5]
        1
       / \
      2   3
     / \
    4   5

Output: [4, 2, 5, 1, 3]
```

## Constraints

- The number of nodes in the tree is in the range [0, 100]
- -100 <= Node.val <= 100

## Hints

<details>
<summary>Hint 1 - Recursive Approach</summary>

For the recursive solution, simply follow the definition:
1. Recursively traverse the left subtree
2. Add the current node's value to the result
3. Recursively traverse the right subtree

</details>

<details>
<summary>Hint 2 - Iterative Approach</summary>

Use a stack to simulate the recursion. The key insight is:
- Keep going left and pushing nodes onto the stack
- When you can't go left anymore, pop from stack, add to result, then go right

</details>

<details>
<summary>Hint 3 - Morris Traversal (Advanced)</summary>

For O(1) space complexity, consider Morris Traversal which uses threaded binary trees.
The idea is to create temporary links to the inorder predecessor.

</details>

## Approach

### Recursive Approach
- **Time Complexity**: O(n) where n is the number of nodes
- **Space Complexity**: O(h) where h is the height of the tree (recursion stack)

Simply follow the inorder definition recursively.

### Iterative Approach
- **Time Complexity**: O(n)
- **Space Complexity**: O(h)

1. Initialize an empty stack and set current = root
2. While current is not null OR stack is not empty:
   - While current is not null:
     - Push current to stack
     - Move to left child
   - Pop from stack, add value to result
   - Move to right child

### Morris Traversal (Bonus)
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

Uses the concept of threaded binary trees to traverse without extra space.
