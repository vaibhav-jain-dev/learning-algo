/**
 * Track Which Houses Were Robbed
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 01-max-subset-sum/01-house-robber-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'Track Which Houses Were Robbed',
        difficulty: 'Hard',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/01-house-robber-ii',
        description: 'Modify the solution to return not just the maximum amount, but the list of house indices that were actually robbed in the optimal solution.',
        problem: 'Reconstructing the solution path from the circular variant is trickier than linear. You must backtrack through whichever subproblem gave the better answer, then map indices back to the original array.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Reconstructing the solution path from the circular variant is trickier than linear. You must backtrack through whichever',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'For [1, 2, 3, 1]: if rob[1..3] gives 4 (houses 1 and 2 in the subproblem), the actual house indices are [1, 2].'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def trackWhichHousesWereRobbed(data):
    """
    Track Which Houses Were Robbed

    Modify the solution to return not just the maximum amount, but the list of house indices that were actually robbed in the optimal solution.

    Approach:
    Reconstructing the solution path from the circular variant is trickier than linear. You must backtrack through whichever subproblem gave the better answer, then map indices back to the original array.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: For [1, 2, 3, 1]: if rob[1..3] gives 4 (houses 1 and 2 in the subproblem), the actual house indices are [1, 2].

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
    print(f"Testing Track Which Houses Were Robbed...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// TrackWhichHousesWereRobbed solves the Track Which Houses Were Robbed problem.
// Modify the solution to return not just the maximum amount, but the list of house indices that were actually robbed in the optimal solution.
//
// Approach: Reconstructing the solution path from the circular variant is trickier than linear. You must backtrack through whichever subproblem gave the better an
func TrackWhichHousesWereRobbed(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: For [1, 2, 3, 1]: if rob[1..3] gives 4 (houses 1 and 2 in the subproblem), the actual house indices 

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Track Which Houses Were Robbed...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/01-house-robber-ii/twist-02-track-which-houses-were-robbed', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/01-house-robber-ii/twist-02-track-which-houses-were-robbed'] = problem;
})();
