# Iterative In-Order Traversal (Morris Traversal)

**Difficulty:** Very Hard (Black)

## Problem Statement

Write a function that takes in a binary tree and returns its in-order traversal as a list of values.

**The catch:** You must do this **without using recursion AND without using a stack or any other auxiliary data structure** for storing nodes. In other words, achieve O(1) space complexity (excluding the output array).

This requires implementing **Morris Traversal**, a technique that temporarily modifies the tree structure using threaded binary trees.

## What is Morris Traversal?

Morris Traversal uses the concept of **threaded binary trees** to traverse without extra space:

1. For each node, find its **inorder predecessor** (rightmost node in left subtree)
2. Create a **temporary link** from the predecessor back to the current node
3. Use this link to return to the current node after processing left subtree
4. Remove the link after processing to restore original tree structure

## Examples

**Example 1:**
```
Input:
         4
       /   \
      2     6
     / \   / \
    1   3 5   7

Output: [1, 2, 3, 4, 5, 6, 7]
```

**Example 2:**
```
Input:
         1
          \
           2
          /
         3

Output: [1, 3, 2]
```

**Example 3:**
```
Input:
    1

Output: [1]
```

## Constraints

- The function must use O(1) extra space (excluding output)
- No recursion allowed
- No stack, queue, or other data structures for storing nodes
- The tree should be restored to its original structure after traversal
- Tree can have 0 to n nodes

## Hints

<details>
<summary>Hint 1</summary>
The key insight is that in in-order traversal, after processing the left subtree, we need to return to the current node. Normally we use a stack for this, but we can instead create a temporary "thread" from the predecessor to the current node.
</details>

<details>
<summary>Hint 2</summary>
For any node, its in-order predecessor is the rightmost node in its left subtree. If we make this predecessor's right child point back to the current node, we create a path to return.
</details>

<details>
<summary>Hint 3</summary>
When we encounter a node:
- If it has no left child: process it and go right
- If it has a left child: find its predecessor
  - If predecessor's right is null: create thread, go left
  - If predecessor's right points to current: remove thread, process current, go right
</details>

<details>
<summary>Hint 4</summary>
The "thread" we create is temporary. We detect we've returned via the thread when we find a predecessor whose right child points to our current node. At that point, we break the thread to restore the tree.
</details>

## Algorithm

```
1. Initialize current = root
2. While current is not null:
   a. If current has no left child:
      - Visit current (add to result)
      - Move to right child: current = current.right
   b. Else:
      - Find inorder predecessor of current (rightmost in left subtree)
      - If predecessor.right is null:
        - Create thread: predecessor.right = current
        - Move left: current = current.left
      - Else (predecessor.right == current):
        - Remove thread: predecessor.right = null
        - Visit current (add to result)
        - Move right: current = current.right
3. Return result
```

**Time Complexity:** O(n) - each edge is traversed at most 3 times
**Space Complexity:** O(1) - excluding the output array

---

## Why This is "Very Hard"

1. **Non-intuitive approach:** Modifying tree structure during traversal is counterintuitive
2. **Thread management:** Must correctly create and remove threads
3. **Edge cases:** Empty trees, single nodes, skewed trees
4. **Proving correctness:** Understanding why O(n) time despite the nested loops

---

## Similar Problems (Easier Alternatives)

### 1. In-Order Traversal with Stack
**Difficulty:** Medium

Standard iterative approach using explicit stack - O(h) space.

### 2. Pre-Order Morris Traversal
**Difficulty:** Hard

Apply Morris technique to pre-order traversal.

### 3. Post-Order Morris Traversal
**Difficulty:** Very Hard

Apply Morris technique to post-order traversal (more complex).
