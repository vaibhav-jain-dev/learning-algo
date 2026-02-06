/**
 * Network Delay via MST
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Network Delay via MST',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Given a network of servers, find the minimum cost to establish a connected network where all servers can communicate. Then determine the maximum latency for a signal to reach all nodes.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(E log V)',
            space: 'O(V + E)'
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
        "n": 4,
        "connections": [
                [
                        0,
                        1,
                        1
                ],
                [
                        0,
                        2,
                        2
                ],
                [
                        1,
                        2,
                        3
                ],
                [
                        1,
                        3,
                        4
                ],
                [
                        2,
                        3,
                        5
                ]
        ]
},
        output: {"mstCost": 7, "maxDepth": 2},
        explanation: 'Processing the input data produces the output. For input n=4, connections=[[0, 1, 1], [0, 2, 2], [1, 2, 3], [1, 3, 4], [2, 3, 5]], the result is {\'mstCost\': 7, \'maxDepth\': 2}.'
    }
        ],
        solutions: {
            python: `def networkDelayViaMst(data):
    """
    Network Delay via MST using Prim's Algorithm

    Build MST and find the maximum depth (hops) from node 0.

    Time: O(E log V)
    Space: O(V + E)
    """
    import heapq
    from collections import defaultdict

    n = data["n"]
    connections = data["connections"]

    # Build adjacency list
    graph = defaultdict(list)
    for u, v, cost in connections:
        graph[u].append((v, cost))
        graph[v].append((u, cost))

    # Prim's algorithm to build MST
    visited = [False] * n
    mst_adj = defaultdict(list)  # MST adjacency list
    min_heap = [(0, 0, -1)]  # (cost, node, parent)
    mst_cost = 0

    while min_heap:
        cost, node, parent = heapq.heappop(min_heap)

        if visited[node]:
            continue

        visited[node] = True
        mst_cost += cost

        if parent != -1:
            mst_adj[parent].append(node)
            mst_adj[node].append(parent)

        for neighbor, edge_cost in graph[node]:
            if not visited[neighbor]:
                heapq.heappush(min_heap, (edge_cost, neighbor, node))

    # BFS to find max depth from node 0
    from collections import deque
    queue = deque([(0, 0)])  # (node, depth)
    visited = [False] * n
    visited[0] = True
    max_depth = 0

    while queue:
        node, depth = queue.popleft()
        max_depth = max(max_depth, depth)

        for neighbor in mst_adj[node]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append((neighbor, depth + 1))

    return {"mstCost": mst_cost, "maxDepth": max_depth}


# Test
if __name__ == "__main__":
    data = {
        "n": 4,
        "connections": [[0,1,1], [0,2,2], [1,2,3], [1,3,4], [2,3,5]]
    }
    print(networkDelayViaMst(data))  # {"mstCost": 7, "maxDepth": 2}`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

type PrimEdge struct {
    cost, node, parent int
}

type PrimHeap []PrimEdge

func (h PrimHeap) Len() int           { return len(h) }
func (h PrimHeap) Less(i, j int) bool { return h[i].cost < h[j].cost }
func (h PrimHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *PrimHeap) Push(x interface{}) { *h = append(*h, x.(PrimEdge)) }
func (h *PrimHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

// NetworkDelayViaMst builds MST and finds max depth.
// Time: O(E log V), Space: O(V + E)
func NetworkDelayViaMst(data map[string]interface{}) map[string]int {
    n := int(data["n"].(float64))
    connsRaw := data["connections"].([]interface{})

    // Build adjacency list
    type edge struct{ to, cost int }
    graph := make([][]edge, n)
    for i := range graph {
        graph[i] = []edge{}
    }

    for _, c := range connsRaw {
        conn := c.([]interface{})
        u := int(conn[0].(float64))
        v := int(conn[1].(float64))
        cost := int(conn[2].(float64))
        graph[u] = append(graph[u], edge{v, cost})
        graph[v] = append(graph[v], edge{u, cost})
    }

    // Prim's algorithm
    visited := make([]bool, n)
    mstAdj := make([][]int, n)
    for i := range mstAdj {
        mstAdj[i] = []int{}
    }

    h := &PrimHeap{{0, 0, -1}}
    heap.Init(h)
    mstCost := 0

    for h.Len() > 0 {
        e := heap.Pop(h).(PrimEdge)

        if visited[e.node] {
            continue
        }

        visited[e.node] = true
        mstCost += e.cost

        if e.parent != -1 {
            mstAdj[e.parent] = append(mstAdj[e.parent], e.node)
            mstAdj[e.node] = append(mstAdj[e.node], e.parent)
        }

        for _, neighbor := range graph[e.node] {
            if !visited[neighbor.to] {
                heap.Push(h, PrimEdge{neighbor.cost, neighbor.to, e.node})
            }
        }
    }

    // BFS to find max depth
    type queueItem struct{ node, depth int }
    queue := []queueItem{{0, 0}}
    visitedBFS := make([]bool, n)
    visitedBFS[0] = true
    maxDepth := 0

    for len(queue) > 0 {
        item := queue[0]
        queue = queue[1:]

        if item.depth > maxDepth {
            maxDepth = item.depth
        }

        for _, neighbor := range mstAdj[item.node] {
            if !visitedBFS[neighbor] {
                visitedBFS[neighbor] = true
                queue = append(queue, queueItem{neighbor, item.depth + 1})
            }
        }
    }

    return map[string]int{"mstCost": mstCost, "maxDepth": maxDepth}
}

func main() {
    data := map[string]interface{}{
        "n": float64(4),
        "connections": []interface{}{
            []interface{}{float64(0), float64(1), float64(1)},
            []interface{}{float64(0), float64(2), float64(2)},
            []interface{}{float64(1), float64(2), float64(3)},
            []interface{}{float64(1), float64(3), float64(4)},
            []interface{}{float64(2), float64(3), float64(5)},
        },
    }
    fmt.Println(NetworkDelayViaMst(data)) // map[maxDepth:2 mstCost:7]
}`
        },
        twists: [
            { title: 'Dijkstra vs MST Approach', difficulty: 'Hard', description: 'Compare solving network delay using Dijkstra\'s shortest paths vs the MST approach. When do they give different answers?', whyDifferent: 'MST minimizes total edge weight but does not minimize path lengths. Dijkstra minimizes path from source to each node. The two approaches solve fundamentally different problems.', example: 'MST might route through a long single-edge path while Dijkstra would find a shorter multi-hop path. Network delay interpretation affects which is correct.' },
            { title: 'Multiple Source Broadcast', difficulty: 'Hard', description: 'Instead of one source node, k source nodes broadcast simultaneously. Find the minimum time for all nodes to receive the signal.', whyDifferent: 'Requires multi-source BFS or Dijkstra, where each node receives the signal from the nearest source, changing the MST to a Steiner tree-like formulation.', example: 'Sources at nodes 0 and 3. Node 2 receives from whichever source reaches it first. Minimize the max delay across all nodes.' },
            { title: 'Bottleneck Path', difficulty: 'Medium', description: 'Instead of total cost, find the path from source to each node that minimizes the maximum edge weight along the path (minimax path).', whyDifferent: 'The minimax path actually lies on the MST (a key property), but proving this and extracting the paths requires different reasoning than standard shortest paths.', example: 'From node 0 to node 3, the minimax path uses edges with max weight 4 even if a shorter total-cost path uses an edge of weight 6.' },
            { title: 'Redundant Connections for Reliability', difficulty: 'Hard', description: 'Find the MST, then determine which single additional edge would most reduce the maximum delay (diameter) of the MST network.', whyDifferent: 'Requires analyzing the MST structure, finding its diameter, then evaluating each non-MST edge for how much it would reduce the longest path.', example: 'MST has diameter 5 through path 0-1-2-3-4. Adding edge (0,4,weight=2) creates a shortcut reducing the effective diameter to 2.' },
            { title: 'Time-Varying Edges', difficulty: 'Very Hard', description: 'Edge costs change over time (e.g., network congestion). Find the MST at each time step as edges are added or removed.', whyDifferent: 'Dynamic MST maintenance requires techniques beyond standard Prim\'s -- like detecting cycle creation/tree splitting when edge weights change.', example: 'At time 1, edge (0,1) costs 3. At time 2, it changes to 7. The MST may need to swap this edge for a cheaper alternative.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/02-network-delay-mst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/02-network-delay-mst'] = problem;

})();
