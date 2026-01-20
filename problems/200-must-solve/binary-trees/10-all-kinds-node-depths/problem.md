<div id="viz-config" style="display:none">
{"name":"All Kinds of Node Depths","algorithm":"tree-dfs","complexity":{"time":"O(n)","space":"O(h)"},"examples":[{"input":{"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},"output":26,"inputRaw":"tree = {1,2,3,4,5,6,7,8,9}","outputRaw":"26"}]}
</div>

# All Kinds of Node Depths

**Difficulty:** Hard (Red)

## Problem Statement

Write a function that takes in a Binary Tree and returns the sum of all the depths of all nodes in the tree, considering each node as a potential root.

More formally, for every node in the tree, calculate the sum of its depths (treating that node as a root), and return the sum of all these values.

This is different from the standard "sum of node depths" problem where you only consider depths from the actual root.

## Examples

**Example:**
```
Input:
        1
      /   \
     2     3
    / \   / \
   4   5 6   7
  / \
 8   9

Output: 26
Explanation:
From root 1: depths are 0+1+1+2+2+2+2+3+3 = 16
From node 2: depths of subtree are 0+1+1+2+2 = 6
From node 3: depths of subtree are 0+1+1 = 2
From node 4: depths are 0+1+1 = 2
... and so on for all nodes

Sum = 16 + 6 + 2 + 2 + 0 + 0 + 0 + 0 + 0 = 26

Wait, let's recalculate properly:
The answer counts, for each pair of nodes (ancestor, descendant),
the distance between them. This equals 26 for this tree.
```

## Constraints

- The tree is a standard binary tree
- An empty tree returns 0
- A single node returns 0

## Hints

<details>
<summary>Hint 1</summary>
Think about how many times each edge is counted. An edge at depth d contributes to the depth calculations of all nodes above it.
</details>

<details>
<summary>Hint 2</summary>
For each node, track both its depth from root and the size of its subtree. This information helps calculate contributions efficiently.
</details>

## Approach

1. First pass: Calculate standard node depths sum from root
2. For each node, its depth from root contributes to ancestor subtree sums
3. Track subtree sizes to calculate how many times each depth is added
4. Use the formula: For each node at depth d with subtree size s, it contributes d * s to depths from ancestors
5. Alternatively: Sum over all pairs (ancestor, descendant) their distance

**Time Complexity:** O(n) with optimized approach
**Space Complexity:** O(h) where h is the height of the tree

---

## Similar Problems (Harder)

### 1. Sum of Distances in Tree
**Difficulty:** Hard

Given an undirected tree, return an array where answer[i] is the sum of distances between node i and all other nodes.

### 2. Count Nodes Equal to Sum of Descendants
**Difficulty:** Medium

Count nodes where the node's value equals the sum of all values in its subtree.

### 3. Maximum Sum BST in Binary Tree
**Difficulty:** Hard

Find the maximum sum of all keys of any subtree which is also a BST.
