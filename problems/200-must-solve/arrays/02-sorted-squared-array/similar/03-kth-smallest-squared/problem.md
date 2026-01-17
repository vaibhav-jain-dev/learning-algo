# K-th Smallest Squared Element

**Difficulty:** Hard (Red)

## Problem Statement

Given a sorted array of integers and an integer k, find the k-th smallest element after squaring all elements, without fully sorting the squared array.

## Examples

**Example 1:**
```
Input: array = [-4, -2, 0, 1, 3], k = 3
Output: 1
Explanation: Squared array sorted: [0, 1, 4, 9, 16], 3rd element is 1
```

**Example 2:**
```
Input: array = [-3, -1, 2, 4], k = 2
Output: 1
Explanation: Squared array sorted: [1, 4, 9, 16], 2nd element is 1
```

## Constraints

- 1 <= k <= len(array)
- Input array is sorted in ascending order
- Can contain negative integers
