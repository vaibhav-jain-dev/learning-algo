/**
 * Iterative Stack-Based Approach
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 03-linked-list-construction/02-flatten-multilevel-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Stack-Based Approach',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/02-flatten-multilevel-list',
        description: 'Flatten the multilevel list using an explicit stack instead of recursion. When encountering a child, push the next pointer onto the stack and follow the child.',
        problem: 'The recursive approach uses the call stack implicitly. The iterative approach makes the stack explicit and requires careful management of when to push and pop. It avoids stack overflow for deeply nested lists.',
        hints: [
            'Flatten the multilevel list using an explicit stack instead of recursion',
            'The recursive approach uses the call stack implicitly',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'At node 2 (child=4, next=3): push 3 onto stack, set 2.next=4. At node 5 (next=null): pop 3 from stack, set 5.next=3.'
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

def iterative_stack_based_approach(head, *args):
    """
    Iterative Stack-Based Approach
    Flatten the multilevel list using an explicit stack instead of recursion. When encountering a child, push the next pointer onto the stack and follow the child.

    Approach: The recursive approach uses the call stack implicitly. The iterative approach makes the stack explicit and requires careful management of when to push and pop. It avoids stack overflow for deeply nested lists.
    """
    if not head:
        return head

    # Core algorithm for: Iterative Stack-Based Approach
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
    # Example: At node 2 (child=4, next=3): push 3 onto stack, set 2.next=4. At node 5 (next=null): pop 3 from stack, set 5.next=3.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = iterative_stack_based_approach(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = iterative_stack_based_approach(head)
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

// IterativeStackBasedApproach solves: Iterative Stack-Based Approach
// Flatten the multilevel list using an explicit stack instead of recursion. When encountering a child, push the next pointer onto the stack and follow the child.
// Approach: The recursive approach uses the call stack implicitly. The iterative approach makes the stack explicit and requires careful management of when to push and pop. It avoids stack overflow for deeply nested lists.
func IterativeStackBasedApproach(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Iterative Stack-Based Approach
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
    // Example: At node 2 (child=4, next=3): push 3 onto stack, set 2.next=4. At node 5 (next=null): pop 3 from stack, set 5.next=3.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := IterativeStackBasedApproach(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = IterativeStackBasedApproach(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/02-flatten-multilevel-list/twist-04-iterative-stack-based-approach', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/02-flatten-multilevel-list/twist-04-iterative-stack-based-approach'] = problem;
})();
