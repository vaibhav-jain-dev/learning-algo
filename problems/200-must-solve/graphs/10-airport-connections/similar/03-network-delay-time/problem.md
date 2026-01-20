<div id="viz-config" style="display:none">
{"name":"Network Delay Time","algorithm":"dijkstra","complexity":{"time":"O(E log V)","space":"O(V + E)"},"examples":[{"input":{"times":[[2,1,1],[2,3,1],[3,4,1]],"n":4,"k":2},"output":2,"inputRaw":"times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2","outputRaw":"2"}]}
</div>

# Network Delay Time

**Difficulty:** Medium

## Problem Statement

You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node `k`. Return the minimum time it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return `-1`.

## Examples

**Example 1:**
```
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
Explanation: Signal from node 2 reaches all nodes in 2 time units.
```

**Example 2:**
```
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
```

**Example 3:**
```
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
Explanation: Node 1 cannot be reached from node 2.
```

## Visual Explanation

### Signal Propagation

```
Network:
    1 ←─(1)─ 2 ─(1)→ 3 ─(1)→ 4

Signal from node 2:
- t=0: Node 2 has signal
- t=1: Nodes 1 and 3 receive signal
- t=2: Node 4 receives signal

Maximum time = 2
```

### Dijkstra's Algorithm Visualization

```
Starting from node 2:

Initial distances: {1: ∞, 2: 0, 3: ∞, 4: ∞}

Process node 2 (dist=0):
  - Update node 1: dist[1] = min(∞, 0+1) = 1
  - Update node 3: dist[3] = min(∞, 0+1) = 1

Process node 1 (dist=1):
  - No outgoing edges

Process node 3 (dist=1):
  - Update node 4: dist[4] = min(∞, 1+1) = 2

Process node 4 (dist=2):
  - No outgoing edges

Final distances: {1: 1, 2: 0, 3: 1, 4: 2}
Maximum distance = 2
```

## Constraints

- 1 <= k <= n <= 100
- 1 <= times.length <= 6000
- times[i].length == 3
- 1 <= ui, vi <= n
- ui != vi
- 0 <= wi <= 100
- All pairs (ui, vi) are unique

## Hints

<details>
<summary>Hint 1</summary>
Use Dijkstra's algorithm to find shortest paths from node k to all other nodes.
</details>

<details>
<summary>Hint 2</summary>
The answer is the maximum of all shortest path distances.
</details>

<details>
<summary>Hint 3</summary>
If any node is unreachable, return -1.
</details>

## Approach

### Dijkstra's Algorithm

1. Build adjacency list from times
2. Run Dijkstra from source node k
3. Return maximum distance, or -1 if any node unreachable

**Time Complexity:** O(E log V) with min-heap
**Space Complexity:** O(V + E)
