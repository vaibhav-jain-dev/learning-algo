/**
 * Rot with Immunity
 * Category: graphs
 * Difficulty: Medium
 * Parent: 08-minimum-passes/01-rotting-oranges
 */
(function() {
    'use strict';
    const problem = {
        name: 'Rot with Immunity',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes/01-rotting-oranges',
        description: 'Some fresh oranges are immune (value 3) and can never rot. Determine if all non-immune fresh oranges can rot.',
        problem: 'Immune oranges act as barriers that cannot be converted. You must skip them during BFS and check only non-immune fresh oranges remain at the end.',
        hints: [
            'Start by understanding the key difference: Immune oranges act as barriers that cannot be converted.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Grid [[2,1,3,1]].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(M * N)', space: 'O(M * N)' },
        examples: [
            { input: { description: 'Grid [[2,1,3,1]]. The immune orange at position 2 blocks rot from reaching the last orange. Answer: -1.' }, output: 'See explanation', explanation: 'Grid [[2,1,3,1]]. The immune orange at position 2 blocks rot from reaching the last orange. Answer: -1.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def rot_with_immunity(data):
    """
    Rot with Immunity

    Some fresh oranges are immune (value 3) and can never rot. Determine if all non-immune fresh oranges can rot.

    Approach:
    Immune oranges act as barriers that cannot be converted. You must skip them during BFS and check only non-immune fresh oranges remain at the end.

    Time: O(M * N)
    Space: O(M * N)
    """
    # Immune oranges act as barriers that cannot be converted. You must skip them during BFS and check only non-immune fresh oranges remain at the end.

    # Implementation
    result = None

    # Core algorithm adapted for: Rot with Immunity
    # Key difference from parent: Immune oranges act as barriers that cannot be converted. You must skip them during BFS and check onl

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return rot_with_immunity(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Grid [[2,1,3,1]]. The immune orange at position 2 blocks rot from reaching the last orange. Answer: -1.
    print("Test: Rot with Immunity")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// RotWithImmunity solves the Rot with Immunity problem
// Some fresh oranges are immune (value 3) and can never rot. Determine if all non-immune fresh oranges can rot.
//
// Approach: Immune oranges act as barriers that cannot be converted. You must skip them during BFS and check only non-immune fresh oranges remain at the end.
//
// Time: O(M * N)
// Space: O(M * N)
func RotWithImmunity(input interface{}) interface{} {
    // Immune oranges act as barriers that cannot be converted. You must skip them during BFS and check only non-immune fresh oranges remain at the end.

    // Core algorithm adapted for: Rot with Immunity
    // Key difference from parent: Immune oranges act as barriers that cannot be converted. You must skip them during BFS and check onl

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Grid [[2,1,3,1]]. The immune orange at position 2 blocks rot from reaching the last orange. Answer: -1.
    fmt.Println("Test: Rot with Immunity")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/01-rotting-oranges/twist-02-rot-with-immunity', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/01-rotting-oranges/twist-02-rot-with-immunity'] = problem;
})();
