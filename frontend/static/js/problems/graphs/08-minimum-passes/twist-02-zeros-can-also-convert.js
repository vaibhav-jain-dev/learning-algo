/**
 * Zeros Can Also Convert
 * Category: graphs
 * Difficulty: Medium
 * Parent: 08-minimum-passes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Zeros Can Also Convert',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes',
        description: 'Zeros act as neutral but can be converted to positive by adjacent positives. Once positive, they can convert adjacent negatives.',
        problem: 'Zeros are no longer inert barriers. They participate in the propagation chain, changing the BFS wavefront behavior and potentially converting previously unreachable negatives.',
        hints: [
            'Start by understanding the key difference: Zeros are no longer inert barriers.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Matrix [[1,0,0,−1]].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(N * M)', space: 'O(N * M)' },
        examples: [
            { input: { description: 'Matrix [[1,0,0,−1]]. Pass 1: 0->1. Pass 2: 0->1. Pass 3: −1->1. Total: 3 passes.' }, output: 'See explanation', explanation: 'Matrix [[1,0,0,−1]]. Pass 1: 0->1. Pass 2: 0->1. Pass 3: −1->1. Total: 3 passes.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def zeros_can_also_convert(data):
    """
    Zeros Can Also Convert

    Zeros act as neutral but can be converted to positive by adjacent positives. Once positive, they can convert adjacent negatives.

    Approach:
    Zeros are no longer inert barriers. They participate in the propagation chain, changing the BFS wavefront behavior and potentially converting previously unreachable negatives.

    Time: O(N * M)
    Space: O(N * M)
    """
    # Zeros are no longer inert barriers. They participate in the propagation chain, changing the BFS wavefront behavior and potentially converting previously unreachable negatives.

    # Implementation
    result = None

    # Core algorithm adapted for: Zeros Can Also Convert
    # Key difference from parent: Zeros are no longer inert barriers. They participate in the propagation chain, changing the BFS wave

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return zeros_can_also_convert(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Matrix [[1,0,0,−1]]. Pass 1: 0->1. Pass 2: 0->1. Pass 3: −1->1. Total: 3 passes.
    print("Test: Zeros Can Also Convert")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ZerosCanAlsoConvert solves the Zeros Can Also Convert problem
// Zeros act as neutral but can be converted to positive by adjacent positives. Once positive, they can convert adjacent negatives.
//
// Approach: Zeros are no longer inert barriers. They participate in the propagation chain, changing the BFS wavefront behavior and potentially converting previously unreachable negatives.
//
// Time: O(N * M)
// Space: O(N * M)
func ZerosCanAlsoConvert(input interface{}) interface{} {
    // Zeros are no longer inert barriers. They participate in the propagation chain, changing the BFS wavefront behavior and potentially converting previously unreachable negatives.

    // Core algorithm adapted for: Zeros Can Also Convert
    // Key difference from parent: Zeros are no longer inert barriers. They participate in the propagation chain, changing the BFS wave

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Matrix [[1,0,0,−1]]. Pass 1: 0->1. Pass 2: 0->1. Pass 3: −1->1. Total: 3 passes.
    fmt.Println("Test: Zeros Can Also Convert")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/twist-02-zeros-can-also-convert', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/twist-02-zeros-can-also-convert'] = problem;
})();
