# Build Min Heap

## Problem Description

Given an array of integers, build a **min heap** from the array in-place. A min heap is a complete binary tree where the value of each node is less than or equal to the values of its children.

In array representation:
- For a node at index `i`:
  - Left child is at index `2*i + 1`
  - Right child is at index `2*i + 2`
  - Parent is at index `(i - 1) // 2`

Implement the `buildMinHeap` function that transforms the array into a valid min heap.

## Examples

### Example 1
```
Input: arr = [4, 10, 3, 5, 1]
Output: [1, 4, 3, 5, 10] (or any valid min heap arrangement)

Explanation:
Original array:      [4, 10, 3, 5, 1]
                        4
                      /   \
                    10     3
                   /  \
                  5    1

After heapify:       [1, 4, 3, 5, 10]
                        1
                      /   \
                     4     3
                   /  \
                  5   10

The root (1) is the minimum, and each parent is smaller than its children.
```

### Example 2
```
Input: arr = [9, 6, 5, 2, 3]
Output: [2, 3, 5, 6, 9] (or any valid min heap arrangement)

Explanation:
After building min heap:
                        2
                      /   \
                     3     5
                   /  \
                  6    9
```

### Example 3
```
Input: arr = [1, 2, 3, 4, 5]
Output: [1, 2, 3, 4, 5] (already a valid min heap)
```

## Constraints

- `1 <= arr.length <= 10^5`
- `-10^4 <= arr[i] <= 10^4`

## Hints

<details>
<summary>Hint 1</summary>
Start from the last non-leaf node and work backwards to the root.
</details>

<details>
<summary>Hint 2</summary>
The last non-leaf node is at index `(n // 2) - 1` where n is the array length.
</details>

<details>
<summary>Hint 3</summary>
For each node, perform a "heapify down" operation - swap with the smaller child if the child is smaller than the parent.
</details>

## Approach

### Algorithm: Bottom-Up Heapify

1. **Identify non-leaf nodes**: In a complete binary tree represented as an array, leaf nodes are in the second half of the array (indices `n//2` to `n-1`). Non-leaf nodes are in the first half (indices `0` to `n//2 - 1`).

2. **Heapify from bottom to top**: Start from the last non-leaf node and move up to the root, calling heapify on each node.

3. **Heapify Down procedure**:
   - Compare the node with its children
   - If the smallest value is not the current node, swap with the smallest child
   - Recursively heapify the affected subtree

### Time Complexity
- **O(n)** - While it might seem like O(n log n), the actual complexity is O(n) because most nodes are near the bottom of the tree and require fewer operations.

### Space Complexity
- **O(log n)** for recursive implementation (call stack)
- **O(1)** for iterative implementation

### Why O(n) and not O(n log n)?

The number of operations for heapify at height h is O(h). The number of nodes at height h is at most `ceil(n / 2^(h+1))`. The total work is:

```
Sum from h=0 to log(n) of: ceil(n / 2^(h+1)) * O(h) = O(n)
```

This is because nodes near the leaves (which are the majority) have very small heights.
