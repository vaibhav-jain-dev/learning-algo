# Perfect Squares

**Difficulty:** Medium

## Problem Statement

Given an integer `n`, return the **least number of perfect square numbers** that sum to `n`.

A **perfect square** is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

## Examples

**Example 1:**
```
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4
```

**Example 2:**
```
Input: n = 13
Output: 2
Explanation: 13 = 4 + 9
```

## Constraints

- 1 <= n <= 10^4

---

## Thought Process & Pattern Recognition

### Step 1: Recognize the Pattern

**Question:** "How is this related to Coin Change?"

This is **exactly** the Coin Change (minimum coins) problem where:
- "Coins" = perfect squares {1, 4, 9, 16, 25, ...}
- "Target amount" = n
- "Minimum coins" = minimum perfect squares

### Step 2: Generate the "Coins"

Perfect squares up to n: {1, 4, 9, 16, ...} where i^2 <= n

### Step 3: Define the Recurrence

```
dp[0] = 0  (0 squares needed for sum 0)
dp[i] = min(dp[i - square] + 1) for all squares <= i
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>n = 12</code>
</div>

### Available Perfect Squares

<div style="display: flex; gap: 15px; margin: 20px 0; flex-wrap: wrap;">
<div style="text-align: center; padding: 15px 25px; background: #cce5ff; border-radius: 10px;">
<div style="font-size: 24px; font-weight: bold;">1</div>
<div style="font-size: 12px; color: #666;">1<sup>2</sup></div>
</div>
<div style="text-align: center; padding: 15px 25px; background: #cce5ff; border-radius: 10px;">
<div style="font-size: 24px; font-weight: bold;">4</div>
<div style="font-size: 12px; color: #666;">2<sup>2</sup></div>
</div>
<div style="text-align: center; padding: 15px 25px; background: #cce5ff; border-radius: 10px;">
<div style="font-size: 24px; font-weight: bold;">9</div>
<div style="font-size: 12px; color: #666;">3<sup>2</sup></div>
</div>
<div style="text-align: center; padding: 15px 25px; background: #6c757d; color: white; border-radius: 10px; opacity: 0.5;">
<div style="font-size: 24px; font-weight: bold;">16</div>
<div style="font-size: 12px;">4<sup>2</sup> > 12</div>
</div>
</div>

### DP Table Construction

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">n</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">0</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">1</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">2</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">3</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">4</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">5</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">6</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">7</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">8</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">9</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">10</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">11</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">12</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>dp</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">0</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;"><strong>3</strong></td>
</tr>
</table>

### Step-by-Step Calculation

<div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">

**dp[4]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
Use 4: dp[4-4] + 1 = dp[0] + 1 = <strong>1</strong>
<div style="color: #155724; font-size: 12px;">4 = 4 (one square)</div>
</div>

**dp[8]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
Use 1: dp[7] + 1 = 5<br>
Use 4: dp[4] + 1 = <strong>2</strong>
<div style="color: #155724; font-size: 12px;">8 = 4 + 4 (two squares)</div>
</div>

**dp[12]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
Use 1: dp[11] + 1 = 4<br>
Use 4: dp[8] + 1 = <strong>3</strong><br>
Use 9: dp[3] + 1 = 4
<div style="color: #155724; font-size: 12px;">12 = 4 + 4 + 4 (three squares)</div>
</div>

</div>

### Visualization: Solution for n = 12

<div style="display: flex; justify-content: center; gap: 20px; margin: 30px 0; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="width: 80px; height: 80px; background: #007bff; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">4</div>
<div style="margin-top: 5px;">2<sup>2</sup></div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">+</div>
<div style="text-align: center;">
<div style="width: 80px; height: 80px; background: #007bff; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">4</div>
<div style="margin-top: 5px;">2<sup>2</sup></div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">+</div>
<div style="text-align: center;">
<div style="width: 80px; height: 80px; background: #007bff; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">4</div>
<div style="margin-top: 5px;">2<sup>2</sup></div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">=</div>
<div style="text-align: center;">
<div style="width: 80px; height: 80px; background: #28a745; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">12</div>
</div>
</div>

### Comparison: n = 13

<div style="display: flex; justify-content: center; gap: 20px; margin: 30px 0; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="width: 80px; height: 80px; background: #007bff; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">4</div>
<div style="margin-top: 5px;">2<sup>2</sup></div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">+</div>
<div style="text-align: center;">
<div style="width: 80px; height: 80px; background: #dc3545; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">9</div>
<div style="margin-top: 5px;">3<sup>2</sup></div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">=</div>
<div style="text-align: center;">
<div style="width: 80px; height: 80px; background: #28a745; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">13</div>
</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; text-align: center;">
13 = 4 + 9 uses only <strong>2 squares</strong>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>n = 12: Answer = 3</strong> (12 = 4 + 4 + 4)
</div>

---

## Solution Approaches

### Approach 1: Bottom-Up DP

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * sqrt(n)) |
| Space Complexity | O(n) |

**Strategy:** Standard coin change approach with perfect squares as coins.

### Approach 2: BFS (Level-by-Level)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * sqrt(n)) |
| Space Complexity | O(n) |

**Strategy:** BFS finds shortest path (minimum squares).

### Approach 3: Mathematical (Lagrange's Four Square Theorem)

| Metric | Value |
|--------|-------|
| Time Complexity | O(sqrt(n)) |
| Space Complexity | O(1) |

**Strategy:** Use number theory - every number is sum of at most 4 squares.

---

## Mathematical Insight: Lagrange's Four Square Theorem

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Theorem:</strong> Every positive integer can be expressed as the sum of at most four perfect squares.
<br><br>
<strong>Corollary:</strong> Answer is always 1, 2, 3, or 4.
<br><br>
<strong>Special case (Legendre):</strong> A number n can be expressed as sum of three squares if and only if n is NOT of the form 4^a(8b + 7).
</div>

---

## Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| DP | O(n * sqrt(n)) | O(n) | Standard approach |
| BFS | O(n * sqrt(n)) | O(n) | Level = min squares |
| Math | O(sqrt(n)) | O(1) | Optimal, needs theory |
