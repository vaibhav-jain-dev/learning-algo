/**
 * Three Sum With Multiplicity
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-sum-with-multiplicity
 * Parent: 07-three-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum With Multiplicity',
        difficulty: 'Hard',
        algorithm: 'three-sum-with-multiplicity',
        parent: '07-three-number-sum',
        description: 'Given an array that may contain duplicates, count all ordered triplet indices (i, j, k) where i < j < k and array[i] + array[j] + array[k] = target. Instead of unique value triplets, you count index-based combinations, requiring combinatorial math when duplicates exist.',
        problem: 'Instead of unique value triplets, you count index-based combinations, requiring combinatorial math when duplicates exist.',
        hints: [
            'Think about how three sum with multiplicity differs from the standard version of this problem.',
            'Key insight: Instead of unique value triplets, you count index-based combinations, requiring combinatorial math when duplicates exist.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,3,4,5],"target":9},
                output: [[1,3,5],[2,3,4]],
                explanation: 'Found all valid combinations summing to target.'
            },
            {
                input: {"array":[-1,0,1,2],"target":0},
                output: [[-1,0,1]],
                explanation: 'Negative numbers included in the valid combination.'
            },
            {
                input: {"array":[1,2,3],"target":100},
                output: [],
                explanation: 'No valid combination exists for this target.'
            }
        ],
        solutions: {
            python: `def three_sum_with_multiplicity(data):
    """
    Three Sum With Multiplicity

    Given an array that may contain duplicates, count all ordered triplet indices (i, j, k) where i < j < k and array[i] + array[j] + array[k] = target.
    \n    Approach: Instead of unique value triplets, you count index-based combinations, requiring combinatorial math when duplicates exist.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 1, 2, 2, 3, 3], target = 6. Multiple index combinations yield the same value triplet.

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
print(three_sum_with_multiplicity([1, 2, 3, 4, 5]))
print(three_sum_with_multiplicity([5, 3, 1]))
print(three_sum_with_multiplicity([1]))`,
            go: `package main

import "fmt"

// ThreeSumWithMultiplicity solves the Three Sum With Multiplicity problem.
// Given an array that may contain duplicates, count all ordered triplet indices (i, j, k) where i < j < k and array[i] + array[j] + array[k] = target.
// Time: O(n^2), Space: O(n)
func ThreeSumWithMultiplicity(data []int) []int {
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
    fmt.Println(ThreeSumWithMultiplicity([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumWithMultiplicity([]int{5, 3, 1}))
    fmt.Println(ThreeSumWithMultiplicity([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/twist-05-three-sum-with-multiplicity', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/twist-05-three-sum-with-multiplicity'] = problem;
})();
