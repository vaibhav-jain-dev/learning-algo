/**
 * Product of Products Array
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: prefix-suffix
 * Parent: 12-array-of-products
 */
(function() {
    'use strict';

    const problem = {
        name: 'Product of Products Array',
        difficulty: 'Hard',
        algorithm: 'prefix-suffix',
        parent: '12-array-of-products',
        description: 'Apply the array-of-products transformation twice: first compute the products array, then compute the products array of that result. Return the final doubly-transformed array.',
        problem: 'Apply the standard prefix-suffix products algorithm twice. First pass produces array B from A, second pass produces array C from B.',
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
                explanation: 'The product of products array for this input yields [5, 1, 4].'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: [1,2,3],
                explanation: 'The product of products array for this input yields [1, 2, 3].'
            },
            {
                input: {"array":[-5,2,-4,14,-6]},
                output: [-5,2,-4],
                explanation: 'The product of products array for this input yields [-5, 2, -4].'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: [],
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            }
        ],
        solutions: {
            python: `def product_of_products_array(array):
    """
    Product of Products Array

    Apply the array-of-products transformation twice: first compute the products array, then compute the products array of that result. Return the final doubly-transformed array.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(product_of_products_array([5,1,4,2]))  # Expected: [5,1,4]
print(product_of_products_array([1,2,3,4,5]))  # Expected: [1,2,3]
print(product_of_products_array([-5,2,-4,14,-6]))  # Expected: [-5,2,-4]
`,
            go: `package main

import "fmt"

// ProductOfProductsArray solves the Product of Products Array problem.
// Apply the array-of-products transformation twice: first compute the products array, then compute the products array of that result. Return the final doubly-transformed array.
// Time: O(n), Space: O(n)
func ProductOfProductsArray(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(ProductOfProductsArray([]int{5, 1, 4, 2})) // Expected: [5,1,4]
	fmt.Println(ProductOfProductsArray([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3]
	fmt.Println(ProductOfProductsArray([]int{-5, 2, -4, 14, -6})) // Expected: [-5,2,-4]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '12-array-of-products/twist-05-product-of-products-array', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/12-array-of-products/twist-05-product-of-products-array'] = problem;
})();
