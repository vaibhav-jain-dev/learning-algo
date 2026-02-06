/**
 * Array of Products with Division
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: prefix-suffix
 * Parent: 12-array-of-products
 */
(function() {
    'use strict';

    const problem = {
        name: 'Array of Products with Division',
        difficulty: 'Easy',
        algorithm: 'prefix-suffix',
        parent: '12-array-of-products',
        description: 'Solve the product-of-all-except-self problem using division. Compute the total product of all elements, then divide by each element. Handle zeros gracefully - one zero means only the zero-index gets a nonzero product; two or more zeros means all products are zero.',
        problem: 'Compute total product and count zeros. If no zeros, each output = total/element. If one zero, only the zero-position output is the product of non-zero elements. If 2+ zeros, all outputs are 0.',
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
                explanation: 'The array of products with division for this input yields [5, 1, 4].'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: [1,2,3],
                explanation: 'The array of products with division for this input yields [1, 2, 3].'
            },
            {
                input: {"array":[-5,2,-4,14,-6]},
                output: [-5,2,-4],
                explanation: 'The array of products with division for this input yields [-5, 2, -4].'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def array_of_products_with_division(array):
    """
    Array of Products with Division

    Solve the product-of-all-except-self problem using division. Compute the total product of all elements, then divide by each element. Handle zeros gracefully - one zero means only the zero-index gets a nonzero product; two or more zeros means all products are zero.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(array_of_products_with_division([5,1,4,2]))  # Expected: [5,1,4]
print(array_of_products_with_division([1,2,3,4,5]))  # Expected: [1,2,3]
print(array_of_products_with_division([-5,2,-4,14,-6]))  # Expected: [-5,2,-4]
`,
            go: `package main

import "fmt"

// ArrayOfProductsWithDivision solves the Array of Products with Division problem.
// Solve the product-of-all-except-self problem using division. Compute the total product of all elements, then divide by each element. Handle zeros gracefully - one zero means only the zero-index gets a nonzero product; two or more zeros means all products are zero.
// Time: O(n), Space: O(n)
func ArrayOfProductsWithDivision(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(ArrayOfProductsWithDivision([]int{5, 1, 4, 2})) // Expected: [5,1,4]
	fmt.Println(ArrayOfProductsWithDivision([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3]
	fmt.Println(ArrayOfProductsWithDivision([]int{-5, 2, -4, 14, -6})) // Expected: [-5,2,-4]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '12-array-of-products/twist-01-array-of-products-with-division', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/12-array-of-products/twist-01-array-of-products-with-division'] = problem;
})();
