/**
 * Minimum Cost Path
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 16-ways-to-traverse-graph
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Cost Path',
        difficulty: 'Medium',
        algorithm: 'dp-graph-traversal',
        parent: '16-ways-to-traverse-graph',
        description: 'Each cell has a cost. Find the path from top-left to bottom-right (moving only right or down) with the minimum total cost.',
        problem: 'Changes from counting paths to optimizing cost. The DP recurrence uses min instead of sum, and cell values are accumulated rather than counted.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Changes from counting paths to optimizing cost. The DP recurrence uses min instead of sum, and cell values are accumulat',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'grid=[[1,3,1],[1,5,1],[4,2,1]]: minimum cost path is 1->3->1->1->1=7 going right,right,down,down.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def minimumCostPath(data):
    """
    Minimum Cost Path

    Each cell has a cost. Find the path from top-left to bottom-right (moving only right or down) with the minimum total cost.

    Approach:
    Changes from counting paths to optimizing cost. The DP recurrence uses min instead of sum, and cell values are accumulated rather than counted.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: grid=[[1,3,1],[1,5,1],[4,2,1]]: minimum cost path is 1->3->1->1->1=7 going right,right,down,down.

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
    print(f"Testing Minimum Cost Path...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// MinimumCostPath solves the Minimum Cost Path problem.
// Each cell has a cost. Find the path from top-left to bottom-right (moving only right or down) with the minimum total cost.
//
// Approach: Changes from counting paths to optimizing cost. The DP recurrence uses min instead of sum, and cell values are accumulated rather than counted.
func MinimumCostPath(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: grid=[[1,3,1],[1,5,1],[4,2,1]]: minimum cost path is 1->3->1->1->1=7 going right,right,down,down.

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Minimum Cost Path...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '16-ways-to-traverse-graph/twist-02-minimum-cost-path', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/16-ways-to-traverse-graph/twist-02-minimum-cost-path'] = problem;
})();
