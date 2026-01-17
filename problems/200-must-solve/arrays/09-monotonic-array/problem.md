# Monotonic Array

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in an array of integers and returns a boolean representing whether the array is monotonic.

An array is said to be monotonic if its elements, from left to right, are entirely non-increasing or entirely non-decreasing.

Non-increasing elements aren't necessarily exclusively decreasing; they simply don't increase. Similarly, non-decreasing elements aren't necessarily exclusively increasing; they simply don't decrease.

Note that empty arrays and arrays of one element are monotonic.

## Examples

**Example 1:**
```
Input: array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]
Output: true (non-increasing)
```

**Example 2:**
```
Input: array = [1, 2, 3, 3, 4, 5]
Output: true (non-decreasing)
```

**Example 3:**
```
Input: array = [1, 2, 1]
Output: false
```

## Constraints

- Array can be empty (return true)
- Array can have duplicate consecutive elements
- Array contains integers (positive, negative, or zero)

## Hints

<details>
<summary>Hint 1</summary>
Check both directions: could be non-increasing OR non-decreasing.
</details>

<details>
<summary>Hint 2</summary>
Track whether we've seen an increase and whether we've seen a decrease.
</details>

<details>
<summary>Hint 3</summary>
If we've seen both an increase AND a decrease, the array is not monotonic.
</details>

## Approach

### Single Pass with Direction Tracking
1. Initialize flags: `isNonIncreasing = true`, `isNonDecreasing = true`
2. Iterate through adjacent pairs:
   - If `arr[i] > arr[i+1]`: mark `isNonDecreasing = false`
   - If `arr[i] < arr[i+1]`: mark `isNonIncreasing = false`
3. Return `isNonIncreasing OR isNonDecreasing`

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Longest Monotonic Subarray
**Difficulty:** Medium

Find the length of the longest contiguous monotonic subarray.

```
Input: array = [1, 4, 3, 2, 5, 6, 7]
Output: 4 (subarray [2, 5, 6, 7])
```

### 2. Minimum Removals for Monotonic
**Difficulty:** Hard

Find the minimum number of elements to remove to make the array monotonic.

```
Input: array = [1, 3, 2, 4, 5, 3]
Output: 2 (remove 3 and 3 to get [1, 2, 4, 5])
```

### 3. Check If Array Can Become Monotonic
**Difficulty:** Medium

Determine if the array can become monotonic by changing at most one element.

```
Input: array = [1, 5, 3, 4, 5]
Output: true (change 5 to 2: [1, 2, 3, 4, 5])
```
