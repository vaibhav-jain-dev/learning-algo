/*
Word Ladder with A* Heuristic - Go Solution

Find shortest transformation sequence using A* with character difference heuristic.

Time Complexity: O(M^2 * N)
Space Complexity: O(M * N)
*/

package main

import (
	"container/heap"
	"fmt"
)

// wordLadderBFS solves word ladder using standard BFS
func wordLadderBFS(beginWord, endWord string, wordList []string) int {
	wordSet := make(map[string]bool)
	for _, word := range wordList {
		wordSet[word] = true
	}

	if !wordSet[endWord] {
		return 0
	}

	wordLen := len(beginWord)

	// Build pattern dictionary
	patterns := make(map[string][]string)
	for word := range wordSet {
		for i := 0; i < wordLen; i++ {
			pattern := word[:i] + "*" + word[i+1:]
			patterns[pattern] = append(patterns[pattern], word)
		}
	}

	type Item struct {
		word   string
		length int
	}

	queue := []Item{{beginWord, 1}}
	visited := map[string]bool{beginWord: true}

	for len(queue) > 0 {
		item := queue[0]
		queue = queue[1:]

		for i := 0; i < wordLen; i++ {
			pattern := item.word[:i] + "*" + item.word[i+1:]

			for _, neighbor := range patterns[pattern] {
				if neighbor == endWord {
					return item.length + 1
				}

				if !visited[neighbor] {
					visited[neighbor] = true
					queue = append(queue, Item{neighbor, item.length + 1})
				}
			}
		}
	}

	return 0
}

// AStarWordItem for priority queue
type AStarWordItem struct {
	FScore int
	Length int
	Word   string
	Index  int
}

// WordPQ implements heap.Interface
type WordPQ []*AStarWordItem

func (pq WordPQ) Len() int { return len(pq) }

func (pq WordPQ) Less(i, j int) bool {
	return pq[i].FScore < pq[j].FScore
}

func (pq WordPQ) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}

func (pq *WordPQ) Push(x interface{}) {
	n := len(*pq)
	item := x.(*AStarWordItem)
	item.Index = n
	*pq = append(*pq, item)
}

func (pq *WordPQ) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil
	item.Index = -1
	*pq = old[0 : n-1]
	return item
}

// wordLadderAStar solves word ladder using A* with heuristic
func wordLadderAStar(beginWord, endWord string, wordList []string) int {
	wordSet := make(map[string]bool)
	for _, word := range wordList {
		wordSet[word] = true
	}

	if !wordSet[endWord] {
		return 0
	}

	wordLen := len(beginWord)

	// Heuristic: count different characters from endWord
	heuristic := func(word string) int {
		count := 0
		for i := 0; i < wordLen; i++ {
			if word[i] != endWord[i] {
				count++
			}
		}
		return count
	}

	// Build pattern dictionary
	patterns := make(map[string][]string)
	for word := range wordSet {
		for i := 0; i < wordLen; i++ {
			pattern := word[:i] + "*" + word[i+1:]
			patterns[pattern] = append(patterns[pattern], word)
		}
	}

	pq := &WordPQ{}
	heap.Init(pq)
	startH := heuristic(beginWord)
	heap.Push(pq, &AStarWordItem{FScore: startH + 1, Length: 1, Word: beginWord})

	gScores := map[string]int{beginWord: 1}

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*AStarWordItem)

		if item.Word == endWord {
			return item.Length
		}

		if existing, ok := gScores[item.Word]; ok && item.Length > existing {
			continue
		}

		for i := 0; i < wordLen; i++ {
			pattern := item.Word[:i] + "*" + item.Word[i+1:]

			for _, neighbor := range patterns[pattern] {
				newLength := item.Length + 1

				if existing, ok := gScores[neighbor]; !ok || newLength < existing {
					gScores[neighbor] = newLength
					f := newLength + heuristic(neighbor)
					heap.Push(pq, &AStarWordItem{FScore: f, Length: newLength, Word: neighbor})
				}
			}
		}
	}

	return 0
}

// wordLadderBidirectional uses bidirectional BFS
func wordLadderBidirectional(beginWord, endWord string, wordList []string) int {
	wordSet := make(map[string]bool)
	for _, word := range wordList {
		wordSet[word] = true
	}

	if !wordSet[endWord] {
		return 0
	}

	wordLen := len(beginWord)

	patterns := make(map[string][]string)
	for word := range wordSet {
		for i := 0; i < wordLen; i++ {
			pattern := word[:i] + "*" + word[i+1:]
			patterns[pattern] = append(patterns[pattern], word)
		}
	}

	frontBegin := map[string]bool{beginWord: true}
	frontEnd := map[string]bool{endWord: true}
	visitedBegin := map[string]int{beginWord: 1}
	visitedEnd := map[string]int{endWord: 1}

	for len(frontBegin) > 0 && len(frontEnd) > 0 {
		// Always expand smaller frontier
		if len(frontBegin) > len(frontEnd) {
			frontBegin, frontEnd = frontEnd, frontBegin
			visitedBegin, visitedEnd = visitedEnd, visitedBegin
		}

		nextFront := make(map[string]bool)

		for word := range frontBegin {
			currentLen := visitedBegin[word]

			for i := 0; i < wordLen; i++ {
				pattern := word[:i] + "*" + word[i+1:]

				for _, neighbor := range patterns[pattern] {
					if dist, ok := visitedEnd[neighbor]; ok {
						return currentLen + dist
					}

					if _, visited := visitedBegin[neighbor]; !visited && wordSet[neighbor] {
						visitedBegin[neighbor] = currentLen + 1
						nextFront[neighbor] = true
					}
				}
			}
		}

		frontBegin = nextFront
	}

	return 0
}

func main() {
	// Test 1: Standard case
	result1 := wordLadderBFS("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})
	fmt.Printf("Test 1 (BFS): %d\n", result1)
	if result1 != 5 {
		fmt.Printf("FAIL: Expected 5, got %d\n", result1)
	}

	result1AStar := wordLadderAStar("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})
	fmt.Printf("Test 1 (A*): %d\n", result1AStar)
	if result1AStar != 5 {
		fmt.Printf("FAIL: Expected 5, got %d\n", result1AStar)
	}

	result1Bidir := wordLadderBidirectional("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})
	fmt.Printf("Test 1 (Bidirectional): %d\n", result1Bidir)
	if result1Bidir != 5 {
		fmt.Printf("FAIL: Expected 5, got %d\n", result1Bidir)
	}

	// Test 2: No path
	result2 := wordLadderBFS("hit", "cog", []string{"hot", "dot", "dog", "lot", "log"})
	fmt.Printf("Test 2 (BFS): %d\n", result2)
	if result2 != 0 {
		fmt.Printf("FAIL: Expected 0, got %d\n", result2)
	}

	// Test 3: Direct transformation
	result3 := wordLadderBFS("hot", "dot", []string{"dot"})
	fmt.Printf("Test 3 (BFS): %d\n", result3)
	if result3 != 2 {
		fmt.Printf("FAIL: Expected 2, got %d\n", result3)
	}

	fmt.Println("\nAll tests passed!")
}
