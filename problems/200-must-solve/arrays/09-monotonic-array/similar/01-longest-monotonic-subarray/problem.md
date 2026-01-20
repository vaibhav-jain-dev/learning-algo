# Longest Monotonic Subarray

**Difficulty:** Medium

## Problem Statement

Given an array of integers, find the length of the longest **contiguous** subarray that is monotonic (either entirely non-increasing or entirely non-decreasing).

## Examples

**Example 1:**
```
Input: array = [1, 4, 3, 2, 5, 6, 7]
Output: 4
Explanation: Subarray [2, 5, 6, 7] is non-decreasing with length 4
```

**Example 2:**
```
Input: array = [5, 4, 3, 2, 1]
Output: 5
Explanation: The entire array is non-increasing
```

**Example 3:**
```
Input: array = [1, 2, 2, 3, 1]
Output: 4
Explanation: Subarray [1, 2, 2, 3] is non-decreasing
```

## Constraints

- Array length >= 1
- Elements can be any integers
- Equal consecutive elements are allowed in monotonic sequences

---

## Thought Process & Pattern Recognition

### Step 1: Understanding Monotonic Subarrays

A subarray is monotonic if it's:
- **Non-decreasing:** Each element >= previous (can have equals)
- **Non-increasing:** Each element <= previous (can have equals)

### Step 2: The Sliding Window / Expansion Pattern

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Key Insight:</strong> Track the longest non-decreasing AND non-increasing sequences ending at each position. The answer is the maximum of all these lengths.
</div>

### Step 3: One Pass Solution

For each element, track:
- Length of non-decreasing sequence ending here
- Length of non-increasing sequence ending here
- Update global maximum

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>array = [1, 4, 3, 2, 5, 6, 7]</code>
</div>

### Step-by-Step Analysis

**Index 0:** Value = 1

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">7</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
inc_len = 1, dec_len = 1, max = 1
</div>

---

**Index 1:** Value = 4 (4 > 1)

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">7</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
4 > 1: Continues increasing! inc_len = 2, dec_len = 1, max = 2
</div>

---

**Index 2:** Value = 3 (3 < 4)

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">7</span>
</div>

<div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0;">
3 < 4: Decreasing starts! inc_len = 1, dec_len = 2, max = 2
</div>

---

**Index 3:** Value = 2 (2 < 3)

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">7</span>
</div>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
2 < 3: Continues decreasing! inc_len = 1, dec_len = 3, max = 3
</div>

---

**Index 4:** Value = 5 (5 > 2)

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">7</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
5 > 2: Increasing restarts! inc_len = 2, dec_len = 1, max = 3
</div>

---

**Index 5:** Value = 6 (6 > 5)

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">7</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
6 > 5: Continues increasing! inc_len = 3, dec_len = 1, max = 3
</div>

---

**Index 6:** Value = 7 (7 > 6)

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">5</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #007bff; color: white; padding: 8px 15px; border-radius: 5px;">7</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
7 > 6: Continues increasing! inc_len = 4, dec_len = 1, <strong>max = 4</strong>
</div>

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Longest Monotonic Subarray: [2, 5, 6, 7]</strong><br>
<strong>Length = 4</strong>
</div>

---

## Algorithm State Tracking

<table style="border-collapse: collapse; margin: 20px 0; width: 100%;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">Index</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Value</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">inc_len</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">dec_len</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">max</th>
</tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">0</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">4</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">4</td><td style="border: 1px solid #dee2e6; padding: 10px;">5</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">5</td><td style="border: 1px solid #dee2e6; padding: 10px;">6</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td></tr>
<tr style="background: #d4edda;"><td style="border: 1px solid #dee2e6; padding: 10px;">6</td><td style="border: 1px solid #dee2e6; padding: 10px;">7</td><td style="border: 1px solid #dee2e6; padding: 10px;">4</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;"><strong>4</strong></td></tr>
</table>

---

## Solution Approaches

### Approach 1: Single Pass (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Why this is best:**
- Single pass through array
- Constant extra space
- Simple state tracking

### Approach 2: Two Separate Passes

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**How it works:**
1. First pass: find longest non-decreasing
2. Second pass: find longest non-increasing
3. Return maximum

---

## Complexity Comparison

| Approach | Time | Space | Passes |
|----------|------|-------|--------|
| Single Pass | O(n) | O(1) | 1 |
| Two Passes | O(n) | O(1) | 2 |
| DP Array | O(n) | O(n) | 1 |
