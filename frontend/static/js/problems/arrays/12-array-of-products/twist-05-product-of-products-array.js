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
        hints: ["First compute B[i] = product of all A[j] where j != i.", "Then compute C[i] = product of all B[j] where j != i.", "Values grow very large - consider using modular arithmetic or big integers.", "The composition has interesting mathematical properties."],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            { input: {"array": [1, 2, 3]}, output: [6, 12, 18], explanation: 'First pass: [6,3,2]. Second pass: [3*2=6, 6*2=12, 6*3=18].' },
            { input: {"array": [2, 3]}, output: [3, 2], explanation: 'First pass: [3,2]. Second pass: [2,3].' },
            { input: {"array": [1, 1, 1]}, output: [1, 1, 1], explanation: 'All ones: every pass gives all ones.' }
        ],
        solutions: {
            python: `def product_of_products_array(array):
    def products(arr):
        n = len(arr)
        prefix = [1]*n; suffix = [1]*n
        for i in range(1,n): prefix[i] = prefix[i-1]*arr[i-1]
        for i in range(n-2,-1,-1): suffix[i] = suffix[i+1]*arr[i+1]
        return [prefix[i]*suffix[i] for i in range(n)]
    return products(products(array))

if __name__=="__main__":
    print(product_of_products_array([1,2,3]))  # [6,12,18]
    print(product_of_products_array([2,3]))  # [3,2]`,
            go: `package main
import "fmt"
func products(arr []int) []int {
    n := len(arr)
    prefix := make([]int,n); suffix := make([]int,n)
    for i:=range prefix { prefix[i]=1; suffix[i]=1 }
    for i:=1;i<n;i++ { prefix[i]=prefix[i-1]*arr[i-1] }
    for i:=n-2;i>=0;i-- { suffix[i]=suffix[i+1]*arr[i+1] }
    result := make([]int,n)
    for i:=0;i<n;i++ { result[i]=prefix[i]*suffix[i] }
    return result
}
func productOfProductsArray(array []int) []int { return products(products(array)) }
func main() { fmt.Println(productOfProductsArray([]int{1,2,3})) }`
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
