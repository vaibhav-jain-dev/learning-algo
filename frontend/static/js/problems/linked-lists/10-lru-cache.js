/**
 * LRU Cache
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-lru-cache
 */
(function() {
    'use strict';

    const problem = {
        name: 'LRU Cache',
        difficulty: 'Hard',
        algorithm: 'll-lru-cache',
        description: 'Implement an LRUCache (Least Recently Used Cache) class that supports the following operations: - LRUCache(int maxSize): Initialize the cache with a maximum capacity - int get(String key): Return the value associated with the key, or -1 if the key doesn\'t exist. Accessing a key makes it the most recently used. - void put(String key, int value): Insert or update the value for the key. If the cache reaches capacity, evict the least recently used item before inserting. Inserting/updating makes the .',
        problem: 'Traverse the linked list with appropriate pointer management. Keep track of previous, current, and next nodes as needed. Be careful to update pointers in the correct order to avoid losing references. This achieves O(1) for get and put time with O(capacity) space.',
        hints: [
            'Think about what pointers you need to maintain as you traverse the list.',
            'The runner technique (slow and fast pointers) solves many linked list problems.',
            'Be careful about edge cases: empty list, single node, and the head/tail nodes.',
            'Draw out the pointer changes step by step before coding to avoid losing references.'
        ],

        complexity: {
            time: 'O(1) for get and put',
            space: 'O(capacity)'
        },
        examples: [
    {
        input: {
        "capacity": 3,
        "operations": [
                [
                        "put",
                        "a",
                        1
                ],
                [
                        "put",
                        "b",
                        2
                ],
                [
                        "put",
                        "c",
                        3
                ],
                [
                        "get",
                        "a"
                ],
                [
                        "put",
                        "d",
                        4
                ],
                [
                        "get",
                        "b"
                ],
                [
                        "get",
                        "c"
                ],
                [
                        "put",
                        "e",
                        5
                ]
        ]
},
        output: {"get_a": 1, "get_b": -1, "get_c": 3, "finalCache": ["d", "c", "e"]},
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    }
        ],
        twists: [
            { id: '10-lru-cache/twist-01-lfu-cache-least-frequently-used', name: 'LFU Cache (Least Frequently Used)', difficulty: 'Very Hard' },
            { id: '10-lru-cache/twist-02-lru-cache-with-ttl', name: 'LRU Cache With TTL', difficulty: 'Hard' },
            { id: '10-lru-cache/twist-03-lru-cache-with-size-based-eviction', name: 'LRU Cache With Size-Based Eviction', difficulty: 'Hard' },
            { id: '10-lru-cache/twist-04-thread-safe-lru-cache', name: 'Thread-Safe LRU Cache', difficulty: 'Very Hard' },
            { id: '10-lru-cache/twist-05-lru-cache-without-doubly-linked-list', name: 'LRU Cache Without Doubly Linked List', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '10-lru-cache', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/10-lru-cache'] = problem;

})();
