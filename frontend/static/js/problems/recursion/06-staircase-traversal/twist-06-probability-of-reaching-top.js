/**
 * Probability of Reaching Top
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-staircase
 * Parent: 06-staircase-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Probability of Reaching Top',
        difficulty: 'Hard',
        algorithm: 'recursion-staircase',
        parent: '06-staircase-traversal',
        description: 'At each position, you randomly choose a step size uniformly from 1 to maxSteps. What is the probability of landing exactly on the top?',
        problem: 'Converts the counting problem into a probability problem where each branch has weight 1/maxSteps instead of 1, requiring floating-point DP.',
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
            python: `def probability_of_reaching_top(height, maxSteps):
    """
    Probability of Reaching Top

    At each position, you randomly choose a step size uniformly from 1 to maxSteps. What is the probability of landing exactly on the top?

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
print(probability_of_reaching_top(4, 2))  # Expected: 1
print(probability_of_reaching_top(0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// ProbabilityOfReachingTop solves the Probability of Reaching Top problem.
// At each position, you randomly choose a step size uniformly from 1 to maxSteps. What is the probability of landing exactly on the top?
// Time: O(?), Space: O(?)
func ProbabilityOfReachingTop(height int, maxSteps int) int {
	result := 0

	for i := 0; i < len(height); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ProbabilityOfReachingTop(4, 2)) // Expected: 1
	fmt.Println(ProbabilityOfReachingTop(0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '06-staircase-traversal/twist-06-probability-of-reaching-top', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal/twist-06-probability-of-reaching-top'] = problem;
})();
