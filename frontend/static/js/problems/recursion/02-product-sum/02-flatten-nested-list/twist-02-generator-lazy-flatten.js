/**
 * Generator / Lazy Flatten
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/02-flatten-nested-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Generator / Lazy Flatten',
        difficulty: 'Hard',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/02-flatten-nested-list',
        description: 'Implement flatten as a generator that yields one element at a time without building the full result array. This is useful for very large nested structures.',
        problem: 'Generators use lazy evaluation, producing values on demand rather than building the entire output eagerly. This changes the space complexity from O(n) result storage to O(d) for the recursion/iteration stack only.',
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
                input: {"array":[[1,2],[3,[4,5]],6]},
                output: [[1,2],[3,[4,5]],6],
                explanation: 'The generator lazy flatten for this input yields [1,2, 3,4,5, 6].'
            },
            // Edge case
            {
                input: {"array":[[1,2]]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def generator_lazy_flatten(array):
    """
    Generator / Lazy Flatten

    Implement flatten as a generator that yields one element at a time without building the full result array. This is useful for very large nested structures.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(generator_lazy_flatten([[1,2],[3,[4,5]],6]))  # Expected: [[1,2],[3,[4,5]],6]
print(generator_lazy_flatten([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// GeneratorLazyFlatten solves the Generator / Lazy Flatten problem.
// Implement flatten as a generator that yields one element at a time without building the full result array. This is useful for very large nested structures.
// Time: O(?), Space: O(?)
func GeneratorLazyFlatten(array [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(GeneratorLazyFlatten([][]int{{1, 2}, {3, 4,5}, 6})) // Expected: [[1,2],[3,[4,5]],6]
	fmt.Println(GeneratorLazyFlatten([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list/twist-02-generator-lazy-flatten', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list/twist-02-generator-lazy-flatten'] = problem;
})();
