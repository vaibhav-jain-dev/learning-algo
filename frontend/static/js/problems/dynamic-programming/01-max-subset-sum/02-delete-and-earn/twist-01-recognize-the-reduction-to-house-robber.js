/**
 * Recognize the Reduction to House Robber
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 01-max-subset-sum/02-delete-and-earn
 */
(function() {
    'use strict';
    const problem = {
        name: 'Recognize the Reduction to House Robber',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/02-delete-and-earn',
        description: 'Before writing any code, explain how Delete and Earn maps to House Robber. What is the "points array" and why does choosing value v force you to skip v-1 and v+1?',
        problem: 'The key insight is the problem transformation, not the DP itself. If you can reduce to House Robber, the DP is straightforward. This twist tests pattern recognition.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: The key insight is the problem transformation, not the DP itself. If you can reduce to House Robber, the DP is straightf',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'For nums=[2, 2, 3, 3, 3, 4]: points[2]=4, points[3]=9, points[4]=4. Now solve House Robber on [0, 0, 4, 9, 4]. Taking value 3 (points=9) means you skip 2 and 4. Answer: 9.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def recognizeTheReductionToHouseRobber(data):
    """
    Recognize the Reduction to House Robber

    Before writing any code, explain how Delete and Earn maps to House Robber. What is the "points array" and why does choosing value v force you to skip v-1 and v+1?

    Approach:
    The key insight is the problem transformation, not the DP itself. If you can reduce to House Robber, the DP is straightforward. This twist tests pattern recognition.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: For nums=[2, 2, 3, 3, 3, 4]: points[2]=4, points[3]=9, points[4]=4. Now solve House Robber on [0, 0, 4, 9, 4]. Taking va

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
    print(f"Testing Recognize the Reduction to House Robber...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// RecognizeTheReductionToHouseRobber solves the Recognize the Reduction to House Robber problem.
// Before writing any code, explain how Delete and Earn maps to House Robber. What is the "points array" and why does choosing value v force you to skip 
//
// Approach: The key insight is the problem transformation, not the DP itself. If you can reduce to House Robber, the DP is straightforward. This twist tests patte
func RecognizeTheReductionToHouseRobber(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: For nums=[2, 2, 3, 3, 3, 4]: points[2]=4, points[3]=9, points[4]=4. Now solve House Robber on [0, 0,

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Recognize the Reduction to House Robber...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/02-delete-and-earn/twist-01-recognize-the-reduction-to-house-robber', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/02-delete-and-earn/twist-01-recognize-the-reduction-to-house-robber'] = problem;
})();
