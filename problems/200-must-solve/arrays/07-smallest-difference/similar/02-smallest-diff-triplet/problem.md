# Smallest Difference Triplet

**Difficulty:** Hard

## Problem Statement

Given three sorted arrays, find one element from each such that (max - min) is minimized.

## Examples

**Example 1:**
```
Input: arr1 = [1, 4, 5], arr2 = [10, 20], arr3 = [14, 19]
Output: [5, 10, 14] (max-min = 14-5 = 9)
```

## Constraints

- Arrays are non-empty
- 1 <= array.length <= 10^5

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Three Pointers | O(p log p + q log q + r log r) | O(1) |
