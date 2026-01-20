/*
Boggle Board - Go Solution

Find all words from a dictionary that can be formed in a boggle board.
Uses Trie for efficient prefix matching combined with DFS traversal.

Time Complexity: O(N * M * 8^L + W * L) where:
    - N, M are board dimensions
    - L is max word length
    - W is number of words
Space Complexity: O(W * L + N * M) for Trie and recursion stack
*/

package main

import (
	"fmt"
	"sort"
)

// TrieNode represents a node in the Trie
type TrieNode struct {
	children map[byte]*TrieNode
	word     string // Stores complete word at end nodes
}

// NewTrieNode creates a new Trie node
func NewTrieNode() *TrieNode {
	return &TrieNode{
		children: make(map[byte]*TrieNode),
		word:     "",
	}
}

// Trie represents the prefix tree
type Trie struct {
	root *TrieNode
}

// NewTrie creates a new Trie
func NewTrie() *Trie {
	return &Trie{root: NewTrieNode()}
}

// Insert adds a word to the Trie
func (t *Trie) Insert(word string) {
	node := t.root
	for i := 0; i < len(word); i++ {
		char := word[i]
		if _, exists := node.children[char]; !exists {
			node.children[char] = NewTrieNode()
		}
		node = node.children[char]
	}
	node.word = word // Mark end of word
}

// BoggleBoard finds all words from dictionary that exist in the board
func BoggleBoard(board [][]byte, words []string) []string {
	if len(board) == 0 || len(board[0]) == 0 || len(words) == 0 {
		return []string{}
	}

	// Build Trie from all words
	trie := NewTrie()
	for _, word := range words {
		trie.Insert(word)
	}

	rows, cols := len(board), len(board[0])
	foundWords := make(map[string]bool)

	// 8 directions: up, down, left, right, and 4 diagonals
	directions := [][]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	// DFS function
	var dfs func(row, col int, node *TrieNode, visited map[[2]int]bool)
	dfs = func(row, col int, node *TrieNode, visited map[[2]int]bool) {
		char := board[row][col]

		// Prune if character not in Trie
		nextNode, exists := node.children[char]
		if !exists {
			return
		}

		// Found a complete word
		if nextNode.word != "" {
			foundWords[nextNode.word] = true
		}

		// Mark as visited
		pos := [2]int{row, col}
		visited[pos] = true

		// Explore all 8 directions
		for _, dir := range directions {
			newRow, newCol := row+dir[0], col+dir[1]

			// Check bounds and if not visited
			newPos := [2]int{newRow, newCol}
			if newRow >= 0 && newRow < rows &&
				newCol >= 0 && newCol < cols &&
				!visited[newPos] {
				dfs(newRow, newCol, nextNode, visited)
			}
		}

		// Backtrack
		delete(visited, pos)
	}

	// Start DFS from each cell
	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			visited := make(map[[2]int]bool)
			dfs(i, j, trie.root, visited)
		}
	}

	// Convert map to slice
	result := make([]string, 0, len(foundWords))
	for word := range foundWords {
		result = append(result, word)
	}
	return result
}

// BoggleBoardOptimized is an optimized version that modifies the board
// temporarily instead of using a visited map
func BoggleBoardOptimized(board [][]byte, words []string) []string {
	if len(board) == 0 || len(board[0]) == 0 || len(words) == 0 {
		return []string{}
	}

	trie := NewTrie()
	for _, word := range words {
		trie.Insert(word)
	}

	rows, cols := len(board), len(board[0])
	var result []string

	directions := [][]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	var dfs func(row, col int, node *TrieNode)
	dfs = func(row, col int, node *TrieNode) {
		char := board[row][col]

		nextNode, exists := node.children[char]
		if !exists {
			return
		}

		// Found a word
		if nextNode.word != "" {
			result = append(result, nextNode.word)
			nextNode.word = "" // Prevent duplicates
		}

		// Mark as visited by modifying board
		board[row][col] = '#'

		for _, dir := range directions {
			newRow, newCol := row+dir[0], col+dir[1]

			if newRow >= 0 && newRow < rows &&
				newCol >= 0 && newCol < cols &&
				board[newRow][newCol] != '#' {
				dfs(newRow, newCol, nextNode)
			}
		}

		// Restore cell
		board[row][col] = char

		// Optimization: remove empty leaf nodes
		if len(nextNode.children) == 0 && nextNode.word == "" {
			delete(node.children, char)
		}
	}

	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			dfs(i, j, trie.root)
		}
	}

	return result
}

func main() {
	// Test 1: Main example
	board1 := [][]byte{
		{'t', 'h', 'i', 's'},
		{'w', 'a', 't', 's'},
		{'o', 'a', 'h', 'g'},
		{'f', 'g', 'd', 't'},
	}
	words1 := []string{"this", "two", "fat", "that"}
	result1 := BoggleBoard(board1, words1)
	sort.Strings(result1)
	fmt.Printf("Test 1: %v\n", result1)
	fmt.Println("Expected: [fat that this two]")

	// Test 2: No reusing same cell
	board2 := [][]byte{
		{'a', 'b'},
		{'c', 'd'},
	}
	words2 := []string{"abcd", "abdc", "abca"}
	result2 := BoggleBoard(board2, words2)
	sort.Strings(result2)
	fmt.Printf("\nTest 2: %v\n", result2)
	fmt.Println("Expected: [abcd abdc] (abca not valid - can't reuse 'a')")

	// Test 3: Single cell board
	board3 := [][]byte{{'a'}}
	words3 := []string{"a", "ab"}
	result3 := BoggleBoard(board3, words3)
	fmt.Printf("\nTest 3: %v\n", result3)
	fmt.Println("Expected: [a]")

	// Test 4: No words found
	board4 := [][]byte{
		{'x', 'y'},
		{'z', 'w'},
	}
	words4 := []string{"abc", "def"}
	result4 := BoggleBoard(board4, words4)
	fmt.Printf("\nTest 4: %v\n", result4)
	fmt.Println("Expected: []")

	// Test 5: Diagonal words
	board5 := [][]byte{
		{'a', 'b', 'c'},
		{'d', 'e', 'f'},
		{'g', 'h', 'i'},
	}
	words5 := []string{"aei", "ceg", "abc", "ghi"}
	result5 := BoggleBoard(board5, words5)
	sort.Strings(result5)
	fmt.Printf("\nTest 5: %v\n", result5)
	fmt.Println("Expected: [abc aei ceg ghi]")

	// Test 6: Overlapping prefixes
	board6 := [][]byte{
		{'c', 'a', 't'},
		{'r', 'r', 'e'},
		{'t', 'o', 'n'},
	}
	words6 := []string{"car", "cart", "cat", "ten"}
	result6 := BoggleBoard(board6, words6)
	sort.Strings(result6)
	fmt.Printf("\nTest 6: %v\n", result6)

	// Test 7: Optimized version
	board7 := [][]byte{
		{'t', 'h', 'i', 's'},
		{'w', 'a', 't', 's'},
		{'o', 'a', 'h', 'g'},
		{'f', 'g', 'd', 't'},
	}
	words7 := []string{"this", "two", "fat", "that"}
	result7 := BoggleBoardOptimized(board7, words7)
	sort.Strings(result7)
	fmt.Printf("\nTest 7 (Optimized): %v\n", result7)
	fmt.Println("Expected: [fat that this two]")

	fmt.Println("\nAll tests completed!")
}
