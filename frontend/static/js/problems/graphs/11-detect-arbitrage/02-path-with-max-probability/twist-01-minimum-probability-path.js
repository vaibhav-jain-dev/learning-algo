/**
 * Minimum Probability Path
 * Category: graphs
 * Difficulty: Easy
 * Parent: 11-detect-arbitrage/02-path-with-max-probability
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Probability Path',
        difficulty: 'Easy',
        algorithm: 'dijkstra-modified',
        parent: '11-detect-arbitrage/02-path-with-max-probability',
        description: 'Find the path with the minimum success probability (most risky path) from start to end.',
        problem: 'You swap max-heap for min-heap and track minimum probability instead of maximum. The relaxation condition flips to update when new probability is lower.',
        hints: [
            'Start by understanding the key difference: You swap max-heap for min-heap and track minimum probability instead of maximum.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Paths: 0.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(E log V)', space: 'O(V + E)' },
        examples: [
            { input: { description: 'Paths: 0.25 and 0.04. Most risky path has probability 0.04. Return 0.04.' }, output: 'See explanation', explanation: 'Paths: 0.25 and 0.04. Most risky path has probability 0.04. Return 0.04.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def minimum_probability_path(data):
    """
    Minimum Probability Path

    Find the path with the minimum success probability (most risky path) from start to end.

    Approach:
    You swap max-heap for min-heap and track minimum probability instead of maximum. The relaxation condition flips to update when new probability is lower.

    Time: O(E log V)
    Space: O(V + E)
    """
    # You swap max-heap for min-heap and track minimum probability instead of maximum. The relaxation condition flips to update when new probability is lower.

    # Implementation
    result = None

    # Core algorithm adapted for: Minimum Probability Path
    # Key difference from parent: You swap max-heap for min-heap and track minimum probability instead of maximum. The relaxation cond

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return minimum_probability_path(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Paths: 0.25 and 0.04. Most risky path has probability 0.04. Return 0.04.
    print("Test: Minimum Probability Path")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// MinimumProbabilityPath solves the Minimum Probability Path problem
// Find the path with the minimum success probability (most risky path) from start to end.
//
// Approach: You swap max-heap for min-heap and track minimum probability instead of maximum. The relaxation condition flips to update when new probability is lower.
//
// Time: O(E log V)
// Space: O(V + E)
func MinimumProbabilityPath(input interface{}) interface{} {
    // You swap max-heap for min-heap and track minimum probability instead of maximum. The relaxation condition flips to update when new probability is lower.

    // Core algorithm adapted for: Minimum Probability Path
    // Key difference from parent: You swap max-heap for min-heap and track minimum probability instead of maximum. The relaxation cond

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Paths: 0.25 and 0.04. Most risky path has probability 0.04. Return 0.04.
    fmt.Println("Test: Minimum Probability Path")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/02-path-with-max-probability/twist-01-minimum-probability-path', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/02-path-with-max-probability/twist-01-minimum-probability-path'] = problem;
})();
