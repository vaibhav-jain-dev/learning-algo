<div id="viz-config" style="display:none">
{"name":"Integer Break","algorithm":"dp-coin-change","complexity":{"time":"O(n^2)","space":"O(n)"},"examples":[{"input":{"n":2},"output":1,"inputRaw":"n = 2","outputRaw":"1"},{"input":{"n":10},"output":36,"inputRaw":"n = 10","outputRaw":"36"},{"input":{"n":8},"output":18,"inputRaw":"n = 8","outputRaw":"18"}]}
</div>

# Integer Break

**Difficulty:** Medium

## Problem Statement

Given a positive integer `n`, break it into the sum of **at least two** positive integers and maximize the product of those integers. Return the **maximum product** you can get.

## Examples

**Example 1:**
```
Input: n = 2
Output: 1
Explanation: 2 = 1 + 1, 1 x 1 = 1
```

**Example 2:**
```
Input: n = 10
Output: 36
Explanation: 10 = 3 + 3 + 4, 3 x 3 x 4 = 36
```

**Example 3:**
```
Input: n = 8
Output: 18
Explanation: 8 = 2 + 3 + 3, 2 x 3 x 3 = 18
```

## Constraints

- 2 <= n <= 58

---

## Thought Process & Pattern Recognition

### Step 1: Recognize the Pattern

**Question:** "How is this related to Coin Change?"

This is a **maximization** variant where:
- Instead of summing to a target with minimum items, we're breaking into parts
- Instead of counting coins, we're multiplying the parts
- Both use bottom-up DP building from smaller subproblems

### Step 2: The Key Mathematical Insight

The optimal strategy is to use as many **3s** as possible, with some **2s** for adjustment:
- Breaking into 1s is never optimal (1 doesn't contribute to product)
- 4 = 2 x 2 (breaking 4 gives same result as keeping it)
- 5 = 2 + 3 -> 2 x 3 = 6 > 5
- 6 = 3 + 3 -> 3 x 3 = 9 > 6

### Step 3: Define the Recurrence

```
dp[n] = max product when breaking n
dp[i] = max(j * (i-j), j * dp[i-j]) for j = 1 to i-1
```

The two cases:
- `j * (i-j)`: Don't break (i-j) further
- `j * dp[i-j]`: Break (i-j) further for potentially better product

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>n = 10</code>
</div>

### Breaking Down the Problem

<div style="display: flex; gap: 15px; margin: 20px 0; flex-wrap: wrap; justify-content: center;">
<div style="text-align: center; padding: 20px; background: #007bff; color: white; border-radius: 10px; min-width: 100px;">
<div style="font-size: 32px; font-weight: bold;">10</div>
<div style="font-size: 12px;">Target</div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">=</div>
<div style="text-align: center; padding: 20px; background: #28a745; color: white; border-radius: 10px; min-width: 60px;">
<div style="font-size: 24px; font-weight: bold;">3</div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">+</div>
<div style="text-align: center; padding: 20px; background: #28a745; color: white; border-radius: 10px; min-width: 60px;">
<div style="font-size: 24px; font-weight: bold;">3</div>
</div>
<div style="display: flex; align-items: center; font-size: 24px;">+</div>
<div style="text-align: center; padding: 20px; background: #ffc107; color: #333; border-radius: 10px; min-width: 60px;">
<div style="font-size: 24px; font-weight: bold;">4</div>
</div>
</div>

### DP Table Construction

<table style="border-collapse: collapse; margin: 20px 0; font-family: monospace;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">n</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">2</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">3</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">4</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">5</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">6</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">7</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">8</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">9</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">10</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>dp[n]</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">4</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">6</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">9</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">12</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">18</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">27</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;"><strong>36</strong></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px; background: #e9ecef;"><strong>Best Split</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; font-size: 12px;">1+1</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; font-size: 12px;">1+2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; font-size: 12px;">2+2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; font-size: 12px;">2+3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; font-size: 12px;">3+3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; font-size: 12px;">3+4</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; font-size: 12px;">3+3+2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; font-size: 12px;">3+3+3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; font-size: 12px;">3+3+4</td>
</tr>
</table>

### Step-by-Step Calculation

<div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">

**dp[2]:** Must break: 2 = 1 + 1 -> 1 x 1 = <strong>1</strong>

**dp[3]:** 3 = 1 + 2 -> 1 x 2 = <strong>2</strong>

**dp[4]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
j=1: max(1x3, 1xdp[3]) = max(3, 2) = 3<br>
j=2: max(2x2, 2xdp[2]) = max(4, 2) = <strong>4</strong>
</div>

**dp[6]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
j=1: max(1x5, 1xdp[5]) = max(5, 6) = 6<br>
j=2: max(2x4, 2xdp[4]) = max(8, 8) = 8<br>
j=3: max(3x3, 3xdp[3]) = max(9, 6) = <strong>9</strong>
</div>

**dp[10]:**
<div style="margin-left: 20px; background: #fff; padding: 10px; border-radius: 5px; margin: 5px 0;">
j=3: max(3x7, 3xdp[7]) = max(21, 36) = <strong>36</strong>
<div style="color: #155724; font-size: 12px;">10 = 3 + 7 -> 3 x dp[7] = 3 x 12 = 36</div>
<div style="color: #155724; font-size: 12px;">Where dp[7] = 12 from 3 x 4</div>
</div>

</div>

### Why 3s Are Optimal

<div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
<div style="flex: 1; min-width: 200px; padding: 15px; background: #f8d7da; border-radius: 8px;">
<strong style="color: #721c24;">Bad: Using 1s</strong>
<div style="margin-top: 10px;">
6 = 1+1+1+1+1+1<br>
Product: 1<br>
<span style="color: #dc3545;">1s kill the product!</span>
</div>
</div>
<div style="flex: 1; min-width: 200px; padding: 15px; background: #fff3cd; border-radius: 8px;">
<strong style="color: #856404;">OK: Using 2s</strong>
<div style="margin-top: 10px;">
6 = 2+2+2<br>
Product: 8<br>
<span style="color: #856404;">Decent but not optimal</span>
</div>
</div>
<div style="flex: 1; min-width: 200px; padding: 15px; background: #d4edda; border-radius: 8px;">
<strong style="color: #155724;">Best: Using 3s</strong>
<div style="margin-top: 10px;">
6 = 3+3<br>
Product: 9<br>
<span style="color: #28a745;">3s maximize product!</span>
</div>
</div>
</div>

### Visualization: Product Comparison for n = 10

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
<table style="border-collapse: collapse; width: 100%;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Split</th>
<th style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">Product</th>
<th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Calculation</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">5 + 5</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">25</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">5 x 5</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">2 + 2 + 2 + 2 + 2</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">32</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">2^5</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 10px;">2 + 2 + 3 + 3</td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #cce5ff;">36</td>
<td style="border: 1px solid #dee2e6; padding: 10px;">2 x 2 x 3 x 3</td>
</tr>
<tr style="background: #d4edda;">
<td style="border: 1px solid #dee2e6; padding: 10px;"><strong>3 + 3 + 4</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;"><strong>36</strong></td>
<td style="border: 1px solid #dee2e6; padding: 10px;"><strong>3 x 3 x 4</strong></td>
</tr>
</table>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>n = 10: Maximum Product = 36</strong><br>
Split: 10 = 3 + 3 + 4 -> 3 x 3 x 4 = 36
</div>

---

## Solution Approaches

### Approach 1: Bottom-Up DP

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(n) |

**Strategy:** Build up from smaller numbers, trying all possible first splits.

### Approach 2: Mathematical (Greedy with 3s)

| Metric | Value |
|--------|-------|
| Time Complexity | O(log n) for exponentiation, O(1) otherwise |
| Space Complexity | O(1) |

**Strategy:** Use mathematical insight - maximize 3s, adjust with 2s.

### Approach 3: Memoization (Top-Down)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(n) |

**Strategy:** Recursive with memoization, more intuitive for some.

---

## Mathematical Proof: Why 3s?

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Calculus Approach:</strong><br>
For breaking n into k equal parts: each part = n/k<br>
Product = (n/k)^k<br>
Taking derivative and setting to 0: optimal k gives part size e (approximately 2.718)<br>
Since we need integers: 3 is closest to e and better than 2.<br><br>
<strong>Comparison:</strong>
<ul style="margin-top: 10px;">
<li>2^3 = 8 for sum 6</li>
<li>3^2 = 9 for sum 6</li>
<li>3 > 2 when comparing products for same sum</li>
</ul>
</div>

---

## Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| DP | O(n^2) | O(n) | Standard, works for all |
| Math | O(1) or O(log n) | O(1) | Fastest, needs insight |
| Memoization | O(n^2) | O(n) | Top-down alternative |
