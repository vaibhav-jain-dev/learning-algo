# Subarray Sort

**Difficulty:** Hard (Red)

## Problem Statement

Write a function that takes in an array of at least two integers and returns an array of the starting and ending indices of the smallest subarray in the input array that needs to be sorted in place in order for the entire input array to be sorted (in ascending order).

If the input array is already sorted, the function should return [-1, -1].

## Examples

**Example 1:**
```
Input: array = [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]
Output: [3, 9]
Explanation: Sorting subarray from index 3 to 9 sorts the entire array
```

**Example 2:**
```
Input: array = [1, 2, 3, 4, 5]
Output: [-1, -1] (already sorted)
```

**Example 3:**
```
Input: array = [2, 1]
Output: [0, 1]
```

## Constraints

- Array has at least 2 elements
- Elements can be positive, negative, or zero

## Hints

<details>
<summary>Hint 1</summary>
Find all elements that are "out of order" - smaller than previous or larger than next.
</details>

<details>
<summary>Hint 2</summary>
Find the minimum and maximum values among out-of-order elements.
</details>

<details>
<summary>Hint 3</summary>
Find where the min value should be (left boundary) and where max should be (right boundary).
</details>

## Approach

### Find Out-of-Order Elements
1. Identify elements that are out of order (misplaced)
2. Find min and max of these out-of-order elements
3. Find the correct position for min (searching from left)
4. Find the correct position for max (searching from right)
5. These positions define the subarray boundaries

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Minimum Swaps to Sort Array
**Difficulty:** Hard

Find the minimum number of swaps needed to sort the array.

```
Input: array = [4, 3, 2, 1]
Output: 2 (swap 4↔1, then 3↔2)
```

### 2. Shortest Unsorted Continuous Subarray with K Constraint
**Difficulty:** Hard

Find shortest subarray to sort, but you can leave at most K elements unsorted.

```
Input: array = [1, 3, 2, 4, 5], k = 1
Output: [1, 2] (can leave one element)
```

### 3. Maximum Sorted Subarrays
**Difficulty:** Hard

Find the maximum number of contiguous subarrays that can be independently sorted to make the whole array sorted.

```
Input: array = [1, 0, 3, 4, 5, 7, 6, 8]
Output: 4 ([1,0], [3], [4], [5,7,6,8] can be sorted independently)
```
