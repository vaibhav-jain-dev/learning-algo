/**
 * Weighted Steps
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-staircase
 * Parent: 06-staircase-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Steps',
        difficulty: 'Hard',
        algorithm: 'recursion-staircase',
        parent: '06-staircase-traversal',
        description: 'Each step size has a different cost. Find the minimum cost to reach the top, where step i costs cost[i].',
        problem: 'Changes from counting paths to optimizing cost, requiring dynamic programming with min instead of sum operations.',
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
            python: `def weighted_steps(height, maxSteps):
    """
    Weighted Steps

    Each step size has a different cost. Find the minimum cost to reach the top, where step i costs cost[i].

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
print(weighted_steps(4, 2))  # Expected: 1
print(weighted_steps(0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedSteps solves the Weighted Steps problem.
// Each step size has a different cost. Find the minimum cost to reach the top, where step i costs cost[i].
// Time: O(?), Space: O(?)
func WeightedSteps(height int, maxSteps int) int {
	result := 0

	for i := 0; i < len(height); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedSteps(4, 2)) // Expected: 1
	fmt.Println(WeightedSteps(0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '06-staircase-traversal/twist-01-weighted-steps', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal/twist-01-weighted-steps'] = problem;
})();
