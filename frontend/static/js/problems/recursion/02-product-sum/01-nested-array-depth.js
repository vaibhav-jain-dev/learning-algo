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
            {
                title: 'Iterative BFS Approach',
                difficulty: 'Medium',
                description: 'Find maximum nesting depth using a BFS (level-order) approach with a queue, processing one level at a time. No recursion allowed.',
                whyDifferent: 'BFS naturally processes level by level, so depth equals the number of BFS rounds. This is a fundamentally different traversal order than DFS recursion and requires queue management instead of call stack.',
                example: 'For [1, [2, [3, 4]]]: Level 0 queue: [1, [2,[3,4]]]. Level 1 queue: [2, [3,4]]. Level 2 queue: [3, 4]. Max depth = 3.'
            },
            {
                title: 'Iterative DFS with Stack',
                difficulty: 'Easy',
                description: 'Replace the recursive DFS with an explicit stack. Each stack entry stores an element and its depth. Track the maximum depth seen.',
                whyDifferent: 'Forces you to manually manage what the call stack does automatically. You must pair each element with its depth metadata, which recursion provides implicitly through nesting.',
                example: 'Push (array, 1) to stack. Pop and push children: (1, 1), ([2,[3,4]], 1). Pop sub-array, push children at depth 2: (2, 2), ([3,4], 2). Continue. Max seen = 3.'
            },
            {
                title: 'Output Prediction Challenge',
                difficulty: 'Easy',
                description: 'Without running code, predict the output for: [[[], [[[]]]], [1, 2]]. What is the maximum depth? Be careful with empty arrays.',
                whyDifferent: 'Tests understanding of edge cases: empty arrays have depth 1, and the deeply nested empty array [[[]]] contributes depth even though it contains no integers. You must trace the recursion mentally.',
                example: '[[[], [[[]]]], [1, 2]]: Outer = depth 1. Inner [[], [[[]]]] = depth 2. [] at depth 3 = 3. [[[]]] at depth 3, [[]] at depth 4, [] at depth 5. Answer: 5.'
            },
            {
                title: 'Return Depth of Each Element',
                difficulty: 'Medium',
                description: 'Instead of just returning the max depth, return a flat list of (value, depth) pairs for every integer in the nested array.',
                whyDifferent: 'Shifts from aggregation (max) to enumeration. You must carry the depth through the recursion and collect results, turning a reduce operation into a map-like traversal.',
                example: 'For [1, [2, [3, 4]]]: output is [(1, 1), (2, 2), (3, 3), (4, 3)]. Each integer is tagged with the depth at which it was found.'
            },
            {
                title: 'Tail Recursion Impossibility',
                difficulty: 'Hard',
                description: 'Explain why maximum depth of nested arrays cannot be trivially converted to tail recursion. What property of the problem prevents it?',
                whyDifferent: 'This is a conceptual analysis twist. The problem requires comparing results from multiple recursive calls (siblings in the array), which means you need the results of sub-calls before you can combine them. This prevents simple tail-call optimization.',
                example: 'For [A, B] where A and B are sub-arrays: depth = 1 + max(depth(A), depth(B)). You cannot compute this with a single tail call because you need both depth(A) and depth(B) before taking the max.'
            }
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
