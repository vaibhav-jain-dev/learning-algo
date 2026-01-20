<div id="viz-config" style="display:none">
{"name":"Cheapest Flights Within K Stops","algorithm":"bellman-ford-dijkstra","complexity":{"time":"O(K * E)","space":"O(V)"},"examples":[{"input":{"n":4,"flights":[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],"src":0,"dst":3,"k":1},"output":700,"inputRaw":"n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1","outputRaw":"700"}]}
</div>

# Cheapest Flights Within K Stops

**Difficulty:** Medium

## Problem Statement

There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [fromi, toi, pricei]` indicates there is a flight from city `fromi` to city `toi` with cost `pricei`.

You are also given three integers `src`, `dst`, and `k`, return the cheapest price from `src` to `dst` with at most `k` stops. If there is no such route, return `-1`.

## Examples

**Example 1:**
```
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation: The path 0 -> 1 -> 3 costs 100 + 600 = 700.
The path 0 -> 1 -> 2 -> 3 costs 400 but uses 2 stops.
```

**Example 2:**
```
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation: Path 0 -> 1 -> 2 costs 200 with 1 stop.
```

**Example 3:**
```
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500
Explanation: Path 0 -> 2 costs 500 with 0 stops.
```

## Visual Explanation

### Flight Network

```
       100        600
    0 ───→ 1 ─────────→ 3
    ↑      │           ↗
   100    100       200
    │      ↓       ↗
    └───── 2 ─────┘

With k=1 (at most 1 stop):
- 0 → 3: No direct flight
- 0 → 1 → 3: Cost 700 ✓ (1 stop)
- 0 → 1 → 2 → 3: Cost 400 ✗ (2 stops, exceeds k)
- 0 → 2 → 3: No path (no 0→2 direct)

Answer: 700
```

## Constraints

- 1 <= n <= 100
- 0 <= flights.length <= (n * (n - 1) / 2)
- flights[i].length == 3
- 0 <= fromi, toi < n
- fromi != toi
- 1 <= pricei <= 10^4
- 0 <= src, dst, k < n
- src != dst

## Hints

<details>
<summary>Hint 1</summary>
Use modified Bellman-Ford that limits the number of relaxations.
</details>

<details>
<summary>Hint 2</summary>
BFS/DFS with memoization on (node, stops_remaining) also works.
</details>

<details>
<summary>Hint 3</summary>
Copy the distance array before each round to prevent using more than k+1 edges in one round.
</details>

## Approach

### Modified Bellman-Ford

1. Initialize distances with infinity, source = 0
2. For k+1 iterations (k stops = k+1 edges):
   - Copy current distances
   - Relax all edges using copied distances
3. Return dist[dst] or -1 if infinity

**Time Complexity:** O(K * E)
**Space Complexity:** O(V)
