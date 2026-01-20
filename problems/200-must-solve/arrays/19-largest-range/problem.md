# Largest Range

**Difficulty:** Hard (Red)

## Problem Statement

Write a function that takes in an array of integers and returns an array of length 2 representing the largest range of integers contained in that array.

The first number in the output array should be the first (smallest) number in the range, while the second number should be the last (largest) number in the range.

A range of numbers is defined as a set of numbers that come right after each other in the set of real integers. For instance, the output array [2, 6] represents the range {2, 3, 4, 5, 6}, which is a range of length 5.

Note that numbers in the array don't need to be sorted or adjacent; they just need to form a contiguous range when considered together.

## Examples

**Example 1:**
```
Input: array = [1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6]
Output: [0, 7]
Explanation: Range {0, 1, 2, 3, 4, 5, 6, 7} has length 8
```

**Example 2:**
```
Input: array = [4, 2, 1, 3]
Output: [1, 4]
```

**Example 3:**
```
Input: array = [8, 4, 2, 10, 3, 6, 7, 9, 1]
Output: [6, 10]
```

## Constraints

- Array contains at least one integer
- Array can have duplicates (treat as single occurrence)

## Hints

<details>
<summary>Hint 1</summary>
Use a hash set for O(1) lookup of whether a number exists in the array.
</details>

<details>
<summary>Hint 2</summary>
For each number, try to expand the range in both directions.
</details>

<details>
<summary>Hint 3</summary>
Mark numbers as visited to avoid counting them again. This keeps the algorithm O(n).
</details>

## Approach

### Hash Set with Expansion
1. Put all numbers in a hash set
2. For each number (if not yet visited):
   - Expand left: check if num-1, num-2, etc. exist
   - Expand right: check if num+1, num+2, etc. exist
   - Mark all visited numbers
   - Update best range if current is longer
3. Return the best range

**Time Complexity:** O(n)
**Space Complexity:** O(n)

---

## Similar Problems (Harder)

### 1. Longest Consecutive Sequence with Gap K
**Difficulty:** Hard

Find the longest sequence where consecutive elements differ by exactly K.

```
Input: array = [1, 3, 5, 7, 9, 11], k = 2
Output: 6 (all elements form a sequence with gap 2)
```

### 2. Count Distinct Ranges
**Difficulty:** Hard

Count how many distinct ranges of length >= 2 exist in the array.

```
Input: array = [1, 2, 5, 6, 7, 10]
Output: 2 (ranges [1,2] and [5,7])
```

### 3. Largest Range After One Addition
**Difficulty:** Hard

You can add one integer to the array. Find the largest range possible after this addition.

```
Input: array = [1, 2, 4, 5, 6]
Output: [1, 6] (add 3 to connect the ranges)
```
