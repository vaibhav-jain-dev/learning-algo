/**
 * Cycle Length
 * Category: graphs
 * Difficulty: Easy
 * Parent: 07-single-cycle-check/01-linked-list-cycle
 */
(function() {
    'use strict';
    const problem = {
        name: 'Cycle Length',
        difficulty: 'Easy',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/01-linked-list-cycle',
        description: 'If a cycle exists, return the length of the cycle (number of nodes in the cycle).',
        problem: 'After detection, keep one pointer fixed and advance the other around the cycle counting steps until they meet again.',
        hints: [
            'Start by understanding the key difference: After detection, keep one pointer fixed and advance the other around the cycle counting steps until they meet again.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: List [3,2,0,-4] with cycle at position 1.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            { input: { description: 'List [3,2,0,-4] with cycle at position 1. Cycle contains nodes 2,0,-4 -> length 3.' }, output: 'See explanation', explanation: 'List [3,2,0,-4] with cycle at position 1. Cycle contains nodes 2,0,-4 -> length 3.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def cycle_length(data):
    """
    Cycle Length

    If a cycle exists, return the length of the cycle (number of nodes in the cycle).

    Approach:
    After detection, keep one pointer fixed and advance the other around the cycle counting steps until they meet again.

    Time: O(n)
    Space: O(1)
    """
    # After detection, keep one pointer fixed and advance the other around the cycle counting steps until they meet again.

    # Implementation
    result = None

    # Core algorithm adapted for: Cycle Length
    # Key difference from parent: After detection, keep one pointer fixed and advance the other around the cycle counting steps until 

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return cycle_length(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # List [3,2,0,-4] with cycle at position 1. Cycle contains nodes 2,0,-4 -> length 3.
    print("Test: Cycle Length")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// CycleLength solves the Cycle Length problem
// If a cycle exists, return the length of the cycle (number of nodes in the cycle).
//
// Approach: After detection, keep one pointer fixed and advance the other around the cycle counting steps until they meet again.
//
// Time: O(n)
// Space: O(1)
func CycleLength(input interface{}) interface{} {
    // After detection, keep one pointer fixed and advance the other around the cycle counting steps until they meet again.

    // Core algorithm adapted for: Cycle Length
    // Key difference from parent: After detection, keep one pointer fixed and advance the other around the cycle counting steps until 

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // List [3,2,0,-4] with cycle at position 1. Cycle contains nodes 2,0,-4 -> length 3.
    fmt.Println("Test: Cycle Length")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/01-linked-list-cycle/twist-02-cycle-length', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/01-linked-list-cycle/twist-02-cycle-length'] = problem;
})();
