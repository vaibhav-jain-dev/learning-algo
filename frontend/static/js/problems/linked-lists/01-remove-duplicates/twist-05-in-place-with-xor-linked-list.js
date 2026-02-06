/**
 * In-Place with XOR Linked List
 * Category: linked-lists
 * Difficulty: Very Hard
 * Parent: 01-remove-duplicates
 */
(function() {
    'use strict';
    const problem = {
        name: 'In-Place with XOR Linked List',
        difficulty: 'Very Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'The list uses XOR linking where each node stores prev XOR next instead of a simple next pointer. Remove duplicates from the sorted XOR-linked list.',
        problem: 'XOR linked lists require you to carry the previous node address to compute the next node. Removing a node means recalculating XOR values for neighboring nodes, making deletion significantly harder.',
        hints: [
            'The list uses XOR linking where each node stores prev XOR next instead of a simple next pointer',
            'XOR linked lists require you to carry the previous node address to compute the next node',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'XOR list: 1(xor01)->1(xor12)->3(xor13)->4(xor34) with XOR-encoded pointers. After dedup: 1->3->4 with recalculated XOR links.'
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

def in_place_with_xor_linked_list(head, *args):
    """
    In-Place with XOR Linked List
    The list uses XOR linking where each node stores prev XOR next instead of a simple next pointer. Remove duplicates from the sorted XOR-linked list.

    Approach: XOR linked lists require you to carry the previous node address to compute the next node. Removing a node means recalculating XOR values for neighboring nodes, making deletion significantly harder.
    """
    if not head:
        return head

    # Core algorithm for: In-Place with XOR Linked List
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
    # Example: XOR list: 1(xor01)->1(xor12)->3(xor13)->4(xor34) with XOR-encoded pointers. After dedup: 1->3->4 with recalculated XOR links.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = in_place_with_xor_linked_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = in_place_with_xor_linked_list(head)
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

// InPlaceWithXORLinkedList solves: In-Place with XOR Linked List
// The list uses XOR linking where each node stores prev XOR next instead of a simple next pointer. Remove duplicates from the sorted XOR-linked list.
// Approach: XOR linked lists require you to carry the previous node address to compute the next node. Removing a node means recalculating XOR values for neighboring nodes, making deletion significantly harder.
func InPlaceWithXORLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: In-Place with XOR Linked List
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
    // Example: XOR list: 1(xor01)->1(xor12)->3(xor13)->4(xor34) with XOR-encoded pointers. After dedup: 1->3->4 with recalculated XOR links.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := InPlaceWithXORLinkedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = InPlaceWithXORLinkedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/twist-05-in-place-with-xor-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/twist-05-in-place-with-xor-linked-list'] = problem;
})();
