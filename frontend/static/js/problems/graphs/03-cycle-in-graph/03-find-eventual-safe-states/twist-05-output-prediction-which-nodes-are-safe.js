/**
 * Output Prediction: Which Nodes are Safe?
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/03-find-eventual-safe-states
 */
(function() {
    'use strict';

    const problem = {
        name: 'Output Prediction: Which Nodes are Safe?',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/03-find-eventual-safe-states',
        description: 'Given a graph diagram, predict which nodes are safe without running an algorithm. Trace paths mentally from each node to determine if all paths terminate.',
        problem: 'Tests conceptual understanding rather than coding. You must reason about the difference between "some paths terminate" and "ALL paths terminate" from a node, which is the key insight of the problem.',
        hints: [
            'Start by understanding the key difference: Tests conceptual understanding rather than coding.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Graph: A->B, A->C, B->D, D->B, C->E.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
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
                explanation: 'The output prediction which nodes are safe for this input yields [1,2, 2,3, 5].'
            },
            {
                input: {"graph":[[1,2,3,4],[1,2],[3,4],[0,4],[]]},
                output: [[1,2,3,4],[1,2],[3,4]],
                explanation: 'The output prediction which nodes are safe for this input yields [1,2,3,4, 1,2, 3,4].'
            },
            // Edge case
            {
                input: {"graph":[[1,2]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def output_prediction_which_nodes_are_safe(graph):
    """
    Output Prediction: Which Nodes are Safe?

    Given a graph diagram, predict which nodes are safe without running an algorithm. Trace paths mentally from each node to determine if all paths terminate.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(graph)):
        # Check if element meets criteria
        result.append(graph[i])

    return result


# Test cases
print(output_prediction_which_nodes_are_safe([[1,2],[2,3],[5],[0],[5],[],[]]))  # Expected: [[1,2],[2,3],[5]]
print(output_prediction_which_nodes_are_safe([[1,2,3,4],[1,2],[3,4],[0,4],[]]))  # Expected: [[1,2,3,4],[1,2],[3,4]]
print(output_prediction_which_nodes_are_safe([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// OutputPredictionWhichNodesAreSafe solves the Output Prediction: Which Nodes are Safe? problem.
// Given a graph diagram, predict which nodes are safe without running an algorithm. Trace paths mentally from each node to determine if all paths terminate.
// Time: O(V + E), Space: O(V)
func OutputPredictionWhichNodesAreSafe(graph [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(graph); i++ {
		result = append(result, graph[i])
	}

	return result
}

func main() {
	fmt.Println(OutputPredictionWhichNodesAreSafe([][]int{{1, 2}, {2, 3}, {5}, {0}, {5}, {}, {}})) // Expected: [[1,2],[2,3],[5]]
	fmt.Println(OutputPredictionWhichNodesAreSafe([][]int{{1, 2, 3, 4}, {1, 2}, {3, 4}, {0, 4}, {}})) // Expected: [[1,2,3,4],[1,2],[3,4]]
	fmt.Println(OutputPredictionWhichNodesAreSafe([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/03-find-eventual-safe-states/twist-05-output-prediction-which-nodes-are-safe', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/03-find-eventual-safe-states/twist-05-output-prediction-which-nodes-are-safe'] = problem;
})();
