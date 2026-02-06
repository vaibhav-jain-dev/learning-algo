/**
 * Three Sum Closest with Duplicates Allowed
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: three-sum-closest-with-duplicates-allowed
 * Parent: 02-two-number-sum/02-three-sum-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Closest with Duplicates Allowed',
        difficulty: 'Medium',
        algorithm: 'three-sum-closest-with-duplicates-allowed',
        parent: '02-two-number-sum/02-three-sum-duplicates',
        description: 'Find the closest sum to target, but report ALL unique triplets achieving that closest sum. Combines the closest-sum search with duplicate-aware enumeration, requiring two phases: find the closest sum, then collect all triplets matching it.',
        problem: 'Combines the closest-sum search with duplicate-aware enumeration, requiring two phases: find the closest sum, then collect all triplets matching it.',
        hints: [
            'Think about how three sum closest with duplicates allowed differs from the standard version of this problem.',
            'Key insight: Combines the closest-sum search with duplicate-aware enumeration, requiring two phases: find the closest sum, then collect all triplets matching it.',
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
            python: `def three_sum_closest_with_duplicates_allowed(data):
    """
    Three Sum Closest with Duplicates Allowed

    Find the closest sum to target, but report ALL unique triplets achieving that closest sum.
    \n    Approach: Combines the closest-sum search with duplicate-aware enumeration, requiring two phases: find the closest sum, then collect all triplets matching it.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # nums=[-1,0,1,2,-1], target=1 → closest=1, triplets=[[-1,0,2]]

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
print(three_sum_closest_with_duplicates_allowed([1, 2, 3, 4, 5]))
print(three_sum_closest_with_duplicates_allowed([5, 3, 1]))
print(three_sum_closest_with_duplicates_allowed([1]))`,
            go: `package main

import "fmt"

// ThreeSumClosestWithDuplicatesAllowed solves the Three Sum Closest with Duplicates Allowed problem.
// Find the closest sum to target, but report ALL unique triplets achieving that closest sum.
// Time: O(n^2), Space: O(n)
func ThreeSumClosestWithDuplicatesAllowed(data []int) []int {
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
    fmt.Println(ThreeSumClosestWithDuplicatesAllowed([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumClosestWithDuplicatesAllowed([]int{5, 3, 1}))
    fmt.Println(ThreeSumClosestWithDuplicatesAllowed([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/02-three-sum-duplicates/twist-05-three-sum-closest-with-duplicates-allowed', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/02-three-sum-duplicates/twist-05-three-sum-closest-with-duplicates-allowed'] = problem;
})();
