# Min Number Of Coins For Change

**Difficulty:** Medium (Blue)

## Problem Statement

Given an array of positive integers representing coin denominations and a single non-negative integer n representing a target amount of money, write a function that returns the smallest number of coins needed to make change for that target amount.

If it's impossible to make change for the target amount, return -1.

## Examples

**Example 1:**
```
Input: n = 7, denoms = [1, 5, 10]
Output: 3 (5 + 1 + 1)
```

**Example 2:**
```
Input: n = 6, denoms = [1, 2, 4]
Output: 2 (4 + 2)
```

**Example 3:**
```
Input: n = 3, denoms = [2]
Output: -1 (impossible)
```

## Constraints

- Coin denominations are positive integers
- Target amount is non-negative
- Unlimited supply of each coin

## Hints

<details>
<summary>Hint 1</summary>
Build up from smaller amounts to larger amounts.
</details>

<details>
<summary>Hint 2</summary>
dp[amount] = min(dp[amount], dp[amount - coin] + 1) for each coin.
</details>

## Approach

### Dynamic Programming
1. dp[i] = minimum coins to make amount i
2. dp[0] = 0 (base case)
3. For each amount 1 to n:
   - For each coin <= amount:
     - dp[amount] = min(dp[amount], dp[amount - coin] + 1)
4. Return dp[n] or -1 if impossible

**Time Complexity:** O(n * d) where d is number of denominations
**Space Complexity:** O(n)

---

## Similar Problems (Harder)

### 1. Coin Change with Limited Supply
**Difficulty:** Hard

Each denomination has a limited count.

### 2. Coin Change with Exact Coins
**Difficulty:** Hard

Must use exactly K coins total.

### 3. Minimum Coins for Multiple Targets
**Difficulty:** Hard

Find minimum coins to make each of multiple target amounts.
