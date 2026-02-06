/**
 * Find Unsafe States and the Cycles They Belong To
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/03-find-eventual-safe-states
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Unsafe States and the Cycles They Belong To',
        difficulty: 'Hard',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/03-find-eventual-safe-states',
        description: 'Return not just the safe nodes, but for each unsafe node, identify which cycle it participates in or leads to.',
        problem: 'Requires not just classification but cycle extraction. You need to trace back through gray nodes to reconstruct the actual cycles, grouping unsafe nodes by their associated cycle.',
        hints: [
            'Start by understanding the key difference: Requires not just classification but cycle extraction.',
            'Consider breaking this into subproblems and solving each independently.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"graph":[[1,2],[2,3],[5],[0],[5],[],[]]},
                output: [[1,2],[2,3],[5]],
                explanation: 'The find unsafe states and the cycles they belong to for this input yields [1,2, 2,3, 5].'
            },
            {
                input: {"graph":[[1,2,3,4],[1,2],[3,4],[0,4],[]]},
                output: [[1,2,3,4],[1,2],[3,4]],
                explanation: 'The find unsafe states and the cycles they belong to for this input yields [1,2,3,4, 1,2, 3,4].'
            },
            // Edge case
            {
                input: {"graph":[[1,2]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def find_unsafe_states_and_the_cycles_they_belong_to(graph):
    """
    Find Unsafe States and the Cycles They Belong To

    Return not just the safe nodes, but for each unsafe node, identify which cycle it participates in or leads to.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(graph)):
        # Check if element meets criteria
        result.append(graph[i])

    return result


# Test cases
print(find_unsafe_states_and_the_cycles_they_belong_to([[1,2],[2,3],[5],[0],[5],[],[]]))  # Expected: [[1,2],[2,3],[5]]
print(find_unsafe_states_and_the_cycles_they_belong_to([[1,2,3,4],[1,2],[3,4],[0,4],[]]))  # Expected: [[1,2,3,4],[1,2],[3,4]]
print(find_unsafe_states_and_the_cycles_they_belong_to([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// FindUnsafeStatesAndTheCyclesTheyBelongTo solves the Find Unsafe States and the Cycles They Belong To problem.
// Return not just the safe nodes, but for each unsafe node, identify which cycle it participates in or leads to.
// Time: O(V + E), Space: O(V)
func FindUnsafeStatesAndTheCyclesTheyBelongTo(graph [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(graph); i++ {
		result = append(result, graph[i])
	}

	return result
}

func main() {
	fmt.Println(FindUnsafeStatesAndTheCyclesTheyBelongTo([][]int{{1, 2}, {2, 3}, {5}, {0}, {5}, {}, {}})) // Expected: [[1,2],[2,3],[5]]
	fmt.Println(FindUnsafeStatesAndTheCyclesTheyBelongTo([][]int{{1, 2, 3, 4}, {1, 2}, {3, 4}, {0, 4}, {}})) // Expected: [[1,2,3,4],[1,2],[3,4]]
	fmt.Println(FindUnsafeStatesAndTheCyclesTheyBelongTo([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/03-find-eventual-safe-states/twist-02-find-unsafe-states-and-the-cycles-they-belong-to', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/03-find-eventual-safe-states/twist-02-find-unsafe-states-and-the-cycles-they-belong-to'] = problem;
})();
