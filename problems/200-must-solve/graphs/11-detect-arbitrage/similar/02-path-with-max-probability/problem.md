<div id="viz-config" style="display:none">
{"name":"Path with Maximum Probability","algorithm":"dijkstra-modified","complexity":{"time":"O(E log V)","space":"O(V + E)"},"examples":[{"input":{"n":3,"edges":[[0,1],[1,2],[0,2]],"succProb":[0.5,0.5,0.2],"start":0,"end":2},"output":0.25,"inputRaw":"n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2","outputRaw":"0.25"}]}
</div>

# Path with Maximum Probability

**Difficulty:** Medium

## Problem Statement

You are given an undirected weighted graph of `n` nodes (0-indexed), represented by an edge list where `edges[i] = [a, b]` is an undirected edge connecting nodes `a` and `b` with a probability of success of traversing that edge `succProb[i]`.

Given two nodes `start` and `end`, find the path with the maximum probability of success to go from `start` to `end` and return its success probability.

If there is no path from `start` to `end`, return 0.

## Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25
Explanation: Path 0 -> 1 -> 2: 0.5 * 0.5 = 0.25
Path 0 -> 2: 0.2
0.25 > 0.2, so answer is 0.25
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30
Explanation: Path 0 -> 2 directly with probability 0.3
```

**Example 3:**
```
Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
Output: 0.00
Explanation: No path from 0 to 2
```

## Visual Explanation

### Probability Graph

```
         0.5
    0 ─────── 1
    │         │
   0.2       0.5
    │         │
    └─── 2 ───┘

Path 0 → 1 → 2: 0.5 × 0.5 = 0.25
Path 0 → 2: 0.2

Maximum probability: 0.25
```

### Modified Dijkstra

```
Regular Dijkstra: minimize sum of distances
This problem: maximize product of probabilities

Instead of:
  dist[v] = min(dist[v], dist[u] + weight)

We use:
  prob[v] = max(prob[v], prob[u] * weight)

Use max-heap instead of min-heap.
```

## Constraints

- 2 <= n <= 10^4
- 0 <= start, end < n
- start != end
- 0 <= edges.length <= 2 * 10^4
- edges[i].length == 2
- 0 <= a, b < n
- a != b
- 0 <= succProb[i] <= 1

## Hints

<details>
<summary>Hint 1</summary>
Use modified Dijkstra's algorithm with max-heap instead of min-heap.
</details>

<details>
<summary>Hint 2</summary>
Probabilities multiply along a path, so maximize product instead of minimizing sum.
</details>

<details>
<summary>Hint 3</summary>
Alternative: Use log transformation to convert multiplication to addition.
</details>

## Approach

### Modified Dijkstra's Algorithm

1. Build undirected graph with probability weights
2. Use max-heap to always process highest probability path
3. Update probabilities: prob[v] = max(prob[v], prob[u] * edge_prob)
4. Return prob[end] when reached

**Time Complexity:** O(E log V)
**Space Complexity:** O(V + E)
