# Merge Linked Lists

**Difficulty:** Medium

## Problem Statement

Write a function that takes in the heads of two Singly Linked Lists that are in sorted order, respectively. The function should merge the lists in place (i.e., it shouldn't create a brand new list) and return the head of the merged list; the merged list should be in sorted order.

Each `LinkedList` node has an integer `value` as well as a `next` node pointing to the next node in the list or to `None`/`null` if it's the tail of the list.

## Examples

**Example 1:**
```
Input:
  headOne = 2 -> 6 -> 7 -> 8
  headTwo = 1 -> 3 -> 4 -> 5 -> 9 -> 10
Output: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10
```

**Example 2:**
```
Input:
  headOne = 1 -> 2 -> 3
  headTwo = 4 -> 5 -> 6
Output: 1 -> 2 -> 3 -> 4 -> 5 -> 6
```

**Example 3:**
```
Input:
  headOne = 5
  headTwo = 1 -> 2 -> 3
Output: 1 -> 2 -> 3 -> 5
```

## Constraints

- Both input lists are sorted in ascending order
- Merge must be done in place (O(1) space)
- Handle cases where one list is empty
- Handle cases where lists have different lengths

## Hints

<details>
<summary>Hint 1</summary>
Compare the heads of both lists and choose the smaller one as the starting point for your merged list.
</details>

<details>
<summary>Hint 2</summary>
Use a pointer to track the previous node so you can adjust next pointers correctly.
</details>

<details>
<summary>Hint 3</summary>
Iterate through both lists, always connecting the smaller current node to the merged list.
</details>

## Approach

### Iterative In-Place Merge

1. Determine which list has the smaller head - this becomes the result head
2. Maintain three pointers:
   - `prev`: last node added to merged list
   - `p1`: current node in first list
   - `p2`: current node in second list
3. Compare `p1.value` and `p2.value`:
   - If `p1 <= p2`: move `p1` forward
   - Else: insert `p2` between `prev` and `p1`, update `p2`
4. After one list is exhausted, the remaining nodes are already connected

**Time Complexity:** O(n + m) where n and m are lengths of the lists
**Space Complexity:** O(1) - merge is done in place

---

## Similar Problems (Harder)

### 1. Merge K Sorted Linked Lists
**Difficulty:** Hard

Merge K sorted linked lists into one sorted list efficiently.

### 2. Sort a Linked List
**Difficulty:** Hard

Sort a linked list in O(n log n) time using O(1) space (merge sort approach).

### 3. Merge Two Sorted Lists with Duplicates Removed
**Difficulty:** Medium-Hard

Merge two sorted lists but remove all duplicate values in the result.
