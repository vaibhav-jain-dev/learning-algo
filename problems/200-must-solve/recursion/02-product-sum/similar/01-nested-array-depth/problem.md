<div id="viz-config" style="display:none">
{"name":"Maximum Depth of Nested Arrays","algorithm":"recursion-product-sum","complexity":{"time":"O(n)","space":"O(d)"},"examples":[{"input":{"array":[1,[2,[3,4]]]},"output":3,"inputRaw":"[1, [2, [3, 4]]]","outputRaw":"3"}]}
</div>

# Maximum Depth of Nested Arrays

**Difficulty:** Easy

## Problem Statement

Given a nested array (which can contain integers or other nested arrays), return the maximum depth of nesting.

The depth of a non-nested array is 1. An empty array has depth 1.

## Examples

**Example 1:**
```
Input: [1, [2, [3, 4]]]
Output: 3
Explanation: The innermost array [3, 4] is at depth 3
```

**Example 2:**
```
Input: [1, 2, 3]
Output: 1
Explanation: No nesting, just a flat array
```

**Example 3:**
```
Input: [[[[]]]]
Output: 4
Explanation: 4 levels of nesting (including the empty innermost array)
```

**Example 4:**
```
Input: [1, [2, 3], [4, [5]]]
Output: 3
Explanation: Maximum depth path: outer -> [4, [5]] -> [5]
```

## Constraints

- The input is always a valid array
- Arrays can be empty
- Integers can be any valid integer value

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "What defines the depth at any point?"

- Depth 1: The outermost array
- Depth 2: Any array directly inside the outermost
- Depth n: Arrays nested n-1 levels deep

### Step 2: Identify the Pattern

**Key insight:** This is a classic **tree depth** problem:
- The nested array structure forms a tree
- Each nested array is a subtree
- We want the maximum path length from root to any leaf

### Step 3: Choose the Approach

**Recursive approach:**
```
depth(array) = 1 + max(depth(child) for each nested array child)
```

If no nested arrays exist, depth contribution from children is 0.

---

## Visual Diagram: Recursion Tree

### For input: [1, [2, [3, 4]]]

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 20px;">
<strong>Nested Array as Tree Structure</strong>
</div>

<!-- Level 1 -->
<div style="display: flex; justify-content: center; margin: 15px 0;">
  <div style="background: #007bff; color: white; padding: 15px 25px; border-radius: 8px; text-align: center;">
    <div style="font-weight: bold;">[ 1, [...] ]</div>
    <div style="font-size: 12px; margin-top: 5px;">Depth 1</div>
  </div>
</div>

<!-- Arrow -->
<div style="text-align: center; font-size: 24px; color: #6c757d;">|</div>

<!-- Level 2 -->
<div style="display: flex; justify-content: center; gap: 40px; margin: 15px 0;">
  <div style="background: #28a745; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
    <div>1</div>
    <div style="font-size: 11px;">(integer)</div>
  </div>
  <div style="background: #fd7e14; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
    <div style="font-weight: bold;">[ 2, [...] ]</div>
    <div style="font-size: 11px;">Depth 2</div>
  </div>
</div>

<!-- Arrow -->
<div style="text-align: center; font-size: 24px; color: #6c757d; margin-left: 60px;">|</div>

<!-- Level 3 -->
<div style="display: flex; justify-content: center; gap: 30px; margin: 15px 0; margin-left: 60px;">
  <div style="background: #28a745; color: white; padding: 10px 16px; border-radius: 6px; text-align: center;">
    <div>2</div>
    <div style="font-size: 10px;">(integer)</div>
  </div>
  <div style="background: #dc3545; color: white; padding: 10px 16px; border-radius: 6px; text-align: center;">
    <div style="font-weight: bold;">[ 3, 4 ]</div>
    <div style="font-size: 10px;">Depth 3</div>
  </div>
</div>

<!-- Arrow -->
<div style="text-align: center; font-size: 24px; color: #6c757d; margin-left: 120px;">|</div>

<!-- Level 4 (leaves) -->
<div style="display: flex; justify-content: center; gap: 20px; margin: 15px 0; margin-left: 120px;">
  <div style="background: #28a745; color: white; padding: 8px 14px; border-radius: 5px;">3</div>
  <div style="background: #28a745; color: white; padding: 8px 14px; border-radius: 5px;">4</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-top: 20px; text-align: center;">
<strong>Maximum Depth = 3</strong>
</div>

</div>

### Recursive Call Trace

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>How recursion computes the depth:</strong>
</div>

<table style="border-collapse: collapse; margin: 20px auto; font-family: monospace;">
<tr style="background: #e9ecef;">
  <th style="border: 1px solid #dee2e6; padding: 12px;">Call</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">Input</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">Nested Arrays</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">Returns</th>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">[3, 4]</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">None</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">1</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">2</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">[2, [3, 4]]</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">[3, 4] (depth 1)</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">1 + 1 = 2</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">3</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">[1, [2, [3, 4]]]</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">[2, [3, 4]] (depth 2)</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #28a745; color: white; font-weight: bold;">1 + 2 = 3</td>
</tr>
</table>

</div>

---

## Solution Approaches

### Approach 1: Recursive DFS (Optimal)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) where n = total elements |
| Space Complexity | O(d) where d = max depth |

**Why this is best:**
- Natural fit for tree-like structure
- Clean, readable code
- Optimal time complexity

### Approach 2: Iterative with Stack

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) worst case |

**When to use:** When recursion depth might cause stack overflow.

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Recursive DFS | O(n) | O(d) | Most cases |
| Iterative Stack | O(n) | O(n) | Deep nesting |
