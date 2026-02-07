/**
 * Phone Number to Words with 0 and 1
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-phone
 * Parent: 05-phone-mnemonics
 */
(function() {
    'use strict';

    const problem = {
        name: 'Phone Number to Words with 0 and 1',
        difficulty: 'Medium',
        algorithm: 'recursion-phone',
        parent: '05-phone-mnemonics',
        description: 'Extend the mapping so that 0 maps to a space and 1 maps to nothing (skip), then generate all combinations.',
        problem: 'Introduces variable-length branching -- some digits produce 0 characters while others produce 3-4, complicating the recursion structure.',
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
                output: [0],
                explanation: 'The phone number to words with 0 and 1 for this input yields [0].'
            },
            // Edge case
            {
                input: {"phoneNumber":""},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def phone_number_to_words_with_0_and_1(phoneNumber):
    """
    Phone Number to Words with 0 and 1

    Extend the mapping so that 0 maps to a space and 1 maps to nothing (skip), then generate all combinations.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(phoneNumber)):
        # Check if element meets criteria
        result.append(phoneNumber[i])

    return result


# Test cases
print(phone_number_to_words_with_0_and_1("23"))  # Expected: [0]
print(phone_number_to_words_with_0_and_1(""))  # Expected: []
`,
            go: `package main

import "fmt"

// PhoneNumberToWordsWith0And1 solves the Phone Number to Words with 0 and 1 problem.
// Extend the mapping so that 0 maps to a space and 1 maps to nothing (skip), then generate all combinations.
// Time: O(?), Space: O(?)
func PhoneNumberToWordsWith0And1(phoneNumber string) []int {
	result := make([]int, 0)

	for i := 0; i < len(phoneNumber); i++ {
		result = append(result, phoneNumber[i])
	}

	return result
}

func main() {
	fmt.Println(PhoneNumberToWordsWith0And1("23")) // Expected: [0]
	fmt.Println(PhoneNumberToWordsWith0And1("")) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '05-phone-mnemonics/twist-02-phone-number-to-words-with-0-and-1', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/05-phone-mnemonics/twist-02-phone-number-to-words-with-0-and-1'] = problem;
})();
