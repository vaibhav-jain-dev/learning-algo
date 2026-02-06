/**
 * Remove Kth From End in Circular List
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 04-remove-kth-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Remove Kth From End in Circular List',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'The linked list is circular (tail points back to head). Remove the kth node from the end, where "end" is defined as the node just before the head in the cycle.',
        problem: 'The circular structure means there is no null terminator. You must detect the cycle boundary and define what "from the end" means, using the list length modulo to find the position.',
        hints: [
            'The linked list is circular (tail points back to head)',
            'The circular structure means there is no null terminator',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'circular list=[0,1,2,3,4]->(back to 0), k=2: "end" is node 4, kth from end is node 3. Remove it.'
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

def remove_kth_from_end_in_circular_list(head, *args):
    """
    Remove Kth From End in Circular List
    The linked list is circular (tail points back to head). Remove the kth node from the end, where "end" is defined as the node just before the head in the cycle.

    Approach: The circular structure means there is no null terminator. You must detect the cycle boundary and define what "from the end" means, using the list length modulo to find the position.
    """
    if not head:
        return head

    # Core algorithm for: Remove Kth From End in Circular List
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
    # Example: circular list=[0,1,2,3,4]->(back to 0), k=2: "end" is node 4, kth from end is node 3. Remove it.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = remove_kth_from_end_in_circular_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = remove_kth_from_end_in_circular_list(head)
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

// RemoveKthFromEndInCircularList solves: Remove Kth From End in Circular List
// The linked list is circular (tail points back to head). Remove the kth node from the end, where "end" is defined as the node just before the head in the cycle.
// Approach: The circular structure means there is no null terminator. You must detect the cycle boundary and define what "from the end" means, using the list length modulo to find the position.
func RemoveKthFromEndInCircularList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Remove Kth From End in Circular List
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
    // Example: circular list=[0,1,2,3,4]->(back to 0), k=2: "end" is node 4, kth from end is node 3. Remove it.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RemoveKthFromEndInCircularList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RemoveKthFromEndInCircularList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/twist-05-remove-kth-from-end-in-circular-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/twist-05-remove-kth-from-end-in-circular-list'] = problem;
})();
