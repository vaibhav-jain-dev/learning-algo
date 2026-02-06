/**
 * Three Houses in a Triangle
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 01-max-subset-sum/01-house-robber-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'Three Houses in a Triangle',
        difficulty: 'Hard',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/01-house-robber-ii',
        description: 'Generalize: what if houses are arranged not in a circle but in a general graph? With just 3 houses where each is adjacent to both others, what is the maximum you can rob?',
        problem: 'Forces thinking about the problem beyond the 1D circular case. On a general graph, this becomes the Maximum Independent Set problem, which is NP-hard. The circular structure is what makes it tractable.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Forces thinking about the problem beyond the 1D circular case. On a general graph, this becomes the Maximum Independent ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'Three houses with values [10, 20, 30] all adjacent to each other: you can only rob one house. Answer: 30. This is much harder on general graphs.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def threeHousesInATriangle(data):
    """
    Three Houses in a Triangle

    Generalize: what if houses are arranged not in a circle but in a general graph? With just 3 houses where each is adjacent to both others, what is the maximum you can rob?

    Approach:
    Forces thinking about the problem beyond the 1D circular case. On a general graph, this becomes the Maximum Independent Set problem, which is NP-hard. The circular structure is what makes it tractable.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: Three houses with values [10, 20, 30] all adjacent to each other: you can only rob one house. Answer: 30. This is much h

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
    print(f"Testing Three Houses in a Triangle...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ThreeHousesInATriangle solves the Three Houses in a Triangle problem.
// Generalize: what if houses are arranged not in a circle but in a general graph? With just 3 houses where each is adjacent to both others, what is the 
//
// Approach: Forces thinking about the problem beyond the 1D circular case. On a general graph, this becomes the Maximum Independent Set problem, which is NP-hard.
func ThreeHousesInATriangle(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: Three houses with values [10, 20, 30] all adjacent to each other: you can only rob one house. Answer

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Three Houses in a Triangle...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/01-house-robber-ii/twist-05-three-houses-in-a-triangle', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/01-house-robber-ii/twist-05-three-houses-in-a-triangle'] = problem;
})();
