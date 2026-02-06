/**
 * Minimum Spanning Tree Verification
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Spanning Tree Verification',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Given a graph and a proposed spanning tree, verify if the proposed tree is indeed a minimum spanning tree.',
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
        "graphEdges": [
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
        ],
        "proposed": [
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
                        3,
                        4
                ]
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input n=4, graphEdges=[[0, 1, 1], [0, 2, 2], [1, 2, 3], [1, 3, 4], [2, 3, 5]], proposed=[[0, 1, 1], [0, 2, 2], [1, 3, 4]], the result is true.'
    }
        ],
        solutions: {
            python: `def minimumSpanningTreeVerification(data):
    """
    Minimum Spanning Tree Verification

    Verify if proposed tree is a valid MST by:
    1. Check if proposed tree has exactly n-1 edges
    2. Check if proposed tree connects all nodes
    3. Compare total cost with actual MST cost

    Time: O(E log V)
    Space: O(V + E)
    """
    import heapq
    from collections import defaultdict

    n = data["n"]
    graph_edges = data["graphEdges"]
    proposed = data["proposed"]

    # Check edge count
    if len(proposed) != n - 1:
        return False

    # Build graph adjacency list
    graph = defaultdict(list)
    for u, v, cost in graph_edges:
        graph[u].append((v, cost))
        graph[v].append((u, cost))

    # Calculate proposed tree cost and check connectivity
    proposed_cost = 0
    proposed_adj = defaultdict(set)
    for u, v, cost in proposed:
        proposed_cost += cost
        proposed_adj[u].add(v)
        proposed_adj[v].add(u)

    # Check if proposed tree connects all nodes (BFS)
    visited = set([0])
    stack = [0]
    while stack:
        node = stack.pop()
        for neighbor in proposed_adj[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                stack.append(neighbor)

    if len(visited) != n:
        return False

    # Calculate actual MST cost using Prim's
    visited = [False] * n
    min_heap = [(0, 0)]
    mst_cost = 0
    edges_used = 0

    while min_heap and edges_used < n:
        cost, node = heapq.heappop(min_heap)

        if visited[node]:
            continue

        visited[node] = True
        mst_cost += cost
        edges_used += 1

        for neighbor, edge_cost in graph[node]:
            if not visited[neighbor]:
                heapq.heappush(min_heap, (edge_cost, neighbor))

    # Proposed tree is MST if costs match
    return proposed_cost == mst_cost


# Test
if __name__ == "__main__":
    data = {
        "n": 4,
        "graphEdges": [[0,1,1], [0,2,2], [1,2,3], [1,3,4], [2,3,5]],
        "proposed": [[0,1,1], [0,2,2], [1,3,4]]
    }
    print(minimumSpanningTreeVerification(data))  # True`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

type VerifyEdge struct {
    cost, node int
}

type VerifyHeap []VerifyEdge

func (h VerifyHeap) Len() int           { return len(h) }
func (h VerifyHeap) Less(i, j int) bool { return h[i].cost < h[j].cost }
func (h VerifyHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *VerifyHeap) Push(x interface{}) { *h = append(*h, x.(VerifyEdge)) }
func (h *VerifyHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

// MinimumSpanningTreeVerification checks if proposed tree is MST.
// Time: O(E log V), Space: O(V + E)
func MinimumSpanningTreeVerification(data map[string]interface{}) bool {
    n := int(data["n"].(float64))
    graphEdgesRaw := data["graphEdges"].([]interface{})
    proposedRaw := data["proposed"].([]interface{})

    // Check edge count
    if len(proposedRaw) != n-1 {
        return false
    }

    // Build graph
    type edge struct{ to, cost int }
    graph := make([][]edge, n)
    for i := range graph {
        graph[i] = []edge{}
    }

    for _, e := range graphEdgesRaw {
        ed := e.([]interface{})
        u := int(ed[0].(float64))
        v := int(ed[1].(float64))
        cost := int(ed[2].(float64))
        graph[u] = append(graph[u], edge{v, cost})
        graph[v] = append(graph[v], edge{u, cost})
    }

    // Calculate proposed cost and build adjacency
    proposedCost := 0
    proposedAdj := make([]map[int]bool, n)
    for i := range proposedAdj {
        proposedAdj[i] = make(map[int]bool)
    }

    for _, e := range proposedRaw {
        ed := e.([]interface{})
        u := int(ed[0].(float64))
        v := int(ed[1].(float64))
        cost := int(ed[2].(float64))
        proposedCost += cost
        proposedAdj[u][v] = true
        proposedAdj[v][u] = true
    }

    // Check connectivity of proposed tree
    visited := make(map[int]bool)
    stack := []int{0}
    visited[0] = true

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        for neighbor := range proposedAdj[node] {
            if !visited[neighbor] {
                visited[neighbor] = true
                stack = append(stack, neighbor)
            }
        }
    }

    if len(visited) != n {
        return false
    }

    // Calculate actual MST cost using Prim's
    visitedPrim := make([]bool, n)
    h := &VerifyHeap{{0, 0}}
    heap.Init(h)
    mstCost := 0
    edgesUsed := 0

    for h.Len() > 0 && edgesUsed < n {
        e := heap.Pop(h).(VerifyEdge)

        if visitedPrim[e.node] {
            continue
        }

        visitedPrim[e.node] = true
        mstCost += e.cost
        edgesUsed++

        for _, neighbor := range graph[e.node] {
            if !visitedPrim[neighbor.to] {
                heap.Push(h, VerifyEdge{neighbor.cost, neighbor.to})
            }
        }
    }

    return proposedCost == mstCost
}

func main() {
    data := map[string]interface{}{
        "n": float64(4),
        "graphEdges": []interface{}{
            []interface{}{float64(0), float64(1), float64(1)},
            []interface{}{float64(0), float64(2), float64(2)},
            []interface{}{float64(1), float64(2), float64(3)},
            []interface{}{float64(1), float64(3), float64(4)},
            []interface{}{float64(2), float64(3), float64(5)},
        },
        "proposed": []interface{}{
            []interface{}{float64(0), float64(1), float64(1)},
            []interface{}{float64(0), float64(2), float64(2)},
            []interface{}{float64(1), float64(3), float64(4)},
        },
    }
    fmt.Println(MinimumSpanningTreeVerification(data)) // true
}`
        },
        twists: [
            { title: 'Verify Using Cut Property', difficulty: 'Hard', description: 'Verify the MST by checking the cut property: for every edge in the proposed tree, it must be the lightest edge crossing some cut.', whyDifferent: 'Uses the theoretical cut property directly instead of comparing total weights, providing a proof-based verification that does not require computing the actual MST.', example: 'For each MST edge (u,v), remove it to split the tree into two components. Verify no other edge crossing this cut has lower weight.' },
            { title: 'Verify Using Cycle Property', difficulty: 'Hard', description: 'For each non-tree edge, verify that it is the heaviest edge in the cycle it would create when added to the proposed tree.', whyDifferent: 'Uses the cycle property: a non-MST edge must be the max-weight edge in any cycle it participates in. This checks from the non-tree edges perspective.', example: 'Non-tree edge (2,3,weight=5). Adding it creates cycle 2-3-1-2. If all other cycle edges weigh less than 5, the tree passes this check.' },
            { title: 'Find the Wrong Edge', difficulty: 'Hard', description: 'If the proposed tree is NOT a valid MST, identify which specific edge should be swapped and with which non-tree edge.', whyDifferent: 'Goes beyond boolean verification to diagnostic output -- find the tree edge that violates the cut property and the non-tree edge that should replace it.', example: 'Proposed tree uses edge (1,3,8) but non-tree edge (1,3,5) exists. Swapping reduces total weight, proving the proposal was not optimal.' },
            { title: 'Approximate MST Check', difficulty: 'Medium', description: 'Verify if the proposed tree is a c-approximate MST, meaning its total weight is at most c times the true MST weight.', whyDifferent: 'Relaxes the exact equality check to an approximation ratio, useful for large-scale systems where exact MST computation is expensive.', example: 'True MST weight is 16. Proposed tree weight is 18. For c=1.2, check if 18 <= 1.2 * 16 = 19.2. Yes, so it is a 1.2-approximate MST.' },
            { title: 'Uniqueness Check', difficulty: 'Hard', description: 'Determine whether the MST of the graph is unique (only one optimal spanning tree exists) or if multiple MSTs exist with the same total weight.', whyDifferent: 'Requires checking if any non-tree edge has the same weight as the maximum tree edge in its fundamental cycle -- if so, an alternative MST exists.', example: 'If two edges have weight 5 and swapping one for the other preserves total MST weight, the MST is not unique.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/03-minimum-spanning-tree-verify', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/03-minimum-spanning-tree-verify'] = problem;

})();
