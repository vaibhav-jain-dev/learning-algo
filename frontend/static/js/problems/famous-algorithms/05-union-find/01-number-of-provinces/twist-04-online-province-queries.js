/**
 * Online Province Queries
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
 * Parent: 05-union-find/01-number-of-provinces
 */
(function() {
    'use strict';

    const problem = {
        name: 'Online Province Queries',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find/01-number-of-provinces',
        description: 'Connections are added one at a time. After each new connection, report the current number of provinces.',
        problem: 'Naturally fits Union-Find with a decreasing counter, but emphasizes the incremental/online nature of the algorithm vs. a batch processing approach.',
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
                input: {"isConnected":[[1,1,0],[1,1,0],[0,0,1]]},
                output: 1,
                explanation: 'After processing all edges, the number of distinct roots equals the number of connected components. Each find operation is nearly O(1) with path compression.'
            },
            // Edge case
            {
                input: {"isConnected":[[1,1,0]]},
                output: 0,
                explanation: 'Process each connection/edge. For each pair, find their root representatives. If different, merge the smaller tree into the larger one (union by rank). Path compression flattens the tree on each find.'
            }
        ],
        solutions: {
            python: `def online_province_queries(isConnected):
    """
    Online Province Queries

    Connections are added one at a time. After each new connection, report the current number of provinces.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(isConnected)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(online_province_queries([[1,1,0],[1,1,0],[0,0,1]]))  # Expected: 1
print(online_province_queries([[1,1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// OnlineProvinceQueries solves the Online Province Queries problem.
// Connections are added one at a time. After each new connection, report the current number of provinces.
// Time: O(?), Space: O(?)
func OnlineProvinceQueries(isConnected [][]int) int {
	result := 0

	for i := 0; i < len(isConnected); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(OnlineProvinceQueries([][]int{{1, 1, 0}, {1, 1, 0}, {0, 0, 1}})) // Expected: 1
	fmt.Println(OnlineProvinceQueries([][]int{{1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/01-number-of-provinces/twist-04-online-province-queries', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/01-number-of-provinces/twist-04-online-province-queries'] = problem;
})();
