/**
 * Recursion Problems Loader
 * Auto-generated - loads all problems in this category
 */
(function() {
    'use strict';

    const PROBLEMS = [
        '01-nth-fibonacci',
        '01-nth-fibonacci/01-tribonacci',
        '01-nth-fibonacci/02-climbing-stairs-k-steps',
        '01-nth-fibonacci/03-matrix-fibonacci',
        '02-product-sum',
        '02-product-sum/01-nested-array-depth',
        '02-product-sum/02-flatten-nested-list',
        '02-product-sum/03-nested-list-weighted-sum-ii',
        '03-permutations',
        '03-permutations/01-permutations-with-duplicates',
        '03-permutations/02-next-permutation',
        '03-permutations/03-kth-permutation',
        '04-powerset',
        '05-phone-mnemonics',
        '06-staircase-traversal',
        '07-generate-divtags',
        '08-solve-sudoku',
        '09-ambiguous-measurements',
        '10-interweaving-strings',
        '11-number-of-bst',
        '12-blackjack-probability',
        '13-reveal-minesweeper',
        '14-lowest-common-manager',
    ];

    // Category info
    window.CategoryInfo = window.CategoryInfo || {};
    window.CategoryInfo['recursion'] = {
        name: 'Recursion',
        count: PROBLEMS.length,
        problems: PROBLEMS
    };

    console.log('[recursion] Loaded ' + PROBLEMS.length + ' problems');

})();
