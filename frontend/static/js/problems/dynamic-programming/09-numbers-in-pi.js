/**
 * Numbers in Pi
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-pi-numbers
 */
(function() {
    'use strict';

    const problem = {
        name: 'Numbers in Pi',
        difficulty: 'Hard',
        algorithm: 'dp-pi-numbers',
        description: 'Given a string representation of the first n digits of Pi and a list of positive integers (as strings), write a function that returns the smallest number of spaces that can be added to the Pi string such that all resulting numbers are found in the list of integers. If there is no way to split Pi such that all numbers are in the list, return -1. Note that a single digit from Pi can only be used once in a number.',
        complexity: {
            time: 'O(n^2 * m)',
            space: 'O(n + k)'
        },
        examples: [
    {
        input: {
        "pi": "3141592653589793238462643383279",
        "numbers": [
                "314159265358979323846",
                "26433",
                "8",
                "3279",
                "314159265",
                "35897932384626433832",
                "79"
        ]
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input pi=3141592653589793238462643383279, numbers=[314159265358979323846, 26433, ..., 79] (length 7), the result is 2.'
    },
    {
        input: {
        "pi": "314159",
        "numbers": [
                "314",
                "159",
                "3141",
                "59"
        ]
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input pi=314159, numbers=[314, 159, 3141, 59], the result is 1.'
    },
    {
        input: {
        "pi": "123456",
        "numbers": [
                "12",
                "34",
                "56"
        ]
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input pi=123456, numbers=[12, 34, 56], the result is 2.'
    }
        ],
        twists: [
            { title: 'Return the Actual Partition', difficulty: 'Medium', description: 'Instead of returning just the minimum number of spaces, return the actual partition of the Pi string that achieves this minimum.', whyDifferent: 'Requires path reconstruction through the DP, storing which split points led to optimal results and backtracking to recover the partition.', example: 'pi="314159", numbers=["314","159","3141","59"]: minimum spaces=1, partition is ["314","159"] or ["3141","59"].' },
            { title: 'Maximum Coverage Partition', difficulty: 'Hard', description: 'Not all of Pi needs to be covered. Find the partition that covers the maximum number of digits of Pi using numbers from the list, skipping uncoverable sections.', whyDifferent: 'Removes the requirement that every digit must be covered. You now need interval scheduling or a coverage DP that allows gaps between matched numbers.', example: 'pi="3141592653", numbers=["314","265"]: cover digits 0-2 ("314") and 5-7 ("265") for 6 covered digits, skipping "159" and "3".' },
            { title: 'Numbers in Pi With Overlaps', difficulty: 'Hard', description: 'Numbers from the list may overlap in Pi. Find the minimum number of numbers from the list needed such that every digit of Pi is covered by at least one number.', whyDifferent: 'Allows overlapping matches, turning this into an interval covering problem rather than a partition problem. The DP tracks coverage position rather than split points.', example: 'pi="31415", numbers=["314","1415","31"]: "314" covers positions 0-2, "1415" covers 1-4. Together they cover all 5 digits with 2 numbers.' },
            { title: 'Weighted Number Selection', difficulty: 'Hard', description: 'Each number in the list has an associated cost. Find the partition of Pi that minimizes the total cost (not the number of spaces).', whyDifferent: 'Changes the objective from counting splits to minimizing weighted cost, requiring the DP to compare costs rather than counts.', example: 'pi="314159", numbers=["314","159","3141","59"], costs=[10,5,3,8]: partition ["3141","59"] costs 3+8=11, while ["314","159"] costs 10+5=15. Choose the cheaper one.' },
            { title: 'Longest Prefix Coverable', difficulty: 'Medium', description: 'Find the longest prefix of Pi that can be completely partitioned using numbers from the list. Return the length of this prefix.', whyDifferent: 'Changes from a full-string feasibility problem to finding the maximum reachable position, where the DP stops at the furthest coverable index.', example: 'pi="31415926", numbers=["314","159"]: prefix "314159" (length 6) is coverable, but the remaining "26" is not. Answer is 6.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '09-numbers-in-pi', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/09-numbers-in-pi'] = problem;

})();
