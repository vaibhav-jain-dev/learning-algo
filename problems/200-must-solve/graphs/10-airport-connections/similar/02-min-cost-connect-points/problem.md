<div id="viz-config" style="display:none">
{"name":"Min Cost to Connect Points","algorithm":"minimum-spanning-tree","complexity":{"time":"O(n^2 log n)","space":"O(n^2)"},"examples":[{"input":{"points":[[0,0],[2,2],[3,10],[5,2],[7,0]]},"output":20,"inputRaw":"points = [[0,0],[2,2],[3,10],[5,2],[7,0]]","outputRaw":"20"}]}
</div>

# Minimum Cost to Connect All Points

**Difficulty:** Medium

## Problem Statement

You are given an array `points` representing integer coordinates of some points on a 2D-plane, where `points[i] = [xi, yi]`.

The cost of connecting two points `[xi, yi]` and `[xj, yj]` is the Manhattan distance between them: `|xi - xj| + |yi - yj|`.

Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

## Examples

**Example 1:**
```
Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
Explanation: Connect points as shown to get minimum cost.
```

**Example 2:**
```
Input: points = [[3,12],[-2,5],[-4,1]]
Output: 18
```

**Example 3:**
```
Input: points = [[0,0],[1,1],[1,0],[-1,1]]
Output: 4
```

## Visual Explanation

### Minimum Spanning Tree

```
Points: A(0,0), B(2,2), C(3,10), D(5,2), E(7,0)

                    C(3,10)
                    |
                    | cost=8
                    |
    A(0,0)---B(2,2)---D(5,2)---E(7,0)
         4       3        4

Edges selected:
- A-B: |0-2| + |0-2| = 4
- B-D: |2-5| + |2-2| = 3
- D-E: |5-7| + |2-0| = 4
- B-C: |2-3| + |2-10| = 9  (or C-D: 8+1=9)

Total: 4 + 3 + 4 + 9 = 20
```

## Constraints

- 1 <= points.length <= 1000
- -10^6 <= xi, yi <= 10^6
- All pairs (xi, yi) are distinct

## Hints

<details>
<summary>Hint 1</summary>
This is a Minimum Spanning Tree (MST) problem.
</details>

<details>
<summary>Hint 2</summary>
Use Prim's or Kruskal's algorithm to find the MST.
</details>

<details>
<summary>Hint 3</summary>
For dense graphs (like this one with n^2 edges), Prim's algorithm is often more efficient.
</details>

## Approach

### Prim's Algorithm

1. Start from any point
2. Maintain min-heap of edges from visited to unvisited points
3. Always pick minimum cost edge
4. Repeat until all points connected

**Time Complexity:** O(n^2 log n)
**Space Complexity:** O(n^2) for storing edges

### Kruskal's Algorithm

1. Generate all edges with costs
2. Sort edges by cost
3. Use Union-Find to add edges that don't create cycles
4. Stop when n-1 edges added

**Time Complexity:** O(n^2 log n)
**Space Complexity:** O(n^2)
