/*
Alien Dictionary - Go Solution

Time Complexity: O(C) where C is total length of all words
Space Complexity: O(U) where U is unique characters
*/

package main

import (
	"fmt"
	"strings"
)

func alienOrder(words []string) string {
	// Build adjacency list and calculate in-degrees
	graph := make(map[byte]map[byte]bool)
	inDegree := make(map[byte]int)

	// Initialize all characters
	for _, word := range words {
		for i := 0; i < len(word); i++ {
			if _, exists := graph[word[i]]; !exists {
				graph[word[i]] = make(map[byte]bool)
			}
			if _, exists := inDegree[word[i]]; !exists {
				inDegree[word[i]] = 0
			}
		}
	}

	// Compare adjacent words
	for i := 0; i < len(words)-1; i++ {
		word1, word2 := words[i], words[i+1]

		// Check for invalid case
		if len(word1) > len(word2) && strings.HasPrefix(word1, word2) {
			return ""
		}

		minLen := len(word1)
		if len(word2) < minLen {
			minLen = len(word2)
		}

		for j := 0; j < minLen; j++ {
			if word1[j] != word2[j] {
				if !graph[word1[j]][word2[j]] {
					graph[word1[j]][word2[j]] = true
					inDegree[word2[j]]++
				}
				break
			}
		}
	}

	// Topological sort using BFS
	queue := []byte{}
	for c, deg := range inDegree {
		if deg == 0 {
			queue = append(queue, c)
		}
	}

	result := []byte{}
	for len(queue) > 0 {
		c := queue[0]
		queue = queue[1:]
		result = append(result, c)

		for neighbor := range graph[c] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	if len(result) != len(inDegree) {
		return ""
	}

	return string(result)
}

func main() {
	fmt.Printf("Test 1: %s\n", alienOrder([]string{"wrt", "wrf", "er", "ett", "rftt"})) // Expected: "wertf"
	fmt.Printf("Test 2: %s\n", alienOrder([]string{"z", "x"}))                           // Expected: "zx"
	fmt.Printf("Test 3: %s\n", alienOrder([]string{"z", "x", "z"}))                       // Expected: "" (cycle)
	fmt.Printf("Test 4: %s\n", alienOrder([]string{"abc", "ab"}))                         // Expected: "" (invalid)
	fmt.Println("\nAll tests completed!")
}
