# Count Number of Peaks

**Difficulty:** Medium

## Problem Statement

Given an array of integers, count the total number of valid peaks. A peak is an element that is strictly greater than both its neighbors. Edge elements cannot be peaks.

## Examples

**Example 1:**
```
Input: array = [1, 3, 2, 4, 1, 5, 2]
Output: 3
Explanation: Peaks at indices 1 (3), 3 (4), and 5 (5)
```

**Example 2:**
```
Input: array = [1, 2, 3, 4, 5]
Output: 0
Explanation: No element is greater than both neighbors
```

**Example 3:**
```
Input: array = [5, 4, 3, 4, 5]
Output: 0
Explanation: 5 at index 4 is at the edge, not a valid peak
```

## Constraints

- Array length >= 1
- Peak requires at least 3 elements (peak and both neighbors)

---

## Visual Diagram: How It Works

### Input: [1, 3, 2, 4, 1, 5, 2]

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: flex-end;">
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin-bottom: 5px;">1</span>
<small>i=0</small>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; margin-bottom: 5px;">3 (peak)</span>
<small>i=1</small>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin-bottom: 5px;">2</span>
<small>i=2</small>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; margin-bottom: 5px;">4 (peak)</span>
<small>i=3</small>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin-bottom: 5px;">1</span>
<small>i=4</small>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; margin-bottom: 5px;">5 (peak)</span>
<small>i=5</small>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<span style="background: #6c757d; color: white; padding: 8px 15px; border-radius: 5px; margin-bottom: 5px;">2</span>
<small>i=6</small>
</div>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
<strong>Peak conditions:</strong> arr[i] > arr[i-1] AND arr[i] > arr[i+1]
</div>

### Step-by-Step Counting

<table style="border-collapse: collapse; margin: 20px 0;">
<tr style="background: #e9ecef;">
<th style="border: 1px solid #dee2e6; padding: 10px;">Index</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Value</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Left</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Right</th>
<th style="border: 1px solid #dee2e6; padding: 10px;">Is Peak?</th>
</tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">0</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">-</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">No (edge)</td></tr>
<tr style="background: #d4edda;"><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;"><strong>Yes</strong></td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">4</td><td style="border: 1px solid #dee2e6; padding: 10px;">No</td></tr>
<tr style="background: #d4edda;"><td style="border: 1px solid #dee2e6; padding: 10px;">3</td><td style="border: 1px solid #dee2e6; padding: 10px;">4</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;"><strong>Yes</strong></td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">4</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">4</td><td style="border: 1px solid #dee2e6; padding: 10px;">5</td><td style="border: 1px solid #dee2e6; padding: 10px;">No</td></tr>
<tr style="background: #d4edda;"><td style="border: 1px solid #dee2e6; padding: 10px;">5</td><td style="border: 1px solid #dee2e6; padding: 10px;">5</td><td style="border: 1px solid #dee2e6; padding: 10px;">1</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;"><strong>Yes</strong></td></tr>
<tr><td style="border: 1px solid #dee2e6; padding: 10px;">6</td><td style="border: 1px solid #dee2e6; padding: 10px;">2</td><td style="border: 1px solid #dee2e6; padding: 10px;">5</td><td style="border: 1px solid #dee2e6; padding: 10px;">-</td><td style="border: 1px solid #dee2e6; padding: 10px;">No (edge)</td></tr>
</table>

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: 3</strong><br>
Peaks at indices 1, 3, 5
</div>

---

## Solution Approaches

### Approach 1: Single Pass (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Algorithm:**
```python
count = 0
for i in range(1, n-1):
    if arr[i] > arr[i-1] and arr[i] > arr[i+1]:
        count += 1
return count
```
