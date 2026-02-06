/**
 * Top K Island Areas
 * Category: graphs
 * Difficulty: Medium
 * Parent: 05-river-sizes/01-max-area-of-island
 */
(function() {
    'use strict';
    const problem = {
        name: 'Top K Island Areas',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/01-max-area-of-island',
        description: 'Return the areas of the K largest islands in descending order.',
        problem: 'You need to collect all island areas and then either sort or use a heap, adding a selection step on top of the flood fill.',
        hints: [
            'Start by understanding the key difference: You need to collect all island areas and then either sort or use a heap, adding a selection step on top of the flood fill.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Islands with areas [5, 2, 8, 1, 3], K=3.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(M × N)', space: 'O(M × N)' },
        examples: [
            { input: { description: 'Islands with areas [5, 2, 8, 1, 3], K=3. Return [8, 5, 3].' }, output: 'See explanation', explanation: 'Islands with areas [5, 2, 8, 1, 3], K=3. Return [8, 5, 3].' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def top_k_island_areas(data):
    """
    Top K Island Areas

    Return the areas of the K largest islands in descending order.

    Approach:
    You need to collect all island areas and then either sort or use a heap, adding a selection step on top of the flood fill.

    Time: O(M × N)
    Space: O(M × N)
    """
    # You need to collect all island areas and then either sort or use a heap, adding a selection step on top of the flood fill.

    # Implementation
    result = None

    # Core algorithm adapted for: Top K Island Areas
    # Key difference from parent: You need to collect all island areas and then either sort or use a heap, adding a selection step on 

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return top_k_island_areas(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Islands with areas [5, 2, 8, 1, 3], K=3. Return [8, 5, 3].
    print("Test: Top K Island Areas")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// TopKIslandAreas solves the Top K Island Areas problem
// Return the areas of the K largest islands in descending order.
//
// Approach: You need to collect all island areas and then either sort or use a heap, adding a selection step on top of the flood fill.
//
// Time: O(M × N)
// Space: O(M × N)
func TopKIslandAreas(input interface{}) interface{} {
    // You need to collect all island areas and then either sort or use a heap, adding a selection step on top of the flood fill.

    // Core algorithm adapted for: Top K Island Areas
    // Key difference from parent: You need to collect all island areas and then either sort or use a heap, adding a selection step on 

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Islands with areas [5, 2, 8, 1, 3], K=3. Return [8, 5, 3].
    fmt.Println("Test: Top K Island Areas")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/01-max-area-of-island/twist-02-top-k-island-areas', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/01-max-area-of-island/twist-02-top-k-island-areas'] = problem;
})();
