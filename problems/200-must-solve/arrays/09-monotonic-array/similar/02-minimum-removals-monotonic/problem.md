# Minimum Removals for Monotonic Array

**Difficulty:** Hard

## Problem Statement

Given an array of integers, find the minimum number of elements that must be removed to make the array monotonic (either entirely non-increasing or entirely non-decreasing).

This is equivalent to finding the **Longest Monotonic Subsequence** and subtracting from array length.

## Examples

**Example 1:**
```
Input: array = [1, 3, 2, 4, 5, 3]
Output: 2
Explanation: Remove 3 and 3 to get [1, 2, 4, 5] (non-decreasing)
             Or remove 1, 2, 5 to get [3, 4, 3] - wait, that's not monotonic
             Best: Remove 2 elements for [1, 2, 4, 5]
```

**Example 2:**
```
Input: array = [5, 4, 3, 2, 1]
Output: 0
Explanation: Already monotonic (non-increasing)
```

**Example 3:**
```
Input: array = [1, 2, 1, 2, 1]
Output: 2
Explanation: Remove two 1s to get [1, 2, 2] or remove 2s to get [1, 1, 1]
```

## Constraints

- Array length >= 1
- Elements can be any integers
- Result is always n - LMS where LMS = Longest Monotonic Subsequence

---

## Thought Process & Pattern Recognition

### Step 1: Transform the Problem

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Key Insight:</strong><br>
Minimum removals = n - (Longest Subsequence that is already monotonic)<br>
This is the <strong>Longest Increasing Subsequence (LIS)</strong> or <strong>Longest Decreasing Subsequence (LDS)</strong> problem!
</div>

### Step 2: Why LIS/LDS?

- A subsequence doesn't need to be contiguous
- We want to keep as many elements as possible
- The elements we keep must be monotonic
- So we want the **longest monotonic subsequence**

### Step 3: Algorithm Choice

For this problem, we need:
1. Longest Non-Decreasing Subsequence (LNDS)
2. Longest Non-Increasing Subsequence (LNIS)
3. Return `n - max(LNDS, LNIS)`

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>array = [1, 3, 2, 4, 5, 3]</code>
</div>

### Finding Longest Non-Decreasing Subsequence

**Step 1:** Build DP table where dp[i] = length of LNDS ending at index i

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
dp[0] = 1 (just element 1)
</div>

---

**Step 2:** Process index 1 (value = 3)

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
3 >= 1: Can extend from index 0. dp[1] = dp[0] + 1 = 2<br>
Subsequence: [1, 3]
</div>

---

**Step 3:** Process index 2 (value = 2)

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
2 >= 1: Can extend from index 0. dp[2] = 2<br>
2 < 3: Cannot extend from index 1<br>
Subsequence: [1, 2]
</div>

---

**Step 4:** Process remaining indices

<table style="border-collapse: collapse; margin: 20px 0; width: 100%;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">Index</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Value</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">dp[i]</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Best Subsequence Ending Here</th>
</tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">0</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">[1]</td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">[1, 3]</td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">[1, 2]</td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">4</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">[1, 3, 4] or [1, 2, 4]</td></tr>
<tr style="background: #d4edda;"><td style="border: 1px solid #dee2e6; padding: 10px;">4</td><td style="border: 1px solid #dee2e6; padding: 10px;">5</td><td style="border: 1px solid #dee2e6; padding: 10px;"><strong>4</strong></td><td style="border: 1px solid #dee2e6; padding: 10px;"><strong>[1, 2, 4, 5]</strong></td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">5</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">[1, 2, 3]</td></tr>
</table>

### Calculate Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0;">
<strong>LNDS = 4</strong> (subsequence [1, 2, 4, 5])<br>
<strong>Array length = 6</strong><br>
<strong>Minimum removals = 6 - 4 = 2</strong>
</div>

### Visualizing Removals

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1 (keep)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">3 (remove)</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">2 (keep)</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">4 (keep)</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">5 (keep)</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">3 (remove)</span>
</div>

---

## Solution Approaches

### Approach 1: O(n^2) DP (Straightforward)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(n) |

**Why use this:**
- Easy to understand
- Works for all cases
- Good for interviews to explain

### Approach 2: O(n log n) Binary Search

| Metric | Value |
|--------|-------|
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |

**When to use:**
- Large arrays
- Performance critical
- Uses patience sorting / binary search

---

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| O(n^2) DP | O(n^2) | O(n) | Small arrays, interviews |
| Binary Search | O(n log n) | O(n) | Large arrays |
