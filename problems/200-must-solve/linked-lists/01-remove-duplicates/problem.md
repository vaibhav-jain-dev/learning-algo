# Remove Duplicates From Linked List

**Difficulty:** Easy (Green)

## Problem Statement

You're given the head of a Singly Linked List whose nodes are in sorted order with respect to their values. Write a function that returns a modified version of the Linked List that doesn't contain any nodes with duplicate values.

The Linked List should be modified in place (i.e., you shouldn't create a brand new list), and the modified Linked List should still have its nodes sorted with respect to their values.

## Examples

**Example 1:**
```
Input: 1 -> 1 -> 3 -> 4 -> 4 -> 4 -> 5 -> 6 -> 6
Output: 1 -> 3 -> 4 -> 5 -> 6
```

**Example 2:**
```
Input: 1 -> 1 -> 1 -> 1 -> 1
Output: 1
```

## Constraints

- List is sorted in ascending order
- Modify in place

## Hints

<details>
<summary>Hint 1</summary>
Since the list is sorted, duplicates are always adjacent.
</details>

<details>
<summary>Hint 2</summary>
For each node, skip over all following nodes with the same value.
</details>

## Approach

1. Start at head
2. While current node exists:
   - While next node has same value, skip it
   - Move to next distinct node
3. Return head

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Remove Duplicates from Unsorted List
**Difficulty:** Medium

Remove duplicates without sorting first (use hash set).

### 2. Remove All Nodes with Duplicates
**Difficulty:** Medium

Remove all occurrences of duplicated values, not just extras.

### 3. Remove Duplicates Keeping K Occurrences
**Difficulty:** Hard

Keep at most K occurrences of each value.
