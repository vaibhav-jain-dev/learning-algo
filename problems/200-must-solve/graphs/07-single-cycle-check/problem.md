# Single Cycle Check

**Difficulty:** Medium (Blue)

## Problem Statement

You're given an array of integers where each integer represents a jump of its value in the array. For instance, the integer `2` represents a jump of two indices forward, and `-3` represents a jump of three indices backward.

If a jump spills past the array's bounds, it wraps over to the other side. For instance, a jump of `-1` at index `0` brings us to the last index in the array. Similarly, a jump of `1` at the last index brings us to index `0`.

Write a function that returns a boolean representing whether the jumps in the array form a **single cycle**. A single cycle occurs if, starting at any index in the array and following the jumps, every element in the array is visited exactly once before landing back on the starting index.

## Examples

**Example 1:**
```
Input: array = [2, 3, 1, -4, -4, 2]
Output: true
Explanation: Starting at index 0:
0 -> 2 -> 3 -> 5 -> 1 -> 4 -> 0 (back to start)
All 6 indices visited exactly once.
```

**Example 2:**
```
Input: array = [2, 2, -1]
Output: true
Explanation: Starting at index 0:
0 -> 2 -> 1 -> 0 (back to start)
All 3 indices visited exactly once.
```

**Example 3:**
```
Input: array = [1, 1, 1, 1, 2]
Output: false
Explanation: Following jumps creates a smaller cycle that doesn't visit all elements.
```

## Constraints

- 1 <= array.length <= 10000
- -10000 <= array[i] <= 10000

## Hints

<details>
<summary>Hint 1</summary>
Start at index 0 and count how many elements you visit before returning.
</details>

<details>
<summary>Hint 2</summary>
Handle negative indices with modulo: (index + jump % n + n) % n
</details>

## Approach

1. Start at index 0
2. Follow jumps, counting visited elements
3. Check that we visit exactly n elements and return to index 0
4. Also ensure we don't return to 0 prematurely (before visiting all elements)

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Linked List Cycle Detection
**Difficulty:** Medium

Detect if a linked list has a cycle using Floyd's algorithm.

### 2. Find the Duplicate Number
**Difficulty:** Medium

Find duplicate in array where values are 1 to n using cycle detection.

### 3. Circular Array Loop
**Difficulty:** Medium

Detect if circular array has a loop with all same-direction moves.
