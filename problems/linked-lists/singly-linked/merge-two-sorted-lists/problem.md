# Merge Two Sorted Lists

## Problem Description

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

## Examples

### Example 1
```
Input:
  list1: 1 -> 2 -> 4 -> null
  list2: 1 -> 3 -> 4 -> null
Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> null
```

### Example 2
```
Input:
  list1: null (empty)
  list2: null (empty)
Output: null
```

### Example 3
```
Input:
  list1: null (empty)
  list2: 0 -> null
Output: 0 -> null
```

### Example 4
```
Input:
  list1: 1 -> 2 -> 3 -> null
  list2: 4 -> 5 -> 6 -> null
Output: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
```

## Constraints

- The number of nodes in both lists is in the range [0, 50]
- -100 <= Node.val <= 100
- Both `list1` and `list2` are sorted in non-decreasing order

## Hints

<details>
<summary>Hint 1</summary>
Think about how you would merge two sorted arrays. The process for linked lists is similar - compare elements and choose the smaller one.
</details>

<details>
<summary>Hint 2</summary>
Using a dummy head node can simplify the code by avoiding special cases for the first node.
</details>

<details>
<summary>Hint 3</summary>
After one list is exhausted, you can simply attach the remainder of the other list since it's already sorted.
</details>

<details>
<summary>Hint 4</summary>
For a recursive solution, think: if list1's head is smaller, the result is list1's head followed by the merge of list1.next and list2.
</details>

## Approach

### Iterative Approach with Dummy Node

1. Create a dummy node to serve as the start of the result list
2. Maintain a tail pointer to track the end of the result list
3. Compare the heads of both lists:
   - Attach the smaller node to tail.next
   - Move that list's head forward
   - Move tail forward
4. When one list is exhausted, attach the remaining list
5. Return dummy.next (skip the dummy node)

**Time Complexity:** O(n + m) where n and m are lengths of the lists
**Space Complexity:** O(1) - only using pointers

### Recursive Approach

1. Base cases:
   - If list1 is null, return list2
   - If list2 is null, return list1
2. Compare heads:
   - If list1.val <= list2.val: list1.next = merge(list1.next, list2), return list1
   - Else: list2.next = merge(list1, list2.next), return list2

**Time Complexity:** O(n + m)
**Space Complexity:** O(n + m) due to recursion stack

## Visual Walkthrough

```
list1: 1 -> 3 -> 5
list2: 2 -> 4 -> 6

Step 1: Compare 1 vs 2, take 1
Result: 1 ->
list1: 3 -> 5
list2: 2 -> 4 -> 6

Step 2: Compare 3 vs 2, take 2
Result: 1 -> 2 ->
list1: 3 -> 5
list2: 4 -> 6

Step 3: Compare 3 vs 4, take 3
Result: 1 -> 2 -> 3 ->
list1: 5
list2: 4 -> 6

Step 4: Compare 5 vs 4, take 4
Result: 1 -> 2 -> 3 -> 4 ->
list1: 5
list2: 6

Step 5: Compare 5 vs 6, take 5
Result: 1 -> 2 -> 3 -> 4 -> 5 ->
list1: null
list2: 6

Step 6: list1 exhausted, attach remaining list2
Result: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
```

## Common Mistakes

1. Forgetting to handle null/empty lists
2. Not updating the tail pointer correctly
3. Losing reference to the head of the result list
4. Off-by-one errors when returning (return dummy.next, not dummy)
