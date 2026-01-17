# Closest Sum to Target

**Difficulty:** Hard

## Problem Statement

Find one number from each of two arrays such that their sum is closest to the target.

## Examples

**Example 1:**
```
Input: arr1 = [1, 3, 5], arr2 = [2, 4, 6], target = 8
Output: [3, 4] or [5, 2] (sum = 7, diff = 1)
```

**Example 2:**
```
Input: arr1 = [-1, 3, 8], arr2 = [2, 4, 9], target = 7
Output: [-1, 8] or [3, 4] (sum = 7, diff = 0)
```

## Constraints

- Arrays are non-empty
- 1 <= array.length <= 10^5
- -10^9 <= array[i] <= 10^9

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Objective
**Question:** "How do we find two numbers (one from each array) that sum closest to target?"

This is similar to Two Sum, but instead of exact match, we want the closest sum.

### Step 2: Key Insight
**Observation:** If arrays are sorted:
- Start with smallest from arr1 and largest from arr2
- If sum < target: increase sum by moving arr1 pointer right
- If sum > target: decrease sum by moving arr2 pointer left
- Track the best pair seen so far

### Step 3: The Algorithm
1. Sort both arrays
2. Use two pointers: left on arr1, right on arr2
3. Move pointers to minimize |sum - target|

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>arr1 = [1, 3, 5]</code><br>
<code>arr2 = [2, 4, 6]</code><br>
<code>target = 8</code>
</div>

---

### Two Pointers Approach

**Step 1:** Start with smallest from arr1, largest from arr2

<div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
<div>
<strong>arr1:</strong>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">1 (L)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">5</span>
</div>
<div>
<strong>arr2:</strong>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">4</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">6 (R)</span>
</div>
</div>

<div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; margin: 10px 0;">
Sum: 1 + 6 = 7, diff from target = |7 - 8| = 1<br>
Sum < target → Move L right
</div>

---

**Step 2:** After moving L

<div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
<div>
<strong>arr1:</strong>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">1</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">3 (L)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">5</span>
</div>
<div>
<strong>arr2:</strong>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">4</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">6 (R)</span>
</div>
</div>

<div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
Sum: 3 + 6 = 9, diff from target = |9 - 8| = 1<br>
Sum > target → Move R left
</div>

---

**Step 3:** After moving R

<div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
<div>
<strong>arr1:</strong>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">1</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">3 (L)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">5</span>
</div>
<div>
<strong>arr2:</strong>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">2</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">4 (R)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">6</span>
</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin: 10px 0;">
Sum: 3 + 4 = 7, diff from target = |7 - 8| = 1<br>
Sum < target → Move L right
</div>

---

**Step 4:** Final check

<div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
<div>
<strong>arr1:</strong>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">3</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">5 (L)</span>
</div>
<div>
<strong>arr2:</strong>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">2</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">4 (R)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin: 0 5px;">6</span>
</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin: 10px 0;">
Sum: 5 + 4 = 9, diff from target = |9 - 8| = 1<br>
Best pairs with diff = 1: <strong>[1, 6], [3, 6], [3, 4], [5, 4]</strong>
</div>

---

### Decision Table

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace; width: 100%;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">Condition</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Action</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Reason</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">sum < target</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Move L right</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Need larger sum</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">sum > target</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Move R left</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Need smaller sum</td>
</tr>
<tr style="background: #d4edda;">
<td style="border: 1px solid #dee2e6; padding: 10px;">sum == target</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Return immediately</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Perfect match!</td>
</tr>
</table>

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two Pointers | O(n log n + m log m) | O(1) |
| Binary Search | O(n log m) | O(1) |
