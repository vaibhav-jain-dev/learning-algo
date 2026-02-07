/**
 * Subarray Sort
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: out-of-order-bounds
 */
(function() {
    'use strict';

    const problem = {
        name: 'Subarray Sort',
        difficulty: 'Hard',
        algorithm: 'out-of-order-bounds',
        description: 'Write a function that takes in an array of at least two integers and returns an array of the starting and ending indices of the smallest subarray in the input array that needs to be sorted in place in order for the entire input array to be sorted (in ascending order). If the input array is already sorted, the function should return [-1, -1].',
        problem: 'Analyze the problem structure to identify the right approach. Consider the constraints to determine the target complexity. Implement the algorithm step by step, handling edge cases carefully. This achieves O(n) time with O(1) space.',
        hints: [
            'Break down the problem into smaller subproblems. What is the simplest case you can solve?',
            'Consider what data structure would help you efficiently track the information you need.',
            'Think about the time-space tradeoff. Can you trade extra memory for better time complexity?',
            'Walk through a small example by hand. What steps do you take? Can you formalize that into an algorithm?'
        ],

        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                1,
                2,
                4,
                7,
                10,
                11,
                7,
                12,
                6,
                7,
                16,
                18,
                19
        ]
},
        output: [3, 9],
        explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
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
        output: [-1, -1],
        explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
    },
    {
        input: {
        "array": [
                2,
                1
        ]
},
        output: [0, 1],
        explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
    }
        ],
        twists: [
            { name: 'Subarray Sort Descending', difficulty: 'Hard', description: 'Find the smallest subarray that needs sorting in descending order to make the entire array sorted in descending order.', whyDifferent: 'All comparisons reverse: out-of-order means increasing instead of decreasing, changing the boundary detection logic.', example: 'array = [9, 7, 5, 3, 6, 2, 1]. Subarray [5, 3, 6] needs sorting descending. Return [2, 4].' },
            { name: 'Two Subarray Sort', difficulty: 'Very Hard', description: 'Find the minimum total length of two non-overlapping subarrays that, if both sorted, result in the entire array being sorted.', whyDifferent: 'Two disjoint subarrays might cover less total length than one contiguous subarray, requiring a different decomposition.', example: 'array = [1, 5, 3, 4, 2, 6]. One subarray [5,3,4,2] len 4. Or two: [5,3] and [4,2] len 2+2=4. Same here.' },
            { name: 'Subarray Sort with Deletions', difficulty: 'Hard', description: 'Instead of sorting the subarray, you can delete elements. Find the minimum deletions to make the array sorted.', whyDifferent: 'Deletions are finding the longest increasing subsequence and computing n - LIS, a different optimization.', example: 'array = [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]. LIS length = 10, deletions = 3.' },
            { name: 'Nearly Sorted Detection', difficulty: 'Medium', description: 'Determine if the array is nearly sorted: the subarray needing sorting has length at most K. Return true/false.', whyDifferent: 'A decision version with a threshold, useful as a quick check before deciding which sorting algorithm to use.', example: 'array = [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19], K = 8. Subarray len = 7 <= 8. Return true.' },
            { name: 'Subarray Reverse to Sort', difficulty: 'Hard', description: 'Instead of sorting the subarray, you can only reverse it. Find if there exists a subarray that, when reversed, sorts the entire array.', whyDifferent: 'Reversal is more restrictive than sorting. The subarray must be sorted in reverse order for reversal to work.', example: 'array = [1, 2, 5, 4, 3, 6]. Reverse [5,4,3] -> [3,4,5]. Works! Return [2, 4].' }
        ],
        similar: [
    { id: '18-subarray-sort/01-minimum-swaps-to-sort', name: '01 Minimum Swaps To Sort', difficulty: 'Hard' },
    { id: '18-subarray-sort/02-shortest-unsorted-with-k', name: '02 Shortest Unsorted With K', difficulty: 'Medium' },
    { id: '18-subarray-sort/03-max-sorted-subarrays', name: '03 Max Sorted Subarrays', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '18-subarray-sort', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/18-subarray-sort'] = problem;

})();
