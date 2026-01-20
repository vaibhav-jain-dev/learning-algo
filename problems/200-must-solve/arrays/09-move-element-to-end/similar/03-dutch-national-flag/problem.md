# Dutch National Flag (3-Way Partition)

**Difficulty:** Hard

## Problem Statement

Given an array of integers and a pivot value, partition the array into three sections:
1. All elements **less than** the pivot
2. All elements **equal to** the pivot
3. All elements **greater than** the pivot

This is known as the "Dutch National Flag" problem, named after the Dutch flag which has three horizontal stripes.

## Examples

**Example 1:**
```
Input: array = [2, 0, 1, 2, 1, 0], pivot = 1
Output: [0, 0, 1, 1, 2, 2]
```

**Example 2:**
```
Input: array = [1, 4, 2, 5, 3, 6], pivot = 3
Output: [1, 2, 3, 4, 5, 6] (or [2, 1, 3, 6, 5, 4])
```

**Example 3:**
```
Input: array = [3, 3, 3, 3], pivot = 3
Output: [3, 3, 3, 3]
```

## Constraints

- Array can contain duplicates
- Pivot may or may not exist in the array
- Must be done in-place with O(1) extra space
- Order within each section doesn't matter

---

## Thought Process & Pattern Recognition

### Step 1: Why Three Pointers?

Two-pointer partition only handles **two** categories. We need **three**:
- Less than pivot
- Equal to pivot
- Greater than pivot

### Step 2: The Three-Pointer Technique

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Key Insight:</strong> Use three pointers to maintain three regions<br>
- <code>low</code>: boundary for "less than" section (everything before is < pivot)<br>
- <code>mid</code>: current element being examined<br>
- <code>high</code>: boundary for "greater than" section (everything after is > pivot)
</div>

### Step 3: The Invariants

At any point during execution:
- `array[0...low-1]` contains elements < pivot
- `array[low...mid-1]` contains elements == pivot
- `array[mid...high]` contains unprocessed elements
- `array[high+1...n-1]` contains elements > pivot

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>array = [2, 0, 1, 2, 1, 0]</code><br>
<code>pivot = 1</code>
</div>

### Region Legend

<div style="display: flex; gap: 15px; margin: 15px 0; flex-wrap: wrap;">
<span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 5px;">Green: < pivot</span>
<span style="background: #ffc107; color: black; padding: 5px 10px; border-radius: 5px;">Yellow: == pivot</span>
<span style="background: #dc3545; color: white; padding: 5px 10px; border-radius: 5px;">Red: > pivot</span>
<span style="background: #6c757d; color: white; padding: 5px 10px; border-radius: 5px;">Gray: unprocessed</span>
</div>

### Step-by-Step Execution

**Initial State:** low=0, mid=0, high=5

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">2 (L,M)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #17a2b8; color: white; padding: 8px 15px; border-radius: 5px;">0 (H)</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
arr[mid]=2 > pivot(1): Swap with high, decrement high
</div>

---

**Step 1:** After swap(mid, high), high--

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">0 (L,M)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #17a2b8; color: white; padding: 8px 15px; border-radius: 5px;">1 (H)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
arr[mid]=0 < pivot(1): Swap with low, increment both low and mid
</div>

---

**Step 2:** After swap(low, mid), low++, mid++

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">0 (L,M)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #17a2b8; color: white; padding: 8px 15px; border-radius: 5px;">1 (H)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
arr[mid]=0 < pivot(1): Swap with low, increment both
</div>

---

**Step 3:** After swap, low++, mid++

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">1 (L,M)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #17a2b8; color: white; padding: 8px 15px; border-radius: 5px;">1 (H)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
arr[mid]=1 == pivot(1): Just increment mid
</div>

---

**Step 4:** mid++

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">1 (L)</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">2 (M)</span>
<span style="background: #17a2b8; color: white; padding: 8px 15px; border-radius: 5px;">1 (H)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
arr[mid]=2 > pivot(1): Swap with high, decrement high
</div>

---

**Step 5:** After swap(mid, high), high--

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">1 (L)</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">1 (M,H)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
arr[mid]=1 == pivot(1): Just increment mid
</div>

---

**Step 6:** mid++ -> mid > high, DONE!

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">0</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
</div>

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: [0, 0, 1, 1, 2, 2]</strong><br>
Three regions: {0,0} < 1 | {1,1} == 1 | {2,2} > 1
</div>

---

## Algorithm Decision Table

<table style="border-collapse: collapse; margin: 20px 0; width: 100%;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">Condition</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Action</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Pointer Updates</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;"><code>arr[mid] < pivot</code></td>
<td style="border: 1px solid #dee2e6; padding: 10px;">swap(arr[low], arr[mid])</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">low++, mid++</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;"><code>arr[mid] == pivot</code></td>
<td style="border: 1px solid #dee2e6; padding: 10px;">nothing</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">mid++</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;"><code>arr[mid] > pivot</code></td>
<td style="border: 1px solid #dee2e6; padding: 10px;">swap(arr[mid], arr[high])</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">high-- (mid stays!)</td>
</tr>
</table>

<div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Important:</strong> When swapping with high, don't increment mid! The swapped element hasn't been examined yet.
</div>

---

## Solution Approaches

### Approach 1: Three-Pointer (Dutch National Flag)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single pass through array
- In-place, constant extra space
- Handles all three categories elegantly

### Approach 2: Two-Pass Partition

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**How it works:**
1. First pass: partition into {< pivot} and {>= pivot}
2. Second pass: partition {>= pivot} into {== pivot} and {> pivot}

---

## Complexity Comparison

| Approach | Time | Space | Passes |
|----------|------|-------|--------|
| Three-Pointer (DNF) | O(n) | O(1) | 1 |
| Two-Pass Partition | O(n) | O(1) | 2 |
| Count Sort Style | O(n) | O(1) | 2 |
