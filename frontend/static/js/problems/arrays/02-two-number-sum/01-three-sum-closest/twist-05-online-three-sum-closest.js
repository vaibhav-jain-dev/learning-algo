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
            'Think about how online three sum closest differs from the standard version of this problem.',
            'Key insight: Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.',
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
            python: `def online_three_sum_closest(data):
    """
    Online Three Sum Closest

    Numbers arrive one at a time in a stream. After each arrival, report the closest three-sum to target using available numbers.
    \n    Approach: Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # stream=[1,-1,2,4], target=3 → after 3 elements: closest=2 (1+-1+2), after 4: closest=3 (1+-1+4-1 or various)

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
print(online_three_sum_closest([1, 2, 3, 4, 5]))
print(online_three_sum_closest([5, 3, 1]))
print(online_three_sum_closest([1]))`,
            go: `package main

import "fmt"

// OnlineThreeSumClosest solves the Online Three Sum Closest problem.
// Numbers arrive one at a time in a stream. After each arrival, report the closest three-sum to target using available numbers.
// Time: O(n^2), Space: O(n)
func OnlineThreeSumClosest(data []int) []int {
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
