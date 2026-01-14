# Level Order Traversal (BFS)

## Problem Description

Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

This is also known as Breadth-First Search (BFS) traversal of a tree.

## Examples

### Example 1:
```
Input: root = [3, 9, 20, null, null, 15, 7]
        3
       / \
      9  20
        /  \
       15   7

Output: [[3], [9, 20], [15, 7]]
```

### Example 2:
```
Input: root = [1]
Output: [[1]]
```

### Example 3:
```
Input: root = []
Output: []
```

### Example 4:
```
Input: root = [1, 2, 3, 4, 5, 6, 7]
        1
       / \
      2   3
     / \ / \
    4  5 6  7

Output: [[1], [2, 3], [4, 5, 6, 7]]
```

## Constraints

- The number of nodes in the tree is in the range [0, 2000]
- -1000 <= Node.val <= 1000

## Hints

<details>
<summary>Hint 1 - BFS with Queue</summary>

Use a queue (FIFO) data structure. Start by adding the root to the queue.
For each level, process all nodes currently in the queue.

</details>

<details>
<summary>Hint 2 - Level Separation</summary>

To separate levels, record the size of the queue at the start of each level.
Process exactly that many nodes before moving to the next level.

</details>

<details>
<summary>Hint 3 - Recursive Approach</summary>

You can also solve this recursively by passing the level number.
Create a new list when you encounter a new level for the first time.

</details>

## Approach

### BFS with Queue (Iterative)
- **Time Complexity**: O(n) where n is the number of nodes
- **Space Complexity**: O(w) where w is the maximum width of the tree

Algorithm:
1. Initialize a queue with the root node
2. While queue is not empty:
   - Get the current level size (number of nodes in queue)
   - Create a list for current level
   - For each node in current level:
     - Dequeue and add its value to current level list
     - Enqueue its children (if any)
   - Add current level list to result

### DFS Recursive Approach
- **Time Complexity**: O(n)
- **Space Complexity**: O(h) for recursion stack, plus O(n) for result

Algorithm:
1. Use a helper function with level parameter
2. If level equals result size, create new level list
3. Add current node's value to its level's list
4. Recurse for children with level + 1
