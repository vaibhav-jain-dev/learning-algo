<div id="viz-config" style="display:none">
{"name":"Merge Binary Trees","algorithm":"tree-merge","complexity":{"time":"O(min(n, m))","space":"O(min(h1, h2))"},"examples":[{"input":{"tree1":{"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}},"tree2":{"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}}},"output":{"value":3,"left":{"value":4,"left":{"value":5},"right":{"value":4}},"right":{"value":5,"right":{"value":7}}},"inputRaw":"tree1 = {1,3,2,5}, tree2 = {2,1,3,#,4,#,7}","outputRaw":"merged = {3,4,5,5,4,#,7}"}]}
</div>

# Merge Binary Trees

**Difficulty:** Easy (Green)

## Problem Statement

Write a function that takes in two Binary Trees and merges them. The merged tree should have nodes whose values are the sum of the corresponding nodes in the two input trees. If only one tree has a node at a particular position, that node's value should be used in the merged tree.

The function should modify and return the first tree, or you may create a new tree.

## Examples

**Example:**
```
Tree 1:         Tree 2:
     1               2
    / \             / \
   3   2           1   3
  /                 \   \
 5                   4   7

Merged Tree:
       3
      / \
     4   5
    / \   \
   5   4   7

Explanation:
- Root: 1 + 2 = 3
- Left child: 3 + 1 = 4
- Right child: 2 + 3 = 5
- Left-left: 5 (only in tree1)
- Left-right: 4 (only in tree2)
- Right-right: 7 (only in tree2)
```

## Constraints

- Both trees are standard binary trees
- Values are integers (can be negative)
- If both trees are null, return null
- One tree being null uses the other tree's structure

## Hints

<details>
<summary>Hint 1</summary>
Use recursion to traverse both trees simultaneously. At each position, handle three cases: both nodes exist, only one exists, neither exists.
</details>

<details>
<summary>Hint 2</summary>
You can modify tree1 in-place by updating its values and connecting nodes from tree2 when tree1 has null children.
</details>

## Approach

1. If both nodes are null, return null
2. If one node is null, return the other node
3. If both exist:
   - Add tree2's value to tree1's value (or create new node with sum)
   - Recursively merge left children
   - Recursively merge right children
4. Return the merged root

**Time Complexity:** O(min(n, m)) where n, m are tree sizes (visit every overlapping node)
**Space Complexity:** O(min(h1, h2)) for recursion stack

---

## Similar Problems (Harder)

### 1. Merge Binary Trees with Multiplication
**Difficulty:** Easy

Merge trees where overlapping nodes use product instead of sum.

### 2. Merge K Binary Trees
**Difficulty:** Medium

Merge k binary trees into one, summing all overlapping nodes.

### 3. Merge Binary Trees Preserving BST Property
**Difficulty:** Hard

Merge two BSTs into a single BST, maintaining the BST property.
