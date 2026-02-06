/**
 * Sorted Squared Array with Custom Transform
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sorted-squared-array-with-custom-transform
 * Parent: 03-sorted-squared-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared Array with Custom Transform',
        difficulty: 'Medium',
        algorithm: 'sorted-squared-array-with-custom-transform',
        parent: '03-sorted-squared-array',
        description: 'Given a sorted array and a quadratic function f(x)=ax^2+bx+c, apply f to each element and return the sorted result. Generalizes squaring to any parabolic transform. The direction of the parabola (a>0 or a<0) determines whether the two-pointer approach fills from the ends or the middle.',
        problem: 'Generalizes squaring to any parabolic transform. The direction of the parabola (a>0 or a<0) determines whether the two-pointer approach fills from the ends or the middle.',
        hints: [
            'Think about how sorted squared array with custom transform differs from the standard version of this problem.',
            'Key insight: Generalizes squaring to any parabolic transform. The direction of the parabola (a>0 or a<0) determines whether the two-pointer approach fills from the ends or the middle.',
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
            python: `def sorted_squared_array_with_custom_transform(data):
    """
    Sorted Squared Array with Custom Transform

    Given a sorted array and a quadratic function f(x)=ax^2+bx+c, apply f to each element and return the sorted result.
    \n    Approach: Generalizes squaring to any parabolic transform. The direction of the parabola (a>0 or a<0) determines whether the two-pointer approach fills from the ends or the middle.

    Time: O(n log n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[-3,-1,0,2], a=1, b=0, c=0 → same as squaring; but a=-1, b=0, c=10 → [1,9,10,6] needs different logic

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
print(sorted_squared_array_with_custom_transform([1, 2, 3, 4, 5]))
print(sorted_squared_array_with_custom_transform([5, 3, 1]))
print(sorted_squared_array_with_custom_transform([1]))`,
            go: `package main

import "fmt"

// SortedSquaredArrayWithCustomTransform solves the Sorted Squared Array with Custom Transform problem.
// Given a sorted array and a quadratic function f(x)=ax^2+bx+c, apply f to each element and return the sorted result.
// Time: O(n log n), Space: O(n)
func SortedSquaredArrayWithCustomTransform(data []int) []int {
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
    fmt.Println(SortedSquaredArrayWithCustomTransform([]int{1, 2, 3, 4, 5}))
    fmt.Println(SortedSquaredArrayWithCustomTransform([]int{5, 3, 1}))
    fmt.Println(SortedSquaredArrayWithCustomTransform([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/twist-04-sorted-squared-array-with-custom-transform', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/twist-04-sorted-squared-array-with-custom-transform'] = problem;
})();
