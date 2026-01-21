/**
 * Permutations with Duplicates
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Permutations with Duplicates',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Given an array of numbers that may contain duplicates, return all possible unique permutations in any order. Unlike the basic permutations problem where all elements are unique, this problem requires handling duplicate elements to avoid generating duplicate permutations.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n! * n)',
            space: 'O(n)'
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
        "nums": [
                1,
                1,
                2
        ]
},
        output: [[1, 1, 2], [1, 2, 1], [2, 1, 1]],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input nums=[1, 1, 2], the result is [[1, 1, 2], [1, 2, 1], [2, 1, 1]].'
    }
        ],
        solutions: {
            python: `def permutationsWithDuplicates(data):
    """
    Permutations with Duplicates

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

// PermutationsWithDuplicates solves the Permutations with Duplicates problem.
// Time: O(n), Space: O(n)
func PermutationsWithDuplicates(data interface{}) interface{} {
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
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates'] = problem;

})();
