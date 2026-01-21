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
        description: 'You are given an integer n, which indicates there are n courses labeled from 1 to n. You are also given an array relations where relations[i] = [prevCourse, nextCourse], indicating that prevCourse must be taken before nextCourse. In one semester, you can take any number of courses as long as all prerequisites are completed. Return the minimum number of semesters needed to complete all courses. Return -1 if it\'s impossible.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
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
