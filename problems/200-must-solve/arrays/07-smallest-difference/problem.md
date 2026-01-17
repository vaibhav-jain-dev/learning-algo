# Smallest Difference

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in two non-empty arrays of integers, finds the pair of numbers (one from each array) whose absolute difference is closest to zero, and returns an array containing these two numbers, with the number from the first array in the first position.

Note that the absolute difference of two integers is the distance between them on the real number line.

## Examples

**Example 1:**
```
Input: arrayOne = [-1, 5, 10, 20, 28, 3], arrayTwo = [26, 134, 135, 15, 17]
Output: [28, 26]
Explanation: |28 - 26| = 2, which is the smallest difference
```

**Example 2:**
```
Input: arrayOne = [10, 1000], arrayTwo = [1001, 11]
Output: [1000, 1001]
Explanation: |1000 - 1001| = 1
```

## Constraints

- Both arrays are non-empty
- Arrays can have different lengths
- Each array can have positive and negative integers

## Hints

<details>
<summary>Hint 1</summary>
Sort both arrays first. This allows you to efficiently compare elements.
</details>

<details>
<summary>Hint 2</summary>
Use two pointers, one for each array. Compare the elements and move the pointer pointing to the smaller element.
</details>

<details>
<summary>Hint 3</summary>
If the elements are equal, you've found a difference of 0, which is optimal. Otherwise, track the smallest difference found.
</details>

## Approach

### Sort + Two Pointers
1. Sort both arrays
2. Initialize pointers i=0, j=0 and track smallest difference
3. While both pointers are valid:
   - Calculate difference between current elements
   - Update smallest if this is better
   - If elements are equal, return them (difference = 0)
   - Move the pointer pointing to smaller element
4. Return the pair with smallest difference

**Time Complexity:** O(n log n + m log m) for sorting
**Space Complexity:** O(1) excluding sort space

---

## Similar Problems (Harder)

### 1. K Smallest Differences
**Difficulty:** Medium

Find the K pairs with smallest absolute differences between two arrays.

```
Input: arr1 = [1, 3, 5], arr2 = [2, 4], k = 3
Output: [[1,2], [3,2], [3,4]] (differences: 1, 1, 1)
```

### 2. Smallest Difference Triplet
**Difficulty:** Hard

Given three arrays, find one element from each such that max - min is minimized.

```
Input: arr1 = [1, 4, 5], arr2 = [10, 20], arr3 = [14, 19]
Output: [5, 10, 14] (max-min = 14-5 = 9)
```

### 3. Closest Sum to Target
**Difficulty:** Hard

Find one number from each of two arrays such that their sum is closest to a target.

```
Input: arr1 = [1, 3, 5], arr2 = [2, 4, 6], target = 8
Output: [3, 4] or [5, 2] (sum = 7, closest to 8)
```
