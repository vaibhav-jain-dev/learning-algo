/**
 * Two Number Sum
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: hash-table-two-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Number Sum',
        difficulty: 'Easy',
        algorithm: 'hash-table-two-sum',
        description: 'Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. If any two numbers in the input array sum up to the target sum, the function should return them in an array, in any order. If no two numbers sum up to the target sum, the function should return an empty array. Note that the target sum has to be obtained by summing two different integers in the array; you can\'t add a single integer to itself in order to obtain the target sum.',
        problem: 'For each number x in the array, you need its complement (targetSum - x) to exist. A hash table provides O(1) lookup to check if the complement exists. Iterate through the array once: for each number, check if its complement is in the hash table. If yes, return the pair. If no, add the current number to the hash table and continue.',
        hints: [
            'For any number x, what other number y would you need to reach the target sum?',
            'The brute force approach checks every pair - can you do better than O(n²)?',
            'A hash table allows O(1) lookup. What should you store in it?',
            'Store numbers you\'ve seen. For each new number, check if (targetSum - currentNumber) exists in the hash table.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        timeLimit: 500, // 500ms per test case
        examples: [
            // Basic test case
            {
                input: {
                    "array": [3, 5, -4, 8, 11, 1, -1, 6],
                    "targetSum": 10
                },
                output: [-1, 11],
                explanation: 'Looking for pairs that sum to 10. When we reach 11, we check if (10-11)=-1 exists. We haven\'t seen -1 yet, so we store 11. Later when we reach -1, we check if (10-(-1))=11 exists. It does! Return [-1, 11].'
            },
            // Edge case: no valid pair exists
            {
                input: {
                    "array": [1, 2, 3, 4, 5],
                    "targetSum": 10
                },
                output: [],
                explanation: 'We need two distinct numbers summing to 10. The largest possible sum is 4+5=9, which is less than 10. No valid pair exists, so we return an empty array.'
            },
            // Edge case: minimal array (2 elements)
            {
                input: {
                    "array": [4, 6],
                    "targetSum": 10
                },
                output: [4, 6],
                explanation: 'With only two elements, we check: does 4 + 6 = 10? Yes! When we process 6, we look for (10-6)=4 in our hash table. We stored 4 earlier, so we return [4, 6].'
            },
            // Test with negative numbers
            {
                input: {
                    "array": [4, 6, 1, -3],
                    "targetSum": 3
                },
                output: [6, -3],
                explanation: 'Looking for pairs summing to 3. When we reach -3, we check if (3-(-3))=6 exists in our hash table. We stored 6 earlier, so we return [6, -3].'
            },
            // Edge case: target sum is 0 with positive and negative
            {
                input: {
                    "array": [5, -5, 10, -10, 3],
                    "targetSum": 0
                },
                output: [5, -5],
                explanation: 'Target sum is 0. 5 + (-5) = 0. Found valid pair.'
            },
            // Edge case: very small numbers
            {
                input: {
                    "array": [-100, -50, 0, 50, 100],
                    "targetSum": 0
                },
                output: [-100, 100],
                explanation: 'Large negative and positive numbers summing to 0.'
            },
            // Edge case: single element (no pair possible)
            {
                input: {
                    "array": [5],
                    "targetSum": 10
                },
                output: [],
                explanation: 'Single element array - cannot form a pair.'
            },
            // Edge case: pair at beginning
            {
                input: {
                    "array": [1, 9, 5, 6, 7],
                    "targetSum": 10
                },
                output: [1, 9],
                explanation: 'First two elements form the valid pair.'
            },
            // Edge case: pair at end
            {
                input: {
                    "array": [2, 3, 4, 7, 3],
                    "targetSum": 10
                },
                output: [3, 7],
                explanation: 'Pair found with elements in middle and later position.'
            },
            // Large input test for time complexity
            {
                input: {
                    "array": Array.from({length: 1000}, (_, i) => i + 1),
                    "targetSum": 1999
                },
                output: [999, 1000],
                explanation: 'Large array (1000 elements) - testing O(n) time complexity. 999 + 1000 = 1999.'
            }
        ],
        twists: [
            {
                title: 'Two Sum with Duplicate Pairs',
                difficulty: 'Medium',
                description: 'The array may contain duplicates. Return all unique pairs that sum to the target.',
                whyDifferent: 'Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.',
                example: 'array=[1,1,2,3,3], target=4 → [[1,3]] (only one unique pair despite multiple 1s and 3s)'
            },
            {
                title: 'Two Sum Closest to Target',
                difficulty: 'Medium',
                description: 'Instead of an exact match, find the pair whose sum is closest to the target.',
                whyDifferent: 'The hash table approach no longer works directly. Requires sorting + two pointers to efficiently search for the closest sum.',
                example: 'array=[1,3,5,7], target=10 → [3,7] (sum=10, exact match) or [5,7] if target=11'
            },
            {
                title: 'Two Sum in a Circular Array',
                difficulty: 'Medium',
                description: 'The array is circular, and you can only use elements that are within a window of size k in the circular arrangement.',
                whyDifferent: 'Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.',
                example: 'array=[1,4,2,3,5], target=6, k=3 → [1,5] is valid (circular neighbors), [4,2] is valid'
            },
            {
                title: 'Count Pairs with Sum in Range',
                difficulty: 'Hard',
                description: 'Count the number of pairs whose sum falls within a given range [low, high] instead of equaling a specific target.',
                whyDifferent: 'Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.',
                example: 'array=[1,2,3,4,5], low=5, high=7 → 4 pairs: (1,4),(1,5),(2,3),(2,4),(2,5),(3,4) with sums in [5,7]'
            },
            {
                title: 'Two Sum with Index Distance Constraint',
                difficulty: 'Medium',
                description: 'Find a pair summing to target where the two elements are at most k indices apart.',
                whyDifferent: 'The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.',
                example: 'array=[1,3,5,1,5], target=6, k=2 → [1,5] at indices (0,2) works, but (0,4) does not'
            }
        ],
        similar: [
            { id: '02-two-number-sum/01-three-sum-closest', name: 'Three Sum Closest', difficulty: 'Medium' },
            { id: '02-two-number-sum/02-three-sum-duplicates', name: 'Three Sum With Duplicates', difficulty: 'Medium' },
            { id: '02-two-number-sum/03-closest-sum-target', name: 'Closest Sum Target', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum'] = problem;

})();
