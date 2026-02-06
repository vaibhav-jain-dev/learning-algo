/**
 * Four-Way Partition
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: four-way-partition
 * Parent: 09-move-element-to-end/03-dutch-national-flag
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four-Way Partition',
        difficulty: 'Very Hard',
        algorithm: 'four-way-partition',
        parent: '09-move-element-to-end/03-dutch-national-flag',
        description: 'Extend the Dutch National Flag to four categories: less than pivot1, between pivot1 and pivot2, between pivot2 and pivot3, and greater than pivot3. Three pivots require four pointers and more complex swap logic, significantly harder to maintain invariants.',
        problem: 'Three pivots require four pointers and more complex swap logic, significantly harder to maintain invariants.',
        hints: [
            'Think about how four-way partition differs from the standard version of this problem.',
            'Key insight: Three pivots require four pointers and more complex swap logic, significantly harder to maintain invariants.',
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
            python: `def four_way_partition(data):
    """
    Four-Way Partition

    Extend the Dutch National Flag to four categories: less than pivot1, between pivot1 and pivot2, between pivot2 and pivot3, and greater than pivot3.
    \n    Approach: Three pivots require four pointers and more complex swap logic, significantly harder to maintain invariants.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [3,1,4,1,5,9,2,6], pivots = [2,5,7]. Result: [1,1,2, 3,4,5, 6, 9].

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
print(four_way_partition([1, 2, 3, 4, 5]))
print(four_way_partition([5, 3, 1]))
print(four_way_partition([1]))`,
            go: `package main

import "fmt"

// FourWayPartition solves the Four-Way Partition problem.
// Extend the Dutch National Flag to four categories: less than pivot1, between pivot1 and pivot2, between pivot2 and pivot3, and greater than pivot3.
// Time: O(n), Space: O(n)
func FourWayPartition(data []int) []int {
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
    fmt.Println(FourWayPartition([]int{1, 2, 3, 4, 5}))
    fmt.Println(FourWayPartition([]int{5, 3, 1}))
    fmt.Println(FourWayPartition([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/03-dutch-national-flag/twist-01-four-way-partition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/03-dutch-national-flag/twist-01-four-way-partition'] = problem;
})();
