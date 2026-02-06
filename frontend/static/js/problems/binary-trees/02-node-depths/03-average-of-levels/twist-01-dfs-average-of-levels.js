/**
 * DFS Average of Levels
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-bfs
 * Parent: 02-node-depths/03-average-of-levels
 */
(function() {
    'use strict';

    const problem = {
        name: 'DFS Average of Levels',
        difficulty: 'Medium',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/03-average-of-levels',
        description: 'Compute the average of each level using DFS instead of BFS. You must collect level sums and counts without processing level by level. DFS visits nodes depth-first, not level by level. You need a data structure (array or map) indexed by level to accumulate sums and counts, then compute averages after traversal completes.',
        problem: 'DFS visits nodes depth-first, not level by level. You need a data structure (array or map) indexed by level to accumulate sums and counts, then compute averages after traversal completes.',
        hints: [
            'Consider: Compute the average of each level using DFS instead of BFS.',
            'You must collect level sums and counts without processing level by level.',
            'Key insight: DFS visits nodes depth-first, not level by level.',
            'You need a data structure (array or map) indexed by level to accumulate sums and counts, then compute averages after traversal completes.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: [0],
                explanation: 'The dfs average of levels for this input yields [0].'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"right":{"value":6}}}},
                output: [0,1],
                explanation: 'The dfs average of levels for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def dfs_average_of_levels(tree):
    """
    DFS Average of Levels

    Compute the average of each level using DFS instead of BFS. You must collect level sums and counts without processing level by level. DFS visits nodes depth-first, not level by level. You need a data structure (array or map) indexed by level to accumulate sums and counts, then compute averages after traversal completes.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(dfs_average_of_levels({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: [0]
print(dfs_average_of_levels({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: [0,1]
print(dfs_average_of_levels({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// DfsAverageOfLevels solves the DFS Average of Levels problem.
// Compute the average of each level using DFS instead of BFS. You must collect level sums and counts without processing level by level. DFS visits nodes depth-first, not level by level. You need a data structure (array or map) indexed by level to accumulate sums and counts, then compute averages after traversal completes.
// Time: O(n), Space: O(n)
func DfsAverageOfLevels(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(DfsAverageOfLevels({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(DfsAverageOfLevels({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"right":{"value":6}}})) // Expected: [0,1]
	fmt.Println(DfsAverageOfLevels({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/03-average-of-levels/twist-01-dfs-average-of-levels', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/03-average-of-levels/twist-01-dfs-average-of-levels'] = problem;
})();
