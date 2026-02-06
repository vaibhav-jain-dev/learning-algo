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
        twists: [
            {
                title: 'Iterative DFS with Explicit Stack',
                difficulty: 'Easy',
                description: 'Implement the same DFS traversal but using an explicit stack instead of recursion. The output order must be identical to the recursive version.',
                whyDifferent: 'Forces you to think about how the call stack works and manually manage the traversal order. You must push children in reverse order to maintain left-to-right processing.',
                example: 'Same tree input produces the same output ["A","B","E","F","I","J","C","D","G","K","H"], but implemented with a while loop and stack.'
            },
            {
                title: 'DFS on a Directed Graph with Cycles',
                difficulty: 'Medium',
                description: 'Perform DFS on a general directed graph (not a tree) that may contain cycles. Return the traversal order without visiting any node twice.',
                whyDifferent: 'Unlike tree DFS, you need a visited set to avoid infinite loops. The mental model shifts from "tree branches" to "graph exploration with backtracking guards."',
                example: 'Graph: A->B, B->C, C->A, A->D. DFS from A: ["A","B","C","D"]. Without cycle detection, you would loop forever on A->B->C->A.'
            },
            {
                title: 'DFS with Entry and Exit Times',
                difficulty: 'Medium',
                description: 'Modify DFS to record the discovery time and finish time for each node. These timestamps are crucial for many advanced graph algorithms.',
                whyDifferent: 'Requires tracking global state (a timer) across recursive calls and understanding pre-order vs post-order processing. This is foundational for topological sort and SCC detection.',
                example: 'Tree A->[B,C]: discovery/finish times might be A(1/6), B(2/3), C(4/5).'
            },
            {
                title: 'DFS on an Adjacency Matrix',
                difficulty: 'Medium',
                description: 'Given the same graph represented as an adjacency matrix instead of a children list, perform DFS. The matrix is n x n where matrix[i][j] = 1 means an edge from i to j.',
                whyDifferent: 'Changes how you find neighbors - instead of iterating a list, you scan a row. This affects both the implementation pattern and the time complexity for sparse graphs.',
                example: 'Matrix: [[0,1,1],[0,0,0],[0,0,0]] represents A->B, A->C. DFS from A: [A,B,C].'
            },
            {
                title: 'Bidirectional DFS',
                difficulty: 'Hard',
                description: 'Given a source and target in an undirected graph, run DFS simultaneously from both ends. Detect when the two searches meet to find a connecting path.',
                whyDifferent: 'You must manage two separate DFS states and a meeting condition. This is rarely done with DFS (BFS is more natural for bidirectional search), so it challenges your understanding of DFS limitations.',
                example: 'Graph: A-B-C-D-E. Source=A, Target=E. Forward DFS explores A,B,C while backward DFS explores E,D,C. They meet at C.'
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
