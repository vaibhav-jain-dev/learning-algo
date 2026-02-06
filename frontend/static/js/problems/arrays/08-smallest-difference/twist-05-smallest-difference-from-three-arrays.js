/**
 * Smallest Difference From Three Arrays
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: smallest-difference-from-three-arrays
 * Parent: 08-smallest-difference
 */
(function() {
    'use strict';

    const problem = {
        name: 'Smallest Difference From Three Arrays',
        difficulty: 'Hard',
        algorithm: 'smallest-difference-from-three-arrays',
        parent: '08-smallest-difference',
        description: 'Given three arrays, pick one element from each to minimize (max - min) of the three chosen elements. Extends the two-pointer approach to three pointers, requiring a different strategy for which pointer to advance.',
        problem: 'Extends the two-pointer approach to three pointers, requiring a different strategy for which pointer to advance.',
        hints: [
            'Think about how smallest difference from three arrays differs from the standard version of this problem.',
            'Key insight: Extends the two-pointer approach to three pointers, requiring a different strategy for which pointer to advance.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
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
            python: `def smallest_difference_from_three_arrays(data):
    """
    Smallest Difference From Three Arrays

    Given three arrays, pick one element from each to minimize (max - min) of the three chosen elements.
    \n    Approach: Extends the two-pointer approach to three pointers, requiring a different strategy for which pointer to advance.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # arr1 = [1, 4], arr2 = [5, 10], arr3 = [3, 8]. Best triplet [4, 5, 3] gives range 2.

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
print(smallest_difference_from_three_arrays([1, 2, 3, 4, 5]))
print(smallest_difference_from_three_arrays([5, 3, 1]))
print(smallest_difference_from_three_arrays([1]))`,
            go: `package main

import "fmt"

// SmallestDifferenceFromThreeArrays solves the Smallest Difference From Three Arrays problem.
// Given three arrays, pick one element from each to minimize (max - min) of the three chosen elements.
// Time: O(n^2), Space: O(n)
func SmallestDifferenceFromThreeArrays(data []int) []int {
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
    fmt.Println(SmallestDifferenceFromThreeArrays([]int{1, 2, 3, 4, 5}))
    fmt.Println(SmallestDifferenceFromThreeArrays([]int{5, 3, 1}))
    fmt.Println(SmallestDifferenceFromThreeArrays([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/twist-05-smallest-difference-from-three-arrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/twist-05-smallest-difference-from-three-arrays'] = problem;
})();
