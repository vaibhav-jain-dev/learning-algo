<div id="viz-config" style="display:none">
{"name":"Shortest Path to Get All Keys","algorithm":"graph-bfs","complexity":{"time":"O(M * N * 2^K)","space":"O(M * N * 2^K)"},"examples":[{"input":{"grid":["@.a..","###.#","b.A.B"]},"output":8,"inputRaw":"grid = [\"@.a..\",\"###.#\",\"b.A.B\"]","outputRaw":"8"}]}
</div>

# Shortest Path to Get All Keys

**Difficulty:** Hard

## Problem Statement

You are given an `m x n` grid `grid` where:
- `'.'` is an empty cell
- `'#'` is a wall
- `'@'` is the starting point
- Lowercase letters represent keys
- Uppercase letters are locks that require the matching key

Return the minimum number of moves to get all keys. If impossible, return `-1`.

## Examples

```
Input: grid = ["@.a..","###.#","b.A.B"]
Output: 8
Explanation: Get key a, then key b (need to go through lock A with key a)
```

---

## Visual Diagram: BFS with State

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>State = (row, col, keys_collected)</strong>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">
<strong>Grid:</strong>
<pre style="font-family: monospace; font-size: 16px;">
@ . a . .
# # # . #
b . A . B
</pre>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 4px;">
<strong>Path:</strong> Start(0,0) -> get 'a'(0,2) -> pass 'A'(2,2) -> get 'b'(2,0) = 8 moves
</div>
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(m * n * 2^k) where k = number of keys |
| Space Complexity | O(m * n * 2^k) |

Uses BFS with bitmask to track collected keys as state.
