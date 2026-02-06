/**
 * Right Smaller Than
 * Category: binary-search-trees
 * Difficulty: Very
 * Algorithm: bst-augmented
 */
(function() {
    'use strict';

    const problem = {
        name: 'Right Smaller Than',
        difficulty: 'Very',
        algorithm: 'bst-augmented',
        description: 'Write a function that takes in an array of integers and returns an array of the same length, where each element in the output array corresponds to the number of integers in the input array that are to the right of the relevant index and that are strictly smaller than the integer at that index. In other words, for each index i, find the count of elements array[j] where j > i and array[j] < array[i].',
        complexity: {
            time: 'O(n log n) average, O(n^2) worst',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                8,
                5,
                11,
                -1,
                3,
                4,
                2
        ]
},
        output: [5, 4, 4, 0, 1, 1, 0],
        explanation: 'Processing the input data produces the output. For input array=[8, 5, ..., 2] (length 7), the result is [5, ..., 0] (length 7).'
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
        output: [0, 0, 0, 0, 0],
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3, 4, 5], the result is [0, 0, 0, 0, 0].'
    }
        ],
        twists: [
            {
                title: 'Right Greater Than',
                difficulty: 'Hard',
                description: 'For each element, count how many elements to its right are strictly greater than it.',
                whyDifferent: 'While structurally similar, tracking "greater than" in a BST requires counting nodes that go to the right subtree rather than the left, and the augmented counting logic with left-subtree sizes must be adapted to track right-subtree sizes instead.',
                example: 'For [8, 5, 11, -1, 3, 4, 2], right greater counts are [1, 1, 0, 2, 1, 0, 0]. Only 11 is greater than 8 to its right.'
            },
            {
                title: 'Right Smaller Than with Duplicates',
                difficulty: 'Hard',
                description: 'The array contains duplicate values. Count elements strictly smaller to the right. Handle duplicates correctly in the BST insertion.',
                whyDifferent: 'Duplicates create ambiguity in BST placement. If equal values go right, they should not be counted as "smaller." You must carefully separate the equal case from the strictly-less case in your augmented BST.',
                example: 'For [5, 5, 2, 5, 3], the right-smaller counts are [2, 1, 0, 1, 0]. The first 5 has 2 and 3 to its right that are smaller, but not the other 5s.'
            },
            {
                title: 'Left Larger Than',
                difficulty: 'Hard',
                description: 'For each element, count how many elements to its left are strictly larger than it. This counts inversions from the left side.',
                whyDifferent: 'Processing from left to right changes the dynamic. You insert elements into the BST in forward order and count how many previously inserted values are larger, which requires tracking right-subtree sizes during insertion.',
                example: 'For [8, 5, 11, -1, 3, 4, 2], left-larger counts are [0, 1, 0, 3, 2, 2, 3]. For -1 at index 3, all three preceding values (8, 5, 11) are larger.'
            },
            {
                title: 'Right Smaller Using Merge Sort',
                difficulty: 'Very Hard',
                description: 'Solve the right-smaller-than problem using a modified merge sort instead of a BST approach.',
                whyDifferent: 'This requires a completely different algorithmic paradigm. During merge sort, when an element from the right half is placed before elements from the left half, it contributes to inversion counts. You must track original indices through the sorting process.',
                example: 'For [8, 5, 11, -1], during merge sort of [8, 5] and [11, -1] (after sorting subarrays), cross-subarray comparisons reveal the counts. This gives guaranteed O(n log n) without BST worst-case issues.'
            },
            {
                title: 'Range Count to the Right',
                difficulty: 'Very Hard',
                description: 'For each element at index i, count how many elements to its right fall within the range [array[i] - k, array[i] + k] for a given k.',
                whyDifferent: 'Instead of counting all smaller elements, you need a range query. The augmented BST must support rank queries for both a lower and upper bound, and the count is the difference between two rank lookups.',
                example: 'For [8, 5, 11, -1, 3, 4, 2] with k=2, element 5 asks: how many to the right are in [3, 7]? Answer: 2 (values 3 and 4).'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than'] = problem;

})();
