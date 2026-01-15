# Find Median from Data Stream

## Problem Description

The **median** is the middle value in an ordered integer list. If the size is even, the median is the average of the two middle values.

Implement the `MedianFinder` class:
- `MedianFinder()` initializes the object
- `void addNum(int num)` adds integer `num` to the data structure
- `double findMedian()` returns the median of all elements so far

**Concepts Combined**: Two Heaps (Max + Min) + Stream Processing

## Examples

### Example 1
```
Input:
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]

Output: [null, null, null, 1.5, null, 2.0]

Explanation:
MedianFinder mf = new MedianFinder();
mf.addNum(1);    // arr = [1]
mf.addNum(2);    // arr = [1, 2]
mf.findMedian(); // returns 1.5 (median of [1, 2])
mf.addNum(3);    // arr = [1, 2, 3]
mf.findMedian(); // returns 2.0 (median of [1, 2, 3])
```

### Example 2
```
After adding: [5, 2, 9, 1, 7]
Sorted: [1, 2, 5, 7, 9]
Median: 5
```

## Constraints
- `-10^5 <= num <= 10^5`
- At most `5 * 10^4` calls to addNum and findMedian
- There will be at least one element before calling findMedian

## Hints

<details>
<summary>Hint 1</summary>
Maintain two heaps: max-heap for smaller half, min-heap for larger half.
</details>

<details>
<summary>Hint 2</summary>
Balance heaps so their sizes differ by at most 1.
</details>

<details>
<summary>Hint 3</summary>
Median is either top of larger heap, or average of both tops.
</details>

## Approach

### Two Heaps Strategy
```
maxHeap: stores smaller half (max at top)
minHeap: stores larger half (min at top)

Invariants:
1. All elements in maxHeap <= all elements in minHeap
2. |len(maxHeap) - len(minHeap)| <= 1
3. maxHeap has same size or one more element
```

**Time Complexity**: O(log n) for addNum, O(1) for findMedian
**Space Complexity**: O(n)
