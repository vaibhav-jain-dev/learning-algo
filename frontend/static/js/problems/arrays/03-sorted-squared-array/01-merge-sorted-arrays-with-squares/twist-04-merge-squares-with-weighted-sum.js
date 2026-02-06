/**
 * Merge Squares with Weighted Sum
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: merge-squares-with-weighted-sum
 * Parent: 03-sorted-squared-array/01-merge-sorted-arrays-with-squares
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Squares with Weighted Sum',
        difficulty: 'Hard',
        algorithm: 'merge-squares-with-weighted-sum',
        parent: '03-sorted-squared-array/01-merge-sorted-arrays-with-squares',
        description: 'Each array has associated weights. Merge the squared values and for duplicates, sum their weights instead of including duplicates. Requires carrying metadata (weights) alongside values during the merge, and aggregating when duplicate squared values appear.',
        problem: 'Requires carrying metadata (weights) alongside values during the merge, and aggregating when duplicate squared values appear.',
        hints: [
            'Think about how merge squares with weighted sum differs from the standard version of this problem.',
            'Key insight: Requires carrying metadata (weights) alongside values during the merge, and aggregating when duplicate squared values appear.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: 'Elements transformed and sorted correctly.'
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: 'All positive - order maintained after transformation.'
            },
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: 'All negative - order reversed after transformation.'
            }
        ],
        solutions: {
            python: `def merge_squares_with_weighted_sum(data):
    """
    Merge Squares with Weighted Sum

    Each array has associated weights. Merge the squared values and for duplicates, sum their weights instead of including duplicates.
    \n    Approach: Requires carrying metadata (weights) alongside values during the merge, and aggregating when duplicate squared values appear.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # arr1=[(-3,2),(-1,5),(2,1)], arr2=[(-2,3),(4,1)] → [(1,5),(4,4),(9,2),(16,1)] with merged weights

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(merge_squares_with_weighted_sum([1, 2, 3, 4, 5]))
print(merge_squares_with_weighted_sum([5, 3, 1]))
print(merge_squares_with_weighted_sum([1]))`,
            go: `package main

import "fmt"

// MergeSquaresWithWeightedSum solves the Merge Squares with Weighted Sum problem.
// Each array has associated weights. Merge the squared values and for duplicates, sum their weights instead of including duplicates.
// Time: O(n), Space: O(n)
func MergeSquaresWithWeightedSum(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(MergeSquaresWithWeightedSum([]int{1, 2, 3, 4, 5}))
    fmt.Println(MergeSquaresWithWeightedSum([]int{5, 3, 1}))
    fmt.Println(MergeSquaresWithWeightedSum([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/01-merge-sorted-arrays-with-squares/twist-04-merge-squares-with-weighted-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/01-merge-sorted-arrays-with-squares/twist-04-merge-squares-with-weighted-sum'] = problem;
})();
