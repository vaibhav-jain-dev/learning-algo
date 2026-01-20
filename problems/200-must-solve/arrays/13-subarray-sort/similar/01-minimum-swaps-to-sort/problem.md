# Minimum Swaps to Sort Array

**Difficulty:** Hard

## Problem Statement

Find the minimum number of swaps needed to sort an array of distinct integers.

## Examples

**Example 1:**
```
Input: array = [4, 3, 2, 1]
Output: 2
Explanation: Swap 4<->1, then 3<->2
```

**Example 2:**
```
Input: array = [1, 5, 4, 3, 2]
Output: 2
Explanation: Swap 5<->2, then 4<->3
```

---

## Visual Diagram

### Input: [4, 3, 2, 1]

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
</div>

**Swap 1:** 4 <-> 1

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
</div>

**Swap 2:** 3 <-> 2

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">1</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">3</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
</div>

---

## Algorithm: Cycle Detection

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Key Insight:</strong> Each element needs to reach its correct position.<br>
Elements form cycles. A cycle of length k needs (k-1) swaps.
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |
