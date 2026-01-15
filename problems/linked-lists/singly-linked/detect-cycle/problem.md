# Detect Cycle in Linked List (Floyd's Algorithm)

## Problem Description

Given the head of a linked list, determine if the linked list has a cycle in it.

A cycle exists if some node in the list can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to (0-indexed). Note that `pos` is not passed as a parameter.

Return `true` if there is a cycle in the linked list. Otherwise, return `false`.

**Follow-up:** Can you solve it using O(1) (constant) memory?

## Examples

### Example 1
```
Input: head = [3, 2, 0, -4], pos = 1
      3 -> 2 -> 0 -> -4
           ^          |
           |__________|

Output: true
Explanation: There is a cycle where the tail connects to the 1st node (0-indexed).
```

### Example 2
```
Input: head = [1, 2], pos = 0
      1 -> 2
      ^    |
      |____|

Output: true
Explanation: There is a cycle where the tail connects back to the head.
```

### Example 3
```
Input: head = [1], pos = -1
      1 -> null

Output: false
Explanation: There is no cycle in the linked list.
```

### Example 4
```
Input: head = null
Output: false
Explanation: Empty list has no cycle.
```

## Constraints

- The number of nodes in the list is in the range [0, 10^4]
- -10^5 <= Node.val <= 10^5
- pos is -1 or a valid index in the linked list

## Hints

<details>
<summary>Hint 1</summary>
A naive approach would be to use a hash set to store visited nodes. If we encounter a node we've seen before, there's a cycle.
</details>

<details>
<summary>Hint 2</summary>
For O(1) space, use Floyd's Cycle Detection Algorithm (also known as the "tortoise and hare" algorithm).
</details>

<details>
<summary>Hint 3</summary>
Use two pointers moving at different speeds. If they meet, there's a cycle. The slow pointer moves one step at a time, while the fast pointer moves two steps at a time.
</details>

<details>
<summary>Hint 4</summary>
Think about why two pointers moving at different speeds will eventually meet in a cycle. In each step, the fast pointer reduces the gap by one node.
</details>

## Approach

### Floyd's Cycle Detection (Tortoise and Hare) - Optimal

The algorithm uses two pointers:
- **Slow pointer (tortoise):** moves one step at a time
- **Fast pointer (hare):** moves two steps at a time

**Why it works:**
1. If there's no cycle, the fast pointer will reach the end (null)
2. If there's a cycle, both pointers will eventually be in the cycle
3. Once both are in the cycle, the fast pointer "catches up" to the slow pointer
4. Since fast moves 2 steps and slow moves 1 step, the gap decreases by 1 each iteration
5. They will eventually meet

**Algorithm:**
1. Initialize slow and fast pointers to head
2. Move slow by 1 step, fast by 2 steps
3. If fast reaches null or fast.next is null, no cycle exists
4. If slow == fast, a cycle exists
5. Continue until cycle found or end reached

**Time Complexity:** O(n)
- If no cycle: fast pointer reaches end in n/2 steps
- If cycle: pointers meet within one cycle traversal

**Space Complexity:** O(1) - only two pointers used

### Hash Set Approach (Alternative)

1. Create a set to store visited nodes
2. Traverse the list, adding each node to the set
3. If we find a node already in the set, there's a cycle
4. If we reach null, no cycle

**Time Complexity:** O(n)
**Space Complexity:** O(n) - stores all nodes

## Visual Walkthrough of Floyd's Algorithm

```
List with cycle: 1 -> 2 -> 3 -> 4 -> 5
                      ^              |
                      |______________|

Step 0: slow=1, fast=1
Step 1: slow=2, fast=3
Step 2: slow=3, fast=5
Step 3: slow=4, fast=3 (wrapped around)
Step 4: slow=5, fast=5 -> MATCH! Cycle detected!
```

## Common Mistakes

1. Not checking if fast or fast.next is null before moving fast
2. Initializing slow and fast incorrectly
3. Using == on node values instead of node references
4. Forgetting empty list edge case
