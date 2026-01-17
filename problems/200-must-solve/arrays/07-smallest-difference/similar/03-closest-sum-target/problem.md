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

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two Pointers | O(n log n + m log m) | O(1) |
| Binary Search | O(n log m) | O(1) |
