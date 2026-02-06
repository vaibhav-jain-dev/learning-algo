/**
 * Greedy Fails: Show a Counterexample
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
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
        problem: 'Understanding when local optimal choices don\',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Understanding when local optimal choices don\',
            ',
            ',
            ',
            '
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"costs":[[17,2,17],[16,16,5],[14,3,19]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the greedy fails show a counterexample criteria.'
            },
            {
                input: {"costs":[[7,6,2]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the greedy fails show a counterexample criteria.'
            },
            // Edge case
            {
                input: {"costs":[[17,2,17]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def greedy_fails_show_a_counterexample(costs):
    """
    Greedy Fails: Show a Counterexample

    A greedy approach picks the cheapest valid color at each house. Construct an input where this fails to find the global minimum.

    Time: O(n log n)
    Space: O(n)
    """
    result = 0

    for i in range(len(costs)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(greedy_fails_show_a_counterexample([[17,2,17],[16,16,5],[14,3,19]]))  # Expected: 1
print(greedy_fails_show_a_counterexample([[7,6,2]]))  # Expected: 2
print(greedy_fails_show_a_counterexample([[17,2,17]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// GreedyFailsShowACounterexample solves the Greedy Fails: Show a Counterexample problem.
// A greedy approach picks the cheapest valid color at each house. Construct an input where this fails to find the global minimum.
// Time: O(n log n), Space: O(n)
func GreedyFailsShowACounterexample(costs [][]int) int {
	result := 0

	for i := 0; i < len(costs); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(GreedyFailsShowACounterexample([][]int{{17, 2, 17}, {16, 16, 5}, {14, 3, 19}})) // Expected: 1
	fmt.Println(GreedyFailsShowACounterexample([][]int{{7, 6, 2}})) // Expected: 2
	fmt.Println(GreedyFailsShowACounterexample([][]int{{17, 2, 17}})) // Expected: 0
}
`
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
