/**
 * Doubly Linked List Middle from Ends
 * Category: linked-lists
 * Difficulty: Easy
 * Parent: 02-middle-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Doubly Linked List Middle from Ends',
        difficulty: 'Easy',
        algorithm: 'll-middle',
        parent: '02-middle-node',
        description: 'Given a doubly linked list with head and tail pointers, find the middle node by advancing from both ends simultaneously until the pointers meet.',
        problem: 'Instead of the slow/fast single-direction approach, you walk inward from head and tail. When pointers meet or cross, you have found the middle. This is a completely different traversal pattern.',
        hints: [
            'Given a doubly linked list with head and tail pointers, find the middle node by advancing from both ends simultaneously until the pointers meet.',
            'Instead of the slow/fast single-direction approach, you walk inward from head and tail',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Doubly linked: 1<->2<->3<->4<->5. Left starts at 1, right at 5. Step 1: left=2, right=4. Step 2: left=3, right=3. Meet at 3.'
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

def doubly_linked_list_middle_from_ends(head, *args):
    """
    Doubly Linked List Middle from Ends
    Given a doubly linked list with head and tail pointers, find the middle node by advancing from both ends simultaneously until the pointers meet.

    Approach: Instead of the slow/fast single-direction approach, you walk inward from head and tail. When pointers meet or cross, you have found the middle. This is a completely different traversal pattern.
    """
    if not head:
        return head

    # Core algorithm for: Doubly Linked List Middle from Ends
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
    # Example: Doubly linked: 1<->2<->3<->4<->5. Left starts at 1, right at 5. Step 1: left=2, right=4. Step 2: left=3, right=3. Meet at 3.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = doubly_linked_list_middle_from_ends(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = doubly_linked_list_middle_from_ends(head)
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

// DoublyLinkedListMiddleFromEnds solves: Doubly Linked List Middle from Ends
// Given a doubly linked list with head and tail pointers, find the middle node by advancing from both ends simultaneously until the pointers meet.
// Approach: Instead of the slow/fast single-direction approach, you walk inward from head and tail. When pointers meet or cross, you have found the middle. This is a completely different traversal pattern.
func DoublyLinkedListMiddleFromEnds(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Doubly Linked List Middle from Ends
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
    // Example: Doubly linked: 1<->2<->3<->4<->5. Left starts at 1, right at 5. Step 1: left=2, right=4. Step 2: left=3, right=3. Meet at 3.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := DoublyLinkedListMiddleFromEnds(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = DoublyLinkedListMiddleFromEnds(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node/twist-04-doubly-linked-list-middle-from-ends', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node/twist-04-doubly-linked-list-middle-from-ends'] = problem;
})();
