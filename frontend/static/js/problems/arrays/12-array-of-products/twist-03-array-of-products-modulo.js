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
        hints: ["Use modular arithmetic for all multiplications.", "Compute prefix_product[i] = (array[0] * ... * array[i]) % M.", "Compute suffix_product[i] = (array[i] * ... * array[n-1]) % M.", "Combine: result[i] = (prefix[i-1] * suffix[i+1]) % M."],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            { input: {"array": [100000, 200000, 300000], "M": 1000000007}, output: [60000000000000, 30000000000000, 20000000000000], explanation: 'Products computed mod M.' },
            { input: {"array": [2, 3, 5], "M": 7}, output: [1, 3, 6], explanation: 'Products: [15%7=1, 10%7=3, 6%7=6].' },
            { input: {"array": [1, 2, 3, 4], "M": 13}, output: [11, 12, 8, 6], explanation: '[24%13=11, 12%13=12, 8%13=8, 6%13=6].' }
        ],
        solutions: {
            python: `def array_of_products_modulo(array, M):
    n = len(array)
    prefix = [1]*n
    suffix = [1]*n
    prefix[0] = array[0] % M
    for i in range(1,n): prefix[i] = (prefix[i-1]*array[i]) % M
    suffix[-1] = array[-1] % M
    for i in range(n-2,-1,-1): suffix[i] = (suffix[i+1]*array[i]) % M
    result = []
    for i in range(n):
        val = 1
        if i>0: val = (val*prefix[i-1]) % M
        if i<n-1: val = (val*suffix[i+1]) % M
        result.append(val)
    return result

if __name__=="__main__":
    print(array_of_products_modulo([2,3,5], 7))  # [1,3,6]
    print(array_of_products_modulo([1,2,3,4], 13))`,
            go: `package main
import "fmt"
func arrayOfProductsModulo(array []int, M int) []int {
    n := len(array)
    prefix := make([]int,n)
    suffix := make([]int,n)
    prefix[0] = array[0]%M
    for i:=1;i<n;i++ { prefix[i]=(prefix[i-1]*array[i])%M }
    suffix[n-1] = array[n-1]%M
    for i:=n-2;i>=0;i-- { suffix[i]=(suffix[i+1]*array[i])%M }
    result := make([]int,n)
    for i:=0;i<n;i++ {
        val := 1
        if i>0 { val=(val*prefix[i-1])%M }
        if i<n-1 { val=(val*suffix[i+1])%M }
        result[i] = val
    }
    return result
}
func main() { fmt.Println(arrayOfProductsModulo([]int{2,3,5}, 7)) }`
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
