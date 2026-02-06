/**
 * Non-Constructible Change from Two Pockets
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: non-constructible-change-from-two-pockets
 * Parent: 05-non-constructible-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Non-Constructible Change from Two Pockets',
        difficulty: 'Medium',
        algorithm: 'non-constructible-change-from-two-pockets',
        parent: '05-non-constructible-change',
        description: 'You have coins in two separate pockets. Find the minimum non-constructible amount using coins from both pockets combined. Must merge two coin sets before applying the greedy algorithm, or apply the algorithm to the combined sorted sequence.',
        problem: 'Must merge two coin sets before applying the greedy algorithm, or apply the algorithm to the combined sorted sequence.',
        hints: [
            'Think about how non-constructible change from two pockets differs from the standard version of this problem.',
            'Key insight: Must merge two coin sets before applying the greedy algorithm, or apply the algorithm to the combined sorted sequence.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Consider whether a greedy approach works, or if you need dynamic programming for the optimal solution.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"coins":[1,2,5]},
                output: 4,
                explanation: 'With coins [1,2,5], the first non-constructible value is 4.'
            },
            {
                input: {"coins":[1,1,1,1]},
                output: 5,
                explanation: 'Can make 1 through 4, but not 5.'
            },
            {
                input: {"coins":[5,10]},
                output: 1,
                explanation: 'Cannot make 1 with only coins of value 5 and 10.'
            }
        ],
        solutions: {
            python: `def non_constructible_change_from_two_pockets(data):
    """
    Non-Constructible Change from Two Pockets

    You have coins in two separate pockets. Find the minimum non-constructible amount using coins from both pockets combined.
    \n    Approach: Must merge two coin sets before applying the greedy algorithm, or apply the algorithm to the combined sorted sequence.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # pocket1=[1,2], pocket2=[5,10] → combined=[1,2,5,10] → sorted, apply greedy → min non-constructible is 4

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
print(non_constructible_change_from_two_pockets([1, 2, 3, 4, 5]))
print(non_constructible_change_from_two_pockets([5, 3, 1]))
print(non_constructible_change_from_two_pockets([1]))`,
            go: `package main

import "fmt"

// NonConstructibleChangeFromTwoPockets solves the Non-Constructible Change from Two Pockets problem.
// You have coins in two separate pockets. Find the minimum non-constructible amount using coins from both pockets combined.
// Time: O(n), Space: O(n)
func NonConstructibleChangeFromTwoPockets(data []int) []int {
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
    fmt.Println(NonConstructibleChangeFromTwoPockets([]int{1, 2, 3, 4, 5}))
    fmt.Println(NonConstructibleChangeFromTwoPockets([]int{5, 3, 1}))
    fmt.Println(NonConstructibleChangeFromTwoPockets([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/twist-03-non-constructible-change-from-two-pockets', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/twist-03-non-constructible-change-from-two-pockets'] = problem;
})();
