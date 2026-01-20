# Move Element to End (Preserve Order)

**Difficulty:** Medium

## Problem Statement

Given an array of integers and a target value, move all instances of the target value to the end of the array while **preserving the relative order** of the non-target elements.

The function should modify the array in place and return it.

## Examples

**Example 1:**
```
Input: array = [2, 1, 2, 3, 2, 4], toMove = 2
Output: [1, 3, 4, 2, 2, 2]
Explanation: Order of 1, 3, 4 is preserved
```

**Example 2:**
```
Input: array = [1, 2, 3, 4, 5], toMove = 3
Output: [1, 2, 4, 5, 3]
```

**Example 3:**
```
Input: array = [2, 2, 2], toMove = 2
Output: [2, 2, 2]
```

## Constraints

- Array can be empty
- All elements might be the target value
- Target might not exist in the array

---

## Thought Process & Pattern Recognition

### Step 1: Why Can't We Use Simple Swapping?

The original "Move Element to End" problem uses two-pointer swapping, but that **doesn't preserve order**.

<div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Problem with Swapping:</strong><br>
Array: [2, 1, 2, 3, 2, 4], target = 2<br>
After swap approach: [4, 1, 3, 2, 2, 2] (4 moved before 1!)
</div>

### Step 2: The Write Pointer Technique

**Key Insight:** Use a "write pointer" to track where the next non-target element should go.

Think of it like:
- Reading elements left to right
- Writing non-target elements to a "clean" position
- Fill remaining positions with the target

### Step 3: The Pattern

This is the **Two-Pointer Partition** pattern where:
- One pointer reads
- One pointer writes
- Order is naturally preserved because we process left-to-right

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>array = [2, 1, 2, 3, 2, 4]</code><br>
<code>toMove = 2</code>
</div>

### Step-by-Step Execution

**Step 1:** Initialize write pointer at 0

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">2 (W,R)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
arr[0] = 2 (target) - Skip, don't write. W stays at 0.
</div>

---

**Step 2:** Read pointer moves to index 1

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">2 (W)</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">1 (R)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
arr[1] = 1 (not target) - Write to position W, then W++
</div>

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">1 (W,R)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
</div>

---

**Step 3:** R at index 2 (target = 2), skip

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">1 (W)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2 (R)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
</div>

---

**Step 4:** R at index 3 (value = 3), write it

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">1 (W)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">3 (R)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
Write 3 to position W=1, then W++
</div>

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">2 (W)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
</div>

---

**Step 5:** R at index 4 (target = 2), skip

---

**Step 6:** R at index 5 (value = 4), write it

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">2 (W)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">4 (R)</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
Write 4 to position W=2, then W++
</div>

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">3 (W)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
</div>

---

**Step 7:** Fill remaining positions with target value (2)

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
</div>

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: [1, 3, 4, 2, 2, 2]</strong><br>
Order of non-target elements preserved!
</div>

---

## Solution Approaches

### Approach 1: Write Pointer (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single pass through array
- In-place modification
- Preserves relative order

### Approach 2: Count and Rebuild

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**How it works:**
1. Count occurrences of target
2. Use write pointer for non-targets
3. Fill end with target values

---

## Complexity Comparison

| Approach | Time | Space | Preserves Order |
|----------|------|-------|-----------------|
| Write Pointer | O(n) | O(1) | Yes |
| Two-Pointer Swap | O(n) | O(1) | No |
| Extra Array | O(n) | O(n) | Yes |
