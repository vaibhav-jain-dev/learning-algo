# K-Sum (Generalized)

**Difficulty:** Hard

## Problem Statement

Given an array of integers and integers `k` and `target`, find all unique combinations of `k` numbers that sum to `target`.

## Examples

**Example 1:**
```
Input: array = [1, 2, 3, 4, 5], k = 3, target = 9
Output: [[1, 3, 5], [2, 3, 4]]
```

**Example 2:**
```
Input: array = [1, 0, -1, 0, -2, 2], k = 4, target = 0
Output: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
```

## Constraints

- 1 <= k <= array.length
- Combinations must be unique

---

## Visual Diagram: How It Works

### Approach: Recursive Reduction to Two-Sum

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Key Insight:</strong> K-sum can be reduced recursively:<br>
- K-sum -> Fix one element, solve (K-1)-sum<br>
- Eventually reduces to 2-sum (use two pointers)
</div>

### For k=3, target=9, array=[1,2,3,4,5] (sorted)

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">Fix 1</span>
<span>-></span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">2-sum for target=8 in [2,3,4,5]</span>
<span>-></span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">[3,5] works!</span>
</div>

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">Fix 2</span>
<span>-></span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">2-sum for target=7 in [3,4,5]</span>
<span>-></span>
<span style="background: #ffc107; color: black; padding: 8px 15px; border-radius: 5px;">[3,4] works!</span>
</div>

---

## Solution Complexity

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^(k-1)) |
| Space Complexity | O(k) recursion stack |
