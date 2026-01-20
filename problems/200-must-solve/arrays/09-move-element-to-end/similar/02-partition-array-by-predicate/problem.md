# Partition Array by Predicate

**Difficulty:** Medium

## Problem Statement

Given an array of integers and a predicate function, rearrange the array so that all elements satisfying the predicate come before all elements that don't satisfy it.

Return the partitioned array. The relative order within each partition does not need to be preserved.

## Examples

**Example 1:**
```
Input: array = [1, 4, 2, 5, 3, 6], predicate = isEven
Output: [6, 4, 2, 5, 3, 1] (or any arrangement with evens first)
```

**Example 2:**
```
Input: array = [3, 1, 4, 1, 5, 9, 2, 6], predicate = x > 3
Output: [6, 9, 4, 5, 1, 1, 2, 3] (elements > 3 first)
```

**Example 3:**
```
Input: array = [1, 2, 3, 4, 5], predicate = isOdd
Output: [5, 3, 1, 2, 4] (odds first)
```

## Constraints

- Array can be empty
- Predicate is a function that takes an integer and returns boolean
- Must modify array in place

---

## Thought Process & Pattern Recognition

### Step 1: Understanding the Problem

This is a **generalization** of "Move Element to End":
- Instead of moving a specific value, we move elements based on a condition
- Elements satisfying predicate go to front
- Elements not satisfying go to back

### Step 2: The Two-Pointer Partition Pattern

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Key Insight:</strong> Use two pointers converging from opposite ends<br>
- Left pointer: finds elements that DON'T satisfy predicate<br>
- Right pointer: finds elements that DO satisfy predicate<br>
- Swap and continue
</div>

### Step 3: Connection to QuickSort

This is the exact **partition step** used in QuickSort!
- QuickSort partitions around a pivot value
- Here we partition around a predicate condition

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>array = [1, 4, 2, 5, 3, 6]</code><br>
<code>predicate = isEven (x % 2 == 0)</code>
</div>

### Step-by-Step Execution

**Step 1:** Initialize pointers

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">1 (L)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">6 (R)</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
L points to 1 (odd - doesn't satisfy)<br>
R points to 6 (even - satisfies)<br>
<strong>Swap!</strong>
</div>

---

**Step 2:** After swap, move pointers

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">4 (L)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">3 (R)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
L points to 4 (even - satisfies) - Move L right<br>
R points to 3 (odd - doesn't satisfy) - Move R left... but wait, R found non-satisfying!
</div>

---

**Step 3:** L finds satisfying element, move right

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">2 (L)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">3 (R)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
L at 2 (even) - satisfies, move L right<br>
</div>

---

**Step 4:** Continue moving L

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">5 (L)</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">3 (R)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
L at 5 (odd - doesn't satisfy)<br>
R at 3 (odd - doesn't satisfy) - Move R left
</div>

---

**Step 5:** R moves left, crosses L - DONE!

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">2 (R)</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">5 (L)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
R < L - Pointers crossed, partitioning complete!
</div>

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: [6, 4, 2, 5, 3, 1]</strong><br>
All evens (6, 4, 2) before all odds (5, 3, 1)
</div>

---

## Algorithm Summary

<table style="border-collapse: collapse; margin: 20px 0; width: 100%;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">Pointer</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Looking For</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Action</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">Left</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Element NOT satisfying predicate</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">If satisfies, move right</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">Right</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">Element satisfying predicate</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">If doesn't satisfy, move left</td>
</tr>
<tr style="background: #d4edda;">
<td style="border: 1px solid #dee2e6; padding: 10px;" colspan="3"><strong>When both found wrong elements: SWAP and move both</strong></td>
</tr>
</table>

---

## Solution Approaches

### Approach 1: Two-Pointer Swap (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single pass
- In-place modification
- Minimal swaps

### Approach 2: Stable Partition (Preserves Order)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

**When to use:** Need to preserve relative order within partitions.

---

## Complexity Comparison

| Approach | Time | Space | Stable |
|----------|------|-------|--------|
| Two-Pointer Swap | O(n) | O(1) | No |
| Stable Partition | O(n) | O(n) | Yes |
| Python's sorted | O(n log n) | O(n) | Yes |
