# Making A Large Island

**Difficulty:** Hard

## Problem Statement

You are given an `n x n` binary matrix `grid`. You are allowed to change at most one `0` to be `1`.

Return the size of the largest island in `grid` after applying this operation.

An island is a 4-directionally connected group of `1`s.

## Examples

**Example 1:**
```
Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, getting island of size 3.
```

**Example 2:**
```
Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 to get a single island of size 4.
```

**Example 3:**
```
Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: No 0 to change, island size is already 4.
```

---

## Visual Diagram: How It Works

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Strategy: Label islands, then check what each 0 can connect</strong>

<div style="margin: 20px 0;">
<strong>Step 1: Label each island with unique ID and store sizes</strong>
<div style="display: grid; grid-template-columns: repeat(4, 40px); gap: 3px; margin: 10px 0;">
<div style="width: 40px; height: 40px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="width: 40px; height: 40px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 40px; height: 40px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
<div style="width: 40px; height: 40px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 40px; height: 40px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 40px; height: 40px; background: #dc3545; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
</div>
<div>Island 2: size = 3, Island 3: size = 2</div>
</div>

<div style="margin: 20px 0;">
<strong>Step 2: For each 0, sum adjacent unique island sizes + 1</strong>
<div style="display: flex; gap: 20px; margin: 10px 0;">
<div style="background: white; padding: 10px; border-radius: 4px;">
Cell (0,2): Adjacent to island 2 and 3 -> 3 + 2 + 1 = <strong>6</strong>
</div>
</div>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 4px;">
<strong>Maximum = 6</strong> (connecting islands 2 and 3)
</div>
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(n^2) |

---

## Related Problems

- River Sizes (main problem)
- Number of Islands
- Max Area of Island
