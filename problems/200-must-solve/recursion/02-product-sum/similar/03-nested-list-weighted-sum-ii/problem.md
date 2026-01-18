# Nested List Weighted Sum II

**Difficulty:** Medium

## Problem Statement

Given a nested list of integers, return the sum of all integers weighted by their depth. Unlike the regular product sum where deeper elements have higher weight, here the weight is the **inverse** - elements at the maximum depth have weight 1, and the weight increases as you go shallower.

In other words, if the maximum depth is `maxDepth`, an element at depth `d` has weight `(maxDepth - d + 1)`.

## Examples

**Example 1:**
```
Input: [[1, 1], 2, [1, 1]]
Output: 8
Explanation:
- Maximum depth is 2
- Four 1's at depth 2: weight = (2-2+1) = 1, contribution = 4 * 1 = 4
- One 2 at depth 1: weight = (2-1+1) = 2, contribution = 2 * 2 = 4
- Total = 4 + 4 = 8
```

**Example 2:**
```
Input: [1, [4, [6]]]
Output: 17
Explanation:
- Maximum depth is 3
- 1 at depth 1: weight = 3, contribution = 1 * 3 = 3
- 4 at depth 2: weight = 2, contribution = 4 * 2 = 8
- 6 at depth 3: weight = 1, contribution = 6 * 1 = 6
- Total = 3 + 8 + 6 = 17
```

**Example 3:**
```
Input: [1, 2, 3]
Output: 6
Explanation: All at depth 1 (max depth = 1), weight = 1
```

## Constraints

- The nested list is non-empty
- Elements are integers or nested lists
- Integers can be negative

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How is this different from regular product sum?"

| Product Sum | Inverse Product Sum |
|-------------|---------------------|
| Deeper = Higher weight | Deeper = Lower weight |
| Weight = depth | Weight = maxDepth - depth + 1 |
| Can compute in one pass | Need to know maxDepth first |

### Step 2: Identify the Challenge

**Key challenge:** We need to know the maximum depth BEFORE we can calculate weights!

**Two approaches:**
1. **Two-pass:** First find maxDepth, then calculate weighted sum
2. **Level-sum trick:** Sum by levels and weight afterwards

### Step 3: The Clever Level-Sum Trick

Instead of computing `depth * element`, we can:
1. Keep adding to a running `levelSum` as we go deeper
2. At each level, add `levelSum` to total
3. This naturally gives outer elements more weight!

---

## Visual Diagram: Weight Calculation

### For input: [1, [4, [6]]]

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 20px;">
<strong>Structure and Inverse Weights</strong>
</div>

<!-- Level visualization -->
<div style="display: flex; flex-direction: column; gap: 15px; align-items: center;">

<!-- Level 1 -->
<div style="display: flex; align-items: center; gap: 20px; width: 100%; justify-content: center;">
  <div style="background: #007bff; color: white; padding: 5px 15px; border-radius: 5px; width: 80px; text-align: center;">Depth 1</div>
  <div style="background: #28a745; color: white; padding: 12px 20px; border-radius: 8px;">
    <strong>1</strong>
  </div>
  <div style="color: #6c757d;">weight = 3</div>
  <div style="background: #d4edda; color: #155724; padding: 5px 15px; border-radius: 5px;">1 * 3 = 3</div>
</div>

<!-- Level 2 -->
<div style="display: flex; align-items: center; gap: 20px; width: 100%; justify-content: center;">
  <div style="background: #fd7e14; color: white; padding: 5px 15px; border-radius: 5px; width: 80px; text-align: center;">Depth 2</div>
  <div style="background: #28a745; color: white; padding: 12px 20px; border-radius: 8px;">
    <strong>4</strong>
  </div>
  <div style="color: #6c757d;">weight = 2</div>
  <div style="background: #d4edda; color: #155724; padding: 5px 15px; border-radius: 5px;">4 * 2 = 8</div>
</div>

<!-- Level 3 -->
<div style="display: flex; align-items: center; gap: 20px; width: 100%; justify-content: center;">
  <div style="background: #dc3545; color: white; padding: 5px 15px; border-radius: 5px; width: 80px; text-align: center;">Depth 3</div>
  <div style="background: #28a745; color: white; padding: 12px 20px; border-radius: 8px;">
    <strong>6</strong>
  </div>
  <div style="color: #6c757d;">weight = 1</div>
  <div style="background: #d4edda; color: #155724; padding: 5px 15px; border-radius: 5px;">6 * 1 = 6</div>
</div>

</div>

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;">
<strong>Total = 3 + 8 + 6 = 17</strong>
</div>

</div>

### The Level-Sum Trick Explained

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>BFS Level-by-Level Processing</strong>
</div>

<table style="border-collapse: collapse; margin: 20px auto; font-family: monospace;">
<tr style="background: #e9ecef;">
  <th style="border: 1px solid #dee2e6; padding: 12px;">Level</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">Elements</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">Level Sum</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">Running Total</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">Total</th>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">[1]</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">0 + 1 = 1</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">1</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">2</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">[4]</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">4</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">1 + 4 = 5</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">1 + 5 = 6</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">3</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">[6]</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">6</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">5 + 6 = 11</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #28a745; color: white; font-weight: bold;">6 + 11 = 17</td>
</tr>
</table>

<div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin-top: 15px;">
<strong>Why this works:</strong><br>
- Element "1" gets added to runningTotal at level 1, then carried through levels 2 and 3 (added 3 times total)<br>
- Element "4" gets added at level 2, carried through level 3 (added 2 times total)<br>
- Element "6" gets added at level 3 only (added 1 time total)<br>
<br>
<strong>Result:</strong> 1*3 + 4*2 + 6*1 = 17
</div>

</div>

---

## Solution Approaches

### Approach 1: BFS with Level-Sum Trick (Optimal)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**Why this is best:**
- Single pass through all elements
- No need to pre-calculate max depth
- Elegant mathematical insight

### Approach 2: Two-Pass DFS

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(d) |

**When to use:** When the code clarity is more important than the clever trick.

### Approach 3: DFS with Depth Tracking + Post-Processing

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**Alternative:** Store (value, depth) pairs, then compute after finding max depth.

---

## Complexity Comparison

| Approach | Time | Space | Passes | Best For |
|----------|------|-------|--------|----------|
| BFS Level-Sum | O(n) | O(n) | 1 | Production |
| Two-Pass DFS | O(n) | O(d) | 2 | Clarity |
| DFS + Post-Process | O(n) | O(n) | 1 + post | Flexibility |
