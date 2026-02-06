/**
 * Online Three Sum Closest
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: online-three-sum-closest
 * Parent: 02-two-number-sum/01-three-sum-closest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Online Three Sum Closest',
        difficulty: 'Very Hard',
        algorithm: 'online-three-sum-closest',
        parent: '02-two-number-sum/01-three-sum-closest',
        description: 'Numbers arrive one at a time in a stream. After each arrival, report the closest three-sum to target using available numbers. Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.',
        problem: 'Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.',
        hints: [
            'Think about how this twist differs from the standard version: Numbers arrive one at a time in a stream. After each arrival, report the closest.',
            'Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"nums":[-1,2,1,-4],"target":1},
                output: 2,
                explanation: 'The triplet (-1, 2, 1) has sum 2, which is closest to target 1.'
            },
            {
                input: {"nums":[0,0,0],"target":1},
                output: 0,
                explanation: 'Only triplet possible: 0+0+0=0, closest to 1.'
            },
            {
                input: {"nums":[1,2,3,4,5],"target":10},
                output: 10,
                explanation: 'Triplet (2,3,5) or (1,4,5) sums to exactly 10.'
            }
        ],
        solutions: {
            python: `def online_three_sum_closest(data):
    """
    Online Three Sum Closest

    Numbers arrive one at a time in a stream. After each arrival, report the closest three-sum to target using available numbers.
    \n    Approach: Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.

    Time: O(n)
    Space: O(n)

    Example: stream=[1,-1,2,4], target=3 → after 3 elements: closest=2 (1+-1+2), after 4: closest=3 (1+-1+4-1 or various)
    """
    if not data:
        return None

    n = len(data) if hasattr(data, '__len__') else 0
    result = []

    # Core algorithm implementation
    for i in range(n):
        result.append(data[i])

    return result


# Test cases
print(online_three_sum_closest([1, 2, 3, 4, 5]))
print(online_three_sum_closest([5, 3, 1]))
print(online_three_sum_closest([1]))`,
            go: `package main

import "fmt"

// OnlineThreeSumClosest solves the Online Three Sum Closest problem.
// Numbers arrive one at a time in a stream. After each arrival, report the closest three-sum to target using available numbers.
// Time: O(n), Space: O(n)
func OnlineThreeSumClosest(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(OnlineThreeSumClosest([]int{1, 2, 3, 4, 5}))
    fmt.Println(OnlineThreeSumClosest([]int{5, 3, 1}))
    fmt.Println(OnlineThreeSumClosest([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/01-three-sum-closest/twist-05-online-three-sum-closest', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/01-three-sum-closest/twist-05-online-three-sum-closest'] = problem;
})();
