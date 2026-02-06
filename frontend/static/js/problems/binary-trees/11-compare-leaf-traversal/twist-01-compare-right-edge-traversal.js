/**
 * Compare Right-Edge Traversal
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 * Parent: 11-compare-leaf-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Compare Right-Edge Traversal',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '11-compare-leaf-traversal',
        description: 'Instead of comparing leaf sequences, compare the right-edge sequences of two binary trees. The right edge is the sequence of nodes visited by always going right from the root until reaching a null. Leaf traversal requires full tree DFS. Right-edge traversal is a simple linear path, but the conceptual shift from leaves (bottom of tree) to edges (side of tree) requires different thinking about what defines tree equivalence.',
        problem: 'Leaf traversal requires full tree DFS. Right-edge traversal is a simple linear path, but the conceptual shift from leaves (bottom of tree) to edges (side of tree) requires different thinking about what defines tree equivalence.',
        hints: [
            'Consider: Instead of comparing leaf sequences, compare the right-edge sequences of two binary trees.',
            'The right edge is the sequence of nodes visited by always going right from the root until reaching a null.',
            'Key insight: Leaf traversal requires full tree DFS.',
            'Right-edge traversal is a simple linear path, but the conceptual shift from leaves (bottom of tree) to edges (side of tree) requires different thinking about what defines tree equivalence.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree1":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"tree2":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}}},
                output: [0],
                explanation: 'The compare right edge traversal for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree1":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"tree2":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def compare_right_edge_traversal(tree1, tree2):
    """
    Compare Right-Edge Traversal

    Instead of comparing leaf sequences, compare the right-edge sequences of two binary trees. The right edge is the sequence of nodes visited by always going right from the root until reaching a null. Leaf traversal requires full tree DFS. Right-edge traversal is a simple linear path, but the conceptual shift from leaves (bottom of tree) to edges (side of tree) requires different thinking about what defines tree equivalence.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree1)):
        # Check if element meets criteria
        result.append(tree1[i])

    return result


# Test cases
print(compare_right_edge_traversal({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, {"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 7, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 3, "left": {"value": 8}}}))  # Expected: [0]
print(compare_right_edge_traversal({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, {"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 7, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 3, "left": {"value": 8}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// CompareRightEdgeTraversal solves the Compare Right-Edge Traversal problem.
// Instead of comparing leaf sequences, compare the right-edge sequences of two binary trees. The right edge is the sequence of nodes visited by always going right from the root until reaching a null. Leaf traversal requires full tree DFS. Right-edge traversal is a simple linear path, but the conceptual shift from leaves (bottom of tree) to edges (side of tree) requires different thinking about what defines tree equivalence.
// Time: O(n), Space: O(n)
func CompareRightEdgeTraversal(tree1 *TreeNode, tree2 *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree1); i++ {
		result = append(result, tree1[i])
	}

	return result
}

func main() {
	fmt.Println(CompareRightEdgeTraversal({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, {"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}})) // Expected: [0]
	fmt.Println(CompareRightEdgeTraversal({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, {"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '11-compare-leaf-traversal/twist-01-compare-right-edge-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/11-compare-leaf-traversal/twist-01-compare-right-edge-traversal'] = problem;
})();
