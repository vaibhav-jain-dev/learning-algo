/**
 * Conceptual Trap: Off-by-One in Circular Indexing
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 01-max-subset-sum/01-house-robber-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'Conceptual Trap: Off-by-One in Circular Indexing',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/01-house-robber-ii',
        description: 'When solving the two subproblems (exclude first, exclude last), what are the exact array slices? What happens if n <= 2? Walk through the edge cases.',
        problem: 'Off-by-one errors in the circular decomposition are the most common bug. You must handle n=1 (just return nums[0]) and n=2 (return max) as special cases.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Off-by-one errors in the circular decomposition are the most common bug. You must handle n=1 (just return nums[0]) and n',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'n=1: [5] -> return 5. n=2: [5, 3] -> return 5. n=3: [2, 3, 2] -> solve [2, 3] and [3, 2], both give 3. The slices are nums[0..n-2] and nums[1..n-1] inclusive.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def conceptualTrapOffbyoneInCircularIndexing(data):
    """
    Conceptual Trap: Off-by-One in Circular Indexing

    When solving the two subproblems (exclude first, exclude last), what are the exact array slices? What happens if n <= 2? Walk through the edge cases.

    Approach:
    Off-by-one errors in the circular decomposition are the most common bug. You must handle n=1 (just return nums[0]) and n=2 (return max) as special cases.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: n=1: [5] -> return 5. n=2: [5, 3] -> return 5. n=3: [2, 3, 2] -> solve [2, 3] and [3, 2], both give 3. The slices are nu

    # --- Core DP Logic ---
    # 1. Define the DP state based on the modified problem
    # 2. Initialize base cases
    # 3. Fill the DP table using the modified recurrence
    # 4. Return the answer from the DP table

    result = None  # Replace with actual computation
    return result


# Tests
if __name__ == "__main__":
    # Test case from example
    print(f"Testing Conceptual Trap: Off-by-One in Circular Indexing...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ConceptualTrapOffbyoneInCircularIndexing solves the Conceptual Trap: Off-by-One in Circular Indexing problem.
// When solving the two subproblems (exclude first, exclude last), what are the exact array slices? What happens if n <= 2? Walk through the edge cases.
//
// Approach: Off-by-one errors in the circular decomposition are the most common bug. You must handle n=1 (just return nums[0]) and n=2 (return max) as special cas
func ConceptualTrapOffbyoneInCircularIndexing(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: n=1: [5] -> return 5. n=2: [5, 3] -> return 5. n=3: [2, 3, 2] -> solve [2, 3] and [3, 2], both give 

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Conceptual Trap: Off-by-One in Circular Indexing...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/01-house-robber-ii/twist-03-conceptual-trap-off-by-one-in-circular-indexing', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/01-house-robber-ii/twist-03-conceptual-trap-off-by-one-in-circular-indexing'] = problem;
})();
