# Validate Subsequence

**Difficulty:** Easy (Green)

## Problem Statement

Given two non-empty arrays of integers, write a function that determines whether the second array is a subsequence of the first one.

A subsequence of an array is a set of numbers that aren't necessarily adjacent in the array but that are in the same order as they appear in the array. For instance, the numbers `[1, 3, 4]` form a subsequence of the array `[1, 2, 3, 4]`, and so do the numbers `[2, 4]`. Note that a single number in an array and the array itself are both valid subsequences of the array.

## Examples

**Example 1:**
```
Input: array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [1, 6, -1, 10]
Output: true
```

**Example 2:**
```
Input: array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [5, 1, 22, 25, 6, -1, 8, 10]
Output: true
```

**Example 3:**
```
Input: array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [5, 1, 22, 6, -1, 8, 10]
Output: true
```

**Example 4:**
```
Input: array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [1, 6, 10, -1]
Output: false (order matters!)
```

## Constraints

- Both arrays are non-empty
- The arrays can contain positive and negative integers
- Array length >= 1

## Hints

<details>
<summary>Hint 1</summary>
You can solve this problem by iterating through the main array.
</details>

<details>
<summary>Hint 2</summary>
Use a pointer to track your position in the sequence array. Whenever you find a number in the main array that matches the number at the pointer position, move the pointer forward.
</details>

<details>
<summary>Hint 3</summary>
The sequence is valid if you reach the end of the sequence array (pointer equals sequence length).
</details>

## Approach

### Two-Pointer Technique
1. Initialize a pointer `seqIdx` at 0 for the sequence array
2. Iterate through each element in the main array
3. If current element matches `sequence[seqIdx]`, increment `seqIdx`
4. If `seqIdx` equals the length of sequence, return `true`
5. After iterating, check if `seqIdx` equals sequence length

**Time Complexity:** O(n) where n is the length of the main array
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Longest Common Subsequence Length
**Difficulty:** Medium

Find the length of the longest common subsequence between two arrays.

```
Input: arr1 = [1, 4, 2, 5, 3], arr2 = [2, 4, 1, 3]
Output: 2 (subsequence [4, 3] or [1, 3])
```

### 2. Count Distinct Subsequences
**Difficulty:** Hard

Given an array and a sequence, count how many distinct ways the sequence appears as a subsequence in the array.

```
Input: array = [1, 1, 2, 1], sequence = [1, 1]
Output: 3 (positions (0,1), (0,3), (1,3))
```

### 3. Minimum Window Subsequence
**Difficulty:** Hard

Given arrays S and T, find the minimum contiguous substring of S that contains T as a subsequence.

```
Input: S = [1, 2, 3, 4, 2, 5], T = [2, 5]
Output: [2, 5] (length 2, starting at index 4)
```
