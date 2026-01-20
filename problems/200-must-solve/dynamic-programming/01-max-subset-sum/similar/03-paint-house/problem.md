<div id="viz-config" style="display:none">
{"name":"Paint House","algorithm":"dp-max-subset","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"costs":[[17,2,17],[16,16,5],[14,3,19]]},"output":10,"inputRaw":"costs = [[17,2,17],[16,16,5],[14,3,19]]","outputRaw":"10"},{"input":{"costs":[[7,6,2]]},"output":2,"inputRaw":"costs = [[7,6,2]]","outputRaw":"2"}]}
</div>

# Paint House

**Difficulty:** Medium

## Problem Statement

There is a row of `n` houses, where each house can be painted one of three colors: red, blue, or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that **no two adjacent houses have the same color**.

Given a 2D array `costs` where `costs[i][j]` is the cost of painting house `i` with color `j`:
- `costs[i][0]` = cost to paint house `i` red
- `costs[i][1]` = cost to paint house `i` blue
- `costs[i][2]` = cost to paint house `i` green

Return the **minimum cost** to paint all houses.

## Examples

**Example 1:**
```
Input: costs = [[17,2,17],[16,16,5],[14,3,19]]
Output: 10
Explanation: Paint house 0 blue, house 1 green, house 2 blue.
Minimum cost = 2 + 5 + 3 = 10.
```

**Example 2:**
```
Input: costs = [[7,6,2]]
Output: 2
```

## Constraints

- costs.length == n
- costs[i].length == 3
- 1 <= n <= 100
- 1 <= costs[i][j] <= 20

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "What decisions do I make at each house?"

For each house, I choose one of three colors. The constraint is:
- My choice depends on the PREVIOUS house's color (can't be the same)

### Step 2: Identify the Pattern

**Key insight:** This is a variation of "no adjacent same" but with multiple states (colors) instead of binary take/skip.

We need to track the MINIMUM COST to reach each house with each color.

### Step 3: Define the Recurrence

```
dp[i][0] = cost[i][0] + min(dp[i-1][1], dp[i-1][2])  // Paint red
dp[i][1] = cost[i][1] + min(dp[i-1][0], dp[i-1][2])  // Paint blue
dp[i][2] = cost[i][2] + min(dp[i-1][0], dp[i-1][1])  // Paint green
```

Answer = `min(dp[n-1][0], dp[n-1][1], dp[n-1][2])`

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>costs = [[17,2,17],[16,16,5],[14,3,19]]</code>
</div>

### Cost Matrix Visualization

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 12px;">House</th>
<th style="border: 1px solid #dee2e6; padding: 12px; background: #f8d7da;">Red</th>
<th style="border: 1px solid #dee2e6; padding: 12px; background: #cce5ff;">Blue</th>
<th style="border: 1px solid #dee2e6; padding: 12px; background: #d4edda;">Green</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;"><strong>0</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #f8d7da;">17</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #cce5ff;"><strong>2</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">17</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;"><strong>1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #f8d7da;">16</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #cce5ff;">16</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;"><strong>5</strong></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;"><strong>2</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #f8d7da;">14</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #cce5ff;"><strong>3</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">19</td>
</tr>
</table>

### DP Table Construction

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>dp[i][c]</strong> = minimum cost to paint houses 0 to i, where house i has color c
</div>

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 12px;">House</th>
<th style="border: 1px solid #dee2e6; padding: 12px; background: #f8d7da;">dp[Red]</th>
<th style="border: 1px solid #dee2e6; padding: 12px; background: #cce5ff;">dp[Blue]</th>
<th style="border: 1px solid #dee2e6; padding: 12px; background: #d4edda;">dp[Green]</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;"><strong>0</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #f8d7da;">17</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #cce5ff;"><strong>2</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">17</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;"><strong>1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #f8d7da;">18</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #cce5ff;">33</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;"><strong>7</strong></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;"><strong>2</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #f8d7da;">21</td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #cce5ff;"><strong>10</strong></td>
<td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">37</td>
</tr>
</table>

### Step-by-Step Calculation

<div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">

**House 0 (Base Case):**
<div style="margin-left: 20px; margin-top: 10px;">
<div style="display: flex; gap: 20px; flex-wrap: wrap;">
<span style="background: #f8d7da; padding: 5px 15px; border-radius: 5px;">dp[0][R] = 17</span>
<span style="background: #cce5ff; padding: 5px 15px; border-radius: 5px;">dp[0][B] = 2</span>
<span style="background: #d4edda; padding: 5px 15px; border-radius: 5px;">dp[0][G] = 17</span>
</div>
</div>

**House 1:**
<div style="margin-left: 20px; margin-top: 10px;">
<div style="background: #f8d7da; padding: 8px; border-radius: 5px; margin: 5px 0;">
dp[1][R] = 16 + min(dp[0][B], dp[0][G]) = 16 + min(2, 17) = <strong>18</strong>
</div>
<div style="background: #cce5ff; padding: 8px; border-radius: 5px; margin: 5px 0;">
dp[1][B] = 16 + min(dp[0][R], dp[0][G]) = 16 + min(17, 17) = <strong>33</strong>
</div>
<div style="background: #d4edda; padding: 8px; border-radius: 5px; margin: 5px 0;">
dp[1][G] = 5 + min(dp[0][R], dp[0][B]) = 5 + min(17, 2) = <strong>7</strong>
</div>
</div>

**House 2:**
<div style="margin-left: 20px; margin-top: 10px;">
<div style="background: #f8d7da; padding: 8px; border-radius: 5px; margin: 5px 0;">
dp[2][R] = 14 + min(dp[1][B], dp[1][G]) = 14 + min(33, 7) = <strong>21</strong>
</div>
<div style="background: #cce5ff; padding: 8px; border-radius: 5px; margin: 5px 0;">
dp[2][B] = 3 + min(dp[1][R], dp[1][G]) = 3 + min(18, 7) = <strong>10</strong>
</div>
<div style="background: #d4edda; padding: 8px; border-radius: 5px; margin: 5px 0;">
dp[2][G] = 19 + min(dp[1][R], dp[1][B]) = 19 + min(18, 33) = <strong>37</strong>
</div>
</div>

</div>

### Optimal Path Visualization

<div style="display: flex; justify-content: center; gap: 30px; margin: 30px 0; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="width: 60px; height: 80px; background: #cce5ff; border: 3px solid #004085; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
<div style="margin-top: 5px;">House 0<br><small>Blue</small></div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">→</div>
<div style="text-align: center;">
<div style="width: 60px; height: 80px; background: #d4edda; border: 3px solid #155724; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;">5</div>
<div style="margin-top: 5px;">House 1<br><small>Green</small></div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">→</div>
<div style="text-align: center;">
<div style="width: 60px; height: 80px; background: #cce5ff; border: 3px solid #004085; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
<div style="margin-top: 5px;">House 2<br><small>Blue</small></div>
</div>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Minimum Cost = min(21, 10, 37) = 10</strong>
<br>
<small>Path: Blue(2) → Green(5) → Blue(3)</small>
</div>

---

## Solution Approaches

### Approach 1: DP with O(n) Space

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) or O(1) with optimization |

**Strategy:** Track minimum cost for each color at each house.

### Approach 2: Space-Optimized DP

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Strategy:** Only keep previous house's costs (3 variables).

---

## Extension: Paint House II (K Colors)

When there are K colors, a naive approach is O(n*k^2).

**Optimization:** For each house, we only need:
- The minimum cost from previous house
- The second minimum cost (in case the min color is the same)

This reduces to O(n*k) time complexity.

---

## Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Full DP Table | O(n*k) | O(n*k) | Easy to trace path |
| Space-Optimized | O(n*k) | O(k) | Just keep prev row |
| K Colors Optimized | O(n*k) | O(1) | Track min and 2nd min |
