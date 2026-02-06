/**
 * Palindrome Partitioning Min Cuts
 * Category: dynamic-programming
 * Difficulty: Very
 * Algorithm: dp-palindrome
 */
(function() {
    'use strict';

    const problem = {
        name: 'Palindrome Partitioning Min Cuts',
        difficulty: 'Very',
        algorithm: 'dp-palindrome',
        description: 'Given a non-empty string, write a function that returns the minimum number of cuts needed to partition the string such that each partition is a palindrome. A palindrome is a string that reads the same forwards and backwards.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2)'
        },
        examples: [
    {
        input: {
        "string": "noonabbad"
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input string=noonabbad, the result is 2.'
    },
    {
        input: {
        "string": "aab"
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input string=aab, the result is 1.'
    },
    {
        input: {
        "string": "aba"
},
        output: 0,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input string=aba, the result is 0.'
    },
    {
        input: {
        "string": "abcde"
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input string=abcde, the result is 4.'
    }
        ],
        twists: [
            { title: 'Return All Minimum Partitions', difficulty: 'Hard', description: 'Instead of just the minimum number of cuts, return all possible partitions that achieve this minimum cut count.', whyDifferent: 'Adds a backtracking/enumeration phase after the DP. You must reconstruct all optimal partition paths, not just count the cuts.', example: 'string="aab": min cuts=1. Valid minimum partitions: ["aa","b"] and ["a","ab"]? No, "ab" is not a palindrome. Only ["aa","b"] works.' },
            { title: 'Palindrome Partition With Max K Parts', difficulty: 'Hard', description: 'Partition the string into at most k palindromic parts. If impossible, return -1. If possible, find the partition that minimizes the length of the longest part.', whyDifferent: 'Changes the objective from minimizing cuts to minimizing the maximum part length under a parts-count constraint, requiring a different DP state formulation.', example: 'string="aabaa", k=2: partition into ["a","abaa"]? "abaa" is not a palindrome. ["aab","aa"]? "aab" is not. ["aabaa"] with 1 part works, max length 5.' },
            { title: 'Cost-Weighted Palindrome Partitioning', difficulty: 'Hard', description: 'Each cut has a cost equal to the absolute difference of the characters at the cut boundary. Find the partition into palindromes that minimizes total cut cost.', whyDifferent: 'Replaces uniform cut cost with position-dependent costs, making the optimization sensitive to where you cut, not just how many cuts you make.', example: 'string="noonabbad": cutting between n and a costs |n-a|=13. The cut positions matter, not just the count.' },
            { title: 'Longest Palindromic Partition Piece', difficulty: 'Medium', description: 'Find the partition of the string into palindromes that maximizes the length of the longest palindromic piece.', whyDifferent: 'Flips the objective: instead of minimizing cuts to make palindromes, you want to maximize the size of individual palindromic chunks, favoring fewer but larger palindromes.', example: 'string="noonabbad": partition ["noon","abba","d"] has longest piece "noon" (length 4). Can we do better? "noonabbad" is not a palindrome, so 4 is the answer.' },
            { title: 'Check If K-Palindrome', difficulty: 'Medium', description: 'Determine if the string can be partitioned into exactly k palindromic substrings. Return true or false.', whyDifferent: 'Changes from optimization to feasibility with a fixed partition count. The DP must track the exact number of parts used, adding a second dimension.', example: 'string="aab", k=2: ["aa","b"] works, return true. string="aab", k=3: ["a","a","b"] works, return true. string="abc", k=1: "abc" is not a palindrome, return false.' },
            { title: 'Palindrome Partitioning With Removals', difficulty: 'Very Hard', description: 'You may remove up to m characters from the string before partitioning. Find the minimum number of cuts for a palindrome partition after optimal removal of at most m characters.', whyDifferent: 'Adds a character-removal budget that interacts with the palindrome checking, requiring a 2D DP for palindrome detection combined with the cuts DP.', example: 'string="abcde", m=0: need 4 cuts (each char is a palindrome). m=2: remove "b" and "d" to get "ace", still need 2 cuts. m=4: remove all but 1 char, 0 cuts.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '11-palindrome-partitioning', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/11-palindrome-partitioning'] = problem;

})();
