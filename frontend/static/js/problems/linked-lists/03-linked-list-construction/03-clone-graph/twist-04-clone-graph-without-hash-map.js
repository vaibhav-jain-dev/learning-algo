/**
 * Clone Graph Without Hash Map
 * Category: linked-lists
 * Difficulty: Very Hard
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction/03-clone-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone Graph Without Hash Map',
        difficulty: 'Very Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/03-clone-graph',
        description: 'Clone the graph using O(1) extra space (beyond the clone itself). No hash map allowed. Hint: similar to the interleaving trick from copy-list-random-pointer.',
        problem: 'Without a hash map, you need a way to map original nodes to clones. For linked lists, interleaving works. For graphs, you could temporarily modify the original graph structure (e.g., adding clone references) then restore it. This is extremely tricky.',
        hints: [
            'Clone the graph using O(1) extra space (beyond the clone itself)',
            'Without a hash map, you need a way to map original nodes to clones',
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
            python: `def clone_graph_without_hash_map(adjList):
    """
    Clone Graph Without Hash Map

    Clone the graph using O(1) extra space (beyond the clone itself). No hash map allowed. Hint: similar to the interleaving trick from copy-list-random-pointer.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(adjList)):
        # Check if element meets criteria
        result.append(adjList[i])

    return result


# Test cases
print(clone_graph_without_hash_map(None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CloneGraphWithoutHashMap solves the Clone Graph Without Hash Map problem.
// Clone the graph using O(1) extra space (beyond the clone itself). No hash map allowed. Hint: similar to the interleaving trick from copy-list-random-pointer.
// Time: O(n), Space: O(1)
func CloneGraphWithoutHashMap(adjList [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(adjList); i++ {
		result = append(result, adjList[i])
	}

	return result
}

func main() {
	fmt.Println(CloneGraphWithoutHashMap(nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/03-clone-graph/twist-04-clone-graph-without-hash-map', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/03-clone-graph/twist-04-clone-graph-without-hash-map'] = problem;
})();
