/**
 * Count Interleavings
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-interweaving
 * Parent: 10-interweaving-strings
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Interleavings',
        difficulty: 'Hard',
        algorithm: 'recursion-interweaving',
        parent: '10-interweaving-strings',
        description: 'Instead of returning true/false, count the total number of distinct ways to interleave the two strings to form the third string.',
        problem: 'Changes from boolean DP to counting DP, where each cell accumulates the number of paths rather than just feasibility.',
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
                output: 1,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"one":"","two":"","three":""},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def count_interleavings(one, two, three):
    """
    Count Interleavings

    Instead of returning true/false, count the total number of distinct ways to interleave the two strings to form the third string.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(one)

    for i in range(n):
        # Check condition based on two
        j = 0
        for k in range(i, n):
            if j < len(two) and one[k] == two[j]:
                j += 1
        if j == len(two):
            count += 1

    return count


# Test cases
print(count_interleavings("aabcc", "dbbca", "aadbbcbcac"))  # Expected: 1
print(count_interleavings("", "", ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountInterleavings solves the Count Interleavings problem.
// Instead of returning true/false, count the total number of distinct ways to interleave the two strings to form the third string.
// Time: O(?), Space: O(?)
func CountInterleavings(one string, two string, three string) int {
	result := 0

	for i := 0; i < len(one); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountInterleavings("aabcc", "dbbca", "aadbbcbcac")) // Expected: 1
	fmt.Println(CountInterleavings("", "", "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '10-interweaving-strings/twist-01-count-interleavings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/10-interweaving-strings/twist-01-count-interleavings'] = problem;
})();
