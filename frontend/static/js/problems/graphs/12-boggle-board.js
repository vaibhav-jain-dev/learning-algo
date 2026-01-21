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
