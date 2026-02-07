/**
 * Count Combinations Only
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-phone
 * Parent: 05-phone-mnemonics
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Combinations Only',
        difficulty: 'Easy',
        algorithm: 'recursion-phone',
        parent: '05-phone-mnemonics',
        description: 'Return just the total count of possible letter combinations without generating them.',
        problem: 'Transforms from a generation problem to a pure multiplication problem -- multiply the number of letters mapped to each digit.',
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
                input: {"phoneNumber":"23"},
                output: 1,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"phoneNumber":""},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def count_combinations_only(phoneNumber):
    """
    Count Combinations Only

    Return just the total count of possible letter combinations without generating them.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(phoneNumber)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_combinations_only("23"))  # Expected: 1
print(count_combinations_only(""))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountCombinationsOnly solves the Count Combinations Only problem.
// Return just the total count of possible letter combinations without generating them.
// Time: O(?), Space: O(?)
func CountCombinationsOnly(phoneNumber string) int {
	result := 0

	for i := 0; i < len(phoneNumber); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountCombinationsOnly("23")) // Expected: 1
	fmt.Println(CountCombinationsOnly("")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '05-phone-mnemonics/twist-03-count-combinations-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/05-phone-mnemonics/twist-03-count-combinations-only'] = problem;
})();
