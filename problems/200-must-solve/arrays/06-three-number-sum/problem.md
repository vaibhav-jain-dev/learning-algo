# Three Number Sum

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. The function should find all triplets in the array that sum up to the target sum and return a two-dimensional array of all these triplets.

The numbers in each triplet should be ordered in ascending order, and the triplets themselves should be ordered in ascending order with respect to the numbers they hold.

If no three numbers sum up to the target sum, the function should return an empty array.

## Examples

**Example 1:**
```
Input: array = [12, 3, 1, 2, -6, 5, -8, 6], targetSum = 0
Output: [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
```

**Example 2:**
```
Input: array = [1, 2, 3], targetSum = 6
Output: [[1, 2, 3]]
```

**Example 3:**
```
Input: array = [1, 2, 3, 4, 5], targetSum = 100
Output: []
```

## Constraints

- Array contains distinct integers
- Array is non-empty
- Triplets must be unique

## Hints

<details>
<summary>Hint 1</summary>
Sort the array first. This allows you to use a two-pointer technique efficiently.
</details>

<details>
<summary>Hint 2</summary>
For each number in the array, use two pointers to find pairs that sum to (targetSum - currentNumber).
</details>

<details>
<summary>Hint 3</summary>
The left pointer starts just after the current number, right pointer at the end. Move them based on the sum comparison.
</details>

## Approach

### Sort + Two Pointers
1. Sort the array in ascending order
2. For each element at index i (from 0 to n-3):
   - Set left = i+1, right = n-1
   - While left < right:
     - Calculate sum = array[i] + array[left] + array[right]
     - If sum == target: found triplet, move both pointers
     - If sum < target: move left pointer right
     - If sum > target: move right pointer left
3. Return all found triplets

**Time Complexity:** O(n²) - O(n log n) for sort + O(n²) for finding triplets
**Space Complexity:** O(n) for output (or O(1) excluding output)

---

## Similar Problems (Harder)

### 1. Three Number Sum Closest
**Difficulty:** Medium

Find three numbers whose sum is closest to the target.

```
Input: array = [-1, 2, 1, -4], target = 1
Output: 2 (sum of -1 + 2 + 1 = 2 is closest to 1)
```

### 2. Three Number Sum with Duplicates
**Difficulty:** Hard

Same problem but array can contain duplicates. Each unique triplet should appear only once.

```
Input: array = [1, 1, 1, 2, 2, 3], target = 6
Output: [[1, 2, 3]] (not [[1,2,3], [1,2,3], [1,2,3]])
```

### 3. Count Triplets with Sum Less Than Target
**Difficulty:** Hard

Count the number of triplets whose sum is strictly less than the target.

```
Input: array = [-2, 0, 1, 3], target = 2
Output: 2 (triplets: [-2,0,1] and [-2,0,3])
```
