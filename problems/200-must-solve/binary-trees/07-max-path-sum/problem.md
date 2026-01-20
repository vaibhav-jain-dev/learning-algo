<div id="viz-config" style="display:none">
{"name":"Max Path Sum in Binary Tree","algorithm":"tree-max-path","complexity":{"time":"O(n)","space":"O(h)"},"examples":[{"input":{"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},"output":18,"inputRaw":"tree = {1,2,3,4,5,6,7}","outputRaw":"18"},{"input":{"tree":{"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},"output":42,"inputRaw":"tree = {-10,9,20,#,#,15,7}","outputRaw":"42"}]}
</div>

# Max Path Sum in Binary Tree

**Difficulty:** Hard (Red)

## Problem Statement

Write a function that takes in a Binary Tree and returns its max path sum.

A path is a collection of connected nodes in a tree, where no node is connected to more than two other nodes. A path sum is the sum of the values of the nodes in a particular path.

The path doesn't necessarily need to pass through the root, and it can start and end at any node. The path must contain at least one node.

## Examples

**Example:**
```
Input:
        1
      /   \
     2     3
    / \   / \
   4   5 6   7

Output: 18
Explanation: The optimal path is [5, 2, 1, 3, 7] with sum = 5 + 2 + 1 + 3 + 7 = 18
```

**Example 2:**
```
Input:
       -10
       /  \
      9   20
         /  \
        15   7

Output: 42
Explanation: The optimal path is [15, 20, 7] with sum = 15 + 20 + 7 = 42
```

## Constraints

- The tree contains at least one node
- Node values can be negative
- The path must be contiguous (connected nodes)
- A single node is a valid path

## Hints

<details>
<summary>Hint 1</summary>
At each node, consider the maximum path that includes that node. This path could be: just the node, node + left path, node + right path, or left + node + right.
</details>

<details>
<summary>Hint 2</summary>
When returning from recursion, you can only return a "straight" path (either left or right, not both) since the parent can only connect to one child path.
</details>

## Approach

1. Use post-order traversal to process children before parent
2. For each node, calculate:
   - Best path ending at this node (for parent to use): max(node.value, node.value + max(left, right))
   - Best path through this node (update global max): node.value + max(0, left) + max(0, right)
3. Track the global maximum path sum
4. Return the maximum value found

**Time Complexity:** O(n) where n is the number of nodes
**Space Complexity:** O(h) where h is the height of the tree

---

## Similar Problems (Harder)

### 1. Max Path Sum with K Nodes
**Difficulty:** Hard

Find the maximum path sum where the path must contain exactly k nodes.

### 2. Max Path Sum Between Two Leaves
**Difficulty:** Hard

Find the maximum path sum between two leaf nodes (path must start and end at leaves).

### 3. Count Paths with Sum K
**Difficulty:** Hard

Count the number of paths in the tree that sum to exactly k.
