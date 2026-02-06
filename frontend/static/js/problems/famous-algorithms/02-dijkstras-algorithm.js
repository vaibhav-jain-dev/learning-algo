/**
 * Single Source Shortest Path
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Single Source Shortest Path',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        description: 'Given a weighted graph with non-negative edge weights, find the shortest path from a source vertex to all other vertices in the graph. Dijkstra\'s algorithm is a greedy algorithm that uses a priority queue to always process the vertex with the smallest known distance first.',
        complexity: {
            time: 'O((V + E) log V)',
            space: 'O(V + E)'
        },
        examples: [
    {
        input: {
        "vertices": 5,
        "edges": [
                [
                        0,
                        1,
                        4
                ],
                [
                        0,
                        2,
                        1
                ],
                [
                        1,
                        3,
                        1
                ],
                [
                        2,
                        1,
                        2
                ],
                [
                        2,
                        3,
                        5
                ],
                [
                        3,
                        4,
                        3
                ]
        ],
        "source": 0
},
        output: [0, 3, 1, 4, 7],
        explanation: 'Processing the input data produces the output. For input vertices=5, edges=[[0, 1, 4], [0, 2, 1], ..., [3, 4, 3]] (length 6), source=0, the result is [0, 3, 1, 4, 7].'
    }
        ],
        twists: [
            {
                title: 'Negative Weight Handling',
                difficulty: 'Hard',
                description: 'Dijkstra\'s assumes non-negative edge weights. Construct a graph where adding a single negative edge causes Dijkstra\'s to produce incorrect results. Then explain what algorithm you would use instead and why.',
                whyDifferent: 'Forces understanding of WHY the greedy choice works: once a node is finalized, no future path can improve it (only if edges are non-negative). A negative edge violates this invariant.',
                example: 'Graph: A->B (1), A->C (5), B->C (-10). Dijkstra finalizes B with dist=1, then C with dist=5. But path A->B->C has dist=1+(-10)=-9. Bellman-Ford would find this.'
            },
            {
                title: 'Proof of Correctness',
                difficulty: 'Hard',
                description: 'Prove by induction that when Dijkstra\'s extracts a node from the priority queue, the distance recorded for that node is the true shortest path distance. Identify exactly where the non-negative weight assumption is used.',
                whyDifferent: 'Requires formal reasoning about the greedy invariant. The key insight: if all edges are non-negative, any path through unvisited nodes can only be longer than the current best, so the minimum in the queue is optimal.',
                example: 'Inductive step: assume all extracted nodes have correct distances. The next extracted node u has dist d. Any alternative path to u goes through some unvisited node v with dist[v] >= d (since d was minimum in queue) plus non-negative edges, so >= d.'
            },
            {
                title: 'Alternative Data Structure: Fibonacci Heap',
                difficulty: 'Very Hard',
                description: 'Dijkstra\'s with a binary heap runs in O((V+E) log V). With a Fibonacci heap, it runs in O(V log V + E). Explain what operation becomes faster with a Fibonacci heap and why this matters for dense graphs.',
                whyDifferent: 'Binary heaps do O(log n) decrease-key operations. Fibonacci heaps do O(1) amortized decrease-key. For dense graphs (E = V^2), the difference between O(V^2 log V) and O(V^2 + V log V) is significant.',
                example: 'Dense graph with V=1000, E=500000. Binary heap: ~500000 * 10 = 5M ops. Fibonacci heap: ~500000 + 1000 * 10 = 510K ops. Nearly 10x speedup for the decrease-key operations.'
            },
            {
                title: 'When Does Greedy Fail: K Shortest Paths',
                difficulty: 'Hard',
                description: 'Modify Dijkstra\'s to find not just the shortest path, but the K shortest paths from source to destination. The standard greedy approach of finalizing nodes fails because you may need to revisit nodes.',
                whyDifferent: 'In standard Dijkstra\'s, each node is processed once. For K shortest paths, a node may appear on multiple shortest paths, so the "skip if already visited" optimization breaks the algorithm.',
                example: 'Graph: A->B (1), A->C (2), B->C (1), C->D (1). K=2 shortest paths from A to D: [A->C->D]=3 and [A->B->C->D]=3. Node C is used in both paths with different arrival distances.'
            },
            {
                title: 'Implementation Without Priority Queue',
                difficulty: 'Medium',
                description: 'Implement Dijkstra\'s without a heap, using a simple array to find the minimum distance vertex. Compare the time complexity. When is this simpler version actually faster than the heap version?',
                whyDifferent: 'The array version is O(V^2) regardless of edges. For dense graphs (E near V^2), this beats O((V+E) log V) = O(V^2 log V). Forces thinking about when sophisticated data structures hurt rather than help.',
                example: 'Complete graph with 100 vertices: Array version = 100^2 = 10K ops. Heap version = (100 + 4950) * 7 = 35K ops. The simpler algorithm wins on dense graphs.'
            },
            {
                title: 'Parallel Version: Delta-Stepping',
                difficulty: 'Very Hard',
                description: 'Design a parallel version of Dijkstra\'s algorithm. The challenge: Dijkstra\'s is inherently sequential since it processes one vertex at a time. Delta-stepping relaxes this by processing all vertices within a distance band simultaneously.',
                whyDifferent: 'Standard Dijkstra\'s has a strict sequential dependency: the next vertex to process depends on the current state. Parallelization requires relaxing this constraint at the cost of potentially doing redundant work.',
                example: 'With delta=3, process all vertices with distance in [0,3), then [3,6), etc. Within each band, edges can be relaxed in parallel. Light edges (weight < delta) may cause chain reactions within a band.'
            }
        ],
        similar: [
    { id: '02-dijkstras-algorithm/02-dijkstras-algorithm/01-network-delay-time', name: 'Network Delay Time', difficulty: 'Medium' },
    { id: '02-dijkstras-algorithm/02-cheapest-flights', name: 'Cheapest Flights Within K Stops', difficulty: 'Medium' },
    { id: '02-dijkstras-algorithm/03-path-with-minimum-effort', name: 'Path With Minimum Effort', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm'] = problem;

})();
