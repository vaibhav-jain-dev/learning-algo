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
            {
                title: 'Two-Pass Recursive Approach',
                difficulty: 'Medium',
                description: 'Solve using two separate recursive passes: first find the maximum depth, then compute the weighted sum using (maxDepth - currentDepth + 1) as the weight.',
                whyDifferent: 'The BFS level-accumulation trick avoids needing to know max depth upfront. The two-pass approach requires a fundamentally different strategy: decomposing the problem into two independent recursive traversals.',
                example: 'For [[1,1],2,[1,1]]: Pass 1 finds maxDepth=2. Pass 2 computes: depth 1 integers (the 2) get weight 2, depth 2 integers (the four 1s) get weight 1. Total = 2*2 + 4*1 = 8.'
            },
            {
                title: 'Single-Pass Recursive with Math Trick',
                difficulty: 'Hard',
                description: 'Compute the inverse-weighted sum in a single recursive pass without knowing max depth in advance. Hint: the inverse-weighted sum equals (maxDepth+1)*unweightedSum - normalWeightedSum.',
                whyDifferent: 'Requires algebraic insight: instead of computing inverse weights directly, you compute the normal weighted sum and unweighted sum simultaneously, then derive the answer mathematically.',
                example: 'For [[1,1],2,[1,1]]: normalWeightedSum (deeper=heavier) = 1*2+1*2+2*1+1*2+1*2=10. unweightedSum=6. maxDepth=2. Inverse = (2+1)*6 - 10 = 18-10 = 8.'
            },
            {
                title: 'Iterative BFS vs DFS Comparison',
                difficulty: 'Medium',
                description: 'Implement both a BFS (queue-based, level-order) and a DFS (stack-based) iterative solution. Explain why BFS is more natural for this problem.',
                whyDifferent: 'BFS naturally processes all elements at each depth level together, making the accumulation trick straightforward. DFS processes elements depth-first, requiring you to track depth per element, which is less elegant for this problem.',
                example: 'BFS for [[1,1],2,[1,1]]: Level 1 has [2], sum=2. Level 2 has [1,1,1,1], sum=4. Running total: after L1=2, after L2=2+6=8. DFS would need to tag each value with its depth.'
            },
            {
                title: 'Mutual Recursion Approach',
                difficulty: 'Hard',
                description: 'Solve using two mutually recursive functions: one that processes a list at a given depth, and another that processes a single element. The list function calls the element function, which may call the list function for nested lists.',
                whyDifferent: 'Mutual recursion splits the logic into cooperating functions. While not the most efficient approach, it demonstrates an alternative recursion pattern where control alternates between two functions.',
                example: 'processList(arr, depth) iterates arr, calling processElement(el, depth) for each. processElement checks: if integer, return value; if list, return processList(el, depth+1).'
            },
            {
                title: 'Output Prediction with Tricky Nesting',
                difficulty: 'Medium',
                description: 'Without running code, compute the inverse-weighted sum of [1, [2, [3]], [4, [5, [6]]]]. Be careful with varying depths in different branches.',
                whyDifferent: 'Tests your ability to mentally trace the algorithm with asymmetric nesting. Different branches have different depths, so the max depth affects all weights globally. You must find the global max depth first.',
                example: 'Max depth = 4 (path to 6). Weights: depth 1 (items: 1) weight=4, depth 2 (items: 2,4) weight=3, depth 3 (items: 3,5) weight=2, depth 4 (items: 6) weight=1. Sum = 1*4+2*3+4*3+3*2+5*2+6*1 = 4+6+12+6+10+6 = 44.'
            }
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
