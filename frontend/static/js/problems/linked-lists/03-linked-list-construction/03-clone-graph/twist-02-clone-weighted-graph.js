/**
 * Clone Weighted Graph
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction/03-clone-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone Weighted Graph',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/03-clone-graph',
        description: 'Each edge has a weight. Clone the graph preserving edge weights. Nodes have a val and a list of (neighbor, weight) pairs.',
        problem: 'The BFS/DFS traversal is the same, but the data structure changes. You must clone edges as (cloned_neighbor, weight) pairs. The hash map approach still works but the neighbor cloning step carries additional data.',
        hints: [
            'Each edge has a weight',
            'The BFS/DFS traversal is the same, but the data structure changes',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"list":[1,2,3,4,5]},
                output: [1,2,3,4,5],
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def clone_weighted_graph(adjList):
    """
    Clone Weighted Graph

    Each edge has a weight. Clone the graph preserving edge weights. Nodes have a val and a list of (neighbor, weight) pairs.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(adjList)):
        # Check if element meets criteria
        result.append(adjList[i])

    return result


# Test cases
print(clone_weighted_graph(None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CloneWeightedGraph solves the Clone Weighted Graph problem.
// Each edge has a weight. Clone the graph preserving edge weights. Nodes have a val and a list of (neighbor, weight) pairs.
// Time: O(n), Space: O(1)
func CloneWeightedGraph(adjList [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(adjList); i++ {
		result = append(result, adjList[i])
	}

	return result
}

func main() {
	fmt.Println(CloneWeightedGraph(nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/03-clone-graph/twist-02-clone-weighted-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/03-clone-graph/twist-02-clone-weighted-graph'] = problem;
})();
