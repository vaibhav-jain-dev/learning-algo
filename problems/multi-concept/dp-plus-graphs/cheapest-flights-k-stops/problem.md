# Cheapest Flights Within K Stops

## Problem Description

There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [from_i, to_i, price_i]` indicates that there is a flight from city `from_i` to city `to_i` with cost `price_i`.

You are also given three integers `src`, `dst`, and `k`, return the **cheapest price** from `src` to `dst` with at most `k` stops. If there is no such route, return `-1`.

**Concepts Combined**: Graph Traversal (BFS) + Dynamic Programming (Bellman-Ford variant)

## Examples

### Example 1
```
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation:
The optimal path is 0 -> 1 -> 3 with cost 100 + 600 = 700.
Note that path 0 -> 1 -> 2 -> 3 is cheaper but requires 2 stops.
```

### Example 2
```
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation:
Path 0 -> 1 -> 2 costs 200 with exactly 1 stop.
```

### Example 3
```
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500
Explanation:
With 0 stops allowed, we must take direct flight 0 -> 2.
```

## Constraints
- `1 <= n <= 100`
- `0 <= flights.length <= (n * (n - 1) / 2)`
- `flights[i].length == 3`
- `0 <= from_i, to_i < n`
- `from_i != to_i`
- `1 <= price_i <= 10^4`
- `0 <= src, dst, k < n`
- `src != dst`

## Hints

<details>
<summary>Hint 1</summary>
Think of this as a modified shortest path problem where you have an additional constraint on the number of edges used.
</details>

<details>
<summary>Hint 2</summary>
Bellman-Ford algorithm naturally handles this - each relaxation round adds one more edge. Limit to k+1 rounds.
</details>

<details>
<summary>Hint 3</summary>
BFS with state (node, stops_remaining, cost) also works. Use priority queue for Dijkstra variant.
</details>

<details>
<summary>Hint 4</summary>
DP approach: dp[i][j] = minimum cost to reach node j using exactly i edges.
</details>

## Approach

### Approach 1: Modified Bellman-Ford (DP)
```
dp[stops][node] = minimum cost to reach node using at most 'stops' flights

For each stop count from 1 to k+1:
    For each flight (u, v, cost):
        dp[stops][v] = min(dp[stops][v], dp[stops-1][u] + cost)
```

### Approach 2: BFS with Level-by-Level Processing
Process all nodes at distance i before processing distance i+1.

### Approach 3: Dijkstra with State
Use (cost, node, stops) as state in priority queue. Allow revisiting nodes if using fewer stops.

**Time Complexity**: O(k * E) for Bellman-Ford, O(k * E * log(k*V)) for Dijkstra
**Space Complexity**: O(V) to O(k * V) depending on approach
