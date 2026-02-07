/**
 * Longest Path in DAG
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 * Parent: 03-topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Path in DAG',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'Using topological sort, find the length of the longest path in the DAG (critical path).',
        problem: 'Leverages topological order as a preprocessing step for a DP problem, computing maximum distances instead of just ordering.',
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
                input: {"n":6,"edges":[[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]},
                output: 2,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"n":2,"edges":[[1,0],[0,1]]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[5,2]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def longest_path_in_dag(n, edges):
    """
    Longest Path in DAG

    Using topological sort, find the length of the longest path in the DAG (critical path).

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on edges
        j = 0
        for k in range(i, n):
            if j < len(edges) and n[k] == edges[j]:
                j += 1
        if j == len(edges):
            count += 1

    return count


# Test cases
print(longest_path_in_dag(6, [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]))  # Expected: 2
print(longest_path_in_dag(2, [[1,0],[0,1]]))  # Expected: 2
print(longest_path_in_dag(0, [[5,2]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LongestPathInDag solves the Longest Path in DAG problem.
// Using topological sort, find the length of the longest path in the DAG (critical path).
// Time: O(?), Space: O(?)
func LongestPathInDag(n int, edges [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LongestPathInDag(6, [][]int{{5, 2}, {5, 0}, {4, 0}, {4, 1}, {2, 3}, {3, 1}})) // Expected: 2
	fmt.Println(LongestPathInDag(2, [][]int{{1, 0}, {0, 1}})) // Expected: 2
	fmt.Println(LongestPathInDag(0, [][]int{{5, 2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/twist-05-longest-path-in-dag', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/twist-05-longest-path-in-dag'] = problem;
})();
