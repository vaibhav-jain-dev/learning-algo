<div id="viz-config" style="display:none">
{"name":"Possible Bipartition","algorithm":"graph-coloring","complexity":{"time":"O(V + E)","space":"O(V + E)"},"examples":[{"input":{"n":4,"dislikes":[[1,2],[1,3],[2,4]]},"output":true,"inputRaw":"n=4, dislikes=[[1,2],[1,3],[2,4]]","outputRaw":"true"},{"input":{"n":3,"dislikes":[[1,2],[1,3],[2,3]]},"output":false,"inputRaw":"n=3, dislikes=[[1,2],[1,3],[2,3]]","outputRaw":"false"}]}
</div>

# Possible Bipartition

**Difficulty:** Medium

## Problem Statement

We want to split a group of `n` people into two groups. Given `dislikes[i] = [ai, bi]` where person `ai` dislikes person `bi`, return `true` if it's possible to split everyone into two groups such that no two people who dislike each other are in the same group.

## Examples

**Example 1:**
```
Input: n = 4, dislikes = [[1,2],[1,3],[2,4]]
Output: true
Explanation: group1 = [1,4], group2 = [2,3]
```

**Example 2:**
```
Input: n = 3, dislikes = [[1,2],[1,3],[2,3]]
Output: false
```

---

## Visual Diagram

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>This is graph bipartiteness - can people be split into 2 groups with no dislikes within groups?</strong>

<div style="display: flex; gap: 40px; margin: 20px 0;">
<div style="text-align: center;">
<strong>Possible (Example 1)</strong>
<div style="display: flex; gap: 20px; margin: 10px 0;">
  <div style="background: #dc3545; color: white; padding: 10px 20px; border-radius: 4px;">1, 4</div>
  <div style="background: #007bff; color: white; padding: 10px 20px; border-radius: 4px;">2, 3</div>
</div>
</div>
<div style="text-align: center;">
<strong>Not Possible (Example 2)</strong>
<div style="color: #dc3545;">Triangle of dislikes = odd cycle</div>
</div>
</div>
</div>

---

## Solution

Same as Is Graph Bipartite - build graph from dislikes and check if 2-colorable.

| Metric | Value |
|--------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
