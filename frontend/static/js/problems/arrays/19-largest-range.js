/**
 * Largest Range
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: hash-expansion
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Range',
        difficulty: 'Hard',
        algorithm: 'hash-expansion',
        description: 'Write a function that takes in an array of integers and returns an array of length 2 representing the largest range of integers contained in that array. The first number in the output array should be the first (smallest) number in the range, while the second number should be the last (largest) number in the range. A range of numbers is defined as a set of numbers that come right after each other in the set of real integers. For instance, the output array [2, 6] represents the range {2, 3, 4, 5, ',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                1,
                11,
                3,
                0,
                15,
                5,
                2,
                4,
                10,
                7,
                12,
                6
        ]
},
        output: [0, 7],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[1, 11, ..., 6] (length 12), the result is [0, 7].'
    },
    {
        input: {
        "array": [
                4,
                2,
                1,
                3
        ]
},
        output: [1, 4],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[4, 2, 1, 3], the result is [1, 4].'
    },
    {
        input: {
        "array": [
                8,
                4,
                2,
                10,
                3,
                6,
                7,
                9,
                1
        ]
},
        output: [6, 10],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[8, 4, ..., 1] (length 9), the result is [6, 10].'
    }
        ],
        twists: [
            { title: 'K Largest Ranges', difficulty: 'Hard', description: 'Find the K largest consecutive ranges in the array. Return them sorted by range length descending.', whyDifferent: 'Must find all ranges and select the top K, requiring collection and sorting of all range intervals.', example: 'array = [1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6], K = 2. Ranges: [0,7] len 8, [10,12] len 3. Top 2: [[0,7],[10,12]].' },
            { title: 'Largest Range with Duplicates', difficulty: 'Medium', description: 'The array may contain duplicates. Find the largest range of consecutive integers present (each value needs to appear at least once).', whyDifferent: 'Duplicates should not extend the range but must not break the algorithm. Hash set deduplication is essential.', example: 'array = [1, 2, 2, 3, 3, 3, 5]. Range: [1, 3] length 3.' },
            { title: 'Largest Range Starting from Value', difficulty: 'Medium', description: 'Given a starting value V, find the longest consecutive range that includes V.', whyDifferent: 'Instead of global maximum, find the specific range containing a given value, requiring targeted expansion from V.', example: 'array = [1, 11, 3, 0, 15, 5, 2, 4], V = 3. Range containing 3: [0, 5] length 6.' },
            { title: 'Largest Even Range', difficulty: 'Hard', description: 'Find the largest range of consecutive even integers present in the array (step of 2 between consecutive elements).', whyDifferent: 'The consecutive step is 2 instead of 1, requiring the hash expansion to check num+2 and num-2.', example: 'array = [2, 4, 6, 1, 3, 8, 10]. Even range: [2, 4, 6, 8, 10] length 5 values.' },
            { title: 'Largest Range After One Removal', difficulty: 'Hard', description: 'Find the largest range if you could remove one element from the array (to bridge two separate ranges).', whyDifferent: 'Removal cannot help directly, but it reframes as: find two consecutive ranges separated by gap 1 and merge them.', example: 'array = [1, 2, 3, 5, 6, 7]. Ranges: [1,3] and [5,7]. Gap is 1 value (4). If 4 existed, range would be [1,7]. Still [5,7] len 3 or [1,3] len 3 without 4.' }
        ],
        similar: [
    { id: '19-largest-range/01-longest-consecutive-gap-k', name: 'Longest Consecutive with Gap K', difficulty: 'Medium' },
    { id: '19-largest-range/02-count-distinct-ranges', name: 'Count Distinct Ranges', difficulty: 'Medium' },
    { id: '19-largest-range/03-largest-range-after-addition', name: 'Largest Range After Addition', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '19-largest-range', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/19-largest-range'] = problem;

})();
