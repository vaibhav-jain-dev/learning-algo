# Lowest Common Ancestor of a Binary Tree

**Difficulty:** Medium

## Problem Statement

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA: "The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself)."

## Examples

**Example 1:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
```

**Example 2:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since 5 is an ancestor of 4.
```

**Example 3:**
```
Input: root = [1,2], p = 1, q = 2
Output: 1
```

## Constraints

- The number of nodes in the tree is in the range `[2, 10^5]`
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are unique
- `p != q`
- `p` and `q` exist in the tree

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "What makes a node the LCA of two nodes?"

A node is the LCA if:
1. One target is in left subtree and the other is in right subtree, OR
2. The node itself is one of the targets and the other is in a subtree

### Step 2: Identify the Pattern

**Key insight:** This is a **Recursive Tree Traversal** problem because:
- We need to search both subtrees
- LCA is where the paths to p and q diverge
- Post-order traversal lets us combine information from children

### Step 3: Define the Algorithm

```
LCA(node):
    If node is null or equals p or q: return node
    left = LCA(left child)
    right = LCA(right child)
    If both left and right are non-null: return node (this is LCA!)
    Return whichever is non-null (or null if both null)
```

---

## Visual Diagram: How It Works

### Example Tree Structure

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Tree: root = [3,5,1,6,2,0,8,null,null,7,4]</strong>
<div style="text-align: center; margin: 20px 0;">

<div style="margin: 10px 0;">
  <span style="background: #28a745; color: white; padding: 15px 20px; border-radius: 50%; font-weight: bold;">3</span>
  <span style="color: #28a745; font-size: 12px;"> LCA of 5 and 1</span>
</div>

<div style="display: flex; justify-content: center; margin: 5px 0;">
  <span style="color: #666;">/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \</span>
</div>

<div style="display: flex; justify-content: center; gap: 80px; margin: 10px 0;">
  <div>
    <span style="background: #007bff; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">5</span>
    <span style="color: #007bff; font-size: 12px;"> p</span>
  </div>
  <div>
    <span style="background: #dc3545; color: white; padding: 12px 16px; border-radius: 50%; font-weight: bold;">1</span>
    <span style="color: #dc3545; font-size: 12px;"> q</span>
  </div>
</div>

<div style="display: flex; justify-content: center; gap: 40px; margin: 5px 0;">
  <span style="color: #666;">/ &nbsp;&nbsp; \</span>
  <span style="color: #666;">/ &nbsp;&nbsp; \</span>
</div>

<div style="display: flex; justify-content: center; gap: 25px; margin: 10px 0;">
  <span style="background: #6c757d; color: white; padding: 10px 14px; border-radius: 50%; font-weight: bold;">6</span>
  <span style="background: #6c757d; color: white; padding: 10px 14px; border-radius: 50%; font-weight: bold;">2</span>
  <span style="background: #6c757d; color: white; padding: 10px 14px; border-radius: 50%; font-weight: bold;">0</span>
  <span style="background: #6c757d; color: white; padding: 10px 14px; border-radius: 50%; font-weight: bold;">8</span>
</div>

<div style="display: flex; justify-content: center; gap: 20px; margin: 5px 0; padding-left: 25px;">
  <span style="width: 30px;"></span>
  <span style="color: #666;">/ &nbsp; \</span>
</div>

<div style="display: flex; justify-content: center; gap: 15px; margin: 10px 0; padding-left: 25px;">
  <span style="width: 30px;"></span>
  <span style="background: #6c757d; color: white; padding: 8px 12px; border-radius: 50%; font-weight: bold;">7</span>
  <span style="background: #6c757d; color: white; padding: 8px 12px; border-radius: 50%; font-weight: bold;">4</span>
</div>

</div>
</div>

### Recursive LCA Finding Process

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Finding LCA of p=5 and q=1:</strong>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">
<strong>Step 1:</strong> At node 3, recurse to left (5) and right (1)
<div style="display: flex; align-items: center; gap: 20px; margin: 10px 0;">
  <span style="background: #ffc107; color: black; padding: 10px; border-radius: 50%;">3</span>
  <span>&#8594; Check left subtree (5), Check right subtree (1)</span>
</div>
</div>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">
<strong>Step 2:</strong> Left subtree returns node 5 (found p!)
<div style="display: flex; align-items: center; gap: 20px; margin: 10px 0;">
  <span style="background: #007bff; color: white; padding: 10px; border-radius: 50%;">5</span>
  <span>= p, return 5 immediately</span>
</div>
</div>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">
<strong>Step 3:</strong> Right subtree returns node 1 (found q!)
<div style="display: flex; align-items: center; gap: 20px; margin: 10px 0;">
  <span style="background: #dc3545; color: white; padding: 10px; border-radius: 50%;">1</span>
  <span>= q, return 1 immediately</span>
</div>
</div>

<div style="background: #d4edda; padding: 15px; border-radius: 4px; margin: 10px 0;">
<strong>Step 4:</strong> At node 3: left != null AND right != null
<div style="display: flex; align-items: center; gap: 20px; margin: 10px 0;">
  <span style="background: #28a745; color: white; padding: 10px; border-radius: 50%;">3</span>
  <span style="font-weight: bold;">Both children returned non-null -> Node 3 is the LCA!</span>
</div>
</div>
</div>

### Visual: When Node is Its Own Ancestor

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Finding LCA of p=5 and q=4:</strong>

<div style="display: flex; align-items: flex-start; gap: 30px; margin: 15px 0;">
<div style="text-align: center;">
  <div style="background: #28a745; color: white; padding: 15px; border-radius: 50%; font-weight: bold; display: inline-block;">5</div>
  <div style="color: #28a745; font-weight: bold; margin-top: 5px;">LCA</div>
  <div style="color: #666; font-size: 12px;">p=5 is ancestor of q=4</div>
</div>

<div style="color: #666; font-size: 30px; margin-top: 10px;">\</div>

<div style="text-align: center; margin-top: 30px;">
  <span style="background: #6c757d; color: white; padding: 10px 14px; border-radius: 50%; font-weight: bold;">2</span>
</div>

<div style="color: #666; font-size: 30px; margin-top: 30px;">\</div>

<div style="text-align: center; margin-top: 60px;">
  <span style="background: #dc3545; color: white; padding: 10px 14px; border-radius: 50%; font-weight: bold;">4</span>
  <div style="color: #dc3545; font-size: 12px;">q</div>
</div>
</div>

<div style="background: #fff3cd; padding: 10px; border-radius: 4px;">
When we reach node 5 (which is p), we return it immediately.
Node 5 is the LCA because q=4 is in its subtree.
</div>
</div>

---

## Solution Approaches

### Approach 1: Recursive DFS

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(h) where h is tree height |

**Why this is optimal:**
- Single traversal visits each node at most once
- Returns early when both nodes found
- Elegant recursive structure

### Approach 2: Parent Pointers

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**Alternative approach:**
- Store parent of each node
- Build ancestor set for p
- Walk up from q until hitting p's ancestor set

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Recursive DFS | O(n) | O(h) | Simple and clean |
| Parent Pointers | O(n) | O(n) | Multiple LCA queries |
| Binary Lifting | O(n log n) | O(n log n) | Many queries |

---

## Related Problems

- Youngest Common Ancestor (main problem)
- LCA of BST (simpler with BST property)
- LCA with Parent Pointers
