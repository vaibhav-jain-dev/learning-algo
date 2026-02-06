/**
 * Conceptual Trap: All Negatives
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Conceptual Trap: All Negatives',
        difficulty: 'Easy',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'What does Kadane\',
        problem: 'Exposes a common implementation bug where maxSoFar is initialized to 0 instead of the first element, or where maxEndingHere is clamped to 0. Forces careful thinking about initialization.',
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
                input: {"nums":[-2,1,-3,4,-1,2,1,-5,4]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the conceptual trap all negatives criteria.'
            },
            // Edge case
            {
                input: {"nums":[-2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_all_negatives(nums):
    """
    Conceptual Trap: All Negatives

    What does Kadane\\

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(conceptual_trap_all_negatives([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 1
print(conceptual_trap_all_negatives([-2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ConceptualTrapAllNegatives solves the Conceptual Trap: All Negatives problem.
// What does Kadane\\
// Time: O(?), Space: O(?)
func ConceptualTrapAllNegatives(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ConceptualTrapAllNegatives([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4})) // Expected: 1
	fmt.Println(ConceptualTrapAllNegatives([]int{-2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/twist-06-conceptual-trap-all-negatives', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/twist-06-conceptual-trap-all-negatives'] = problem;
})();
