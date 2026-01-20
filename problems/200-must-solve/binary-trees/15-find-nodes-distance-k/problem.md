# Find Nodes Distance K

**Difficulty:** Hard (Red)

## Problem Statement

Write a function that takes in a binary tree, a target node contained in the tree, and a positive integer `k`. The function should return a list of all nodes that are exactly `k` distance away from the target node.

The distance between two nodes is defined as the number of edges that must be traversed to go from one node to the other.

The returned list can be in any order.

## Examples

**Example 1:**
```
Input:
         1
       /   \
      2     3
     / \     \
    4   5     6
       / \
      7   8

Target: 5, K: 2

Output: [1, 4]
Explanation:
- Node 1 is 2 edges away (5 -> 2 -> 1)
- Node 4 is 2 edges away (5 -> 2 -> 4)
- Note: Nodes 7 and 8 are only 1 edge away (direct children of 5)
```

**Example 2:**
```
Input:
         1
       /   \
      2     3

Target: 1, K: 1

Output: [2, 3]
Explanation: Both children are 1 edge away from root.
```

**Example 3:**
```
Input:
         1
       /   \
      2     3
     /
    4

Target: 4, K: 3

Output: [3]
Explanation: Path from 4 to 3: 4 -> 2 -> 1 -> 3 (3 edges)
```

## Constraints

- The tree will have at least 1 node
- The target node is guaranteed to exist in the tree
- k >= 0
- If k = 0, return only the target node
- All node values are unique

## Hints

<details>
<summary>Hint 1</summary>
The challenge is that we need to traverse both down (to descendants) and up (to ancestors and their other subtrees). Consider adding parent pointers or converting the tree to a graph.
</details>

<details>
<summary>Hint 2</summary>
One approach: First traverse the tree to build a parent map (node -> parent). Then use BFS starting from the target node, expanding in all directions (left, right, parent).
</details>

<details>
<summary>Hint 3</summary>
Use a visited set to avoid revisiting nodes. BFS naturally finds all nodes at distance k when you stop after k levels.
</details>

<details>
<summary>Hint 4</summary>
Alternative approach: Use DFS to find the target, then recursively search subtrees at appropriate distances while backtracking.
</details>

## Approach 1: BFS with Parent Pointers

1. Build a parent map by traversing the tree
2. Start BFS from target node
3. At each level, explore children and parent (if not visited)
4. Stop when reaching distance k
5. Return all nodes at that level

## Approach 2: DFS with Distance Tracking

1. Use DFS to locate target and find its descendants at distance k
2. While backtracking, track distance from target
3. Search the "other" subtree at each ancestor for remaining distance

**Time Complexity:** O(n) where n is the number of nodes
**Space Complexity:** O(n) for parent map and visited set

---

## Similar Problems (Harder)

### 1. All Nodes Distance K in Graph
**Difficulty:** Medium

Same problem but given a general graph instead of a tree.

### 2. Sum of Nodes at Distance K
**Difficulty:** Medium

Return the sum of values of all nodes at distance k from target.

### 3. Closest Leaf in Binary Tree
**Difficulty:** Medium

Find the closest leaf node to a given target node.
