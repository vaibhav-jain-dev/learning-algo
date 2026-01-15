# Build Max Heap

## Problem Description

Given an array of integers, build a **max heap** from the array in-place. A max heap is a complete binary tree where the value of each node is greater than or equal to the values of its children.

In array representation:
- For a node at index `i`:
  - Left child is at index `2*i + 1`
  - Right child is at index `2*i + 2`
  - Parent is at index `(i - 1) // 2`

Implement the `buildMaxHeap` function that transforms the array into a valid max heap.

## Examples

### Example 1
```
Input: arr = [4, 10, 3, 5, 1]
Output: [10, 5, 3, 4, 1] (or any valid max heap arrangement)

Explanation:
Original array:      [4, 10, 3, 5, 1]
                        4
                      /   \
                    10     3
                   /  \
                  5    1

After heapify:       [10, 5, 3, 4, 1]
                        10
                      /    \
                     5      3
                   /  \
                  4    1

The root (10) is the maximum, and each parent is larger than its children.
```

### Example 2
```
Input: arr = [1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17]
Output: [17, 15, 13, 9, 6, 5, 10, 4, 8, 3, 1] (or any valid max heap)

Explanation:
The maximum element 17 becomes the root.
```

### Example 3
```
Input: arr = [5, 4, 3, 2, 1]
Output: [5, 4, 3, 2, 1] (already a valid max heap)
```

## Constraints

- `1 <= arr.length <= 10^5`
- `-10^4 <= arr[i] <= 10^4`

## Hints

<details>
<summary>Hint 1</summary>
The approach is similar to building a min heap, but we compare for the larger value instead.
</details>

<details>
<summary>Hint 2</summary>
Start from the last non-leaf node (index n//2 - 1) and work backwards to the root.
</details>

<details>
<summary>Hint 3</summary>
For each node, swap with the larger child if that child is larger than the parent.
</details>

## Approach

### Algorithm: Bottom-Up Heapify

1. **Identify non-leaf nodes**: Leaf nodes don't need heapification as they trivially satisfy the heap property. Non-leaf nodes are at indices `0` to `n//2 - 1`.

2. **Heapify from bottom to top**: Start from the last non-leaf node and apply heapify to each node up to the root.

3. **Heapify Down procedure**:
   - Find the largest among the node and its children
   - If the largest is not the current node, swap with the largest child
   - Recursively heapify the affected subtree

### Why Bottom-Up?

Building a heap bottom-up is more efficient than inserting elements one by one:
- **Bottom-up**: O(n) time complexity
- **Repeated insertion**: O(n log n) time complexity

### Time Complexity
- **O(n)** - Most nodes are near the bottom and require few comparisons

### Space Complexity
- **O(log n)** for recursive implementation (call stack)
- **O(1)** for iterative implementation

### Comparison with Min Heap

| Aspect | Max Heap | Min Heap |
|--------|----------|----------|
| Root | Maximum element | Minimum element |
| Parent-Child | Parent >= Children | Parent <= Children |
| Use case | Priority queues (max first) | Priority queues (min first) |
| Heap sort | Produces ascending order | Produces descending order |
