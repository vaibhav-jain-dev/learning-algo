/**
 * Boggle Board
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-word-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Boggle Board',
        difficulty: 'Hard',
        algorithm: 'graph-word-search',
        description: 'You\'re given a two-dimensional array (a matrix) of potentially unequal height and width containing letters; this matrix represents a boggle board. You\'re also given a list of words. Write a function that returns an array of all the words contained in the boggle board. The final words don\'t need to be in any particular order. A word is constructed in the boggle board by connecting adjacent (horizontally, vertically, or diagonally) letters, without using any single letter at a given position more ',
        complexity: {
            time: 'O(N * M * 8^L + W * L)',
            space: 'O(W * L + N * M)'
        },
        examples: [
    {
        input: {
        "board": [
                [
                        "t",
                        "h",
                        "i",
                        "s"
                ],
                [
                        "w",
                        "a",
                        "t",
                        "s"
                ],
                [
                        "o",
                        "a",
                        "h",
                        "g"
                ],
                [
                        "f",
                        "g",
                        "d",
                        "t"
                ]
        ],
        "words": [
                "this",
                "two",
                "fat",
                "that"
        ]
},
        output: ["this", "two", "fat", "that"],
        explanation: 'Exploring the graph structure, we find the required path or value. For input board=[[\'t\', \'h\', \'i\', \'s\'], [\'w\', \'a\', \'t\', \'s\'], [\'o\', \'a\', \'h\', \'g\'], [\'f\', \'g\', \'d\', \'t\']], words=[this, two, fat, that], the result is [\'this\', \'two\', \'fat\', \'that\'].'
    },
    {
        input: {
        "board": [
                [
                        "a",
                        "b"
                ],
                [
                        "c",
                        "d"
                ]
        ],
        "words": [
                "abcd",
                "abdc",
                "abca"
        ]
},
        output: ["abcd", "abdc"],
        explanation: 'Exploring the graph structure, we find the required path or value. For input board=[[\'a\', \'b\'], [\'c\', \'d\']], words=[abcd, abdc, abca], the result is [\'abcd\', \'abdc\'].'
    }
        ],
        twists: [
            { title: 'No Diagonal Connections', difficulty: 'Easy', description: 'Letters can only connect horizontally and vertically (4 directions), not diagonally. Find all words.', whyDifferent: 'Reducing from 8 to 4 neighbors changes which words are findable. Paths that relied on diagonal connections break, requiring re-evaluation of word reachability.', example: 'Word "cat" needs c-a-t connected. With diagonals, c at (0,0) reaches a at (1,1). Without diagonals, they must be horizontally or vertically adjacent.' },
            { title: 'Reuse Letters', difficulty: 'Medium', description: 'A letter at a given position can be used multiple times in the same word. Find all words constructible this way.', whyDifferent: 'Without the visited constraint, the search space explodes. You no longer need a visited set, but must limit search depth to word length to avoid infinite loops.', example: 'Board [[a,b],[c,d]]. Word "aba" is possible by visiting (0,0)->(0,1)->(0,0). Not possible in original problem.' },
            { title: 'Longest Word Found', difficulty: 'Medium', description: 'Among all words found in the board, return only the longest one. If tied, return any.', whyDifferent: 'You need to track word length during search and only retain the longest match. Trie pruning can be optimized to skip short words early.', example: 'Found words: "this" (4), "that" (4), "two" (3). Return "this" or "that" (length 4).' },
            { title: 'Word Search II with Trie', difficulty: 'Hard', description: 'Implement using a Trie (prefix tree) for efficient multi-word search. Prune branches that cannot lead to any word.', whyDifferent: 'Instead of searching for each word independently, build a Trie and search all words simultaneously. Trie pruning eliminates dead-end paths early, dramatically improving performance.', example: 'Words: ["oath","pea","eat","rain"]. Build Trie, then DFS from each cell following Trie nodes. Remove found words from Trie for further pruning.' },
            { title: 'Count Word Occurrences', difficulty: 'Hard', description: 'For each word, count how many distinct paths on the board can spell it.', whyDifferent: 'Finding one path per word uses early termination. Counting all paths requires exhaustive search without stopping at the first match, significantly increasing computation.', example: 'Word "ab" on board [[a,b],[a,b]]. Can be spelled via (0,0)-(0,1), (0,0)-(1,1), (1,0)-(0,1), (1,0)-(1,1). Count: 4.' },
            { title: 'Board with Wildcards', difficulty: 'Hard', description: 'Some cells contain a wildcard character that matches any letter. Find all words considering wildcards.', whyDifferent: 'At wildcard cells, every letter matches, branching the Trie traversal into multiple children simultaneously. The search becomes significantly wider at wildcard positions.', example: 'Board [[*,h],[a,t]]. Wildcard * matches any letter. Words "hat", "that" become findable depending on Trie structure.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '12-boggle-board', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/12-boggle-board'] = problem;

})();
