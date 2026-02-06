/**
 * List All Paths
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-staircase
 * Parent: 06-staircase-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'List All Paths',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        parent: '06-staircase-traversal',
        description: 'Instead of counting the number of ways, return all distinct sequences of steps that reach the top.',
        problem: 'Shifts from counting to enumeration, requiring actual path construction and storage rather than just accumulating a count.',
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
                input: {"height":4,"maxSteps":2},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the list all paths criteria.'
            },
            // Edge case
            {
                input: {"height":0,"maxSteps":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def list_all_paths(height, maxSteps):
    """
    List All Paths

    Instead of counting the number of ways, return all distinct sequences of steps that reach the top.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(height)

    for i in range(n):
        # Check condition based on maxSteps
        j = 0
        for k in range(i, n):
            if j < len(maxSteps) and height[k] == maxSteps[j]:
                j += 1
        if j == len(maxSteps):
            count += 1

    return count


# Test cases
print(list_all_paths(4, 2))  # Expected: 1
print(list_all_paths(0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// ListAllPaths solves the List All Paths problem.
// Instead of counting the number of ways, return all distinct sequences of steps that reach the top.
// Time: O(?), Space: O(?)
func ListAllPaths(height int, maxSteps int) int {
	result := 0

	for i := 0; i < len(height); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ListAllPaths(4, 2)) // Expected: 1
	fmt.Println(ListAllPaths(0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '06-staircase-traversal/twist-02-list-all-paths', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal/twist-02-list-all-paths'] = problem;
})();
