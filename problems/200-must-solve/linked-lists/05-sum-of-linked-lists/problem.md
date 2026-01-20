<div id="viz-config" style="display:none">
{"name":"Sum of Linked Lists","algorithm":"ll-sum","complexity":{"time":"O(max(n,m))","space":"O(max(n,m))"},"examples":[{"input":{"list1":[2,4,7,1],"list2":[9,4,5]},"output":[1,9,2,2],"inputRaw":"2 -> 4 -> 7 -> 1 (1742) + 9 -> 4 -> 5 (549)","outputRaw":"1 -> 9 -> 2 -> 2 (2291)"},{"input":{"list1":[9,9,9],"list2":[1]},"output":[0,0,0,1],"inputRaw":"9 -> 9 -> 9 (999) + 1 (1)","outputRaw":"0 -> 0 -> 0 -> 1 (1000)"},{"input":{"list1":[5,6,3],"list2":[8,4,2]},"output":[3,1,6],"inputRaw":"5 -> 6 -> 3 (365) + 8 -> 4 -> 2 (248)","outputRaw":"3 -> 1 -> 6 (613)"}]}
</div>

# Sum of Linked Lists

**Difficulty:** Medium

## Problem Statement

You're given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Write a function that adds the two numbers and returns the sum as a linked list.

The linked list representation means that the number 123 would be represented as `3 -> 2 -> 1` (least significant digit first).

## Examples

**Example 1:**
```
Input:
  linkedListOne = 2 -> 4 -> 7 -> 1  (represents 1742)
  linkedListTwo = 9 -> 4 -> 5       (represents 549)
Output: 1 -> 9 -> 2 -> 2            (represents 2291)
Explanation: 1742 + 549 = 2291
```

**Example 2:**
```
Input:
  linkedListOne = 9 -> 9 -> 9  (represents 999)
  linkedListTwo = 1            (represents 1)
Output: 0 -> 0 -> 0 -> 1       (represents 1000)
Explanation: 999 + 1 = 1000
```

**Example 3:**
```
Input:
  linkedListOne = 5 -> 6 -> 3  (represents 365)
  linkedListTwo = 8 -> 4 -> 2  (represents 248)
Output: 3 -> 1 -> 6            (represents 613)
Explanation: 365 + 248 = 613
```

## Constraints

- Each linked list has at least one node
- Each node contains a single digit (0-9)
- The lists represent non-negative integers
- No leading zeros except for the number 0 itself

## Hints

<details>
<summary>Hint 1</summary>
Think about how you would add two numbers by hand, starting from the least significant digit. You need to handle carries.
</details>

<details>
<summary>Hint 2</summary>
Traverse both lists simultaneously, adding corresponding digits along with any carry from the previous addition.
</details>

<details>
<summary>Hint 3</summary>
One list might be longer than the other. Make sure to handle remaining digits and a final carry.
</details>

## Approach

### Iterative Addition with Carry

1. Initialize a dummy head for the result list and a carry variable set to 0
2. Traverse both lists simultaneously:
   - Get values from both nodes (use 0 if a list is exhausted)
   - Calculate sum = value1 + value2 + carry
   - Create new node with `sum % 10`
   - Update carry = `sum // 10`
3. Continue until both lists are exhausted AND carry is 0
4. Return dummy.next as the result head

**Time Complexity:** O(max(n, m)) where n and m are lengths of the two lists
**Space Complexity:** O(max(n, m)) for the result list

---

## Similar Problems (Harder)

### 1. Add Two Numbers II (Forward Order)
**Difficulty:** Medium-Hard

Add two numbers where digits are stored in forward order (most significant digit first). You cannot reverse the lists.

### 2. Multiply Two Numbers as Linked Lists
**Difficulty:** Hard

Given two numbers as linked lists, return their product as a linked list.

### 3. Add Two Polynomials as Linked Lists
**Difficulty:** Hard

Each node contains coefficient and exponent. Add two polynomials and return the simplified result.
