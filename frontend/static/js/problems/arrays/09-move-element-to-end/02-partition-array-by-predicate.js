/**
 * Partition Array By Predicate
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partition Array By Predicate',
        difficulty: 'Medium',
        algorithm: 'two-pointer-move',
        parent: '09-move-element-to-end',
        description: 'Given an array of integers and a predicate function, rearrange the array so that all elements satisfying the predicate come before all elements that don\'t satisfy it. Return the partitioned array. The relative order within each partition does not need to be preserved.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
          "array": [
            1,
            4,
            2,
            5,
            3,
            6
          ]
        },
        output: "[6, 4, 2, 5, 3, 1] (or any arrangement with evens first)",
        explanation: 'Given the input, the algorithm processes it to produce [6, 4, 2, 5, 3, 1] (or any arrangement with evens first)'
    },
    {
        input: {
          "array": [
            3,
            1,
            4,
            1,
            5,
            9,
            2,
            6
          ]
        },
        output: "[6, 9, 4, 5, 1, 1, 2, 3] (elements > 3 first)",
        explanation: 'Given the input, the algorithm processes it to produce [6, 9, 4, 5, 1, 1, 2, 3] (elements > 3 first)'
    },
    {
        input: {
          "array": [
            1,
            2,
            3,
            4,
            5
          ]
        },
        output: "[5, 3, 1, 2, 4] (odds first)",
        explanation: 'Given the input, the algorithm processes it to produce [5, 3, 1, 2, 4] (odds first)'
    }
        ],
        solutions: {
            python: `def partitionArrayByPredicate(array, predicate):
    """
    Partition Array By Predicate - Rearrange so elements satisfying predicate
    come before elements that don't. Uses two-pointer swap technique.

    Time: O(n) - Single pass through array
    Space: O(1) - In-place modification
    """
    left = 0
    right = len(array) - 1

    while left < right:
        # Move left pointer until we find element not satisfying predicate
        while left < right and predicate(array[left]):
            left += 1

        # Move right pointer until we find element satisfying predicate
        while left < right and not predicate(array[right]):
            right -= 1

        # Swap elements
        if left < right:
            array[left], array[right] = array[right], array[left]
            left += 1
            right -= 1

    return array


# Test
if __name__ == "__main__":
    # isEven predicate
    print(partitionArrayByPredicate([1, 4, 2, 5, 3, 6], lambda x: x % 2 == 0))
    # Output: [6, 4, 2, 5, 3, 1] (evens first)

    # x > 3 predicate
    print(partitionArrayByPredicate([3, 1, 4, 1, 5, 9, 2, 6], lambda x: x > 3))
    # Output: [6, 9, 4, 5, 1, 1, 2, 3] (elements > 3 first)

    # isOdd predicate
    print(partitionArrayByPredicate([1, 2, 3, 4, 5], lambda x: x % 2 == 1))
    # Output: [1, 5, 3, 4, 2] (odds first)`,
            go: `package main

import "fmt"

// PartitionArrayByPredicate rearranges array so elements satisfying predicate
// come before elements that don't.
// Time: O(n), Space: O(1)
func PartitionArrayByPredicate(array []int, predicate func(int) bool) []int {
    left := 0
    right := len(array) - 1

    for left < right {
        // Move left pointer until we find element not satisfying predicate
        for left < right && predicate(array[left]) {
            left++
        }

        // Move right pointer until we find element satisfying predicate
        for left < right && !predicate(array[right]) {
            right--
        }

        // Swap elements
        if left < right {
            array[left], array[right] = array[right], array[left]
            left++
            right--
        }
    }

    return array
}

func main() {
    // isEven predicate
    isEven := func(x int) bool { return x%2 == 0 }
    fmt.Println(PartitionArrayByPredicate([]int{1, 4, 2, 5, 3, 6}, isEven))
    // Output: [6 4 2 5 3 1]

    // x > 3 predicate
    greaterThan3 := func(x int) bool { return x > 3 }
    fmt.Println(PartitionArrayByPredicate([]int{3, 1, 4, 1, 5, 9, 2, 6}, greaterThan3))
    // Output: [6 9 4 5 1 1 2 3]

    // isOdd predicate
    isOdd := func(x int) bool { return x%2 == 1 }
    fmt.Println(PartitionArrayByPredicate([]int{1, 2, 3, 4, 5}, isOdd))
    // Output: [1 5 3 4 2]
}`
        },
        twists: [
            { title: 'Stable Partition', difficulty: 'Hard', description: 'Partition the array by predicate while preserving the relative order of elements within each partition.', whyDifferent: 'Simple swapping destroys order. You need a different approach like collecting and merging, or an in-place stable partition algorithm.', example: 'array = [1, 4, 2, 5, 3, 6], pred = isEven. Result: [4, 2, 6, 1, 5, 3] (order preserved in each group).' },
            { title: 'Three-Way Partition', difficulty: 'Hard', description: 'Partition into three groups: elements satisfying predicate A, elements satisfying predicate B, and the rest.', whyDifferent: 'Two predicates create three regions requiring three pointers (Dutch National Flag style), more complex boundary management.', example: 'array = [1,2,3,4,5,6], predA = isEven, predB = (>4). Groups: [2,4,6], [5], [1,3].' },
            { title: 'Partition and Count', difficulty: 'Easy', description: 'Partition the array and return the count of elements satisfying the predicate (the partition point index).', whyDifferent: 'The focus shifts to finding and returning the boundary index, useful for subsequent binary search operations.', example: 'array = [1, 4, 2, 5, 3, 6], pred = isEven. After partition, boundary index = 3 (3 even numbers).' },
            { title: 'Partition with Minimum Swaps', difficulty: 'Hard', description: 'Partition the array using the absolute minimum number of swap operations. Return the swap count.', whyDifferent: 'Naive two-pointer may perform unnecessary swaps. You need to identify truly misplaced elements on both sides.', example: 'array = [2, 1, 4, 3], pred = isEven. Only 1 swap needed: swap 1 and 4 to get [2, 4, 1, 3].' },
            { title: 'Partition by Multiple Predicates', difficulty: 'Very Hard', description: 'Given K predicates with priority ordering, partition so elements matching higher-priority predicates come first.', whyDifferent: 'Generalizes to K-way partitioning, requiring multiple passes or a counting sort-like approach.', example: 'array = [5,2,8,1,3], preds = [isEven, isOdd&&>3, rest]. Result: [2,8,5,1,3].' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 09-move-element-to-end
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/02-partition-array-by-predicate', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/02-partition-array-by-predicate'] = problem;

})();
