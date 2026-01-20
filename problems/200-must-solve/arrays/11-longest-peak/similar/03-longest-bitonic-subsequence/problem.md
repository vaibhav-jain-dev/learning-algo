# Longest Bitonic Subsequence

**Difficulty:** Hard

## Problem Statement

Given an array of integers, find the length of the longest bitonic subsequence. A bitonic subsequence first increases then decreases (not necessarily contiguous).

## Examples

**Example 1:**
```
Input: array = [1, 11, 2, 10, 4, 5, 2, 1]
Output: 6
Explanation: [1, 2, 10, 4, 2, 1] or [1, 2, 4, 5, 2, 1]
```

**Example 2:**
```
Input: array = [1, 2, 3, 4, 5]
Output: 5
Explanation: Entire array is increasing (degenerate bitonic)
```

## Constraints

- Array length >= 1
- A strictly increasing or decreasing sequence is also bitonic

---

## Visual Diagram: How It Works

### Input: [1, 11, 2, 10, 4, 5, 2, 1]

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Strategy:</strong> For each index i as the "peak":<br>
- Find LIS ending at i (from left)<br>
- Find LDS starting at i (to right)<br>
- Bitonic length = LIS[i] + LDS[i] - 1
</div>

### LIS from Left (Longest Increasing Subsequence ending at i)

<table style="border-collapse: collapse; margin: 20px 0;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 8px;">Index</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">0</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">1</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">2</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">3</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">4</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">5</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">6</th>
<th style="border: 1px solid #dee2e6; padding: 8px;">7</th>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 8px;">Value</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">1</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">11</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">2</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">10</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">4</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">5</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">2</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">1</td>
</tr>
<tr style="background: #d4edda;">
<td style="border: 1px solid #dee2e6; padding: 8px;">LIS</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">1</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">2</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">2</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">3</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">3</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">4</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">2</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">1</td>
</tr>
</table>

### LDS from Right (Longest Decreasing Subsequence starting at i)

<table style="border-collapse: collapse; margin: 20px 0;">
<tr style="background: #fff3cd;">
<td style="border: 1px solid #dee2e6; padding: 8px;">LDS</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">1</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">5</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">2</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">4</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">3</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">3</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">2</td>
<td style="border: 1px solid #dee2e6; padding: 8px;">1</td>
</tr>
</table>

### Bitonic = LIS + LDS - 1

<div style="background: #cce5ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
Maximum at index 5: LIS[5] + LDS[5] - 1 = 4 + 3 - 1 = <strong>6</strong>
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(n) |
