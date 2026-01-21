/**
 * Four Sum With Repetition
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four Sum With Repetition',
        difficulty: 'Hard',
        algorithm: 'general',
        parent: '17-four-number-sum',
        description: 'Given an array and a target sum, find all quadruplets where the same element can be used multiple times (with different indices treated as same).',
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
        "raw": "array = [1, 2], targetSum = 6"
},
        output: "[[1, 1, 2, 2]]\nExplanation: Using 1 twice and 2 twice",
        explanation: 'Given the input, the algorithm processes it to produce [[1, 1, 2, 2]]\nExplanation: Using 1 twice and 2 twice'
    },
    {
        input: {
        "raw": "array = [2, 3], targetSum = 10"
},
        output: "[[2, 2, 3, 3]]",
        explanation: 'Given the input, the algorithm processes it to produce [[2, 2, 3, 3]]'
    }
        ],
        solutions: {
            python: `def fourSumWithRepetition(array, targetSum):
    """
    Four Sum With Repetition

    Find all quadruplets where the same element can be used
    multiple times. Elements with same value are treated as same.

    Time: O(n^2)
    Space: O(n^2)
    """
    array = sorted(set(array))  # Remove duplicates and sort
    n = len(array)
    result = []

    # Use hash map to store pair sums
    pair_sums = {}

    # Generate all pairs (with repetition allowed)
    for i in range(n):
        for j in range(i, n):
            pair_sum = array[i] + array[j]
            if pair_sum not in pair_sums:
                pair_sums[pair_sum] = []
            pair_sums[pair_sum].append((array[i], array[j]))

    # Find complementary pairs
    seen = set()
    for pair_sum, pairs in pair_sums.items():
        complement = targetSum - pair_sum
        if complement in pair_sums:
            for p1 in pairs:
                for p2 in pair_sums[complement]:
                    # Create sorted quadruplet to avoid duplicates
                    quad = tuple(sorted([p1[0], p1[1], p2[0], p2[1]]))
                    if quad not in seen:
                        seen.add(quad)
                        result.append(list(quad))

    return sorted(result)


# Test
if __name__ == "__main__":
    print(fourSumWithRepetition([1, 2], 6))  # [[1, 1, 2, 2]]
    print(fourSumWithRepetition([2, 3], 10))  # [[2, 2, 3, 3]]`,
            go: `package main

import (
    "fmt"
    "sort"
)

// FourSumWithRepetition finds quadruplets with repetition allowed.
// Time: O(n^2), Space: O(n^2)
func FourSumWithRepetition(array []int, targetSum int) [][]int {
    // Remove duplicates and sort
    unique := make(map[int]bool)
    for _, v := range array {
        unique[v] = true
    }
    nums := []int{}
    for v := range unique {
        nums = append(nums, v)
    }
    sort.Ints(nums)
    n := len(nums)

    // Store pair sums
    type pair struct{ a, b int }
    pairSums := make(map[int][]pair)

    for i := 0; i < n; i++ {
        for j := i; j < n; j++ {
            sum := nums[i] + nums[j]
            pairSums[sum] = append(pairSums[sum], pair{nums[i], nums[j]})
        }
    }

    // Find complementary pairs
    seen := make(map[[4]int]bool)
    result := [][]int{}

    for pairSum, pairs := range pairSums {
        complement := targetSum - pairSum
        if compPairs, ok := pairSums[complement]; ok {
            for _, p1 := range pairs {
                for _, p2 := range compPairs {
                    quad := []int{p1.a, p1.b, p2.a, p2.b}
                    sort.Ints(quad)
                    key := [4]int{quad[0], quad[1], quad[2], quad[3]}
                    if !seen[key] {
                        seen[key] = true
                        result = append(result, quad)
                    }
                }
            }
        }
    }

    return result
}

func main() {
    fmt.Println(FourSumWithRepetition([]int{1, 2}, 6))  // [[1, 1, 2, 2]]
    fmt.Println(FourSumWithRepetition([]int{2, 3}, 10))  // [[2, 2, 3, 3]]
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 17-four-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '17-four-number-sum/02-four-sum-with-repetition', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/17-four-number-sum/02-four-sum-with-repetition'] = problem;

})();
