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
        description: 'Implement an LRUCache (Least Recently Used Cache) class that supports the following operations: - LRUCache(int maxSize): Initialize the cache with a maximum capacity - int get(String key): Return the value associated with the key, or -1 if the key doesn\'t exist. Accessing a key makes it the most recently used. - void put(String key, int value): Insert or update the value for the key. If the cache reaches capacity, evict the least recently used item before inserting. Inserting/updating makes the ',
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
        explanation: 'Processing the input data produces the output. For input capacity=3, operations=[[\'put\', \'a\', 1], [\'put\', \'b\', 2], ..., [\'put\', \'e\', 5]] (length 8), the result is {\'get_a\': 1, \'get_b\': -1, \'get_c\': 3, \'finalCache\': [\'d\', \'c\', \'e\']}.'
    }
        ],
        twists: [
            { title: 'LFU Cache (Least Frequently Used)', difficulty: 'Very Hard', description: 'Implement an LFU Cache where the eviction policy removes the least frequently used item. If there is a tie in frequency, evict the least recently used among those.', whyDifferent: 'Requires tracking access frequency per key and maintaining frequency-ordered buckets. The data structure changes from a single doubly-linked list to frequency-mapped lists.', example: 'capacity=2: put(1,1), put(2,2), get(1), put(3,3). Key 1 has freq 2, key 2 has freq 1. Evict key 2 (least frequent). Cache: {1:1, 3:3}.' },
            { title: 'LRU Cache With TTL', difficulty: 'Hard', description: 'Each cache entry has a time-to-live (TTL). Entries expire after their TTL and should be treated as non-existent. Implement get and put with TTL support.', whyDifferent: 'Adds a temporal dimension. Each access must check if the entry has expired, and you may need lazy deletion or a background cleanup mechanism.', example: 'put("a", 1, ttl=5s), put("b", 2, ttl=10s). After 6 seconds: get("a") returns -1 (expired), get("b") returns 2 (still valid).' },
            { title: 'LRU Cache With Size-Based Eviction', difficulty: 'Hard', description: 'Instead of a fixed number of items, the cache has a byte-size limit. Each value has a size in bytes. Evict LRU items until there is room for the new item.', whyDifferent: 'A single put might require evicting multiple items. The eviction loop continues until enough space is freed, adding a while-loop eviction pattern.', example: 'capacity=10 bytes. put("a", val, size=4), put("b", val, size=4), put("c", val, size=5): must evict "a" (4 bytes) to make room for "c".' },
            { title: 'Thread-Safe LRU Cache', difficulty: 'Very Hard', description: 'Design the LRU cache to be safe for concurrent access by multiple threads. Consider locking strategies for get and put operations.', whyDifferent: 'Requires synchronization primitives (mutexes, read-write locks) to prevent race conditions. The performance tradeoff between coarse-grained and fine-grained locking becomes a key design decision.', example: 'Thread 1 calls get("a") while Thread 2 calls put("b",2). Without locking, the linked list pointers could become corrupted during simultaneous modifications.' },
            { title: 'LRU Cache Without Doubly Linked List', difficulty: 'Hard', description: 'Implement the LRU cache using only a hash map and a singly linked list (no prev pointers). Maintain O(1) operations.', whyDifferent: 'Without prev pointers, removing a node from the middle requires O(n) traversal unless you store the predecessor in the hash map, forcing a different mapping strategy.', example: 'Store hash[key] = predecessor_node instead of the node itself. This lets you delete in O(1) by accessing the predecessor directly.' }
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
