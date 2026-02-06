/**
 * Nested List Weighted Sum II
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Nested List Weighted Sum II',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Given a nested list of integers, return the sum of all integers weighted by their depth. Unlike the regular product sum where deeper elements have higher weight, here the weight is the **inverse** - elements at the maximum depth have weight 1, and the weight increases as you go shallower. In other words, if the maximum depth is maxDepth, an element at depth d has weight (maxDepth - d + 1).',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
                [
                        1,
                        1
                ],
                2,
                [
                        1,
                        1
                ]
        ]
},
        output: 8,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[[1, 1], 2, [1, 1]], the result is 8.'
    }
        ],
        solutions: {
            python: `def nestedListWeightedSumIi(data):
    """
    Nested List Weighted Sum II

    Weight is inverse of depth: deeper elements have less weight.
    Element at depth d has weight (maxDepth - d + 1).

    Approach: First find max depth, then calculate weighted sum.
    Alternative: Use level sum approach - sum all integers at each level,
    then accumulate (deeper levels get added fewer times).

    Time: O(n) where n is total number of elements
    Space: O(n) for recursion/BFS queue
    """
    array = data.get("array", data) if isinstance(data, dict) else data

    # Approach: Use level-order traversal and accumulate sums
    # At each level, add the current level sum to a running total
    # This way, deeper levels get added fewer times

    from collections import deque

    unweighted_sum = 0
    weighted_sum = 0
    queue = deque(array)

    while queue:
        level_size = len(queue)
        level_sum = 0

        for _ in range(level_size):
            element = queue.popleft()
            if isinstance(element, list):
                queue.extend(element)
            else:
                level_sum += element

        unweighted_sum += level_sum
        weighted_sum += unweighted_sum

    return weighted_sum


# Test
if __name__ == "__main__":
    # [[1,1],2,[1,1]] -> depth 2: four 1s (weight 1), depth 1: one 2 (weight 2)
    # = 4*1 + 2*2 = 8
    print(nestedListWeightedSumIi({"array": [[1, 1], 2, [1, 1]]}))  # Output: 8
    print(nestedListWeightedSumIi({"array": [1, [4, [6]]]}))        # Output: 17`,
            go: `package main

import "fmt"

// NestedListWeightedSumIi solves the Nested List Weighted Sum II problem.
// Weight is inverse of depth: deeper elements have less weight.
// Uses level-order traversal with accumulating sums.
// Time: O(n), Space: O(n)
func NestedListWeightedSumIi(data interface{}) interface{} {
    var array []interface{}
    switch v := data.(type) {
    case map[string]interface{}:
        array = v["array"].([]interface{})
    case []interface{}:
        array = v
    }

    unweightedSum := 0
    weightedSum := 0
    queue := make([]interface{}, len(array))
    copy(queue, array)

    for len(queue) > 0 {
        levelSize := len(queue)
        levelSum := 0

        for i := 0; i < levelSize; i++ {
            element := queue[0]
            queue = queue[1:]

            if nested, ok := element.([]interface{}); ok {
                queue = append(queue, nested...)
            } else {
                // Handle both int and float64 (JSON numbers)
                switch num := element.(type) {
                case int:
                    levelSum += num
                case float64:
                    levelSum += int(num)
                }
            }
        }

        unweightedSum += levelSum
        weightedSum += unweightedSum
    }

    return weightedSum
}

func main() {
    // [[1,1],2,[1,1]] -> 8
    arr1 := []interface{}{
        []interface{}{float64(1), float64(1)},
        float64(2),
        []interface{}{float64(1), float64(1)},
    }
    fmt.Println(NestedListWeightedSumIi(map[string]interface{}{"array": arr1})) // Output: 8

    // [1,[4,[6]]] -> 17
    arr2 := []interface{}{float64(1), []interface{}{float64(4), []interface{}{float64(6)}}}
    fmt.Println(NestedListWeightedSumIi(map[string]interface{}{"array": arr2})) // Output: 17
}`
        },
        twists: [
            { id: '02-product-sum/03-nested-list-weighted-sum-ii/twist-01-two-pass-recursive-approach', name: 'Two-Pass Recursive Approach', difficulty: 'Medium' },
            { id: '02-product-sum/03-nested-list-weighted-sum-ii/twist-02-single-pass-recursive-with-math-trick', name: 'Single-Pass Recursive with Math Trick', difficulty: 'Hard' },
            { id: '02-product-sum/03-nested-list-weighted-sum-ii/twist-03-iterative-bfs-vs-dfs-comparison', name: 'Iterative BFS vs DFS Comparison', difficulty: 'Medium' },
            { id: '02-product-sum/03-nested-list-weighted-sum-ii/twist-04-mutual-recursion-approach', name: 'Mutual Recursion Approach', difficulty: 'Hard' },
            { id: '02-product-sum/03-nested-list-weighted-sum-ii/twist-05-output-prediction-with-tricky-nesting', name: 'Output Prediction with Tricky Nesting', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/03-nested-list-weighted-sum-ii', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/03-nested-list-weighted-sum-ii'] = problem;

})();
