# Nth Fibonacci

**Difficulty:** Easy (Green)

## Problem Statement

The Fibonacci sequence is defined as follows: the first number of the sequence is 0, the second number is 1, and the nth number is the sum of the (n - 1)th and (n - 2)th numbers. Write a function that takes in an integer n and returns the nth Fibonacci number.

Important note: the Fibonacci sequence is often defined with its first two numbers as F0 = 0 and F1 = 1. For the purpose of this question, the first Fibonacci number is F1 = 0. So for n = 1, output 0; for n = 2, output 1.

## Examples

**Example 1:**
```
Input: n = 6
Output: 5 (0, 1, 1, 2, 3, 5)
```

**Example 2:**
```
Input: n = 1
Output: 0
```

## Constraints

- n >= 1
- Return the nth Fibonacci number (1-indexed)

## Hints

<details>
<summary>Hint 1</summary>
Simple recursion has exponential time complexity. Use memoization.
</details>

<details>
<summary>Hint 2</summary>
You only need the last two values, so iterate with O(1) space.
</details>

## Approach

### Iterative (Optimal)
1. Handle base cases: n=1 returns 0, n=2 returns 1
2. Keep track of last two values
3. Iterate and compute next value

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Fibonacci with Matrix Exponentiation
**Difficulty:** Hard

Compute Fibonacci in O(log n) time using matrix exponentiation.

### 2. Generalized Fibonacci (Tribonacci)
**Difficulty:** Medium

Each number is sum of previous three numbers.

### 3. Fibonacci Modulo Large Prime
**Difficulty:** Hard

Compute Fibonacci mod M for very large n.
