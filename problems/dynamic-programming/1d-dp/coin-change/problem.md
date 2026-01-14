# Coin Change

## Problem Description

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.

## Examples

### Example 1
```
Input: coins = [1, 2, 5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

### Example 2
```
Input: coins = [2], amount = 3
Output: -1
Explanation: Amount 3 cannot be made with coins of denomination 2.
```

### Example 3
```
Input: coins = [1], amount = 0
Output: 0
Explanation: No coins needed for amount 0.
```

### Example 4
```
Input: coins = [1, 5, 10, 25], amount = 30
Output: 2
Explanation: 30 = 25 + 5
```

## Constraints

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

## Hints

<details>
<summary>Hint 1</summary>
Think about building up the solution from smaller amounts. If you know the minimum coins needed for all amounts less than the current amount, can you compute the answer for the current amount?
</details>

<details>
<summary>Hint 2</summary>
For each amount, try using each coin. If you use coin c, then you need 1 + (minimum coins for amount - c).
</details>

<details>
<summary>Hint 3</summary>
Initialize your DP array with a large value (like amount + 1) to represent "impossible". This makes comparison easy.
</details>

## Approach

### DP State Definition
- `dp[i]` = minimum number of coins needed to make amount `i`

### Base Cases
- `dp[0] = 0` (zero coins needed for amount 0)

### State Transition
```
dp[i] = min(dp[i], dp[i - coin] + 1) for each coin where coin <= i
```

For each amount `i`, we try every coin that doesn't exceed `i`. If we use that coin, we need `1 + dp[i - coin]` coins in total.

### Algorithm
1. Initialize `dp` array with `amount + 1` (represents infinity)
2. Set `dp[0] = 0`
3. For each amount from 1 to amount:
   - For each coin:
     - If coin <= current amount:
       - `dp[amount] = min(dp[amount], dp[amount - coin] + 1)`
4. Return `dp[amount]` if it's not infinity, else return -1

### Time Complexity
- O(amount * len(coins)) - for each amount, we try each coin

### Space Complexity
- O(amount) - for the DP array
