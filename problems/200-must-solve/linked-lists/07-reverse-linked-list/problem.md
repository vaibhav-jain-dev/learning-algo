<div id="viz-config" style="display:none">
{"name":"Reverse Linked List","algorithm":"ll-reverse","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"list":[0,1,2,3,4,5]},"output":[5,4,3,2,1,0],"inputRaw":"0 -> 1 -> 2 -> 3 -> 4 -> 5","outputRaw":"5 -> 4 -> 3 -> 2 -> 1 -> 0"},{"input":{"list":[1,2]},"output":[2,1],"inputRaw":"1 -> 2","outputRaw":"2 -> 1"}]}
</div>

# Reverse Linked List

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in the head of a Singly Linked List, reverses the list in place (i.e., doesn't create a brand new list), and returns its new head.

## Examples

**Example 1:**
```
Input: 0 -> 1 -> 2 -> 3 -> 4 -> 5
Output: 5 -> 4 -> 3 -> 2 -> 1 -> 0
```

**Example 2:**
```
Input: 1 -> 2
Output: 2 -> 1
```

## Constraints

- Reverse in place (O(1) space)
- Handle empty list and single node

## Hints

<details>
<summary>Hint 1</summary>
Use three pointers: previous, current, and next.
</details>

<details>
<summary>Hint 2</summary>
At each step, save next, reverse the link, then move forward.
</details>

## Approach

### Iterative
1. Initialize prev = null, current = head
2. While current exists:
   - Save next = current.next
   - Reverse: current.next = prev
   - Move forward: prev = current, current = next
3. Return prev (new head)

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Reverse Linked List in Groups of K
**Difficulty:** Hard

Reverse every K nodes in the linked list.

### 2. Reverse Portion of Linked List
**Difficulty:** Medium

Reverse only nodes from position m to n.

### 3. Reverse Alternating K Nodes
**Difficulty:** Hard

Reverse K nodes, skip K nodes, repeat.
