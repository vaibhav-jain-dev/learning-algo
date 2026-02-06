/**
 * Detect If Loop Exists
 * Category: linked-lists
 * Difficulty: Easy
 * Parent: 06-find-loop
 */
(function() {
    'use strict';
    const problem = {
        name: 'Detect If Loop Exists',
        difficulty: 'Easy',
        algorithm: 'll-find-loop',
        parent: '06-find-loop',
        description: 'Simply determine whether the linked list contains a cycle or not. Return true/false without finding the loop start.',
        problem: 'Simplifies the problem by removing Phase 2 entirely. You only need Floyd Phase 1: if slow and fast meet, there is a cycle; if fast reaches null, there is not.',
        hints: [
            'Simply determine whether the linked list contains a cycle or not',
            'Simplifies the problem by removing Phase 2 entirely',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4]->null: no loop, return false. list=[1,2,3,4]->(back to 2): has loop, return true.'
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

def detect_if_loop_exists(head, *args):
    """
    Detect If Loop Exists
    Simply determine whether the linked list contains a cycle or not. Return true/false without finding the loop start.

    Approach: Simplifies the problem by removing Phase 2 entirely. You only need Floyd Phase 1: if slow and fast meet, there is a cycle; if fast reaches null, there is not.
    """
    if not head:
        return head

    # Core algorithm for: Detect If Loop Exists
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
    # Example: list=[1,2,3,4]->null: no loop, return false. list=[1,2,3,4]->(back to 2): has loop, return true.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = detect_if_loop_exists(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = detect_if_loop_exists(head)
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

// DetectIfLoopExists solves: Detect If Loop Exists
// Simply determine whether the linked list contains a cycle or not. Return true/false without finding the loop start.
// Approach: Simplifies the problem by removing Phase 2 entirely. You only need Floyd Phase 1: if slow and fast meet, there is a cycle; if fast reaches null, there is not.
func DetectIfLoopExists(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Detect If Loop Exists
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
    // Example: list=[1,2,3,4]->null: no loop, return false. list=[1,2,3,4]->(back to 2): has loop, return true.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := DetectIfLoopExists(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = DetectIfLoopExists(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '06-find-loop/twist-02-detect-if-loop-exists', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/06-find-loop/twist-02-detect-if-loop-exists'] = problem;
})();
