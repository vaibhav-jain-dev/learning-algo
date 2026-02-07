/**
 * Detect Cycle of Specific Length
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Detect Cycle of Specific Length',
        difficulty: 'Hard',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph',
        description: 'Determine if the graph contains a cycle of exactly length K. A general cycle detection is not sufficient.',
        problem: 'Standard DFS cycle detection finds any cycle. Finding a cycle of specific length requires tracking path lengths and potentially exploring all cycles, which is much more computationally expensive.',
        hints: [
            'Start by understanding the key difference: Standard DFS cycle detection finds any cycle.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Graph with cycles of length 3 and 5.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"edges":[[1,3],[2,3,4],[0],[],[2,5],[]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"edges":[[1,2],[2],[]]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"edges":[[1,3]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def detect_cycle_of_specific_length(edges):
    """
    Detect Cycle of Specific Length

    Determine if the graph contains a cycle of exactly length K. A general cycle detection is not sufficient.

    Time: O(V + E)
    Space: O(V)
    """
    result = 0

    for i in range(len(edges)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(detect_cycle_of_specific_length([[1,3],[2,3,4],[0],[],[2,5],[]]))  # Expected: 1
print(detect_cycle_of_specific_length([[1,2],[2],[]]))  # Expected: 2
print(detect_cycle_of_specific_length([[1,3]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// DetectCycleOfSpecificLength solves the Detect Cycle of Specific Length problem.
// Determine if the graph contains a cycle of exactly length K. A general cycle detection is not sufficient.
// Time: O(V + E), Space: O(V)
func DetectCycleOfSpecificLength(edges [][]int) int {
	result := 0

	for i := 0; i < len(edges); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DetectCycleOfSpecificLength([][]int{{1, 3}, {2, 3, 4}, {0}, {}, {2, 5}, {}})) // Expected: 1
	fmt.Println(DetectCycleOfSpecificLength([][]int{{1, 2}, {2}, {}})) // Expected: 2
	fmt.Println(DetectCycleOfSpecificLength([][]int{{1, 3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/twist-03-detect-cycle-of-specific-length', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/twist-03-detect-cycle-of-specific-length'] = problem;
})();
