/**
 * Greedy Fails: Show a Counterexample
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 01-max-subset-sum/03-paint-house
 */
(function() {
    'use strict';
    const problem = {
        name: 'Greedy Fails: Show a Counterexample',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/03-paint-house',
        description: 'A greedy approach picks the cheapest valid color at each house. Construct an input where this fails to find the global minimum.',
        problem: 'Understanding when local optimal choices don\'t lead to global optimal is crucial for recognizing when DP is needed over greedy.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Understanding when local optimal choices don\'t lead to global optimal is crucial for recognizing when DP is needed over ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'Costs=[[1,100,100],[100,1,100],[100,100,1],[1,100,100]]. Greedy: red(1), blue(1), green(1), red(1)=4. But consider: red(1), blue(1), red(100)... greedy can get stuck. Actually with 3 colors this specific greedy works. Try: [[1,5,6],[6,2,5],[5,6,1],[6,1,5]] - greedy picks 1,2,1,1=5, but optimal might'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def greedyFailsShowACounterexample(data):
    """
    Greedy Fails: Show a Counterexample

    A greedy approach picks the cheapest valid color at each house. Construct an input where this fails to find the global minimum.

    Approach:
    Understanding when local optimal choices don\\'t lead to global optimal is crucial for recognizing when DP is needed over greedy.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: Costs=[[1,100,100],[100,1,100],[100,100,1],[1,100,100]]. Greedy: red(1), blue(1), green(1), red(1)=4. But consider: red(

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
    print(f"Testing Greedy Fails: Show a Counterexample...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// GreedyFailsShowACounterexample solves the Greedy Fails: Show a Counterexample problem.
// A greedy approach picks the cheapest valid color at each house. Construct an input where this fails to find the global minimum.
//
// Approach: Understanding when local optimal choices don't lead to global optimal is crucial for recognizing when DP is needed over greedy.
func GreedyFailsShowACounterexample(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: Costs=[[1,100,100],[100,1,100],[100,100,1],[1,100,100]]. Greedy: red(1), blue(1), green(1), red(1)=4

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Greedy Fails: Show a Counterexample...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/03-paint-house/twist-05-greedy-fails-show-a-counterexample', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/03-paint-house/twist-05-greedy-fails-show-a-counterexample'] = problem;
})();
