# Remove Nth Node From End of List

## Problem Description

Given the head of a linked list, remove the nth node from the end of the list and return its head.

The counting starts from 1 (not 0). So if n=1, we remove the last node. If n equals the length of the list, we remove the first node (head).

## Examples

### Example 1
```
Input: head = [1, 2, 3, 4, 5], n = 2
Output: [1, 2, 3, 5]
Explanation: Remove the 2nd node from end (node with value 4)
```

### Example 2
```
Input: head = [1], n = 1
Output: []
Explanation: The only node is removed, resulting in empty list
```

### Example 3
```
Input: head = [1, 2], n = 1
Output: [1]
Explanation: Remove the last node (value 2)
```

### Example 4
```
Input: head = [1, 2], n = 2
Output: [2]
Explanation: Remove the 2nd from end which is the head (value 1)
```

## Constraints

- The number of nodes in the list is sz
- 1 <= sz <= 30
- 0 <= Node.val <= 100
- 1 <= n <= sz

## Hints

<details>
<summary>Hint 1</summary>
One approach is to first count the total number of nodes, then traverse again to find the node to remove. But can you do it in one pass?
</details>

<details>
<summary>Hint 2</summary>
Use two pointers! If you maintain a gap of n nodes between them, when the first pointer reaches the end, the second pointer will be at the right position.
</details>

<details>
<summary>Hint 3</summary>
Actually, you want the second pointer to be at the node BEFORE the one to remove, so you can update its next pointer. Consider using a gap of n+1 or starting with a dummy node.
</details>

<details>
<summary>Hint 4</summary>
A dummy node before the head simplifies edge cases, especially when removing the head node itself.
</details>

## Approach

### Two-Pointer (One Pass) Approach - Optimal

The key insight is to maintain two pointers with a specific gap:

1. Create a dummy node pointing to head (handles edge case of removing head)
2. Initialize both pointers to the dummy node
3. Move the first pointer n+1 steps ahead
4. Move both pointers together until first reaches null
5. Now second pointer is right before the node to remove
6. Update: second.next = second.next.next

**Why n+1 steps?**
- We need second to point to the node BEFORE the target
- If we move first n+1 ahead, when first is at null, second is exactly before the nth from end

**Time Complexity:** O(L) where L is list length - single pass
**Space Complexity:** O(1)

### Two-Pass Approach

1. First pass: Count total nodes (length L)
2. Calculate position from start: L - n
3. Second pass: Traverse to node at position L - n - 1
4. Remove the next node

**Time Complexity:** O(L) - two passes
**Space Complexity:** O(1)

## Visual Walkthrough

```
List: 1 -> 2 -> 3 -> 4 -> 5, n = 2

Step 1: Add dummy node
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
  ^
first, second

Step 2: Move first n+1 = 3 steps ahead
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
  ^            ^
second       first

Step 3: Move both until first reaches null
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
                   ^              ^
                second          first

Step 4: Remove second.next (node 4)
dummy -> 1 -> 2 -> 3 ------> 5 -> null

Return: 1 -> 2 -> 3 -> 5
```

## Common Mistakes

1. Off-by-one errors - forgetting that n is 1-indexed
2. Not handling removal of head node
3. Miscalculating the gap between pointers
4. Forgetting to return dummy.next instead of head (head might be removed)
