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
        twists: [
            {
                title: 'BFS with Level Tracking',
                difficulty: 'Easy',
                description: 'Modify BFS to return nodes grouped by their level/depth. Instead of a flat list, return a list of lists where each inner list contains all nodes at that depth.',
                whyDifferent: 'Requires tracking when one level ends and the next begins. You must process the queue in batches (using queue size at each level) rather than node by node.',
                example: 'Same tree. Output: [["A"], ["B","C","D"], ["E","F","G","H"], ["I","J","K"]] instead of flat ["A","B","C","D","E","F","G","H","I","J","K"].'
            },
            {
                title: 'BFS on a Directed Graph with Unreachable Nodes',
                difficulty: 'Medium',
                description: 'Perform BFS on a directed graph starting from a given node. Some nodes may be unreachable. Return both the traversal order and the set of unreachable nodes.',
                whyDifferent: 'In a tree, all nodes are reachable from root. In a directed graph, some nodes may have no incoming path from the start. You must identify which nodes were never visited after BFS completes.',
                example: 'Directed graph: A->B, A->C, D->C. BFS from A: visited=[A,B,C], unreachable=[D].'
            },
            {
                title: 'Bidirectional BFS',
                difficulty: 'Hard',
                description: 'Given source and target in an undirected graph, perform BFS from both ends simultaneously. Stop when the two frontiers meet.',
                whyDifferent: 'Bidirectional BFS can dramatically reduce the search space from O(b^d) to O(b^(d/2)). You must manage two queues and two visited sets, alternating expansion between them.',
                example: 'Graph: A-B-C-D-E. Source=A, Target=E. Forward BFS: {A},{B}. Backward BFS: {E},{D}. Next forward: {C}. C is in backward frontier path -> found path A-B-C-D-E.'
            },
            {
                title: 'BFS on Adjacency Matrix',
                difficulty: 'Medium',
                description: 'Perform BFS where the graph is given as an adjacency matrix instead of a children/neighbor list. Return the traversal order.',
                whyDifferent: 'Finding neighbors requires scanning an entire row of the matrix rather than iterating a list. This changes the per-node processing time and makes you think about representation tradeoffs.',
                example: 'Matrix: [[0,1,1,0],[0,0,0,1],[0,0,0,1],[0,0,0,0]]. BFS from 0: [0,1,2,3]. Each neighbor lookup scans a full row.'
            },
            {
                title: 'DFS vs BFS Comparison',
                difficulty: 'Medium',
                description: 'Given the same tree, implement both DFS and BFS. Return both traversal orders and explain a scenario where one is clearly better than the other.',
                whyDifferent: 'Forces direct comparison of the two fundamental traversal strategies. You must reason about when depth-first exploration (memory-efficient for deep trees) beats breadth-first (optimal for shortest paths).',
                example: 'Tree with depth 1000 and branching factor 2: DFS uses O(1000) stack space, BFS uses O(2^1000) queue space. For finding shortest path, BFS is correct; DFS may find a long path first.'
            }
        ],
        similar: [
    { id: '02-breadth-first-search/02-breadth-first-search/01-level-order-traversal', name: 'Binary Tree Level Order Traversal', difficulty: 'Medium' },
    { id: '02-breadth-first-search/02-shortest-path-binary-matrix', name: 'Shortest Path in Binary Matrix', difficulty: 'Medium' },
    { id: '02-breadth-first-search/03-word-ladder', name: 'Word Ladder', difficulty: 'Hard' }
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
