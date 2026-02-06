/**
 * LRU Cache Without Doubly Linked List
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-lru-cache
 * Parent: 10-lru-cache
 */
(function() {
    'use strict';

    const problem = {
        name: 'LRU Cache Without Doubly Linked List',
        difficulty: 'Hard',
        algorithm: 'll-lru-cache',
        parent: '10-lru-cache',
        description: 'Implement the LRU cache using only a hash map and a singly linked list (no prev pointers). Maintain O(1) operations.',
        problem: 'Without prev pointers, removing a node from the middle requires O(n) traversal unless you store the predecessor in the hash map, forcing a different mapping strategy.',
        hints: [
            'Implement the LRU cache using only a hash map and a singly linked list (no prev pointers)',
            'Without prev pointers, removing a node from the middle requires O(n) traversal unless you store the predecessor in the hash map, forcing a different mapping strategy.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"list":[1,2,3,4,5]},
                output: [1,2,3,4,5],
                explanation: ''
            }
        ],
        solutions: {
            python: `def lru_cache_without_doubly_linked_list(capacity, operations):
    """
    LRU Cache Without Doubly Linked List

    Implement the LRU cache using only a hash map and a singly linked list (no prev pointers). Maintain O(1) operations.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(capacity)

    for i in range(n):
        # Check condition based on operations
        j = 0
        for k in range(i, n):
            if j < len(operations) and capacity[k] == operations[j]:
                j += 1
        if j == len(operations):
            count += 1

    return count


# Test cases
print(lru_cache_without_doubly_linked_list(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// LruCacheWithoutDoublyLinkedList solves the LRU Cache Without Doubly Linked List problem.
// Implement the LRU cache using only a hash map and a singly linked list (no prev pointers). Maintain O(1) operations.
// Time: O(n), Space: O(1)
func LruCacheWithoutDoublyLinkedList(capacity int, operations [][]int) int {
	result := 0

	for i := 0; i < len(capacity); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LruCacheWithoutDoublyLinkedList(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '10-lru-cache/twist-05-lru-cache-without-doubly-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/10-lru-cache/twist-05-lru-cache-without-doubly-linked-list'] = problem;
})();
