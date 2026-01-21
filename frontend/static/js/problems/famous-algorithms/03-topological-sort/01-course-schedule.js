/**
 * Course Schedule
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Course Schedule',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'There are numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi before course ai. Return true if you can finish all courses, or false if there is a cycle.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
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
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input numCourses=2, prerequisites=[[1, 0]], the result is true.'
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
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input numCourses=2, prerequisites=[[1, 0], [0, 1]], the result is false.'
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule'] = problem;

})();
