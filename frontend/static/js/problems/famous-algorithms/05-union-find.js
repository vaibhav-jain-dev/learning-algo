/**
 * Disjoint Set Union
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
 */
(function() {
    'use strict';

    const problem = {
        name: 'Disjoint Set Union',
        difficulty: 'Medium',
        algorithm: 'union-find',
        description: 'Implement a Union-Find data structure (also known as Disjoint Set Union or DSU) that supports the following operations: 1. **Find(x)**: Determine which set element x belongs to (returns the representative/root) 2. **Union(x, y)**: Merge the sets containing elements x and y The data structure should be optimized with: - **Path Compression**: Flatten the tree during Find operations - **Union by Rank/Size**: Always attach the smaller tree under the larger one',
        complexity: {
            time: 'O(alpha(n))',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 5,
        "operations": [
                "union(0,1)",
                "union(2,3)",
                "union(1,3)",
                "find(0)==find(3)?",
                "find(0)==find(4)?"
        ]
},
        output: {"disjointSets": 2, "find03": true, "find04": false},
        explanation: 'Processing the input data produces the output. For input n=5, operations=[union(0,1), union(2,3), union(1,3), find(0)==find(3)?, find(0)==find(4)?], the result is {\'disjointSets\': 2, \'find03\': True, \'find04\': False}.'
    }
        ],
        twists: [
            { title: 'Union-Find with Delete', difficulty: 'Very Hard', description: 'Extend the Union-Find structure to support a Delete(x) operation that removes element x from its current set.', whyDifferent: 'Standard Union-Find has no delete operation. You need a technique like virtual nodes or lazy deletion with re-mapping to handle removals without breaking the tree structure.', example: 'After union(0,1), union(1,2): sets are {0,1,2}. After delete(1): sets become {0,2} and {1} is isolated.' },
            { title: 'Weighted Union-Find', difficulty: 'Hard', description: 'Each edge in the union has a weight/distance. Find(x) returns the distance from x to its root, and you can query the distance between any two elements in the same set.', whyDifferent: 'Path compression must propagate weights along compressed paths, requiring careful weight accumulation during the find operation.', example: 'Union(0,1,weight=3), union(1,2,weight=5). Distance from 0 to 2 is 8. Path compression must preserve these distances.' },
            { title: 'Rollback Union-Find', difficulty: 'Very Hard', description: 'Support an undo operation that reverses the most recent union, restoring the previous state.', whyDifferent: 'Path compression is destructive and prevents rollback. You must use union-by-rank WITHOUT path compression, and maintain a stack of operations for undo.', example: 'Union(0,1), union(2,3), undo() restores the state before union(2,3) was performed.' },
            { title: 'Dynamic Connectivity', difficulty: 'Hard', description: 'Support both union and disconnect operations in a graph, answering connectivity queries online.', whyDifferent: 'Standard Union-Find only supports unions (monotonically joining). Supporting disconnects requires entirely different data structures like link-cut trees or offline algorithms.', example: 'Add edge (0,1), add edge (1,2), query connected(0,2)=true, remove edge (1,2), query connected(0,2)=false.' },
            { title: 'Count Components Online', difficulty: 'Medium', description: 'Maintain a running count of connected components as union operations are performed, returning the count after each operation.', whyDifferent: 'Adds a component counter that decrements only when a union actually merges two different sets, requiring checking the return value of each union.', example: 'Start with 5 components. Union(0,1) -> 4 components. Union(0,1) again -> still 4. Union(2,3) -> 3 components.' }
        ],
        similar: [
    { id: '05-union-find/01-number-of-provinces', name: 'Number of Provinces', difficulty: 'Medium' },
    { id: '05-union-find/02-redundant-connection', name: 'Redundant Connection', difficulty: 'Medium' },
    { id: '05-union-find/03-accounts-merge', name: 'Accounts Merge', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '05-union-find', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find'] = problem;

})();
