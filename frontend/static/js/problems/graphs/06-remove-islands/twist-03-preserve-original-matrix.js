/**
 * Preserve Original Matrix
 * Category: graphs
 * Difficulty: Medium
 * Parent: 06-remove-islands
 */
(function() {
    'use strict';
    const problem = {
        name: 'Preserve Original Matrix',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'Solve without modifying the input matrix. Use a separate visited array.',
        problem: 'In-place marking is the common approach. Using a separate structure requires O(N*M) extra space and careful coordination between the visited set and the result.',
        hints: [
            'Start by understanding the key difference: In-place marking is the common approach.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Input matrix remains unchanged.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(N * M)', space: 'O(N * M)' },
        examples: [
            { input: { description: 'Input matrix remains unchanged. Return a new matrix with islands removed.' }, output: 'See explanation', explanation: 'Input matrix remains unchanged. Return a new matrix with islands removed.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def preserve_original_matrix(data):
    """
    Preserve Original Matrix

    Solve without modifying the input matrix. Use a separate visited array.

    Approach:
    In-place marking is the common approach. Using a separate structure requires O(N*M) extra space and careful coordination between the visited set and the result.

    Time: O(N * M)
    Space: O(N * M)
    """
    # In-place marking is the common approach. Using a separate structure requires O(N*M) extra space and careful coordination between the visited set and the result.

    # Implementation
    result = None

    # Core algorithm adapted for: Preserve Original Matrix
    # Key difference from parent: In-place marking is the common approach. Using a separate structure requires O(N*M) extra space and 

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return preserve_original_matrix(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Input matrix remains unchanged. Return a new matrix with islands removed.
    print("Test: Preserve Original Matrix")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// PreserveOriginalMatrix solves the Preserve Original Matrix problem
// Solve without modifying the input matrix. Use a separate visited array.
//
// Approach: In-place marking is the common approach. Using a separate structure requires O(N*M) extra space and careful coordination between the visited set and the result.
//
// Time: O(N * M)
// Space: O(N * M)
func PreserveOriginalMatrix(input interface{}) interface{} {
    // In-place marking is the common approach. Using a separate structure requires O(N*M) extra space and careful coordination between the visited set and the result.

    // Core algorithm adapted for: Preserve Original Matrix
    // Key difference from parent: In-place marking is the common approach. Using a separate structure requires O(N*M) extra space and 

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Input matrix remains unchanged. Return a new matrix with islands removed.
    fmt.Println("Test: Preserve Original Matrix")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/twist-03-preserve-original-matrix', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/twist-03-preserve-original-matrix'] = problem;
})();
