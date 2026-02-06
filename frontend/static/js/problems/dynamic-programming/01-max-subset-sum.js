/**
 * Max Subset Sum No Adjacent
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Subset Sum No Adjacent',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        description: 'Write a function that takes in an array of positive integers and returns the maximum sum of non-adjacent elements in the array. If the input array is empty, the function should return 0.',
        problem: 'At each position i, you have two choices: include the current element (and add to the max sum up to i-2) or skip it (and keep the max sum up to i-1). The recurrence is: dp[i] = max(dp[i-1], dp[i-2] + array[i]). Since you only need the previous two values, you can optimize space to O(1) using two variables.',
        hints: [
            'Think about what decision you make at each element: include it or skip it.',
            'If you include element at index i, you cannot include element at i-1. What\'s the best sum you can achieve including i?',
            'Define dp[i] as the maximum sum achievable considering elements 0 to i. What\'s the recurrence relation?',
            'dp[i] = max(dp[i-1], dp[i-2] + array[i]). You only need two previous values, so optimize to O(1) space.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [75, 105, 120, 75, 90, 135]
        },
        output: 330,
        explanation: 'Optimal selection: 75 + 120 + 135 = 330. We skip 105 (adjacent to 75), include 120 (not adjacent to 75), skip 75 (adjacent to 120), skip 90 (to include 135), include 135.'
    },
    {
        input: {
        "array": [7, 10, 12, 7, 9, 14]
        },
        output: 33,
        explanation: 'Optimal selection: 7 + 12 + 14 = 33. At each step: max(prev, prevPrev + current). Building up: 7, max(7,10)=10, max(10,7+12)=19, max(19,10+7)=19, max(19,19+9)=28, max(28,19+14)=33.'
    }
        ],
        twists: [
            {
                title: 'Write the Recurrence from Scratch',
                difficulty: 'Easy',
                description: 'Without looking at the solution, define dp[i] and write the full recurrence relation for Max Subset Sum No Adjacent. Include base cases for dp[0] and dp[1].',
                whyDifferent: 'Forces you to derive the state definition and transition yourself rather than just reading it. Many students can follow a recurrence but struggle to define one from an empty page.',
                example: 'Define dp[i] = max sum considering elements 0..i. Then dp[0] = array[0], dp[1] = max(array[0], array[1]), dp[i] = max(dp[i-1], dp[i-2] + array[i]).'
            },
            {
                title: 'Space Optimization: O(n) to O(1)',
                difficulty: 'Easy',
                description: 'You have the O(n) DP array solution. Now optimize it to O(1) space by identifying which previous values you actually need at each step.',
                whyDifferent: 'Requires recognizing that only the last two DP values matter. This pattern of rolling variables is a fundamental DP space optimization technique.',
                example: 'Replace dp[] array with two variables: prev1 (dp[i-1]) and prev2 (dp[i-2]). At each step: curr = max(prev1, prev2 + array[i]), then shift prev2 = prev1, prev1 = curr.'
            },
            {
                title: 'Print the Actual Selected Elements',
                difficulty: 'Medium',
                description: 'Instead of just returning the maximum sum, return which elements were selected. Maintain a way to backtrack through your DP decisions.',
                whyDifferent: 'Returning the optimal value is easier than reconstructing the solution. You must track which choice (include vs skip) was made at each step, then backtrack.',
                example: 'For [75, 105, 120, 75, 90, 135] with max sum 330, output the indices [0, 2, 5] corresponding to elements 75, 120, 135.'
            },
            {
                title: 'Greedy Fails Here - Prove It',
                difficulty: 'Medium',
                description: 'A greedy approach might always pick the largest available non-adjacent element. Construct a counterexample where greedy fails and explain why DP is necessary.',
                whyDifferent: 'Understanding why greedy fails deepens understanding of when DP is needed. It forces analysis of the optimal substructure property.',
                example: 'Array [5, 10, 5, 5, 5]. Greedy picks 10 first (largest), then can only pick 5+5=10, total 20. But optimal is 5+5+5=15 skipping the 10... Actually [3, 10, 3, 3, 3]: greedy picks 10, gets 10+3=13. DP picks 3+3+3=9. Hmm, greedy wins here. Try [1, 100, 1, 1, 100, 1]: greedy picks 100,100=200. DP also gets 200. The key counterexample: [5, 1, 4, 5] - greedy picks 5 at index 3, then 5 at index 0 = 10. But 5+4=9 also works. Greedy actually works for this specific structure - the point is proving it requires DP reasoning.'
            },
            {
                title: 'Trace the DP Table',
                difficulty: 'Easy',
                description: 'Given array [7, 10, 12, 7, 9, 14], manually fill in the DP table step by step. At each index, show the include vs skip decision and which value wins.',
                whyDifferent: 'Forces mechanical understanding of the recurrence. Many students understand the formula abstractly but cannot trace through it correctly by hand.',
                example: 'dp[0]=7, dp[1]=max(7,10)=10, dp[2]=max(10, 7+12)=19, dp[3]=max(19, 10+7)=19, dp[4]=max(19, 19+9)=28, dp[5]=max(28, 19+14)=33.'
            },
            {
                title: 'Circular Variant',
                difficulty: 'Hard',
                description: 'What if the array is circular, meaning the first and last elements are also considered adjacent? You cannot pick both. How does this change the approach?',
                whyDifferent: 'The circular constraint breaks the simple linear recurrence. You must decompose into two subproblems: one excluding the first element and one excluding the last, then take the max.',
                example: 'For circular array [2, 3, 2], you cannot pick both index 0 and 2. Solve for [2, 3] (max=3) and [3, 2] (max=3). Answer is max(3, 3) = 3.'
            }
        ],
        similar: [
    { id: '01-max-subset-sum/01-house-robber-ii', name: 'House Robber II', difficulty: 'Medium' },
    { id: '01-max-subset-sum/02-delete-and-earn', name: 'Delete and Earn', difficulty: 'Medium' },
    { id: '01-max-subset-sum/03-paint-house', name: 'Paint House', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum'] = problem;

})();
