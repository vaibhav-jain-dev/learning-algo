/**
 * Flatten Nested List
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten Nested List',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Given a nested list of integers, flatten it into a single-level list containing all the integers in the same order. This is a common operation when working with nested data structures and demonstrates recursive traversal.',
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
                [
                        1,
                        2
                ],
                [
                        3,
                        [
                                4,
                                5
                        ]
                ],
                6
        ]
},
        output: [1, 2, 3, 4, 5, 6],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[[1, 2], [3, [4, 5]], 6], the result is [1, ..., 6] (length 6).'
    }
        ],
        solutions: {
            python: `def flattenNestedList(data):
    """
    Flatten Nested List

    Recursively flatten a nested list into a single-level list.
    For each element: if it's a list, recursively flatten it;
    otherwise, add it to the result.

    Time: O(n) where n is total number of elements
    Space: O(d) for recursion stack + O(n) for result
    """
    array = data.get("array", data) if isinstance(data, dict) else data

    def flatten(arr):
        result = []
        for element in arr:
            if isinstance(element, list):
                result.extend(flatten(element))
            else:
                result.append(element)
        return result

    return flatten(array)


# Test
if __name__ == "__main__":
    print(flattenNestedList({"array": [[1, 2], [3, [4, 5]], 6]}))  # Output: [1, 2, 3, 4, 5, 6]
    print(flattenNestedList({"array": [1, [2, [3, [4]]]]}))        # Output: [1, 2, 3, 4]`,
            go: `package main

import "fmt"

// FlattenNestedList solves the Flatten Nested List problem.
// Recursively flatten a nested list into a single-level list.
// Time: O(n), Space: O(n)
func FlattenNestedList(data interface{}) interface{} {
    var array interface{}
    switch v := data.(type) {
    case map[string]interface{}:
        array = v["array"]
    default:
        array = data
    }

    return flatten(array)
}

func flatten(arr interface{}) []interface{} {
    result := []interface{}{}

    slice, ok := arr.([]interface{})
    if !ok {
        return []interface{}{arr}
    }

    for _, element := range slice {
        if nestedSlice, isList := element.([]interface{}); isList {
            result = append(result, flatten(nestedSlice)...)
        } else {
            result = append(result, element)
        }
    }

    return result
}

func main() {
    arr1 := []interface{}{
        []interface{}{1, 2},
        []interface{}{3, []interface{}{4, 5}},
        6,
    }
    fmt.Println(FlattenNestedList(map[string]interface{}{"array": arr1})) // Output: [1 2 3 4 5 6]

    arr2 := []interface{}{1, []interface{}{2, []interface{}{3, []interface{}{4}}}}
    fmt.Println(FlattenNestedList(map[string]interface{}{"array": arr2})) // Output: [1 2 3 4]
}`
        },
        twists: [
            { id: '02-product-sum/02-flatten-nested-list/twist-01-iterative-with-explicit-stack', name: 'Iterative with Explicit Stack', difficulty: 'Medium' },
            { id: '02-product-sum/02-flatten-nested-list/twist-02-generator-lazy-flatten', name: 'Generator / Lazy Flatten', difficulty: 'Hard' },
            { id: '02-product-sum/02-flatten-nested-list/twist-03-flatten-to-specific-depth', name: 'Flatten to Specific Depth', difficulty: 'Medium' },
            { id: '02-product-sum/02-flatten-nested-list/twist-04-stack-overflow-with-deep-nesting', name: 'Stack Overflow with Deep Nesting', difficulty: 'Medium' },
            { id: '02-product-sum/02-flatten-nested-list/twist-05-flatten-with-path-tracking', name: 'Flatten with Path Tracking', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list'] = problem;

})();
