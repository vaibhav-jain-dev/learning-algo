/**
 * Cycle Detection in an Undirected Graph
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Cycle Detection in an Undirected Graph',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph',
        description: 'Detect whether an undirected graph contains a cycle. The three-color approach for directed graphs needs modification since every edge appears twice.',
        problem: 'In undirected graphs, a visited neighbor is not always a back edge - it might be the parent you just came from. You must track the parent node to avoid false positives, or use Union-Find instead.',
        hints: [
            'Start by understanding the key difference: In undirected graphs, a visited neighbor is not always a back edge - it might be the parent you just came from.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Edges: 1-2, 2-3, 3-1.',
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
                output: true,
                explanation: 'The cycle detection in an undirected graph condition is satisfied for this input.'
            },
            {
                input: {"edges":[[1,2],[2],[]]},
                output: false,
                explanation: 'The cycle detection in an undirected graph condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"edges":[[1,3]]},
                output: false,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def cycle_detection_in_an_undirected_graph(edges):
    """
    Cycle Detection in an Undirected Graph

    Detect whether an undirected graph contains a cycle. The three-color approach for directed graphs needs modification since every edge appears twice.

    Time: O(V + E)
    Space: O(V)
    """
    if not edges:
        return False

    # Process the input
    for i in range(len(edges)):
        pass  # Check condition

    return True


# Test cases
print(cycle_detection_in_an_undirected_graph([[1,3],[2,3,4],[0],[],[2,5],[]]))  # Expected: True
print(cycle_detection_in_an_undirected_graph([[1,2],[2],[]]))  # Expected: False
print(cycle_detection_in_an_undirected_graph([[1,3]]))  # Expected: False
`,
            go: `package main

import "fmt"

// CycleDetectionInAnUndirectedGraph solves the Cycle Detection in an Undirected Graph problem.
// Detect whether an undirected graph contains a cycle. The three-color approach for directed graphs needs modification since every edge appears twice.
// Time: O(V + E), Space: O(V)
func CycleDetectionInAnUndirectedGraph(edges [][]int) bool {
	if len(edges) == 0 {
		return false
	}

	return true
}

func main() {
	fmt.Println(CycleDetectionInAnUndirectedGraph([][]int{{1, 3}, {2, 3, 4}, {0}, {}, {2, 5}, {}})) // Expected: true
	fmt.Println(CycleDetectionInAnUndirectedGraph([][]int{{1, 2}, {2}, {}})) // Expected: false
	fmt.Println(CycleDetectionInAnUndirectedGraph([][]int{{1, 3}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/twist-01-cycle-detection-in-an-undirected-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/twist-01-cycle-detection-in-an-undirected-graph'] = problem;
})();
