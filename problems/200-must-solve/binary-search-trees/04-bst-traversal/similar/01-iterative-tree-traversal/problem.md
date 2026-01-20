# Iterative Tree Traversal

**Difficulty:** Medium

## Problem Statement

Implement **in-order**, **pre-order**, and **post-order** tree traversals **iteratively** using explicit stacks (without recursion).

For a binary tree, implement:
1. `inorderIterative(root)` - returns inorder traversal
2. `preorderIterative(root)` - returns preorder traversal
3. `postorderIterative(root)` - returns postorder traversal

## Examples

**Example 1:**
```
Input: root = [1, null, 2, 3]
    1
     \
      2
     /
    3

Inorder:   [1, 3, 2]
Preorder:  [1, 2, 3]
Postorder: [3, 2, 1]
```

**Example 2:**
```
Input: root = [1, 2, 3, 4, 5, null, 6]
        1
       / \
      2   3
     / \   \
    4   5   6

Inorder:   [4, 2, 5, 1, 3, 6]
Preorder:  [1, 2, 4, 5, 3, 6]
Postorder: [4, 5, 2, 6, 3, 1]
```

## Constraints

- The number of nodes in the tree is in the range `[0, 100]`
- `-100 <= Node.val <= 100`

---

## Visual Diagram: How It Works

### Input Tree

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #007bff; color: white; line-height: 45px; font-weight: bold;">1</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: right; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">2</div>
</td>
<td style="width: 40px;"></td>
<td colspan="3" style="text-align: left; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">3</div>
</td>
</tr>
<tr>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">4</div>
</td>
<td style="width: 20px;"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">5</div>
</td>
<td style="width: 40px;"></td>
<td colspan="2"></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">6</div>
</td>
</tr>
</table>
</div>

### Iterative Inorder: Left -> Node -> Right

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<p><strong>Algorithm:</strong> Push all left children, pop and process, then go right</p>
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #e9ecef;">
<th style="padding: 10px;">Step</th>
<th style="padding: 10px;">Action</th>
<th style="padding: 10px;">Stack</th>
<th style="padding: 10px;">Output</th>
</tr>
<tr>
<td style="padding: 10px;">1</td>
<td style="padding: 10px;">Push left path: 1->2->4</td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 2px 8px; border-radius: 3px;">1</span> <span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">2</span> <span style="background: #6c757d; color: white; padding: 2px 8px; border-radius: 3px;">4</span></td>
<td style="padding: 10px;">[]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">2</td>
<td style="padding: 10px;">Pop 4, output, no right</td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 2px 8px; border-radius: 3px;">1</span> <span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">2</span></td>
<td style="padding: 10px;">[<strong>4</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">3</td>
<td style="padding: 10px;">Pop 2, output, go right to 5</td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 2px 8px; border-radius: 3px;">1</span> <span style="background: #6c757d; color: white; padding: 2px 8px; border-radius: 3px;">5</span></td>
<td style="padding: 10px;">[4, <strong>2</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">4</td>
<td style="padding: 10px;">Pop 5, output, no right</td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 2px 8px; border-radius: 3px;">1</span></td>
<td style="padding: 10px;">[4, 2, <strong>5</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">5</td>
<td style="padding: 10px;">Pop 1, output, go right to 3</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">3</span></td>
<td style="padding: 10px;">[4, 2, 5, <strong>1</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">6</td>
<td style="padding: 10px;">Pop 3, push right 6</td>
<td style="padding: 10px;"><span style="background: #6c757d; color: white; padding: 2px 8px; border-radius: 3px;">6</span></td>
<td style="padding: 10px;">[4, 2, 5, 1, <strong>3</strong>]</td>
</tr>
<tr style="background: #d4edda;">
<td style="padding: 10px;">7</td>
<td style="padding: 10px;">Pop 6, output</td>
<td style="padding: 10px;">[]</td>
<td style="padding: 10px;">[4, 2, 5, 1, 3, <strong>6</strong>]</td>
</tr>
</table>
</div>

### Iterative Preorder: Node -> Left -> Right

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<p><strong>Algorithm:</strong> Process node immediately, push right then left (so left pops first)</p>
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #e9ecef;">
<th style="padding: 10px;">Step</th>
<th style="padding: 10px;">Action</th>
<th style="padding: 10px;">Stack</th>
<th style="padding: 10px;">Output</th>
</tr>
<tr>
<td style="padding: 10px;">1</td>
<td style="padding: 10px;">Push root 1</td>
<td style="padding: 10px;"><span style="background: #007bff; color: white; padding: 2px 8px; border-radius: 3px;">1</span></td>
<td style="padding: 10px;">[]</td>
</tr>
<tr style="background: #cce5ff;">
<td style="padding: 10px;">2</td>
<td style="padding: 10px;">Pop 1, output, push R(3), L(2)</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">3</span> <span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">2</span></td>
<td style="padding: 10px;">[<strong>1</strong>]</td>
</tr>
<tr style="background: #cce5ff;">
<td style="padding: 10px;">3</td>
<td style="padding: 10px;">Pop 2, output, push R(5), L(4)</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">3</span> <span style="background: #6c757d; color: white; padding: 2px 8px; border-radius: 3px;">5</span> <span style="background: #6c757d; color: white; padding: 2px 8px; border-radius: 3px;">4</span></td>
<td style="padding: 10px;">[1, <strong>2</strong>]</td>
</tr>
<tr style="background: #cce5ff;">
<td style="padding: 10px;">4</td>
<td style="padding: 10px;">Pop 4, output (no children)</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">3</span> <span style="background: #6c757d; color: white; padding: 2px 8px; border-radius: 3px;">5</span></td>
<td style="padding: 10px;">[1, 2, <strong>4</strong>]</td>
</tr>
<tr style="background: #cce5ff;">
<td style="padding: 10px;">5</td>
<td style="padding: 10px;">Pop 5, output (no children)</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px;">3</span></td>
<td style="padding: 10px;">[1, 2, 4, <strong>5</strong>]</td>
</tr>
<tr style="background: #cce5ff;">
<td style="padding: 10px;">6</td>
<td style="padding: 10px;">Pop 3, output, push R(6)</td>
<td style="padding: 10px;"><span style="background: #6c757d; color: white; padding: 2px 8px; border-radius: 3px;">6</span></td>
<td style="padding: 10px;">[1, 2, 4, 5, <strong>3</strong>]</td>
</tr>
<tr style="background: #cce5ff;">
<td style="padding: 10px;">7</td>
<td style="padding: 10px;">Pop 6, output</td>
<td style="padding: 10px;">[]</td>
<td style="padding: 10px;">[1, 2, 4, 5, 3, <strong>6</strong>]</td>
</tr>
</table>
</div>

### Iterative Postorder: Left -> Right -> Node (Tricky!)

<div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0;">
<p><strong>Strategy:</strong> Modified preorder (Node -> Right -> Left) then reverse!</p>
<p>Or use two-stack approach: Stack1 processes, Stack2 collects in reverse order</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
<tr style="background: #e9ecef;">
<th style="padding: 10px;">Method</th>
<th style="padding: 10px;">Description</th>
<th style="padding: 10px;">Space</th>
</tr>
<tr>
<td style="padding: 10px;"><strong>Two Stacks</strong></td>
<td style="padding: 10px;">Stack1: process nodes; Stack2: collect in reverse</td>
<td style="padding: 10px;">O(n)</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>One Stack + Reverse</strong></td>
<td style="padding: 10px;">Do Node->Right->Left, then reverse result</td>
<td style="padding: 10px;">O(n)</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>One Stack + Prev</strong></td>
<td style="padding: 10px;">Track previously visited node to determine direction</td>
<td style="padding: 10px;">O(h)</td>
</tr>
</table>
</div>

### Final Results

<div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 10px 0; text-align: center;">
<div style="margin: 10px 0;">
<strong>Inorder (L-N-R):</strong>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">4</span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">2</span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">5</span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">1</span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">3</span>
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">6</span>
</div>
<div style="margin: 10px 0;">
<strong>Preorder (N-L-R):</strong>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">1</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">2</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">4</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">5</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">3</span>
<span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">6</span>
</div>
<div style="margin: 10px 0;">
<strong>Postorder (L-R-N):</strong>
<span style="background: #6c757d; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">4</span>
<span style="background: #6c757d; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">5</span>
<span style="background: #6c757d; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">2</span>
<span style="background: #6c757d; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">6</span>
<span style="background: #6c757d; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">3</span>
<span style="background: #6c757d; color: white; padding: 5px 10px; border-radius: 5px; margin: 2px;">1</span>
</div>
</div>

---

## Thought Process & Pattern Recognition

### Why Learn Iterative Traversals?

1. **Interview Requirement:** Many companies explicitly ask for iterative solutions
2. **Stack Overflow Safety:** Recursion can overflow for very deep trees
3. **Understanding:** Shows deeper understanding of traversal mechanics

### Key Patterns

| Traversal | Stack Strategy | Key Insight |
|-----------|----------------|-------------|
| Inorder | Push all lefts, pop & process, go right | "Go left as far as possible" |
| Preorder | Process on push, push right then left | "Process immediately" |
| Postorder | Two stacks OR reverse modified preorder | "Children before parent" |

---

## Solution Approaches

### Complexity Analysis

| Traversal | Time | Space |
|-----------|------|-------|
| Inorder Iterative | O(n) | O(h) |
| Preorder Iterative | O(n) | O(h) |
| Postorder (2 stacks) | O(n) | O(n) |
| Postorder (1 stack) | O(n) | O(h) |

Where h = height of tree (log n for balanced, n for skewed)
