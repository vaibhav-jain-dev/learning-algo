# Permutations

**Difficulty:** Medium

## Problem Statement

Write a function that takes in an array of unique integers and returns an array of all permutations of those integers in no particular order.

If the input array is empty, the function should return an empty array.

## Examples

**Example 1:**
```
Input: [1, 2, 3]
Output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
```

**Example 2:**
```
Input: [1]
Output: [[1]]
```

**Example 3:**
```
Input: []
Output: []
```

## Constraints

- All integers in the input array are unique
- The order of permutations in the output doesn't matter

## Hints

<details>
<summary>Hint 1</summary>
Think about building permutations one element at a time.
</details>

<details>
<summary>Hint 2</summary>
Use backtracking: add an element, recurse, then remove it.
</details>

<details>
<summary>Hint 3</summary>
Track which elements have been used with a set or by swapping.
</details>

## Approach

### Backtracking Solution
1. For each position, try each unused element
2. Add element to current permutation
3. Recurse to fill next position
4. Backtrack by removing the element

**Time Complexity:** O(n! * n) - n! permutations, each of length n
**Space Complexity:** O(n) for recursion stack (excluding output)

### Swap-based Solution
1. Swap current index with each index from current to end
2. Recurse with next index
3. Swap back (backtrack)

**Time Complexity:** O(n! * n)
**Space Complexity:** O(n)
