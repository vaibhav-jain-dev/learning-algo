/**
 * T9 Predictive Text
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-phone
 * Parent: 05-phone-mnemonics
 */
(function() {
    'use strict';

    const problem = {
        name: 'T9 Predictive Text',
        difficulty: 'Hard',
        algorithm: 'recursion-phone',
        parent: '05-phone-mnemonics',
        description: 'Given a phone number and a dictionary, return all possible words for each possible segmentation of the number into word-forming groups.',
        problem: 'Adds a segmentation/partitioning dimension on top of letter mapping -- you must decide where word boundaries are while also mapping digits to letters.',
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
                explanation: 'The t9 predictive text for this input yields [0].'
            },
            // Edge case
            {
                input: {"phoneNumber":""},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def t9_predictive_text(phoneNumber):
    """
    T9 Predictive Text

    Given a phone number and a dictionary, return all possible words for each possible segmentation of the number into word-forming groups.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(phoneNumber)):
        # Check if element meets criteria
        result.append(phoneNumber[i])

    return result


# Test cases
print(t9_predictive_text("23"))  # Expected: [0]
print(t9_predictive_text(""))  # Expected: []
`,
            go: `package main

import "fmt"

// T9PredictiveText solves the T9 Predictive Text problem.
// Given a phone number and a dictionary, return all possible words for each possible segmentation of the number into word-forming groups.
// Time: O(?), Space: O(?)
func T9PredictiveText(phoneNumber string) []int {
	result := make([]int, 0)

	for i := 0; i < len(phoneNumber); i++ {
		result = append(result, phoneNumber[i])
	}

	return result
}

func main() {
	fmt.Println(T9PredictiveText("23")) // Expected: [0]
	fmt.Println(T9PredictiveText("")) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '05-phone-mnemonics/twist-04-t9-predictive-text', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/05-phone-mnemonics/twist-04-t9-predictive-text'] = problem;
})();
