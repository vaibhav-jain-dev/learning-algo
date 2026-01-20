# Check If Array Can Become Monotonic

**Difficulty:** Medium

## Problem Statement

Given an array of integers, determine if it can become monotonic by changing **at most one** element to any value.

An array is monotonic if it is either entirely non-increasing or entirely non-decreasing.

## Examples

**Example 1:**
```
Input: array = [1, 5, 3, 4, 5]
Output: true
Explanation: Change 5 at index 1 to 2: [1, 2, 3, 4, 5]
```

**Example 2:**
```
Input: array = [1, 2, 3, 4, 5]
Output: true
Explanation: Already monotonic
```

**Example 3:**
```
Input: array = [4, 2, 3, 1]
Output: false
Explanation: Need to change more than one element
```

**Example 4:**
```
Input: array = [3, 4, 2, 3]
Output: false
Explanation: Even changing one element can't make it monotonic
```

## Constraints

- Array length >= 1
- Elements can be any integers

---

## Thought Process & Pattern Recognition

### Step 1: Understanding "Violations"

A violation occurs when the monotonic property breaks:
- For non-decreasing: `arr[i] > arr[i+1]`
- For non-increasing: `arr[i] < arr[i+1]`

### Step 2: The Key Insight

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Key Insight:</strong><br>
If we have at most ONE violation, we might be able to fix it by changing one element.<br>
But we need to verify the fix is actually possible!
</div>

### Step 3: Checking Fixability

When we find a violation at position i (arr[i] > arr[i+1] for non-decreasing):
- **Option A:** Change arr[i] to something <= arr[i+1]
  - This works if i == 0 OR arr[i-1] <= arr[i+1]
- **Option B:** Change arr[i+1] to something >= arr[i]
  - This works if i+1 == n-1 OR arr[i] <= arr[i+2]

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>array = [1, 5, 3, 4, 5]</code>
</div>

### Checking for Non-Decreasing (Can We Fix It?)

**Step 1:** Compare adjacent pairs

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
Pairs: (1,5)OK, <strong>(5,3)VIOLATION</strong>, (3,4)OK, (4,5)OK<br>
Found 1 violation at index 1
</div>

---

**Step 2:** Can we fix the violation at index 1?

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1 (i-1)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">5 (i)</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">3 (i+1)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4 (i+2)</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
</div>

<table style="border-collapse: collapse; margin: 20px 0; width: 100%;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">Option</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Change</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Condition to Check</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Result</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">A: Change arr[1]</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">5 -> 2</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">arr[0]=1 <= arr[2]=3?</td>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #d4edda;">YES! [1,2,3,4,5]</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">B: Change arr[2]</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">3 -> 5</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">arr[1]=5 <= arr[3]=4?</td>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #f8d7da;">NO! 5 > 4</td>
</tr>
</table>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Option A works!</strong> We can fix it by changing one element.
</div>

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: true</strong><br>
Can become [1, 2, 3, 4, 5] by changing index 1 from 5 to 2
</div>

---

### Failed Example: [4, 2, 3, 1]

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>For non-decreasing:</strong><br>
Violations: (4,2) at idx 0, (3,1) at idx 2 = 2 violations > 1<br>
<strong>For non-increasing:</strong><br>
Violations: (2,3) at idx 1 = 1 violation, but can we fix?<br>
Change 2->3: [4,3,3,1] - still (3,1) violation!<br>
Change 3->2: [4,2,2,1] - check arr[1]=2 >= arr[3]=1? YES but arr[0]=4 > arr[2]=2... complex
</div>

<div style="background: #f8d7da; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Output: false</strong> - Cannot fix with one change
</div>

---

## Algorithm Summary

```
For each direction (non-decreasing, non-increasing):
    1. Count violations
    2. If 0 violations: return true
    3. If 1 violation at index i:
       - Check if changing arr[i] works: need arr[i-1] <= arr[i+1] (or i==0)
       - Check if changing arr[i+1] works: need arr[i] <= arr[i+2] (or i+1==n-1)
       - If either works: return true
    4. If > 1 violation: continue to next direction

If neither direction works: return false
```

---

## Solution Approaches

### Approach 1: Check Both Directions (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single pass for each direction
- Handles edge cases cleanly
- Clear logic

### Approach 2: Try All Single Changes

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(n) |

**When to use:**
- Brute force approach for verification
- When clarity is more important than efficiency

---

## Complexity Comparison

| Approach | Time | Space | Clarity |
|----------|------|-------|---------|
| Check Both Directions | O(n) | O(1) | Medium |
| Try All Changes | O(n^2) | O(n) | High |
