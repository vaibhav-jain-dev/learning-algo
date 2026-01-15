# Merge Sort

## Problem Description

Implement the **Merge Sort** algorithm to sort an array of integers in ascending order.

Merge Sort is a divide-and-conquer algorithm that:
1. Divides the array into two halves
2. Recursively sorts each half
3. Merges the two sorted halves back together

This algorithm guarantees O(n log n) time complexity in all cases (best, average, worst).

## Examples

### Example 1
```
Input: [38, 27, 43, 3, 9, 82, 10]
Output: [3, 9, 10, 27, 38, 43, 82]
```

### Example 2
```
Input: [5, 2, 8, 12, 1, 6]
Output: [1, 2, 5, 6, 8, 12]
```

### Example 3
```
Input: [1]
Output: [1]
```

### Example 4
```
Input: [3, 3, 3, 1, 1, 2, 2]
Output: [1, 1, 2, 2, 3, 3, 3]
```

## Constraints

- 1 <= array length <= 10^5
- -10^9 <= array[i] <= 10^9

## Hints

<details>
<summary>Hint 1: Understanding the Divide Step</summary>

To divide the array, find the middle index: `mid = (left + right) // 2`. Then recursively sort the left half `[left, mid]` and right half `[mid+1, right]`.
</details>

<details>
<summary>Hint 2: The Merge Process</summary>

When merging two sorted arrays, use two pointers starting at the beginning of each array. Compare elements and take the smaller one, advancing that pointer. Continue until both arrays are exhausted.
</details>

<details>
<summary>Hint 3: Base Case</summary>

The recursion stops when a subarray has only one element (left >= right), as a single element is already sorted.
</details>

<details>
<summary>Hint 4: Space Complexity</summary>

Merge sort requires O(n) auxiliary space for the merge operation. You can optimize by allocating a temporary array once and reusing it.
</details>

## Approach

### Algorithm Steps

1. **Divide**: Find the middle point to divide the array into two halves
2. **Conquer**: Recursively sort the first half and second half
3. **Combine**: Merge the two sorted halves

### Visual Example

```
Original: [38, 27, 43, 3, 9, 82, 10]

Divide Phase:
                    [38, 27, 43, 3, 9, 82, 10]
                   /                          \
          [38, 27, 43, 3]                [9, 82, 10]
          /            \                 /         \
      [38, 27]      [43, 3]          [9, 82]      [10]
      /     \       /     \          /     \        |
    [38]   [27]   [43]   [3]       [9]    [82]    [10]

Merge Phase:
    [38]   [27]   [43]   [3]       [9]    [82]    [10]
      \     /       \     /          \     /        |
      [27, 38]      [3, 43]          [9, 82]      [10]
          \            /                 \         /
          [3, 27, 38, 43]                [9, 10, 82]
                   \                          /
                    [3, 9, 10, 27, 38, 43, 82]
```

### Complexity Analysis

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time (Best) | O(n log n) | Always divides and merges |
| Time (Average) | O(n log n) | Same as best case |
| Time (Worst) | O(n log n) | Same as best case |
| Space | O(n) | Temporary array for merging |

### When to Use Merge Sort

- **Stable sort required**: Merge sort maintains relative order of equal elements
- **Linked lists**: Merge sort is excellent for linked lists (no random access needed)
- **External sorting**: Great for sorting data that doesn't fit in memory
- **Guaranteed performance**: When O(n log n) worst-case is required

### Comparison with Other Sorts

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n^2) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
