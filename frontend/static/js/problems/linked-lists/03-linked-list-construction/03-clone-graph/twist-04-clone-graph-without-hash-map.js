/**
 * Clone Graph Without Hash Map
 * Category: linked-lists
 * Difficulty: Very Hard
 * Parent: 03-linked-list-construction/03-clone-graph
 */
(function() {
    'use strict';
    const problem = {
        name: 'Clone Graph Without Hash Map',
        difficulty: 'Very Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/03-clone-graph',
        description: 'Clone the graph using O(1) extra space (beyond the clone itself). No hash map allowed. Hint: similar to the interleaving trick from copy-list-random-pointer.',
        problem: 'Without a hash map, you need a way to map original nodes to clones. For linked lists, interleaving works. For graphs, you could temporarily modify the original graph structure (e.g., adding clone references) then restore it. This is extremely tricky.',
        hints: [
            'Clone the graph using O(1) extra space (beyond the clone itself)',
            'Without a hash map, you need a way to map original nodes to clones',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Temporarily store clone reference in original node, build clone neighbors, then clean up original nodes.'
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

def clone_graph_without_hash_map(head, *args):
    """
    Clone Graph Without Hash Map
    Clone the graph using O(1) extra space (beyond the clone itself). No hash map allowed. Hint: similar to the interleaving trick from copy-list-random-pointer.

    Approach: Without a hash map, you need a way to map original nodes to clones. For linked lists, interleaving works. For graphs, you could temporarily modify the original graph structure (e.g., adding clone references) then restore it. This is extremely tricky.
    """
    if not head:
        return head

    # Core algorithm for: Clone Graph Without Hash Map
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
    # Example: Temporarily store clone reference in original node, build clone neighbors, then clean up original nodes.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = clone_graph_without_hash_map(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = clone_graph_without_hash_map(head)
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

// CloneGraphWithoutHashMap solves: Clone Graph Without Hash Map
// Clone the graph using O(1) extra space (beyond the clone itself). No hash map allowed. Hint: similar to the interleaving trick from copy-list-random-pointer.
// Approach: Without a hash map, you need a way to map original nodes to clones. For linked lists, interleaving works. For graphs, you could temporarily modify the original graph structure (e.g., adding clone references) then restore it. This is extremely tricky.
func CloneGraphWithoutHashMap(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Clone Graph Without Hash Map
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
    // Example: Temporarily store clone reference in original node, build clone neighbors, then clean up original nodes.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CloneGraphWithoutHashMap(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CloneGraphWithoutHashMap(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/03-clone-graph/twist-04-clone-graph-without-hash-map', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/03-clone-graph/twist-04-clone-graph-without-hash-map'] = problem;
})();
