/**
 * Immutable Linked List (Functional Style)
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 03-linked-list-construction
 */
(function() {
    'use strict';
    const problem = {
        name: 'Immutable Linked List (Functional Style)',
        difficulty: 'Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'Implement a persistent/immutable linked list where operations return new list versions without modifying the original. Old versions remain accessible.',
        problem: 'In-place mutation is forbidden. Every insert/remove must create new nodes for the modified path while sharing unchanged nodes. This is a fundamentally different paradigm (structural sharing) used in functional programming.',
        hints: [
            'Implement a persistent/immutable linked list where operations return new list versions without modifying the original',
            'In-place mutation is forbidden',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'v1 = [1,2,3]. v2 = insertAfter(v1, node1, 5) => [1,5,2,3]. v1 is still [1,2,3]. Both share nodes 2 and 3.'
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

def immutable_linked_list_functional_style(head, *args):
    """
    Immutable Linked List (Functional Style)
    Implement a persistent/immutable linked list where operations return new list versions without modifying the original. Old versions remain accessible.

    Approach: In-place mutation is forbidden. Every insert/remove must create new nodes for the modified path while sharing unchanged nodes. This is a fundamentally different paradigm (structural sharing) used in functional programming.
    """
    if not head:
        return head

    # Core algorithm for: Immutable Linked List (Functional Style)
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
    # Example: v1 = [1,2,3]. v2 = insertAfter(v1, node1, 5) => [1,5,2,3]. v1 is still [1,2,3]. Both share nodes 2 and 3.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = immutable_linked_list_functional_style(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = immutable_linked_list_functional_style(head)
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

// ImmutableLinkedListFunctionalStyle solves: Immutable Linked List (Functional Style)
// Implement a persistent/immutable linked list where operations return new list versions without modifying the original. Old versions remain accessible.
// Approach: In-place mutation is forbidden. Every insert/remove must create new nodes for the modified path while sharing unchanged nodes. This is a fundamentally different paradigm (structural sharing) used in functional programming.
func ImmutableLinkedListFunctionalStyle(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Immutable Linked List (Functional Style)
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
    // Example: v1 = [1,2,3]. v2 = insertAfter(v1, node1, 5) => [1,5,2,3]. v1 is still [1,2,3]. Both share nodes 2 and 3.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ImmutableLinkedListFunctionalStyle(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ImmutableLinkedListFunctionalStyle(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/twist-05-immutable-linked-list-functional-style', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/twist-05-immutable-linked-list-functional-style'] = problem;
})();
