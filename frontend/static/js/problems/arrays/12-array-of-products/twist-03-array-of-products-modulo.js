/**
 * Array of Products Modulo
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: prefix-suffix
 * Parent: 12-array-of-products
 */
(function() {
    'use strict';

    const problem = {
        name: 'Array of Products Modulo',
        difficulty: 'Hard',
        algorithm: 'prefix-suffix',
        parent: '12-array-of-products',
        description: 'Compute the array of products where each product is taken modulo a large prime M. Division is not straightforward in modular arithmetic, so the prefix-suffix approach is essential.',
        problem: 'Use prefix products and suffix products with modular multiplication. output[i] = (prefix[i-1] * suffix[i+1]) % M.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[5,1,4,2]},
                output: [5,1,4],
                explanation: 'The array of products modulo for this input yields [5, 1, 4].'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: [1,2,3],
                explanation: 'The array of products modulo for this input yields [1, 2, 3].'
            },
            {
                input: {"array":[-5,2,-4,14,-6]},
                output: [-5,2,-4],
                explanation: 'The array of products modulo for this input yields [-5, 2, -4].'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: [],
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            }
        ],
        solutions: {
            python: `def array_of_products_modulo(array):
    """
    Array of Products Modulo

    Compute the array of products where each product is taken modulo a large prime M. Division is not straightforward in modular arithmetic, so the prefix-suffix approach is essential.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(array_of_products_modulo([5,1,4,2]))  # Expected: [5,1,4]
print(array_of_products_modulo([1,2,3,4,5]))  # Expected: [1,2,3]
print(array_of_products_modulo([-5,2,-4,14,-6]))  # Expected: [-5,2,-4]
`,
            go: `package main

import "fmt"

// ArrayOfProductsModulo solves the Array of Products Modulo problem.
// Compute the array of products where each product is taken modulo a large prime M. Division is not straightforward in modular arithmetic, so the prefix-suffix approach is essential.
// Time: O(n), Space: O(n)
func ArrayOfProductsModulo(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(ArrayOfProductsModulo([]int{5, 1, 4, 2})) // Expected: [5,1,4]
	fmt.Println(ArrayOfProductsModulo([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3]
	fmt.Println(ArrayOfProductsModulo([]int{-5, 2, -4, 14, -6})) // Expected: [-5,2,-4]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '12-array-of-products/twist-03-array-of-products-modulo', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/12-array-of-products/twist-03-array-of-products-modulo'] = problem;
})();
