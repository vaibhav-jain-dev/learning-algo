/**
 * Filter Dictionary Words
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-phone
 * Parent: 05-phone-mnemonics
 */
(function() {
    'use strict';

    const problem = {
        name: 'Filter Dictionary Words',
        difficulty: 'Hard',
        algorithm: 'recursion-phone',
        parent: '05-phone-mnemonics',
        description: 'Instead of returning all letter combinations, return only those that form valid English dictionary words.',
        problem: 'Requires integrating a trie or set lookup into the recursion, pruning branches early when no dictionary word starts with the current prefix.',
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
                explanation: 'The filter dictionary words for this input yields [0].'
            },
            // Edge case
            {
                input: {"phoneNumber":""},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def filter_dictionary_words(phoneNumber):
    """
    Filter Dictionary Words

    Instead of returning all letter combinations, return only those that form valid English dictionary words.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(phoneNumber)):
        # Check if element meets criteria
        result.append(phoneNumber[i])

    return result


# Test cases
print(filter_dictionary_words("23"))  # Expected: [0]
print(filter_dictionary_words(""))  # Expected: []
`,
            go: `package main

import "fmt"

// FilterDictionaryWords solves the Filter Dictionary Words problem.
// Instead of returning all letter combinations, return only those that form valid English dictionary words.
// Time: O(?), Space: O(?)
func FilterDictionaryWords(phoneNumber string) []int {
	result := make([]int, 0)

	for i := 0; i < len(phoneNumber); i++ {
		result = append(result, phoneNumber[i])
	}

	return result
}

func main() {
	fmt.Println(FilterDictionaryWords("23")) // Expected: [0]
	fmt.Println(FilterDictionaryWords("")) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '05-phone-mnemonics/twist-01-filter-dictionary-words', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/05-phone-mnemonics/twist-01-filter-dictionary-words'] = problem;
})();
