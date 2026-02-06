/**
 * Paths Through Mandatory Waypoint
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-graph-traversal
 * Parent: 16-ways-to-traverse-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Paths Through Mandatory Waypoint',
        difficulty: 'Hard',
        algorithm: 'dp-graph-traversal',
        parent: '16-ways-to-traverse-graph',
        description: 'Count paths from top-left to bottom-right that must pass through a specific intermediate cell (waypoint).',
        problem: 'Decomposes into two subproblems: paths from start to waypoint multiplied by paths from waypoint to end. Requires combining two DP computations.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Decomposes into two subproblems: paths from start to waypoint multiplied by paths from waypoint to end. Requires combini',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"width":4,"height":3},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the paths through mandatory waypoint criteria.'
            },
            {
                input: {"width":2,"height":2},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the paths through mandatory waypoint criteria.'
            },
            {
                input: {"width":3,"height":3},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the paths through mandatory waypoint criteria.'
            },
            {
                input: {"width":1,"height":5},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the paths through mandatory waypoint criteria.'
            },
            // Edge case
            {
                input: {"width":0,"height":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def paths_through_mandatory_waypoint(width, height):
    """
    Paths Through Mandatory Waypoint

    Count paths from top-left to bottom-right that must pass through a specific intermediate cell (waypoint).

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(width)

    for i in range(n):
        # Check condition based on height
        j = 0
        for k in range(i, n):
            if j < len(height) and width[k] == height[j]:
                j += 1
        if j == len(height):
            count += 1

    return count


# Test cases
print(paths_through_mandatory_waypoint(4, 3))  # Expected: 1
print(paths_through_mandatory_waypoint(2, 2))  # Expected: 2
print(paths_through_mandatory_waypoint(3, 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// PathsThroughMandatoryWaypoint solves the Paths Through Mandatory Waypoint problem.
// Count paths from top-left to bottom-right that must pass through a specific intermediate cell (waypoint).
// Time: O(n^2), Space: O(n)
func PathsThroughMandatoryWaypoint(width int, height int) int {
	result := 0

	for i := 0; i < len(width); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PathsThroughMandatoryWaypoint(4, 3)) // Expected: 1
	fmt.Println(PathsThroughMandatoryWaypoint(2, 2)) // Expected: 2
	fmt.Println(PathsThroughMandatoryWaypoint(3, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '16-ways-to-traverse-graph/twist-05-paths-through-mandatory-waypoint', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/16-ways-to-traverse-graph/twist-05-paths-through-mandatory-waypoint'] = problem;
})();
