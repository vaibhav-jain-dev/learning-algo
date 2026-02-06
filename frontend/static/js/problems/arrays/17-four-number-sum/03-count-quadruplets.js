/**
 * Count Quadruplets
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Quadruplets',
        difficulty: 'Hard',
        algorithm: 'sort-three-sum',
        parent: '17-four-number-sum',
        description: 'Count the number of quadruplets (i, j, k, l) where i < j < k < l and array[i] + array[j] + array[k] + array[l] = target. Elements with same values but different indices are counted separately.',
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
            1,
            1,
            1,
            1,
            2,
            2
          ],
          "target": 5
        },
        output: "12\nExplanation: Multiple combinations of indices give sum 5",
        explanation: 'Given the input, the algorithm processes it to produce 12\nExplanation: Multiple combinations of indices give sum 5'
    },
    {
        input: {
          "array": [
            1,
            2,
            3,
            4
          ],
          "target": 10
        },
        output: "1\nExplanation: Only (1, 2, 3, 4) = 10",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Only (1, 2, 3, 4) = 10'
    }
        ],
        solutions: {
            python: `def countQuadruplets(array, target):
    """
    Count Quadruplets

    Count quadruplets (i, j, k, l) where i < j < k < l
    and array[i] + array[j] + array[k] + array[l] = target.
    Different indices with same values count separately.

    Time: O(n^2)
    Space: O(n^2)
    """
    n = len(array)
    count = 0

    # Map to store count of pair sums with their ending indices
    # For each position k, we count pairs (i,j) where i < j < k
    pair_count = {}

    for j in range(n):
        # For each k > j, check if complement exists
        for k in range(j + 1, n):
            complement = target - array[j] - array[k]
            if complement in pair_count:
                count += pair_count[complement]

        # Add pairs ending at j to pair_count for future use
        for i in range(j):
            pair_sum = array[i] + array[j]
            pair_count[pair_sum] = pair_count.get(pair_sum, 0) + 1

    return count


# Test
if __name__ == "__main__":
    print(countQuadruplets([1, 1, 1, 1, 2, 2], 5))  # 12
    print(countQuadruplets([1, 2, 3, 4], 10))  # 1`,
            go: `package main

import "fmt"

// CountQuadruplets counts quadruplets that sum to target.
// Time: O(n^2), Space: O(n^2)
func CountQuadruplets(array []int, target int) int {
    n := len(array)
    count := 0

    // Map to store count of pair sums
    pairCount := make(map[int]int)

    for j := 0; j < n; j++ {
        // For each k > j, check if complement exists
        for k := j + 1; k < n; k++ {
            complement := target - array[j] - array[k]
            if c, ok := pairCount[complement]; ok {
                count += c
            }
        }

        // Add pairs ending at j to pairCount for future use
        for i := 0; i < j; i++ {
            pairSum := array[i] + array[j]
            pairCount[pairSum]++
        }
    }

    return count
}

func main() {
    fmt.Println(CountQuadruplets([]int{1, 1, 1, 1, 2, 2}, 5))  // 12
    fmt.Println(CountQuadruplets([]int{1, 2, 3, 4}, 10))  // 1
}`
        },
        twists: [
            { title: 'Count Triplets', difficulty: 'Medium', description: 'Count ordered triplets (i, j, k) where i < j < k and array[i] + array[j] + array[k] = target.', whyDifferent: 'Reduces from four to three elements, simplifying the pair-sum hash approach but still requiring index ordering.', example: 'array = [1, 1, 1, 2, 2], target = 4. Count ordered triplets summing to 4.' },
            { title: 'Count Quadruplets Below Target', difficulty: 'Hard', description: 'Count ordered quadruplets (i < j < k < l) where the sum is strictly less than the target.', whyDifferent: 'Inequality instead of equality changes the counting logic: must sum ranges of valid complements rather than exact matches.', example: 'array = [1, 2, 3, 4], target = 11. All quads sum to 10 < 11. Count = 1.' },
            { title: 'Count Quadruplets with Product', difficulty: 'Very Hard', description: 'Count ordered quadruplets where array[i] * array[j] * array[k] * array[l] = target (product instead of sum).', whyDifferent: 'Product-based counting requires factorization thinking. Hash maps store pair products, and lookup seeks quotient pairs.', example: 'array = [1, 2, 3, 6], target = 36. 1*2*3*6 = 36. Count = 1.' },
            { title: 'Count Disjoint Quadruplet Pairs', difficulty: 'Very Hard', description: 'Count pairs of quadruplets where no index is shared between the two quadruplets, both summing to the target.', whyDifferent: 'Must find two independent quadruplets, adding a combinatorial constraint on top of the counting problem.', example: 'array = [1,1,1,1,1,1,1,1], target = 4. Many quadruplets. Count pairs with no shared indices.' },
            { title: 'Quadruplet Closest Count', difficulty: 'Hard', description: 'Count how many ordered quadruplets have a sum closest to the target. First find the closest sum, then count quadruplets achieving it.', whyDifferent: 'Two-phase approach: first find the closest achievable sum, then count how many quadruplets achieve exactly that sum.', example: 'array = [1, 2, 3, 4, 5], target = 20. Closest sum = 14 (2+3+4+5). Count quads summing to 14.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 17-four-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '17-four-number-sum/03-count-quadruplets', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/17-four-number-sum/03-count-quadruplets'] = problem;

})();
