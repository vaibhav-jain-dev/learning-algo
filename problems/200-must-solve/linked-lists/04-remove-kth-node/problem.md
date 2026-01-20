<div id="viz-config" style="display:none">
{"name":"Remove Kth Node From End","algorithm":"ll-remove-kth","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"list":[0,1,2,3,4,5,6,7,8,9],"k":4},"output":[0,1,2,3,4,5,7,8,9],"inputRaw":"0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9, k = 4","outputRaw":"0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 7 -> 8 -> 9"},{"input":{"list":[1,2,3],"k":3},"output":[2,3],"inputRaw":"1 -> 2 -> 3, k = 3","outputRaw":"2 -> 3"}]}
</div>

# Remove Kth Node From End

**Difficulty:** Medium (Yellow)

## Problem Statement

Write a function that takes in the head of a singly linked list and an integer `k`, and removes the kth node from the end of the list.

The removal should be done in place, meaning that the original data structure should be mutated. The function doesn't need to return anything.

Each `LinkedList` node has an integer `value` and a `next` node pointer.

You can assume that the input linked list will always have at least two nodes and, more specifically, at least k nodes.

## Examples

**Example 1:**
```
Input:
head = 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9
k = 4

Output: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 7 -> 8 -> 9

Explanation: The 4th node from the end is node 6, which is removed.
(Counting from end: 9=1st, 8=2nd, 7=3rd, 6=4th)
```

**Example 2:**
```
Input:
head = 1 -> 2 -> 3
k = 3

Output: 2 -> 3

Explanation: The 3rd node from the end is node 1 (the head), which is removed.
```

## Constraints

- The list has at least 2 nodes
- The list has at least k nodes
- 1 <= k <= length of list
- Do not return anything, mutate in place
- This is a singly linked list (no prev pointers)

## Hints

<details>
<summary>Hint 1</summary>
Use two pointers. Advance one pointer k nodes ahead first.
</details>

<details>
<summary>Hint 2</summary>
Then advance both pointers simultaneously until the first reaches the end. The second pointer will be at the kth node from end.
</details>

<details>
<summary>Hint 3</summary>
To remove a node, you need access to the node before it. Keep track of the previous node as you traverse.
</details>

## Approach

### Two-Pointer Technique
1. Initialize two pointers at the head
2. Move the first pointer k nodes ahead
3. Move both pointers until first pointer reaches the last node
4. The second pointer is now at the node before the one to remove
5. Remove the kth node from end by updating pointers

### Edge Case: Removing the Head
- If the first pointer is null after moving k nodes, the head needs to be removed
- Copy the value from the second node to the first, then remove the second node

**Time Complexity:** O(n) where n is the length of the list
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Remove Multiple Kth Nodes
**Difficulty:** Medium

Remove all nodes at positions k, 2k, 3k, etc. from the end of the list.

### 2. Swap Kth Nodes From Both Ends
**Difficulty:** Medium

Swap the kth node from the beginning with the kth node from the end.

### 3. Reverse Nodes in K-Group from End
**Difficulty:** Hard

Reverse every k nodes starting from the end of the list (groups that don't have k nodes remain as is).
