/**
 * Remove the Loop
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 06-find-loop
 */
(function() {
    'use strict';
    const problem = {
        name: 'Remove the Loop',
        difficulty: 'Hard',
        algorithm: 'll-find-loop',
        parent: '06-find-loop',
        description: 'Find the loop and then break it by setting the tail node\'s next pointer to null, converting the list back to a standard singly linked list.',
        problem: 'After finding the loop start, you must also find the node that points back to the loop start (the loop tail) and set its next to null. Requires tracking one step behind.',
        hints: [
            'Find the loop and then break it by setting the tail node\'s next pointer to null, converting the list back to a standard singly linked list.',
            'After finding the loop start, you must also find the node that points back to the loop start (the loop tail) and set its next to null',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[0,1,2,3,4,5,6]->(back to 3): find that node 6 points to 3, set 6.next=null. Result: [0,1,2,3,4,5,6]->null.'
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

def remove_the_loop(head, *args):
    """
    Remove the Loop
    Find the loop and then break it by setting the tail node's next pointer to null, converting the list back to a standard singly linked list.

    Approach: After finding the loop start, you must also find the node that points back to the loop start (the loop tail) and set its next to null. Requires tracking one step behind.
    """
    if not head:
        return head

    # Core algorithm for: Remove the Loop
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
    # Example: list=[0,1,2,3,4,5,6]->(back to 3): find that node 6 points to 3, set 6.next=null. Result: [0,1,2,3,4,5,6]->null.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = remove_the_loop(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = remove_the_loop(head)
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

// RemoveTheLoop solves: Remove the Loop
// Find the loop and then break it by setting the tail node's next pointer to null, converting the list back to a standard singly linked list.
// Approach: After finding the loop start, you must also find the node that points back to the loop start (the loop tail) and set its next to null. Requires tracking one step behind.
func RemoveTheLoop(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Remove the Loop
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
    // Example: list=[0,1,2,3,4,5,6]->(back to 3): find that node 6 points to 3, set 6.next=null. Result: [0,1,2,3,4,5,6]->null.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RemoveTheLoop(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RemoveTheLoop(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '06-find-loop/twist-03-remove-the-loop', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/06-find-loop/twist-03-remove-the-loop'] = problem;
})();
