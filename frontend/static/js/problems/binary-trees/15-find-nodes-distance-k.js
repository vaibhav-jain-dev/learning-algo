/**
 * Find Nodes Distance K
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Nodes Distance K',
        difficulty: 'Hard',
        algorithm: 'tree-distance',
        description: 'Write a function that takes in a binary tree, a target node contained in the tree, and a positive integer k. The function should return a list of all nodes that are exactly k distance away from the target node. The distance between two nodes is defined as the number of edges that must be traversed to go from one node to the other. The returned list can be in any order.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 5,
                                "left": {
                                        "value": 7
                                },
                                "right": {
                                        "value": 8
                                }
                        }
                },
                "right": {
                        "value": 3,
                        "right": {
                                "value": 6
                        }
                }
        },
        "target": 5,
        "k": 2
},
        output: [1, 4],
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5, \'left\': {\'value\': 7}, \'right\': {\'value\': 8}}}, \'right\': {\'value\': 3, \'right\': {\'value\': 6}}}, target=5, k=2, the result is [1, 4].'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2
                },
                "right": {
                        "value": 3
                }
        },
        "target": 1,
        "k": 1
},
        output: [2, 3],
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2}, \'right\': {\'value\': 3}}, target=1, k=1, the result is [2, 3].'
    }
        ],
        twists: [
            {
                title: 'Nodes at Distance K from All Leaves',
                difficulty: 'Hard',
                description: 'Find all nodes that are exactly distance k from every leaf node in the tree. A node qualifies only if its distance to ALL leaves equals k.',
                whyDifferent: 'The original finds nodes at distance k from one target. This requires checking the distance to ALL leaves, which means you need the minimum and maximum leaf distances for each node and only include nodes where both equal k.',
                example: 'Tree [1, 2, 3, 4, 5, 6, 7], k=1. Leaves are 4,5,6,7. Nodes at distance 1 from all leaves: none (node 2 is distance 1 from 4,5 but distance 2+ from 6,7).'
            },
            {
                title: 'Sum of Nodes at Distance K',
                difficulty: 'Medium',
                description: 'Instead of returning the list of nodes at distance k from the target, return the sum of their values.',
                whyDifferent: 'While the core algorithm is the same, the aggregation changes. This tests whether your approach cleanly separates the "find nodes" step from the "collect results" step.',
                example: 'Tree [1, 2, 3, 4, 5, 6, 7], target=2, k=2. Nodes at distance 2: [1 (up to 1, but that is distance 1)... actually 6, 7 via path 2->1->3->6 and 2->1->3->7]. Wait: 4,5 are distance 1, 1 is distance 1, 3 is distance 2, 6 is distance 3. Actually nodes at distance 2 from 2: node 3 and nodes... Let me recalculate. From target 2: distance 0=2, distance 1=4,5,1, distance 2=3, distance 3=6,7. So distance 2 gives [3], sum=3.'
            },
            {
                title: 'Closest Node to Target',
                difficulty: 'Medium',
                description: 'Given a target node and a set of special nodes, find which special node is closest to the target (minimum distance).',
                whyDifferent: 'Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes. This requires BFS from the target, stopping at the first special node encountered.',
                example: 'Tree [1, 2, 3, 4, 5, 6, 7], target=4, special nodes={6, 7}. Distance from 4 to 6: 4->2->1->3->6 = 4. Distance from 4 to 7: 4->2->1->3->7 = 4. Closest is either 6 or 7 at distance 4.'
            },
            {
                title: 'Nodes at Distance K in a Graph',
                difficulty: 'Hard',
                description: 'The same problem but the input is a general undirected graph (not a tree). Find all nodes at distance exactly k from a given source node.',
                whyDifferent: 'In a tree, there is exactly one path between any two nodes. In a graph with cycles, BFS naturally handles this, but you must track visited nodes to avoid infinite loops. The parent-mapping step from the tree version becomes unnecessary since the graph already has explicit edges.',
                example: 'Graph: edges [(1,2), (2,3), (3,4), (1,4)]. Source=1, k=2. BFS from 1: distance 0={1}, distance 1={2,4}, distance 2={3}. Answer: [3].'
            },
            {
                title: 'All Pairs Distance K',
                difficulty: 'Very Hard',
                description: 'Find all pairs of nodes (a, b) in the tree such that the distance between a and b is exactly k. Return the count of such pairs.',
                whyDifferent: 'This generalizes from one target to all possible targets. A naive approach runs BFS from each node (O(n^2)). An optimized approach uses the Euler tour or centroid decomposition for O(n log n) complexity.',
                example: 'Tree [1, 2, 3, 4, 5], k=2. Pairs at distance 2: (4,5), (4,1), (5,1), (2,3). Count = 4.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k'] = problem;

})();
