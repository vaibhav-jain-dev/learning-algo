<div id="viz-config" style="display:none">
{"name":"Right Smaller Than","algorithm":"bst-augmented","complexity":{"time":"O(n log n) average, O(n^2) worst","space":"O(n)"},"examples":[{"input":{"array":[8,5,11,-1,3,4,2]},"output":[5,4,4,0,1,1,0],"inputRaw":"array = [8, 5, 11, -1, 3, 4, 2]","outputRaw":"[5, 4, 4, 0, 1, 1, 0]"},{"input":{"array":[1,2,3,4,5]},"output":[0,0,0,0,0],"inputRaw":"array = [1, 2, 3, 4, 5]","outputRaw":"[0, 0, 0, 0, 0] (sorted ascending, no smaller elements to right)"}]}
</div>

# Right Smaller Than

**Difficulty:** Very Hard (Purple)

## Problem Statement

Write a function that takes in an array of integers and returns an array of the same length, where each element in the output array corresponds to the number of integers in the input array that are to the right of the relevant index and that are strictly smaller than the integer at that index.

In other words, for each index i, find the count of elements array[j] where j > i and array[j] < array[i].

## Examples

**Example 1:**
```
Input: array = [8, 5, 11, -1, 3, 4, 2]

Output: [5, 4, 4, 0, 1, 1, 0]

Explanation:
- Index 0 (value 8):  5 numbers to the right are smaller: 5, -1, 3, 4, 2
- Index 1 (value 5):  4 numbers to the right are smaller: -1, 3, 4, 2
- Index 2 (value 11): 4 numbers to the right are smaller: -1, 3, 4, 2
- Index 3 (value -1): 0 numbers to the right are smaller
- Index 4 (value 3):  1 number to the right is smaller: 2
- Index 5 (value 4):  1 number to the right is smaller: 2
- Index 6 (value 2):  0 numbers to the right (it's the last element)
```

**Example 2:**
```
Input: array = [1, 2, 3, 4, 5]
Output: [0, 0, 0, 0, 0]

Explanation: Array is sorted in ascending order, so no element has
             smaller elements to its right.
```

## Constraints

- Array can contain duplicate integers
- Array can be empty (return empty array)
- Array elements can be negative

## Hints

<details>
<summary>Hint 1</summary>
A naive O(n^2) solution works but is too slow. Think about how to use a BST.
</details>

<details>
<summary>Hint 2</summary>
Process the array from right to left, inserting elements into a BST. Track how many elements are smaller during insertion.
</details>

<details>
<summary>Hint 3</summary>
Augment BST nodes to store the count of nodes in their left subtree. This helps count smaller elements efficiently.
</details>

## Approach

### Augmented BST with Left Subtree Size
1. Process array from right to left
2. For each element, insert into augmented BST and count smaller elements
3. Each node stores: value, left subtree size, and count of equal values
4. During insertion, accumulate count when going right (those values are smaller)

**Time Complexity:** O(n log n) average, O(n^2) worst case (skewed tree)
**Space Complexity:** O(n) for the BST

---

## Similar Problems (Harder)

### 1. Count of Smaller Numbers After Self (LeetCode 315)
**Difficulty:** Hard

Same problem with different name. Can be solved with BST, merge sort, or BIT.

### 2. Reverse Pairs
**Difficulty:** Hard

Count pairs (i, j) where i < j and nums[i] > 2 * nums[j].

```
Input: [1, 3, 2, 3, 1]
Output: 2 (pairs: (1,4), (3,4))
```

### 3. Count Inversions
**Difficulty:** Hard

Count pairs (i, j) where i < j and array[i] > array[j]. This is the sum of all right-smaller-than values.

```
Input: [8, 5, 11, -1, 3, 4, 2]
Output: 15 (sum of [5, 4, 4, 0, 1, 1, 0])
```
