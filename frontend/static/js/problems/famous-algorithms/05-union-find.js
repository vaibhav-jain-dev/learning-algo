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
            { id: '05-union-find/twist-01-union-find-with-delete', name: 'Union-Find with Delete', difficulty: 'Very Hard' },
            { id: '05-union-find/twist-02-weighted-union-find', name: 'Weighted Union-Find', difficulty: 'Hard' },
            { id: '05-union-find/twist-03-rollback-union-find', name: 'Rollback Union-Find', difficulty: 'Very Hard' },
            { id: '05-union-find/twist-04-dynamic-connectivity', name: 'Dynamic Connectivity', difficulty: 'Hard' },
            { id: '05-union-find/twist-05-count-components-online', name: 'Count Components Online', difficulty: 'Medium' }
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
