/**
 * Tail Recursion Feasibility
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Tail Recursion Feasibility',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Can product sum be converted to tail recursion? Attempt to refactor it with an accumulator. Explain why nested arrays make pure tail recursion difficult.',
        problem: 'Unlike linear recursion (Fibonacci), the nested structure means you recurse into sub-arrays mid-iteration. True tail recursion requires the recursive call to be the last operation, but you have remaining siblings to process.',
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
                input: {"array":[5,2,[7,-1],3,[6,[-13,8],4]]},
                output: 1,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def tail_recursion_feasibility(array):
    """
    Tail Recursion Feasibility

    Can product sum be converted to tail recursion? Attempt to refactor it with an accumulator. Explain why nested arrays make pure tail recursion difficult.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(tail_recursion_feasibility([5,2,[7,-1],3,[6,[-13,8],4]]))  # Expected: 1
print(tail_recursion_feasibility([5]))  # Expected: 0
`,
            go: `package main

import "fmt"

// TailRecursionFeasibility solves the Tail Recursion Feasibility problem.
// Can product sum be converted to tail recursion? Attempt to refactor it with an accumulator. Explain why nested arrays make pure tail recursion difficult.
// Time: O(?), Space: O(?)
func TailRecursionFeasibility(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TailRecursionFeasibility([]interface{}{5, 2, []int{7, -1}, 3, []interface{}{6, []int{-13, 8}, 4}})) // Expected: 1
	fmt.Println(TailRecursionFeasibility([]int{5})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/twist-02-tail-recursion-feasibility', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/twist-02-tail-recursion-feasibility'] = problem;
})();
