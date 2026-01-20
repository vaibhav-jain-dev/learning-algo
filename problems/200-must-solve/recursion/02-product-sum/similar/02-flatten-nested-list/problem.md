<div id="viz-config" style="display:none">
{"name":"Flatten Nested List","algorithm":"recursion-product-sum","complexity":{"time":"O(n)","space":"O(d)"},"examples":[{"input":{"array":[[1,2],[3,[4,5]],6]},"output":[1,2,3,4,5,6],"inputRaw":"[[1, 2], [3, [4, 5]], 6]","outputRaw":"[1, 2, 3, 4, 5, 6]"}]}
</div>

# Flatten Nested List

**Difficulty:** Medium

## Problem Statement

Given a nested list of integers, flatten it into a single-level list containing all the integers in the same order.

This is a common operation when working with nested data structures and demonstrates recursive traversal.

## Examples

**Example 1:**
```
Input: [[1, 2], [3, [4, 5]], 6]
Output: [1, 2, 3, 4, 5, 6]
```

**Example 2:**
```
Input: [1, [2, [3, [4, [5]]]]]
Output: [1, 2, 3, 4, 5]
```

**Example 3:**
```
Input: [[[1]], [[2]], [[3]]]
Output: [1, 2, 3]
```

**Example 4:**
```
Input: [1, 2, 3]
Output: [1, 2, 3]
Explanation: Already flat, no change needed
```

## Constraints

- The nested list can have arbitrary depth
- All leaf values are integers
- Empty arrays are valid and should be handled

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "What do I do with each element?"

For each element in the array:
- If it's an **integer**: Add it to the result
- If it's a **nested array**: Recursively flatten it and add all its elements

### Step 2: Identify the Pattern

**Key insight:** This is a classic **tree traversal** problem:
- Nested arrays form a tree structure
- Integers are the leaf nodes
- We want all leaf nodes in left-to-right order (pre-order traversal)

### Step 3: Choose the Approach

**Two main strategies:**

1. **Recursive with result accumulation:**
   - Pass result array through recursion
   - Append integers as we find them

2. **Recursive with concatenation:**
   - Each call returns a flat array
   - Concatenate results together

---

## Visual Diagram: Flattening Process

### For input: [[1, 2], [3, [4, 5]], 6]

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 20px;">
<strong>Nested Structure as Tree</strong>
</div>

<!-- Root level -->
<div style="display: flex; justify-content: center; margin: 15px 0;">
  <div style="background: #007bff; color: white; padding: 15px 25px; border-radius: 8px; text-align: center;">
    <div style="font-weight: bold;">Root Array</div>
    <div style="font-size: 12px;">[ [...], [...], 6 ]</div>
  </div>
</div>

<!-- Arrows -->
<div style="text-align: center; font-size: 20px; color: #6c757d;">/ | \</div>

<!-- Level 1 -->
<div style="display: flex; justify-content: center; gap: 30px; margin: 15px 0;">
  <div style="background: #fd7e14; color: white; padding: 12px 18px; border-radius: 8px; text-align: center;">
    <div>[1, 2]</div>
  </div>
  <div style="background: #fd7e14; color: white; padding: 12px 18px; border-radius: 8px; text-align: center;">
    <div>[3, [...]]</div>
  </div>
  <div style="background: #28a745; color: white; padding: 12px 18px; border-radius: 8px; text-align: center;">
    <div>6</div>
  </div>
</div>

<!-- Arrows for level 2 -->
<div style="display: flex; justify-content: center; gap: 80px; margin: 5px 0;">
  <div style="text-align: center; font-size: 16px; color: #6c757d;">/  \</div>
  <div style="text-align: center; font-size: 16px; color: #6c757d;">/   \</div>
</div>

<!-- Level 2 -->
<div style="display: flex; justify-content: center; gap: 15px; margin: 15px 0;">
  <div style="background: #28a745; color: white; padding: 10px 14px; border-radius: 6px;">1</div>
  <div style="background: #28a745; color: white; padding: 10px 14px; border-radius: 6px;">2</div>
  <div style="background: #28a745; color: white; padding: 10px 14px; border-radius: 6px;">3</div>
  <div style="background: #dc3545; color: white; padding: 10px 14px; border-radius: 6px;">[4, 5]</div>
</div>

<!-- Final level -->
<div style="display: flex; justify-content: center; gap: 15px; margin: 15px 0; margin-left: 60px;">
  <div style="text-align: center; font-size: 14px; color: #6c757d; margin-right: 100px;"></div>
  <div style="background: #28a745; color: white; padding: 8px 12px; border-radius: 5px;">4</div>
  <div style="background: #28a745; color: white; padding: 8px 12px; border-radius: 5px;">5</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;">
<strong>Flattened Result (Left-to-Right Order):</strong><br>
[1, 2, 3, 4, 5, 6]
</div>

</div>

### Recursive Call Trace

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>Step-by-Step Flattening</strong>
</div>

<table style="border-collapse: collapse; margin: 20px auto; font-family: monospace; font-size: 14px;">
<tr style="background: #e9ecef;">
  <th style="border: 1px solid #dee2e6; padding: 10px;">Step</th>
  <th style="border: 1px solid #dee2e6; padding: 10px;">Processing</th>
  <th style="border: 1px solid #dee2e6; padding: 10px;">Action</th>
  <th style="border: 1px solid #dee2e6; padding: 10px;">Result So Far</th>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">[1, 2]</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">Recurse, add 1, 2</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; background: #d4edda;">[1, 2]</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">[3, [4, 5]]</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">Add 3, recurse into [4, 5]</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; background: #d4edda;">[1, 2, 3]</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">[4, 5]</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">Add 4, 5</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; background: #d4edda;">[1, 2, 3, 4, 5]</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">4</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">6</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">Add 6 (integer)</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; background: #28a745; color: white; font-weight: bold;">[1, 2, 3, 4, 5, 6]</td>
</tr>
</table>

</div>

---

## Solution Approaches

### Approach 1: Recursive with Result Accumulation

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) where n = total elements |
| Space Complexity | O(d) where d = max depth |

**Why this is best:**
- In-place accumulation avoids extra memory allocations
- Single pass through all elements
- Clean recursive structure

### Approach 2: Iterative with Stack

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:** For very deeply nested structures to avoid stack overflow.

### Approach 3: Generator/Iterator Pattern

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(d) |

**When to use:** When you need lazy evaluation or streaming.

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Recursive Accumulation | O(n) | O(d) | Most cases |
| Iterative Stack | O(n) | O(n) | Deep nesting |
| Generator | O(n) | O(d) | Lazy evaluation |
