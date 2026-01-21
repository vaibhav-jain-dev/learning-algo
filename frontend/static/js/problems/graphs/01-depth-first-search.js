/**
 * Depth First Search
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Depth First Search',
        difficulty: 'Easy',
        algorithm: 'graph-dfs',
        description: 'You\'re given a Node class that has a name and an array of optional children nodes. Implement the depthFirstSearch method on the Node class, which takes in an empty array, traverses the tree using the Depth-first Search approach (specifically navigating the tree from left to right), stores all of the nodes\' names in the input array, and returns it.',
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
        output: ["A", "B", "E", "F", "I", "J", "C", "D", "G", "K", "H"],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'name\': \'A\', \'children\': [{\'name\': \'B\', \'children\': [{\'name\': \'E\'}, {\'name\': \'F\', \'children\': [{\'name\': \'I\'}, {\'name\': \'J\'}]}]}, {\'name\': \'C\'}, {\'name\': \'D\', \'children\': [{\'name\': \'G\', \'children\': [{\'name\': \'K\'}]}, {\'name\': \'H\'}]}]}, the result is [A, ..., H] (length 11).'
    }
        ],
        similar: [
    { id: '01-number-of-islands', name: 'Number of Islands', difficulty: 'Medium' },
    { id: '02-clone-graph', name: 'Clone Graph', difficulty: 'Medium' },
    { id: '03-all-paths-source-target', name: 'All Paths From Source to Target', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search'] = problem;

})();
