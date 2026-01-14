# Flatten a Multilevel Doubly Linked List

## Problem Description

You are given a doubly linked list where each node may have a **child** pointer pointing to a separate doubly linked list. These child lists may also have their own children, forming a multilevel data structure.

**Flatten** the list so that all the nodes appear in a single-level, doubly linked list. You are given the head of the first level of the list.

The nodes should be flattened in a way that the child nodes are inserted between the current node and its next node.

## Examples

### Example 1
```
Input:
1 - 2 - 3 - 4 - 5 - 6
        |
        7 - 8 - 9 - 10
            |
            11 - 12

Output: 1 - 2 - 3 - 7 - 8 - 11 - 12 - 9 - 10 - 4 - 5 - 6

Explanation:
- Start at 1, go until 3
- Node 3 has child (7), so dive into child list
- Node 8 has child (11), so dive into that
- After finishing 11-12, return to 9-10
- After finishing child of 3, continue to 4-5-6
```

### Example 2
```
Input:
1 - 2
|
3

Output: 1 - 3 - 2

Explanation: Node 1 has a child (3), insert it between 1 and 2.
```

### Example 3
```
Input: null
Output: null
```

### Example 4
```
Input: 1
Output: 1

Explanation: Single node with no child.
```

## Constraints

- The number of nodes will not exceed 1000
- 1 <= Node.val <= 10^5

## Hints

<details>
<summary>Hint 1</summary>
Think about the order in which nodes should appear. It's similar to a depth-first traversal of a tree.
</details>

<details>
<summary>Hint 2</summary>
When you encounter a node with a child, you need to "splice" the child list into the main list before continuing to the next node.
</details>

<details>
<summary>Hint 3</summary>
You can solve this iteratively or recursively. For iterative: when you find a child, find the tail of the child list and connect it to the original next node.
</details>

<details>
<summary>Hint 4</summary>
Don't forget to set the child pointer to null after flattening, and properly set both prev and next pointers.
</details>

## Approach

### Iterative Approach (Recommended)

When we encounter a node with a child:
1. Find the tail of the child list
2. Connect: current.next = child, child.prev = current
3. Connect: tail.next = original_next, original_next.prev = tail (if original_next exists)
4. Set current.child = null
5. Continue to next node

**Algorithm:**
```
current = head
while current:
    if current.child:
        child = current.child
        next_node = current.next

        # Find tail of child list
        tail = child
        while tail.next:
            tail = tail.next

        # Connect current -> child
        current.next = child
        child.prev = current
        current.child = null

        # Connect tail -> next_node
        if next_node:
            tail.next = next_node
            next_node.prev = tail

    current = current.next
```

**Time Complexity:** O(n) - each node visited at most twice (once in main loop, once finding tail)
**Space Complexity:** O(1) - iterative, no extra space

### Recursive Approach

The recursive approach treats this like DFS:
1. Recursively flatten child list
2. Get the tail of the flattened child
3. Splice it in
4. Continue with the rest

**Time Complexity:** O(n)
**Space Complexity:** O(d) where d is maximum depth due to recursion stack

## Visual Walkthrough

```
Initial:
1 --- 2 --- 3 --- 4 --- 5
            |
            7 --- 8
                  |
                  11

Step 1: At node 3, has child 7
- Find tail of 7-8 child list: 8
- But 8 has child 11!

Step 2: At node 8, has child 11
- Find tail of 11: 11 (single node)
- Connect: 8 -> 11 -> (original 8.next which is null)
- Now 8's list is: 8 -> 11

Back to Step 1:
- Tail of 7's list is now 11
- Connect: 3 -> 7 -> 8 -> 11 -> 4 -> 5

Final: 1 -> 2 -> 3 -> 7 -> 8 -> 11 -> 4 -> 5
```

## Common Mistakes

1. Forgetting to set child pointer to null after flattening
2. Not properly updating prev pointers (it's a doubly linked list!)
3. Off-by-one errors when finding the tail
4. Not handling null cases (empty list, no children)
5. Infinite loops from not properly moving current forward
