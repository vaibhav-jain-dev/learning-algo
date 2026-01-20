<div id="viz-config" style="display:none">
{"name":"Right Sibling Tree","algorithm":"tree-sibling","complexity":{"time":"O(n)","space":"O(w)"},"examples":[{"input":{"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}}},"output":"siblings connected at each level","inputRaw":"tree = {1,2,3,4,5,6,7,8,9,#,10,11,12}","outputRaw":"right pointers connect siblings: 2->3, 4->5->6->7, 8->9->10->11->12"}]}
</div>

# Right Sibling Tree

**Difficulty:** Medium (Yellow)

## Problem Statement

Write a function that takes in a Binary Tree, transforms it into a Right Sibling Tree, and returns its root.

A Right Sibling Tree is obtained by making every node in a Binary Tree have its `right` property point to its right sibling instead of its right child. A node's right sibling is the node immediately to its right on the same level, or None/nil if there is no node immediately to its right.

After the transformation, all nodes' `left` pointers should remain unchanged.

## Examples

**Example:**
```
Input:
        1
      /   \
     2     3
    / \   / \
   4   5 6   7
  / \   \   / \
 8   9  10 11 12

Output:
        1
      /
     2 --------> 3
    /           /
   4 --> 5 --> 6 --> 7
  /           /     /
 8 -> 9 -> 10 -> 11 -> 12

Explanation:
- 2's right now points to 3 (its sibling) instead of 5
- 4's right points to 5, 5's right points to 6, 6's right points to 7
- 8's right points to 9, and so on
```

## Constraints

- The tree is a standard binary tree
- Return the root after transformation
- Left pointers remain unchanged
- Rightmost nodes at each level point to None/nil

## Hints

<details>
<summary>Hint 1</summary>
Process the tree level by level (BFS) to connect siblings at each level.
</details>

<details>
<summary>Hint 2</summary>
You can also solve this recursively by processing the tree top-down, connecting children of adjacent nodes.
</details>

## Approach

1. Use BFS to traverse level by level
2. At each level, iterate through nodes from left to right
3. For each node:
   - Store its original right child (to process next level)
   - Set its right pointer to the next node in the level
4. Process children to build the next level
5. Return the root

**Time Complexity:** O(n) where n is the number of nodes
**Space Complexity:** O(w) where w is the maximum width of the tree

---

## Similar Problems (Harder)

### 1. Populating Next Right Pointers (Perfect Tree)
**Difficulty:** Medium

Connect each node to its right sibling in a perfect binary tree using O(1) extra space.

### 2. Populating Next Right Pointers (Any Tree)
**Difficulty:** Medium

Connect each node to its right sibling in any binary tree (not necessarily perfect).

### 3. Connect Nodes at Same Level with Constant Space
**Difficulty:** Hard

Solve the right sibling problem using only O(1) extra space (excluding recursion stack).
