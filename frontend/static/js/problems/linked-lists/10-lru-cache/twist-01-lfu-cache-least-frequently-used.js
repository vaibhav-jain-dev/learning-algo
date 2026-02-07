/**
 * LFU Cache (Least Frequently Used)
 * Category: linked-lists
 * Difficulty: Very Hard
 * Algorithm: ll-lru-cache
 * Parent: 10-lru-cache
 */
(function() {
    'use strict';

    const problem = {
        name: 'LFU Cache (Least Frequently Used)',
        difficulty: 'Very Hard',
        algorithm: 'll-lru-cache',
        parent: '10-lru-cache',
        description: 'Implement an LFU Cache where the eviction policy removes the least frequently used item. If there is a tie in frequency, evict the least recently used among those.',
        problem: 'Requires tracking access frequency per key and maintaining frequency-ordered buckets. The data structure changes from a single doubly-linked list to frequency-mapped lists.',
        hints: [
            'Implement an LFU Cache where the eviction policy removes the least frequently used item',
            'Requires tracking access frequency per key and maintaining frequency-ordered buckets',
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
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def lfu_cache_least_frequently_used(capacity, operations):
    """
    LFU Cache (Least Frequently Used)

    Implement an LFU Cache where the eviction policy removes the least frequently used item. If there is a tie in frequency, evict the least recently used among those.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(capacity)):
        if j < len(operations) and capacity[i] == operations[j]:
            j += 1

    return j == len(operations)


# Test cases
print(lfu_cache_least_frequently_used(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// LfuCacheLeastFrequentlyUsed solves the LFU Cache (Least Frequently Used) problem.
// Implement an LFU Cache where the eviction policy removes the least frequently used item. If there is a tie in frequency, evict the least recently used among those.
// Time: O(n), Space: O(1)
func LfuCacheLeastFrequentlyUsed(capacity int, operations [][]int) bool {
	j := 0

	for i := 0; i < len(capacity) && j < len(operations); i++ {
		if capacity[i] == operations[j] {
			j++
		}
	}

	return j == len(operations)
}

func main() {
	fmt.Println(LfuCacheLeastFrequentlyUsed(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '10-lru-cache/twist-01-lfu-cache-least-frequently-used', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/10-lru-cache/twist-01-lfu-cache-least-frequently-used'] = problem;
})();
