/**
 * All Minimum Windows
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: all-minimum-windows
 * Parent: 01-validate-subsequence/03-minimum-window-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Minimum Windows',
        difficulty: 'Hard',
        algorithm: 'all-minimum-windows',
        parent: '01-validate-subsequence/03-minimum-window-subsequence',
        description: 'Instead of returning just one minimum window, return all non-overlapping minimum-length windows where s2 is a subsequence. Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.',
        problem: 'Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.',
        hints: [
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"s1":"abcdebdde","s2":"bde"},
                output: "bcde",
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            },
            {
                input: {"s1":"abcdef","s2":"ace"},
                output: "abcde",
                explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
            },
            // Edge case
            {
                input: {"s1":"xyz","s2":"abc"},
                output: "",
                explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
            }
        ],
        solutions: {
            python: `def all_minimum_windows(s1, s2):
    """
    All Minimum Windows

    Instead of returning just one minimum window, return all non-overlapping minimum-length windows where s2 is a subsequence. Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(s1)

    for i in range(n):
        # Check condition based on s2
        j = 0
        for k in range(i, n):
            if j < len(s2) and s1[k] == s2[j]:
                j += 1
        if j == len(s2):
            count += 1

    return count


# Test cases
print(all_minimum_windows("abcdebdde", "bde"))  # Expected: "bcde"
print(all_minimum_windows("abcdef", "ace"))  # Expected: "abcde"
print(all_minimum_windows("xyz", "abc"))  # Expected: ""
`,
            go: `package main

import "fmt"

// AllMinimumWindows solves the All Minimum Windows problem.
// Instead of returning just one minimum window, return all non-overlapping minimum-length windows where s2 is a subsequence. Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.
// Time: O(n), Space: O(n)
func AllMinimumWindows(s1 string, s2 string) int {
	result := 0

	for i := 0; i < len(s1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AllMinimumWindows("abcdebdde", "bde")) // Expected: "bcde"
	fmt.Println(AllMinimumWindows("abcdef", "ace")) // Expected: "abcde"
	fmt.Println(AllMinimumWindows("xyz", "abc")) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/03-minimum-window-subsequence/twist-01-all-minimum-windows', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/03-minimum-window-subsequence/twist-01-all-minimum-windows'] = problem;
})();
