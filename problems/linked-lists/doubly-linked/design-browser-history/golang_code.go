/*
Design Browser History

Implement a browser history with visit, back, and forward operations
using a doubly linked list.

Time Complexity:
- visit: O(1)
- back: O(steps)
- forward: O(steps)

Space Complexity: O(n) where n is number of pages visited
*/

package main

import (
	"fmt"
	"strings"
)

// PageNode represents a visited page in browser history
type PageNode struct {
	url  string
	prev *PageNode
	next *PageNode
}

// BrowserHistory implements browser history using doubly linked list
type BrowserHistory struct {
	current *PageNode
}

// NewBrowserHistory creates a new browser history starting at homepage
func NewBrowserHistory(homepage string) *BrowserHistory {
	return &BrowserHistory{
		current: &PageNode{url: homepage},
	}
}

// Visit visits a new URL from current page
// Creates new page node and clears forward history
func (b *BrowserHistory) Visit(url string) {
	newPage := &PageNode{url: url}

	// Link current to new page
	b.current.next = newPage
	newPage.prev = b.current

	// newPage.next is nil, which clears forward history

	// Move to new page
	b.current = newPage
}

// Back moves back in history by given steps
// Returns current URL after moving back
// If steps > available history, moves to earliest page
func (b *BrowserHistory) Back(steps int) string {
	for steps > 0 && b.current.prev != nil {
		b.current = b.current.prev
		steps--
	}

	return b.current.url
}

// Forward moves forward in history by given steps
// Returns current URL after moving forward
// If steps > available forward history, moves to latest page
func (b *BrowserHistory) Forward(steps int) string {
	for steps > 0 && b.current.next != nil {
		b.current = b.current.next
		steps--
	}

	return b.current.url
}

// GetCurrentURL returns the current page URL
func (b *BrowserHistory) GetCurrentURL() string {
	return b.current.url
}

// GetHistoryString returns string representation of history with current marker
func (b *BrowserHistory) GetHistoryString() string {
	// Find the beginning
	node := b.current
	for node.prev != nil {
		node = node.prev
	}

	// Build string
	var pages []string
	for node != nil {
		if node == b.current {
			pages = append(pages, fmt.Sprintf("[%s]", node.url))
		} else {
			pages = append(pages, node.url)
		}
		node = node.next
	}

	return strings.Join(pages, " <-> ")
}

// BrowserHistoryList is an alternative implementation using a slice
type BrowserHistoryList struct {
	history    []string
	currentIdx int
}

// NewBrowserHistoryList creates a new browser history using list approach
func NewBrowserHistoryList(homepage string) *BrowserHistoryList {
	return &BrowserHistoryList{
		history:    []string{homepage},
		currentIdx: 0,
	}
}

// Visit visits a new URL (list-based)
func (b *BrowserHistoryList) Visit(url string) {
	// Clear forward history
	b.history = b.history[:b.currentIdx+1]
	b.history = append(b.history, url)
	b.currentIdx++
}

// Back moves back in history (list-based)
func (b *BrowserHistoryList) Back(steps int) string {
	b.currentIdx = max(0, b.currentIdx-steps)
	return b.history[b.currentIdx]
}

// Forward moves forward in history (list-based)
func (b *BrowserHistoryList) Forward(steps int) string {
	b.currentIdx = min(len(b.history)-1, b.currentIdx+steps)
	return b.history[b.currentIdx]
}

// max returns the maximum of two integers
func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// min returns the minimum of two integers
func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// ==================== TEST CASES ====================

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("DESIGN BROWSER HISTORY - TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	// Test case 1: Main example
	fmt.Println("\nTest 1: Main example from problem")
	browser := NewBrowserHistory("leetcode.com")
	fmt.Printf("  Initial: %s\n", browser.GetHistoryString())

	browser.Visit("google.com")
	fmt.Printf("  visit(google.com): %s\n", browser.GetHistoryString())

	browser.Visit("facebook.com")
	fmt.Printf("  visit(facebook.com): %s\n", browser.GetHistoryString())

	browser.Visit("youtube.com")
	fmt.Printf("  visit(youtube.com): %s\n", browser.GetHistoryString())

	result := browser.Back(1)
	fmt.Printf("  back(1) = %s: %s\n", result, browser.GetHistoryString())
	if result != "facebook.com" {
		fmt.Println("  FAILED!")
		return
	}

	result = browser.Back(1)
	fmt.Printf("  back(1) = %s: %s\n", result, browser.GetHistoryString())
	if result != "google.com" {
		fmt.Println("  FAILED!")
		return
	}

	result = browser.Forward(1)
	fmt.Printf("  forward(1) = %s: %s\n", result, browser.GetHistoryString())
	if result != "facebook.com" {
		fmt.Println("  FAILED!")
		return
	}

	browser.Visit("linkedin.com")
	fmt.Printf("  visit(linkedin.com): %s\n", browser.GetHistoryString())

	result = browser.Forward(2)
	fmt.Printf("  forward(2) = %s: %s\n", result, browser.GetHistoryString())
	if result != "linkedin.com" {
		fmt.Println("  FAILED!")
		return
	}

	result = browser.Back(2)
	fmt.Printf("  back(2) = %s: %s\n", result, browser.GetHistoryString())
	if result != "google.com" {
		fmt.Println("  FAILED!")
		return
	}

	result = browser.Back(7)
	fmt.Printf("  back(7) = %s: %s\n", result, browser.GetHistoryString())
	if result != "leetcode.com" {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Println("  PASSED!")

	// Test case 2: Simple back/forward
	fmt.Println("\nTest 2: Simple back/forward at limits")
	browser = NewBrowserHistory("home.com")
	browser.Visit("a.com")
	fmt.Printf("  History: %s\n", browser.GetHistoryString())

	result = browser.Back(5)
	fmt.Printf("  back(5) = %s\n", result)
	if result != "home.com" {
		fmt.Println("  FAILED!")
		return
	}

	result = browser.Forward(5)
	fmt.Printf("  forward(5) = %s\n", result)
	if result != "a.com" {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Println("  PASSED!")

	// Test case 3: No forward history after visit
	fmt.Println("\nTest 3: Visit clears forward history")
	browser = NewBrowserHistory("1")
	browser.Visit("2")
	browser.Visit("3")
	browser.Visit("4")
	fmt.Printf("  Initial: %s\n", browser.GetHistoryString())

	browser.Back(2)
	fmt.Printf("  back(2): %s\n", browser.GetHistoryString())

	browser.Visit("5") // Should clear 3 and 4
	fmt.Printf("  visit(5): %s\n", browser.GetHistoryString())

	result = browser.Forward(10)
	fmt.Printf("  forward(10) = %s (can't go forward)\n", result)
	if result != "5" {
		fmt.Println("  FAILED!")
		return
	}

	result = browser.Back(10)
	fmt.Printf("  back(10) = %s\n", result)
	if result != "1" {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Println("  PASSED!")

	// Test case 4: Single page, no history
	fmt.Println("\nTest 4: Single page")
	browser = NewBrowserHistory("only.com")

	result = browser.Back(10)
	if result != "only.com" {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Printf("  back(10) on single page = %s\n", result)

	result = browser.Forward(10)
	if result != "only.com" {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Printf("  forward(10) on single page = %s\n", result)
	fmt.Println("  PASSED!")

	// Test case 5: List-based implementation
	fmt.Println("\nTest 5: List-based implementation")
	browserList := NewBrowserHistoryList("a.com")
	browserList.Visit("b.com")
	browserList.Visit("c.com")

	result = browserList.Back(1)
	if result != "b.com" {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Printf("  After visits a,b,c -> back(1) = %s\n", result)

	browserList.Visit("d.com")
	result = browserList.Forward(1)
	if result != "d.com" {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Printf("  After visit d -> forward(1) = %s (can't go forward)\n", result)

	result = browserList.Back(3)
	if result != "a.com" {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Printf("  back(3) = %s\n", result)
	fmt.Println("  PASSED!")

	// Test case 6: Alternating back and forward
	fmt.Println("\nTest 6: Alternating back and forward")
	browser = NewBrowserHistory("home")
	for i := 1; i <= 5; i++ {
		browser.Visit(fmt.Sprintf("page%d", i))
	}
	fmt.Printf("  History: %s\n", browser.GetHistoryString())

	// Navigate back and forth
	results := []string{
		browser.Back(2),
		browser.Forward(1),
		browser.Back(3),
		browser.Forward(2),
	}
	fmt.Printf("  back(2), forward(1), back(3), forward(2) = %v\n", results)
	expected := []string{"page3", "page4", "page1", "page3"}
	match := true
	for i := range results {
		if results[i] != expected[i] {
			match = false
			break
		}
	}
	if !match {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Println("  PASSED!")

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println(strings.Repeat("=", 60))
}
