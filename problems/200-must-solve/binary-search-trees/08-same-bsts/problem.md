<div id="viz-config" style="display:none">
{"name":"Same BSTs","algorithm":"bst-comparison","complexity":{"time":"O(n^2)","space":"O(n^2) for subarrays, or O(d) with index approach"},"examples":[{"input":{"arrayOne":[10,15,8,12,94,81,5,2,11],"arrayTwo":[10,8,5,15,2,12,11,94,81]},"output":true,"inputRaw":"arrayOne = [10,15,8,12,94,81,5,2,11], arrayTwo = [10,8,5,15,2,12,11,94,81]","outputRaw":"true (both produce same BST)"},{"input":{"arrayOne":[10,15,8,12,94,81,5,2,11],"arrayTwo":[10,8,5,15,2,12,94,81,11]},"output":false,"inputRaw":"arrayOne = [10,15,8,12,94,81,5,2,11], arrayTwo = [10,8,5,15,2,12,94,81,11]","outputRaw":"false (different BST structure)"}]}
</div>

# Same BSTs

**Difficulty:** Hard (Red)

## Problem Statement

Given two arrays of integers, determine if they would produce the same Binary Search Tree when elements are inserted in order. You must do this without actually constructing the BSTs.

When constructing a BST by inserting elements one at a time from left to right, the first element becomes the root, and subsequent elements are inserted according to BST rules (smaller values go left, equal or larger values go right).

## Examples

**Example 1:**
```
Input: arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11]
       arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81]

Output: true

Explanation: Both arrays produce the same BST:
              10
            /    \
           8      15
          /      /  \
         5      12   94
        /      /    /
       2      11   81
```

**Example 2:**
```
Input: arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11]
       arrayTwo = [10, 8, 5, 15, 2, 12, 94, 81, 11]

Output: false

Explanation: The insertion order of 94 and 81 differs, causing 81
             to be in different positions.
```

## Constraints

- Both arrays have the same length
- Both arrays contain the same values (but possibly different order)
- All values are unique
- Arrays are non-empty

## Hints

<details>
<summary>Hint 1</summary>
The first elements must be the same since they form the root.
</details>

<details>
<summary>Hint 2</summary>
After the root, elements less than root form the left subtree, elements greater form the right subtree. The relative order within each group matters.
</details>

<details>
<summary>Hint 3</summary>
Recursively check that left subtree arrays and right subtree arrays represent the same BSTs.
</details>

## Approach

### Recursive Comparison Without Building
1. First elements (roots) must match
2. Partition each array into smaller (left subtree) and larger/equal (right subtree) elements
3. Recursively verify both partitions represent the same BSTs
4. Base case: empty arrays are same BSTs

**Time Complexity:** O(n^2) - partitioning takes O(n) for each of O(n) elements
**Space Complexity:** O(n^2) for creating subarrays, or O(d) with index approach

---

## Similar Problems (Harder)

### 1. Count Different BSTs from Array
**Difficulty:** Hard

Given an array, count how many distinct BSTs can be formed by different insertion orders.

```
Input: [1, 2, 3]
Output: 5 (Catalan number for n=3)
```

### 2. Minimum Swaps for Same BST
**Difficulty:** Hard

Given two arrays that do NOT form the same BST, find minimum adjacent swaps in second array to make them form the same BST.

```
Input: [3, 1, 2], [3, 2, 1]
Output: 1 (swap positions 1 and 2)
```

### 3. Lexicographically Smallest Same BST Array
**Difficulty:** Hard

Given an array, find the lexicographically smallest array that produces the same BST.

```
Input: [3, 1, 4, 2]
Output: [3, 1, 2, 4]
```
