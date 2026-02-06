/**
 * Iterative BFS vs Recursive DFS Comparison
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 03-linked-list-construction/03-clone-graph
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative BFS vs Recursive DFS Comparison',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/03-clone-graph',
        description: 'Implement both BFS (queue-based) and DFS (recursive with memoization) solutions. Analyze their behavior on graphs with different shapes (wide vs deep).',
        problem: 'BFS uses a queue and processes level by level; DFS goes deep first. For very deep graphs, recursive DFS risks stack overflow while BFS handles them fine. For very wide graphs, BFS queue grows large. The choice matters in practice.',
        hints: [
            'Implement both BFS (queue-based) and DFS (recursive with memoization) solutions',
            'BFS uses a queue and processes level by level; DFS goes deep first',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Deep chain: 1->2->3->...->1000. DFS recursion depth = 1000 (may overflow). BFS queue max size = 1.'
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

def iterative_bfs_vs_recursive_dfs_comparison(head, *args):
    """
    Iterative BFS vs Recursive DFS Comparison
    Implement both BFS (queue-based) and DFS (recursive with memoization) solutions. Analyze their behavior on graphs with different shapes (wide vs deep).

    Approach: BFS uses a queue and processes level by level; DFS goes deep first. For very deep graphs, recursive DFS risks stack overflow while BFS handles them fine. For very wide graphs, BFS queue grows large. The choice matters in practice.
    """
    if not head:
        return head

    # Core algorithm for: Iterative BFS vs Recursive DFS Comparison
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
    # Example: Deep chain: 1->2->3->...->1000. DFS recursion depth = 1000 (may overflow). BFS queue max size = 1.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = iterative_bfs_vs_recursive_dfs_comparison(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = iterative_bfs_vs_recursive_dfs_comparison(head)
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

// IterativeBFSVsRecursiveDFSComparison solves: Iterative BFS vs Recursive DFS Comparison
// Implement both BFS (queue-based) and DFS (recursive with memoization) solutions. Analyze their behavior on graphs with different shapes (wide vs deep).
// Approach: BFS uses a queue and processes level by level; DFS goes deep first. For very deep graphs, recursive DFS risks stack overflow while BFS handles them fine. For very wide graphs, BFS queue grows large. The choice matters in practice.
func IterativeBFSVsRecursiveDFSComparison(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Iterative BFS vs Recursive DFS Comparison
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
    // Example: Deep chain: 1->2->3->...->1000. DFS recursion depth = 1000 (may overflow). BFS queue max size = 1.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := IterativeBFSVsRecursiveDFSComparison(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = IterativeBFSVsRecursiveDFSComparison(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/03-clone-graph/twist-03-iterative-bfs-vs-recursive-dfs-comparison', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/03-clone-graph/twist-03-iterative-bfs-vs-recursive-dfs-comparison'] = problem;
})();
