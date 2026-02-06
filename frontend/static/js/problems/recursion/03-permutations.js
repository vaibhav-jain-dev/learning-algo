/**
 * Permutations
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Permutations',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        description: 'Write a function that takes in an array of unique integers and returns an array of all permutations of those integers in no particular order. If the input array is empty, the function should return an empty array.',
        complexity: {
            time: 'O(n! * n)',
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
        output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[1, 2, 3], the result is [[1, 2, 3], ..., [3, 2, 1]] (length 6).'
    }
        ],
        twists: [
            {
                title: 'Iterative Generation (Heap\'s Algorithm)',
                difficulty: 'Hard',
                description: 'Generate all permutations iteratively using Heap\'s algorithm, which generates each permutation from the previous one by a single swap. No recursion allowed.',
                whyDifferent: 'Heap\'s algorithm uses a fundamentally different approach: instead of building permutations from scratch recursively, it transforms one permutation into the next via adjacent swaps, requiring understanding of the algorithm\'s invariant.',
                example: 'For [1,2,3]: start with [1,2,3], swap to get [2,1,3], then [3,1,2], then [1,3,2], then [2,3,1], then [3,2,1]. Each step is a single swap determined by the current index counter.'
            },
            {
                title: 'Lexicographic Order Generation',
                difficulty: 'Medium',
                description: 'Generate all permutations in strict lexicographic (sorted) order. Use the "next permutation" algorithm repeatedly starting from the sorted input.',
                whyDifferent: 'Standard backtracking does not guarantee lexicographic order. This approach requires understanding the next-permutation algorithm and applying it n!-1 times, which is an iterative rather than recursive strategy.',
                example: 'For [1,2,3]: output in order [1,2,3] -> [1,3,2] -> [2,1,3] -> [2,3,1] -> [3,1,2] -> [3,2,1]. Each transition uses the find-pivot, swap, reverse algorithm.'
            },
            {
                title: 'Count Only Without Generating',
                difficulty: 'Easy',
                description: 'Return only the count of permutations without generating them. Prove that the answer is always n! and explain why the recursive structure mirrors the factorial definition.',
                whyDifferent: 'Shifts from generation to combinatorial reasoning. The recursive decomposition of permutations (choose first element from n options, recurse on remaining n-1) directly mirrors n! = n * (n-1)!.',
                example: 'For n=4: count = 4! = 24. The recursion tree has 4 branches at level 0, 3 at level 1, 2 at level 2, 1 at level 3: 4*3*2*1 = 24.'
            },
            {
                title: 'Backtracking with Swap Method',
                difficulty: 'Medium',
                description: 'Instead of building permutations by choosing from remaining elements, use the swap-based backtracking approach: for position i, swap element i with each element j >= i, recurse, then swap back.',
                whyDifferent: 'The swap method avoids creating new arrays or maintaining a "used" set. It modifies the array in-place, which is more space-efficient but requires careful backtracking (unswapping) to restore state.',
                example: 'For [1,2,3]: fix pos 0: swap(0,0)->[1,2,3], swap(0,1)->[2,1,3], swap(0,2)->[3,2,1]. For each, recurse on positions 1..n. Unswap after each recursive return.'
            },
            {
                title: 'Time Complexity Deep Dive',
                difficulty: 'Medium',
                description: 'Explain precisely why the time complexity is O(n! * n) and not just O(n!). Where does the extra factor of n come from? Could you reduce it?',
                whyDifferent: 'Requires careful analysis of the work done per permutation. The extra O(n) comes from copying each complete permutation into the result. With the swap method and in-place processing, you can achieve O(n!) if you only need to process (not store) each permutation.',
                example: 'n=4: 24 permutations, each copied in O(4) time = O(96) operations for copying alone. If you print each permutation as generated (no copy), the generation itself is O(n!) swaps.'
            },
            {
                title: 'Partial Permutations (k of n)',
                difficulty: 'Medium',
                description: 'Generate all k-length permutations from an n-element array (k <= n). This is P(n,k) = n!/(n-k)! permutations. Modify the backtracking to stop at depth k.',
                whyDifferent: 'The base case changes from "all elements used" to "k elements chosen". This seemingly small change affects the recursion tree depth and count significantly, requiring adjustment of the termination condition.',
                example: 'For [1,2,3,4], k=2: output is [1,2],[1,3],[1,4],[2,1],[2,3],[2,4],[3,1],[3,2],[3,4],[4,1],[4,2],[4,3]. That is P(4,2) = 12 permutations.'
            }
        ],
        similar: [
    { id: '03-permutations/03-permutations/01-permutations-with-duplicates', name: 'Permutations with Duplicates', difficulty: 'Medium' },
    { id: '03-permutations/03-permutations/02-next-permutation', name: 'Next Permutation', difficulty: 'Medium' },
    { id: '03-permutations/03-kth-permutation', name: 'Kth Permutation Sequence', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations'] = problem;

})();
