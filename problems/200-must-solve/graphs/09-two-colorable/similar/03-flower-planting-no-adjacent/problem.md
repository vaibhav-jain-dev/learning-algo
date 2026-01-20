# Flower Planting With No Adjacent

**Difficulty:** Medium

## Problem Statement

You have `n` gardens, labeled from `1` to `n`, and `paths[i] = [xi, yi]` describes a bidirectional path between garden `xi` and garden `yi`. In each garden, you want to plant one of 4 types of flowers.

All gardens have at most 3 paths coming into or leaving it.

Return any valid answer such that for every garden, no two adjacent gardens have the same flower type.

## Examples

**Example 1:**
```
Input: n = 3, paths = [[1,2],[2,3],[3,1]]
Output: [1,2,3]
```

**Example 2:**
```
Input: n = 4, paths = [[1,2],[3,4]]
Output: [1,2,1,2]
```

---

## Visual Diagram

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Key insight: With max degree 3 and 4 colors, greedy always works!</strong>

<div style="background: #d4edda; padding: 10px; border-radius: 4px; margin: 10px 0;">
For each garden, pick any color not used by its neighbors (at most 3 neighbors, 4 colors available).
</div>

<div style="display: flex; gap: 30px; margin: 15px 0; align-items: center;">
  <span style="background: #dc3545; color: white; padding: 15px; border-radius: 50%;">1</span>
  <span>&#8212;</span>
  <span style="background: #007bff; color: white; padding: 15px; border-radius: 50%;">2</span>
  <span>&#8212;</span>
  <span style="background: #28a745; color: white; padding: 15px; border-radius: 50%;">3</span>
  <span>&#8212;</span>
  <span style="background: #dc3545; color: white; padding: 15px; border-radius: 50%;">1</span>
</div>
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
