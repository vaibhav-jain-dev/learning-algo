<div id="viz-config" style="display:none">
{"name":"Recover Binary Search Tree","algorithm":"bst-repair","complexity":{"time":"O(n)","space":"O(h) with recursion, O(1) with Morris"},"examples":[{"input":{"tree":[1,3,null,null,2]},"output":[3,1,null,null,2],"inputRaw":"tree = [1,3,null,null,2] (1 and 3 swapped)","outputRaw":"[3,1,null,null,2] (recovered)"},{"input":{"tree":[3,1,4,null,null,2]},"output":[2,1,4,null,null,3],"inputRaw":"tree = [3,1,4,null,null,2] (2 and 3 swapped)","outputRaw":"[2,1,4,null,null,3] (recovered)"}]}
</div>

# Recover Binary Search Tree

**Difficulty:** Medium

## Problem Statement

You are given the root of a binary search tree (BST), where the values of **exactly two** nodes of the tree were swapped by mistake. Recover the tree without changing its structure.

## Examples

**Example 1:**
```
Input: root = [1, 3, null, null, 2]
    1
   /
  3
   \
    2

Output: [3, 1, null, null, 2]
    3
   /
  1
   \
    2

Explanation: 3 and 1 were swapped.
```

**Example 2:**
```
Input: root = [3, 1, 4, null, null, 2]
      3
     / \
    1   4
       /
      2

Output: [2, 1, 4, null, null, 3]
      2
     / \
    1   4
       /
      3

Explanation: 2 and 3 were swapped.
```

## Constraints

- The number of nodes in the tree is in the range `[2, 1000]`
- `-2^31 <= Node.val <= 2^31 - 1`
- Exactly two nodes have been swapped

---

## Visual Diagram: How It Works

### Input BST (Two nodes swapped)

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<p style="color: #666; margin-bottom: 15px;">Original tree with nodes 3 and 1 swapped:</p>
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="5" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #dc3545; color: white; line-height: 45px; font-weight: bold; border: 3px solid #a71d2a;">1</div>
<div style="font-size: 11px; color: #dc3545;">Wrong!</div>
</td>
</tr>
<tr>
<td colspan="2" style="text-align: right; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #dc3545; color: white; line-height: 45px; font-weight: bold; border: 3px solid #a71d2a;">3</div>
<div style="font-size: 11px; color: #dc3545;">Wrong!</div>
</td>
<td style="width: 40px;"></td>
<td colspan="2"></td>
</tr>
<tr>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #28a745; color: white; line-height: 40px; font-weight: bold;">2</div>
</td>
<td colspan="3"></td>
</tr>
</table>
</div>

### Step-by-Step: Finding Swapped Nodes via Inorder

**Key Insight:** In a valid BST, inorder traversal gives sorted values. Swapped nodes create inversions.

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #e9ecef;">
<th style="padding: 10px; text-align: left;">Step</th>
<th style="padding: 10px; text-align: left;">Node Visited</th>
<th style="padding: 10px; text-align: left;">Previous</th>
<th style="padding: 10px; text-align: left;">Inversion?</th>
<th style="padding: 10px; text-align: left;">Action</th>
</tr>
<tr>
<td style="padding: 10px;">1</td>
<td style="padding: 10px;"><span style="background: #dc3545; color: white; padding: 3px 10px; border-radius: 5px;">3</span></td>
<td style="padding: 10px;">None</td>
<td style="padding: 10px;">-</td>
<td style="padding: 10px;">prev = 3</td>
</tr>
<tr style="background: #fff3cd;">
<td style="padding: 10px;">2</td>
<td style="padding: 10px;"><span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px;">2</span></td>
<td style="padding: 10px;">3</td>
<td style="padding: 10px; color: #dc3545; font-weight: bold;">YES! (3 > 2)</td>
<td style="padding: 10px;">first = 3, second = 2</td>
</tr>
<tr style="background: #fff3cd;">
<td style="padding: 10px;">3</td>
<td style="padding: 10px;"><span style="background: #dc3545; color: white; padding: 3px 10px; border-radius: 5px;">1</span></td>
<td style="padding: 10px;">2</td>
<td style="padding: 10px; color: #dc3545; font-weight: bold;">YES! (2 > 1)</td>
<td style="padding: 10px;">second = 1</td>
</tr>
</table>
</div>

### Detecting the Pattern

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Two cases for swapped nodes:</strong>
<ul style="margin: 10px 0;">
<li><strong>Adjacent in inorder:</strong> One inversion - swap first.prev and first.current</li>
<li><strong>Non-adjacent:</strong> Two inversions - swap first.prev and second.current</li>
</ul>
</div>

### Result: Recovered BST

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<p style="color: #28a745; margin-bottom: 15px; font-weight: bold;">After swapping 3 and 1:</p>
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="5" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">3</div>
</td>
</tr>
<tr>
<td colspan="2" style="text-align: right; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #28a745; color: white; line-height: 40px; font-weight: bold;">1</div>
</td>
<td style="width: 40px;"></td>
<td colspan="2"></td>
</tr>
<tr>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #28a745; color: white; line-height: 40px; font-weight: bold;">2</div>
</td>
<td colspan="3"></td>
</tr>
</table>
<p style="color: #28a745; margin-top: 15px;">Inorder: [1, 2, 3] - Sorted!</p>
</div>

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I find which two nodes were swapped?"

Key observations:
- A valid BST has sorted inorder traversal
- Swapping two nodes creates one or two "inversions" in the inorder sequence
- An inversion is where `previous.val > current.val`

### Step 2: Identify the Pattern

**Pattern:** This is a "BST Property Violation Detection" problem.

Two scenarios:
1. **Adjacent swap:** `[1, 3, 2, 4]` - One inversion at (3, 2)
2. **Non-adjacent swap:** `[3, 2, 1]` for `[1, 2, 3]` - Two inversions at (3, 2) and (2, 1)

### Step 3: Choose Your Strategy

**Strategy A (O(n) space):**
- Collect all nodes via inorder
- Find inversions in the array
- Swap the values

**Strategy B (O(1) space - Morris Traversal):**
- Use Morris traversal for O(1) space
- Track previous node during traversal
- Find and fix inversions

---

## Solution Approaches

### Approach 1: Inorder with Recursion

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(h) for recursion stack |

### Approach 2: Morris Traversal (Optimal)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why Morris is optimal:**
- Threads the tree temporarily for traversal
- No additional space needed
- Tree structure preserved after recovery
