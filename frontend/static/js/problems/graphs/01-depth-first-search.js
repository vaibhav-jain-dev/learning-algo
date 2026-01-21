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
        problem: 'DFS explores as far as possible along each branch before backtracking. For a tree, start at the root, add its name to the result, then recursively visit each child from left to right. The recursion naturally handles the "go deep first" behavior. You can also implement it iteratively using a stack, pushing children in reverse order so the leftmost child is processed first.',
        hints: [
            'DFS visits nodes by going as deep as possible before backtracking. Think about the order: parent first, then all descendants of the first child, then all descendants of the second child, etc.',
            'Recursion naturally implements DFS - the call stack handles the backtracking for you.',
            'For each node: add its name to the result, then recursively process each child from left to right.',
            'If implementing iteratively, use a stack. Push children in reverse order so the leftmost child is popped first.'
        ],
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
                        {"name": "B", "children": [{"name": "E"}, {"name": "F", "children": [{"name": "I"}, {"name": "J"}]}]},
                        {"name": "C"},
                        {"name": "D", "children": [{"name": "G", "children": [{"name": "K"}]}, {"name": "H"}]}
                ]
        }
        },
        output: ["A", "B", "E", "F", "I", "J", "C", "D", "G", "K", "H"],
        explanation: 'Start at A, go to first child B, then B\'s first child E (leaf, backtrack), then F, then F\'s children I and J (backtrack to B, backtrack to A), then C (leaf), then D, then G, then K (backtrack), then H. The traversal goes deep before wide.'
    }
        ],
        similar: [
    { id: '01-depth-first-search/01-number-of-islands', name: 'Number of Islands', difficulty: 'Medium' },
    { id: '01-depth-first-search/02-clone-graph', name: 'Clone Graph', difficulty: 'Medium' },
    { id: '01-depth-first-search/03-all-paths-source-target', name: 'All Paths From Source to Target', difficulty: 'Medium' }
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
