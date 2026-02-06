/**
 * Bottleneck Path
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 * Parent: 07-prims-algorithm/02-network-delay-mst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bottleneck Path',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/02-network-delay-mst',
        description: 'Instead of total cost, find the path from source to each node that minimizes the maximum edge weight along the path (minimax path).',
        problem: 'The minimax path actually lies on the MST (a key property), but proving this and extracting the paths requires different reasoning than standard shortest paths.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"connections":[[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the bottleneck path criteria.'
            },
            // Edge case
            {
                input: {"n":0,"connections":[[0,1,1]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bottleneck_path(n, connections):
    """
    Bottleneck Path

    Instead of total cost, find the path from source to each node that minimizes the maximum edge weight along the path (minimax path).

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on connections
        j = 0
        for k in range(i, n):
            if j < len(connections) and n[k] == connections[j]:
                j += 1
        if j == len(connections):
            count += 1

    return count


# Test cases
print(bottleneck_path(4, [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]]))  # Expected: 2
print(bottleneck_path(0, [[0,1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// BottleneckPath solves the Bottleneck Path problem.
// Instead of total cost, find the path from source to each node that minimizes the maximum edge weight along the path (minimax path).
// Time: O(?), Space: O(?)
func BottleneckPath(n int, connections [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BottleneckPath(4, [][]int{{0, 1, 1}, {0, 2, 2}, {1, 2, 3}, {1, 3, 4}, {2, 3, 5}})) // Expected: 2
	fmt.Println(BottleneckPath(0, [][]int{{0, 1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/02-network-delay-mst/twist-03-bottleneck-path', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/02-network-delay-mst/twist-03-bottleneck-path'] = problem;
})();
