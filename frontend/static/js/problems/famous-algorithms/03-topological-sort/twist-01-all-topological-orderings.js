/**
 * All Topological Orderings
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 * Parent: 03-topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Topological Orderings',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'Instead of finding one valid topological ordering, enumerate all possible valid topological orderings of the DAG.',
        problem: 'Requires backtracking through all possible choices of zero in-degree nodes at each step, exploring every branch of the decision tree.',
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
                output: [[5,2],[5,0],[4,0]],
                explanation: 'The all topological orderings for this input yields [5,2, 5,0, 4,0].'
            },
            {
                input: {"n":2,"edges":[[1,0],[0,1]]},
                output: [[1,0],[0,1]],
                explanation: 'The all topological orderings for this input yields [1,0, 0,1].'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[5,2]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def all_topological_orderings(n, edges):
    """
    All Topological Orderings

    Instead of finding one valid topological ordering, enumerate all possible valid topological orderings of the DAG.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(all_topological_orderings(6, [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]))  # Expected: [[5,2],[5,0],[4,0]]
print(all_topological_orderings(2, [[1,0],[0,1]]))  # Expected: [[1,0],[0,1]]
print(all_topological_orderings(0, [[5,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// AllTopologicalOrderings solves the All Topological Orderings problem.
// Instead of finding one valid topological ordering, enumerate all possible valid topological orderings of the DAG.
// Time: O(?), Space: O(?)
func AllTopologicalOrderings(n int, edges [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(AllTopologicalOrderings(6, [][]int{{5, 2}, {5, 0}, {4, 0}, {4, 1}, {2, 3}, {3, 1}})) // Expected: [[5,2],[5,0],[4,0]]
	fmt.Println(AllTopologicalOrderings(2, [][]int{{1, 0}, {0, 1}})) // Expected: [[1,0],[0,1]]
	fmt.Println(AllTopologicalOrderings(0, [][]int{{5, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/twist-01-all-topological-orderings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/twist-01-all-topological-orderings'] = problem;
})();
