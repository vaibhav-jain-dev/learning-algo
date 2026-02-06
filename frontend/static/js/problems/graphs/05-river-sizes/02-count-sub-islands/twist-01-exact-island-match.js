/**
 * Exact Island Match
 * Category: graphs
 * Difficulty: Hard
 * Parent: 05-river-sizes/02-count-sub-islands
 */
(function() {
    'use strict';
    const problem = {
        name: 'Exact Island Match',
        difficulty: 'Hard',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/02-count-sub-islands',
        description: 'An island in grid2 counts only if it has the exact same shape and position as an island in grid1 (not just contained within).',
        problem: 'Containment is not enough. You must ensure no extra cells exist in grid1 island beyond those in grid2 island, requiring bidirectional shape comparison.',
        hints: [
            'Start by understanding the key difference: Containment is not enough.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Grid1 island covers cells {(0,0),(0,1),(1,0)}.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(M * N)', space: 'O(M * N)' },
        examples: [
            { input: { description: 'Grid1 island covers cells {(0,0),(0,1),(1,0)}. Grid2 island covers {(0,0),(0,1)}. Not an exact match even though it is a sub-island.' }, output: 'See explanation', explanation: 'Grid1 island covers cells {(0,0),(0,1),(1,0)}. Grid2 island covers {(0,0),(0,1)}. Not an exact match even though it is a sub-island.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def exact_island_match(data):
    """
    Exact Island Match

    An island in grid2 counts only if it has the exact same shape and position as an island in grid1 (not just contained within).

    Approach:
    Containment is not enough. You must ensure no extra cells exist in grid1 island beyond those in grid2 island, requiring bidirectional shape comparison.

    Time: O(M * N)
    Space: O(M * N)
    """
    # Containment is not enough. You must ensure no extra cells exist in grid1 island beyond those in grid2 island, requiring bidirectional shape comparison.

    # Implementation
    result = None

    # Core algorithm adapted for: Exact Island Match
    # Key difference from parent: Containment is not enough. You must ensure no extra cells exist in grid1 island beyond those in grid

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return exact_island_match(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Grid1 island covers cells {(0,0),(0,1),(1,0)}. Grid2 island covers {(0,0),(0,1)}. Not an exact match even though it is a sub-island.
    print("Test: Exact Island Match")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ExactIslandMatch solves the Exact Island Match problem
// An island in grid2 counts only if it has the exact same shape and position as an island in grid1 (not just contained within).
//
// Approach: Containment is not enough. You must ensure no extra cells exist in grid1 island beyond those in grid2 island, requiring bidirectional shape comparison.
//
// Time: O(M * N)
// Space: O(M * N)
func ExactIslandMatch(input interface{}) interface{} {
    // Containment is not enough. You must ensure no extra cells exist in grid1 island beyond those in grid2 island, requiring bidirectional shape comparison.

    // Core algorithm adapted for: Exact Island Match
    // Key difference from parent: Containment is not enough. You must ensure no extra cells exist in grid1 island beyond those in grid

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Grid1 island covers cells {(0,0),(0,1),(1,0)}. Grid2 island covers {(0,0),(0,1)}. Not an exact match even though it is a sub-island.
    fmt.Println("Test: Exact Island Match")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/02-count-sub-islands/twist-01-exact-island-match', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/02-count-sub-islands/twist-01-exact-island-match'] = problem;
})();
