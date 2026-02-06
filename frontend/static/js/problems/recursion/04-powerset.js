/**
 * Powerset
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-powerset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Powerset',
        difficulty: 'Medium',
        algorithm: 'recursion-powerset',
        description: 'Write a function that takes in an array of unique integers and returns its powerset. The powerset P(X) of a set X is the set of all subsets of X. For example, the powerset of [1, 2] is [[], [1], [2], [1, 2]]. Note that the sets in the powerset do not need to be in any particular order.',
        complexity: {
            time: 'O(n * 2^n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                1,
                2,
                3
        ]
},
        output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[1, 2, 3], the result is [[], ..., [1, 2, 3]] (length 8).'
    }
        ],
        twists: [
            { title: 'Powerset with Duplicates', difficulty: 'Medium', description: 'Generate the powerset of an array that may contain duplicate elements, ensuring no duplicate subsets appear in the result.', whyDifferent: 'Requires sorting the input first and adding skip logic to avoid generating the same subset twice, unlike the straightforward include/exclude approach for unique elements.', example: 'For [1,2,2], return [[],[1],[1,2],[1,2,2],[2],[2,2]] -- note [2] appears once, not twice.' },
            { title: 'Subsets of Fixed Size k', difficulty: 'Medium', description: 'Instead of all subsets, generate only subsets of exactly size k from the array.', whyDifferent: 'Changes the recursion from unbounded include/exclude to a combination-selection pattern with a target size constraint, pruning branches early when insufficient elements remain.', example: 'For [1,2,3,4] with k=2, return [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]].' },
            { title: 'Powerset as Bitmask', difficulty: 'Medium', description: 'Generate the powerset using iterative bit manipulation instead of recursion, representing each subset as a bitmask.', whyDifferent: 'Shifts thinking from recursive tree traversal to iterative enumeration over integers 0 to 2^n-1, mapping each bit to element inclusion.', example: 'For [a,b,c], iterate 0-7: 0=000=[], 1=001=[a], 2=010=[b], ..., 7=111=[a,b,c].' },
            { title: 'Powerset Sum Target', difficulty: 'Hard', description: 'Find all subsets of the array whose elements sum to a given target value.', whyDifferent: 'Adds a constraint-satisfaction layer on top of subset generation, requiring pruning of branches that cannot possibly reach the target sum.', example: 'For [1,2,3,4,5] with target=5, return [[2,3],[1,4],[5],[1,2,3]] -- but not subsets like [1,2] or [4,5].' },
            { title: 'Iterative Powerset', difficulty: 'Easy', description: 'Build the powerset iteratively by starting with [[]] and for each new element, adding it to all existing subsets.', whyDifferent: 'Replaces recursive thinking with an iterative build-up pattern, which is conceptually different and avoids stack depth concerns.', example: 'Start with [[]]. Add 1: [[],[1]]. Add 2: [[],[1],[2],[1,2]]. Add 3: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]].' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '04-powerset', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/04-powerset'] = problem;

})();
