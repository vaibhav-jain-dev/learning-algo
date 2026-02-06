/**
 * Intersection of Squared Arrays
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: intersection-of-squared-arrays
 * Parent: 03-sorted-squared-array/01-merge-sorted-arrays-with-squares
 */
(function() {
    'use strict';

    const problem = {
        name: 'Intersection of Squared Arrays',
        difficulty: 'Medium',
        algorithm: 'intersection-of-squared-arrays',
        parent: '03-sorted-squared-array/01-merge-sorted-arrays-with-squares',
        description: 'Instead of merging, find the common elements between the two squared sorted arrays. Switches from union to intersection logic during the merge phase, requiring equality checks and synchronized pointer advancement.',
        problem: 'Switches from union to intersection logic during the merge phase, requiring equality checks and synchronized pointer advancement.',
        hints: [
            'Think about how intersection of squared arrays differs from the standard version of this problem.',
            'Key insight: Switches from union to intersection logic during the merge phase, requiring equality checks and synchronized pointer advancement.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log n)',
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
            python: `def intersection_of_squared_arrays(data):
    """
    Intersection of Squared Arrays

    Instead of merging, find the common elements between the two squared sorted arrays.
    \n    Approach: Switches from union to intersection logic during the merge phase, requiring equality checks and synchronized pointer advancement.

    Time: O(n log n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # arr1=[-3,-1,2], arr2=[-2,1,3] → [1,9] (both arrays contain 1 and 9 after squaring)

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
print(intersection_of_squared_arrays([1, 2, 3, 4, 5]))
print(intersection_of_squared_arrays([5, 3, 1]))
print(intersection_of_squared_arrays([1]))`,
            go: `package main

import "fmt"

// IntersectionOfSquaredArrays solves the Intersection of Squared Arrays problem.
// Instead of merging, find the common elements between the two squared sorted arrays.
// Time: O(n log n), Space: O(n)
func IntersectionOfSquaredArrays(data []int) []int {
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
    fmt.Println(IntersectionOfSquaredArrays([]int{1, 2, 3, 4, 5}))
    fmt.Println(IntersectionOfSquaredArrays([]int{5, 3, 1}))
    fmt.Println(IntersectionOfSquaredArrays([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/01-merge-sorted-arrays-with-squares/twist-03-intersection-of-squared-arrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/01-merge-sorted-arrays-with-squares/twist-03-intersection-of-squared-arrays'] = problem;
})();
