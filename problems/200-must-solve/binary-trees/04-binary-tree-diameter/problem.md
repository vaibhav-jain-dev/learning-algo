<div id="viz-config" style="display:none">
{"name":"Binary Tree Diameter","algorithm":"tree-diameter","complexity":{"time":"O(n)","space":"O(h)"},"examples":[{"input":{"tree":{"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}}},"output":6,"inputRaw":"tree = {1,3,2,7,4,#,#,8,#,#,5,#,#,#,6}","outputRaw":"6"}]}
</div>

# Binary Tree Diameter

**Difficulty:** Medium (Yellow)

## Problem Statement

Write a function that takes in a Binary Tree and returns its diameter. The diameter of a binary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root.

The length of a path is measured by the number of edges between the two nodes (not the number of nodes).

## Examples

**Example:**
```
Input:
        1
      /   \
     3     2
    / \
   7   4
  /     \
 8       5
          \
           6

Output: 6
Explanation: The longest path is [8, 7, 3, 4, 5, 6] with 6 edges.
The path goes through nodes: 8 -> 7 -> 3 -> 4 -> 5 -> 6
```

## Constraints

- The tree is a standard binary tree
- An empty tree has a diameter of 0
- A single node has a diameter of 0
- The path doesn't need to pass through the root

## Hints

<details>
<summary>Hint 1</summary>
The diameter at any node is the sum of the heights of its left and right subtrees.
</details>

<details>
<summary>Hint 2</summary>
Use a helper function that returns the height of each subtree while also tracking the maximum diameter seen so far.
</details>

## Approach

1. For each node, calculate the longest path that passes through it
2. This path length equals left height + right height
3. Track the maximum diameter found across all nodes
4. Use post-order traversal to compute heights bottom-up
5. Return the maximum diameter found

**Time Complexity:** O(n) where n is the number of nodes
**Space Complexity:** O(h) where h is the height of the tree (recursion stack)

---

## Similar Problems (Harder)

### 1. Diameter with Weighted Edges
**Difficulty:** Medium

Find the diameter of a binary tree where each edge has a weight, maximizing the sum of edge weights.

### 2. Diameter of N-ary Tree
**Difficulty:** Medium

Find the diameter of a tree where each node can have any number of children.

### 3. Count Paths Equal to Diameter
**Difficulty:** Hard

Count how many distinct paths in the tree have length equal to the diameter.
