/**
 * Iterative BFS Approach
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/01-nested-array-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative BFS Approach',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/01-nested-array-depth',
        description: 'Find maximum nesting depth using a BFS (level-order) approach with a queue, processing one level at a time. No recursion allowed.',
        problem: 'BFS naturally processes level by level, so depth equals the number of BFS rounds. This is a fundamentally different traversal order than DFS recursion and requires queue management instead of call stack.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,[2,[3,4]]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the iterative bfs approach criteria.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_bfs_approach(array):
    """
    Iterative BFS Approach

    Find maximum nesting depth using a BFS (level-order) approach with a queue, processing one level at a time. No recursion allowed.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_bfs_approach([1,[2,[3,4]]]))  # Expected: 2
print(iterative_bfs_approach([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeBfsApproach solves the Iterative BFS Approach problem.
// Find maximum nesting depth using a BFS (level-order) approach with a queue, processing one level at a time. No recursion allowed.
// Time: O(?), Space: O(?)
func IterativeBfsApproach(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeBfsApproach([]interface{}{1, []interface{}{2, []int{3, 4}}})) // Expected: 2
	fmt.Println(IterativeBfsApproach([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth/twist-01-iterative-bfs-approach', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth/twist-01-iterative-bfs-approach'] = problem;
})();
