/**
 * DFS Cycle Detection
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/01-course-schedule
 */
(function() {
    'use strict';

    const problem = {
        name: 'DFS Cycle Detection',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/01-course-schedule',
        description: 'Detect whether the course prerequisite graph has a cycle using DFS with three-color marking instead of BFS in-degree approach.',
        problem: 'Uses a fundamentally different cycle detection method -- white/gray/black coloring where finding a gray node during DFS indicates a back edge (cycle).',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"numCourses":2,"prerequisites":[[1,0]]},
                output: true,
                explanation: 'The dfs cycle detection condition is satisfied for this input.'
            },
            {
                input: {"numCourses":2,"prerequisites":[[1,0],[0,1]]},
                output: false,
                explanation: 'The dfs cycle detection condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"numCourses":0,"prerequisites":[[1,0]]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def dfs_cycle_detection(numCourses, prerequisites):
    """
    DFS Cycle Detection

    Detect whether the course prerequisite graph has a cycle using DFS with three-color marking instead of BFS in-degree approach.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(numCourses)):
        if j < len(prerequisites) and numCourses[i] == prerequisites[j]:
            j += 1

    return j == len(prerequisites)


# Test cases
print(dfs_cycle_detection(2, [[1,0]]))  # Expected: True
print(dfs_cycle_detection(2, [[1,0],[0,1]]))  # Expected: False
print(dfs_cycle_detection(0, [[1,0]]))  # Expected: False
`,
            go: `package main

import "fmt"

// DfsCycleDetection solves the DFS Cycle Detection problem.
// Detect whether the course prerequisite graph has a cycle using DFS with three-color marking instead of BFS in-degree approach.
// Time: O(?), Space: O(?)
func DfsCycleDetection(numCourses int, prerequisites [][]int) bool {
	j := 0

	for i := 0; i < len(numCourses) && j < len(prerequisites); i++ {
		if numCourses[i] == prerequisites[j] {
			j++
		}
	}

	return j == len(prerequisites)
}

func main() {
	fmt.Println(DfsCycleDetection(2, [][]int{{1, 0}})) // Expected: true
	fmt.Println(DfsCycleDetection(2, [][]int{{1, 0}, {0, 1}})) // Expected: false
	fmt.Println(DfsCycleDetection(0, [][]int{{1, 0}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule/twist-03-dfs-cycle-detection', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule/twist-03-dfs-cycle-detection'] = problem;
})();
