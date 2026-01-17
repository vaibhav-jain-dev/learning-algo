# Four Number Sum

**Difficulty:** Hard

## Problem Statement

Find all unique quadruplets in the array that sum to a target value.

## Examples

**Example 1:**
```
Input: array = [7, 6, 4, -1, 1, 2], target = 16
Output: [[7, 6, 4, -1], [7, 6, 1, 2]]
```

**Example 2:**
```
Input: array = [1, 0, -1, 0, -2, 2], target = 0
Output: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
```

## Constraints

- 4 <= array.length <= 200
- -10^9 <= array[i] <= 10^9
- Each quadruplet should be unique

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two Pointers | O(n³) | O(k) |
| HashMap Pairs | O(n²) average | O(n²) |

Where k is the number of valid quadruplets.
