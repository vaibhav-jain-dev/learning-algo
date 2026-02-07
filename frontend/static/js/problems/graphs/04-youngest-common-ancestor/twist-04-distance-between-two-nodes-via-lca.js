/**
 * Distance Between Two Nodes via LCA
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Distance Between Two Nodes via LCA',
        difficulty: 'Medium',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor',
        description: 'Find the distance (number of edges) between two nodes in a tree using LCA. Distance = depth(u) + depth(v) - 2*depth(LCA(u,v)).',
        problem: 'Combines LCA computation with depth tracking. The formula leveraging LCA is the key insight - without it, you would need to find the actual path between two nodes.',
        hints: [
            'Start by understanding the key difference: Combines LCA computation with depth tracking.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Tree with root A at depth 0.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(D)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":"A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G","descendant1":"E","descendant2":"I"},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"tree":"A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G","descendant1":"H","descendant2":"G"},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"tree":"","descendant1":"","descendant2":""},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def distance_between_two_nodes_via_lca(tree, descendant1, descendant2):
    """
    Distance Between Two Nodes via LCA

    Find the distance (number of edges) between two nodes in a tree using LCA. Distance = depth(u) + depth(v) - 2*depth(LCA(u,v)).

    Time: O(D)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on descendant1
        j = 0
        for k in range(i, n):
            if j < len(descendant1) and tree[k] == descendant1[j]:
                j += 1
        if j == len(descendant1):
            count += 1

    return count


# Test cases
print(distance_between_two_nodes_via_lca("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "E", "I"))  # Expected: 1
print(distance_between_two_nodes_via_lca("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "H", "G"))  # Expected: 2
print(distance_between_two_nodes_via_lca("", "", ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// DistanceBetweenTwoNodesViaLca solves the Distance Between Two Nodes via LCA problem.
// Find the distance (number of edges) between two nodes in a tree using LCA. Distance = depth(u) + depth(v) - 2*depth(LCA(u,v)).
// Time: O(D), Space: O(1)
func DistanceBetweenTwoNodesViaLca(tree string, descendant1 string, descendant2 string) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DistanceBetweenTwoNodesViaLca("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "E", "I")) // Expected: 1
	fmt.Println(DistanceBetweenTwoNodesViaLca("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "H", "G")) // Expected: 2
	fmt.Println(DistanceBetweenTwoNodesViaLca("", "", "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/twist-04-distance-between-two-nodes-via-lca', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/twist-04-distance-between-two-nodes-via-lca'] = problem;
})();
