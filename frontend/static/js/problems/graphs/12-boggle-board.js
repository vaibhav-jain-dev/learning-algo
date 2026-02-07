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
        description: 'You\'re given a two-dimensional array (a matrix) of potentially unequal height and width containing letters; this matrix represents a boggle board. You\'re also given a list of words. Write a function that returns an array of all the words contained in the boggle board. The final words don\'t need to be in any particular order. A word is constructed in the boggle board by connecting adjacent (horizontally, vertically, or diagonally) letters, without using any single letter at a given position more .',
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(N * M * 8^L + W * L) time with O(W * L + N * M) space.',
        hints: [
            'Choose the right graph representation: adjacency list vs adjacency matrix.',
            'Consider whether the graph is directed or undirected, weighted or unweighted.',
            'Track visited nodes to handle cycles and avoid infinite loops.',
            'Think about which graph traversal algorithm best fits this problem: DFS, BFS, or something else.'
        ],

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
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
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
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        twists: [
            { id: '12-boggle-board/twist-01-no-diagonal-connections', name: 'No Diagonal Connections', difficulty: 'Easy' },
            { id: '12-boggle-board/twist-02-reuse-letters', name: 'Reuse Letters', difficulty: 'Medium' },
            { id: '12-boggle-board/twist-03-longest-word-found', name: 'Longest Word Found', difficulty: 'Medium' },
            { id: '12-boggle-board/twist-04-word-search-ii-with-trie', name: 'Word Search II with Trie', difficulty: 'Hard' },
            { id: '12-boggle-board/twist-05-count-word-occurrences', name: 'Count Word Occurrences', difficulty: 'Hard' },
            { id: '12-boggle-board/twist-06-board-with-wildcards', name: 'Board with Wildcards', difficulty: 'Hard' }
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
