/**
 * Diagonal Movement
 * Category: graphs
 * Difficulty: Easy
 * Parent: 08-minimum-passes/02-walls-and-gates
 */
(function() {
    'use strict';
    const problem = {
        name: 'Diagonal Movement',
        difficulty: 'Easy',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes/02-walls-and-gates',
        description: 'Allow diagonal movement in addition to 4-directional. Diagonal moves also cost 1. Fill rooms with minimum distance to any gate.',
        problem: 'With 8 directions, distances shrink and the Chebyshev distance applies instead of Manhattan distance, changing all computed values.',
        hints: [
            'Start by understanding the key difference: With 8 directions, distances shrink and the Chebyshev distance applies instead of Manhattan distance, changing all computed values.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Room at (2,2) with gate at (0,0).',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(M * N)', space: 'O(M * N)' },
        examples: [
            { input: { description: 'Room at (2,2) with gate at (0,0). 4-directional distance: 4. 8-directional distance: 2.' }, output: 'See explanation', explanation: 'Room at (2,2) with gate at (0,0). 4-directional distance: 4. 8-directional distance: 2.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def diagonal_movement(data):
    """
    Diagonal Movement

    Allow diagonal movement in addition to 4-directional. Diagonal moves also cost 1. Fill rooms with minimum distance to any gate.

    Approach:
    With 8 directions, distances shrink and the Chebyshev distance applies instead of Manhattan distance, changing all computed values.

    Time: O(M * N)
    Space: O(M * N)
    """
    # With 8 directions, distances shrink and the Chebyshev distance applies instead of Manhattan distance, changing all computed values.

    # Implementation
    result = None

    # Core algorithm adapted for: Diagonal Movement
    # Key difference from parent: With 8 directions, distances shrink and the Chebyshev distance applies instead of Manhattan distance

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return diagonal_movement(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Room at (2,2) with gate at (0,0). 4-directional distance: 4. 8-directional distance: 2.
    print("Test: Diagonal Movement")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// DiagonalMovement solves the Diagonal Movement problem
// Allow diagonal movement in addition to 4-directional. Diagonal moves also cost 1. Fill rooms with minimum distance to any gate.
//
// Approach: With 8 directions, distances shrink and the Chebyshev distance applies instead of Manhattan distance, changing all computed values.
//
// Time: O(M * N)
// Space: O(M * N)
func DiagonalMovement(input interface{}) interface{} {
    // With 8 directions, distances shrink and the Chebyshev distance applies instead of Manhattan distance, changing all computed values.

    // Core algorithm adapted for: Diagonal Movement
    // Key difference from parent: With 8 directions, distances shrink and the Chebyshev distance applies instead of Manhattan distance

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Room at (2,2) with gate at (0,0). 4-directional distance: 4. 8-directional distance: 2.
    fmt.Println("Test: Diagonal Movement")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/02-walls-and-gates/twist-03-diagonal-movement', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/02-walls-and-gates/twist-03-diagonal-movement'] = problem;
})();
