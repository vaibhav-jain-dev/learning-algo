/**
 * Return Depth of Each Element
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/01-nested-array-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return Depth of Each Element',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/01-nested-array-depth',
        description: 'Instead of just returning the max depth, return a flat list of (value, depth) pairs for every integer in the nested array.',
        problem: 'Shifts from aggregation (max) to enumeration. You must carry the depth through the recursion and collect results, turning a reduce operation into a map-like traversal.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,[2,[3,4]]]},
                output: 2,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def return_depth_of_each_element(array):
    """
    Return Depth of Each Element

    Instead of just returning the max depth, return a flat list of (value, depth) pairs for every integer in the nested array.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(return_depth_of_each_element([1,[2,[3,4]]]))  # Expected: 2
print(return_depth_of_each_element([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReturnDepthOfEachElement solves the Return Depth of Each Element problem.
// Instead of just returning the max depth, return a flat list of (value, depth) pairs for every integer in the nested array.
// Time: O(?), Space: O(?)
func ReturnDepthOfEachElement(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReturnDepthOfEachElement([]interface{}{1, []interface{}{2, []int{3, 4}}})) // Expected: 2
	fmt.Println(ReturnDepthOfEachElement([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth/twist-04-return-depth-of-each-element', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth/twist-04-return-depth-of-each-element'] = problem;
})();
