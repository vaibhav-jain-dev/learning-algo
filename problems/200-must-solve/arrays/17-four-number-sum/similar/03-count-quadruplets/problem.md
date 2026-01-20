# Count Quadruplets with Sum

**Difficulty:** Hard

## Problem Statement

Count the number of quadruplets (i, j, k, l) where i < j < k < l and array[i] + array[j] + array[k] + array[l] = target. Elements with same values but different indices are counted separately.

## Examples

**Example 1:**
```
Input: array = [1, 1, 1, 1, 2, 2], target = 5
Output: 12
Explanation: Multiple combinations of indices give sum 5
```

**Example 2:**
```
Input: array = [1, 2, 3, 4], target = 10
Output: 1
Explanation: Only (1, 2, 3, 4) = 10
```

---

## Visual Diagram

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Strategy:</strong> Use hash map to count pair sums with index tracking.<br>
For each pair (k,l), count how many pairs (i,j) with i < j < k have sum = target - arr[k] - arr[l]
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(n^2) |
