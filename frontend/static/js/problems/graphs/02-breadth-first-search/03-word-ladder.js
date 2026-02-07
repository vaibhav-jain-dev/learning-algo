/**
 * Word Ladder
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Word Ladder',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search',
        description: 'A **transformation sequence** from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: - Every adjacent pair of words differs by a single letter - Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList - sk == endWord Given two words, beginWord and endWord, and a dictionary wordList, return the **number of words** in the **shortest transformation sequence** from beginWord to endWord,.',
        problem: 'Use Breadth-First Search to explore level by level. BFS is ideal for finding shortest paths in unweighted graphs. Use a queue to process nodes in order of distance.',
        complexity: {
            time: 'O(M^2 * N)',
            space: 'O(M^2 * N)'
        },
        hints: [
            'Use a queue to process nodes level by level.',
            'BFS naturally finds shortest paths in unweighted graphs.',
            'Track distance or level for each node.',
            'Mark nodes as visited when adding to queue, not when processing.',
            'Consider bidirectional BFS for optimization.'
        ],
        examples: [
    {
        input: {
        "beginWord": "hit",
        "endWord": "cog",
        "wordList": [
                "hot",
                "dot",
                "dog",
                "lot",
                "log",
                "cog"
        ]
},
        output: 5,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "beginWord": "hit",
        "endWord": "cog",
        "wordList": [
                "hot",
                "dot",
                "dog",
                "lot",
                "log"
        ]
},
        output: 0,
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        solutions: {
            python: `from collections import deque

def ladderLength(beginWord, endWord, wordList):
    """
    Word Ladder - BFS to find shortest transformation sequence.

    Time: O(M^2 * N) where M is word length, N is wordList size
    Space: O(M^2 * N) for all intermediate states
    """
    wordSet = set(wordList)

    # If endWord not in dictionary, no valid transformation
    if endWord not in wordSet:
        return 0

    # BFS: (current_word, transformation_count)
    queue = deque([(beginWord, 1)])
    visited = {beginWord}

    while queue:
        word, length = queue.popleft()

        # Try changing each character position
        for i in range(len(word)):
            # Try all 26 letters
            for c in 'abcdefghijklmnopqrstuvwxyz':
                new_word = word[:i] + c + word[i+1:]

                # Found the end word
                if new_word == endWord:
                    return length + 1

                # Valid transformation not yet visited
                if new_word in wordSet and new_word not in visited:
                    visited.add(new_word)
                    queue.append((new_word, length + 1))

    return 0  # No transformation sequence found


# Test
if __name__ == "__main__":
    # Example 1
    beginWord1 = "hit"
    endWord1 = "cog"
    wordList1 = ["hot", "dot", "dog", "lot", "log", "cog"]
    print(ladderLength(beginWord1, endWord1, wordList1))  # Output: 5
    # hit -> hot -> dot -> dog -> cog

    # Example 2: endWord not in wordList
    wordList2 = ["hot", "dot", "dog", "lot", "log"]
    print(ladderLength(beginWord1, endWord1, wordList2))  # Output: 0`,
            go: `package main

import "fmt"

// ladderLength finds shortest transformation sequence using BFS.
// Time: O(M^2 * N), Space: O(M^2 * N)
func ladderLength(beginWord string, endWord string, wordList []string) int {
    // Build word set for O(1) lookup
    wordSet := make(map[string]bool)
    for _, word := range wordList {
        wordSet[word] = true
    }

    // If endWord not in dictionary, no valid transformation
    if !wordSet[endWord] {
        return 0
    }

    // BFS queue
    type state struct {
        word   string
        length int
    }
    queue := []state{{beginWord, 1}}
    visited := map[string]bool{beginWord: true}

    for len(queue) > 0 {
        curr := queue[0]
        queue = queue[1:]

        // Try changing each character position
        wordBytes := []byte(curr.word)
        for i := 0; i < len(wordBytes); i++ {
            original := wordBytes[i]

            // Try all 26 letters
            for c := byte('a'); c <= byte('z'); c++ {
                wordBytes[i] = c
                newWord := string(wordBytes)

                // Found the end word
                if newWord == endWord {
                    return curr.length + 1
                }

                // Valid transformation not yet visited
                if wordSet[newWord] && !visited[newWord] {
                    visited[newWord] = true
                    queue = append(queue, state{newWord, curr.length + 1})
                }
            }

            wordBytes[i] = original // Restore
        }
    }

    return 0 // No transformation sequence found
}

func main() {
    // Example 1
    beginWord := "hit"
    endWord := "cog"
    wordList := []string{"hot", "dot", "dog", "lot", "log", "cog"}
    fmt.Println(ladderLength(beginWord, endWord, wordList)) // Output: 5

    // Example 2: endWord not in wordList
    wordList2 := []string{"hot", "dot", "dog", "lot", "log"}
    fmt.Println(ladderLength(beginWord, endWord, wordList2)) // Output: 0
}`
        },
        twists: [
            { id: '02-breadth-first-search/03-word-ladder/twist-01-return-the-actual-transformation-path', name: 'Return the Actual Transformation Path', difficulty: 'Hard' },
            { id: '02-breadth-first-search/03-word-ladder/twist-02-return-all-shortest-transformation-sequences', name: 'Return All Shortest Transformation Sequences', difficulty: 'Very Hard' },
            { id: '02-breadth-first-search/03-word-ladder/twist-03-bidirectional-bfs-word-ladder', name: 'Bidirectional BFS Word Ladder', difficulty: 'Hard' },
            { id: '02-breadth-first-search/03-word-ladder/twist-04-word-ladder-with-two-character-changes', name: 'Word Ladder with Two-Character Changes', difficulty: 'Medium' },
            { id: '02-breadth-first-search/03-word-ladder/twist-05-word-ladder-on-a-directed-dictionary', name: 'Word Ladder on a Directed Dictionary', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/03-word-ladder', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/03-word-ladder'] = problem;

})();
