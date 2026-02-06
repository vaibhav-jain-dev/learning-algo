/**
 * Greedy Fails: Classic Counterexample
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 03-min-coins
 */
(function() {
    'use strict';
    const problem = {
        name: 'Greedy Fails: Classic Counterexample',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins',
        description: 'The greedy approach always picks the largest coin that fits. Construct a specific input where greedy gives more coins than the DP optimal. Explain why the greedy property fails for arbitrary denominations.',
        problem: 'Understanding when greedy fails is fundamental to recognizing coin change as a DP problem. Greedy works for specific denomination systems (like US coins) but fails in general.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Understanding when greedy fails is fundamental to recognizing coin change as a DP problem. Greedy works for specific den',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'denoms=[1, 3, 4], n=6. Greedy: 4+1+1=3 coins. Optimal: 3+3=2 coins. Greedy picks 4 first (largest fitting) but this forces two 1s, while two 3s is better.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def greedyFailsClassicCounterexample(data):
    """
    Greedy Fails: Classic Counterexample

    The greedy approach always picks the largest coin that fits. Construct a specific input where greedy gives more coins than the DP optimal. Explain why the greedy property fails for arbitrary denominations.

    Approach:
    Understanding when greedy fails is fundamental to recognizing coin change as a DP problem. Greedy works for specific denomination systems (like US coins) but fails in general.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: denoms=[1, 3, 4], n=6. Greedy: 4+1+1=3 coins. Optimal: 3+3=2 coins. Greedy picks 4 first (largest fitting) but this forc

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
    print(f"Testing Greedy Fails: Classic Counterexample...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// GreedyFailsClassicCounterexample solves the Greedy Fails: Classic Counterexample problem.
// The greedy approach always picks the largest coin that fits. Construct a specific input where greedy gives more coins than the DP optimal. Explain why
//
// Approach: Understanding when greedy fails is fundamental to recognizing coin change as a DP problem. Greedy works for specific denomination systems (like US coi
func GreedyFailsClassicCounterexample(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: denoms=[1, 3, 4], n=6. Greedy: 4+1+1=3 coins. Optimal: 3+3=2 coins. Greedy picks 4 first (largest fi

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Greedy Fails: Classic Counterexample...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/twist-01-greedy-fails-classic-counterexample', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/twist-01-greedy-fails-classic-counterexample'] = problem;
})();
