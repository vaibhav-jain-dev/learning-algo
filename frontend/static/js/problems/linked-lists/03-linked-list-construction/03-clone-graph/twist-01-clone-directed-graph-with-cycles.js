/**
 * Clone Directed Graph with Cycles
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction/03-clone-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone Directed Graph with Cycles',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/03-clone-graph',
        description: 'Clone a directed graph that may contain cycles. Each node has a list of directed edges. Ensure cycles in the clone mirror cycles in the original.',
        problem: 'The undirected graph BFS/DFS approach works but you must be extra careful that directed edges are cloned in the correct direction. A node might be reachable from multiple paths, and all incoming edges must point to the same cloned node.',
        hints: [
            'Clone a directed graph that may contain cycles',
            'The undirected graph BFS/DFS approach works but you must be extra careful that directed edges are cloned in the correct direction',
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
            python: `def clone_directed_graph_with_cycles(adjList):
    """
    Clone Directed Graph with Cycles

    Clone a directed graph that may contain cycles. Each node has a list of directed edges. Ensure cycles in the clone mirror cycles in the original.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(adjList)):
        # Check if element meets criteria
        result.append(adjList[i])

    return result


# Test cases
print(clone_directed_graph_with_cycles(None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CloneDirectedGraphWithCycles solves the Clone Directed Graph with Cycles problem.
// Clone a directed graph that may contain cycles. Each node has a list of directed edges. Ensure cycles in the clone mirror cycles in the original.
// Time: O(n), Space: O(1)
func CloneDirectedGraphWithCycles(adjList [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(adjList); i++ {
		result = append(result, adjList[i])
	}

	return result
}

func main() {
	fmt.Println(CloneDirectedGraphWithCycles(nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/03-clone-graph/twist-01-clone-directed-graph-with-cycles', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/03-clone-graph/twist-01-clone-directed-graph-with-cycles'] = problem;
})();
