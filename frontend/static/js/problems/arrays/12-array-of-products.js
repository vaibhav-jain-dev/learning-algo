/**
 * Array of Products
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: prefix-suffix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Array of Products',
        difficulty: 'Medium',
        algorithm: 'prefix-suffix',
        description: 'Write a function that takes in a non-empty array of integers and returns an array of the same length, where each element in the output array is equal to the product of every other number in the input array. In other words, the value at output[i] is equal to the product of every number in the input array other than input[i]. **Important:** Solve this problem without using division.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                5,
                1,
                4,
                2
        ]
},
        output: [8, 40, 10, 20],
        explanation: 'Processing the input data produces the output. For input array=[5, 1, 4, 2], the result is [8, 40, 10, 20].'
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
        output: [120, 60, 40, 30, 24],
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3, 4, 5], the result is [120, 60, 40, 30, 24].'
    },
    {
        input: {
        "array": [
                -5,
                2,
                -4,
                14,
                -6
        ]
},
        output: [672, -1680, 840, -240, 560],
        explanation: 'Processing the input data produces the output. For input array=[-5, 2, -4, 14, -6], the result is [672, -1680, 840, -240, 560].'
    }
        ],
        twists: [
            { title: 'Array of Products with Division', difficulty: 'Easy', description: 'Solve the same problem but you ARE allowed to use division. Handle zeros in the array gracefully.', whyDifferent: 'Division makes the general case trivial (total product / each element) but zeros create special cases that need careful handling.', example: 'array = [1, 2, 0, 4]. With zero, product at zero-index is 8, all others are 0.' },
            { title: 'Array of Sums', difficulty: 'Easy', description: 'Instead of products, return an array where output[i] is the sum of all elements except input[i].', whyDifferent: 'Sum is simpler than product: total_sum - element[i]. But the challenge is doing it without subtraction, analogous to no-division.', example: 'array = [1, 2, 3, 4]. Output: [9, 8, 7, 6].' },
            { title: 'Array of Products Modulo', difficulty: 'Hard', description: 'Compute array of products modulo a large prime M. Division is not straightforward in modular arithmetic.', whyDifferent: 'Modular arithmetic prevents simple division; prefix/suffix approach is essential, and overflow must be handled carefully.', example: 'array = [100000, 200000, 300000], M = 1000000007. Compute products mod M.' },
            { title: 'Running Product Excluding Window', difficulty: 'Hard', description: 'For each index i, return the product of all elements NOT in a window of size K centered at i.', whyDifferent: 'Exclusion zone is a window, not a single element. Requires prefix and suffix products with a gap of size K.', example: 'array = [1, 2, 3, 4, 5], K = 3. At i=2, exclude [2,3,4], product = 1*5 = 5.' },
            { title: 'Product of Products Array', difficulty: 'Hard', description: 'Apply the array-of-products transformation twice: compute the products array, then compute the products array of that result.', whyDifferent: 'The second application magnifies values enormously and requires understanding how the transformation composes.', example: 'array = [1, 2, 3]. First pass: [6, 3, 2]. Second pass: [6, 12, 18].' }
        ],
        similar: []
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '12-array-of-products', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/12-array-of-products'] = problem;

})();
