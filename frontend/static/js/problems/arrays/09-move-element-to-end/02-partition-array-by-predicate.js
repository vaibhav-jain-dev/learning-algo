/**
 * Partition Array By Predicate
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partition Array By Predicate',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '09-move-element-to-end',
        description: 'Given an array of integers and a predicate function, rearrange the array so that all elements satisfying the predicate come before all elements that don\'t satisfy it. Return the partitioned array. The relative order within each partition does not need to be preserved.',
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
        "raw": "array = [1, 4, 2, 5, 3, 6], predicate = isEven"
},
        output: "[6, 4, 2, 5, 3, 1] (or any arrangement with evens first)",
        explanation: 'Given the input, the algorithm processes it to produce [6, 4, 2, 5, 3, 1] (or any arrangement with evens first)'
    },
    {
        input: {
        "raw": "array = [3, 1, 4, 1, 5, 9, 2, 6], predicate = x > 3"
},
        output: "[6, 9, 4, 5, 1, 1, 2, 3] (elements > 3 first)",
        explanation: 'Given the input, the algorithm processes it to produce [6, 9, 4, 5, 1, 1, 2, 3] (elements > 3 first)'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5], predicate = isOdd"
},
        output: "[5, 3, 1, 2, 4] (odds first)",
        explanation: 'Given the input, the algorithm processes it to produce [5, 3, 1, 2, 4] (odds first)'
    }
        ],
        solutions: {
            python: `def partitionArrayByPredicate(data):
    """
    Partition Array By Predicate

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

// PartitionArrayByPredicate solves the Partition Array By Predicate problem.
// Time: O(n), Space: O(n)
func PartitionArrayByPredicate(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 09-move-element-to-end
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/02-partition-array-by-predicate', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/02-partition-array-by-predicate'] = problem;

})();
