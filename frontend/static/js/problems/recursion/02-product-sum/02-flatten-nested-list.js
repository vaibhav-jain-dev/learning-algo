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
            {
                title: 'Iterative with Explicit Stack',
                difficulty: 'Medium',
                description: 'Flatten the nested list using an explicit stack instead of recursion. Process elements right-to-left so they come off the stack in the correct order.',
                whyDifferent: 'You must reverse the push order to maintain element ordering, which is a subtle detail that recursion handles naturally. The stack replaces the call stack but requires manual ordering management.',
                example: 'For [[1,2],[3,[4,5]],6]: Push 6, [3,[4,5]], [1,2] to stack. Pop [1,2] -> push 2,1. Pop 1 -> add to result. Pop 2 -> add. Pop [3,[4,5]] -> push [4,5],3. Continue.'
            },
            {
                title: 'Generator / Lazy Flatten',
                difficulty: 'Hard',
                description: 'Implement flatten as a generator that yields one element at a time without building the full result array. This is useful for very large nested structures.',
                whyDifferent: 'Generators use lazy evaluation, producing values on demand rather than building the entire output eagerly. This changes the space complexity from O(n) result storage to O(d) for the recursion/iteration stack only.',
                example: 'function* flatten(arr) { for (el of arr) { if (Array.isArray(el)) yield* flatten(el); else yield el; } }. Calling next() returns one value at a time.'
            },
            {
                title: 'Flatten to Specific Depth',
                difficulty: 'Medium',
                description: 'Modify flatten to accept a depth parameter. Only flatten arrays up to the specified depth, leaving deeper arrays intact. This matches JavaScript\'s Array.flat(depth) behavior.',
                whyDifferent: 'Adds a depth constraint to the recursion, requiring you to track and decrement the allowed depth. When depth reaches 0, you stop flattening and include sub-arrays as-is.',
                example: 'flatten([[1,[2]],[3,[4,[5]]]], depth=1) -> [1,[2],3,[4,[5]]]. Only one level is flattened; deeper nesting is preserved.'
            },
            {
                title: 'Stack Overflow with Deep Nesting',
                difficulty: 'Medium',
                description: 'Given an array nested 50,000 levels deep, the recursive solution will crash. Implement a purely iterative flatten that handles arbitrary depth.',
                whyDifferent: 'Deep nesting directly translates to deep recursion. The iterative stack-based approach is the only viable option, and you must carefully manage the stack to preserve element ordering.',
                example: 'A 50000-deep nested array [[[...[42]...]]] should flatten to [42]. The iterative solution processes this by repeatedly checking if the top of stack is an array, unwrapping it layer by layer.'
            },
            {
                title: 'Flatten with Path Tracking',
                difficulty: 'Medium',
                description: 'While flattening, also record the index path to each element. Return pairs of (value, path) where path is an array of indices.',
                whyDifferent: 'Requires maintaining additional state through the recursion: the current index path. This transforms a simple traversal into one that tracks positional context, useful for debugging or reconstructing the original structure.',
                example: 'For [[1,2],[3,[4,5]]]: output is [(1,[0,0]), (2,[0,1]), (3,[1,0]), (4,[1,1,0]), (5,[1,1,1])]. Each path shows how to navigate from root to that element.'
            }
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
