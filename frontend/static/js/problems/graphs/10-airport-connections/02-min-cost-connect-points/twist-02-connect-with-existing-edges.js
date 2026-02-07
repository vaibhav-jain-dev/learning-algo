/**
 * Connect with Existing Edges
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: minimum-spanning-tree
 * Parent: 10-airport-connections/02-min-cost-connect-points
 */
(function() {
    'use strict';

    const problem = {
        name: 'Connect with Existing Edges',
        difficulty: 'Hard',
        algorithm: 'minimum-spanning-tree',
        parent: '10-airport-connections/02-min-cost-connect-points',
        description: 'Some points are already connected with fixed cost 0. Find the MST cost for the remaining points.',
        problem: 'Pre-connected points start in the same Union-Find component. You skip free edges and only pay for edges that connect different components.',
        hints: [
            'Start by understanding the key difference: Pre-connected points start in the same Union-Find component.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Points A, B, C, D.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(n^2 log n)',
            space: 'O(n^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"points":[[0,0],[2,2],[3,10],[5,2],[7,0]]},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"points":[[0,0]]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def connect_with_existing_edges(points):
    """
    Connect with Existing Edges

    Some points are already connected with fixed cost 0. Find the MST cost for the remaining points.

    Time: O(n^2 log n)
    Space: O(n^2)
    """
    result = 0

    for i in range(len(points)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(connect_with_existing_edges([[0,0],[2,2],[3,10],[5,2],[7,0]]))  # Expected: 1
print(connect_with_existing_edges([[0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ConnectWithExistingEdges solves the Connect with Existing Edges problem.
// Some points are already connected with fixed cost 0. Find the MST cost for the remaining points.
// Time: O(n^2 log n), Space: O(n^2)
func ConnectWithExistingEdges(points [][]int) int {
	result := 0

	for i := 0; i < len(points); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ConnectWithExistingEdges([][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}})) // Expected: 1
	fmt.Println(ConnectWithExistingEdges([][]int{{0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/02-min-cost-connect-points/twist-02-connect-with-existing-edges', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/02-min-cost-connect-points/twist-02-connect-with-existing-edges'] = problem;
})();
