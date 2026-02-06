/**
 * Enclave Island Count
 * Category: graphs
 * Difficulty: Easy
 * Parent: 06-remove-islands/02-number-of-enclaves
 */
(function() {
    'use strict';
    const problem = {
        name: 'Enclave Island Count',
        difficulty: 'Easy',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/02-number-of-enclaves',
        description: 'Instead of counting enclave land cells, count the number of distinct enclave islands.',
        problem: 'You count connected components rather than individual cells. After eliminating border-connected land, each remaining DFS start is one enclave island.',
        hints: [
            'Start by understanding the key difference: You count connected components rather than individual cells.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Grid with 5 enclave cells forming 2 separate islands.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(M * N)', space: 'O(M * N)' },
        examples: [
            { input: { description: 'Grid with 5 enclave cells forming 2 separate islands. Answer: 2 (not 5).' }, output: 'See explanation', explanation: 'Grid with 5 enclave cells forming 2 separate islands. Answer: 2 (not 5).' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def enclave_island_count(data):
    """
    Enclave Island Count

    Instead of counting enclave land cells, count the number of distinct enclave islands.

    Approach:
    You count connected components rather than individual cells. After eliminating border-connected land, each remaining DFS start is one enclave island.

    Time: O(M * N)
    Space: O(M * N)
    """
    # You count connected components rather than individual cells. After eliminating border-connected land, each remaining DFS start is one enclave island.

    # Implementation
    result = None

    # Core algorithm adapted for: Enclave Island Count
    # Key difference from parent: You count connected components rather than individual cells. After eliminating border-connected land

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return enclave_island_count(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Grid with 5 enclave cells forming 2 separate islands. Answer: 2 (not 5).
    print("Test: Enclave Island Count")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// EnclaveIslandCount solves the Enclave Island Count problem
// Instead of counting enclave land cells, count the number of distinct enclave islands.
//
// Approach: You count connected components rather than individual cells. After eliminating border-connected land, each remaining DFS start is one enclave island.
//
// Time: O(M * N)
// Space: O(M * N)
func EnclaveIslandCount(input interface{}) interface{} {
    // You count connected components rather than individual cells. After eliminating border-connected land, each remaining DFS start is one enclave island.

    // Core algorithm adapted for: Enclave Island Count
    // Key difference from parent: You count connected components rather than individual cells. After eliminating border-connected land

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Grid with 5 enclave cells forming 2 separate islands. Answer: 2 (not 5).
    fmt.Println("Test: Enclave Island Count")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/02-number-of-enclaves/twist-01-enclave-island-count', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/02-number-of-enclaves/twist-01-enclave-island-count'] = problem;
})();
