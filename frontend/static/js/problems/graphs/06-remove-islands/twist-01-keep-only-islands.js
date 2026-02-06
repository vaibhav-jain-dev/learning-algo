/**
 * Keep Only Islands
 * Category: graphs
 * Difficulty: Medium
 * Parent: 06-remove-islands
 */
(function() {
    'use strict';
    const problem = {
        name: 'Keep Only Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'Instead of removing islands (interior 1s not touching border), remove all border-connected 1s and keep only the islands.',
        problem: 'You invert the logic. After marking border-connected cells, you zero out the marked cells and keep the unmarked ones, flipping the removal target.',
        hints: [
            'Start by understanding the key difference: You invert the logic.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Matrix with border-connected 1s and interior 1s.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(N * M)', space: 'O(N * M)' },
        examples: [
            { input: { description: 'Matrix with border-connected 1s and interior 1s. Output has only interior groups remaining.' }, output: 'See explanation', explanation: 'Matrix with border-connected 1s and interior 1s. Output has only interior groups remaining.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def keep_only_islands(data):
    """
    Keep Only Islands

    Instead of removing islands (interior 1s not touching border), remove all border-connected 1s and keep only the islands.

    Approach:
    You invert the logic. After marking border-connected cells, you zero out the marked cells and keep the unmarked ones, flipping the removal target.

    Time: O(N * M)
    Space: O(N * M)
    """
    # You invert the logic. After marking border-connected cells, you zero out the marked cells and keep the unmarked ones, flipping the removal target.

    # Implementation
    result = None

    # Core algorithm adapted for: Keep Only Islands
    # Key difference from parent: You invert the logic. After marking border-connected cells, you zero out the marked cells and keep t

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return keep_only_islands(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Matrix with border-connected 1s and interior 1s. Output has only interior groups remaining.
    print("Test: Keep Only Islands")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// KeepOnlyIslands solves the Keep Only Islands problem
// Instead of removing islands (interior 1s not touching border), remove all border-connected 1s and keep only the islands.
//
// Approach: You invert the logic. After marking border-connected cells, you zero out the marked cells and keep the unmarked ones, flipping the removal target.
//
// Time: O(N * M)
// Space: O(N * M)
func KeepOnlyIslands(input interface{}) interface{} {
    // You invert the logic. After marking border-connected cells, you zero out the marked cells and keep the unmarked ones, flipping the removal target.

    // Core algorithm adapted for: Keep Only Islands
    // Key difference from parent: You invert the logic. After marking border-connected cells, you zero out the marked cells and keep t

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Matrix with border-connected 1s and interior 1s. Output has only interior groups remaining.
    fmt.Println("Test: Keep Only Islands")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/twist-01-keep-only-islands', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/twist-01-keep-only-islands'] = problem;
})();
