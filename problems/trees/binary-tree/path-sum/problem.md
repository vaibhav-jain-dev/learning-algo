# Path Sum

## Problem Description

Given the root of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals `targetSum`.

A **leaf** is a node with no children.

## Examples

### Example 1:
```
Input: root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], targetSum = 22
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1

Output: true
Explanation: The path 5 -> 4 -> 11 -> 2 sums to 22.
```

### Example 2:
```
Input: root = [1, 2, 3], targetSum = 5
        1
       / \
      2   3

Output: false
Explanation: There are two root-to-leaf paths:
- 1 -> 2 (sum = 3)
- 1 -> 3 (sum = 4)
Neither equals 5.
```

### Example 3:
```
Input: root = [], targetSum = 0
Output: false
Explanation: Empty tree has no root-to-leaf path.
```

### Example 4:
```
Input: root = [1, 2], targetSum = 1
        1
       /
      2

Output: false
Explanation: The path 1 -> 2 sums to 3, not 1. Node 1 is not a leaf.
```

## Constraints

- The number of nodes in the tree is in the range [0, 5000]
- -1000 <= Node.val <= 1000
- -1000 <= targetSum <= 1000

## Hints

<details>
<summary>Hint 1 - Recursive Subtraction</summary>

Instead of tracking the running sum, subtract the current node's value from the target.
When you reach a leaf, check if the remaining target equals the leaf's value.

</details>

<details>
<summary>Hint 2 - Leaf Check</summary>

Remember to check that you're at a leaf node (no children).
A non-leaf node with the right sum value shouldn't count.

</details>

<details>
<summary>Hint 3 - Iterative with Stack</summary>

Use a stack storing (node, remaining_sum) pairs.
When you pop a leaf, check if remaining_sum equals node.val.

</details>

## Approach

### Recursive DFS
- **Time Complexity**: O(n) where n is the number of nodes
- **Space Complexity**: O(h) where h is the height (recursion stack)

```
hasPathSum(node, target):
    if node is null: return false
    if node is leaf: return target == node.val
    newTarget = target - node.val
    return hasPathSum(left, newTarget) OR hasPathSum(right, newTarget)
```

### Iterative DFS with Stack
- **Time Complexity**: O(n)
- **Space Complexity**: O(h)

1. Stack stores (node, remaining_sum) pairs
2. Initialize with (root, targetSum)
3. For each node:
   - Calculate new remaining = remaining - node.val
   - If leaf and remaining == 0: return true
   - Push children with new remaining
4. Return false if stack exhausts

### BFS with Queue
- **Time Complexity**: O(n)
- **Space Complexity**: O(w) where w is max width

Similar to stack approach, but processes level by level.
