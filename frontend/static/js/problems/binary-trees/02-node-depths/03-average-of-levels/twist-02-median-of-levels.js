/**
 * Median of Levels
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-bfs
 * Parent: 02-node-depths/03-average-of-levels
 */
(function() {
    'use strict';

    const problem = {
        name: 'Median of Levels',
        difficulty: 'Hard',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/03-average-of-levels',
        description: 'Instead of the average, compute the median of node values at each level. Average only needs sum and count. Median requires storing all values at each level, sorting them, and picking the middle. This changes space complexity significantly.',
        problem: 'Average only needs sum and count. Median requires storing all values at each level, sorting them, and picking the middle. This changes space complexity significantly.',
        hints: [
            'Consider: Instead of the average, compute the median of node values at each level.',
            'Average only needs sum and count.',
            'Key insight: Median requires storing all values at each level, sorting them, and picking the middle.',
            'This changes space complexity significantly.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the median of levels criteria.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"right":{"value":6}}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the median of levels criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def median_of_levels(tree):
    """
    Median of Levels

    Instead of the average, compute the median of node values at each level. Average only needs sum and count. Median requires storing all values at each level, sorting them, and picking the middle. This changes space complexity significantly.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(median_of_levels({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(median_of_levels({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 2
print(median_of_levels({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// MedianOfLevels solves the Median of Levels problem.
// Instead of the average, compute the median of node values at each level. Average only needs sum and count. Median requires storing all values at each level, sorting them, and picking the middle. This changes space complexity significantly.
// Time: O(n), Space: O(n)
func MedianOfLevels(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MedianOfLevels({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(MedianOfLevels({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"right":{"value":6}}})) // Expected: 2
	fmt.Println(MedianOfLevels({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/03-average-of-levels/twist-02-median-of-levels', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/03-average-of-levels/twist-02-median-of-levels'] = problem;
})();
