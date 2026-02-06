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
        description: 'A **transformation sequence** from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: - Every adjacent pair of words differs by a single letter - Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList - sk == endWord Given two words, beginWord and endWord, and a dictionary wordList, return the **number of words** in the **shortest transformation sequence** from beginWord to endWord,',
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
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input beginWord=hit, endWord=cog, wordList=[hot, dot, ..., cog] (length 6), the result is 5.'
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
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input beginWord=hit, endWord=cog, wordList=[hot, dot, dog, lot, log], the result is 0.'
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
            {
                title: 'Return the Actual Transformation Path',
                difficulty: 'Hard',
                description: 'Instead of returning just the length, return one actual shortest transformation sequence as a list of words from beginWord to endWord.',
                whyDifferent: 'Tracking the path during BFS requires parent pointers or storing full paths in the queue. Reconstructing the path adds significant complexity compared to just counting levels.',
                example: 'beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"]. Output: ["hit","hot","dot","dog","cog"] instead of just 5.'
            },
            {
                title: 'Return All Shortest Transformation Sequences',
                difficulty: 'Very Hard',
                description: 'Return all shortest transformation sequences from beginWord to endWord. Multiple paths of the same minimum length may exist.',
                whyDifferent: 'You must find ALL shortest paths, not just one. This requires building a BFS layer graph and then doing DFS backtracking to enumerate all paths. Much harder than single-path BFS.',
                example: 'beginWord="hit", endWord="cog". Two paths: ["hit","hot","dot","dog","cog"] and ["hit","hot","lot","log","cog"]. Return both.'
            },
            {
                title: 'Bidirectional BFS Word Ladder',
                difficulty: 'Hard',
                description: 'Optimize Word Ladder using bidirectional BFS: search from beginWord and endWord simultaneously, meeting in the middle.',
                whyDifferent: 'Dramatically reduces the search space by shrinking the BFS frontier from both ends. You must alternate between forward and backward frontiers and detect when they intersect.',
                example: 'Same input, same output (5), but explores far fewer intermediate words. Forward: hit->hot, Backward: cog->dog,log. They meet faster.'
            },
            {
                title: 'Word Ladder with Two-Character Changes',
                difficulty: 'Medium',
                description: 'Each transformation step can change up to 2 characters instead of exactly 1. Find the shortest sequence under this relaxed rule.',
                whyDifferent: 'The adjacency definition changes dramatically - each word has many more neighbors. The graph becomes much denser, so the BFS frontier grows faster but the shortest path is shorter.',
                example: 'beginWord="hit", endWord="cog". With 1-change: 5 steps. With 2-change: "hit"->"cot"->"cog" = 3 steps (changing h->c and i->o simultaneously).'
            },
            {
                title: 'Word Ladder on a Directed Dictionary',
                difficulty: 'Hard',
                description: 'Transformations are directional: you can only change a character to a letter later in the alphabet (a->b ok, b->a not ok). Find the shortest sequence.',
                whyDifferent: 'The graph becomes directed, which means some paths available in the undirected version are now blocked. You might need longer detours or the answer might become impossible.',
                example: 'beginWord="abc", endWord="abd". "abc"->"abd" is valid (c->d). But "abd"->"abc" is invalid (d->c goes backward). Some transformations become one-way streets.'
            }
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
