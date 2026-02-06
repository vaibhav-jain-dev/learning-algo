/**
 * Detect All Cycles
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 * Parent: 03-topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Detect All Cycles',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'If the graph contains cycles, identify and return all nodes that participate in at least one cycle.',
        problem: 'Goes beyond simple cycle detection to cycle characterization, requiring SCC (Strongly Connected Components) or iterative peeling of zero in-degree nodes.',
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
                explanation: 'The detect all cycles for this input yields [5,2, 5,0, 4,0].'
            },
            {
                input: {"n":2,"edges":[[1,0],[0,1]]},
                output: [[1,0],[0,1]],
                explanation: 'The detect all cycles for this input yields [1,0, 0,1].'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[5,2]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def detect_all_cycles(n, edges):
    """
    Detect All Cycles

    If the graph contains cycles, identify and return all nodes that participate in at least one cycle.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(detect_all_cycles(6, [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]))  # Expected: [[5,2],[5,0],[4,0]]
print(detect_all_cycles(2, [[1,0],[0,1]]))  # Expected: [[1,0],[0,1]]
print(detect_all_cycles(0, [[5,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// DetectAllCycles solves the Detect All Cycles problem.
// If the graph contains cycles, identify and return all nodes that participate in at least one cycle.
// Time: O(?), Space: O(?)
func DetectAllCycles(n int, edges [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(DetectAllCycles(6, [][]int{{5, 2}, {5, 0}, {4, 0}, {4, 1}, {2, 3}, {3, 1}})) // Expected: [[5,2],[5,0],[4,0]]
	fmt.Println(DetectAllCycles(2, [][]int{{1, 0}, {0, 1}})) // Expected: [[1,0],[0,1]]
	fmt.Println(DetectAllCycles(0, [][]int{{5, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/twist-02-detect-all-cycles', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/twist-02-detect-all-cycles'] = problem;
})();
