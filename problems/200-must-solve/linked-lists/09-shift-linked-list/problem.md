# Shift Linked List

**Difficulty:** Hard

## Problem Statement

Write a function that takes in the head of a Singly Linked List and an integer `k`, shifts the list in place (i.e., doesn't create a brand new list) by k positions, and returns its new head.

Shifting a Linked List means moving its nodes forward or backward and wrapping them around the list where appropriate. For example, shifting a Linked List forward by one position would make its tail become the new head of the linked list.

- If `k` is positive, shift the list forward (tail nodes move to head)
- If `k` is negative, shift the list backward (head nodes move to tail)

## Examples

**Example 1:**
```
Input: 0 -> 1 -> 2 -> 3 -> 4 -> 5, k = 2
Output: 4 -> 5 -> 0 -> 1 -> 2 -> 3
Explanation: Shifted forward by 2, so last 2 nodes move to front.
```

**Example 2:**
```
Input: 0 -> 1 -> 2 -> 3 -> 4 -> 5, k = -2
Output: 2 -> 3 -> 4 -> 5 -> 0 -> 1
Explanation: Shifted backward by 2, so first 2 nodes move to end.
```

**Example 3:**
```
Input: 1 -> 2 -> 3, k = 4
Output: 3 -> 1 -> 2
Explanation: k = 4 with length 3 is equivalent to k = 1 (4 % 3 = 1).
```

## Constraints

- The linked list has at least one node
- Handle k values larger than list length (use modulo)
- Handle both positive and negative k values
- k = 0 or k = length should return the original list

## Hints

<details>
<summary>Hint 1</summary>
First, find the length of the linked list and normalize k using modulo to handle cases where k is larger than the list length.
</details>

<details>
<summary>Hint 2</summary>
Convert the problem: shifting forward by k is the same as moving the last k nodes to the front.
</details>

<details>
<summary>Hint 3</summary>
Find the new tail (node at position length - k - 1), the new head (node at position length - k), and connect appropriately.
</details>

## Approach

### In-Place List Rotation

1. **Find length and tail:** Traverse the list to find its length and tail node
2. **Normalize k:** Calculate `k = k % length`. Handle negative k by converting to positive equivalent
3. **Handle edge cases:** If k == 0, return original head
4. **Find new tail position:** The new tail will be at position `length - k - 1`
5. **Reconnect:**
   - Connect old tail to old head (making it circular temporarily)
   - Set new tail's next to null
   - Return new head (new tail's original next)

**Time Complexity:** O(n) - single pass to find length, single pass to find new tail
**Space Complexity:** O(1) - only pointer manipulations

---

## Similar Problems (Harder)

### 1. Rotate List in Groups of K
**Difficulty:** Hard

Rotate each group of K consecutive nodes by a given number of positions.

### 2. Split and Rotate Linked List
**Difficulty:** Hard

Split the list into two parts at a given index and swap their positions.

### 3. Rotate Doubly Linked List
**Difficulty:** Medium-Hard

Implement rotation for a doubly linked list, maintaining both prev and next pointers.
