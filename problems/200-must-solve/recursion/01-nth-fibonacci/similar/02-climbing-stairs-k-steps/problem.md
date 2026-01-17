# Climbing Stairs with K Steps

**Difficulty:** Medium

## Problem Statement

You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 to k steps. In how many distinct ways can you climb to the top?

This is a generalization of the classic "Climbing Stairs" problem where you can take 1 or 2 steps.

## Examples

**Example 1:**
```
Input: n = 4, k = 2
Output: 5
Explanation: (1,1,1,1), (1,1,2), (1,2,1), (2,1,1), (2,2)
```

**Example 2:**
```
Input: n = 3, k = 3
Output: 4
Explanation: (1,1,1), (1,2), (2,1), (3)
```

**Example 3:**
```
Input: n = 5, k = 3
Output: 13
Explanation: Can take 1, 2, or 3 steps at a time
```

## Constraints

- 1 <= n <= 45
- 1 <= k <= n
- The answer fits in a 32-bit integer

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I reach step n?"

To reach step n, I must have come from one of the previous k steps:
- From step n-1 (took 1 step)
- From step n-2 (took 2 steps)
- ...
- From step n-k (took k steps)

### Step 2: Identify the Pattern

**Key insight:** This is a **generalized Fibonacci sequence**!

```
ways(n) = ways(n-1) + ways(n-2) + ... + ways(n-k)
```

| k Value | Recurrence | Special Name |
|---------|------------|--------------|
| k = 2 | F(n) = F(n-1) + F(n-2) | Fibonacci |
| k = 3 | T(n) = T(n-1) + T(n-2) + T(n-3) | Tribonacci |
| k = n | Sum of all previous | Powers of 2 |

### Step 3: Choose the Approach

**Sliding Window Optimization:**
- Instead of summing k values each time (O(k) per step)
- Maintain a running sum and update it in O(1)

---

## Visual Diagram: Recursion Tree

### For n=4, k=2 (Classic Climbing Stairs)

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>How many ways to reach step 4?</strong>
</div>

<!-- Level 0 -->
<div style="display: flex; justify-content: center; margin: 10px 0;">
  <div style="background: #dc3545; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold;">
    ways(4)
  </div>
</div>

<!-- Arrow -->
<div style="text-align: center; font-size: 14px; color: #6c757d; margin: 5px 0;">
  = ways(3) + ways(2)
</div>

<!-- Level 1 -->
<div style="display: flex; justify-content: center; gap: 60px; margin: 15px 0;">
  <div style="text-align: center;">
    <div style="background: #fd7e14; color: white; padding: 10px 20px; border-radius: 8px;">ways(3)</div>
    <div style="font-size: 12px; color: #6c757d; margin-top: 5px;">came from step 3</div>
  </div>
  <div style="text-align: center;">
    <div style="background: #fd7e14; color: white; padding: 10px 20px; border-radius: 8px;">ways(2)</div>
    <div style="font-size: 12px; color: #6c757d; margin-top: 5px;">came from step 2</div>
  </div>
</div>

<!-- Level 2 -->
<div style="display: flex; justify-content: center; gap: 20px; margin: 15px 0;">
  <div style="background: #ffc107; color: black; padding: 8px 16px; border-radius: 6px;">ways(2)</div>
  <div style="background: #ffc107; color: black; padding: 8px 16px; border-radius: 6px;">ways(1)</div>
  <div style="background: #ffc107; color: black; padding: 8px 16px; border-radius: 6px;">ways(1)</div>
  <div style="background: #ffc107; color: black; padding: 8px 16px; border-radius: 6px;">ways(0)</div>
</div>

<!-- Level 3 -->
<div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
  <div style="background: #28a745; color: white; padding: 6px 12px; border-radius: 5px;">1</div>
  <div style="background: #28a745; color: white; padding: 6px 12px; border-radius: 5px;">1</div>
  <div style="background: #28a745; color: white; padding: 6px 12px; border-radius: 5px;">1</div>
  <div style="background: #28a745; color: white; padding: 6px 12px; border-radius: 5px;">1</div>
  <div style="background: #28a745; color: white; padding: 6px 12px; border-radius: 5px;">1</div>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-top: 15px; text-align: center;">
<strong>Total: ways(4) = 5</strong>
</div>

</div>

### For n=3, k=3 (Tribonacci Pattern)

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>With k=3, we can jump 1, 2, or 3 steps:</strong>
</div>

<!-- Staircase visualization -->
<div style="display: flex; flex-direction: column; align-items: center; gap: 5px; margin: 20px 0;">
  <div style="display: flex; align-items: center; gap: 10px;">
    <div style="background: #28a745; color: white; padding: 15px 30px; border-radius: 5px; font-weight: bold;">Step 3 (TOP)</div>
    <div style="font-style: italic; color: #6c757d;">ways = 4</div>
  </div>
  <div style="display: flex; align-items: center; gap: 10px;">
    <div style="background: #007bff; color: white; padding: 15px 30px; border-radius: 5px;">Step 2</div>
    <div style="font-style: italic; color: #6c757d;">ways = 2</div>
  </div>
  <div style="display: flex; align-items: center; gap: 10px;">
    <div style="background: #007bff; color: white; padding: 15px 30px; border-radius: 5px;">Step 1</div>
    <div style="font-style: italic; color: #6c757d;">ways = 1</div>
  </div>
  <div style="display: flex; align-items: center; gap: 10px;">
    <div style="background: #6c757d; color: white; padding: 15px 30px; border-radius: 5px;">Ground (Step 0)</div>
    <div style="font-style: italic; color: #6c757d;">ways = 1</div>
  </div>
</div>

<div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin: 15px 0;">
<strong>Recurrence:</strong><br>
ways(3) = ways(2) + ways(1) + ways(0) = 2 + 1 + 1 = <strong>4</strong>
</div>

<div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 15px 0;">
  <div style="background: #d4edda; padding: 10px; border-radius: 5px; text-align: center;">
    <div style="font-weight: bold;">(1,1,1)</div>
    <div style="font-size: 12px;">3 single steps</div>
  </div>
  <div style="background: #d4edda; padding: 10px; border-radius: 5px; text-align: center;">
    <div style="font-weight: bold;">(1,2)</div>
    <div style="font-size: 12px;">1 then 2</div>
  </div>
  <div style="background: #d4edda; padding: 10px; border-radius: 5px; text-align: center;">
    <div style="font-weight: bold;">(2,1)</div>
    <div style="font-size: 12px;">2 then 1</div>
  </div>
  <div style="background: #d4edda; padding: 10px; border-radius: 5px; text-align: center;">
    <div style="font-weight: bold;">(3)</div>
    <div style="font-size: 12px;">one big jump</div>
  </div>
</div>

</div>

### Sliding Window Optimization

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>For n=5, k=3: Maintain window sum of last k values</strong>
</div>

<table style="border-collapse: collapse; margin: 20px auto; font-family: monospace;">
<tr style="background: #e9ecef;">
  <th style="border: 1px solid #dee2e6; padding: 10px;">Step i</th>
  <th style="border: 1px solid #dee2e6; padding: 10px;">Window [i-k..i-1]</th>
  <th style="border: 1px solid #dee2e6; padding: 10px;">Window Sum</th>
  <th style="border: 1px solid #dee2e6; padding: 10px;">ways[i]</th>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">0</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">-</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">-</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">1</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">[1]</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">1</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">[1, 1]</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">2</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">2</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">3</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">[1, 1, 2]</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">4</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">4</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">4</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">[1, 2, 4]</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">7</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #d4edda;">7</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">5</td>
  <td style="border: 1px solid #dee2e6; padding: 10px;">[2, 4, 7]</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">13</td>
  <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; background: #28a745; color: white; font-weight: bold;">13</td>
</tr>
</table>

<div style="background: #cce5ff; color: #004085; padding: 10px; border-radius: 5px; margin-top: 15px; text-align: center;">
<strong>Answer: 13 ways to climb 5 stairs with max 3 steps at a time</strong>
</div>

</div>

---

## Solution Approaches

### Approach 1: DP with Sliding Window (Optimal)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(k) |

**Why this is best:**
- Uses sliding window to maintain sum of last k values
- O(1) update per step instead of O(k)
- Space proportional to k, not n

### Approach 2: Standard DP Array

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * k) |
| Space Complexity | O(n) |

**When to use:** Simpler to implement, good for understanding.

### Approach 3: Memoization

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * k) |
| Space Complexity | O(n) |

**When to use:** Top-down thinking, recursive approach.

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| Sliding Window | O(n) | O(k) | Production |
| DP Array | O(n*k) | O(n) | Learning |
| Memoization | O(n*k) | O(n) | Intuition |
| Naive Recursion | O(k^n) | O(n) | Never |
