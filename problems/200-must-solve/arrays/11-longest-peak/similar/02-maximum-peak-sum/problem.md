# Maximum Peak Sum

**Difficulty:** Hard

## Problem Statement

Given an array of integers, find the peak with the maximum sum of elements. A peak consists of strictly increasing elements to a tip, then strictly decreasing. Return the sum of that peak.

## Examples

**Example 1:**
```
Input: array = [1, 10, 2, 100, 50, 1]
Output: 153
Explanation: Peak [2, 100, 50, 1] has sum 153
```

**Example 2:**
```
Input: array = [1, 3, 2]
Output: 6
Explanation: Peak [1, 3, 2] has sum 6
```

## Constraints

- Array length >= 3 for valid peak
- Return 0 if no peak exists

---

## Visual Diagram: How It Works

### Input: [1, 10, 2, 100, 50, 1]

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: flex-end;">
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">10 (peak tip)</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">100 (peak tip)</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">50</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Peak 1:</strong> [1, 10, 2] = 13<br>
<strong>Peak 2:</strong> [2, 100, 50, 1] = 153 (maximum)
</div>

### Algorithm

1. Find all tips (elements > both neighbors)
2. For each tip, expand left while increasing, right while decreasing
3. Calculate sum of peak elements
4. Track maximum sum

---

## Solution Approaches

### Approach 1: Expand from Tips

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |
