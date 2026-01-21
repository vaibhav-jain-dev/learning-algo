/**
 * Course Schedule
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Course Schedule',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph',
        description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.',
        problem: 'Detect cycles using DFS with node coloring: WHITE (unvisited), GRAY (in current path), BLACK (fully processed). A cycle exists if we encounter a GRAY node.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        hints: [
            'Use three states: unvisited, in-progress, completed.',
            'A back edge to an in-progress node indicates a cycle.',
            'For undirected graphs, track parent to avoid false positives.',
            'Consider using Union-Find as an alternative approach.',
            'DFS naturally handles cycle detection with recursion stack.'
        ],
        examples: [
    {
        input: {
        "numCourses": 2,
        "prerequisites": [
                [
                        1,
                        0
                ]
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input numCourses=2, prerequisites=[[1, 0]], the result is true.'
    },
    {
        input: {
        "numCourses": 2,
        "prerequisites": [
                [
                        1,
                        0
                ],
                [
                        0,
                        1
                ]
        ]
},
        output: false,
        explanation: 'Exploring the graph structure, we find the required path or value. For input numCourses=2, prerequisites=[[1, 0], [0, 1]], the result is false.'
    }
        ],
        solutions: {
            python: `def courseSchedule(data):
    """
    Course Schedule

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// CourseSchedule solves the Course Schedule problem.
// Time: O(n), Space: O(n)
func CourseSchedule(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/01-course-schedule', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/01-course-schedule'] = problem;

})();
