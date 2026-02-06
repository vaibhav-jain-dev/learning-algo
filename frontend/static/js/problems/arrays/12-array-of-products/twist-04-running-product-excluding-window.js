/**
 * Running Product Excluding Window
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: prefix-suffix
 * Parent: 12-array-of-products
 */
(function() {
    'use strict';

    const problem = {
        name: 'Running Product Excluding Window',
        difficulty: 'Hard',
        algorithm: 'prefix-suffix',
        parent: '12-array-of-products',
        description: 'For each index i, return the product of all elements NOT in a window of size K centered at i. The window includes indices from max(0, i-K//2) to min(n-1, i+K//2).',
        problem: 'Use prefix and suffix products. For each i, the excluded window is [i-K//2, i+K//2]. The product is prefix[i-K//2-1] * suffix[i+K//2+1].',
        hints: ["Compute prefix products and suffix products.", "For each index, determine the window boundaries.", "Product outside window = prefix[left-1] * suffix[right+1].", "Handle edge cases where window extends beyond array bounds."],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            { input: {"array": [1, 2, 3, 4, 5], "K": 3}, output: [20, 5, 5, 2, 6], explanation: 'At i=2, window=[1,2,3], exclude indices 1-3, product = 1*5 = 5.' },
            { input: {"array": [2, 3, 4], "K": 1}, output: [12, 8, 6], explanation: 'K=1 is the original problem: exclude only self.' },
            { input: {"array": [1, 2, 3, 4, 5], "K": 5}, output: [1, 1, 1, 1, 1], explanation: 'Window covers entire array, product outside is empty = 1.' }
        ],
        solutions: {
            python: `def running_product_excluding_window(array, K):
    n = len(array)
    prefix = [1]*n
    suffix = [1]*n
    prefix[0] = array[0]
    for i in range(1,n): prefix[i] = prefix[i-1]*array[i]
    suffix[-1] = array[-1]
    for i in range(n-2,-1,-1): suffix[i] = suffix[i+1]*array[i]
    result = []
    half = K//2
    for i in range(n):
        left = max(0, i-half)
        right = min(n-1, i+half)
        prod = 1
        if left > 0: prod *= prefix[left-1]
        if right < n-1: prod *= suffix[right+1]
        result.append(prod)
    return result

if __name__=="__main__":
    print(running_product_excluding_window([1,2,3,4,5], 3))
    print(running_product_excluding_window([2,3,4], 1))`,
            go: `package main
import "fmt"
func runningProductExcludingWindow(array []int, K int) []int {
    n := len(array)
    prefix := make([]int,n)
    suffix := make([]int,n)
    prefix[0]=array[0]
    for i:=1;i<n;i++ { prefix[i]=prefix[i-1]*array[i] }
    suffix[n-1]=array[n-1]
    for i:=n-2;i>=0;i-- { suffix[i]=suffix[i+1]*array[i] }
    result := make([]int,n)
    half := K/2
    for i:=0;i<n;i++ {
        left := i-half; if left<0 { left=0 }
        right := i+half; if right>=n { right=n-1 }
        prod := 1
        if left>0 { prod*=prefix[left-1] }
        if right<n-1 { prod*=suffix[right+1] }
        result[i] = prod
    }
    return result
}
func main() { fmt.Println(runningProductExcludingWindow([]int{1,2,3,4,5}, 3)) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '12-array-of-products/twist-04-running-product-excluding-window', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/12-array-of-products/twist-04-running-product-excluding-window'] = problem;
})();
