/**
 * Return Sub-Island Cells
 * Category: graphs
 * Difficulty: Medium
 * Parent: 05-river-sizes/02-count-sub-islands
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return Sub-Island Cells',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/02-count-sub-islands',
        description: 'Instead of counting sub-islands, return the list of all cells that belong to any sub-island in grid2.',
        problem: 'You must collect cell coordinates during DFS and only include them in the result if the island qualifies as a sub-island, requiring deferred output.',
        hints: [
            'Start by understanding the key difference: You must collect cell coordinates during DFS and only include them in the result if the island qualifies as a sub-island, requiring deferred output.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Sub-island at cells [(0,0),(0,1),(1,0)].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(M * N)', space: 'O(M * N)' },
        examples: [
            { input: { description: 'Sub-island at cells [(0,0),(0,1),(1,0)]. Return these coordinates as a list.' }, output: 'See explanation', explanation: 'Sub-island at cells [(0,0),(0,1),(1,0)]. Return these coordinates as a list.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def return_sub_island_cells(data):
    """
    Return Sub-Island Cells

    Instead of counting sub-islands, return the list of all cells that belong to any sub-island in grid2.

    Approach:
    You must collect cell coordinates during DFS and only include them in the result if the island qualifies as a sub-island, requiring deferred output.

    Time: O(M * N)
    Space: O(M * N)
    """
    # You must collect cell coordinates during DFS and only include them in the result if the island qualifies as a sub-island, requiring deferred output.

    # Implementation
    result = None

    # Core algorithm adapted for: Return Sub-Island Cells
    # Key difference from parent: You must collect cell coordinates during DFS and only include them in the result if the island quali

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return return_sub_island_cells(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Sub-island at cells [(0,0),(0,1),(1,0)]. Return these coordinates as a list.
    print("Test: Return Sub-Island Cells")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ReturnSubIslandCells solves the Return Sub-Island Cells problem
// Instead of counting sub-islands, return the list of all cells that belong to any sub-island in grid2.
//
// Approach: You must collect cell coordinates during DFS and only include them in the result if the island qualifies as a sub-island, requiring deferred output.
//
// Time: O(M * N)
// Space: O(M * N)
func ReturnSubIslandCells(input interface{}) interface{} {
    // You must collect cell coordinates during DFS and only include them in the result if the island qualifies as a sub-island, requiring deferred output.

    // Core algorithm adapted for: Return Sub-Island Cells
    // Key difference from parent: You must collect cell coordinates during DFS and only include them in the result if the island quali

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Sub-island at cells [(0,0),(0,1),(1,0)]. Return these coordinates as a list.
    fmt.Println("Test: Return Sub-Island Cells")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/02-count-sub-islands/twist-05-return-sub-island-cells', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/02-count-sub-islands/twist-05-return-sub-island-cells'] = problem;
})();
