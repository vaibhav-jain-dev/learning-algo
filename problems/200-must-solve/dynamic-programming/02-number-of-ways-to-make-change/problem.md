# Number of Ways to Make Change

**Difficulty:** Medium (Blue)

## Problem Statement

Given an array of positive integers representing coin denominations and a single non-negative integer n representing a target amount of money, write a function that returns the number of ways to make change for that target amount using the given coin denominations.

Note that an unlimited amount of coins is available for each denomination.

## Examples

**Example 1:**
```
Input: n = 6, denoms = [1, 5]
Output: 2
Explanation: 1+1+1+1+1+1 and 1+5
```

**Example 2:**
```
Input: n = 10, denoms = [1, 5, 10, 25]
Output: 4
Explanation: 10x1, 5x1+5x1, 5+5, 10
```

**Example 3:**
```
Input: n = 0, denoms = [1, 2]
Output: 1
Explanation: One way - use no coins
```

## Constraints

- Coin denominations are positive integers
- Target amount is non-negative
- Unlimited supply of each coin
- Order doesn't matter (combinations, not permutations)

## Hints

<details>
<summary>Hint 1</summary>
Build up from smaller amounts to larger amounts.
</details>

<details>
<summary>Hint 2</summary>
dp[amount] = number of ways to make that amount.
</details>

<details>
<summary>Hint 3</summary>
Iterate coins in outer loop to avoid counting same combination multiple times.
</details>

## Approach

### Dynamic Programming
1. dp[i] = number of ways to make amount i
2. dp[0] = 1 (one way to make 0 - use no coins)
3. For each coin:
   - For each amount from coin to n:
     - dp[amount] += dp[amount - coin]
4. Return dp[n]

**Key insight:** Iterating coins in outer loop ensures we count combinations, not permutations.

**Time Complexity:** O(n * d) where d is number of denominations
**Space Complexity:** O(n)

---

## Similar Problems (Harder)

### 1. Coin Change with Limited Supply
**Difficulty:** Hard

Each denomination has a limited count.

### 2. Combination Sum IV
**Difficulty:** Hard

Count permutations instead of combinations.

### 3. Target Sum with Plus/Minus
**Difficulty:** Hard

Assign + or - to each number to reach target.
