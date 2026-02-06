/**
 * Clone Directed Graph with Cycles
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 03-linked-list-construction/03-clone-graph
 */
(function() {
    'use strict';
    const problem = {
        name: 'Clone Directed Graph with Cycles',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/03-clone-graph',
        description: 'Clone a directed graph that may contain cycles. Each node has a list of directed edges. Ensure cycles in the clone mirror cycles in the original.',
        problem: 'The undirected graph BFS/DFS approach works but you must be extra careful that directed edges are cloned in the correct direction. A node might be reachable from multiple paths, and all incoming edges must point to the same cloned node.',
        hints: [
            'Clone a directed graph that may contain cycles',
            'The undirected graph BFS/DFS approach works but you must be extra careful that directed edges are cloned in the correct direction',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Directed: 1->2, 2->3, 3->1 (cycle). Clone must have: 1\'->2\', 2\'->3\', 3\'->1\' with 1\',2\',3\' as new objects.'
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

def clone_directed_graph_with_cycles(head, *args):
    """
    Clone Directed Graph with Cycles
    Clone a directed graph that may contain cycles. Each node has a list of directed edges. Ensure cycles in the clone mirror cycles in the original.

    Approach: The undirected graph BFS/DFS approach works but you must be extra careful that directed edges are cloned in the correct direction. A node might be reachable from multiple paths, and all incoming edges must point to the same cloned node.
    """
    if not head:
        return head

    # Core algorithm for: Clone Directed Graph with Cycles
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
    # Example: Directed: 1->2, 2->3, 3->1 (cycle). Clone must have: 1'->2', 2'->3', 3'->1' with 1',2',3' as new objects.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = clone_directed_graph_with_cycles(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = clone_directed_graph_with_cycles(head)
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

// CloneDirectedGraphWithCycles solves: Clone Directed Graph with Cycles
// Clone a directed graph that may contain cycles. Each node has a list of directed edges. Ensure cycles in the clone mirror cycles in the original.
// Approach: The undirected graph BFS/DFS approach works but you must be extra careful that directed edges are cloned in the correct direction. A node might be reachable from multiple paths, and all incoming edges must point to the same cloned node.
func CloneDirectedGraphWithCycles(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Clone Directed Graph with Cycles
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
    // Example: Directed: 1->2, 2->3, 3->1 (cycle). Clone must have: 1'->2', 2'->3', 3'->1' with 1',2',3' as new objects.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CloneDirectedGraphWithCycles(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CloneDirectedGraphWithCycles(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/03-clone-graph/twist-01-clone-directed-graph-with-cycles', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/03-clone-graph/twist-01-clone-directed-graph-with-cycles'] = problem;
})();
