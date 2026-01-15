# Heap Sort Implementation

## Problem Description

Implement **Heap Sort** algorithm to sort an array of integers in ascending order. Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.

The algorithm works in two main phases:
1. Build a max heap from the input array
2. Repeatedly extract the maximum element and place it at the end of the array

Implement the `heapSort` function that sorts the array in-place.

## Examples

### Example 1
```
Input: arr = [12, 11, 13, 5, 6, 7]
Output: [5, 6, 7, 11, 12, 13]

Step-by-step:
1. Build max heap: [13, 11, 12, 5, 6, 7]
2. Swap 13 with 7, heapify: [12, 11, 7, 5, 6] | 13
3. Swap 12 with 6, heapify: [11, 6, 7, 5] | 12, 13
4. Swap 11 with 5, heapify: [7, 6, 5] | 11, 12, 13
5. Swap 7 with 5, heapify: [6, 5] | 7, 11, 12, 13
6. Swap 6 with 5, heapify: [5] | 6, 7, 11, 12, 13
Final: [5, 6, 7, 11, 12, 13]
```

### Example 2
```
Input: arr = [4, 10, 3, 5, 1]
Output: [1, 3, 4, 5, 10]
```

### Example 3
```
Input: arr = [1]
Output: [1]
```

### Example 4
```
Input: arr = [5, 4, 3, 2, 1]
Output: [1, 2, 3, 4, 5]
```

## Constraints

- `1 <= arr.length <= 10^5`
- `-10^4 <= arr[i] <= 10^4`

## Hints

<details>
<summary>Hint 1</summary>
First build a max heap from the entire array. This puts the largest element at the root (index 0).
</details>

<details>
<summary>Hint 2</summary>
Swap the root (maximum) with the last element, then reduce the heap size by 1 and heapify the root.
</details>

<details>
<summary>Hint 3</summary>
Repeat the process until the heap size is 1. The array will be sorted in ascending order.
</details>

<details>
<summary>Hint 4</summary>
Use a max heap for ascending order, or a min heap for descending order.
</details>

## Approach

### Algorithm

1. **Build Max Heap**: Transform the array into a max heap using bottom-up heapify (O(n))

2. **Extract and Sort**:
   - Swap the root (maximum element) with the last unsorted element
   - Reduce heap size by 1
   - Heapify the root to restore max heap property
   - Repeat until heap size is 1

### Pseudocode
```
function heapSort(arr):
    n = length(arr)

    // Build max heap
    for i from n/2-1 down to 0:
        heapify(arr, n, i)

    // Extract elements one by one
    for i from n-1 down to 1:
        swap(arr[0], arr[i])    // Move max to end
        heapify(arr, i, 0)       // Heapify reduced heap
```

### Time Complexity
- **O(n log n)** in all cases (best, average, worst)
  - Building heap: O(n)
  - Extracting n elements: O(n log n)

### Space Complexity
- **O(1)** - In-place sorting (iterative heapify)
- **O(log n)** - If using recursive heapify (call stack)

### Properties of Heap Sort

| Property | Value |
|----------|-------|
| Time Complexity | O(n log n) |
| Space Complexity | O(1) |
| Stable | No |
| In-place | Yes |
| Adaptive | No |

### Comparison with Other Sorting Algorithms

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Quick Sort | O(n log n) | O(n log n) | O(n^2) | O(log n) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |

### Why Heap Sort is Not Stable?

Elements with equal values may change their relative order during the heapify process. The swap operations don't preserve the original order of equal elements.
