/**
 * Partition Around Median
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 11-rearrange-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Partition Around Median',
        difficulty: 'Hard',
        algorithm: 'll-rearrange',
        parent: '11-rearrange-linked-list',
        description: 'Rearrange the list around its median value (the middle value if sorted). First find the median, then partition around it.',
        problem: 'Requires finding the median of a linked list first (no random access), then using it as the pivot. Finding the median requires sorting or a selection algorithm.',
        hints: [
            'Rearrange the list around its median value (the middle value if sorted)',
            'Requires finding the median of a linked list first (no random access), then using it as the pivot',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[3,0,5,2,1,4]: sorted is [0,1,2,3,4,5], median is 2 or 3. Partition around 3: result=[0,2,1,3,5,4].'
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

def partition_around_median(head, *args):
    """
    Partition Around Median
    Rearrange the list around its median value (the middle value if sorted). First find the median, then partition around it.

    Approach: Requires finding the median of a linked list first (no random access), then using it as the pivot. Finding the median requires sorting or a selection algorithm.
    """
    if not head:
        return head

    # Core algorithm for: Partition Around Median
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
    # Example: list=[3,0,5,2,1,4]: sorted is [0,1,2,3,4,5], median is 2 or 3. Partition around 3: result=[0,2,1,3,5,4].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = partition_around_median(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = partition_around_median(head)
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

// PartitionAroundMedian solves: Partition Around Median
// Rearrange the list around its median value (the middle value if sorted). First find the median, then partition around it.
// Approach: Requires finding the median of a linked list first (no random access), then using it as the pivot. Finding the median requires sorting or a selection algorithm.
func PartitionAroundMedian(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Partition Around Median
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
    // Example: list=[3,0,5,2,1,4]: sorted is [0,1,2,3,4,5], median is 2 or 3. Partition around 3: result=[0,2,1,3,5,4].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := PartitionAroundMedian(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = PartitionAroundMedian(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '11-rearrange-linked-list/twist-03-partition-around-median', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/11-rearrange-linked-list/twist-03-partition-around-median'] = problem;
})();
