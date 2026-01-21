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
        problem: 'BFS explores nodes level by level using a queue. Start by adding the root to the queue. While the queue is not empty: dequeue a node, add its name to results, and enqueue all its children. The queue ensures nodes are processed in the order they were discovered, giving level-by-level traversal.',
        hints: [
            'BFS visits all nodes at depth d before visiting nodes at depth d+1. What data structure naturally gives this behavior?',
            'A queue (FIFO) processes nodes in the order they were added, perfect for level-order traversal.',
            'Start with the root in the queue. For each node: process it, then add all its children to the queue.',
            'When you dequeue a node, its children go to the back of the queue, so they\'re processed after all current-level nodes.'
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
        output: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
        explanation: 'Level 0: A. Level 1: B, C, D (A\'s children). Level 2: E, F, G, H (children of B and D). Level 3: I, J, K (children of F and G). The queue ensures we finish each level before moving deeper.'
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
