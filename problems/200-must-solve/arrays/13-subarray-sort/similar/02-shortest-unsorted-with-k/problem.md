# Shortest Unsorted Continuous Subarray

**Difficulty:** Medium

## Problem Statement

Given an integer array, find the shortest contiguous subarray that, if sorted, would result in the whole array being sorted. Return the length of that subarray.

## Examples

**Example 1:**
```
Input: array = [2, 6, 4, 8, 10, 9, 15]
Output: 5
Explanation: Sort subarray [6, 4, 8, 10, 9] to get sorted array
```

**Example 2:**
```
Input: array = [1, 2, 3, 4]
Output: 0
Explanation: Already sorted
```

---

## Visual Diagram

### Input: [2, 6, 4, 8, 10, 9, 15]

<div style="display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">2</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">6</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">4</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">8</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">10</span>
<span style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 5px;">9</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px;">15</span>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
Subarray [6, 4, 8, 10, 9] needs sorting. Length = 5.
</div>

---

## Algorithm

1. Find min and max of "out of order" elements
2. Find where min should go (left boundary)
3. Find where max should go (right boundary)

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |
