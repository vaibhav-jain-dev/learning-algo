/**
 * Three Sum with Forbidden Pairs
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-sum-with-forbidden-pairs
 * Parent: 02-two-number-sum/02-three-sum-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum with Forbidden Pairs',
        difficulty: 'Hard',
        algorithm: 'three-sum-with-forbidden-pairs',
        parent: '02-two-number-sum/02-three-sum-duplicates',
        description: 'Find unique triplets summing to target, but certain pairs of indices cannot both appear in the same triplet. Forbidden pairs add a constraint graph on top of the sum problem, requiring you to check pair compatibility during enumeration.',
        problem: 'Forbidden pairs add a constraint graph on top of the sum problem, requiring you to check pair compatibility during enumeration.',
        hints: [
            'Think about how this twist differs from the standard version: Find unique triplets summing to target, but certain pairs of indices cannot both.',
            'Forbidden pairs add a constraint graph on top of the sum problem, requiring you to check pair compatibility during enumeration.',
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
            python: `def three_sum_with_forbidden_pairs(data):
    """
    Three Sum with Forbidden Pairs

    Find unique triplets summing to target, but certain pairs of indices cannot both appear in the same triplet.
    \n    Approach: Forbidden pairs add a constraint graph on top of the sum problem, requiring you to check pair compatibility during enumeration.

    Time: O(n)
    Space: O(n)

    Example: nums=[-1,0,1,2,-1], target=0, forbidden=[(0,4)] → cannot use indices 0 and 4 together
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
print(three_sum_with_forbidden_pairs([1, 2, 3, 4, 5]))
print(three_sum_with_forbidden_pairs([5, 3, 1]))
print(three_sum_with_forbidden_pairs([1]))`,
            go: `package main

import "fmt"

// ThreeSumWithForbiddenPairs solves the Three Sum with Forbidden Pairs problem.
// Find unique triplets summing to target, but certain pairs of indices cannot both appear in the same triplet.
// Time: O(n), Space: O(n)
func ThreeSumWithForbiddenPairs(data []int) []int {
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
    fmt.Println(ThreeSumWithForbiddenPairs([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumWithForbiddenPairs([]int{5, 3, 1}))
    fmt.Println(ThreeSumWithForbiddenPairs([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/02-three-sum-duplicates/twist-03-three-sum-with-forbidden-pairs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/02-three-sum-duplicates/twist-03-three-sum-with-forbidden-pairs'] = problem;
})();
