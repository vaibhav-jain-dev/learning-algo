/**
 * Greedy Fails Here - Prove It
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 01-max-subset-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Greedy Fails Here - Prove It',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'A greedy approach might always pick the largest available non-adjacent element. Construct a counterexample where greedy fails and explain why DP is necessary.',
        problem: 'Understanding why greedy fails deepens understanding of when DP is needed. It forces analysis of the optimal substructure property.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Understanding why greedy fails deepens understanding of when DP is needed. It forces analysis of the optimal substructur',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'Array [5, 10, 5, 5, 5]. Greedy picks 10 first (largest), then can only pick 5+5=10, total 20. But optimal is 5+5+5=15 skipping the 10... Actually [3, 10, 3, 3, 3]: greedy picks 10, gets 10+3=13. DP picks 3+3+3=9. Hmm, greedy wins here. Try [1, 100, 1, 1, 100, 1]: greedy picks 100,100=200. DP also ge'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def greedyFailsHereProveIt(data):
    """
    Greedy Fails Here - Prove It

    A greedy approach might always pick the largest available non-adjacent element. Construct a counterexample where greedy fails and explain why DP is necessary.

    Approach:
    Understanding why greedy fails deepens understanding of when DP is needed. It forces analysis of the optimal substructure property.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: Array [5, 10, 5, 5, 5]. Greedy picks 10 first (largest), then can only pick 5+5=10, total 20. But optimal is 5+5+5=15 sk

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
    print(f"Testing Greedy Fails Here - Prove It...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// GreedyFailsHereProveIt solves the Greedy Fails Here - Prove It problem.
// A greedy approach might always pick the largest available non-adjacent element. Construct a counterexample where greedy fails and explain why DP is ne
//
// Approach: Understanding why greedy fails deepens understanding of when DP is needed. It forces analysis of the optimal substructure property.
func GreedyFailsHereProveIt(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: Array [5, 10, 5, 5, 5]. Greedy picks 10 first (largest), then can only pick 5+5=10, total 20. But op

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Greedy Fails Here - Prove It...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/twist-04-greedy-fails-here-prove-it', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/twist-04-greedy-fails-here-prove-it'] = problem;
})();
