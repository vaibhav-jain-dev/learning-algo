# Reverse Linked List

## Problem Description

Given the head of a singly linked list, reverse the list and return the reversed list's head.

In a singly linked list, each node contains a value and a pointer to the next node. The last node points to null. After reversing, the original head becomes the tail (pointing to null), and the original tail becomes the new head.

## Examples

### Example 1
```
Input: 1 -> 2 -> 3 -> 4 -> 5 -> null
Output: 5 -> 4 -> 3 -> 2 -> 1 -> null
```

### Example 2
```
Input: 1 -> 2 -> null
Output: 2 -> 1 -> null
```

### Example 3
```
Input: null (empty list)
Output: null
```

### Example 4
```
Input: 1 -> null (single node)
Output: 1 -> null
```

## Constraints

- The number of nodes in the list is in the range [0, 5000]
- -5000 <= Node.val <= 5000

## Hints

<details>
<summary>Hint 1</summary>
Think about what information you need to keep track of as you traverse the list. You'll need to change each node's next pointer to point to its previous node.
</details>

<details>
<summary>Hint 2</summary>
You'll need three pointers: one for the previous node, one for the current node, and one to temporarily store the next node before you change the current node's pointer.
</details>

<details>
<summary>Hint 3</summary>
For the recursive approach, think about the base case (empty list or single node) and how to reverse the rest of the list first, then fix up the pointers.
</details>

## Approach

### Iterative Approach (Recommended)

1. Initialize three pointers:
   - `prev` = null (will become the new head's next, which is null)
   - `curr` = head (current node being processed)
   - `next` = null (temporary storage)

2. Traverse the list:
   - Save the next node: `next = curr.next`
   - Reverse the current node's pointer: `curr.next = prev`
   - Move prev forward: `prev = curr`
   - Move curr forward: `curr = next`

3. When `curr` becomes null, `prev` points to the new head

**Time Complexity:** O(n) - visit each node once
**Space Complexity:** O(1) - only use three pointers

### Recursive Approach

1. Base case: if head is null or head.next is null, return head
2. Recursively reverse the rest of the list
3. Make the next node point back to current node
4. Set current node's next to null
5. Return the new head (from recursive call)

**Time Complexity:** O(n)
**Space Complexity:** O(n) - due to recursion stack

## Common Mistakes

1. Forgetting to handle empty list or single node cases
2. Losing reference to the next node before changing pointers
3. Not returning the correct new head (should be the last node of original list)
4. Creating a cycle by not setting the original head's next to null
