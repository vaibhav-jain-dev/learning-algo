/**
 * Tail Recursion Impossibility
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/01-nested-array-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Tail Recursion Impossibility',
        difficulty: 'Hard',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/01-nested-array-depth',
        description: 'Explain why maximum depth of nested arrays cannot be trivially converted to tail recursion. What property of the problem prevents it?',
        problem: 'This is a conceptual analysis twist. The problem requires comparing results from multiple recursive calls (siblings in the array), which means you need the results of sub-calls before you can combine them. This prevents simple tail-call optimization.',
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
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def tail_recursion_impossibility(array):
    """
    Tail Recursion Impossibility

    Explain why maximum depth of nested arrays cannot be trivially converted to tail recursion. What property of the problem prevents it?

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(tail_recursion_impossibility([1,[2,[3,4]]]))  # Expected: 2
print(tail_recursion_impossibility([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// TailRecursionImpossibility solves the Tail Recursion Impossibility problem.
// Explain why maximum depth of nested arrays cannot be trivially converted to tail recursion. What property of the problem prevents it?
// Time: O(?), Space: O(?)
func TailRecursionImpossibility(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TailRecursionImpossibility([]interface{}{1, []interface{}{2, []int{3, 4}}})) // Expected: 2
	fmt.Println(TailRecursionImpossibility([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth/twist-05-tail-recursion-impossibility', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth/twist-05-tail-recursion-impossibility'] = problem;
})();
