/**
 * Parallel Courses
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Parallel Courses',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'You are given an integer n, which indicates there are n courses labeled from 1 to n. You are also given an array relations where relations[i] = [prevCourse, nextCourse], indicating that prevCourse must be taken before nextCourse. In one semester, you can take any number of courses as long as all prerequisites are completed. Return the minimum number of semesters needed to complete all courses. Return -1 if it\'s impossible.',
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
        "n": 3,
        "relations": [
                [
                        1,
                        3
                ],
                [
                        2,
                        3
                ]
        ]
},
        output: 2,
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input n=3, relations=[[1, 3], [2, 3]], the result is 2.'
    }
        ],
        solutions: {
            python: `def parallelCourses(data):
    """
    Parallel Courses

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

// ParallelCourses solves the Parallel Courses problem.
// Time: O(n), Space: O(n)
func ParallelCourses(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses'] = problem;

})();
