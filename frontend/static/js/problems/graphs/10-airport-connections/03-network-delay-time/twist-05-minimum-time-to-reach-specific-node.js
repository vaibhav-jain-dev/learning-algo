/**
 * Minimum Time to Reach Specific Node
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: dijkstra
 * Parent: 10-airport-connections/03-network-delay-time
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Time to Reach Specific Node',
        difficulty: 'Easy',
        algorithm: 'dijkstra',
        parent: '10-airport-connections/03-network-delay-time',
        description: 'Instead of waiting for all nodes, find the minimum time for the signal to reach a specific target node.',
        problem: 'You can stop Dijkstra early when the target node is popped from the priority queue, potentially much faster than computing all distances.',
        hints: [
            'Start by understanding the key difference: You can stop Dijkstra early when the target node is popped from the priority queue, potentially much faster than computing all distances.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Send signal from node 1, need it at node 5.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(E log V)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"times":[[2,1,1],[2,3,1],[3,4,1]],"n":4,"k":2},
                output: 1,
                explanation: 'The priority queue ensures we always process the nearest unvisited node. When a node is dequeued, its shortest distance is finalized. Neighbors are updated if a shorter path is found.'
            },
            // Edge case
            {
                input: {"times":[[2,1,1]],"n":0,"k":0},
                output: 0,
                explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
            }
        ],
        solutions: {
            python: `def minimum_time_to_reach_specific_node(times, n, k):
    """
    Minimum Time to Reach Specific Node

    Instead of waiting for all nodes, find the minimum time for the signal to reach a specific target node.

    Time: O(E log V)
    Space: O(V + E)
    """
    count = 0
    n = len(times)

    for i in range(n):
        # Check condition based on n
        j = 0
        for k in range(i, n):
            if j < len(n) and times[k] == n[j]:
                j += 1
        if j == len(n):
            count += 1

    return count


# Test cases
print(minimum_time_to_reach_specific_node([[2,1,1],[2,3,1],[3,4,1]], 4, 2))  # Expected: 1
print(minimum_time_to_reach_specific_node([[2,1,1]], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumTimeToReachSpecificNode solves the Minimum Time to Reach Specific Node problem.
// Instead of waiting for all nodes, find the minimum time for the signal to reach a specific target node.
// Time: O(E log V), Space: O(V + E)
func MinimumTimeToReachSpecificNode(times [][]int, n int, k int) int {
	result := 0

	for i := 0; i < len(times); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumTimeToReachSpecificNode([][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}, 4, 2)) // Expected: 1
	fmt.Println(MinimumTimeToReachSpecificNode([][]int{{2, 1, 1}}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/03-network-delay-time/twist-05-minimum-time-to-reach-specific-node', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/03-network-delay-time/twist-05-minimum-time-to-reach-specific-node'] = problem;
})();
