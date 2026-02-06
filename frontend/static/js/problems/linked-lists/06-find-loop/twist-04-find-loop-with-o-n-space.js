/**
 * Find Loop With O(n) Space
 * Category: linked-lists
 * Difficulty: Easy
 * Parent: 06-find-loop
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find Loop With O(n) Space',
        difficulty: 'Easy',
        algorithm: 'll-find-loop',
        parent: '06-find-loop',
        description: 'Find the loop origin using a hash set to store visited nodes instead of Floyd\'s algorithm.',
        problem: 'Trading space for simplicity. The hash set approach is straightforward (first repeated node is loop start) but uses O(n) space. Useful to understand why Floyd\'s O(1) space approach is preferred.',
        hints: [
            'Find the loop origin using a hash set to store visited nodes instead of Floyd\'s algorithm.',
            'Trading space for simplicity',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[0,1,2,3,4,5,6]->(back to 3): hash set sees 3 twice, returns node 3.'
            }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class DoublyLinkedNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

def find_loop_with_o_n_space(head, *args):
    """
    Find Loop With O(n) Space
    Find the loop origin using a hash set to store visited nodes instead of Floyd's algorithm.

    Approach: Trading space for simplicity. The hash set approach is straightforward (first repeated node is loop start) but uses O(n) space. Useful to understand why Floyd's O(1) space approach is preferred.
    """
    if not head:
        return head

    # Core algorithm for: Find Loop With O(n) Space
    current = head
    result = []

    while current:
        result.append(current.val)
        current = current.next

    return result


# Helper: build linked list from array
def to_linked_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def to_array(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result


# Test
if __name__ == "__main__":
    # Example: list=[0,1,2,3,4,5,6]->(back to 3): hash set sees 3 twice, returns node 3.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = find_loop_with_o_n_space(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = find_loop_with_o_n_space(head)
    print("Result:", result)`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

type DoublyLinkedNode struct {
    Val  int
    Prev *DoublyLinkedNode
    Next *DoublyLinkedNode
}

// FindLoopWithOnSpace solves: Find Loop With O(n) Space
// Find the loop origin using a hash set to store visited nodes instead of Floyd's algorithm.
// Approach: Trading space for simplicity. The hash set approach is straightforward (first repeated node is loop start) but uses O(n) space. Useful to understand why Floyd's O(1) space approach is preferred.
func FindLoopWithOnSpace(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Find Loop With O(n) Space
    current := head
    for current.Next != nil {
        current = current.Next
    }

    return head
}

// Helper functions
func toLinkedList(arr []int) *ListNode {
    if len(arr) == 0 {
        return nil
    }
    head := &ListNode{Val: arr[0]}
    current := head
    for i := 1; i < len(arr); i++ {
        current.Next = &ListNode{Val: arr[i]}
        current = current.Next
    }
    return head
}

func toArray(head *ListNode) []int {
    result := []int{}
    for head != nil {
        result = append(result, head.Val)
        head = head.Next
    }
    return result
}

func main() {
    // Example: list=[0,1,2,3,4,5,6]->(back to 3): hash set sees 3 twice, returns node 3.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := FindLoopWithOnSpace(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = FindLoopWithOnSpace(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '06-find-loop/twist-04-find-loop-with-o-n-space', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/06-find-loop/twist-04-find-loop-with-o-n-space'] = problem;
})();
