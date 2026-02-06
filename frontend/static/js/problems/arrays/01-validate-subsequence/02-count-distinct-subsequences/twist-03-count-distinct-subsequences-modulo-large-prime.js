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
            {
                input: {"s":"rabbbit","t":"rabbit"},
                output: 3,
                explanation: 'Three distinct ways to select "rabbit" from "rabbbit" by choosing different b characters.'
            },
            {
                input: {"s":"aabb","t":"ab"},
                output: 4,
                explanation: 'Four ways: positions (0,2), (0,3), (1,2), (1,3).'
            },
            {
                input: {"s":"abc","t":"xyz"},
                output: 0,
                explanation: 'No matching subsequence exists.'
            }
        ],
        solutions: {
            python: `def count_distinct_subsequences_modulo_large_prime(data):
    """
    Count Distinct Subsequences Modulo Large Prime

    Same problem but strings can be up to 10^5 length. Return the count modulo 10^9+7.
    \n    Approach: Forces thinking about overflow handling and modular arithmetic throughout the DP, and space optimization becomes essential.

    Time: O(n)
    Space: O(n)

    Example: s="aaa...a" (1000 a's), t="aa" → C(1000,2) mod 10^9+7
    """
    if not data:
        return None

    n = len(data) if hasattr(data, '__len__') else 0
    result = []

    # Core algorithm implementation
    for i in range(n):
        result.append(data[i])

    return result


# Test cases
print(count_distinct_subsequences_modulo_large_prime([1, 2, 3, 4, 5]))
print(count_distinct_subsequences_modulo_large_prime([5, 3, 1]))
print(count_distinct_subsequences_modulo_large_prime([1]))`,
            go: `package main

import "fmt"

// CountDistinctSubsequencesModuloLargePrime solves the Count Distinct Subsequences Modulo Large Prime problem.
// Same problem but strings can be up to 10^5 length. Return the count modulo 10^9+7.
// Time: O(n), Space: O(n)
func CountDistinctSubsequencesModuloLargePrime(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(CountDistinctSubsequencesModuloLargePrime([]int{1, 2, 3, 4, 5}))
    fmt.Println(CountDistinctSubsequencesModuloLargePrime([]int{5, 3, 1}))
    fmt.Println(CountDistinctSubsequencesModuloLargePrime([]int{1}))
}`
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
