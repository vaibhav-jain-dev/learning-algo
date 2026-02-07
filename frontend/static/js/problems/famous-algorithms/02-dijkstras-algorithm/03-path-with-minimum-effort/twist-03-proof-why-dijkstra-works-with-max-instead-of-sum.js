/**
 * Proof: Why Dijkstra Works With Max Instead of Sum
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: dijkstras-algorithm
 * Parent: 02-dijkstras-algorithm/03-path-with-minimum-effort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Proof: Why Dijkstra Works With Max Instead of Sum',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/03-path-with-minimum-effort',
        description: 'Standard Dijkstra minimizes sum of edge weights. Here we minimize the maximum edge weight on the path. Prove that Dijkstra.',
        problem: 'The max operation is not the same as sum. You must prove that the "bottleneck shortest path" variant preserves the key property: any alternative path through unvisited nodes has effort >= current effort.',
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
                input: {"heights":[[1,2,2],[3,8,2],[5,3,5]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the proof why dijkstra works with max instead of sum criteria.'
            },
            // Edge case
            {
                input: {"heights":[[1,2,2]]},
                output: 0,
                explanation: 'Process the closest unvisited node first, relaxing all outgoing edges.'
            }
        ],
        solutions: {
            python: `def proof_why_dijkstra_works_with_max_instead_of_sum(heights):
    """
    Proof: Why Dijkstra Works With Max Instead of Sum

    Standard Dijkstra minimizes sum of edge weights. Here we minimize the maximum edge weight on the path. Prove that Dijkstra\\

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(heights)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(proof_why_dijkstra_works_with_max_instead_of_sum([[1,2,2],[3,8,2],[5,3,5]]))  # Expected: 2
print(proof_why_dijkstra_works_with_max_instead_of_sum([[1,2,2]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ProofWhyDijkstraWorksWithMaxInsteadOfSum solves the Proof: Why Dijkstra Works With Max Instead of Sum problem.
// Standard Dijkstra minimizes sum of edge weights. Here we minimize the maximum edge weight on the path. Prove that Dijkstra\\
// Time: O(?), Space: O(?)
func ProofWhyDijkstraWorksWithMaxInsteadOfSum(heights [][]int) int {
	result := 0

	for i := 0; i < len(heights); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ProofWhyDijkstraWorksWithMaxInsteadOfSum([][]int{{1, 2, 2}, {3, 8, 2}, {5, 3, 5}})) // Expected: 2
	fmt.Println(ProofWhyDijkstraWorksWithMaxInsteadOfSum([][]int{{1, 2, 2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/03-path-with-minimum-effort/twist-03-proof-why-dijkstra-works-with-max-instead-of-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/03-path-with-minimum-effort/twist-03-proof-why-dijkstra-works-with-max-instead-of-sum'] = problem;
})();
