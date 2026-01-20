<div id="viz-config" style="display:none">
{"name":"Youngest Common Ancestor","algorithm":"graph-ancestor","complexity":{"time":"O(D)","space":"O(1)"},"examples":[{"input":{"tree":"A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G","descendant1":"E","descendant2":"I"},"output":"B","inputRaw":"topAncestor=A, descendant1=E, descendant2=I","outputRaw":"B"},{"input":{"tree":"A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G","descendant1":"H","descendant2":"G"},"output":"A","inputRaw":"topAncestor=A, descendant1=H, descendant2=G","outputRaw":"A"}]}
</div>

# Youngest Common Ancestor

**Difficulty:** Medium (Yellow)

## Problem Statement

You're given three inputs, all of which are instances of an `AncestralTree` class that have an `ancestor` property pointing to their youngest ancestor. The first input is the top ancestor in an ancestral tree (i.e., the only instance that doesn't have an ancestor), and the other two inputs are descendants in the ancestral tree.

Write a function that returns the youngest common ancestor to the two descendants.

Note: A descendant is considered its own ancestor.

## Examples

**Example 1:**
```
Input:
         A
       /   \
      B     C
     / \   / \
    D   E F   G
   / \
  H   I

topAncestor = A
descendant1 = E
descendant2 = I

Output: B

Explanation: B is the youngest (lowest) node that is an ancestor of both E and I.
```

**Example 2:**
```
Input: Same tree as above
topAncestor = A
descendant1 = H
descendant2 = G

Output: A

Explanation: A is the only common ancestor of H and G.
```

## Constraints

- The ancestral tree has at least one node
- All node names are unique
- descendant1 and descendant2 are guaranteed to be in the tree
- A node is considered an ancestor of itself

## Hints

<details>
<summary>Hint 1</summary>
Calculate the depths of both descendants and bring the deeper one up to the same level as the shallower one.
</details>

<details>
<summary>Hint 2</summary>
Once both descendants are at the same depth, move them up simultaneously until they meet.
</details>

<details>
<summary>Hint 3</summary>
Alternative: Store all ancestors of one descendant in a set, then traverse ancestors of the other until you find one in the set.
</details>

## Approach

### Two-Pointer Approach (Optimal)
1. Calculate depth of both descendants from the top ancestor
2. Move the deeper node up until both are at the same level
3. Move both nodes up simultaneously until they meet
4. Return the meeting point

### Set-Based Approach
1. Traverse from descendant1 to top, storing all ancestors in a set
2. Traverse from descendant2 upward until finding an ancestor in the set
3. Return the first match

**Time Complexity:** O(D) where D is the depth of the deeper descendant
**Space Complexity:** O(1) for the two-pointer approach, O(D) for set-based

---

## Similar Problems (Harder)

### 1. LCA with K Descendants
**Difficulty:** Hard

Find the youngest common ancestor of K descendants (not just 2).

### 2. LCA with Distance Queries
**Difficulty:** Hard

Build a data structure that supports efficient LCA queries and also returns the distance between the two nodes.

### 3. LCA in Binary Tree (No Parent Pointers)
**Difficulty:** Hard

Find LCA in a binary tree where nodes don't have parent pointers, requiring a different traversal strategy.
