<div id="viz-config" style="display:none">
{"name":"Find Loop","algorithm":"ll-find-loop","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"list":[0,1,2,3,4,5,6],"loopStart":3},"output":3,"inputRaw":"0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> (back to 3)","outputRaw":"Node with value 3"},{"input":{"list":[1,2,3,4],"loopStart":1},"output":1,"inputRaw":"1 -> 2 -> 3 -> 4 -> (back to 1)","outputRaw":"Node with value 1"},{"input":{"list":[5,6,7],"loopStart":6},"output":6,"inputRaw":"5 -> 6 -> 7 -> (back to 6)","outputRaw":"Node with value 6"}]}
</div>

# Find Loop

**Difficulty:** Hard

## Problem Statement

Write a function that takes in the head of a Singly Linked List that contains a loop (i.e., the list's tail node points to some node in the list instead of `None`/`null`). The function should return the node (the actual node, not just its value) from which the loop originates in constant space.

Each `LinkedList` node has an integer `value` as well as a `next` node pointing to the next node in the list.

## Examples

**Example 1:**
```
Input: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6
                      ^              |
                      |______________|

Output: Node with value 3
Explanation: The tail (6) points back to node 3, so the loop starts at 3.
```

**Example 2:**
```
Input: 1 -> 2 -> 3 -> 4
       ^              |
       |______________|

Output: Node with value 1
Explanation: The tail (4) points back to the head (1).
```

**Example 3:**
```
Input: 5 -> 6 -> 7
            ^   |
            |___|

Output: Node with value 6
Explanation: Node 7 points back to node 6.
```

## Constraints

- The linked list is guaranteed to have a loop
- O(1) space complexity required
- The linked list has at least 2 nodes

## Hints

<details>
<summary>Hint 1</summary>
Use Floyd's Tortoise and Hare algorithm: have two pointers, one moving twice as fast as the other.
</details>

<details>
<summary>Hint 2</summary>
When the fast and slow pointers meet, there's a mathematical relationship between their positions and the loop start.
</details>

<details>
<summary>Hint 3</summary>
After they meet, reset one pointer to the head. Then move both pointers one step at a time. They'll meet at the loop start.
</details>

## Approach

### Floyd's Cycle Detection Algorithm

**Phase 1: Detect the cycle**
1. Use two pointers: slow (moves 1 step) and fast (moves 2 steps)
2. If there's a cycle, they will eventually meet inside the loop

**Phase 2: Find the start of the cycle**
3. When they meet, reset the slow pointer to the head
4. Move both pointers one step at a time
5. They will meet at the loop's starting node

**Mathematical Proof:**
- Let D = distance from head to loop start
- Let P = distance from loop start to meeting point
- Let C = cycle length
- When they meet: slow traveled D + P, fast traveled D + P + nC (for some n)
- Since fast travels twice as far: 2(D + P) = D + P + nC
- Therefore: D + P = nC, which means D = nC - P
- So traveling D from head equals traveling D from meeting point (both reach loop start)

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Find Length of Loop
**Difficulty:** Medium-Hard

If a loop exists, find the number of nodes in the loop.

### 2. Remove Loop from Linked List
**Difficulty:** Hard

Detect the loop and then remove it so the list becomes a proper singly linked list.

### 3. Find Intersection of Two Linked Lists with Cycles
**Difficulty:** Very Hard

Given two linked lists that may each have a cycle, find if they intersect and return the intersection point.
