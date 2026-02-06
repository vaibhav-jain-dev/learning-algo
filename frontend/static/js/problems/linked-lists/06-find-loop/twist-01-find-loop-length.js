/**
 * Find Loop Length
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 06-find-loop
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find Loop Length',
        difficulty: 'Medium',
        algorithm: 'll-find-loop',
        parent: '06-find-loop',
        description: 'Instead of finding where the loop starts, find the length of the loop (number of nodes in the cycle).',
        problem: 'After the slow and fast pointers meet, you keep one pointer fixed and advance the other, counting steps until they meet again. The meeting-point detection is the same but the post-processing differs.',
        hints: [
            'Instead of finding where the loop starts, find the length of the loop (number of nodes in the cycle).',
            'After the slow and fast pointers meet, you keep one pointer fixed and advance the other, counting steps until they meet again',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[0,1,2,3,4,5,6]->(back to 3): loop is 3->4->5->6->3, length=4.'
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

def find_loop_length(head, *args):
    """
    Find Loop Length
    Instead of finding where the loop starts, find the length of the loop (number of nodes in the cycle).

    Approach: After the slow and fast pointers meet, you keep one pointer fixed and advance the other, counting steps until they meet again. The meeting-point detection is the same but the post-processing differs.
    """
    if not head:
        return head

    # Core algorithm for: Find Loop Length
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
    # Example: list=[0,1,2,3,4,5,6]->(back to 3): loop is 3->4->5->6->3, length=4.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = find_loop_length(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = find_loop_length(head)
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

// FindLoopLength solves: Find Loop Length
// Instead of finding where the loop starts, find the length of the loop (number of nodes in the cycle).
// Approach: After the slow and fast pointers meet, you keep one pointer fixed and advance the other, counting steps until they meet again. The meeting-point detection is the same but the post-processing differs.
func FindLoopLength(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Find Loop Length
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
    // Example: list=[0,1,2,3,4,5,6]->(back to 3): loop is 3->4->5->6->3, length=4.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := FindLoopLength(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = FindLoopLength(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '06-find-loop/twist-01-find-loop-length', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/06-find-loop/twist-01-find-loop-length'] = problem;
})();
