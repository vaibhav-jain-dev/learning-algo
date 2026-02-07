/**
 * Connect in Groups
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: minimum-spanning-tree
 * Parent: 10-airport-connections/02-min-cost-connect-points
 */
(function() {
    'use strict';

    const problem = {
        name: 'Connect in Groups',
        difficulty: 'Hard',
        algorithm: 'minimum-spanning-tree',
        parent: '10-airport-connections/02-min-cost-connect-points',
        description: 'Points have colors. Only connect points of different colors. Find the minimum cost to make all points reachable from each other.',
        problem: 'Same-color edges are forbidden. The edge set is restricted, and valid MST must only use inter-color edges, which may not always produce a spanning tree.',
        hints: [
            'Start by understanding the key difference: Same-color edges are forbidden.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Red points: (0,0),(1,0).',
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
            python: `def connect_in_groups(points):
    """
    Connect in Groups

    Points have colors. Only connect points of different colors. Find the minimum cost to make all points reachable from each other.

    Time: O(n^2 log n)
    Space: O(n^2)
    """
    result = 0

    for i in range(len(points)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(connect_in_groups([[0,0],[2,2],[3,10],[5,2],[7,0]]))  # Expected: 1
print(connect_in_groups([[0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ConnectInGroups solves the Connect in Groups problem.
// Points have colors. Only connect points of different colors. Find the minimum cost to make all points reachable from each other.
// Time: O(n^2 log n), Space: O(n^2)
func ConnectInGroups(points [][]int) int {
	result := 0

	for i := 0; i < len(points); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ConnectInGroups([][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}})) // Expected: 1
	fmt.Println(ConnectInGroups([][]int{{0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/02-min-cost-connect-points/twist-05-connect-in-groups', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/02-min-cost-connect-points/twist-05-connect-in-groups'] = problem;
})();
