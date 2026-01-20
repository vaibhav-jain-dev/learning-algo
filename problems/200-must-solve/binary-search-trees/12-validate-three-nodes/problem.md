# Validate Three Nodes

**Difficulty:** Hard (Red)

## Problem Statement

You're given three nodes that are contained in the same Binary Search Tree: `nodeOne`, `nodeTwo`, and `nodeThree`. Write a function that returns a boolean representing whether one of `nodeOne` or `nodeThree` is an ancestor of `nodeTwo` and the other node is a descendant of `nodeTwo`. For example, if your function determines that `nodeOne` is an ancestor of `nodeTwo`, then it needs to see if `nodeThree` is a descendant of `nodeTwo`. If your function determines that `nodeThree` is an ancestor of `nodeTwo`, then it needs to see if `nodeOne` is a descendant of `nodeTwo`.

A descendant of a node `N` is defined as a node contained in the tree rooted at `N`. A node `N` is an ancestor of another node `M` if `M` is a descendant of `N`.

It isn't guaranteed that `nodeOne` or `nodeThree` will be ancestors or descendants of `nodeTwo`, but it is guaranteed that all three nodes will be unique and will never be `None`/`null`. In other words, you'll be given valid input nodes.

Each BST node has an integer `value`, a `left` child node, and a `right` child node.

## Examples

**Example 1:**
```
Input: tree =      5
                 /   \
                2     7
              /   \  /  \
             1    4 6    8
            /   /
           0   3

  nodeOne = 5
  nodeTwo = 2
  nodeThree = 3

Output: true
Explanation: 5 is an ancestor of 2, and 3 is a descendant of 2
```

**Example 2:**
```
Input: Same tree as above

  nodeOne = 5
  nodeTwo = 3
  nodeThree = 2

Output: false
Explanation: 5 is an ancestor of 3, but 2 is NOT a descendant of 3
```

**Example 3:**
```
Input: Same tree as above

  nodeOne = 1
  nodeTwo = 2
  nodeThree = 4

Output: true
Explanation: 4 is a descendant of 2, and 1 is NOT an ancestor of 2.
             BUT 1 is a descendant of 2, and 4 is NOT an ancestor of 2 either.
             Wait - let's reconsider: 1 IS a descendant of 2, and 4 IS a descendant of 2.
             Actually: We need one to be ancestor and one to be descendant.
             1 is a descendant (not ancestor) of 2. 4 is also a descendant of 2.
             So nodeOne=1 is not an ancestor of nodeTwo=2, but nodeThree=4 is also not an ancestor.
             Result: false
```

**Example 4:**
```
Input: Same tree as above

  nodeOne = 0
  nodeTwo = 1
  nodeThree = 2

Output: true
Explanation: 2 is an ancestor of 1, and 0 is a descendant of 1
```

## Constraints

- The tree will contain at least 3 nodes
- All node values are unique
- nodeOne, nodeTwo, and nodeThree are all valid nodes in the tree
- nodeOne, nodeTwo, and nodeThree are all different nodes

## Hints

<details>
<summary>Hint 1</summary>
There are two possibilities: either nodeOne is an ancestor of nodeTwo (and nodeThree is a descendant), or nodeThree is an ancestor of nodeTwo (and nodeOne is a descendant).
</details>

<details>
<summary>Hint 2</summary>
You can check if a node X is an ancestor of another node Y by traversing down from X following BST property. If you reach Y, X is an ancestor. If you reach a None node, X is not an ancestor.
</details>

<details>
<summary>Hint 3</summary>
To check if X is a descendant of Y, simply check if Y is an ancestor of X.
</details>

<details>
<summary>Hint 4</summary>
For an optimal solution, consider searching from nodeTwo simultaneously upward and downward. Actually, you can search from nodeOne and nodeThree at the same time towards nodeTwo, which can help you exit early if they cross paths or both reach nodeTwo.
</details>

<details>
<summary>Hint 5</summary>
The optimal approach: Start searching from nodeOne going towards nodeTwo, and from nodeThree going towards nodeTwo. At each step, advance one pointer. If one reaches nodeTwo, check if it came from the direction that would make it an ancestor, then verify the other relationship.
</details>

## Approach

### Approach 1: Simple Two-Pass Check
1. Check if nodeOne is an ancestor of nodeTwo
2. If yes, check if nodeThree is a descendant of nodeTwo
3. If no, check if nodeThree is an ancestor of nodeTwo
4. If yes, check if nodeOne is a descendant of nodeTwo
5. Return true if either case holds

**Time Complexity:** O(h) where h is the height of the tree
**Space Complexity:** O(1)

### Approach 2: Optimized Single-Pass Search
Search from both nodeOne and nodeThree simultaneously towards nodeTwo:
1. Start pointers at nodeOne and nodeThree
2. Move each pointer one step towards nodeTwo (using BST property)
3. If a pointer reaches nodeTwo, verify the remaining relationship
4. If pointers cross (one reaches the other), we can determine the relationship

**Time Complexity:** O(d) where d is the distance between the furthest two nodes
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Validate Three Nodes with Parent Pointers
**Difficulty:** Medium

Same problem but each node has a parent pointer. Can you solve it faster?

### 2. Count Valid Three-Node Triplets
**Difficulty:** Hard

Given a BST, count all triplets (a, b, c) where a is an ancestor of b and c is a descendant of b.

### 3. Validate K Nodes Chain
**Difficulty:** Hard

Generalize to K nodes: verify that node[0] is ancestor of node[1], node[1] is ancestor of node[2], etc.
