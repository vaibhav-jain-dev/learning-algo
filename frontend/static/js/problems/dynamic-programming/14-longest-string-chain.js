/**
 * Longest String Chain
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-string-chain
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest String Chain',
        difficulty: 'Hard',
        algorithm: 'dp-string-chain',
        description: 'Given a list of words, where each word consists of only lowercase English letters, find the longest string chain. A string chain is a sequence of words [word_1, word_2, ..., word_k] where word_i+1 can be formed by adding exactly one letter to word_i at any position. All words in the chain must be in the given list. Return the length of the longest possible string chain.',
        complexity: {
            time: 'O(n * L^2)',
            space: 'O(n * L)'
        },
        examples: [
    {
        input: {
        "words": [
                "a",
                "b",
                "ba",
                "bca",
                "bda",
                "bdca"
        ]
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input words=[a, b, ..., bdca] (length 6), the result is 4.'
    },
    {
        input: {
        "words": [
                "xbc",
                "pcxbcf",
                "xb",
                "cxbc",
                "pcxbc"
        ]
},
        output: 5,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input words=[xbc, pcxbcf, xb, cxbc, pcxbc], the result is 5.'
    },
    {
        input: {
        "words": [
                "abcd",
                "dbqca"
        ]
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input words=[abcd, dbqca], the result is 1.'
    }
        ],
        twists: [
            { title: 'String Chain With Deletion', difficulty: 'Medium', description: 'Instead of adding a character to go from word_i to word_i+1, define the chain by removing exactly one character. Find the longest deletion chain.', whyDifferent: 'Reverses the chain direction. You sort by decreasing length and check if removing a character from the longer word produces the shorter word, flipping the predecessor logic.', example: 'words=["bdca","bca","ba","b","a"]: chain "bdca"->"bca"->"ba"->"b" by removing one char each time, length 4.' },
            { title: 'Longest Chain With Any Edit', difficulty: 'Hard', description: 'Word_i+1 can be formed from word_i by adding, removing, or replacing exactly one character. Find the longest chain where all words are in the given list.', whyDifferent: 'Expands the neighbor relationship from just insertion to three edit operations, dramatically increasing the number of potential predecessors to check at each step.', example: 'words=["a","ab","abc","adc","ad"]: chain could be "a"->"ab"->"abc" (add) or "a"->"ad"->"adc" (add). With replacement: "abc"->"adc" (replace b->d).' },
            { title: 'Count Longest String Chains', difficulty: 'Medium', description: 'Find how many distinct longest string chains exist in the word list.', whyDifferent: 'Adds counting on top of the optimization. You must track both the chain length and the number of chains achieving that length at each word.', example: 'words=["a","b","ba","bca","bda","bdca"]: longest chain length=4. Two chains: a->ba->bca->bdca and a->ba->bda->bdca. Count=2.' },
            { title: 'String Chain Forming Target', difficulty: 'Hard', description: 'Given a target word, find the longest chain from the word list that ends at the target word. All words in the chain must be in the list.', whyDifferent: 'Fixes the endpoint of the chain, requiring you to work backwards from the target and only consider predecessors that lead to it.', example: 'words=["a","b","ba","bca","bda","bdca"], target="bdca": longest chain ending at "bdca" is ["a","ba","bda","bdca"] with length 4.' },
            { title: 'Minimum Words to Bridge', difficulty: 'Hard', description: 'Given a start word and end word (both in the list), find the minimum number of intermediate words needed to form a valid string chain from start to end.', whyDifferent: 'Turns the problem into a shortest-path search in the chain graph rather than a longest-path DP. BFS or modified DP with source-target constraints is needed.', example: 'words=["a","ab","abc","abcd"], start="a", end="abcd": minimum chain is "a"->"ab"->"abc"->"abcd" needing 2 intermediates.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '14-longest-string-chain', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/14-longest-string-chain'] = problem;

})();
