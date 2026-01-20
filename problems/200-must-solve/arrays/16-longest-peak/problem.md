# Longest Peak

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in an array of integers and returns the length of the longest peak in the array.

A peak is defined as adjacent integers in the array that are strictly increasing until they reach a tip (the highest value in the peak), at which point they become strictly decreasing. At least three integers are required to form a peak.

## Examples

**Example 1:**
```
Input: array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
Output: 6 (peak: [0, 10, 6, 5, -1, -3])
```

**Example 2:**
```
Input: array = [1, 3, 2]
Output: 3
```

**Example 3:**
```
Input: array = [1, 2, 3, 4, 5]
Output: 0 (no peak, only increasing)
```

## Constraints

- Array length >= 1
- A valid peak requires at least 3 elements
- Plateau (equal adjacent elements) breaks a potential peak

## Hints

<details>
<summary>Hint 1</summary>
First identify all "tips" - elements that are strictly greater than their neighbors.
</details>

<details>
<summary>Hint 2</summary>
For each tip, expand left while strictly increasing, and expand right while strictly decreasing.
</details>

<details>
<summary>Hint 3</summary>
Track the maximum peak length found across all tips.
</details>

## Approach

### Expand from Tips
1. Iterate through array (skip first and last elements)
2. Check if current element is a tip (greater than both neighbors)
3. If tip found, expand left and right to find peak boundaries
4. Calculate peak length and update maximum
5. Skip to the end of current peak to avoid recounting

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Count Number of Peaks
**Difficulty:** Medium

Count the total number of valid peaks in the array.

```
Input: array = [1, 3, 2, 4, 1, 5, 2]
Output: 3 (peaks at indices 1, 3, 5)
```

### 2. Maximum Peak Sum
**Difficulty:** Hard

Find the peak with the maximum sum of elements.

```
Input: array = [1, 10, 2, 100, 50, 1]
Output: 151 (peak [2, 100, 50, 1])
```

### 3. Longest Bitonic Subsequence
**Difficulty:** Hard

Find the longest subsequence that first increases then decreases (not necessarily contiguous).

```
Input: array = [1, 11, 2, 10, 4, 5, 2, 1]
Output: 6 (subsequence [1, 2, 10, 4, 2, 1] or [1, 2, 5, 4, 2, 1])
```
