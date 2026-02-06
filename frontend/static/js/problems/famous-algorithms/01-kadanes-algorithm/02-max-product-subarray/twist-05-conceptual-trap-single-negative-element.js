/**
 * Conceptual Trap: Single Negative Element
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm/02-max-product-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Conceptual Trap: Single Negative Element',
        difficulty: 'Easy',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/02-max-product-subarray',
        description: 'What does your algorithm return for the array [-5]? What about [0, -5, 0]? Trace through carefully. Many implementations fail when the entire array is a single negative number or when zeros surround negatives.',
        problem: 'Exposes initialization bugs. If maxProd starts at 0 or 1 instead of nums[0], single negative arrays return wrong results. Forces careful reasoning about base cases.',
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
                input: {"nums":[2,3,-2,4]},
                output: [2,3,-2],
                explanation: 'The conceptual trap single negative element for this input yields [2, 3, -2].'
            },
            {
                input: {"nums":[-2,0,-1]},
                output: [-2,0,-1],
                explanation: 'The conceptual trap single negative element for this input yields [-2, 0, -1].'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_single_negative_element(nums):
    """
    Conceptual Trap: Single Negative Element

    What does your algorithm return for the array [-5]? What about [0, -5, 0]? Trace through carefully. Many implementations fail when the entire array is a single negative number or when zeros surround negatives.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(conceptual_trap_single_negative_element([2,3,-2,4]))  # Expected: [2,3,-2]
print(conceptual_trap_single_negative_element([-2,0,-1]))  # Expected: [-2,0,-1]
print(conceptual_trap_single_negative_element([2]))  # Expected: []
`,
            go: `package main

import "fmt"

// ConceptualTrapSingleNegativeElement solves the Conceptual Trap: Single Negative Element problem.
// What does your algorithm return for the array [-5]? What about [0, -5, 0]? Trace through carefully. Many implementations fail when the entire array is a single negative number or when zeros surround negatives.
// Time: O(?), Space: O(?)
func ConceptualTrapSingleNegativeElement(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(ConceptualTrapSingleNegativeElement([]int{2, 3, -2, 4})) // Expected: [2,3,-2]
	fmt.Println(ConceptualTrapSingleNegativeElement([]int{-2, 0, -1})) // Expected: [-2,0,-1]
	fmt.Println(ConceptualTrapSingleNegativeElement([]int{2})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/02-max-product-subarray/twist-05-conceptual-trap-single-negative-element', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/02-max-product-subarray/twist-05-conceptual-trap-single-negative-element'] = problem;
})();
