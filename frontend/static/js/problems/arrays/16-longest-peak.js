/**
 * Longest Peak
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: peak-expansion
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Peak',
        difficulty: 'Medium',
        algorithm: 'peak-expansion',
        description: 'Write a function that takes in an array of integers and returns the length of the longest peak in the array. A peak is defined as adjacent integers in the array that are strictly increasing until they reach a tip (the highest value in the peak), at which point they become strictly decreasing. At least three integers are required to form a peak.',
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
                3,
                3,
                4,
                0,
                10,
                6,
                5,
                -1,
                -3,
                2,
                3
        ]
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input array=[1, 2, ..., 3] (length 13), the result is 6.'
    },
    {
        input: {
        "array": [
                1,
                3,
                2
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input array=[1, 3, 2], the result is 3.'
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
        output: 0,
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3, 4, 5], the result is 0.'
    }
        ],
        twists: [
            { title: 'Longest Valley', difficulty: 'Medium', description: 'Find the length of the longest valley: a contiguous subarray that strictly decreases then strictly increases.', whyDifferent: 'Valleys are the mirror of peaks. The detection logic inverts: look for decrease-then-increase instead of increase-then-decrease.', example: 'array = [5, 3, 1, 2, 4, 6]. Longest valley: [5, 3, 1, 2, 4, 6] length 6.' },
            { title: 'Widest Peak at Minimum Height', difficulty: 'Hard', description: 'Find the widest peak whose tip value is at least H. The peak must still be strictly increasing then decreasing.', whyDifferent: 'Adds a height filter to peak detection, requiring you to skip peaks whose tip is below the threshold.', example: 'array = [1, 3, 2, 1, 10, 5, 3], H = 5. Only peak with tip 10 qualifies. Length = 4.' },
            { title: 'Non-Overlapping Peaks Total Length', difficulty: 'Hard', description: 'Find the maximum total length of non-overlapping peaks in the array.', whyDifferent: 'An interval scheduling problem layered on peak detection. Must find non-overlapping peaks maximizing total coverage.', example: 'array = [1, 3, 2, 4, 1, 5, 2]. Peaks: [1,3,2] len 3, [2,4,1] len 3, [1,5,2] len 3. Best non-overlapping: 6.' },
            { title: 'Plateau Peak', difficulty: 'Medium', description: 'Modify the peak definition to allow a flat plateau at the top (consecutive equal max values). Find the longest such plateau peak.', whyDifferent: 'The tip is no longer a single point but a flat segment, requiring modified conditions for what constitutes the peak top.', example: 'array = [1, 2, 3, 3, 3, 2, 1]. This is a valid plateau peak of length 7.' },
            { title: 'Peak with Minimum Slope', difficulty: 'Hard', description: 'Find peaks where both the ascending and descending sides have at least length K (the slope must be gradual enough).', whyDifferent: 'Adds a minimum arm-length constraint, filtering out sharp narrow peaks and only keeping broad ones.', example: 'array = [1, 2, 3, 4, 3, 2, 1], K = 3. Ascending side = 3, descending = 3. Valid peak, length 7.' }
        ],
        similar: [
    { id: '16-longest-peak/01-count-number-of-peaks', name: '01 Count Number Of Peaks', difficulty: 'Medium' },
    { id: '16-longest-peak/02-maximum-peak-sum', name: '02 Maximum Peak Sum', difficulty: 'Hard' },
    { id: '16-longest-peak/03-longest-bitonic-subsequence', name: '03 Longest Bitonic Subsequence', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '16-longest-peak', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/16-longest-peak'] = problem;

})();
