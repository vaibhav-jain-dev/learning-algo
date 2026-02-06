/**
 * When Does Greedy Fail: K Shortest Paths
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: dijkstras-algorithm
 * Parent: 02-dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'When Does Greedy Fail: K Shortest Paths',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm',
        description: 'Modify Dijkstra\',
        problem: 'In standard Dijkstra\',
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
                input: {"vertices":5,"edges":[[0,1,4],[0,2,1],[1,3,1],[2,1,2],[2,3,5],[3,4,3]],"source":0},
                output: [[0,1,4],[0,2,1],[1,3,1]],
                explanation: 'The when does greedy fail k shortest paths for this input yields [0,1,4, 0,2,1, 1,3,1].'
            },
            // Edge case
            {
                input: {"vertices":0,"edges":[[0,1,4]],"source":0},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def when_does_greedy_fail_k_shortest_paths(vertices, edges, source):
    """
    When Does Greedy Fail: K Shortest Paths

    Modify Dijkstra\\

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(vertices)):
        # Check if element meets criteria
        result.append(vertices[i])

    return result


# Test cases
print(when_does_greedy_fail_k_shortest_paths(5, [[0,1,4],[0,2,1],[1,3,1],[2,1,2],[2,3,5],[3,4,3]], 0))  # Expected: [[0,1,4],[0,2,1],[1,3,1]]
print(when_does_greedy_fail_k_shortest_paths(0, [[0,1,4]], 0))  # Expected: []
`,
            go: `package main

import "fmt"

// WhenDoesGreedyFailKShortestPaths solves the When Does Greedy Fail: K Shortest Paths problem.
// Modify Dijkstra\\
// Time: O(?), Space: O(?)
func WhenDoesGreedyFailKShortestPaths(vertices int, edges [][]int, source int) []int {
	result := make([]int, 0)

	for i := 0; i < len(vertices); i++ {
		result = append(result, vertices[i])
	}

	return result
}

func main() {
	fmt.Println(WhenDoesGreedyFailKShortestPaths(5, [][]int{{0, 1, 4}, {0, 2, 1}, {1, 3, 1}, {2, 1, 2}, {2, 3, 5}, {3, 4, 3}}, 0)) // Expected: [[0,1,4],[0,2,1],[1,3,1]]
	fmt.Println(WhenDoesGreedyFailKShortestPaths(0, [][]int{{0, 1, 4}}, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/twist-04-when-does-greedy-fail-k-shortest-paths', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/twist-04-when-does-greedy-fail-k-shortest-paths'] = problem;
})();
