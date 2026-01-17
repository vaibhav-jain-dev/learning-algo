# Sorted Squared Array

**Difficulty:** Easy (Green)

## Problem Statement

Write a function that takes in a non-empty array of integers that are sorted in ascending order and returns a new array of the same length with the squares of the original integers also sorted in ascending order.

## Examples

**Example 1:**
```
Input: array = [1, 2, 3, 5, 6, 8, 9]
Output: [1, 4, 9, 25, 36, 64, 81]
```

**Example 2:**
```
Input: array = [-5, -4, -3, -2, -1]
Output: [1, 4, 9, 16, 25]
```

**Example 3:**
```
Input: array = [-7, -3, 1, 9, 22, 30]
Output: [1, 9, 49, 81, 484, 900]
```

## Constraints

- The input array is non-empty
- The input array is sorted in ascending order
- The array can contain negative integers

## Hints

<details>
<summary>Hint 1</summary>
The tricky part is that negative numbers become positive when squared, which can change the sorting order.
</details>

<details>
<summary>Hint 2</summary>
Consider using two pointers: one at the beginning and one at the end of the array.
</details>

<details>
<summary>Hint 3</summary>
The largest squared value will always be either at the start (if negative) or at the end of the original array. Build the result array from the end.
</details>

## Approach

### Two-Pointer Technique
1. Initialize two pointers: `left` at start, `right` at end
2. Create a result array of the same size
3. Fill the result array from the end (largest values first)
4. Compare absolute values at both pointers
5. Square and place the larger absolute value at current position
6. Move the appropriate pointer inward

**Time Complexity:** O(n)
**Space Complexity:** O(n) for the output array

---

## Similar Problems (Harder)

### 1. Merge Sorted Arrays with Squares
**Difficulty:** Medium

Given two sorted arrays, square all elements and merge them into a single sorted array.

```
Input: arr1 = [-3, -1, 2], arr2 = [-2, 4]
Output: [1, 4, 4, 9, 16]
```

### 2. Sorted Cubed Array with Duplicates Removed
**Difficulty:** Medium

Square the array, sort it, and remove duplicates while maintaining sorted order.

```
Input: array = [-3, -2, -1, 1, 2, 3]
Output: [1, 4, 9] (1 and -1 both give 1, etc.)
```

### 3. K-th Smallest Squared Element
**Difficulty:** Hard

Given a sorted array, find the k-th smallest element after squaring all elements, without sorting the entire squared array.

```
Input: array = [-4, -2, 0, 1, 3], k = 3
Output: 1 (squared array sorted: [0, 1, 4, 9, 16], 3rd element is 1)
```
