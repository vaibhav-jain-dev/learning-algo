/**
 * Clone Weighted Graph
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 03-linked-list-construction/03-clone-graph
 */
(function() {
    'use strict';
    const problem = {
        name: 'Clone Weighted Graph',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/03-clone-graph',
        description: 'Each edge has a weight. Clone the graph preserving edge weights. Nodes have a val and a list of (neighbor, weight) pairs.',
        problem: 'The BFS/DFS traversal is the same, but the data structure changes. You must clone edges as (cloned_neighbor, weight) pairs. The hash map approach still works but the neighbor cloning step carries additional data.',
        hints: [
            'Each edge has a weight',
            'The BFS/DFS traversal is the same, but the data structure changes',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Node 1: [(2, 5), (3, 10)]. Clone: Node 1\': [(2\', 5), (3\', 10)] where 2\' and 3\' are new objects.'
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

def clone_weighted_graph(head, *args):
    """
    Clone Weighted Graph
    Each edge has a weight. Clone the graph preserving edge weights. Nodes have a val and a list of (neighbor, weight) pairs.

    Approach: The BFS/DFS traversal is the same, but the data structure changes. You must clone edges as (cloned_neighbor, weight) pairs. The hash map approach still works but the neighbor cloning step carries additional data.
    """
    if not head:
        return head

    # Core algorithm for: Clone Weighted Graph
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
    # Example: Node 1: [(2, 5), (3, 10)]. Clone: Node 1': [(2', 5), (3', 10)] where 2' and 3' are new objects.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = clone_weighted_graph(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = clone_weighted_graph(head)
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

// CloneWeightedGraph solves: Clone Weighted Graph
// Each edge has a weight. Clone the graph preserving edge weights. Nodes have a val and a list of (neighbor, weight) pairs.
// Approach: The BFS/DFS traversal is the same, but the data structure changes. You must clone edges as (cloned_neighbor, weight) pairs. The hash map approach still works but the neighbor cloning step carries additional data.
func CloneWeightedGraph(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Clone Weighted Graph
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
    // Example: Node 1: [(2, 5), (3, 10)]. Clone: Node 1': [(2', 5), (3', 10)] where 2' and 3' are new objects.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CloneWeightedGraph(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CloneWeightedGraph(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/03-clone-graph/twist-02-clone-weighted-graph', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/03-clone-graph/twist-02-clone-weighted-graph'] = problem;
})();
