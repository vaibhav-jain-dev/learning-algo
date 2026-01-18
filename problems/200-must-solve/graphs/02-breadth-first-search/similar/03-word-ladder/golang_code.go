/*
Word Ladder - Go Solutions

Find shortest transformation sequence from beginWord to endWord
where each step changes exactly one letter.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: BFS with Pattern Mapping
// ============================================================================
// Time Complexity:  O(M^2 × N) where M is word length, N is wordList size
// Space Complexity: O(M^2 × N) for the pattern map
//
// WHY THIS IS BEST:
// - Efficient neighbor finding via generic patterns
// - Avoids O(N^2) pairwise comparison
// - Standard BFS guarantees shortest path
// ============================================================================

// LadderLengthPattern uses pattern mapping for efficient neighbor lookup.
//
// Key Insight: Words that differ by one letter share a pattern.
// "hot" and "dot" both match pattern "*ot"
//
// Pattern Map:
//
//	"*ot" -> ["hot", "dot", "lot"]
//	"h*t" -> ["hot", "hit"]
//	etc.
func LadderLengthPattern(beginWord, endWord string, wordList []string) int {
	// Build word set for O(1) lookup
	wordSet := make(map[string]bool)
	for _, word := range wordList {
		wordSet[word] = true
	}

	// End word must be in list
	if !wordSet[endWord] {
		return 0
	}

	// Build pattern map
	wordLen := len(beginWord)
	patterns := make(map[string][]string)

	allWords := append(wordList, beginWord)
	for _, word := range allWords {
		for i := 0; i < wordLen; i++ {
			pattern := word[:i] + "*" + word[i+1:]
			patterns[pattern] = append(patterns[pattern], word)
		}
	}

	// BFS
	visited := make(map[string]bool)
	visited[beginWord] = true
	queue := []string{beginWord}
	length := 1

	for len(queue) > 0 {
		levelSize := len(queue)

		for i := 0; i < levelSize; i++ {
			word := queue[0]
			queue = queue[1:]

			// Generate all patterns for this word
			for j := 0; j < wordLen; j++ {
				pattern := word[:j] + "*" + word[j+1:]

				// Check all words matching this pattern
				for _, neighbor := range patterns[pattern] {
					if neighbor == endWord {
						return length + 1
					}

					if !visited[neighbor] {
						visited[neighbor] = true
						queue = append(queue, neighbor)
					}
				}
			}
		}

		length++
	}

	return 0
}

// ============================================================================
// APPROACH 2: Bidirectional BFS
// ============================================================================
// Time Complexity:  O(M^2 × N)
// Space Complexity: O(M^2 × N)
//
// WHEN TO USE:
// - Very large word lists
// - Want to reduce search space significantly
// ============================================================================

// LadderLengthBidirectional searches from both ends.
func LadderLengthBidirectional(beginWord, endWord string, wordList []string) int {
	wordSet := make(map[string]bool)
	for _, word := range wordList {
		wordSet[word] = true
	}

	if !wordSet[endWord] {
		return 0
	}

	// Build pattern map
	wordLen := len(beginWord)
	patterns := make(map[string][]string)

	allWords := append(wordList, beginWord)
	for _, word := range allWords {
		for i := 0; i < wordLen; i++ {
			pattern := word[:i] + "*" + word[i+1:]
			patterns[pattern] = append(patterns[pattern], word)
		}
	}

	// Two frontiers
	beginVisited := map[string]int{beginWord: 1}
	endVisited := map[string]int{endWord: 1}
	beginQueue := []string{beginWord}
	endQueue := []string{endWord}

	for len(beginQueue) > 0 && len(endQueue) > 0 {
		// Always expand smaller frontier
		if len(beginQueue) <= len(endQueue) {
			result := expandFrontier(&beginQueue, beginVisited, endVisited, patterns, wordLen)
			if result > 0 {
				return result
			}
		} else {
			result := expandFrontier(&endQueue, endVisited, beginVisited, patterns, wordLen)
			if result > 0 {
				return result
			}
		}
	}

	return 0
}

func expandFrontier(queue *[]string, visited, otherVisited map[string]int,
	patterns map[string][]string, wordLen int) int {

	levelSize := len(*queue)

	for i := 0; i < levelSize; i++ {
		word := (*queue)[0]
		*queue = (*queue)[1:]
		currentDist := visited[word]

		for j := 0; j < wordLen; j++ {
			pattern := word[:j] + "*" + word[j+1:]

			for _, neighbor := range patterns[pattern] {
				// Check if frontiers meet
				if dist, found := otherVisited[neighbor]; found {
					return currentDist + dist
				}

				if _, found := visited[neighbor]; !found {
					visited[neighbor] = currentDist + 1
					*queue = append(*queue, neighbor)
				}
			}
		}
	}

	return 0
}

// ============================================================================
// APPROACH 3: BFS with Character Replacement
// ============================================================================
// Time Complexity:  O(M × 26 × N) = O(M × N)
// Space Complexity: O(N)
//
// WHEN TO USE:
// - Simpler implementation
// - When pattern building is too complex
// ============================================================================

// LadderLengthSimple uses character replacement to find neighbors.
func LadderLengthSimple(beginWord, endWord string, wordList []string) int {
	wordSet := make(map[string]bool)
	for _, word := range wordList {
		wordSet[word] = true
	}

	if !wordSet[endWord] {
		return 0
	}

	queue := []string{beginWord}
	visited := make(map[string]bool)
	visited[beginWord] = true
	length := 1

	for len(queue) > 0 {
		levelSize := len(queue)

		for i := 0; i < levelSize; i++ {
			word := queue[0]
			queue = queue[1:]

			// Try changing each character
			wordBytes := []byte(word)
			for j := 0; j < len(word); j++ {
				original := wordBytes[j]

				// Try all 26 letters
				for c := byte('a'); c <= 'z'; c++ {
					if c == original {
						continue
					}

					wordBytes[j] = c
					newWord := string(wordBytes)

					if newWord == endWord {
						return length + 1
					}

					if wordSet[newWord] && !visited[newWord] {
						visited[newWord] = true
						queue = append(queue, newWord)
					}
				}

				wordBytes[j] = original // Restore
			}
		}

		length++
	}

	return 0
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		beginWord string
		endWord   string
		wordList  []string
		expected  int
		desc      string
	}{
		{
			"hit", "cog",
			[]string{"hot", "dot", "dog", "lot", "log", "cog"},
			5,
			"Standard case",
		},
		{
			"hit", "cog",
			[]string{"hot", "dot", "dog", "lot", "log"},
			0,
			"End word not in list",
		},
		{
			"a", "c",
			[]string{"a", "b", "c"},
			2,
			"Single character words",
		},
		{
			"hot", "dog",
			[]string{"hot", "dog", "dot"},
			3,
			"Direct path",
		},
		{
			"leet", "code",
			[]string{"lest", "leet", "lose", "code", "lode", "robe", "lost"},
			0,
			"No valid path",
		},
	}

	approaches := []struct {
		name string
		fn   func(string, string, []string) int
	}{
		{"Pattern Mapping", LadderLengthPattern},
		{"Bidirectional BFS", LadderLengthBidirectional},
		{"Simple Replacement", LadderLengthSimple},
	}

	fmt.Println("======================================================================")
	fmt.Println("WORD LADDER - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")

		for _, tc := range testCases {
			// Copy wordList to avoid modification issues
			wordList := make([]string, len(tc.wordList))
			copy(wordList, tc.wordList)

			result := approach.fn(tc.beginWord, tc.endWord, wordList)
			status := "PASS"
			if result != tc.expected {
				status = "FAIL"
			}
			fmt.Printf("  [%s] %s: got %d, expected %d\n",
				status, tc.desc, result, tc.expected)
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("DETAILED EXAMPLE")
	fmt.Println("======================================================================")

	beginWord := "hit"
	endWord := "cog"
	wordList := []string{"hot", "dot", "dog", "lot", "log", "cog"}

	fmt.Printf("\nbeginWord: %s\n", beginWord)
	fmt.Printf("endWord: %s\n", endWord)
	fmt.Printf("wordList: %v\n", wordList)
	fmt.Printf("\nShortest ladder length: %d\n", LadderLengthPattern(beginWord, endWord, wordList))
	fmt.Println("Path: hit -> hot -> dot -> dog -> cog")

	fmt.Println("\nAll tests completed!")
}
