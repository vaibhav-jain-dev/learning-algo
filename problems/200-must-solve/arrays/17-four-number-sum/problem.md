<div id="viz-config" style="display:none">
{"name":"Four Number Sum","algorithm":"hash-pair-sum","complexity":{"time":"O(n²)","space":"O(n²)"},"examples":[{"input":{"array":[7,6,4,-1,1,2],"targetSum":16},"output":[[7,6,4,-1],[7,6,1,2]],"inputRaw":"array=[7,6,4,-1,1,2], target=16","outputRaw":"[[7,6,4,-1],[7,6,1,2]]"},{"input":{"array":[1,2,3,4,5,6,7],"targetSum":10},"output":[[1,2,3,4]],"inputRaw":"array=[1,2,3,4,5,6,7], target=10","outputRaw":"[[1,2,3,4]]"}]}
</div>

# Four Number Sum

**Difficulty:** Hard (Red)

## Problem Statement

Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. The function should find all quadruplets in the array that sum up to the target sum and return a two-dimensional array of all these quadruplets in no particular order.

If no four numbers sum up to the target sum, the function should return an empty array.

## Examples

**Example 1:**
```
Input: array = [7, 6, 4, -1, 1, 2], targetSum = 16
Output: [[7, 6, 4, -1], [7, 6, 1, 2]]
```

**Example 2:**
```
Input: array = [1, 2, 3, 4, 5, 6, 7], targetSum = 10
Output: [[1, 2, 3, 4]]
```

## Constraints

- Array contains distinct integers
- Array is non-empty
- Order of quadruplets and elements within them doesn't matter

## Hints

<details>
<summary>Hint 1</summary>
Use a hash table to store pair sums you've seen while iterating.
</details>

<details>
<summary>Hint 2</summary>
For each pair of elements, check if (targetSum - pairSum) exists in the hash table.
</details>

<details>
<summary>Hint 3</summary>
Be careful about the order of operations to avoid using elements that haven't been "processed" yet, which could lead to duplicates.
</details>

## Approach

### Hash Table with Pair Sums
1. Create a hash table to store pair sums and their indices
2. For each element at index i:
   - First, check all pairs (i, j) where j > i against the hash table
   - Then, add all pairs (k, i) where k < i to the hash table
3. This order prevents finding the same quadruplet multiple times

**Time Complexity:** O(n²) average, O(n³) worst case
**Space Complexity:** O(n²) for storing pair sums

---

## Similar Problems (Harder)

### 1. K-Sum (Generalized)
**Difficulty:** Hard

Find all k numbers that sum to target. Generalize the two-sum pattern.

```
Input: array = [1, 2, 3, 4, 5], k = 3, target = 9
Output: [[1, 3, 5], [2, 3, 4]]
```

### 2. Four Number Sum with Repetition
**Difficulty:** Hard

Same problem but elements can be reused (each quadruplet can have repeated indices).

```
Input: array = [1, 2], targetSum = 6
Output: [[1, 1, 2, 2]] (using elements multiple times)
```

### 3. Count Quadruplets with Sum
**Difficulty:** Hard

Count the number of quadruplets (including those with same values but different indices).

```
Input: array = [1, 1, 1, 1, 2, 2], target = 5
Output: 12 (various combinations of indices)
```
