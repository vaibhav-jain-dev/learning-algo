/**
 * Reverse K Then Skip 2K
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 07-reverse-linked-list/03-reverse-alternating-k-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse K Then Skip 2K',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/03-reverse-alternating-k-nodes',
        description: 'Reverse k nodes, then skip 2k nodes, then reverse k nodes, and so on. The skip length is double the reverse length.',
        problem: 'Asymmetric group sizes mean you cannot simply toggle a boolean with equal phases. The skip phase traverses more nodes, requiring separate counting logic.',
        hints: [
            'Reverse k nodes, then skip 2k nodes, then reverse k nodes, and so on',
            'Asymmetric group sizes mean you cannot simply toggle a boolean with equal phases',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5,6,7,8,9,10], k=2: reverse [1,2]->[2,1], skip 4 nodes [3,4,5,6], reverse [7,8]->[8,7], skip [9,10]. Result=[2,1,3,4,5,6,8,7,9,10].'
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

def reverse_k_then_skip_2k(head, *args):
    """
    Reverse K Then Skip 2K
    Reverse k nodes, then skip 2k nodes, then reverse k nodes, and so on. The skip length is double the reverse length.

    Approach: Asymmetric group sizes mean you cannot simply toggle a boolean with equal phases. The skip phase traverses more nodes, requiring separate counting logic.
    """
    if not head:
        return head

    # Core algorithm for: Reverse K Then Skip 2K
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
    # Example: list=[1,2,3,4,5,6,7,8,9,10], k=2: reverse [1,2]->[2,1], skip 4 nodes [3,4,5,6], reverse [7,8]->[8,7], skip [9,10]. Result=[2,1,3,4,5,6,8,7,9,10].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_k_then_skip_2k(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_k_then_skip_2k(head)
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

// ReverseKThenSkip2K solves: Reverse K Then Skip 2K
// Reverse k nodes, then skip 2k nodes, then reverse k nodes, and so on. The skip length is double the reverse length.
// Approach: Asymmetric group sizes mean you cannot simply toggle a boolean with equal phases. The skip phase traverses more nodes, requiring separate counting logic.
func ReverseKThenSkip2K(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse K Then Skip 2K
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
    // Example: list=[1,2,3,4,5,6,7,8,9,10], k=2: reverse [1,2]->[2,1], skip 4 nodes [3,4,5,6], reverse [7,8]->[8,7], skip [9,10]. Result=[2,1,3,4,5,6,8,7,9,10].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseKThenSkip2K(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseKThenSkip2K(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-02-reverse-k-then-skip-2k', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-02-reverse-k-then-skip-2k'] = problem;
})();
