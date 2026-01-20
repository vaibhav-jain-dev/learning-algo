# Coin Change II - Exact Coins

**Difficulty:** Medium-Hard

## Problem Statement

Given an array of coin denominations `coins`, a target `amount`, and an integer `k`, return whether it's possible to make the `amount` using **exactly** `k` coins. If possible, return the coins used; otherwise return an empty list.

This is a variation of the classic coin change problem where instead of minimizing coins, you must use a specific count.

## Examples

**Example 1:**
```
Input: amount = 11, coins = [1, 2, 5], k = 3
Output: true
Explanation: 11 = 5 + 5 + 1 (exactly 3 coins)
```

**Example 2:**
```
Input: amount = 10, coins = [2, 5], k = 2
Output: true
Explanation: 10 = 5 + 5 (exactly 2 coins)
```

**Example 3:**
```
Input: amount = 7, coins = [2, 4], k = 3
Output: false
Explanation: Cannot make 7 with any combination of [2,4] using exactly 3 coins
```

**Example 4:**
```
Input: amount = 6, coins = [1, 2, 3], k = 3
Output: true
Explanation: 6 = 2 + 2 + 2 OR 6 = 1 + 2 + 3 OR 6 = 3 + 3 (multiple solutions exist)
```

## Constraints

- 1 <= coins.length <= 12
- 1 <= coins[i] <= 2^31 - 1
- 0 <= amount <= 10^4
- 1 <= k <= 100

---

## Thought Process & Pattern Recognition

### Step 1: Recognize the Pattern

**Question:** "How is this different from standard Coin Change?"

Standard Coin Change: `dp[amount]` = minimum coins to reach amount

This Problem: `dp[amount][k]` = can we reach amount using exactly k coins?

### Step 2: Define the State

We need **two dimensions**:
- Amount we need to reach
- Number of coins we must use

```
dp[i][j] = true if we can make amount i using exactly j coins
```

### Step 3: Define the Recurrence

```
dp[0][0] = true   (0 amount with 0 coins is valid)
dp[i][j] = OR of dp[i - coin][j - 1] for all coins <= i
```

### Step 4: Build the Solution

For each (amount, coins) pair, check if we can reach it by:
- Taking any valid coin
- And having reached (amount - coin) with (coins - 1)

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>amount = 11, coins = [1, 2, 5], k = 3</code>
</div>

### Available Coins

<div style="display: flex; gap: 15px; margin: 20px 0; flex-wrap: wrap;">
<div style="text-align: center; padding: 15px 25px; background: #ffc107; border-radius: 50%; min-width: 60px;">
<div style="font-size: 24px; font-weight: bold;">1</div>
</div>
<div style="text-align: center; padding: 15px 25px; background: #c0c0c0; border-radius: 50%; min-width: 60px;">
<div style="font-size: 24px; font-weight: bold;">2</div>
</div>
<div style="text-align: center; padding: 15px 25px; background: #cd7f32; border-radius: 50%; min-width: 60px;">
<div style="font-size: 24px; font-weight: bold;">5</div>
</div>
</div>

### 2D DP Table Construction

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">amt \ coins</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">0</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">1</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">2</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">3</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>0</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">T</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>2</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>5</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">T</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>6</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">T</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>10</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">T</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">T</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>11</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">F</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;"><strong>T</strong></td>
</tr>
</table>

### Step-by-Step Calculation for dp[11][3]

<div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">

**Checking dp[11][3]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
Use coin 1: dp[11-1][3-1] = dp[10][2] = <span style="color: #28a745;"><strong>True</strong></span><br>
<div style="color: #155724; font-size: 12px;">11 = 1 + (something that makes 10 with 2 coins)</div>
</div>

<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
Use coin 2: dp[11-2][3-1] = dp[9][2] = True<br>
<div style="color: #155724; font-size: 12px;">11 = 2 + (something that makes 9 with 2 coins)</div>
</div>

<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
Use coin 5: dp[11-5][3-1] = dp[6][2] = True<br>
<div style="color: #155724; font-size: 12px;">11 = 5 + (something that makes 6 with 2 coins)</div>
</div>

**Result: dp[11][3] = True**

</div>

### Visualization: One Valid Solution

<div style="display: flex; justify-content: center; gap: 20px; margin: 30px 0; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="width: 70px; height: 70px; background: linear-gradient(145deg, #cd7f32, #8b4513); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; box-shadow: 2px 2px 5px rgba(0,0,0,0.3);">5</div>
<div style="margin-top: 5px; font-size: 12px; color: #666;">Coin 1</div>
</div>
<div style="display: flex; align-items: center; font-size: 24px; color: #666;">+</div>
<div style="text-align: center;">
<div style="width: 70px; height: 70px; background: linear-gradient(145deg, #cd7f32, #8b4513); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; box-shadow: 2px 2px 5px rgba(0,0,0,0.3);">5</div>
<div style="margin-top: 5px; font-size: 12px; color: #666;">Coin 2</div>
</div>
<div style="display: flex; align-items: center; font-size: 24px; color: #666;">+</div>
<div style="text-align: center;">
<div style="width: 70px; height: 70px; background: linear-gradient(145deg, #ffd700, #daa520); color: #333; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; box-shadow: 2px 2px 5px rgba(0,0,0,0.3);">1</div>
<div style="margin-top: 5px; font-size: 12px; color: #666;">Coin 3</div>
</div>
<div style="display: flex; align-items: center; font-size: 24px; color: #666;">=</div>
<div style="text-align: center;">
<div style="width: 80px; height: 80px; background: #28a745; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">11</div>
<div style="margin-top: 5px; font-size: 12px; color: #666;">Total</div>
</div>
</div>

### Decision Tree Visualization

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
<pre style="font-family: monospace; font-size: 14px;">
           (11, 3)
         /    |    \
       -1    -2    -5
       /      |      \
   (10,2)  (9,2)   (6,2)
   / | \   / | \   / | \
  .. .. .. .. .. (4,1)(5,1)
                  |     |
               (use 2) (use 5)
                  |     |
               dp[2]=T dp[0]=T
</pre>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>amount = 11, k = 3: Possible!</strong><br>
One solution: 5 + 5 + 1 = 11 (exactly 3 coins)
</div>

---

## Solution Approaches

### Approach 1: 2D Dynamic Programming

| Metric | Value |
|--------|-------|
| Time Complexity | O(amount * k * len(coins)) |
| Space Complexity | O(amount * k) |

**Strategy:** Track both amount and coin count in DP state.

### Approach 2: Space-Optimized DP

| Metric | Value |
|--------|-------|
| Time Complexity | O(amount * k * len(coins)) |
| Space Complexity | O(amount) |

**Strategy:** Since we only need the previous coin-count row, use rolling array.

### Approach 3: Memoization (Top-Down)

| Metric | Value |
|--------|-------|
| Time Complexity | O(amount * k * len(coins)) |
| Space Complexity | O(amount * k) |

**Strategy:** Recursive with memoization, may be more intuitive.

---

## Key Insights

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>1. Two-dimensional state:</strong> Unlike basic coin change, we need to track both the remaining amount AND the remaining coin count.
<br><br>
<strong>2. Constraint vs Optimization:</strong> This problem asks for feasibility with a constraint, not minimization.
<br><br>
<strong>3. Reconstruction:</strong> To find actual coins used, track which coin led to each True state.
</div>

---

## Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| 2D DP | O(n*k*c) | O(n*k) | Standard approach |
| Space-Optimized | O(n*k*c) | O(n) | Better memory |
| Memoization | O(n*k*c) | O(n*k) | Top-down, lazy eval |

Where n = amount, k = exact coin count, c = number of coin denominations.
