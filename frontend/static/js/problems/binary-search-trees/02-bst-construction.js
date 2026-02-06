/**
 * BST Construction
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Construction',
        difficulty: 'Medium',
        algorithm: 'bst-construction',
        description: 'Write a BST class for a Binary Search Tree. The class should support: - Inserting values with the insert method - Checking if values are contained with the contains method - Removing values with the remove method (with proper handling of all cases) Note that you can\'t remove values that aren\'t in the tree.',
        complexity: {
            time: 'O(log n) average, O(n) worst',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "tree": [
                10,
                5,
                15,
                2,
                5,
                null,
                22,
                1
        ],
        "operations": [
                "insert(12)",
                "remove(10)",
                "contains(15)"
        ]
},
        output: [true, true, true],
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 1] (length 8), operations=[insert(12), remove(10), contains(15)], the result is [True, True, True].'
    }
        ],
        twists: [
            {
                title: 'Self-Balancing BST (AVL Insert/Remove)',
                difficulty: 'Very Hard',
                description: 'Extend the BST class to maintain AVL balance. After each insert or remove, perform rotations to ensure the height difference between left and right subtrees is at most 1.',
                whyDifferent: 'Standard BST operations ignore balance. AVL requires tracking height at each node, detecting imbalance, and performing single or double rotations -- a fundamentally more complex state management problem.',
                example: 'Insert sequence [1,2,3] into AVL: after inserting 3, left-rotate at 1 to get balanced tree [2,1,3].'
            },
            {
                title: 'BST with Rank (Order Statistics)',
                difficulty: 'Hard',
                description: 'Augment the BST so each node stores the size of its subtree. Support an additional operation: findKthSmallest(k) in O(h) time.',
                whyDifferent: 'Requires maintaining subtree sizes during insert and remove, and using those sizes to navigate directly to the kth element without full traversal. Every mutation must update sizes along the path.',
                example: 'Tree: [10,5,15,2,7], findKthSmallest(3) -> 7. Insert 6, findKthSmallest(3) -> 6.'
            },
            {
                title: 'Persistent BST',
                difficulty: 'Very Hard',
                description: 'Implement insert and remove so that previous versions of the tree are preserved. Each mutation returns a new root while keeping the old tree intact via path copying.',
                whyDifferent: 'Instead of mutating nodes in place, you create new nodes along the insertion/deletion path, sharing unchanged subtrees. This is a fundamentally different memory and pointer management pattern.',
                example: 'v1 = insert(null, 5), v2 = insert(v1, 3). v1 still has only node 5. v2 has nodes 5 and 3.'
            },
            {
                title: 'BST with Lazy Deletion',
                difficulty: 'Medium',
                description: 'Instead of physically removing nodes, mark them as deleted. Modify contains to skip deleted nodes. Implement a compact() method that rebuilds the tree without deleted nodes.',
                whyDifferent: 'Lazy deletion changes how you reason about tree validity and traversal. Contains must check the deleted flag, and the tree can accumulate garbage that affects performance until compaction.',
                example: 'Insert [10,5,15], remove(5) marks 5 as deleted. contains(5) returns false. Tree still has 3 nodes until compact().'
            },
            {
                title: 'Thread-Safe BST',
                difficulty: 'Hard',
                description: 'Design the BST class to handle concurrent insert, remove, and contains operations. Multiple readers can proceed simultaneously, but writers need exclusive access to affected subtrees.',
                whyDifferent: 'Concurrency introduces race conditions. You must think about locking granularity -- locking the whole tree is simple but slow, while fine-grained node-level locking requires careful deadlock avoidance during rotations and removals.',
                example: 'Thread A inserts 5, Thread B inserts 3 simultaneously. Both must complete correctly without corrupting the tree structure.'
            },
            {
                title: 'BST Remove Without Finding Minimum',
                difficulty: 'Medium',
                description: 'Implement remove where, instead of replacing with the inorder successor (minimum of right subtree), you randomly choose between predecessor and successor to maintain better balance statistically.',
                whyDifferent: 'The standard approach always pulls from one side, potentially creating imbalanced trees over many deletions. Randomized choice requires implementing both predecessor and successor finding and introduces probabilistic thinking.',
                example: 'Remove 10 from [10,5,15,2,7,12,20]: randomly choose either 7 (predecessor) or 12 (successor) as replacement.'
            }
        ],
        similar: [
    { id: '02-bst-construction/02-bst-construction/01-bst-iterator', name: 'BST Iterator', difficulty: 'Medium' },
    { id: '02-bst-construction/02-convert-sorted-array-to-bst', name: 'Convert Sorted Array to BST', difficulty: 'Medium' },
    { id: '02-bst-construction/03-serialize-deserialize-bst', name: 'Serialize and Deserialize BST', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction'] = problem;

})();
