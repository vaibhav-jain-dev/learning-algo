/**
 * Shortest Unsorted With K
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Unsorted With K',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '18-subarray-sort',
        description: 'Given an integer array, find the shortest contiguous subarray that, if sorted, would result in the whole array being sorted. Return the length of that subarray.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
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
        "raw": "array = [2, 6, 4, 8, 10, 9, 15]"
},
        output: "5\nExplanation: Sort subarray [6, 4, 8, 10, 9] to get sorted array",
        explanation: 'Given the input, the algorithm processes it to produce 5\nExplanation: Sort subarray [6, 4, 8, 10, 9] to get sorted array'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4]"
},
        output: "0\nExplanation: Already sorted",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: Already sorted'
    }
        ],
        solutions: {
            python: `def shortestUnsortedWithK(data):
    """
    Shortest Unsorted With K

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

// ShortestUnsortedWithK solves the Shortest Unsorted With K problem.
// Time: O(n), Space: O(n)
func ShortestUnsortedWithK(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 18-subarray-sort
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '18-subarray-sort/02-shortest-unsorted-with-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/18-subarray-sort/02-shortest-unsorted-with-k'] = problem;

})();
