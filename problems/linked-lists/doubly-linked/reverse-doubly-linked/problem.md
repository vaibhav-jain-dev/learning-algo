# Reverse a Doubly Linked List

## Problem Description

Given the head of a doubly linked list, reverse the list and return the new head.

In a doubly linked list, each node has two pointers:
- `next`: points to the next node
- `prev`: points to the previous node

After reversing, all next pointers become prev pointers and vice versa. The original tail becomes the new head.

## Examples

### Example 1
```
Input: 1 <-> 2 <-> 3 <-> 4 <-> 5
Output: 5 <-> 4 <-> 3 <-> 2 <-> 1

Before:
null <- 1 <-> 2 <-> 3 <-> 4 <-> 5 -> null

After:
null <- 5 <-> 4 <-> 3 <-> 2 <-> 1 -> null
```

### Example 2
```
Input: 1 <-> 2
Output: 2 <-> 1
```

### Example 3
```
Input: 1
Output: 1 (single node unchanged)
```

### Example 4
```
Input: null
Output: null (empty list)
```

## Constraints

- The number of nodes in the list is in the range [0, 5000]
- -5000 <= Node.val <= 5000

## Hints

<details>
<summary>Hint 1</summary>
Think about what happens to each node: its prev becomes its next, and its next becomes its prev.
</details>

<details>
<summary>Hint 2</summary>
You can traverse the list and swap the prev and next pointers for each node.
</details>

<details>
<summary>Hint 3</summary>
Be careful about the traversal direction - after swapping pointers, the "next" node is now accessed via the "prev" pointer!
</details>

<details>
<summary>Hint 4</summary>
Track the last processed node. When you're done, it will be the new head.
</details>

## Approach

### Iterative Approach (Pointer Swapping)

The key insight is that for each node, we just need to swap its `prev` and `next` pointers.

**Algorithm:**
1. Start at head
2. For each node:
   - Save the original next pointer
   - Swap: node.next = node.prev, node.prev = saved_next
   - Move to saved_next (which is now the "previous" in traversal direction)
3. The last non-null node becomes the new head

**Important:** After swapping, to move to the next node in the original order, we use the `prev` pointer (because we just swapped!).

```
Before swap at node 2:
1 <-> 2 <-> 3
      ^
  prev=1, next=3

After swap at node 2:
1 ... 2 ... 3
      ^
  prev=3, next=1

To continue to node 3 (originally 2's next), use 2's new prev (which holds old next)
```

**Time Complexity:** O(n) - single traversal
**Space Complexity:** O(1) - only pointers

### Recursive Approach

1. Base case: if head is null or single node, return head
2. Recursively reverse the rest of the list
3. Fix up pointers for current node
4. Return new head

**Time Complexity:** O(n)
**Space Complexity:** O(n) - recursion stack

## Visual Walkthrough

```
Original: null <- 1 <-> 2 <-> 3 -> null

Step 1: At node 1
- Save next: temp = 2
- Swap: 1.next = null (1's prev), 1.prev = 2 (1's next)
- Move to temp (2)

State: 1 points backward to null, forward to 2
       But 1.next is null and 1.prev is 2

Step 2: At node 2
- Save next: temp = 3
- Swap: 2.next = 1 (2's prev), 2.prev = 3 (2's next)
- Move to temp (3)

Step 3: At node 3
- Save next: temp = null
- Swap: 3.next = 2 (3's prev), 3.prev = null (3's next)
- Move to temp (null)

Step 4: temp is null, we're done
- Last processed node was 3
- Return 3 as new head

Result: null <- 3 <-> 2 <-> 1 -> null
```

## Alternative Visual

```
Before: prev <-- [A] --> next

After:  next <-- [A] --> prev
        (becomes prev)  (becomes next)
```

## Common Mistakes

1. Forgetting that after swap, traversal direction changes
2. Not keeping track of the new head (it's the last non-null node)
3. Losing reference to the next node before swapping
4. Incorrect handling of edge cases (empty list, single node)
