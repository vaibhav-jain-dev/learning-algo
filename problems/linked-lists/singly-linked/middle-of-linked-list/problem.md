# Middle of the Linked List

## Problem Description

Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes (even number of nodes), return the **second middle** node.

## Examples

### Example 1
```
Input: head = [1, 2, 3, 4, 5]
Output: [3, 4, 5]
Explanation: The middle node is node 3.
             Nodes 1, 2 are before it. Nodes 4, 5 are after it.

Visual:
1 -> 2 -> [3] -> 4 -> 5
          ^ middle
```

### Example 2
```
Input: head = [1, 2, 3, 4, 5, 6]
Output: [4, 5, 6]
Explanation: With 6 nodes, there are two middle nodes (3 and 4).
             We return the second middle node (4).

Visual:
1 -> 2 -> 3 -> [4] -> 5 -> 6
               ^ second middle
```

### Example 3
```
Input: head = [1]
Output: [1]
Explanation: Single node is the middle.
```

### Example 4
```
Input: head = [1, 2]
Output: [2]
Explanation: Two nodes - return the second (second middle).
```

## Constraints

- The number of nodes in the list is in the range [1, 100]
- 1 <= Node.val <= 100

## Hints

<details>
<summary>Hint 1</summary>
A simple approach: count all nodes, then traverse to the middle. But can you do it in one pass?
</details>

<details>
<summary>Hint 2</summary>
Use the slow and fast pointer technique! When fast reaches the end, slow will be at the middle.
</details>

<details>
<summary>Hint 3</summary>
If slow moves 1 step and fast moves 2 steps, when fast completes the journey, slow will have traveled exactly half the distance.
</details>

<details>
<summary>Hint 4</summary>
Be careful with the loop termination condition to handle both odd and even length lists correctly.
</details>

## Approach

### Two-Pointer (Slow and Fast) - Optimal

This is a classic application of the slow-fast pointer technique:

1. Initialize two pointers at head: `slow` and `fast`
2. Move `slow` by 1 step and `fast` by 2 steps
3. When `fast` reaches the end (null or last node), `slow` is at the middle
4. Return `slow`

**Why it works:**
- If the list has `n` nodes
- Fast pointer traverses `n` nodes (or stops when it can't move 2 more)
- Slow pointer traverses `n/2` nodes
- For odd `n`: slow ends exactly at middle
- For even `n`: slow ends at second middle (which is what we want)

**Loop Condition:**
- `while fast and fast.next` ensures we don't go past the end
- For odd length: fast ends at last node
- For even length: fast ends at null

**Time Complexity:** O(n) - single pass, but only n/2 iterations
**Space Complexity:** O(1) - just two pointers

### Two-Pass Approach

1. First pass: count total nodes
2. Calculate middle index: `length // 2`
3. Second pass: traverse to that index
4. Return that node

**Time Complexity:** O(n) - two passes
**Space Complexity:** O(1)

### Array Approach (Less Efficient)

1. Store all nodes in an array
2. Return the middle element: `array[length // 2]`

**Time Complexity:** O(n)
**Space Complexity:** O(n) - stores all nodes

## Visual Walkthrough

### Odd Length List: [1, 2, 3, 4, 5]
```
Initial:
1 -> 2 -> 3 -> 4 -> 5 -> null
s
f

After 1 iteration:
1 -> 2 -> 3 -> 4 -> 5 -> null
     s
          f

After 2 iterations:
1 -> 2 -> 3 -> 4 -> 5 -> null
          s
                    f

fast.next is null, loop ends
Return slow (node 3)
```

### Even Length List: [1, 2, 3, 4, 5, 6]
```
Initial:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
s
f

After 1 iteration:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
     s
          f

After 2 iterations:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
          s
                    f

After 3 iterations:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
               s
                              f (null)

fast is null, loop ends
Return slow (node 4) - the second middle!
```

## Common Mistakes

1. Off-by-one errors in loop condition
2. Returning the first middle instead of second for even-length lists
3. Not handling edge cases (single node, two nodes)
4. Using `while fast.next and fast.next.next` instead of `while fast and fast.next`
