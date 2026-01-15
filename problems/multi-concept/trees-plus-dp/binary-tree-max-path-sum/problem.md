# Binary Tree Maximum Path Sum

## Problem Description

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the **maximum path sum** of any **non-empty** path.

**Concepts Combined**: Tree Traversal (DFS) + Dynamic Programming (optimal substructure)

## Examples

### Example 1
```
Input: root = [1,2,3]
      1
     / \
    2   3
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with sum 2 + 1 + 3 = 6.
```

### Example 2
```
Input: root = [-10,9,20,null,null,15,7]
      -10
      /  \
     9    20
         /  \
        15   7
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with sum 15 + 20 + 7 = 42.
```

### Example 3
```
Input: root = [-3]
Output: -3
Explanation: Only one node, so the path is just [-3].
```

### Example 4
```
Input: root = [2,-1]
      2
     /
   -1
Output: 2
Explanation: Best path is just the node 2.
```

## Constraints
- The number of nodes is in the range [1, 3 * 10^4]
- -1000 <= Node.val <= 1000

## Hints

<details>
<summary>Hint 1</summary>
Think about what information you need from each subtree. For any node, what are your options?
</details>

<details>
<summary>Hint 2</summary>
At each node, you can either: extend a path from left/right child, start a new path, or form a complete path through this node.
</details>

<details>
<summary>Hint 3</summary>
Use post-order traversal. Compute max single-path sum from each child, but track global max path that could go through any node.
</details>

<details>
<summary>Hint 4</summary>
Key insight: The value returned (for parent) differs from the value considered (for global max). Return single path, consider full path.
</details>

## Approach

### Key Insight
For each node, we track two things:
1. **Max path ending at this node** (can extend to parent) = node.val + max(0, left_path, right_path)
2. **Max path through this node** (complete, cannot extend) = node.val + max(0, left_path) + max(0, right_path)

### Algorithm
```
1. DFS post-order traversal
2. For each node:
   - Get max single-path from left child
   - Get max single-path from right child
   - Calculate max path through this node (update global max)
   - Return max single-path that can extend to parent
3. Return global maximum
```

**Time Complexity**: O(n) - visit each node once
**Space Complexity**: O(h) - recursion stack, where h is tree height
