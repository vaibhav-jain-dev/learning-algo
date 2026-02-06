/**
 * Min Cost to Connect Points
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: minimum-spanning-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Cost to Connect Points',
        difficulty: 'Medium',
        algorithm: 'minimum-spanning-tree',
        parent: '10-airport-connections',
        description: 'You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi]. The cost of connecting two points [xi, yi] and [xj, yj] is the Manhattan distance between them: |xi - xj| + |yi - yj|. Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n^2 log n)',
            space: 'O(n^2)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "points": [
                [
                        0,
                        0
                ],
                [
                        2,
                        2
                ],
                [
                        3,
                        10
                ],
                [
                        5,
                        2
                ],
                [
                        7,
                        0
                ]
        ]
},
        output: 20,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input points=[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]], the result is 20.'
    }
        ],
        solutions: {
            python: `import heapq

def minCostConnectPoints(points):
    """
    Min Cost to Connect Points - Prim's MST Algorithm

    Build a minimum spanning tree connecting all points.
    Use a min-heap to always pick the cheapest edge.

    Time: O(n^2 log n)
    Space: O(n^2)
    """
    n = len(points)
    if n <= 1:
        return 0

    def manhattan_dist(i, j):
        return abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])

    # Prim's algorithm
    visited = [False] * n
    min_heap = [(0, 0)]  # (cost, node)
    total_cost = 0
    edges_added = 0

    while edges_added < n:
        cost, node = heapq.heappop(min_heap)

        if visited[node]:
            continue

        visited[node] = True
        total_cost += cost
        edges_added += 1

        # Add all edges from this node to unvisited nodes
        for next_node in range(n):
            if not visited[next_node]:
                dist = manhattan_dist(node, next_node)
                heapq.heappush(min_heap, (dist, next_node))

    return total_cost


def minCostConnectPointsKruskal(points):
    """Alternative: Kruskal's algorithm with Union-Find."""
    n = len(points)
    if n <= 1:
        return 0

    # Union-Find
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    # Create all edges and sort by cost
    edges = []
    for i in range(n):
        for j in range(i + 1, n):
            cost = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
            edges.append((cost, i, j))

    edges.sort()

    total_cost = 0
    edges_added = 0

    for cost, u, v in edges:
        if union(u, v):
            total_cost += cost
            edges_added += 1
            if edges_added == n - 1:
                break

    return total_cost


# Test
if __name__ == "__main__":
    points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
    print(minCostConnectPoints(points))  # 20`,
            go: `package main

import (
    "container/heap"
    "fmt"
    "sort"
)

// Edge represents a weighted edge for min-heap
type Edge struct {
    cost, node int
}

type MinHeap []Edge

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i].cost < h[j].cost }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x any)        { *h = append(*h, x.(Edge)) }
func (h *MinHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

// MinCostConnectPoints uses Prim's MST algorithm
// Time: O(n^2 log n), Space: O(n^2)
func MinCostConnectPoints(points [][]int) int {
    n := len(points)
    if n <= 1 {
        return 0
    }

    manhattan := func(i, j int) int {
        dx := points[i][0] - points[j][0]
        dy := points[i][1] - points[j][1]
        if dx < 0 {
            dx = -dx
        }
        if dy < 0 {
            dy = -dy
        }
        return dx + dy
    }

    visited := make([]bool, n)
    h := &MinHeap{{0, 0}}
    heap.Init(h)

    totalCost := 0
    edgesAdded := 0

    for edgesAdded < n {
        edge := heap.Pop(h).(Edge)

        if visited[edge.node] {
            continue
        }

        visited[edge.node] = true
        totalCost += edge.cost
        edgesAdded++

        for next := 0; next < n; next++ {
            if !visited[next] {
                dist := manhattan(edge.node, next)
                heap.Push(h, Edge{dist, next})
            }
        }
    }

    return totalCost
}

// MinCostConnectPointsKruskal uses Kruskal's algorithm
func MinCostConnectPointsKruskal(points [][]int) int {
    n := len(points)
    if n <= 1 {
        return 0
    }

    // Union-Find
    parent := make([]int, n)
    rank := make([]int, n)
    for i := range parent {
        parent[i] = i
    }

    var find func(x int) int
    find = func(x int) int {
        if parent[x] != x {
            parent[x] = find(parent[x])
        }
        return parent[x]
    }

    union := func(x, y int) bool {
        px, py := find(x), find(y)
        if px == py {
            return false
        }
        if rank[px] < rank[py] {
            px, py = py, px
        }
        parent[py] = px
        if rank[px] == rank[py] {
            rank[px]++
        }
        return true
    }

    // Create and sort edges
    type EdgeK struct{ cost, u, v int }
    edges := []EdgeK{}

    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            dx := points[i][0] - points[j][0]
            dy := points[i][1] - points[j][1]
            if dx < 0 {
                dx = -dx
            }
            if dy < 0 {
                dy = -dy
            }
            edges = append(edges, EdgeK{dx + dy, i, j})
        }
    }

    sort.Slice(edges, func(i, j int) bool {
        return edges[i].cost < edges[j].cost
    })

    totalCost := 0
    edgesAdded := 0

    for _, e := range edges {
        if union(e.u, e.v) {
            totalCost += e.cost
            edgesAdded++
            if edgesAdded == n-1 {
                break
            }
        }
    }

    return totalCost
}

func main() {
    points := [][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}}
    fmt.Println(MinCostConnectPoints(points)) // 20
}`
        },
        twists: [
            { title: 'Euclidean Distance', difficulty: 'Medium', description: 'Use Euclidean distance instead of Manhattan distance. Points are connected by straight-line distance.', whyDifferent: 'The MST algorithm is the same, but the distance metric changes all edge weights. Euclidean distance is sqrt((x1-x2)^2 + (y1-y2)^2), which may change the optimal spanning tree.', example: 'Points (0,0) and (3,4). Manhattan: 7. Euclidean: 5. The optimal MST edges may differ.' },
            { title: 'Connect with Existing Edges', difficulty: 'Hard', description: 'Some points are already connected with fixed cost 0. Find the MST cost for the remaining points.', whyDifferent: 'Pre-connected points start in the same Union-Find component. You skip free edges and only pay for edges that connect different components.', example: 'Points A, B, C, D. A-B already connected (cost 0). MST only needs to add edges connecting {A,B} to C and D.' },
            { title: 'Maximum Spanning Tree', difficulty: 'Medium', description: 'Find the maximum cost spanning tree instead of minimum. Connect all points using the most expensive edges.', whyDifferent: 'Sort edges in descending order instead of ascending for Kruskal, or negate weights for Prim. The greedy choice is reversed.', example: 'Points forming a square. MST uses short edges, MaxST uses the diagonals and one long side.' },
            { title: 'K-Connected Points', difficulty: 'Very Hard', description: 'Instead of a spanning tree, find the minimum cost to make the graph K-edge-connected (every pair of points has K edge-disjoint paths).', whyDifferent: 'K-connectivity requires more than N-1 edges. You need augmentation algorithms beyond basic MST, combining MST with edge augmentation theory.', example: '4 points forming a square. 1-connected: MST (3 edges). 2-connected: need all 4 edges of the square.' },
            { title: 'Connect in Groups', difficulty: 'Hard', description: 'Points have colors. Only connect points of different colors. Find the minimum cost to make all points reachable from each other.', whyDifferent: 'Same-color edges are forbidden. The edge set is restricted, and valid MST must only use inter-color edges, which may not always produce a spanning tree.', example: 'Red points: (0,0),(1,0). Blue points: (0,1),(1,1). Can only use red-blue edges. MST uses cheapest cross-color edges.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/02-min-cost-connect-points', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/02-min-cost-connect-points'] = problem;

})();
