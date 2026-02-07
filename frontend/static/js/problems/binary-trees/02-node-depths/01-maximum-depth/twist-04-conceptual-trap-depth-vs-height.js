/**
 * Conceptual Trap: Depth vs Height
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-dfs
 * Parent: 02-node-depths/01-maximum-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Conceptual Trap: Depth vs Height',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '02-node-depths/01-maximum-depth',
        description: 'What is the maximum depth of a tree with a single node? Some define depth as edges (answer: 0), others as nodes (answer: 1). Solve for both definitions. Forces you to clarify the definition. The recursive base case changes: return 0 for null (node-counting) vs return -1 for null (edge-counting). Off-by-one errors are extremely common here.',
        problem: 'Forces you to clarify the definition. The recursive base case changes: return 0 for null (node-counting) vs return -1 for null (edge-counting). Off-by-one errors are extremely common here.',
        hints: [
            'Consider: What is the maximum depth of a tree with a single node? Some define depth as edges (answer: 0), others as nodes (answer: 1).',
            'Solve for both definitions.',
            'Key insight: Forces you to clarify the definition.',
            'Off-by-one errors are extremely common here.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"tree":{"value":1,"right":{"value":2}}},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_depth_vs_height(tree):
    """
    Conceptual Trap: Depth vs Height

    What is the maximum depth of a tree with a single node? Some define depth as edges (answer: 0), others as nodes (answer: 1). Solve for both definitions. Forces you to clarify the definition. The recursive base case changes: return 0 for null (node-counting) vs return -1 for null (edge-counting). Off-by-one errors are extremely common here.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(conceptual_trap_depth_vs_height({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(conceptual_trap_depth_vs_height({"value": 1, "right": {"value": 2}}))  # Expected: 2
print(conceptual_trap_depth_vs_height({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// ConceptualTrapDepthVsHeight solves the Conceptual Trap: Depth vs Height problem.
// What is the maximum depth of a tree with a single node? Some define depth as edges (answer: 0), others as nodes (answer: 1). Solve for both definitions. Forces you to clarify the definition. The recursive base case changes: return 0 for null (node-counting) vs return -1 for null (edge-counting). Off-by-one errors are extremely common here.
// Time: O(n), Space: O(n)
func ConceptualTrapDepthVsHeight(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ConceptualTrapDepthVsHeight({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(ConceptualTrapDepthVsHeight({"value":1,"right":{"value":2}})) // Expected: 2
	fmt.Println(ConceptualTrapDepthVsHeight({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/01-maximum-depth/twist-04-conceptual-trap-depth-vs-height', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/01-maximum-depth/twist-04-conceptual-trap-depth-vs-height'] = problem;
})();
