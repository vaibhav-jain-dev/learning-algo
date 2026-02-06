/**
 * Rearrange Linked List
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-rearrange
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rearrange Linked List',
        difficulty: 'Hard',
        algorithm: 'll-rearrange',
        description: 'Write a function that takes in the head of a Singly Linked List and an integer k, rearranges the list in place (i.e., doesn\'t create a brand new list) around nodes with value k, and returns its new head. Rearranging a Linked List around nodes with value k means: 1. All nodes with a value smaller than k come before nodes with value k 2. All nodes with a value equal to k come in the middle 3. All nodes with a value greater than k come after nodes with value k The relative order of nodes within eac',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [
                3,
                0,
                5,
                2,
                1,
                4
        ],
        "k": 3
},
        output: [0, 2, 1, 3, 5, 4],
        explanation: 'Processing the input data produces the output. For input list=[3, 0, ..., 4] (length 6), k=3, the result is [0, ..., 4] (length 6).'
    },
    {
        input: {
        "list": [
                1,
                4,
                3,
                2,
                5,
                2
        ],
        "k": 3
},
        output: [1, 2, 2, 3, 4, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 4, ..., 2] (length 6), k=3, the result is [1, ..., 5] (length 6).'
    },
    {
        input: {
        "list": [
                5,
                1,
                8,
                0,
                3
        ],
        "k": 3
},
        output: [1, 0, 3, 5, 8],
        explanation: 'Processing the input data produces the output. For input list=[5, 1, 8, 0, 3], k=3, the result is [1, 0, 3, 5, 8].'
    }
        ],
        twists: [
            { title: 'Four-Way Partition', difficulty: 'Hard', description: 'Partition the list into four groups: values less than a, values equal to a, values between a and b, values greater than or equal to b. Maintain relative order in each group.', whyDifferent: 'Extends from three partitions to four, requiring four separate sub-lists that must be concatenated in order, with more boundary conditions to manage.', example: 'list=[5,1,8,3,7,2,6], a=3, b=7: groups are [<3]=[1,2], [=3]=[3], [3<x<7]=[5,6], [>=7]=[8,7]. Result=[1,2,3,5,6,8,7].' },
            { title: 'Partition Preserving Absolute Order', difficulty: 'Medium', description: 'Rearrange the list around value k, but the output must have all three groups (less, equal, greater) individually sorted in ascending order.', whyDifferent: 'Adds a sorting requirement within each partition, requiring either sorted insertion or post-partition sorting of each group before concatenation.', example: 'list=[3,0,5,2,1,4], k=3: less sorted=[0,1,2], equal=[3], greater sorted=[4,5]. Result=[0,1,2,3,4,5].' },
            { title: 'Partition Around Median', difficulty: 'Hard', description: 'Rearrange the list around its median value (the middle value if sorted). First find the median, then partition around it.', whyDifferent: 'Requires finding the median of a linked list first (no random access), then using it as the pivot. Finding the median requires sorting or a selection algorithm.', example: 'list=[3,0,5,2,1,4]: sorted is [0,1,2,3,4,5], median is 2 or 3. Partition around 3: result=[0,2,1,3,5,4].' },
            { title: 'Dutch National Flag on Linked List', difficulty: 'Medium', description: 'The list contains only values 0, 1, and 2. Sort it in O(n) time and O(1) space by partitioning into three groups (all 0s, then 1s, then 2s).', whyDifferent: 'A constrained version of the partition problem with exactly three known values. Can use three pointer heads and append each node to the appropriate list.', example: 'list=[2,0,1,2,1,0]: rearrange to [0,0,1,1,2,2].' },
            { title: 'Stable Partition With Multiple Pivots', difficulty: 'Very Hard', description: 'Given a list of pivot values [p1, p2, ..., pm] in sorted order, partition the list into m+1 groups maintaining relative order within each group.', whyDifferent: 'Generalizes from one pivot to multiple, requiring m+1 sub-lists and binary search or linear scan to classify each node into the correct group.', example: 'list=[7,2,5,1,8,3,6,4], pivots=[3,6]: groups are [<=3]=[2,1,3], [4-6]=[5,6,4], [>6]=[7,8]. Result=[2,1,3,5,6,4,7,8].' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '11-rearrange-linked-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/11-rearrange-linked-list'] = problem;

})();
