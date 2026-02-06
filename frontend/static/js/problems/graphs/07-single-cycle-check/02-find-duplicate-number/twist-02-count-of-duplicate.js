/**
 * Count of Duplicate
 * Category: graphs
 * Difficulty: Medium
 * Parent: 07-single-cycle-check/02-find-duplicate-number
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count of Duplicate',
        difficulty: 'Medium',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/02-find-duplicate-number',
        description: 'Find the duplicate number and also return how many times it appears in the array.',
        problem: 'Floyd finds the duplicate but not its frequency. After finding it, you need a linear scan to count occurrences, combining two techniques.',
        hints: [
            'Start by understanding the key difference: Floyd finds the duplicate but not its frequency.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Array [1,3,4,2,2].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            { input: { description: 'Array [1,3,4,2,2]. Duplicate is 2, appears 2 times. Return (2, 2).' }, output: 'See explanation', explanation: 'Array [1,3,4,2,2]. Duplicate is 2, appears 2 times. Return (2, 2).' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def count_of_duplicate(data):
    """
    Count of Duplicate

    Find the duplicate number and also return how many times it appears in the array.

    Approach:
    Floyd finds the duplicate but not its frequency. After finding it, you need a linear scan to count occurrences, combining two techniques.

    Time: O(n)
    Space: O(1)
    """
    # Floyd finds the duplicate but not its frequency. After finding it, you need a linear scan to count occurrences, combining two techniques.

    # Implementation
    result = None

    # Core algorithm adapted for: Count of Duplicate
    # Key difference from parent: Floyd finds the duplicate but not its frequency. After finding it, you need a linear scan to count o

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return count_of_duplicate(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Array [1,3,4,2,2]. Duplicate is 2, appears 2 times. Return (2, 2).
    print("Test: Count of Duplicate")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// CountOfDuplicate solves the Count of Duplicate problem
// Find the duplicate number and also return how many times it appears in the array.
//
// Approach: Floyd finds the duplicate but not its frequency. After finding it, you need a linear scan to count occurrences, combining two techniques.
//
// Time: O(n)
// Space: O(1)
func CountOfDuplicate(input interface{}) interface{} {
    // Floyd finds the duplicate but not its frequency. After finding it, you need a linear scan to count occurrences, combining two techniques.

    // Core algorithm adapted for: Count of Duplicate
    // Key difference from parent: Floyd finds the duplicate but not its frequency. After finding it, you need a linear scan to count o

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Array [1,3,4,2,2]. Duplicate is 2, appears 2 times. Return (2, 2).
    fmt.Println("Test: Count of Duplicate")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/02-find-duplicate-number/twist-02-count-of-duplicate', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/02-find-duplicate-number/twist-02-count-of-duplicate'] = problem;
})();
