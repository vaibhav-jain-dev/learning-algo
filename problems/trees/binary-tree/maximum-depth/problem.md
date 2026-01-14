# Maximum Depth of Binary Tree

## Problem Description

Given the root of a binary tree, return its maximum depth.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Examples

### Example 1:
```
Input: root = [3, 9, 20, null, null, 15, 7]
        3
       / \
      9  20
        /  \
       15   7

Output: 3
Explanation: The longest path is 3 -> 20 -> 15 (or 3 -> 20 -> 7), which has 3 nodes.
```

### Example 2:
```
Input: root = [1, null, 2]
        1
         \
          2

Output: 2
```

### Example 3:
```
Input: root = []
Output: 0
```

### Example 4:
```
Input: root = [1]
Output: 1
```

## Constraints

- The number of nodes in the tree is in the range [0, 10^4]
- -100 <= Node.val <= 100

## Hints

<details>
<summary>Hint 1 - Recursive DFS</summary>

The depth of a tree is 1 + maximum of (depth of left subtree, depth of right subtree).
Base case: empty tree has depth 0.

</details>

<details>
<summary>Hint 2 - Iterative BFS</summary>

Use level-order traversal (BFS). Count the number of levels.
Each complete level iteration increases the depth by 1.

</details>

<details>
<summary>Hint 3 - Iterative DFS</summary>

Use a stack that stores (node, depth) pairs.
Track the maximum depth encountered.

</details>

## Approach

### Recursive DFS
- **Time Complexity**: O(n) where n is the number of nodes
- **Space Complexity**: O(h) where h is the height of the tree (recursion stack)

```
maxDepth(node):
    if node is null: return 0
    return 1 + max(maxDepth(left), maxDepth(right))
```

### Iterative BFS
- **Time Complexity**: O(n)
- **Space Complexity**: O(w) where w is the maximum width

1. Use a queue for level-order traversal
2. Increment depth counter after processing each level
3. Return the final depth count

### Iterative DFS with Stack
- **Time Complexity**: O(n)
- **Space Complexity**: O(h)

1. Use a stack storing (node, depth) pairs
2. For each node, update max depth if current depth is greater
3. Push children with depth + 1
