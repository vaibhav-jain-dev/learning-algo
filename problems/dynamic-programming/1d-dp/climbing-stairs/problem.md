# Climbing Stairs

## Problem Description

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Examples

### Example 1
```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

### Example 2
```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

### Example 3
```
Input: n = 5
Output: 8
Explanation: The ways are:
1. 1+1+1+1+1
2. 1+1+1+2
3. 1+1+2+1
4. 1+2+1+1
5. 2+1+1+1
6. 1+2+2
7. 2+1+2
8. 2+2+1
```

## Constraints

- `1 <= n <= 45`

## Hints

<details>
<summary>Hint 1</summary>
Think about how you can reach step n. You can only come from step n-1 (taking 1 step) or step n-2 (taking 2 steps).
</details>

<details>
<summary>Hint 2</summary>
This is essentially the Fibonacci sequence! The number of ways to reach step n equals the sum of ways to reach step n-1 and step n-2.
</details>

<details>
<summary>Hint 3</summary>
You can optimize space by only keeping track of the last two values instead of the entire array.
</details>

## Approach

### DP State Definition
- `dp[i]` = number of distinct ways to reach step `i`

### Base Cases
- `dp[0] = 1` (one way to stay at ground - do nothing)
- `dp[1] = 1` (one way to reach step 1 - take one step)

### State Transition
```
dp[i] = dp[i-1] + dp[i-2]
```

To reach step `i`, you can:
1. Come from step `i-1` by taking 1 step
2. Come from step `i-2` by taking 2 steps

### Time Complexity
- O(n) - we compute each state once

### Space Complexity
- O(n) with full DP array
- O(1) with space optimization (only storing last two values)
