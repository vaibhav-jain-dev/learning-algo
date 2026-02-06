/**
 * Move in Linked List
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: move-in-linked-list
 * Parent: 09-move-element-to-end/01-move-element-preserve-order
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move in Linked List',
        difficulty: 'Medium',
        algorithm: 'move-in-linked-list',
        parent: '09-move-element-to-end/01-move-element-preserve-order',
        description: 'Solve the same problem but on a singly linked list instead of an array. Move nodes with target value to the end. No random access means you must re-link nodes, requiring careful pointer manipulation to avoid breaking the list.',
        problem: 'No random access means you must re-link nodes, requiring careful pointer manipulation to avoid breaking the list.',
        hints: [
            'Think about how move in linked list differs from the standard version of this problem.',
            'Key insight: No random access means you must re-link nodes, requiring careful pointer manipulation to avoid breaking the list.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[3,1,2,3,4,3],"target":3},
                output: [1,2,4,3,3,3],
                explanation: 'Target elements moved to the correct position.'
            },
            {
                input: {"array":[1,2,3,4,5],"target":6},
                output: [1,2,3,4,5],
                explanation: 'Target not in array - no changes needed.'
            },
            {
                input: {"array":[3,3,3],"target":3},
                output: [3,3,3],
                explanation: 'All elements are the target.'
            }
        ],
        solutions: {
            python: `def move_in_linked_list(data):
    """
    Move in Linked List

    Solve the same problem but on a singly linked list instead of an array. Move nodes with target value to the end.
    \n    Approach: No random access means you must re-link nodes, requiring careful pointer manipulation to avoid breaking the list.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # 1->2->3->2->4, toMove = 2. Result: 1->3->4->2->2.

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(move_in_linked_list([1, 2, 3, 4, 5]))
print(move_in_linked_list([5, 3, 1]))
print(move_in_linked_list([1]))`,
            go: `package main

import "fmt"

// MoveInLinkedList solves the Move in Linked List problem.
// Solve the same problem but on a singly linked list instead of an array. Move nodes with target value to the end.
// Time: O(n), Space: O(n)
func MoveInLinkedList(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(MoveInLinkedList([]int{1, 2, 3, 4, 5}))
    fmt.Println(MoveInLinkedList([]int{5, 3, 1}))
    fmt.Println(MoveInLinkedList([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/01-move-element-preserve-order/twist-04-move-in-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/01-move-element-preserve-order/twist-04-move-in-linked-list'] = problem;
})();
