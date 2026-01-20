<div id="viz-config" style="display:none">
{"name":"Middle Node of Linked List","algorithm":"ll-middle","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"list":[1,2,3,4,5]},"output":3,"inputRaw":"1 -> 2 -> 3 -> 4 -> 5","outputRaw":"Node with value 3"},{"input":{"list":[1,2,3,4,5,6]},"output":4,"inputRaw":"1 -> 2 -> 3 -> 4 -> 5 -> 6","outputRaw":"Node with value 4"},{"input":{"list":[1]},"output":1,"inputRaw":"1","outputRaw":"Node with value 1"}]}
</div>

# Middle Node of Linked List

**Difficulty:** Easy (Green)

## Problem Statement

Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes (i.e., the list has an even number of nodes), return the second middle node.

## Examples

**Example 1:**
```
Input: 1 -> 2 -> 3 -> 4 -> 5
Output: Node with value 3
Explanation: The middle node of the list is node 3.
```

**Example 2:**
```
Input: 1 -> 2 -> 3 -> 4 -> 5 -> 6
Output: Node with value 4
Explanation: Since the list has two middle nodes (3 and 4), we return the second one.
```

**Example 3:**
```
Input: 1
Output: Node with value 1
Explanation: Single node is its own middle.
```

## Constraints

- The number of nodes in the list is in the range [1, 100]
- 1 <= Node.value <= 100

## Hints

<details>
<summary>Hint 1</summary>
The brute force approach would be to first count all nodes, then traverse again to the middle. Can you do it in one pass?
</details>

<details>
<summary>Hint 2</summary>
Think about using two pointers that move at different speeds.
</details>

<details>
<summary>Hint 3</summary>
If one pointer moves twice as fast as the other, where will each pointer be when the fast one reaches the end?
</details>

<details>
<summary>Hint 4</summary>
Use a slow pointer (moves 1 step) and a fast pointer (moves 2 steps). When fast reaches the end, slow will be at the middle.
</details>

## Approach

### Two Pointer (Slow/Fast) Technique

1. Initialize two pointers, `slow` and `fast`, both pointing to the head
2. Move `slow` one step at a time
3. Move `fast` two steps at a time
4. When `fast` reaches the end (or `fast.next` is null), `slow` will be at the middle
5. Return `slow`

**Why this works:**
- Fast pointer travels twice as fast as slow pointer
- When fast has traveled the full length, slow has traveled half
- This naturally positions slow at the middle node

**Time Complexity:** O(n) - Single pass through the list
**Space Complexity:** O(1) - Only two pointers used

---

## Similar Problems (Harder)

### 1. Delete Middle Node
**Difficulty:** Medium

Delete the middle node of a linked list in one pass.

### 2. Split Linked List in Half
**Difficulty:** Medium

Split a linked list into two halves using the slow/fast technique.

### 3. Reorder List
**Difficulty:** Medium

Reorder list from L0 -> L1 -> ... -> Ln to L0 -> Ln -> L1 -> Ln-1 -> ... (uses finding middle as a step).
