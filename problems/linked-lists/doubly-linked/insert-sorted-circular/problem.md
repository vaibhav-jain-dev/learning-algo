# Insert into a Sorted Circular Linked List

## Problem Description

Given a Circular Linked List node, which is sorted in non-descending order, write a function to insert a value `insertVal` into the list such that it remains a sorted circular list.

The given node can be a reference to any single node in the list and may not necessarily be the smallest value in the circular list.

If there are multiple suitable places for insertion, you may choose any place to insert the new value. After the insertion, the circular list should remain sorted.

If the list is empty (given node is null), create a new single circular list and return the reference to that single node.

## Examples

### Example 1
```
Input: head = [3, 4, 1], insertVal = 2
       3 -> 4 -> 1
       ^         |
       |_________|

Output: [3, 4, 1, 2]
        3 -> 4 -> 1 -> 2
        ^              |
        |______________|

Explanation: Insert 2 between 1 and 3 (sorted order: 1, 2, 3, 4)
```

### Example 2
```
Input: head = [], insertVal = 1
Output: [1]
Explanation: The list is empty, create a single node circular list.
```

### Example 3
```
Input: head = [1], insertVal = 0
Output: [1, 0]
Explanation: Insert 0 after 1 (since it's circular, 0 comes before 1 in sorted order)
```

### Example 4
```
Input: head = [3, 5, 1], insertVal = 6
Output: [3, 5, 6, 1]
Explanation: 6 is larger than all values, insert at the "break point" (between max and min)
```

### Example 5
```
Input: head = [3, 5, 1], insertVal = 0
Output: [3, 5, 1, 0]
Explanation: 0 is smaller than all values, insert at the "break point"
```

## Constraints

- 0 <= Number of nodes <= 5 * 10^4
- -10^6 <= Node.val, insertVal <= 10^6

## Hints

<details>
<summary>Hint 1</summary>
There are three cases to consider for where to insert the value in a sorted circular list.
</details>

<details>
<summary>Hint 2</summary>
Case 1: The new value fits between two adjacent nodes (prev.val <= insertVal <= next.val)
</details>

<details>
<summary>Hint 3</summary>
Case 2: The new value is at the "break point" - either larger than the max or smaller than the min. The break point is where a node's value is greater than its next node's value.
</details>

<details>
<summary>Hint 4</summary>
Case 3: All nodes have the same value, or we've traversed the entire list without finding a spot - just insert anywhere.
</details>

## Approach

### Single Pass Traversal

We need to find the right position to insert. There are three cases:

**Case 1: Normal insertion**
- Insert between two nodes where `prev.val <= insertVal <= curr.val`
- This is the normal sorted position

**Case 2: Insert at the break point (max/min boundary)**
- This is where the list "wraps around" (largest value followed by smallest)
- Identified when `prev.val > curr.val`
- Insert here if `insertVal >= prev.val` (larger than max)
- OR if `insertVal <= curr.val` (smaller than min)

**Case 3: All same values or full traversal**
- If we complete a full loop without inserting, just insert anywhere
- This handles cases like all nodes having the same value

**Algorithm:**
```
1. Handle empty list: create single node pointing to itself
2. Start with prev = head, curr = head.next
3. Loop through the list:
   a. If prev.val <= insertVal <= curr.val: insert here (Case 1)
   b. If prev.val > curr.val (break point):
      - If insertVal >= prev.val OR insertVal <= curr.val: insert here (Case 2)
   c. Move prev = curr, curr = curr.next
   d. If we're back at start, insert after prev (Case 3)
```

**Time Complexity:** O(n) - single traversal
**Space Complexity:** O(1) - only pointers

## Visual Walkthrough

```
Example: head = [3, 4, 1], insertVal = 2

Circular list:
3 -> 4 -> 1 -> (back to 3)
     ^break point (4 > 1)

Traversal:
- prev=3, curr=4: 3 <= 2? No (2 < 3), continue
- prev=4, curr=1: Break point! 2 >= 4? No. 2 <= 1? No. Continue
- prev=1, curr=3: 1 <= 2 <= 3? Yes! Insert between 1 and 3

Result: 3 -> 4 -> 1 -> 2 -> (back to 3)
```

```
Example: head = [3, 4, 1], insertVal = 5

- prev=3, curr=4: 3 <= 5? Yes. 5 <= 4? No. Continue
- prev=4, curr=1: Break point! 5 >= 4? Yes! Insert between 4 and 1

Result: 3 -> 4 -> 5 -> 1 -> (back to 3)
```

## Common Mistakes

1. Not handling empty list case
2. Infinite loop - forgetting to check if we've completed a full cycle
3. Not handling the break point correctly
4. Not handling lists where all values are the same
5. Forgetting to maintain circular structure after insertion
