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
        examples: [
    {
        input: {
        "array": [3, 5, -4, 8, 11, 1, -1, 6],
        "targetSum": 10
        },
        output: [-1, 11],
        explanation: 'Looking for pairs that sum to 10. When we reach 11, we check if (10-11)=-1 exists. We haven\'t seen -1 yet, so we store 11. Later when we reach -1, we check if (10-(-1))=11 exists. It does! Return [-1, 11].'
    },
    {
        input: {
        "array": [1, 2, 3, 4, 5],
        "targetSum": 10
        },
        output: [],
        explanation: 'We need two distinct numbers summing to 10. The largest possible sum is 4+5=9, which is less than 10. No valid pair exists, so we return an empty array.'
    },
    {
        input: {
        "array": [4, 6],
        "targetSum": 10
        },
        output: [4, 6],
        explanation: 'With only two elements, we check: does 4 + 6 = 10? Yes! When we process 6, we look for (10-6)=4 in our hash table. We stored 4 earlier, so we return [4, 6].'
    },
    {
        input: {
        "array": [4, 6, 1, -3],
        "targetSum": 3
        },
        output: [6, -3],
        explanation: 'Looking for pairs summing to 3. When we reach -3, we check if (3-(-3))=6 exists in our hash table. We stored 6 earlier, so we return [6, -3].'
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
