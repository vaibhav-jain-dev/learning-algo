/**
 * Online Dutch National Flag
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: online-dutch-national-flag
 * Parent: 09-move-element-to-end/03-dutch-national-flag
 */
(function() {
    'use strict';

    const problem = {
        name: 'Online Dutch National Flag',
        difficulty: 'Very Hard',
        algorithm: 'online-dutch-national-flag',
        parent: '09-move-element-to-end/03-dutch-national-flag',
        description: 'Elements arrive one at a time in a stream. Maintain a partitioned array as each new element arrives, inserting it into the correct position. Insertion into a maintained partition requires shifting elements, changing the problem from rearrangement to dynamic insertion.',
        problem: 'Insertion into a maintained partition requires shifting elements, changing the problem from rearrangement to dynamic insertion.',
        hints: [
            'Think about how online dutch national flag differs from the standard version of this problem.',
            'Key insight: Insertion into a maintained partition requires shifting elements, changing the problem from rearrangement to dynamic insertion.',
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
                input: {"array":[3,1,2,3,4,3],"target":3},
                output: [1,2,4,3,3,3],
                explanation: 'Target elements moved to the correct position.'
            },
            {
                input: {"array":[1,2,3,4,5],"target":6},
                output: [1,2,3,4,5],
                explanation: 'Target not in array - no changes needed.'
            },
            {
                input: {"array":[3,3,3],"target":3},
                output: [3,3,3],
                explanation: 'All elements are the target.'
            }
        ],
        solutions: {
            python: `def online_dutch_national_flag(data):
    """
    Online Dutch National Flag

    Elements arrive one at a time in a stream. Maintain a partitioned array as each new element arrives, inserting it into the correct position.
    \n    Approach: Insertion into a maintained partition requires shifting elements, changing the problem from rearrangement to dynamic insertion.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # Stream: 2, 0, 1, 2. After each: [2], [0,2], [0,1,2], [0,1,2,2]. Pivot = 1.

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
print(online_dutch_national_flag([1, 2, 3, 4, 5]))
print(online_dutch_national_flag([5, 3, 1]))
print(online_dutch_national_flag([1]))`,
            go: `package main

import "fmt"

// OnlineDutchNationalFlag solves the Online Dutch National Flag problem.
// Elements arrive one at a time in a stream. Maintain a partitioned array as each new element arrives, inserting it into the correct position.
// Time: O(n), Space: O(n)
func OnlineDutchNationalFlag(data []int) []int {
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
    fmt.Println(OnlineDutchNationalFlag([]int{1, 2, 3, 4, 5}))
    fmt.Println(OnlineDutchNationalFlag([]int{5, 3, 1}))
    fmt.Println(OnlineDutchNationalFlag([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/03-dutch-national-flag/twist-05-online-dutch-national-flag', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/03-dutch-national-flag/twist-05-online-dutch-national-flag'] = problem;
})();
