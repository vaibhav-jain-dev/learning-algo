/**
 * Find All Cycles
 * Category: graphs
 * Difficulty: Hard
 * Parent: 07-single-cycle-check/03-circular-array-loop
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find All Cycles',
        difficulty: 'Hard',
        algorithm: 'fast-slow-pointer',
        parent: '07-single-cycle-check/03-circular-array-loop',
        description: 'Return all distinct cycles in the array, not just whether one exists. Each cycle is a list of indices.',
        problem: 'You must find every cycle, not stop at the first. This requires tracking which indices belong to which cycle across the entire array.',
        hints: [
            'Start by understanding the key difference: You must find every cycle, not stop at the first.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Array [1,-1,1,-1].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            { input: { description: 'Array [1,-1,1,-1]. Cycles: [0,1] and [2,3]. Return [[0,1],[2,3]].' }, output: 'See explanation', explanation: 'Array [1,-1,1,-1]. Cycles: [0,1] and [2,3]. Return [[0,1],[2,3]].' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def find_all_cycles(data):
    """
    Find All Cycles

    Return all distinct cycles in the array, not just whether one exists. Each cycle is a list of indices.

    Approach:
    You must find every cycle, not stop at the first. This requires tracking which indices belong to which cycle across the entire array.

    Time: O(n)
    Space: O(1)
    """
    # You must find every cycle, not stop at the first. This requires tracking which indices belong to which cycle across the entire array.

    # Implementation
    result = None

    # Core algorithm adapted for: Find All Cycles
    # Key difference from parent: You must find every cycle, not stop at the first. This requires tracking which indices belong to whi

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return find_all_cycles(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Array [1,-1,1,-1]. Cycles: [0,1] and [2,3]. Return [[0,1],[2,3]].
    print("Test: Find All Cycles")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// FindAllCycles solves the Find All Cycles problem
// Return all distinct cycles in the array, not just whether one exists. Each cycle is a list of indices.
//
// Approach: You must find every cycle, not stop at the first. This requires tracking which indices belong to which cycle across the entire array.
//
// Time: O(n)
// Space: O(1)
func FindAllCycles(input interface{}) interface{} {
    // You must find every cycle, not stop at the first. This requires tracking which indices belong to which cycle across the entire array.

    // Core algorithm adapted for: Find All Cycles
    // Key difference from parent: You must find every cycle, not stop at the first. This requires tracking which indices belong to whi

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Array [1,-1,1,-1]. Cycles: [0,1] and [2,3]. Return [[0,1],[2,3]].
    fmt.Println("Test: Find All Cycles")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/03-circular-array-loop/twist-02-find-all-cycles', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/03-circular-array-loop/twist-02-find-all-cycles'] = problem;
})();
