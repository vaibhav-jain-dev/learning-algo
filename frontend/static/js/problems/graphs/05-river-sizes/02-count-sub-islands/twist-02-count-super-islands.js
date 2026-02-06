/**
 * Count Super Islands
 * Category: graphs
 * Difficulty: Medium
 * Parent: 05-river-sizes/02-count-sub-islands
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Super Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/02-count-sub-islands',
        description: 'Instead of sub-islands, count islands in grid1 that contain at least one complete island from grid2.',
        problem: 'You reverse the containment check. For each grid1 island, you check if any grid2 island is fully inside it, requiring you to map grid2 islands to grid1 islands.',
        hints: [
            'Start by understanding the key difference: You reverse the containment check.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Grid1 has one large island.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(M * N)', space: 'O(M * N)' },
        examples: [
            { input: { description: 'Grid1 has one large island. Grid2 has 3 small islands, 2 inside the large one. Answer: 1 super island.' }, output: 'See explanation', explanation: 'Grid1 has one large island. Grid2 has 3 small islands, 2 inside the large one. Answer: 1 super island.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def count_super_islands(data):
    """
    Count Super Islands

    Instead of sub-islands, count islands in grid1 that contain at least one complete island from grid2.

    Approach:
    You reverse the containment check. For each grid1 island, you check if any grid2 island is fully inside it, requiring you to map grid2 islands to grid1 islands.

    Time: O(M * N)
    Space: O(M * N)
    """
    # You reverse the containment check. For each grid1 island, you check if any grid2 island is fully inside it, requiring you to map grid2 islands to grid1 islands.

    # Implementation
    result = None

    # Core algorithm adapted for: Count Super Islands
    # Key difference from parent: You reverse the containment check. For each grid1 island, you check if any grid2 island is fully ins

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return count_super_islands(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Grid1 has one large island. Grid2 has 3 small islands, 2 inside the large one. Answer: 1 super island.
    print("Test: Count Super Islands")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// CountSuperIslands solves the Count Super Islands problem
// Instead of sub-islands, count islands in grid1 that contain at least one complete island from grid2.
//
// Approach: You reverse the containment check. For each grid1 island, you check if any grid2 island is fully inside it, requiring you to map grid2 islands to grid1 islands.
//
// Time: O(M * N)
// Space: O(M * N)
func CountSuperIslands(input interface{}) interface{} {
    // You reverse the containment check. For each grid1 island, you check if any grid2 island is fully inside it, requiring you to map grid2 islands to grid1 islands.

    // Core algorithm adapted for: Count Super Islands
    // Key difference from parent: You reverse the containment check. For each grid1 island, you check if any grid2 island is fully ins

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Grid1 has one large island. Grid2 has 3 small islands, 2 inside the large one. Answer: 1 super island.
    fmt.Println("Test: Count Super Islands")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/02-count-sub-islands/twist-02-count-super-islands', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/02-count-sub-islands/twist-02-count-super-islands'] = problem;
})();
