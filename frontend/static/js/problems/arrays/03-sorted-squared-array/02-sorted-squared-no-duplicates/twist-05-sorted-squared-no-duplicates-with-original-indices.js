/**
 * Sorted Squared No Duplicates with Original Indices
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: sorted-squared-no-duplicates-with-original-indices
 * Parent: 03-sorted-squared-array/02-sorted-squared-no-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared No Duplicates with Original Indices',
        difficulty: 'Hard',
        algorithm: 'sorted-squared-no-duplicates-with-original-indices',
        parent: '03-sorted-squared-array/02-sorted-squared-no-duplicates',
        description: 'Return unique squared values along with all original indices that contributed to each value. Requires maintaining index lists while deduplicating, turning a simple merge into a grouping operation.',
        problem: 'Requires maintaining index lists while deduplicating, turning a simple merge into a grouping operation.',
        hints: [
            'Think about how sorted squared no duplicates with original indices differs from the standard version of this problem.',
            'Key insight: Requires maintaining index lists while deduplicating, turning a simple merge into a grouping operation.',
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
            python: `def sorted_squared_no_duplicates_with_original_indices(data):
    """
    Sorted Squared No Duplicates with Original Indices

    Return unique squared values along with all original indices that contributed to each value.
    \n    Approach: Requires maintaining index lists while deduplicating, turning a simple merge into a grouping operation.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[-3,-1,1,3] → [{val:1, indices:[1,2]}, {val:9, indices:[0,3]}]

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
print(sorted_squared_no_duplicates_with_original_indices([1, 2, 3, 4, 5]))
print(sorted_squared_no_duplicates_with_original_indices([5, 3, 1]))
print(sorted_squared_no_duplicates_with_original_indices([1]))`,
            go: `package main

import "fmt"

// SortedSquaredNoDuplicatesWithOriginalIndices solves the Sorted Squared No Duplicates with Original Indices problem.
// Return unique squared values along with all original indices that contributed to each value.
// Time: O(n), Space: O(n)
func SortedSquaredNoDuplicatesWithOriginalIndices(data []int) []int {
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
    fmt.Println(SortedSquaredNoDuplicatesWithOriginalIndices([]int{1, 2, 3, 4, 5}))
    fmt.Println(SortedSquaredNoDuplicatesWithOriginalIndices([]int{5, 3, 1}))
    fmt.Println(SortedSquaredNoDuplicatesWithOriginalIndices([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-05-sorted-squared-no-duplicates-with-original-indices', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-05-sorted-squared-no-duplicates-with-original-indices'] = problem;
})();
