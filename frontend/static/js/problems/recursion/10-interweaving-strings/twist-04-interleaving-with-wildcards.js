/**
 * Interleaving with Wildcards
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-interweaving
 * Parent: 10-interweaving-strings
 */
(function() {
    'use strict';

    const problem = {
        name: 'Interleaving with Wildcards',
        difficulty: 'Hard',
        algorithm: 'recursion-interweaving',
        parent: '10-interweaving-strings',
        description: 'The third string may contain wildcard characters (*) that can match any single character from either source string.',
        problem: 'Wildcards add branching at matching positions -- each * can match either the next character of string one or string two, increasing the state transitions.',
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
                input: {"one":"aabcc","two":"dbbca","three":"aadbbcbcac"},
                output: true,
                explanation: 'The interleaving with wildcards condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"one":"","two":"","three":""},
                output: false,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def interleaving_with_wildcards(one, two, three):
    """
    Interleaving with Wildcards

    The third string may contain wildcard characters (*) that can match any single character from either source string.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(one)):
        if j < len(two) and one[i] == two[j]:
            j += 1

    return j == len(two)


# Test cases
print(interleaving_with_wildcards("aabcc", "dbbca", "aadbbcbcac"))  # Expected: True
print(interleaving_with_wildcards("", "", ""))  # Expected: False
`,
            go: `package main

import "fmt"

// InterleavingWithWildcards solves the Interleaving with Wildcards problem.
// The third string may contain wildcard characters (*) that can match any single character from either source string.
// Time: O(?), Space: O(?)
func InterleavingWithWildcards(one string, two string, three string) bool {
	j := 0

	for i := 0; i < len(one) && j < len(two); i++ {
		if one[i] == two[j] {
			j++
		}
	}

	return j == len(two)
}

func main() {
	fmt.Println(InterleavingWithWildcards("aabcc", "dbbca", "aadbbcbcac")) // Expected: true
	fmt.Println(InterleavingWithWildcards("", "", "")) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '10-interweaving-strings/twist-04-interleaving-with-wildcards', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/10-interweaving-strings/twist-04-interleaving-with-wildcards'] = problem;
})();
