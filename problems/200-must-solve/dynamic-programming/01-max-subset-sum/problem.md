# Max Subset Sum No Adjacent

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in an array of positive integers and returns the maximum sum of non-adjacent elements in the array.

If the input array is empty, the function should return 0.

## Examples

**Example 1:**
```
Input: array = [75, 105, 120, 75, 90, 135]
Output: 330 (75 + 120 + 135)
```

**Example 2:**
```
Input: array = [7, 10, 12, 7, 9, 14]
Output: 33 (7 + 12 + 14)
```

## Constraints

- Array contains positive integers
- Elements cannot be adjacent in the subset
- Empty array returns 0

## Hints

<details>
<summary>Hint 1</summary>
At each position, you have two choices: include it or skip it.
</details>

<details>
<summary>Hint 2</summary>
maxSum[i] = max(maxSum[i-1], maxSum[i-2] + array[i])
</details>

<details>
<summary>Hint 3</summary>
You only need the last two values, so use O(1) space.
</details>

## Approach

### Dynamic Programming
- maxSum[i] = max(maxSum[i-1], maxSum[i-2] + array[i])
- Either skip current (take previous max) or include current (add to max before previous)

**Time Complexity:** O(n)
**Space Complexity:** O(1) with optimization

---

## Similar Problems (Harder)

### 1. House Robber II (Circular Array)
**Difficulty:** Medium

Same problem but array is circular (first and last are adjacent).

### 2. Max Sum with At Least K Distance
**Difficulty:** Hard

Elements must be at least K positions apart.

### 3. Max Product No Adjacent
**Difficulty:** Hard

Find max product instead of sum (handle negatives).
