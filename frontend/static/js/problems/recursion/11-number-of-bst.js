/**
 * Number of Binary Search Trees
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-count-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Binary Search Trees',
        difficulty: 'Hard',
        algorithm: 'recursion-count-bst',
        description: 'Write a function that takes in a positive integer n and returns the number of structurally unique Binary Search Trees (BSTs) that can store values 1 to n. Two BSTs are structurally different if they have different structures regardless of their node values.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 3
},
        output: 5,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=3, the result is 5.'
    }
        ],
        twists: [
            { title: 'Generate All BSTs', difficulty: 'Hard', description: 'Instead of counting the number of structurally unique BSTs, actually generate and return all of them as tree structures.', whyDifferent: 'Shifts from counting (Catalan number computation) to constructing every tree, requiring recursive tree building with node allocation and list management.', example: 'For n=3, return all 5 trees: root=1 with right subtree variations, root=2 balanced, root=3 with left subtree variations.' },
            { title: 'Structurally Unique Binary Trees', difficulty: 'Medium', description: 'Count the number of structurally unique binary trees (not BSTs) with n nodes, where node values do not matter.', whyDifferent: 'Interestingly, this is the same Catalan number -- the insight is understanding why BST structure count equals general binary tree structure count.', example: 'For n=3, the answer is still 5. Understanding why requires recognizing the bijection between BST orderings and tree shapes.' },
            { title: 'BSTs with Height Constraint', difficulty: 'Very Hard', description: 'Count the number of structurally unique BSTs with n nodes whose height does not exceed a given value h.', whyDifferent: 'Adds a height constraint that breaks the simple Catalan recurrence, requiring a 2D DP indexed by both node count and maximum allowed height.', example: 'For n=4, h=3: count BSTs with 4 nodes that are at most height 3 (exclude the degenerate linked-list shape which has height 4).' },
            { title: 'Number of AVL Trees', difficulty: 'Very Hard', description: 'Count the number of structurally unique AVL trees (height-balanced BSTs) that can store n nodes.', whyDifferent: 'The AVL balance constraint (left and right subtree heights differ by at most 1) adds a complex height-tracking dimension to the recurrence.', example: 'For n=4, only some of the 14 BST structures satisfy AVL balance. Count how many do.' },
            { title: 'Catalan by Matrix Exponentiation', difficulty: 'Hard', description: 'Compute the nth Catalan number in O(log n) time using matrix exponentiation instead of the O(n^2) DP approach.', whyDifferent: 'Requires expressing the Catalan recurrence in matrix form and applying fast exponentiation, a completely different algorithmic technique from iterative DP.', example: 'For n=100, compute C(100) in O(log 100) matrix multiplications rather than filling a table of size 100.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '11-number-of-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/11-number-of-bst'] = problem;

})();
