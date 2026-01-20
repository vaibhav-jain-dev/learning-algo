<div id="viz-config" style="display:none">
{"name":"Range Sum of BST","algorithm":"bst-range","complexity":{"time":"O(n) worst, O(h + k) with pruning","space":"O(h)"},"examples":[{"input":{"tree":[10,5,15,3,7,null,18],"low":7,"high":15},"output":32,"inputRaw":"tree = [10,5,15,3,7,null,18], low = 7, high = 15","outputRaw":"32 (7 + 10 + 15 = 32)"},{"input":{"tree":[10,5,15,3,7,13,18,1,null,6],"low":6,"high":10},"output":23,"inputRaw":"tree = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10","outputRaw":"23 (6 + 7 + 10 = 23)"}]}
</div>

# Range Sum of BST

**Difficulty:** Easy (Green)

## Problem Statement

Given the root node of a Binary Search Tree (BST) and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].

## Examples

**Example 1:**
```
Input: root =     10
                /    \
               5      15
              / \       \
             3   7      18

       low = 7, high = 15

Output: 32

Explanation: Nodes with values 7, 10, and 15 are in the range [7, 15].
             Sum = 7 + 10 + 15 = 32
```

**Example 2:**
```
Input: root =       10
                  /    \
                 5      15
                / \    /  \
               3   7  13   18
              /   /
             1   6

       low = 6, high = 10

Output: 23

Explanation: Nodes with values 6, 7, and 10 are in the range [6, 10].
             Sum = 6 + 7 + 10 = 23
```

## Constraints

- The number of nodes in the tree is in range [1, 20000]
- 1 <= Node.val <= 100000
- 1 <= low <= high <= 100000
- All Node.val are unique

## Hints

<details>
<summary>Hint 1</summary>
Use BST properties to prune branches that cannot contain values in range.
</details>

<details>
<summary>Hint 2</summary>
If node value < low, only explore right subtree. If node value > high, only explore left subtree.
</details>

<details>
<summary>Hint 3</summary>
A simple recursive approach with pruning achieves optimal time complexity.
</details>

## Approach

### DFS with BST Pruning
1. If node is null, return 0
2. If node value < low, search only in right subtree (left has smaller values)
3. If node value > high, search only in left subtree (right has larger values)
4. Otherwise, add node value and search both subtrees

**Time Complexity:** O(n) worst case, but BST pruning often makes it O(h + k) where k is nodes in range
**Space Complexity:** O(h) for recursion stack, where h is height

---

## Similar Problems (Harder)

### 1. Count Nodes in Range
**Difficulty:** Medium

Instead of sum, count how many nodes have values in the given range.

```
Input: BST [10,5,15,3,7,13,18], low = 6, high = 15
Output: 4 (nodes: 7, 10, 13, 15)
```

### 2. Range Sum with Updates
**Difficulty:** Hard

Support both range sum queries and value updates in the BST.

```
Operations: rangeSum(5, 15) -> 32, update(7, 8), rangeSum(5, 15) -> 33
```

### 3. Range Sum of All Paths
**Difficulty:** Hard

Find the sum of all root-to-leaf paths where all nodes are within range [low, high].

```
Input: BST, low = 5, high = 15
Output: Sum of complete paths that stay within range
```
