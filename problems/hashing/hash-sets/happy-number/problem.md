# Happy Number

## Problem Description

Write an algorithm to determine if a number `n` is happy.

A **happy number** is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.

Return `true` if `n` is a happy number, and `false` if not.

## Examples

### Example 1
```
Input: n = 19
Output: true
Explanation:
  1^2 + 9^2 = 1 + 81 = 82
  8^2 + 2^2 = 64 + 4 = 68
  6^2 + 8^2 = 36 + 64 = 100
  1^2 + 0^2 + 0^2 = 1
```

### Example 2
```
Input: n = 2
Output: false
Explanation:
  2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 -> ...
  The sequence enters a cycle (4 -> 16 -> 37 -> ... -> 4)
```

### Example 3
```
Input: n = 7
Output: true
Explanation:
  7 -> 49 -> 97 -> 130 -> 10 -> 1
```

## Constraints

- 1 <= n <= 2^31 - 1

## Hints

<details>
<summary>Hint 1</summary>
The key insight is that if a number is not happy, the sequence will eventually repeat (enter a cycle).
</details>

<details>
<summary>Hint 2</summary>
Use a hash set to track numbers you've seen. If you see a number twice, there's a cycle.
</details>

<details>
<summary>Hint 3</summary>
Alternative: Use Floyd's cycle detection (tortoise and hare) to detect the cycle without extra space.
</details>

## Approach

### Hash Set Approach - O(log n) Time, O(log n) Space

1. Create a hash set to track seen numbers
2. Calculate sum of squares of digits
3. If sum equals 1, return true (happy!)
4. If sum is already in the set, return false (cycle detected)
5. Add sum to set and repeat

### Floyd's Cycle Detection - O(log n) Time, O(1) Space

1. Use two pointers: slow and fast
2. Slow computes one step, fast computes two steps
3. If they meet and the value is 1, it's happy
4. If they meet and the value isn't 1, it's not happy

### Why Does It Always Terminate?

For any number with d digits:
- Maximum digit is 9, so maximum sum of squares is d * 81
- For d = 13 (max for 32-bit int), max sum = 13 * 81 = 1053
- So the sequence is bounded and must eventually cycle or reach 1

### Complexity Analysis

- **Time Complexity**: O(log n) - The number of digits is log10(n), and the sequence is bounded
- **Space Complexity**: O(log n) for hash set approach, O(1) for Floyd's approach
