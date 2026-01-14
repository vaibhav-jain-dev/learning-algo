/*
Merge K Sorted Lists
Combines: Heap/Priority Queue + Linked List + Divide and Conquer
*/

package main

import (
	"container/heap"
	"fmt"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

// Min Heap implementation
type NodeHeap []*ListNode

func (h NodeHeap) Len() int           { return len(h) }
func (h NodeHeap) Less(i, j int) bool { return h[i].Val < h[j].Val }
func (h NodeHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *NodeHeap) Push(x interface{}) {
	*h = append(*h, x.(*ListNode))
}

func (h *NodeHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// Approach 1: Min Heap
func mergeKListsHeap(lists []*ListNode) *ListNode {
	h := &NodeHeap{}
	heap.Init(h)

	// Add first node of each list
	for _, node := range lists {
		if node != nil {
			heap.Push(h, node)
		}
	}

	dummy := &ListNode{}
	current := dummy

	for h.Len() > 0 {
		node := heap.Pop(h).(*ListNode)
		current.Next = node
		current = current.Next

		if node.Next != nil {
			heap.Push(h, node.Next)
		}
	}

	return dummy.Next
}

// Approach 2: Divide and Conquer
func mergeKListsDC(lists []*ListNode) *ListNode {
	if len(lists) == 0 {
		return nil
	}

	for len(lists) > 1 {
		merged := []*ListNode{}
		for i := 0; i < len(lists); i += 2 {
			l1 := lists[i]
			var l2 *ListNode
			if i+1 < len(lists) {
				l2 = lists[i+1]
			}
			merged = append(merged, mergeTwoLists(l1, l2))
		}
		lists = merged
	}

	return lists[0]
}

func mergeTwoLists(l1, l2 *ListNode) *ListNode {
	dummy := &ListNode{}
	current := dummy

	for l1 != nil && l2 != nil {
		if l1.Val <= l2.Val {
			current.Next = l1
			l1 = l1.Next
		} else {
			current.Next = l2
			l2 = l2.Next
		}
		current = current.Next
	}

	if l1 != nil {
		current.Next = l1
	} else {
		current.Next = l2
	}

	return dummy.Next
}

// Helper functions
func createList(values []int) *ListNode {
	if len(values) == 0 {
		return nil
	}
	head := &ListNode{Val: values[0]}
	current := head
	for _, val := range values[1:] {
		current.Next = &ListNode{Val: val}
		current = current.Next
	}
	return head
}

func listToArray(head *ListNode) []int {
	result := []int{}
	for head != nil {
		result = append(result, head.Val)
		head = head.Next
	}
	return result
}

func main() {
	testCases := []struct {
		lists    [][]int
		expected []int
	}{
		{[][]int{{1, 4, 5}, {1, 3, 4}, {2, 6}}, []int{1, 1, 2, 3, 4, 4, 5, 6}},
		{[][]int{}, []int{}},
		{[][]int{{1}, {0}}, []int{0, 1}},
	}

	fmt.Println("Merge K Sorted Lists")
	fmt.Println("============================================================")

	for i, tc := range testCases {
		// Create lists for heap approach
		lists1 := make([]*ListNode, len(tc.lists))
		for j, vals := range tc.lists {
			lists1[j] = createList(vals)
		}

		// Create lists for D&C approach
		lists2 := make([]*ListNode, len(tc.lists))
		for j, vals := range tc.lists {
			lists2[j] = createList(vals)
		}

		result1 := listToArray(mergeKListsHeap(lists1))
		result2 := listToArray(mergeKListsDC(lists2))

		fmt.Printf("\nTest %d: %v\n", i+1, tc.lists)
		fmt.Printf("  Heap:           %v\n", result1)
		fmt.Printf("  Divide&Conquer: %v\n", result2)
		fmt.Printf("  Expected:       %v\n", tc.expected)
	}
}
