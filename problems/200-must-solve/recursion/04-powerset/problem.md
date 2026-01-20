# Powerset

**Difficulty:** Medium

## Problem Statement

Write a function that takes in an array of unique integers and returns its powerset.

The powerset P(X) of a set X is the set of all subsets of X. For example, the powerset of [1, 2] is [[], [1], [2], [1, 2]].

Note that the sets in the powerset do not need to be in any particular order.

## Examples

**Example 1:**
```
Input: [1, 2, 3]
Output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```

**Example 2:**
```
Input: [1]
Output: [[], [1]]
```

**Example 3:**
```
Input: []
Output: [[]]
```

## Constraints

- All integers in the input array are unique
- The order of subsets in the output doesn't matter
- The order of elements within each subset doesn't matter

## Hints

<details>
<summary>Hint 1</summary>
Think about each element: it's either included in a subset or not.
</details>

<details>
<summary>Hint 2</summary>
You can build the powerset iteratively by starting with [[]] and adding each element to all existing subsets.
</details>

<details>
<summary>Hint 3</summary>
Alternatively, use recursion: for each element, branch into "include it" and "exclude it".
</details>

## Approach

### Recursive Approach (Include/Exclude)

```
                        []
                    /        \
              [1]              []
            /     \          /    \
        [1,2]    [1]       [2]    []
        /  \     /  \      /  \   / \
    [1,2,3][1,2][1,3][1] [2,3][2][3][]
```

1. For each element, make two recursive calls:
   - One that includes the current element
   - One that excludes the current element
2. Base case: when index reaches array length, add current subset to result

**Time Complexity:** O(n * 2^n) - 2^n subsets, each up to n elements
**Space Complexity:** O(n) for recursion stack (excluding output)

### Iterative Approach

1. Start with empty subset: [[]]
2. For each element in array:
   - Create new subsets by adding element to each existing subset
   - Add all new subsets to result

**Time Complexity:** O(n * 2^n)
**Space Complexity:** O(1) extra space (excluding output)

---

## Similar Problems (Harder)

### 1. Subsets with Duplicates
Generate all unique subsets when the input array may contain duplicates.
- **Key difference:** Must handle duplicate elements by sorting and skipping duplicates.

### 2. Subsets of Size K
Generate all subsets of exactly size K from an array of N elements (combinations).
- **Key difference:** Prune branches early when remaining elements can't reach size K.

### 3. Subset Sum with Target
Find all subsets that sum to a target value, with elements potentially usable multiple times.
- **Key difference:** Combines powerset generation with sum constraint and unlimited element usage.
