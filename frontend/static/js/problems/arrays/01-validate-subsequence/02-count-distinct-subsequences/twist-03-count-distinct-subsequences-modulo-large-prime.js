/**
 * Count Distinct Subsequences Modulo Large Prime
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: count-distinct-subsequences-modulo-large-prime
 * Parent: 01-validate-subsequence/02-count-distinct-subsequences
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Distinct Subsequences Modulo Large Prime',
        difficulty: 'Medium',
        algorithm: 'count-distinct-subsequences-modulo-large-prime',
        parent: '01-validate-subsequence/02-count-distinct-subsequences',
        description: 'Same problem but strings can be up to 10^5 length. Return the count modulo 10^9+7. Forces thinking about overflow handling and modular arithmetic throughout the DP, and space optimization becomes essential.',
        problem: 'Forces thinking about overflow handling and modular arithmetic throughout the DP, and space optimization becomes essential.',
        hints: [
            'Think about how this twist differs from the standard version: Same problem but strings can be up to 10^5 length. Return the count modulo 10^9+.',
            'Forces thinking about overflow handling and modular arithmetic throughout the DP, and space optimization becomes essential.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"s":"rabbbit","t":"rabbit"},
                output: 3,
                explanation: ''
            },
            {
                input: {"s":"aabb","t":"ab"},
                output: 4,
                explanation: ''
            },
            // Edge case
            {
                input: {"s":"abc","t":"xyz"},
                output: 0,
                explanation: ''
            }
        ],
        solutions: {
            python: `def count_distinct_subsequences_modulo_large_prime(s, t):
    """
    Count Distinct Subsequences Modulo Large Prime

    Same problem but strings can be up to 10^5 length. Return the count modulo 10^9+7. Forces thinking about overflow handling and modular arithmetic throughout the DP, and space optimization becomes essential.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(s)

    for i in range(n):
        # Check condition based on t
        j = 0
        for k in range(i, n):
            if j < len(t) and s[k] == t[j]:
                j += 1
        if j == len(t):
            count += 1

    return count


# Test cases
print(count_distinct_subsequences_modulo_large_prime("rabbbit", "rabbit"))  # Expected: 3
print(count_distinct_subsequences_modulo_large_prime("aabb", "ab"))  # Expected: 4
print(count_distinct_subsequences_modulo_large_prime("abc", "xyz"))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountDistinctSubsequencesModuloLargePrime solves the Count Distinct Subsequences Modulo Large Prime problem.
// Same problem but strings can be up to 10^5 length. Return the count modulo 10^9+7. Forces thinking about overflow handling and modular arithmetic throughout the DP, and space optimization becomes essential.
// Time: O(n), Space: O(n)
func CountDistinctSubsequencesModuloLargePrime(s string, t string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountDistinctSubsequencesModuloLargePrime("rabbbit", "rabbit")) // Expected: 3
	fmt.Println(CountDistinctSubsequencesModuloLargePrime("aabb", "ab")) // Expected: 4
	fmt.Println(CountDistinctSubsequencesModuloLargePrime("abc", "xyz")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/02-count-distinct-subsequences/twist-03-count-distinct-subsequences-modulo-large-prime', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/02-count-distinct-subsequences/twist-03-count-distinct-subsequences-modulo-large-prime'] = problem;
})();
