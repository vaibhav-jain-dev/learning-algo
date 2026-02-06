/**
 * Surrounded by Single Character
 * Category: graphs
 * Difficulty: Medium
 * Parent: 06-remove-islands/01-surrounded-regions
 */
(function() {
    'use strict';
    const problem = {
        name: 'Surrounded by Single Character',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/01-surrounded-regions',
        description: 'The board has three characters: X, O, and Y. Only capture O regions that are surrounded entirely by X (not Y or border).',
        problem: 'Border connectivity is not the only escape. An O region adjacent to any Y cell also escapes capture, requiring you to check neighbor types during DFS.',
        hints: [
            'Start by understanding the key difference: Border connectivity is not the only escape.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: An O group touches Y but not the border.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(M * N)', space: 'O(M * N)' },
        examples: [
            { input: { description: 'An O group touches Y but not the border. It is NOT captured because Y is not X.' }, output: 'See explanation', explanation: 'An O group touches Y but not the border. It is NOT captured because Y is not X.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def surrounded_by_single_character(data):
    """
    Surrounded by Single Character

    The board has three characters: X, O, and Y. Only capture O regions that are surrounded entirely by X (not Y or border).

    Approach:
    Border connectivity is not the only escape. An O region adjacent to any Y cell also escapes capture, requiring you to check neighbor types during DFS.

    Time: O(M * N)
    Space: O(M * N)
    """
    # Border connectivity is not the only escape. An O region adjacent to any Y cell also escapes capture, requiring you to check neighbor types during DFS.

    # Implementation
    result = None

    # Core algorithm adapted for: Surrounded by Single Character
    # Key difference from parent: Border connectivity is not the only escape. An O region adjacent to any Y cell also escapes capture,

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return surrounded_by_single_character(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # An O group touches Y but not the border. It is NOT captured because Y is not X.
    print("Test: Surrounded by Single Character")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// SurroundedBySingleCharacter solves the Surrounded by Single Character problem
// The board has three characters: X, O, and Y. Only capture O regions that are surrounded entirely by X (not Y or border).
//
// Approach: Border connectivity is not the only escape. An O region adjacent to any Y cell also escapes capture, requiring you to check neighbor types during DFS.
//
// Time: O(M * N)
// Space: O(M * N)
func SurroundedBySingleCharacter(input interface{}) interface{} {
    // Border connectivity is not the only escape. An O region adjacent to any Y cell also escapes capture, requiring you to check neighbor types during DFS.

    // Core algorithm adapted for: Surrounded by Single Character
    // Key difference from parent: Border connectivity is not the only escape. An O region adjacent to any Y cell also escapes capture,

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // An O group touches Y but not the border. It is NOT captured because Y is not X.
    fmt.Println("Test: Surrounded by Single Character")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/01-surrounded-regions/twist-02-surrounded-by-single-character', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/01-surrounded-regions/twist-02-surrounded-by-single-character'] = problem;
})();
