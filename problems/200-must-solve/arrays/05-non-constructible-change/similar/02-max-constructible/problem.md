# Maximum Constructible Value

**Difficulty:** Medium

## Problem Statement

Given coins and a budget of K additional coins (each with value 1), find the maximum consecutive range starting from 1 that you can construct.

## Examples

**Example 1:**
```
Input: coins = [1, 5, 10], budget = 2
Output: 8
Explanation: Add two 1s to get [1, 1, 1, 5, 10]. Can make values 1-8.
```

**Example 2:**
```
Input: coins = [1, 2, 4], budget = 0
Output: 7
Explanation: Without adding coins, can already make 1-7.
```

## Constraints

- 0 <= coins.length <= 10^5
- 1 <= coins[i] <= 10^9
- 0 <= budget <= 10^5
