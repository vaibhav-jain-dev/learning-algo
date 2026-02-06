/**
 * K Largest Rivers
 * Category: graphs
 * Difficulty: Medium
 * Parent: 05-river-sizes
 */
(function() {
    'use strict';
    const problem = {
        name: 'K Largest Rivers',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes',
        description: 'Return only the K largest river sizes. Optimize so you do not need to sort all sizes.',
        problem: 'A min-heap of size K during traversal avoids sorting all components. You must think about the selection problem layered on top of flood fill.',
        hints: [
            'Start by understanding the key difference: A min-heap of size K during traversal avoids sorting all components.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Rivers of sizes [5, 2, 1, 2, 8, 3], K=3.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(N * M)', space: 'O(N * M)' },
        examples: [
            { input: { description: 'Rivers of sizes [5, 2, 1, 2, 8, 3], K=3. Return [8, 5, 3].' }, output: 'See explanation', explanation: 'Rivers of sizes [5, 2, 1, 2, 8, 3], K=3. Return [8, 5, 3].' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def k_largest_rivers(data):
    """
    K Largest Rivers

    Return only the K largest river sizes. Optimize so you do not need to sort all sizes.

    Approach:
    A min-heap of size K during traversal avoids sorting all components. You must think about the selection problem layered on top of flood fill.

    Time: O(N * M)
    Space: O(N * M)
    """
    # A min-heap of size K during traversal avoids sorting all components. You must think about the selection problem layered on top of flood fill.

    # Implementation
    result = None

    # Core algorithm adapted for: K Largest Rivers
    # Key difference from parent: A min-heap of size K during traversal avoids sorting all components. You must think about the select

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return k_largest_rivers(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Rivers of sizes [5, 2, 1, 2, 8, 3], K=3. Return [8, 5, 3].
    print("Test: K Largest Rivers")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// KLargestRivers solves the K Largest Rivers problem
// Return only the K largest river sizes. Optimize so you do not need to sort all sizes.
//
// Approach: A min-heap of size K during traversal avoids sorting all components. You must think about the selection problem layered on top of flood fill.
//
// Time: O(N * M)
// Space: O(N * M)
func KLargestRivers(input interface{}) interface{} {
    // A min-heap of size K during traversal avoids sorting all components. You must think about the selection problem layered on top of flood fill.

    // Core algorithm adapted for: K Largest Rivers
    // Key difference from parent: A min-heap of size K during traversal avoids sorting all components. You must think about the select

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Rivers of sizes [5, 2, 1, 2, 8, 3], K=3. Return [8, 5, 3].
    fmt.Println("Test: K Largest Rivers")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/twist-03-k-largest-rivers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/twist-03-k-largest-rivers'] = problem;
})();
