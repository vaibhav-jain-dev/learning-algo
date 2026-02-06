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
        hints: ["Count zeros in the array first.", "If zero count >= 2, all results are 0.", "If zero count == 1, only the zero-index position has a nonzero result.", "For no zeros, simply divide total product by each element."],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            { input: {"array": [1, 2, 0, 4]}, output: [0, 0, 8, 0], explanation: 'One zero: product at zero-index = 1*2*4 = 8, all others are 0.' },
            { input: {"array": [1, 2, 3, 4]}, output: [24, 12, 8, 6], explanation: 'Total product = 24. Each output = 24/element.' },
            { input: {"array": [0, 0, 3]}, output: [0, 0, 0], explanation: 'Two zeros: all products are 0.' }
        ],
        solutions: {
            python: `def array_of_products_division(array):
    zero_count = array.count(0)
    if zero_count >= 2:
        return [0] * len(array)
    total = 1
    for x in array:
        if x != 0: total *= x
    if zero_count == 1:
        return [total if x == 0 else 0 for x in array]
    return [total // x for x in array]

if __name__=="__main__":
    print(array_of_products_division([1,2,0,4]))  # [0,0,8,0]
    print(array_of_products_division([1,2,3,4]))  # [24,12,8,6]`,
            go: `package main
import "fmt"
func arrayOfProductsDivision(array []int) []int {
    zeroCount, total := 0, 1
    for _, x := range array { if x==0 { zeroCount++ } else { total*=x } }
    result := make([]int, len(array))
    if zeroCount >= 2 { return result }
    for i, x := range array {
        if zeroCount == 1 { if x==0 { result[i]=total } else { result[i]=0 }
        } else { result[i]=total/x }
    }
    return result
}
func main() { fmt.Println(arrayOfProductsDivision([]int{1,2,0,4})) }`
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
