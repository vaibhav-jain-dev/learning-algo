# Serialize and Deserialize BST

**Difficulty:** Hard

## Problem Statement

Design an algorithm to serialize and deserialize a **binary search tree**. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a BST can be serialized to a string and this string can be deserialized to the original tree structure.

**The encoded string should be as compact as possible.**

## Examples

**Example 1:**
```
Input: root = [5, 3, 7, 2, 4, 6, 8]
          5
         / \
        3   7
       / \ / \
      2  4 6  8

Serialized: "5,3,2,4,7,6,8" (preorder)
Deserialize back to same tree structure
```

**Example 2:**
```
Input: root = []
Serialized: ""
Output: null
```

**Example 3:**
```
Input: root = [2, 1, 3]
      2
     / \
    1   3

Serialized: "2,1,3" (preorder)
```

## Constraints

- The number of nodes in the tree is in the range [0, 10^4]
- 0 <= Node.val <= 10^4
- The tree is guaranteed to be a valid BST
- All values in the BST are unique

## Follow-up

For a general binary tree, we need to use null markers. BST can avoid this - why?

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How can I uniquely reconstruct a BST without null markers?"

Key observations:
- BST has ordering property: left < root < right
- Preorder traversal: root, left subtree, right subtree
- With preorder and BST property, we can reconstruct uniquely!

### Step 2: Identify the Pattern

**Key insight:** BST property makes reconstruction possible:
- Given preorder, first element is root
- Elements less than root go to left subtree
- Elements greater than root go to right subtree
- No need for null markers (unlike general binary trees)

### Step 3: Serialization Strategy

**Serialize:** Use preorder traversal
**Deserialize:** Use bounds to determine valid placement

```
deserialize(values, min, max):
    if empty or next value outside (min, max):
        return null
    val = values.pop()
    node = TreeNode(val)
    node.left = deserialize(values, min, val)
    node.right = deserialize(values, val, max)
    return node
```

---

## Visual Diagram: How It Works

### Input BST

<div style="background: #fff; padding: 20px; border-radius: 8px; margin: 10px 0; text-align: center;">
<table style="margin: 0 auto; border-collapse: collapse;">
<tr>
<td colspan="7" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #28a745; color: white; line-height: 45px; font-weight: bold;">5</div>
</td>
</tr>
<tr>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #007bff; color: white; line-height: 45px; font-weight: bold;">3</div>
</td>
<td></td>
<td colspan="3" style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 45px; height: 45px; border-radius: 50%; background: #ffc107; color: #000; line-height: 45px; font-weight: bold;">7</div>
</td>
</tr>
<tr>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">2</div>
</td>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">4</div>
</td>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">6</div>
</td>
<td></td>
<td style="text-align: center; padding: 10px;">
<div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #6c757d; color: white; line-height: 40px; font-weight: bold;">8</div>
</td>
</tr>
</table>
</div>

### Serialization (Preorder Traversal)

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #dee2e6;">
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Step</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Visit</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Output</th>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">1</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;"><span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 3px;">5</span> (root)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">"5"</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">2</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;"><span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 3px;">3</span> (left of 5)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">"5,3"</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">3</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;"><span style="background: #6c757d; color: white; padding: 3px 8px; border-radius: 3px;">2</span> (left of 3)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">"5,3,2"</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">4</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;"><span style="background: #6c757d; color: white; padding: 3px 8px; border-radius: 3px;">4</span> (right of 3)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">"5,3,2,4"</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">5</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;"><span style="background: #ffc107; color: #000; padding: 3px 8px; border-radius: 3px;">7</span> (right of 5)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">"5,3,2,4,7"</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">6</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;"><span style="background: #6c757d; color: white; padding: 3px 8px; border-radius: 3px;">6</span> (left of 7)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">"5,3,2,4,7,6"</td>
</tr>
<tr>
<td style="padding: 10px;">7</td>
<td style="padding: 10px;"><span style="background: #6c757d; color: white; padding: 3px 8px; border-radius: 3px;">8</span> (right of 7)</td>
<td style="padding: 10px; background: #d4edda;"><strong>"5,3,2,4,7,6,8"</strong></td>
</tr>
</table>
</div>

### Deserialization with Bounds

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<p style="margin-bottom: 10px;"><strong>Input:</strong> <code>[5, 3, 2, 4, 7, 6, 8]</code> (queue)</p>

<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #dee2e6;">
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Step</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Value</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Bounds (min, max)</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Valid?</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #adb5bd;">Action</th>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">1</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">5</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">(-inf, +inf)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Yes</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Create root = 5</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">2</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">3</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">(-inf, 5)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Yes</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Left of 5</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">3</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">2</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">(-inf, 3)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Yes</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Left of 3</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">4</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">4</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">(3, 5)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Yes</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Right of 3</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">5</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">7</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">(5, +inf)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Yes</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Right of 5</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">6</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">6</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">(5, 7)</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6; background: #d4edda;">Yes</td>
<td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Left of 7</td>
</tr>
<tr>
<td style="padding: 10px;">7</td>
<td style="padding: 10px;">8</td>
<td style="padding: 10px;">(7, +inf)</td>
<td style="padding: 10px; background: #d4edda;">Yes</td>
<td style="padding: 10px;">Right of 7</td>
</tr>
</table>
</div>

### Key Insight: Why No Null Markers Needed

<div style="background: #e2e3e5; padding: 15px; border-radius: 8px; margin: 10px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #dee2e6;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #adb5bd;">Tree Type</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #adb5bd;">Serialization</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #adb5bd;">Why?</th>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6;">General Binary Tree</td>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6; background: #f8d7da;">"5,3,2,#,#,4,#,#,7,6,#,#,8,#,#"</td>
<td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Need nulls to mark structure</td>
</tr>
<tr>
<td style="padding: 12px;">BST</td>
<td style="padding: 12px; background: #d4edda;">"5,3,2,4,7,6,8"</td>
<td style="padding: 12px;">BST property determines structure</td>
</tr>
</table>
</div>

---

## Solution Approaches

### Approach 1: Preorder + Bounds

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) for both serialize and deserialize |
| Space Complexity | O(n) for the string/array |

**Why this is optimal:**
- Most compact representation
- Leverages BST property fully
- No null markers needed

### Approach 2: Level Order (BFS)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:**
- Need level-by-level structure
- May need null markers

### Approach 3: Postorder

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:**
- Alternative to preorder
- Process from end of array

---

## Complexity Comparison

| Approach | Time | Space | Compactness |
|----------|------|-------|-------------|
| Preorder + Bounds | O(n) | O(n) | Most compact |
| Level Order | O(n) | O(n) | May need nulls |
| Postorder | O(n) | O(n) | Same as preorder |
