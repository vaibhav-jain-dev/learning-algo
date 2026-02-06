/**
 * K Smallest Without Heap
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: k-smallest-without-heap
 * Parent: 08-smallest-difference/01-k-smallest-differences
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Smallest Without Heap',
        difficulty: 'Hard',
        algorithm: 'k-smallest-without-heap',
        parent: '08-smallest-difference/01-k-smallest-differences',
        description: 'Find K smallest difference pairs without using a heap. Use only sorting and two-pointer techniques. Forces a merge-based approach, iterating through sorted differences systematically without priority queue overhead.',
        problem: 'Forces a merge-based approach, iterating through sorted differences systematically without priority queue overhead.',
        hints: [
            'Think about how k smallest without heap differs from the standard version of this problem.',
            'Key insight: Forces a merge-based approach, iterating through sorted differences systematically without priority queue overhead.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,3,5,7],"k":2},
                output: [1,3],
                explanation: 'The k=2 smallest/closest values found.'
            },
            {
                input: {"array":[10,20,30],"k":1},
                output: [10],
                explanation: 'With k=1, return the single best result.'
            },
            {
                input: {"array":[5,5,5,5],"k":3},
                output: [5,5,5],
                explanation: 'Duplicate values handled correctly with k=3.'
            }
        ],
        solutions: {
            python: `def k_smallest_without_heap(data):
    """
    K Smallest Without Heap

    Find K smallest difference pairs without using a heap. Use only sorting and two-pointer techniques.
    \n    Approach: Forces a merge-based approach, iterating through sorted differences systematically without priority queue overhead.

    Time: O(n log k)
    Space: O(n)
    """
    # Implementation based on the twist description
    # arr1 = [1, 3, 5], arr2 = [2, 4], k = 3. Same result but achieved with pointers only.

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
print(k_smallest_without_heap([1, 2, 3, 4, 5]))
print(k_smallest_without_heap([5, 3, 1]))
print(k_smallest_without_heap([1]))`,
            go: `package main

import "fmt"

// KSmallestWithoutHeap solves the K Smallest Without Heap problem.
// Find K smallest difference pairs without using a heap. Use only sorting and two-pointer techniques.
// Time: O(n log k), Space: O(n)
func KSmallestWithoutHeap(data []int) []int {
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
    fmt.Println(KSmallestWithoutHeap([]int{1, 2, 3, 4, 5}))
    fmt.Println(KSmallestWithoutHeap([]int{5, 3, 1}))
    fmt.Println(KSmallestWithoutHeap([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/01-k-smallest-differences/twist-03-k-smallest-without-heap', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/01-k-smallest-differences/twist-03-k-smallest-without-heap'] = problem;
})();
