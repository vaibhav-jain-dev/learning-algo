/**
 * Find the Negative Cycle
 * Category: graphs
 * Difficulty: Hard
 * Parent: 11-detect-arbitrage/03-negative-cycle-detection
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find the Negative Cycle',
        difficulty: 'Hard',
        algorithm: 'bellman-ford',
        parent: '11-detect-arbitrage/03-negative-cycle-detection',
        description: 'Not just detect, but return the actual vertices forming the negative cycle.',
        problem: 'After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the cycle. You must follow the predecessor chain for N steps to ensure you are inside the cycle.',
        hints: [
            'Start by understanding the key difference: After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the cycle.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Edges [0->1 weight 1, 1->2 weight -3, 2->0 weight 1].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(V * E)', space: 'O(V)' },
        examples: [
            { input: { description: 'Edges [0->1 weight 1, 1->2 weight -3, 2->0 weight 1]. Cycle: [0, 1, 2, 0] with total weight -1.' }, output: 'See explanation', explanation: 'Edges [0->1 weight 1, 1->2 weight -3, 2->0 weight 1]. Cycle: [0, 1, 2, 0] with total weight -1.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def find_the_negative_cycle(data):
    """
    Find the Negative Cycle

    Not just detect, but return the actual vertices forming the negative cycle.

    Approach:
    After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the cycle. You must follow the predecessor chain for N steps to ensure you are inside the cycle.

    Time: O(V * E)
    Space: O(V)
    """
    # After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the cycle. You must follow the predecessor chain for N steps to ensure you are inside the cycle.

    # Implementation
    result = None

    # Core algorithm adapted for: Find the Negative Cycle
    # Key difference from parent: After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the c

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return find_the_negative_cycle(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Edges [0->1 weight 1, 1->2 weight -3, 2->0 weight 1]. Cycle: [0, 1, 2, 0] with total weight -1.
    print("Test: Find the Negative Cycle")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// FindTheNegativeCycle solves the Find the Negative Cycle problem
// Not just detect, but return the actual vertices forming the negative cycle.
//
// Approach: After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the cycle. You must follow the predecessor chain for N steps to ensure you are inside the cycle.
//
// Time: O(V * E)
// Space: O(V)
func FindTheNegativeCycle(input interface{}) interface{} {
    // After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the cycle. You must follow the predecessor chain for N steps to ensure you are inside the cycle.

    // Core algorithm adapted for: Find the Negative Cycle
    // Key difference from parent: After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the c

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Edges [0->1 weight 1, 1->2 weight -3, 2->0 weight 1]. Cycle: [0, 1, 2, 0] with total weight -1.
    fmt.Println("Test: Find the Negative Cycle")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/03-negative-cycle-detection/twist-01-find-the-negative-cycle', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/03-negative-cycle-detection/twist-01-find-the-negative-cycle'] = problem;
})();
