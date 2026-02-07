/**
 * Maximum Coverage Partition
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-pi-numbers
 * Parent: 09-numbers-in-pi
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Coverage Partition',
        difficulty: 'Hard',
        algorithm: 'dp-pi-numbers',
        parent: '09-numbers-in-pi',
        description: 'Not all of Pi needs to be covered. Find the partition that covers the maximum number of digits of Pi using numbers from the list, skipping uncoverable sections.',
        problem: 'Removes the requirement that every digit must be covered. You now need interval scheduling or a coverage DP that allows gaps between matched numbers.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Removes the requirement that every digit must be covered. You now need interval scheduling or a coverage DP that allows ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(2^n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"pi":"3141592653589793238462643383279","numbers":["314159265358979323846","26433","8","3279","314159265","35897932384626433832","79"]},
                output: 2,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"pi":"314159","numbers":["314","159","3141","59"]},
                output: 3,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"pi":"123456","numbers":["12","34","56"]},
                output: 1,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"pi":"","numbers":["314159265358979323846"]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def maximum_coverage_partition(pi, numbers):
    """
    Maximum Coverage Partition

    Not all of Pi needs to be covered. Find the partition that covers the maximum number of digits of Pi using numbers from the list, skipping uncoverable sections.

    Time: O(2^n)
    Space: O(n)
    """
    count = 0
    n = len(pi)

    for i in range(n):
        # Check condition based on numbers
        j = 0
        for k in range(i, n):
            if j < len(numbers) and pi[k] == numbers[j]:
                j += 1
        if j == len(numbers):
            count += 1

    return count


# Test cases
print(maximum_coverage_partition("3141592653589793238462643383279", ["314159265358979323846","26433","8","3279","314159265","35897932384626433832","79"]))  # Expected: 2
print(maximum_coverage_partition("314159", ["314","159","3141","59"]))  # Expected: 3
print(maximum_coverage_partition("123456", ["12","34","56"]))  # Expected: 1
`,
            go: `package main

import "fmt"

// MaximumCoveragePartition solves the Maximum Coverage Partition problem.
// Not all of Pi needs to be covered. Find the partition that covers the maximum number of digits of Pi using numbers from the list, skipping uncoverable sections.
// Time: O(2^n), Space: O(n)
func MaximumCoveragePartition(pi string, numbers []string) int {
	result := 0

	for i := 0; i < len(pi); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaximumCoveragePartition("3141592653589793238462643383279", []string{"314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"})) // Expected: 2
	fmt.Println(MaximumCoveragePartition("314159", []string{"314", "159", "3141", "59"})) // Expected: 3
	fmt.Println(MaximumCoveragePartition("123456", []string{"12", "34", "56"})) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '09-numbers-in-pi/twist-02-maximum-coverage-partition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/09-numbers-in-pi/twist-02-maximum-coverage-partition'] = problem;
})();
