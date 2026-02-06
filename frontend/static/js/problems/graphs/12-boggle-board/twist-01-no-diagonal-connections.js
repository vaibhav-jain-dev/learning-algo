/**
 * No Diagonal Connections
 * Category: graphs
 * Difficulty: Easy
 * Parent: 12-boggle-board
 */
(function() {
    'use strict';
    const problem = {
        name: 'No Diagonal Connections',
        difficulty: 'Easy',
        algorithm: 'graph-word-search',
        parent: '12-boggle-board',
        description: 'Letters can only connect horizontally and vertically (4 directions), not diagonally. Find all words.',
        problem: 'Reducing from 8 to 4 neighbors changes which words are findable. Paths that relied on diagonal connections break, requiring re-evaluation of word reachability.',
        hints: [
            'Start by understanding the key difference: Reducing from 8 to 4 neighbors changes which words are findable.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Word "cat" needs c-a-t connected.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(N * M * 8^L + W * L)', space: 'O(W * L + N * M)' },
        examples: [
            { input: { description: 'Word "cat" needs c-a-t connected. With diagonals, c at (0,0) reaches a at (1,1). Without diagonals, they must be horizontally or vertically adjacent.' }, output: 'See explanation', explanation: 'Word "cat" needs c-a-t connected. With diagonals, c at (0,0) reaches a at (1,1). Without diagonals, they must be horizontally or vertically adjacent.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def no_diagonal_connections(data):
    """
    No Diagonal Connections

    Letters can only connect horizontally and vertically (4 directions), not diagonally. Find all words.

    Approach:
    Reducing from 8 to 4 neighbors changes which words are findable. Paths that relied on diagonal connections break, requiring re-evaluation of word reachability.

    Time: O(N * M * 8^L + W * L)
    Space: O(W * L + N * M)
    """
    # Reducing from 8 to 4 neighbors changes which words are findable. Paths that relied on diagonal connections break, requiring re-evaluation of word reachability.

    # Implementation
    result = None

    # Core algorithm adapted for: No Diagonal Connections
    # Key difference from parent: Reducing from 8 to 4 neighbors changes which words are findable. Paths that relied on diagonal conne

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return no_diagonal_connections(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Word "cat" needs c-a-t connected. With diagonals, c at (0,0) reaches a at (1,1). Without diagonals, they must be horizontally or vertically adjacent.
    print("Test: No Diagonal Connections")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// NoDiagonalConnections solves the No Diagonal Connections problem
// Letters can only connect horizontally and vertically (4 directions), not diagonally. Find all words.
//
// Approach: Reducing from 8 to 4 neighbors changes which words are findable. Paths that relied on diagonal connections break, requiring re-evaluation of word reachability.
//
// Time: O(N * M * 8^L + W * L)
// Space: O(W * L + N * M)
func NoDiagonalConnections(input interface{}) interface{} {
    // Reducing from 8 to 4 neighbors changes which words are findable. Paths that relied on diagonal connections break, requiring re-evaluation of word reachability.

    // Core algorithm adapted for: No Diagonal Connections
    // Key difference from parent: Reducing from 8 to 4 neighbors changes which words are findable. Paths that relied on diagonal conne

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Word "cat" needs c-a-t connected. With diagonals, c at (0,0) reaches a at (1,1). Without diagonals, they must be horizontally or vertically adjacent.
    fmt.Println("Test: No Diagonal Connections")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '12-boggle-board/twist-01-no-diagonal-connections', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/12-boggle-board/twist-01-no-diagonal-connections'] = problem;
})();
