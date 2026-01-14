# Merge K Sorted Lists

## Problem Description

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

**Concepts Combined**: Heap/Priority Queue + Linked List + Divide and Conquer

## Examples

### Example 1
```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
Merging them gives: 1->1->2->3->4->4->5->6
```

### Example 2
```
Input: lists = []
Output: []
```

### Example 3
```
Input: lists = [[]]
Output: []
```

## Constraints
- `k == lists.length`
- `0 <= k <= 10^4`
- `0 <= lists[i].length <= 500`
- `-10^4 <= lists[i][j] <= 10^4`
- `lists[i]` is sorted in ascending order
- Sum of all `lists[i].length` <= 10^4

## Hints

<details>
<summary>Hint 1</summary>
Brute force: Collect all values, sort, create new list. O(N log N)
</details>

<details>
<summary>Hint 2</summary>
Heap approach: Maintain min-heap of size k with one node from each list. O(N log k)
</details>

<details>
<summary>Hint 3</summary>
Divide and Conquer: Merge pairs of lists, then pairs of results. O(N log k)
</details>

<details>
<summary>Hint 4</summary>
For heap, you need to handle comparing nodes. Store (value, list_index, node).
</details>

## Approach

### Approach 1: Min Heap
1. Add first node of each list to min heap
2. Pop minimum, add to result, push next node from same list
3. Repeat until heap is empty

### Approach 2: Divide and Conquer
1. Pair up lists and merge each pair
2. Repeat until one list remains

**Time Complexity**: O(N log k) for both approaches
**Space Complexity**: O(k) for heap, O(1) for divide and conquer (excluding recursion)
