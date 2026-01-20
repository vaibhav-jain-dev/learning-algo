<div id="viz-config" style="display:none">
{"name":"Staircase Traversal","algorithm":"recursion-staircase","complexity":{"time":"O(n)","space":"O(n)"},"examples":[{"input":{"height":4,"maxSteps":2},"output":5,"inputRaw":"height = 4, maxSteps = 2","outputRaw":"5"}]}
</div>

# Staircase Traversal

**Difficulty:** Medium

## Problem Statement

You're given two positive integers representing the height of a staircase and the maximum number of steps you can advance up the staircase at a time.

Write a function that returns the number of distinct ways to climb the staircase.

For example, if you were given a staircase of height = 3 and maxSteps = 2, you could climb the staircase in 3 ways:
- 1 step, 1 step, 1 step
- 1 step, 2 steps
- 2 steps, 1 step

## Examples

**Example 1:**
```
Input: height = 4, maxSteps = 2
Output: 5
Explanation: [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2]
```

**Example 2:**
```
Input: height = 3, maxSteps = 3
Output: 4
Explanation: [1,1,1], [1,2], [2,1], [3]
```

**Example 3:**
```
Input: height = 1, maxSteps = 1
Output: 1
```

## Constraints

- 1 <= height
- 1 <= maxSteps

## Hints

<details>
<summary>Hint 1</summary>
This is a generalization of the Fibonacci sequence. Instead of summing the previous 2 values, sum the previous maxSteps values.
</details>

<details>
<summary>Hint 2</summary>
Define dp[i] as the number of ways to reach step i. Then dp[i] = sum of dp[i-1], dp[i-2], ..., dp[i-maxSteps].
</details>

<details>
<summary>Hint 3</summary>
Use a sliding window to optimize the sum calculation from O(maxSteps) to O(1).
</details>

## Approach

### Recursive Relation

```
ways(n) = ways(n-1) + ways(n-2) + ... + ways(n-maxSteps)
```

For height=4, maxSteps=2:
```
ways(4) = ways(3) + ways(2)
ways(3) = ways(2) + ways(1)
ways(2) = ways(1) + ways(0)
ways(1) = ways(0) = 1

ways(2) = 1 + 1 = 2
ways(3) = 2 + 1 = 3
ways(4) = 3 + 2 = 5
```

### Dynamic Programming

1. Initialize dp[0] = 1 (one way to stay at ground)
2. For each step i from 1 to height:
   - Sum all dp[i-j] where j goes from 1 to min(i, maxSteps)

**Time Complexity:** O(n * k) where n = height, k = maxSteps
**Space Complexity:** O(n)

### Sliding Window Optimization

Instead of recalculating the sum each time:
1. Maintain a running sum of the last maxSteps values
2. When moving to next step: add new dp value, remove old dp value

**Time Complexity:** O(n)
**Space Complexity:** O(n) or O(k) with space optimization

---

## Similar Problems (Harder)

### 1. Minimum Cost Climbing Stairs
Each step has a cost; find minimum cost to reach the top with variable step sizes.
- **Key difference:** Combines counting with optimization (min instead of sum).

### 2. Decode Ways
Count ways to decode a string where 1-26 map to A-Z (similar structure but with constraints).
- **Key difference:** Step validity depends on input characters, not just max steps.

### 3. Knight Dialer
Count distinct phone numbers of length n a chess knight can dial starting from any digit.
- **Key difference:** 2D state space with irregular transitions based on knight moves.
