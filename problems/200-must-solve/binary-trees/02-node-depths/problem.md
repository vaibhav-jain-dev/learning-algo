<div id="viz-config" style="display:none">
{"name":"Node Depths","algorithm":"tree-dfs","complexity":{"time":"O(n)","space":"O(h)"},"examples":[{"input":{"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},"output":16,"inputRaw":"tree = {1,2,3,4,5,6,7,8,9}","outputRaw":"16"}]}
</div>

# Node Depths

**Difficulty:** Easy (Green)

## Problem Statement

Given a binary tree, return the sum of all node depths. The depth of a node is defined as the distance from that node to the root of the tree. The root node has depth 0, its children have depth 1, and so on.

## Examples

**Example 1:**
```
Input:
        1
       / \
      2   3
     / \ / \
    4  5 6  7
   / \
  8   9

Output: 16

Explanation:
- Depth 0: node 1 (1 node * 0 = 0)
- Depth 1: nodes 2, 3 (2 nodes * 1 = 2)
- Depth 2: nodes 4, 5, 6, 7 (4 nodes * 2 = 8)
- Depth 3: nodes 8, 9 (2 nodes * 3 = 6)
- Total: 0 + 2 + 8 + 6 = 16
```

**Example 2:**
```
Input:
    1
   /
  2
 /
3

Output: 3

Explanation: Node at depth 0 contributes 0, depth 1 contributes 1, depth 2 contributes 2.
Total: 0 + 1 + 2 = 3
```

## Constraints

- The tree can have any number of nodes
- All node values are integers
- The tree is a valid binary tree (each node has at most 2 children)
- An empty tree should return 0

## Hints

<details>
<summary>Hint 1</summary>
Use recursion and pass the current depth to each recursive call.
</details>

<details>
<summary>Hint 2</summary>
At each node, add the current depth to the running sum, then recurse on children with depth + 1.
</details>

<details>
<summary>Hint 3</summary>
You can also solve this iteratively using a stack or queue, storing (node, depth) pairs.
</details>

## Approach

### Recursive Approach
1. Start at root with depth 0
2. For each node, add current depth to sum
3. Recursively process left and right children with depth + 1
4. Return total sum

### Iterative Approach (BFS/DFS)
1. Use a stack/queue to store (node, depth) pairs
2. Process each node, adding its depth to the sum
3. Add children with incremented depth

**Time Complexity:** O(n) where n is the number of nodes
**Space Complexity:** O(h) where h is the height of the tree (for recursion stack)

---

## Similar Problems (Harder)

### 1. All Kinds of Node Depths
**Difficulty:** Very Hard

Calculate the sum of all node depths from every node's perspective, not just the root. For each node, calculate the sum of depths of all other nodes relative to it.

### 2. Maximum Depth Sum Path
**Difficulty:** Hard

Find the path from root to leaf that maximizes the sum of node depths encountered along the way, weighted by node values.

### 3. K-Distance Nodes Sum
**Difficulty:** Hard

Given a target node, find the sum of depths of all nodes that are exactly K distance away from the target.
