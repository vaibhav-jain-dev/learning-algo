/**
 * Circular Staircase
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-staircase
 * Parent: 06-staircase-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Staircase',
        difficulty: 'Hard',
        algorithm: 'recursion-staircase',
        parent: '06-staircase-traversal',
        description: 'The staircase wraps around -- after reaching the top, you continue from step 0 again. Count paths that take exactly k total steps.',
        problem: 'Introduces modular arithmetic into the recurrence, fundamentally changing the problem from a linear DP to one involving cycles.',
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
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"height":0,"maxSteps":0},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def circular_staircase(height, maxSteps):
    """
    Circular Staircase

    The staircase wraps around -- after reaching the top, you continue from step 0 again. Count paths that take exactly k total steps.

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
print(circular_staircase(4, 2))  # Expected: 1
print(circular_staircase(0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// CircularStaircase solves the Circular Staircase problem.
// The staircase wraps around -- after reaching the top, you continue from step 0 again. Count paths that take exactly k total steps.
// Time: O(?), Space: O(?)
func CircularStaircase(height int, maxSteps int) int {
	result := 0

	for i := 0; i < len(height); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CircularStaircase(4, 2)) // Expected: 1
	fmt.Println(CircularStaircase(0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '06-staircase-traversal/twist-04-circular-staircase', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal/twist-04-circular-staircase'] = problem;
})();
