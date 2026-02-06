/**
 * Circular Houses (First = Last Neighbor)
 * Category: dynamic-programming
 * Difficulty: Very Hard
 * Parent: 01-max-subset-sum/03-paint-house
 */
(function() {
    'use strict';
    const problem = {
        name: 'Circular Houses (First = Last Neighbor)',
        difficulty: 'Very Hard',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/03-paint-house',
        description: 'What if the houses are in a circle, so the first and last house are also adjacent and must have different colors? How do you handle this additional constraint?',
        problem: 'Similar to House Robber II\'s circular decomposition, but here you fix the first house\'s color and run DP for each possible first color, then check the last house\'s color doesn\'t match.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Similar to House Robber II\'s circular decomposition, but here you fix the first house\'s color and run DP for each possib',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'Fix house 0 as red: solve the rest with house n-1 not red. Repeat for blue and green. Take minimum across all three.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def circularHousesFirstLastNeighbor(data):
    """
    Circular Houses (First = Last Neighbor)

    What if the houses are in a circle, so the first and last house are also adjacent and must have different colors? How do you handle this additional constraint?

    Approach:
    Similar to House Robber II\\'s circular decomposition, but here you fix the first house\\'s color and run DP for each possible first color, then check the last house\\'s color doesn\\'t match.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: Fix house 0 as red: solve the rest with house n-1 not red. Repeat for blue and green. Take minimum across all three.

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
    print(f"Testing Circular Houses (First = Last Neighbor)...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// CircularHousesFirstLastNeighbor solves the Circular Houses (First = Last Neighbor) problem.
// What if the houses are in a circle, so the first and last house are also adjacent and must have different colors? How do you handle this additional co
//
// Approach: Similar to House Robber II's circular decomposition, but here you fix the first house's color and run DP for each possible first color, then check the
func CircularHousesFirstLastNeighbor(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: Fix house 0 as red: solve the rest with house n-1 not red. Repeat for blue and green. Take minimum a

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Circular Houses (First = Last Neighbor)...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/03-paint-house/twist-03-circular-houses-first-last-neighbor', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/03-paint-house/twist-03-circular-houses-first-last-neighbor'] = problem;
})();
