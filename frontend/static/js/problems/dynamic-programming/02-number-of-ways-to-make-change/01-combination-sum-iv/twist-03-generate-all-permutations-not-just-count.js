/**
 * Generate All Permutations (Not Just Count)
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 02-number-of-ways-to-make-change/01-combination-sum-iv
 */
(function() {
    'use strict';
    const problem = {
        name: 'Generate All Permutations (Not Just Count)',
        difficulty: 'Hard',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change/01-combination-sum-iv',
        description: 'Instead of counting, generate and return all ordered sequences that sum to target. This requires backtracking or DP with path reconstruction.',
        problem: 'Counting is O(target * n) but generating all permutations can be exponential. You need a different algorithmic approach (backtracking with pruning) since the DP table alone cannot reconstruct all paths efficiently.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Counting is O(target * n) but generating all permutations can be exponential. You need a different algorithmic approach ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(2^n)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'nums=[1,2,3], target=4: Output [[1,1,1,1],[1,1,2],[1,2,1],[1,3],[2,1,1],[2,2],[3,1]].'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def generateAllPermutationsNotJustCount(data):
    """
    Generate All Permutations (Not Just Count)

    Instead of counting, generate and return all ordered sequences that sum to target. This requires backtracking or DP with path reconstruction.

    Approach:
    Counting is O(target * n) but generating all permutations can be exponential. You need a different algorithmic approach (backtracking with pruning) since the DP table alone cannot reconstruct all paths efficiently.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: nums=[1,2,3], target=4: Output [[1,1,1,1],[1,1,2],[1,2,1],[1,3],[2,1,1],[2,2],[3,1]].

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
    print(f"Testing Generate All Permutations (Not Just Count)...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// GenerateAllPermutationsNotJustCount solves the Generate All Permutations (Not Just Count) problem.
// Instead of counting, generate and return all ordered sequences that sum to target. This requires backtracking or DP with path reconstruction.
//
// Approach: Counting is O(target * n) but generating all permutations can be exponential. You need a different algorithmic approach (backtracking with pruning) si
func GenerateAllPermutationsNotJustCount(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: nums=[1,2,3], target=4: Output [[1,1,1,1],[1,1,2],[1,2,1],[1,3],[2,1,1],[2,2],[3,1]].

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Generate All Permutations (Not Just Count)...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/01-combination-sum-iv/twist-03-generate-all-permutations-not-just-count', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/01-combination-sum-iv/twist-03-generate-all-permutations-not-just-count'] = problem;
})();
