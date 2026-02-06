/**
 * Flatten a Multilevel Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten a Multilevel Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional **child pointer**. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a **multilevel data structure**. **Flatten** the list so that all the nodes appear in a single-level, doubly linked list. You are given the head of the first level o',
        problem: 'Reverse links by maintaining three pointers: prev, curr, next. For each node, save next, point curr to prev, then advance. Handle edge cases for empty or single-node lists.',
        complexity: {
            time: 'O(n)',
            space: 'O(depth)'
        },
        hints: [
            'Use three pointers: previous, current, and next.',
            'Save the next node before changing the current link.',
            'Move all pointers forward after reversing each link.',
            'The new head is the last non-null current pointer.',
            'Consider recursive approach for cleaner code.'
        ],
        examples: [
    {
        input: {
        "list": "1-2-3-4-5-6 with 3->7-8-9-10 and 8->11-12"
},
        output: [1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6],
        explanation: 'Processing the input data produces the output. For input list=1-2-3-4-5-6 with 3->7-8-9-10 and 8->11-12, the result is [1, ..., 6] (length 12).'
    },
    {
        input: {
        "list": "1-2 with 1->3"
},
        output: [1, 3, 2],
        explanation: 'Processing the input data produces the output. For input list=1-2 with 1->3, the result is [1, 3, 2].'
    }
        ],
        solutions: {
            python: `class Node:
    def __init__(self, val=0, prev=None, next=None, child=None):
        self.val = val
        self.prev = prev
        self.next = next
        self.child = child

def flattenAMultilevelDoublyLinkedList(head):
    """
    Flatten a Multilevel Doubly Linked List

    Time: O(n) - visit each node once
    Space: O(depth) - recursion stack depth

    When we encounter a child, we:
    1. Flatten the child list recursively
    2. Insert it between current and next
    3. Fix all prev/next pointers
    """
    if not head:
        return head

    def flatten_and_get_tail(node):
        """Flatten starting from node and return the tail."""
        current = node
        tail = node

        while current:
            next_node = current.next

            if current.child:
                # Recursively flatten the child list
                child_head = current.child
                child_tail = flatten_and_get_tail(child_head)

                # Connect current to child_head
                current.next = child_head
                child_head.prev = current

                # Connect child_tail to next_node
                if next_node:
                    child_tail.next = next_node
                    next_node.prev = child_tail

                # Clear the child pointer
                current.child = None

                # Update tail
                tail = child_tail
            else:
                tail = current

            current = next_node

        return tail

    flatten_and_get_tail(head)
    return head


# Iterative approach using stack
def flattenIterative(head):
    """
    Time: O(n), Space: O(depth)
    """
    if not head:
        return head

    stack = []
    current = head

    while current:
        if current.child:
            # Save next to stack if exists
            if current.next:
                stack.append(current.next)

            # Connect current to child
            current.next = current.child
            current.child.prev = current
            current.child = None

        if not current.next and stack:
            # Pop from stack and connect
            next_node = stack.pop()
            current.next = next_node
            next_node.prev = current

        current = current.next

    return head


# Test
if __name__ == "__main__":
    # Create: 1-2-3 with 2->4-5
    n1, n2, n3 = Node(1), Node(2), Node(3)
    n4, n5 = Node(4), Node(5)
    n1.next, n2.prev = n2, n1
    n2.next, n3.prev = n3, n2
    n4.next, n5.prev = n5, n4
    n2.child = n4

    result = flattenAMultilevelDoublyLinkedList(n1)
    # Should print: 1, 2, 4, 5, 3
    while result:
        print(result.val, end=" ")
        result = result.next`,
            go: `package main

import "fmt"

type Node struct {
    Val   int
    Prev  *Node
    Next  *Node
    Child *Node
}

// FlattenAMultilevelDoublyLinkedList flattens the multilevel list.
// Time: O(n), Space: O(depth)
func FlattenAMultilevelDoublyLinkedList(head *Node) *Node {
    if head == nil {
        return nil
    }

    flattenAndGetTail(head)
    return head
}

// flattenAndGetTail flattens starting from node and returns the tail.
func flattenAndGetTail(node *Node) *Node {
    current := node
    var tail *Node = node

    for current != nil {
        nextNode := current.Next

        if current.Child != nil {
            // Recursively flatten the child list
            childHead := current.Child
            childTail := flattenAndGetTail(childHead)

            // Connect current to childHead
            current.Next = childHead
            childHead.Prev = current

            // Connect childTail to nextNode
            if nextNode != nil {
                childTail.Next = nextNode
                nextNode.Prev = childTail
            }

            // Clear the child pointer
            current.Child = nil

            // Update tail
            tail = childTail
        } else {
            tail = current
        }

        current = nextNode
    }

    return tail
}

// FlattenIterative uses a stack-based approach.
// Time: O(n), Space: O(depth)
func FlattenIterative(head *Node) *Node {
    if head == nil {
        return nil
    }

    stack := []*Node{}
    current := head

    for current != nil {
        if current.Child != nil {
            // Save next to stack if exists
            if current.Next != nil {
                stack = append(stack, current.Next)
            }

            // Connect current to child
            current.Next = current.Child
            current.Child.Prev = current
            current.Child = nil
        }

        if current.Next == nil && len(stack) > 0 {
            // Pop from stack and connect
            nextNode := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            current.Next = nextNode
            nextNode.Prev = current
        }

        current = current.Next
    }

    return head
}

func main() {
    // Create: 1-2-3 with 2->4-5
    n1, n2, n3 := &Node{Val: 1}, &Node{Val: 2}, &Node{Val: 3}
    n4, n5 := &Node{Val: 4}, &Node{Val: 5}
    n1.Next, n2.Prev = n2, n1
    n2.Next, n3.Prev = n3, n2
    n4.Next, n5.Prev = n5, n4
    n2.Child = n4

    result := FlattenAMultilevelDoublyLinkedList(n1)
    // Should print: 1 2 4 5 3
    for result != nil {
        fmt.Print(result.Val, " ")
        result = result.Next
    }
}`
        },
        twists: [
            {
                title: 'Flatten with Child at End (DFS vs BFS Order)',
                difficulty: 'Medium',
                description: 'Instead of inserting child lists immediately after the parent node, append each child list at the END of the current level. This produces a BFS-level order instead of DFS order.',
                whyDifferent: 'The standard solution uses DFS (child is inserted inline). BFS order requires a queue-based approach where child lists are appended after all nodes at the current level are processed. The traversal strategy fundamentally changes.',
                example: 'Input: 1-2-3 with 2->4-5. DFS: 1->2->4->5->3. BFS: 1->2->3->4->5 (child appended after current level).'
            },
            {
                title: 'Singly Linked Multilevel List',
                difficulty: 'Medium',
                description: 'The multilevel list is singly linked (no prev pointers, only next and child). Flatten it into a single-level singly linked list.',
                whyDifferent: 'Without prev pointers, you cannot set the prev link when connecting child lists. The result is simpler in some ways (fewer pointers to manage) but you must be more careful about not losing references since you cannot traverse backward.',
                example: 'Input: 1->2->3 with 2.child->4->5. Output: 1->2->4->5->3 (singly linked, no prev).'
            },
            {
                title: 'Unflatten: Restore Multilevel Structure',
                difficulty: 'Hard',
                description: 'Given a flattened list and information about the original structure (e.g., depth annotations), reconstruct the multilevel doubly linked list.',
                whyDifferent: 'This is the reverse problem. You must identify which nodes were originally children based on annotations, recreate child pointers, and properly split the flat list back into levels with correct prev/next/child pointers.',
                example: 'Input: 1->2->4->5->3 with annotations [0,0,1,1,0] (depth). Output: 1-2-3 with 2->4-5 as child list.'
            },
            {
                title: 'Iterative Stack-Based Approach',
                difficulty: 'Medium',
                description: 'Flatten the multilevel list using an explicit stack instead of recursion. When encountering a child, push the next pointer onto the stack and follow the child.',
                whyDifferent: 'The recursive approach uses the call stack implicitly. The iterative approach makes the stack explicit and requires careful management of when to push and pop. It avoids stack overflow for deeply nested lists.',
                example: 'At node 2 (child=4, next=3): push 3 onto stack, set 2.next=4. At node 5 (next=null): pop 3 from stack, set 5.next=3.'
            },
            {
                title: 'Circular Multilevel List',
                difficulty: 'Hard',
                description: 'Each level of the multilevel list is circular. Flatten into a single-level circular doubly linked list.',
                whyDifferent: 'At each level, the tail points back to the head of that level. You must break the circular link before flattening, then re-establish a single circular link for the final flattened result. Detecting the end of each level requires tracking the start node.',
                example: 'Level 0: 1<->2<->3<->back to 1 with 2.child pointing to level 1: 4<->5<->back to 4. Output: 1<->2<->4<->5<->3<->back to 1.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/02-flatten-multilevel-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/02-flatten-multilevel-list'] = problem;

})();
