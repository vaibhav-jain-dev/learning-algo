<div id="viz-config" style="display:none">
{"name":"Max Profit With K Transactions","algorithm":"dp-transactions","complexity":{"time":"O(n * k)","space":"O(n * k)"},"examples":[{"input":{"prices":[5,11,3,50,60,90],"k":2},"output":93,"inputRaw":"prices = [5, 11, 3, 50, 60, 90], k = 2","outputRaw":"93"},{"input":{"prices":[3,2,5,7,1,3],"k":1},"output":5,"inputRaw":"prices = [3, 2, 5, 7, 1, 3], k = 1","outputRaw":"5"},{"input":{"prices":[1,2,3,4,5],"k":2},"output":4,"inputRaw":"prices = [1, 2, 3, 4, 5], k = 2","outputRaw":"4"}]}
</div>

# Max Profit With K Transactions

**Difficulty:** Very Hard (Black)

## Problem Statement

You are given an array of positive integers representing the prices of a single stock on various days (each index represents a different day). You are also given an integer k, which represents the maximum number of transactions you are allowed to make.

Write a function that returns the maximum profit you can make by buying and selling the stock at most k times.

Note:
- A transaction consists of buying and then selling the stock
- You cannot hold more than one share of the stock at a time
- You must sell before you can buy again

## Examples

**Example 1:**
```
Input: prices = [5, 11, 3, 50, 60, 90], k = 2
Output: 93
Explanation: Buy at 5, sell at 11 (profit 6), buy at 3, sell at 90 (profit 87)
             Total profit = 6 + 87 = 93
```

**Example 2:**
```
Input: prices = [3, 2, 5, 7, 1, 3], k = 1
Output: 5
Explanation: Buy at 2, sell at 7 (profit 5)
```

**Example 3:**
```
Input: prices = [1, 2, 3, 4, 5], k = 2
Output: 4
Explanation: Buy at 1, sell at 5 (profit 4) - only need 1 transaction
```

## Constraints

- prices array contains positive integers
- k is a positive integer
- k transactions means at most k buy-sell pairs
- Can make fewer than k transactions if more profitable

## Hints

<details>
<summary>Hint 1</summary>
Use a 2D DP table where dp[t][d] represents maximum profit using at most t transactions up to day d.
</details>

<details>
<summary>Hint 2</summary>
For each day d and transaction t, either don't trade on day d, or complete a transaction by selling on day d (having bought on some earlier day j).
</details>

<details>
<summary>Hint 3</summary>
Optimize the inner loop by tracking the maximum of (dp[t-1][j] - prices[j]) for all j < d.
</details>

## Approach

### Dynamic Programming
1. dp[t][d] = max profit with at most t transactions by end of day d
2. For each transaction t and day d:
   - Don't trade on day d: dp[t][d] = dp[t][d-1]
   - Sell on day d after buying on day j: dp[t][d] = max(prices[d] - prices[j] + dp[t-1][j-1])
3. Optimize inner loop by maintaining maxSoFar = max(dp[t-1][j] - prices[j])
4. If k >= n/2, can use unlimited transactions (greedy)

**Time Complexity:** O(n * k) with optimization
**Space Complexity:** O(n * k), can be optimized to O(n)

---

## Similar Problems (Harder)

### 1. Best Time to Buy and Sell with Cooldown
**Difficulty:** Hard

After selling, must wait one day before buying again.

### 2. Best Time to Buy and Sell with Transaction Fee
**Difficulty:** Medium-Hard

Each transaction incurs a fee that reduces profit.

### 3. Best Time to Buy and Sell Stocks (Unlimited)
**Difficulty:** Medium

No limit on transactions; find maximum profit with any number of trades.
