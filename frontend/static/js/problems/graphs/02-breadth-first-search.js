/**
 * Breadth First Search
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Breadth First Search',
        difficulty: 'Easy',
        algorithm: 'graph-bfs',
        description: 'You\'re given a Node class that has a name and an array of optional children nodes. Implement the breadthFirstSearch method on the Node class, which takes in an empty array, traverses the tree using the Breadth-first Search approach, stores all of the nodes\' names in the input array, and returns it.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
    {
        input: {
        "tree": {
                "name": "A",
                "children": [
                        {
                                "name": "B",
                                "children": [
                                        {
                                                "name": "E"
                                        },
                                        {
                                                "name": "F",
                                                "children": [
                                                        {
                                                                "name": "I"
                                                        },
                                                        {
                                                                "name": "J"
                                                        }
                                                ]
                                        }
                                ]
                        },
                        {
                                "name": "C"
                        },
                        {
                                "name": "D",
                                "children": [
                                        {
                                                "name": "G",
                                                "children": [
                                                        {
                                                                "name": "K"
                                                        }
                                                ]
                                        },
                                        {
                                                "name": "H"
                                        }
                                ]
                        }
                ]
        }
},
        output: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'name\': \'A\', \'children\': [{\'name\': \'B\', \'children\': [{\'name\': \'E\'}, {\'name\': \'F\', \'children\': [{\'name\': \'I\'}, {\'name\': \'J\'}]}]}, {\'name\': \'C\'}, {\'name\': \'D\', \'children\': [{\'name\': \'G\', \'children\': [{\'name\': \'K\'}]}, {\'name\': \'H\'}]}]}, the result is [A, ..., K] (length 11).'
    }
        ],
        similar: [
    { id: '01-level-order-traversal', name: 'Binary Tree Level Order Traversal', difficulty: 'Medium' },
    { id: '02-shortest-path-binary-matrix', name: 'Shortest Path in Binary Matrix', difficulty: 'Medium' },
    { id: '03-word-ladder', name: 'Word Ladder', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search'] = problem;

})();
