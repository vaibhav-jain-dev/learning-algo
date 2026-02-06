/**
 * Maximum Subarray Sum
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Subarray Sum',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        description: 'Given an array of integers (which may contain both positive and negative numbers), find the contiguous subarray with the largest sum. Return the maximum sum. This is the classic problem solved efficiently by Kadane\'s Algorithm, which uses dynamic programming to track the maximum subarray ending at each position.',
        problem: 'Kadane\'s key insight: at each position, the maximum subarray ending here is either just the current element (start fresh) or the current element plus the maximum subarray ending at the previous position (extend). Track two values: maxEndingHere (max sum ending at current position) and maxSoFar (global max). For each element: maxEndingHere = max(element, maxEndingHere + element), then update maxSoFar if needed.',
        hints: [
            'Brute force checks all subarrays in O(n²). Can you do better by building on previous computations?',
            'At each index, you have two choices: start a new subarray here, or extend the previous subarray.',
            'If the sum of the previous subarray plus current element is less than just the current element, start fresh.',
            'Track both the maximum ending at current position and the global maximum seen so far.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "nums": [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        },
        output: 6,
        explanation: 'Tracking maxEndingHere: -2→1→-2→4→3→5→6→1→5. At index 3 (value 4), we start fresh because 4 > (-2+4). The subarray [4,-1,2,1] has sum 6, which is the maximum. maxSoFar peaks at 6.'
    }
        ],
        twists: [
            {
                title: 'Proof of Correctness',
                difficulty: 'Hard',
                description: 'Prove formally that Kadane\'s algorithm always produces the correct answer. Specifically, prove the invariant: after processing index i, maxEndingHere equals the maximum sum of any subarray ending at i, and maxSoFar equals the maximum sum of any subarray in nums[0..i].',
                whyDifferent: 'Forces you to think inductively rather than just coding the recurrence. You must argue why the greedy choice (start fresh vs extend) is always optimal at every step.',
                example: 'Base case: maxEndingHere = nums[0], maxSoFar = nums[0]. Inductive step: if maxEndingHere correctly holds the max subarray sum ending at i-1, then max(nums[i], maxEndingHere + nums[i]) correctly computes it for i.'
            },
            {
                title: 'When Does Greedy Fail?',
                difficulty: 'Medium',
                description: 'Kadane\'s is greedy in choosing to extend or restart. Construct a variation where this greedy approach fails: find the maximum subarray sum where you must skip exactly one element from the subarray.',
                whyDifferent: 'The greedy "extend or restart" logic no longer works because skipping an element creates a non-contiguous dependency. You need to track two states: best with no skip yet, and best with one skip used.',
                example: 'Input: [1, -5, 3, 2]. Without skip constraint, answer is [3,2]=5. With exactly one skip allowed, answer is [1, _, 3, 2] = 6 by skipping -5.'
            },
            {
                title: 'Alternative Data Structure Approach',
                difficulty: 'Medium',
                description: 'Solve the maximum subarray problem using a segment tree that supports range max-subarray queries. Your tree should be able to answer: what is the max subarray sum in the range [l, r]?',
                whyDifferent: 'Instead of a single linear scan, you must think about how to merge subarray information from two halves. Each node stores: total sum, max prefix sum, max suffix sum, and max subarray sum.',
                example: 'For array [-2, 1, -3, 4, -1, 2, 1, -5, 4], a query for range [3, 6] should return 6 (subarray [4, -1, 2, 1]).'
            },
            {
                title: 'Online Streaming Variant',
                difficulty: 'Hard',
                description: 'Numbers arrive one at a time in a stream. At any point, you may be asked for the maximum subarray sum of all numbers seen so far. You cannot store the entire array. Design an O(1) per-element update.',
                whyDifferent: 'This is the online version of Kadane\'s. While the core recurrence works naturally online, the twist forces you to reason about what state is sufficient and why you never need to look back at old elements.',
                example: 'Stream: -2, 1, -3, 4, -1, 2. After each element, maxSoFar values are: -2, 1, 1, 4, 4, 5.'
            },
            {
                title: 'Space-Time Tradeoff: Return the Subarray',
                difficulty: 'Medium',
                description: 'Modify Kadane\'s to return the actual subarray (start and end indices), not just the sum. Then extend it to return the top-K non-overlapping maximum subarrays.',
                whyDifferent: 'Tracking indices requires careful bookkeeping of when you start fresh vs extend. The top-K extension breaks the O(n) single-pass approach and requires fundamentally different thinking about excluding previously found ranges.',
                example: 'Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]. Max subarray is indices [3, 6] with sum 6. Top-2 might be [3,6]=6 and [8,8]=4.'
            },
            {
                title: 'Conceptual Trap: All Negatives',
                difficulty: 'Easy',
                description: 'What does Kadane\'s return when all elements are negative? Some implementations incorrectly return 0. Trace through your algorithm with [-3, -5, -1, -8] and ensure it returns -1, not 0.',
                whyDifferent: 'Exposes a common implementation bug where maxSoFar is initialized to 0 instead of the first element, or where maxEndingHere is clamped to 0. Forces careful thinking about initialization.',
                example: 'Input: [-3, -5, -1, -8]. Correct output: -1 (just the element -1 by itself). Wrong output: 0 (if you initialize maxSoFar = 0 and clamp maxEndingHere to 0).'
            }
        ],
        similar: [
    { id: '01-kadanes-algorithm/01-max-circular-subarray', name: 'Maximum Sum Circular Subarray', difficulty: 'Medium' },
    { id: '01-kadanes-algorithm/02-max-product-subarray', name: 'Maximum Product Subarray', difficulty: 'Medium' },
    { id: '01-kadanes-algorithm/03-max-sum-k-elements', name: 'Maximum Sum with at Least K Elements', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm'] = problem;

})();
