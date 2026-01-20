<div id="viz-config" style="display:none">
{"name":"Linked List Cycle","algorithm":"floyd-cycle-detection","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"head":[3,2,0,-4],"pos":1},"output":true,"inputRaw":"head = [3,2,0,-4], pos = 1 (tail connects to node index 1)","outputRaw":"true"}]}
</div>

# Linked List Cycle Detection

**Difficulty:** Easy

## Problem Statement

Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

A cycle exists if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. Note that `pos` is not passed as a parameter.

Return `true` if there is a cycle in the linked list. Otherwise, return `false`.

## Examples

**Example 1:**
```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle, where tail connects to the second node.
```

**Example 2:**
```
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle, where tail connects to the first node.
```

**Example 3:**
```
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

## Visual Explanation

### Floyd's Cycle Detection (Tortoise and Hare)

```
Linked List with Cycle:

3 -> 2 -> 0 -> -4
     ^         |
     |_________|

Using slow (tortoise) and fast (hare) pointers:

Step 0: slow=3, fast=3
Step 1: slow=2, fast=0
Step 2: slow=0, fast=2
Step 3: slow=-4, fast=-4  <- Both meet! Cycle detected!
```

## Constraints

- The number of nodes in the list is in range [0, 10^4]
- -10^5 <= Node.val <= 10^5
- pos is -1 or a valid index in the linked-list

## Hints

<details>
<summary>Hint 1</summary>
Use Floyd's Cycle Detection algorithm with two pointers moving at different speeds.
</details>

<details>
<summary>Hint 2</summary>
If there's a cycle, the fast pointer will eventually catch up to the slow pointer.
</details>

<details>
<summary>Hint 3</summary>
If the fast pointer reaches null, there's no cycle.
</details>

## Approach

### Floyd's Tortoise and Hare Algorithm

1. Initialize slow and fast pointers at head
2. Move slow by 1 step, fast by 2 steps
3. If they meet, cycle exists
4. If fast reaches null, no cycle

**Time Complexity:** O(n)
**Space Complexity:** O(1)
