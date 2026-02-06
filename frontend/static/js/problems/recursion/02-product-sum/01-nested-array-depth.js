/**
 * Maximum Depth of Nested Arrays
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Depth of Nested Arrays',
        difficulty: 'Easy',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Given a nested array (which can contain integers or other nested arrays), return the maximum depth of nesting. The depth of a non-nested array is 1. An empty array has depth 1.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(d)'
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
                [
                        2,
                        [
                                3,
                                4
                        ]
                ]
        ]
},
        output: 3,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[1, [2, [3, 4]]], the result is 3.'
    }
        ],
        solutions: {
            python: `def maximumDepthOfNestedArrays(data):
    """
    Maximum Depth of Nested Arrays

    Recursively find the maximum nesting depth of an array.
    Base case: non-list element has depth 0 (doesn't add to nesting)
    Recursive case: depth = 1 + max depth of any nested array

    Time: O(n) where n is total number of elements
    Space: O(d) where d is maximum depth (recursion stack)
    """
    array = data.get("array", data) if isinstance(data, dict) else data

    def get_depth(arr):
        if not isinstance(arr, list):
            return 0

        if len(arr) == 0:
            return 1

        max_child_depth = 0
        for element in arr:
            if isinstance(element, list):
                max_child_depth = max(max_child_depth, get_depth(element))

        return 1 + max_child_depth

    return get_depth(array)


# Test
if __name__ == "__main__":
    print(maximumDepthOfNestedArrays({"array": [1, [2, [3, 4]]]}))  # Output: 3
    print(maximumDepthOfNestedArrays({"array": [1, 2, 3]}))         # Output: 1
    print(maximumDepthOfNestedArrays({"array": [[[[1]]]]}))         # Output: 4`,
            go: `package main

import "fmt"

// MaximumDepthOfNestedArrays solves the Maximum Depth of Nested Arrays problem.
// Recursively find the maximum nesting depth of an array.
// Time: O(n), Space: O(d) where d is maximum depth
func MaximumDepthOfNestedArrays(data interface{}) interface{} {
    var array interface{}
    switch v := data.(type) {
    case map[string]interface{}:
        array = v["array"]
    default:
        array = data
    }

    return getDepth(array)
}

func getDepth(arr interface{}) int {
    slice, ok := arr.([]interface{})
    if !ok {
        return 0
    }

    if len(slice) == 0 {
        return 1
    }

    maxChildDepth := 0
    for _, element := range slice {
        if _, isList := element.([]interface{}); isList {
            childDepth := getDepth(element)
            if childDepth > maxChildDepth {
                maxChildDepth = childDepth
            }
        }
    }

    return 1 + maxChildDepth
}

func main() {
    arr1 := []interface{}{1, []interface{}{2, []interface{}{3, 4}}}
    fmt.Println(MaximumDepthOfNestedArrays(map[string]interface{}{"array": arr1})) // Output: 3

    arr2 := []interface{}{1, 2, 3}
    fmt.Println(MaximumDepthOfNestedArrays(map[string]interface{}{"array": arr2})) // Output: 1
}`
        },
        twists: [
            { id: '02-product-sum/01-nested-array-depth/twist-01-iterative-bfs-approach', name: 'Iterative BFS Approach', difficulty: 'Medium' },
            { id: '02-product-sum/01-nested-array-depth/twist-02-iterative-dfs-with-stack', name: 'Iterative DFS with Stack', difficulty: 'Easy' },
            { id: '02-product-sum/01-nested-array-depth/twist-03-output-prediction-challenge', name: 'Output Prediction Challenge', difficulty: 'Easy' },
            { id: '02-product-sum/01-nested-array-depth/twist-04-return-depth-of-each-element', name: 'Return Depth of Each Element', difficulty: 'Medium' },
            { id: '02-product-sum/01-nested-array-depth/twist-05-tail-recursion-impossibility', name: 'Tail Recursion Impossibility', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth'] = problem;

})();
