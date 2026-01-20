# Maximum Sorted Subarrays (Max Chunks)

**Difficulty:** Hard

## Problem Statement

Given an array, find the maximum number of chunks we can make to sort the array. Each chunk can be sorted independently, and after sorting all chunks and concatenating them, the result should be a sorted array.

## Examples

**Example 1:**
```
Input: array = [1, 0, 2, 3, 4]
Output: 4
Explanation: Chunks: [1, 0], [2], [3], [4]
```

**Example 2:**
```
Input: array = [4, 3, 2, 1, 0]
Output: 1
Explanation: Only one chunk (entire array)
```

---

## Visual Diagram

### Input: [1, 0, 2, 3, 4]

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Key Insight:</strong> We can split at position i if max(arr[0..i]) <= min(arr[i+1..n-1])
</div>

<div style="display: flex; gap: 5px; margin: 15px 0; flex-wrap: wrap; align-items: center;">
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; border: 2px solid #155724;">[1, 0]</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; border: 2px solid #155724;">[2]</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; border: 2px solid #155724;">[3]</span>
<span style="background: #28a745; color: white; padding: 8px 15px; border-radius: 5px; border: 2px solid #155724;">[4]</span>
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |
