/**
 * Four Number Sum
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four Number Sum',
        difficulty: 'Hard',
        algorithm: 'sort-three-sum',
        parent: '07-three-number-sum',
        description: 'Find all unique quadruplets in the array that sum to a target value.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
          "array": [
            7,
            6,
            4,
            -1,
            1,
            2
          ],
          "target": 16
        },
        output: "[[7, 6, 4, -1], [7, 6, 1, 2]]",
        explanation: 'Given the input, the algorithm processes it to produce [[7, 6, 4, -1], [7, 6, 1, 2]]'
    },
    {
        input: {
          "array": [
            1,
            0,
            -1,
            0,
            -2,
            2
          ],
          "target": 0
        },
        output: "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
        explanation: 'Given the input, the algorithm processes it to produce [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]'
    }
        ],
        solutions: {
            python: `def fourNumberSum(array, target):
    """
    Four Number Sum - Find all unique quadruplets that sum to target.

    Time: O(n^3) - Three nested loops with hash table lookup
    Space: O(n^2) - Store pair sums in hash table
    """
    allPairSums = {}
    quadruplets = []

    for i in range(1, len(array) - 1):
        # Look for quadruplets using current element and pair sums seen before
        for j in range(i + 1, len(array)):
            currentSum = array[i] + array[j]
            difference = target - currentSum
            if difference in allPairSums:
                for pair in allPairSums[difference]:
                    quadruplets.append(pair + [array[i], array[j]])

        # Add all pair sums with elements before current index
        for k in range(0, i):
            currentSum = array[i] + array[k]
            if currentSum not in allPairSums:
                allPairSums[currentSum] = []
            allPairSums[currentSum].append([array[k], array[i]])

    return quadruplets


# Test
if __name__ == "__main__":
    print(fourNumberSum([7, 6, 4, -1, 1, 2], 16))
    # Output: [[7, 6, 4, -1], [7, 6, 1, 2]]
    print(fourNumberSum([1, 0, -1, 0, -2, 2], 0))
    # Output: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]`,
            go: `package main

import "fmt"

// FourNumberSum finds all unique quadruplets that sum to target.
// Time: O(n^3), Space: O(n^2)
func FourNumberSum(array []int, target int) [][]int {
    allPairSums := make(map[int][][]int)
    quadruplets := [][]int{}

    for i := 1; i < len(array)-1; i++ {
        // Look for quadruplets using current element and pair sums seen before
        for j := i + 1; j < len(array); j++ {
            currentSum := array[i] + array[j]
            difference := target - currentSum
            if pairs, found := allPairSums[difference]; found {
                for _, pair := range pairs {
                    quad := append([]int{}, pair...)
                    quad = append(quad, array[i], array[j])
                    quadruplets = append(quadruplets, quad)
                }
            }
        }

        // Add all pair sums with elements before current index
        for k := 0; k < i; k++ {
            currentSum := array[i] + array[k]
            allPairSums[currentSum] = append(allPairSums[currentSum],
                []int{array[k], array[i]})
        }
    }

    return quadruplets
}

func main() {
    fmt.Println(FourNumberSum([]int{7, 6, 4, -1, 1, 2}, 16))
    // Output: [[7 6 4 -1] [7 6 1 2]]
    fmt.Println(FourNumberSum([]int{1, 0, -1, 0, -2, 2}, 0))
}`
        },
        twists: [
            { id: '07-three-number-sum/03-four-number-sum/twist-01-four-sum-closest', name: 'Four Sum Closest', difficulty: 'Hard' },
            { id: '07-three-number-sum/03-four-number-sum/twist-02-unique-quadruplet-values', name: 'Unique Quadruplet Values', difficulty: 'Hard' },
            { id: '07-three-number-sum/03-four-number-sum/twist-03-four-sum-below-target', name: 'Four Sum Below Target', difficulty: 'Hard' },
            { id: '07-three-number-sum/03-four-number-sum/twist-04-four-sum-with-constraints', name: 'Four Sum with Constraints', difficulty: 'Very Hard' },
            { id: '07-three-number-sum/03-four-number-sum/twist-05-maximum-product-quadruplet', name: 'Maximum Product Quadruplet', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 07-three-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/03-four-number-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/03-four-number-sum'] = problem;

})();
