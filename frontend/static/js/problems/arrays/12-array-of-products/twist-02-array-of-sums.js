/**
 * Array of Sums
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: prefix-suffix
 * Parent: 12-array-of-products
 */
(function() {
    'use strict';

    const problem = {
        name: 'Array of Sums',
        difficulty: 'Easy',
        algorithm: 'prefix-suffix',
        parent: '12-array-of-products',
        description: 'Return an array where output[i] is the sum of all elements except input[i]. Solve without using subtraction, analogous to the no-division constraint in array of products.',
        problem: 'Use prefix sums and suffix sums. output[i] = prefix_sum[i-1] + suffix_sum[i+1]. This avoids subtraction entirely.',
        hints: ["Compute prefix sums from left to right.", "Compute suffix sums from right to left.", "output[i] = prefix[i-1] + suffix[i+1].", "Handle boundary cases for first and last elements."],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            { input: {"array": [1, 2, 3, 4]}, output: [9, 8, 7, 6], explanation: 'Total=10. output[0]=10-1=9, output[1]=10-2=8, etc.' },
            { input: {"array": [5, 5, 5]}, output: [10, 10, 10], explanation: 'Each element excluded gives sum of remaining two 5s.' },
            { input: {"array": [1]}, output: [0], explanation: 'Single element: sum of everything else is 0.' }
        ],
        solutions: {
            python: `def array_of_sums(array):
    n = len(array)
    prefix = [0] * n
    suffix = [0] * n
    prefix[0] = array[0]
    for i in range(1, n): prefix[i] = prefix[i-1] + array[i]
    suffix[-1] = array[-1]
    for i in range(n-2, -1, -1): suffix[i] = suffix[i+1] + array[i]
    result = []
    for i in range(n):
        s = 0
        if i > 0: s += prefix[i-1]
        if i < n-1: s += suffix[i+1]
        result.append(s)
    return result

if __name__=="__main__":
    print(array_of_sums([1,2,3,4]))  # [9,8,7,6]
    print(array_of_sums([5,5,5]))  # [10,10,10]`,
            go: `package main
import "fmt"
func arrayOfSums(array []int) []int {
    n := len(array)
    prefix := make([]int, n)
    suffix := make([]int, n)
    prefix[0] = array[0]
    for i:=1;i<n;i++ { prefix[i]=prefix[i-1]+array[i] }
    suffix[n-1] = array[n-1]
    for i:=n-2;i>=0;i-- { suffix[i]=suffix[i+1]+array[i] }
    result := make([]int, n)
    for i:=0;i<n;i++ {
        if i>0 { result[i]+=prefix[i-1] }
        if i<n-1 { result[i]+=suffix[i+1] }
    }
    return result
}
func main() { fmt.Println(arrayOfSums([]int{1,2,3,4})) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '12-array-of-products/twist-02-array-of-sums', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/12-array-of-products/twist-02-array-of-sums'] = problem;
})();
