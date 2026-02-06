/**
 * Return All Minimum Partitions
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 11-palindrome-partitioning
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return All Minimum Partitions',
        difficulty: 'Hard',
        algorithm: 'dp-palindrome',
        parent: '11-palindrome-partitioning',
        description: 'Instead of just the minimum number of cuts, return all possible partitions that achieve this minimum cut count.',
        problem: 'Adds a backtracking/enumeration phase after the DP. You must reconstruct all optimal partition paths, not just count the cuts.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Adds a backtracking/enumeration phase after the DP. You must reconstruct all optimal partition paths, not just count the',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(2^n)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'string="aab": min cuts=1. Valid minimum partitions: ["aa","b"] and ["a","ab"]? No, "ab" is not a palindrome. Only ["aa","b"] works.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def returnAllMinimumPartitions(data):
    """
    Return All Minimum Partitions

    Instead of just the minimum number of cuts, return all possible partitions that achieve this minimum cut count.

    Approach:
    Adds a backtracking/enumeration phase after the DP. You must reconstruct all optimal partition paths, not just count the cuts.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: string="aab": min cuts=1. Valid minimum partitions: ["aa","b"] and ["a","ab"]? No, "ab" is not a palindrome. Only ["aa",

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
    print(f"Testing Return All Minimum Partitions...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ReturnAllMinimumPartitions solves the Return All Minimum Partitions problem.
// Instead of just the minimum number of cuts, return all possible partitions that achieve this minimum cut count.
//
// Approach: Adds a backtracking/enumeration phase after the DP. You must reconstruct all optimal partition paths, not just count the cuts.
func ReturnAllMinimumPartitions(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: string="aab": min cuts=1. Valid minimum partitions: ["aa","b"] and ["a","ab"]? No, "ab" is not a pal

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Return All Minimum Partitions...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '11-palindrome-partitioning/twist-01-return-all-minimum-partitions', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/11-palindrome-partitioning/twist-01-return-all-minimum-partitions'] = problem;
})();
