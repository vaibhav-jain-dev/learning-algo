# Quick Sort

## Problem Description

Implement the **Quick Sort** algorithm to sort an array of integers in ascending order.

Quick Sort is a divide-and-conquer algorithm that:
1. Selects a "pivot" element from the array
2. Partitions the array around the pivot (elements smaller than pivot go left, larger go right)
3. Recursively sorts the sub-arrays

This is often the fastest general-purpose sorting algorithm in practice.

## Examples

### Example 1
```
Input: [10, 7, 8, 9, 1, 5]
Output: [1, 5, 7, 8, 9, 10]
```

### Example 2
```
Input: [64, 34, 25, 12, 22, 11, 90]
Output: [11, 12, 22, 25, 34, 64, 90]
```

### Example 3
```
Input: [3, 2, 1]
Output: [1, 2, 3]
```

### Example 4
```
Input: [5, 5, 5, 5]
Output: [5, 5, 5, 5]
```

## Constraints

- 1 <= array length <= 10^5
- -10^9 <= array[i] <= 10^9

## Hints

<details>
<summary>Hint 1: Choosing a Pivot</summary>

Common pivot strategies:
- Last element (simplest)
- First element
- Middle element
- Median of three (first, middle, last)
- Random element (best for avoiding worst case)
</details>

<details>
<summary>Hint 2: Partition Logic</summary>

The partition function rearranges elements so that:
- All elements less than pivot are on its left
- All elements greater than pivot are on its right
- The pivot is in its final sorted position

Use two pointers: one to track the "smaller than pivot" boundary, one to scan through elements.
</details>

<details>
<summary>Hint 3: Avoiding Worst Case</summary>

Worst case O(n^2) occurs when the pivot is always the smallest or largest element. To avoid this:
- Use random pivot selection
- Use median-of-three pivot
- Shuffle the array before sorting
</details>

<details>
<summary>Hint 4: Three-Way Partition</summary>

For arrays with many duplicates, use three-way partition (Dutch National Flag):
- Elements < pivot go left
- Elements = pivot stay in middle
- Elements > pivot go right
</details>

## Approach

### Algorithm Steps (Lomuto Partition)

1. **Choose pivot**: Select the last element as pivot
2. **Partition**: Rearrange array so elements < pivot are left, > pivot are right
3. **Recurse**: Apply quick sort to left and right sub-arrays

### Partition Visualization

```
Array: [10, 7, 8, 9, 1, 5]
Pivot: 5 (last element)

Initial:     [10, 7, 8, 9, 1, 5]
              i                    (i = partition boundary)
              j                    (j = scanner)

j=0: 10 > 5, skip
j=1: 7 > 5, skip
j=2: 8 > 5, skip
j=3: 9 > 5, skip
j=4: 1 < 5, swap arr[i] and arr[j], i++
             [1, 7, 8, 9, 10, 5]
                 i

Final: swap pivot with arr[i]
             [1, 5, 8, 9, 10, 7]  -- Wait, let me redo this properly

Actually with Lomuto:
Array: [10, 7, 8, 9, 1, 5]  pivot=5
i = -1

j=0: 10 > 5, no swap
j=1: 7 > 5, no swap
j=2: 8 > 5, no swap
j=3: 9 > 5, no swap
j=4: 1 < 5, i++, swap(arr[0], arr[4])
     [1, 7, 8, 9, 10, 5], i=0

Swap pivot: swap(arr[1], arr[5])
     [1, 5, 8, 9, 10, 7]

Pivot 5 is now at index 1, its final position.
Left subarray: [1] (already sorted)
Right subarray: [8, 9, 10, 7] (recurse)
```

### Full Sort Example

```
[10, 7, 8, 9, 1, 5]

Step 1: Partition around 5
        [1, 5, 8, 9, 10, 7]
        5 is at final position (index 1)

Step 2: Sort left [1] - already sorted

Step 3: Sort right [8, 9, 10, 7], pivot=7
        [1, 5, 7, 9, 10, 8]
        7 is at final position

Step 4: Sort [9, 10, 8], pivot=8
        [1, 5, 7, 8, 10, 9]

Step 5: Sort [10, 9], pivot=9
        [1, 5, 7, 8, 9, 10]

Final: [1, 5, 7, 8, 9, 10]
```

### Complexity Analysis

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time (Best) | O(n log n) | Balanced partitions |
| Time (Average) | O(n log n) | Expected with random data |
| Time (Worst) | O(n^2) | Already sorted with bad pivot |
| Space | O(log n) | Recursion stack (average) |

### Partition Schemes

| Scheme | Description | Pros | Cons |
|--------|-------------|------|------|
| Lomuto | Single pointer, simple | Easy to implement | More swaps |
| Hoare | Two pointers from ends | Fewer swaps | More complex |
| 3-Way | Dutch National Flag | Great for duplicates | More complex |

### When to Use Quick Sort

- **In-place sorting needed**: O(log n) space vs O(n) for merge sort
- **Average case performance**: Often fastest in practice
- **Cache efficiency**: Good locality of reference
- **Not needed**: Stability or guaranteed O(n log n)

### Comparison with Other Sorts

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Quick Sort | O(n log n) | O(n log n) | O(n^2) | O(log n) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
